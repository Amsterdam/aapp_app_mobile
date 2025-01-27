package com.salesforcemessaginginapp

import android.graphics.BitmapFactory
import android.net.Uri
import android.os.Build
import android.util.Base64
import androidx.annotation.RequiresApi
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.WritableArray
import com.facebook.react.bridge.WritableMap
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.salesforce.android.smi.common.api.Result
import com.salesforce.android.smi.common.api.data
import com.salesforce.android.smi.core.Configuration
import com.salesforce.android.smi.core.ConversationClient
import com.salesforce.android.smi.core.CoreClient
import com.salesforce.android.smi.core.CoreConfiguration
import com.salesforce.android.smi.core.data.domain.businessHours.BusinessHoursInfo
import com.salesforce.android.smi.core.data.domain.conversationEntry.entryPayload.event.typing.TypingIndicatorStatus
import com.salesforce.android.smi.core.data.domain.remoteConfiguration.RemoteConfiguration
import com.salesforce.android.smi.core.events.CoreEvent
import com.salesforce.android.smi.network.data.domain.conversation.Conversation
import com.salesforce.android.smi.network.data.domain.conversationEntry.ConversationEntry
import com.salesforce.android.smi.network.data.domain.conversationEntry.entryPayload.ConversationEntryType
import com.salesforce.android.smi.network.data.domain.conversationEntry.entryPayload.EntryPayload
import com.salesforce.android.smi.network.data.domain.conversationEntry.entryPayload.event.entries.ParticipantClientMenu
import com.salesforce.android.smi.network.data.domain.conversationEntry.entryPayload.message.component.attachment.FileAsset
import com.salesforce.android.smi.network.data.domain.conversationEntry.entryPayload.message.component.optionItem.OptionItem
import com.salesforce.android.smi.network.data.domain.conversationEntry.entryPayload.message.component.optionItem.titleItem.TitleItem
import com.salesforce.android.smi.network.data.domain.conversationEntry.entryPayload.message.format.ChoicesFormat
import com.salesforce.android.smi.network.data.domain.conversationEntry.entryPayload.message.format.ChoicesResponseFormat
import com.salesforce.android.smi.network.data.domain.conversationEntry.entryPayload.message.format.FormFormat
import com.salesforce.android.smi.network.data.domain.conversationEntry.entryPayload.message.format.FormResponseFormat
import com.salesforce.android.smi.network.data.domain.conversationEntry.entryPayload.message.format.StaticContentFormat
import com.salesforce.android.smi.network.data.domain.participant.Participant
import com.salesforce.android.smi.network.data.domain.participant.ParticipantRoleType
import com.salesforce.android.smi.network.data.domain.prechat.PreChatField
import com.salesforce.android.smi.network.internal.api.sse.ServerSentEvent
import kotlinx.coroutines.Job
import kotlinx.coroutines.MainScope
import kotlinx.coroutines.flow.filterIsInstance
import kotlinx.coroutines.launch
import java.io.ByteArrayOutputStream
import java.io.File
import java.io.FileOutputStream
import java.net.URI
import java.net.URL
import java.util.UUID

@ReactModule(name = SalesforceMessagingInAppModule.NAME)
class SalesforceMessagingInAppModule(reactContext: ReactApplicationContext) :
  NativeSalesforceMessagingInAppSpec(reactContext) {

  private var config: Configuration? = null
  private var coreClient: CoreClient? = null
  private var conversationClient: ConversationClient? = null
  private var remoteConfiguration: RemoteConfiguration? = null
  private var scope = MainScope()
  private val choices: MutableList<OptionItem> = mutableListOf()
  private var localImageUri: String? = null

  override fun getName(): String {
    return NAME
  }

  private var listenerCount: Int = 0

  @ReactMethod
  override fun addListener(eventName: String) {
    if (listenerCount == 0) {
      // Set up any upstream listeners or background tasks as necessary
    }

    listenerCount += 1
  }

  @ReactMethod
  override fun removeListeners(count: Double) {
    listenerCount -= count.toInt()
    if (listenerCount == 0) {
      // Remove upstream listeners, stop unnecessary background tasks
    }
  }

  @ReactMethod
  override fun createCoreClient(
    url: String,
    organizationId: String,
    developerName: String,
    promise: Promise,
  ) {
    try {
      config = CoreConfiguration(URL(url), organizationId, developerName)
      coreClient = CoreClient.Factory.create(reactApplicationContext, config!!)
      coreClient?.start(scope)
      promise.resolve(true)
    } catch (e: Exception) {
      // Catch any exception and reject the promise
      promise.reject("Error", "An error occurred: ${e.message}", e)
    }
  }

  @ReactMethod
  override fun retrieveRemoteConfiguration(promise: Promise) {
    try {
      if (coreClient == null) {
        promise.reject("Error", "CoreClient not created.")
        return
      }
      scope.launch {
        try {
          val remoteConfig: Result<RemoteConfiguration>? =
            coreClient?.retrieveRemoteConfiguration()
          if (remoteConfig is Result.Success) {
            remoteConfiguration = remoteConfig.data
            val remoteConfigMap = Arguments.createMap()
            remoteConfigMap.putString("name", remoteConfig.data.name)
            remoteConfigMap.putString("deploymentType", remoteConfig.data.deploymentType.toString())
            remoteConfigMap.putDouble("timestamp", (remoteConfig.data.timestamp / 1000).toDouble())
            remoteConfigMap.putMap("choiceListConfiguration", Arguments.createMap().apply {
              putArray(
                "choiceLists",
                Arguments.createArray().apply {
                  remoteConfig.data.choiceListConfiguration?.choiceList?.forEach { choice ->
                    val choiceMap = Arguments.createMap()
                    choiceMap.putString("identifier", choice.choiceListId)
                    choiceMap.putArray(
                      "values",
                      Arguments.createArray().apply {
                        choice.choiceListValues.forEach { value ->
                          val valueMap = Arguments.createMap()
                          valueMap.putString("label", value.label)
                          valueMap.putString("valueId", value.choiceListValueId)
                          valueMap.putString("valueName", value.choiceListValueName)
                          valueMap.putInt("order", value.order)
                          valueMap.putBoolean("isDefaultValue", value.isDefaultValue)
                          pushMap(valueMap)
                        }
                      }
                    )
                    pushMap(choiceMap)
                  }
                }
              )

              putArray(
                "valueDependencies",
                Arguments.createArray().apply {
                  remoteConfig.data.choiceListConfiguration?.choiceListValueDependencies?.forEach { dependency ->
                    val dependencyMap = Arguments.createMap()
                    dependencyMap.putString("childId", dependency.childChoiceListValueId)
                    dependencyMap.putString("parentId", dependency.parentChoiceListValueId)
                    pushMap(dependencyMap)
                  }
                }
              )
            })
            remoteConfigMap.putArray("preChatConfiguration", Arguments.createArray().apply {
              remoteConfig.data.forms.forEach { form ->
                pushMap(
                  Arguments.createMap().apply {
                    putString("formType", form.formType.toString())
                    putArray(
                      "hiddenPreChatFields",
                      Arguments.createArray().apply {
                        form.hiddenFormFields.forEach { field ->
                          pushMap(convertPreChatFieldToMap(field))
                        }
                      }
                    )
                    putArray(
                      "preChatFields",
                      Arguments.createArray().apply {
                        form.formFields.forEach { field ->
                          pushMap(convertPreChatFieldToMap(field))
                        }
                      }
                    )
                  }
                )
              }
            })
            remoteConfigMap.putMap("termsAndConditions", Arguments.createMap().apply {
              putString("label", remoteConfig.data.termsAndConditions?.label)
              putBoolean(
                "isEnabled",
                remoteConfig.data.termsAndConditions?.isTermsAndConditionsEnabled ?: false
              )
              putBoolean(
                "isRequired",
                remoteConfig.data.termsAndConditions?.isTermsAndConditionsRequired ?: false
              )
            })
            promise.resolve(remoteConfigMap)
          } else {
            promise.reject("Error", remoteConfig.toString())
          }
        } catch (e: Exception) {
          promise.reject("Error", e.message, e)
        }
      }
    } catch (e: Exception) {
      // Catch any exception and reject the promise
      promise.reject("Error", "An error occurred: ${e.message}", e)
    }
  }

  private var conversationJob: Job? = null

  @ReactMethod
  override fun createConversationClient(clientID: String?, promise: Promise) {
    try {
      if (coreClient == null) {
        promise.reject("Error", "CoreClient not created.")
        return
      }
      val uuid = if (clientID != null) UUID.fromString(clientID) else UUID.randomUUID()
      conversationClient = coreClient?.conversationClient(uuid)

      conversationJob?.cancel()

      conversationJob =
        scope.launch {
          try {
            conversationClient?.events?.collect { entry ->
              when (entry) {
                is CoreEvent.ConversationEvent.Entry -> {
                  val params = convertEntryToMap(entry.conversationEntry)
                  emitOnNewMessage(params)
                }

                is CoreEvent.ConversationEvent.TypingIndicator -> {

                }

                is CoreEvent.ConversationEvent.ProgressIndicator -> {
                  val params = convertEntryToMap(entry.conversationEntry)
                  if (entry.conversationEntry.entryType === ConversationEntryType.TypingStartedIndicator) {
                    emitOnTypingStarted(params)
                  } else if (entry.conversationEntry.entryType === ConversationEntryType.TypingStoppedIndicator) {
                    emitOnTypingStopped(params)
                  }
                }
              }
            }
            coreClient?.events?.collect { entry ->
              when (entry) {
                is CoreEvent.Connection -> {
                  var status: String
                  when (entry.event) {
                    is ServerSentEvent.Connection.Closed -> {
                      status = "Closed"
                    }

                    is ServerSentEvent.Connection.Connecting -> {
                      status = "Connecting"
                    }

                    is ServerSentEvent.Connection.Open -> {
                      status = "Open"
                    }

                    is ServerSentEvent.Connection.Ping -> {
                      status = "Ping"
                    }
                  }
                  emitOnConnectionStatusChanged(status)
                }

                is CoreEvent.ConversationEvent.Entry -> {}
                is CoreEvent.ConversationEvent.TypingIndicator -> {}
                is CoreEvent.Error -> {

                  val params = Arguments.createMap()
                  params.putString("message", entry.message)

                  emitOnError(params)
                }

                is CoreEvent.ConversationEvent.ProgressIndicator -> {
                }
              }
            }
          } catch (e: Exception) {
            promise.reject("Error", "Failed to listen for messages: ${e.message}", e)
          }
        }
      promise.resolve(uuid.toString())
    } catch (e: Exception) {
      // Catch any exception and reject the promise
      promise.reject("Error", "An error occurred: ${e.message}", e)
    }
  }

  @ReactMethod(isBlockingSynchronousMethod = true)
  override fun generateUUID(): String {
    return UUID.randomUUID().toString()
  }

  private fun convertParticipantToMap(participant: Participant): WritableMap {
    val map = Arguments.createMap()
    map.putString("subject", participant.subject)
    map.putString("role", participant.roleType.toString())
    map.putBoolean("local", participant.isLocal)
    map.putString("displayName", participant.displayName)
    map.putArray("options", convertParticipantClientMenuToMapArray(participant.clientMenu))
    return map
  }

  private fun convertParticipantClientMenuOptionItemToMap(
    option: OptionItem.TypedOptionItem.ParticipantClientMenuOptionItem,
  ): WritableMap {
    val optionMap = Arguments.createMap()
    optionMap.putString("title", option.title)
    optionMap.putString("optionValue", option.optionValue)
    optionMap.putString("optionId", option.optionId)
    optionMap.putString("parentEntryId", option.parentMessageId)
    return optionMap
  }

  private fun convertParticipantClientMenuToMapArray(
    options: ParticipantClientMenu?,
  ): WritableArray {
    val array = Arguments.createArray()
    options?.optionItems?.forEach { option ->
      array.pushMap(convertParticipantClientMenuOptionItemToMap(option))
    }
    return array
  }

  private fun convertPreChatFieldToMap(field: PreChatField): WritableMap {
    return Arguments.createMap().apply {
      putBoolean("editable", field.isEditable)
      putBoolean("isHidden", field.isHidden)
      putString("label", field.labels.display)
      putInt("maxLength", field.maxLength)
      putString("name", field.name)
      putInt("order", field.order)
      putBoolean("required", field.required)
      putString("type", field.type.toString())
      putString("errorType", field.errorType.toString())
      putString("value", field.userInput)
    }
  }

  private fun convertEntryToMap(entry: ConversationEntry): WritableMap {
    val map = Arguments.createMap()
    map.putString("entryId", entry.identifier)
    map.putMap("sender", convertParticipantToMap(entry.sender))
    map.putString("senderDisplayName", entry.senderDisplayName)
    map.putString("messageType", entry.entryType.toString())
    map.putDouble("timestamp", (entry.timestamp / 1000).toDouble())
    map.putString("conversationId", entry.conversationId.toString())
    map.putString("status", entry.status.toString())
    map.putString("format", entry.payload.entryType.toString())
    map.putString("payloadId", entry.payload.id)
    map.merge(convertPayloadToMap(entry.payload))

    return map
  }

  private fun convertTypedOptionItemToMap(option: OptionItem.TypedOptionItem): WritableMap {
    choices.add(option)
    when (option) {
      is OptionItem.TypedOptionItem.ParticipantClientMenuOptionItem -> {
        return convertParticipantClientMenuOptionItemToMap(option)
      }

      is OptionItem.TypedOptionItem.TitleOptionItem -> {
        val optionMap = Arguments.createMap()
        // deze title items bevatten nog meer properties
        optionMap.putString("incomplete", "true")
        optionMap.putString("title", option.titleItem.title)
        optionMap.putString("itemType", option.titleItem.itemType.toString())
        optionMap.putString("subTitle", option.titleItem.subTitle)
        optionMap.putString("optionValue", option.optionValue.title)
        optionMap.putString("optionId", option.optionId)
        optionMap.putString("parentEntryId", option.parentMessageId)
        return optionMap
      }
    }
  }

  private fun convertAttachmentsToMap(attachments: List<FileAsset>): ReadableArray {
    val attachmentsArray = Arguments.createArray()
    attachments.forEach { attachment ->
      val attachmentMap = Arguments.createMap()
      attachmentMap.putString("id", attachment.id)
      attachmentMap.putString("mimeType", attachment.mimeType)
      attachmentMap.putString("name", attachment.name)
      attachment.file?.let {
        attachmentMap.putString(
          "file",
          Uri.fromFile(it).toString()
        ) // Convert File to URI if not null
      }
      if (attachment.mimeType.startsWith("image") && localImageUri != null) {
        localImageUri?.let { attachmentMap.putString("url", it) }
        localImageUri = null
      } else {
        attachment.url?.let { attachmentMap.putString("url", it) }
      }
      attachmentsArray.pushMap(attachmentMap)
    }
    return attachmentsArray
  }

  private fun convertTitleItemsWithInteractionsToMap(
    titleItems: List<TitleItem.TitleItemWithInteractions>,
  ): WritableArray {
    return Arguments.createArray().apply {
      titleItems.forEach { item ->
        Arguments.createMap().apply {
          putString("subtitle", item.titleItem.subTitle)
          putString("title", item.titleItem.title)
          putString("referenceId", item.titleItem.imageId)
          putString("itemType", item.titleItem.itemType.toString())
          putArray("interactionItems", Arguments.createArray().apply {
            item.interactionItems.forEach { interactionItem ->
              convertTypedOptionItemToMap(interactionItem)
            }
          })
        }
      }
    }
  }

  // Utility function to convert an EntryPayload object to WritableMap
  private fun convertPayloadToMap(payload: EntryPayload): WritableMap {
    val map = Arguments.createMap()

    // General properties of EntryPayload
    map.putString("entryType", payload.entryType.toString())
    // If the payload is of type MessagePayload, handle its specific properties
    when (payload) {
      is EntryPayload.MessagePayload -> {
        val content = payload.content
        map.putString("format", content.formatType.toString())
        map.putString("inReplyToEntryId", payload.inReplyToMessageId)
        map.putString("messageReason", payload.messageReason.toString())

        when (content) {
          is StaticContentFormat.TextFormat -> {
            map.putString("text", content.text)
          }

          is StaticContentFormat.AttachmentsFormat -> {
            map.putArray("attachments", convertAttachmentsToMap(content.attachments))
            map.putString("text", content.text)
          }

          is StaticContentFormat.RichLinkFormat -> {
            if (content.image is FileAsset.ImageAsset.RichLinkImage) {
              map.putMap("asset", encodeRichLinkImageToMap(content.image as FileAsset.ImageAsset.RichLinkImage))
            }
            map.putString("title", content.linkItem.titleItem.title)
            map.putString("url", content.linkItem.url)
          }

          is StaticContentFormat.WebViewFormat -> {
            // TODO once implemented for iOS
          }

          is ChoicesFormat.DisplayableOptionsFormat -> {
            val optionsArray = Arguments.createArray()
            content.optionItems.forEach { option ->
              optionsArray.pushMap(convertTypedOptionItemToMap(option))
            }
            map.putArray("options", optionsArray)
          }

          is ChoicesFormat.CarouselFormat -> {
            val optionItemsArray = Arguments.createArray()
            content.optionItems.forEach { option ->
              optionItemsArray.pushMap(convertTypedOptionItemToMap(option))
            }
            map.putArray("items", convertTitleItemsWithInteractionsToMap(content.items))
            map.putArray("selected", optionItemsArray)
            map.putArray("attachments", convertAttachmentsToMap(content.images))
          }

          is ChoicesFormat.QuickRepliesFormat -> {
            val choicesArray = Arguments.createArray()

            content.optionItems.forEach { option ->
              choicesArray.pushMap(convertTypedOptionItemToMap(option))
            }
            map.putArray("choices", choicesArray)
            map.putString("text", content.text)
          }

          is ChoicesResponseFormat.ChoicesResponseSelectionsFormat -> {
            val selectionsArray = Arguments.createArray()
            content.selectedOptions.forEach { selection ->
              val selectionMap = Arguments.createMap()
              selectionMap.putString("optionId", selection.optionId)
              selectionMap.putString("title", selection.title)
              selectionMap.putString("parentEntryId", selection.parentMessageId)
              selectionsArray.pushMap(selectionMap)
            }
            map.putArray("selections", selectionsArray)
          }

          is FormFormat.InputsFormat -> {
            // TODO once implemented for iOS
          }

          is FormResponseFormat.InputsFormResponseFormat -> {
            // TODO once implemented for iOS
          }

          is FormResponseFormat.ResultFormResponseFormat -> {
            // TODO once implemented for iOS
          }
        }
      }

      is EntryPayload.AcknowledgeDeliveryPayload -> {
        map.putString("acknowledgedConversationEntryIdentifier", payload.acknowledgedConversationEntryIdentifier)
        map.putDouble("acknowledgementTimestamp", (payload.acknowledgementTimestamp / 1000).toDouble())
      }

      is EntryPayload.AcknowledgeReadPayload -> {
        map.putString("acknowledgedConversationEntryIdentifier", payload.acknowledgedConversationEntryIdentifier)
        map.putDouble("acknowledgementTimestamp", (payload.acknowledgementTimestamp / 1000).toDouble())
      }

      is EntryPayload.ParticipantChangedPayload -> {
        val entriesArray = Arguments.createArray()
        payload.entries.forEach { entry ->
          val entryMap = Arguments.createMap()
          entryMap.putMap("participant", convertParticipantToMap(entry.participant))
          //          entryMap.putString("displayName", entry.displayName) // not available on iOS
          entryMap.putString("type", entry.operation.value)
          entriesArray.pushMap(entryMap)
        }
        map.putArray("operations", entriesArray)
      }

      is EntryPayload.RoutingResultPayload -> {
        map.putInt("estimatedWaitTime", payload.estimatedWaitTime?.estimatedWaitTimeInSeconds ?: -1)
        //        map.putString("id", payload.id) // not available on iOS
        map.putString("failureReason", payload.failureReason)
        map.putString("failureType", payload.failureType.toString())
        map.putBoolean("isEWTAvailable", payload.isEwtAvailable)
        map.putString("recordId", payload.recordId)
        map.putString("routingType", payload.routingType.toString())
      }

      is EntryPayload.RoutingWorkResultPayload -> {
        map.putString("workType", payload.workType.toString())
      }

      is EntryPayload.TypingIndicatorPayload -> {
        map.putDouble("startedTimestamp", (payload.startedTimestamp / 1000).toDouble())
      }

      is EntryPayload.TypingStartedIndicatorPayload -> {
        map.putDouble("startedTimestamp", (payload.timestamp / 1000).toDouble())
      }

      is EntryPayload.TypingStoppedIndicatorPayload -> {
        map.putDouble("startedTimestamp", (payload.timestamp / 1000).toDouble())
      }

      is EntryPayload.UnknownEntryPayload -> {
        // TODO
      }

      is EntryPayload.ProgressIndicatorPayload -> {
        // TODO
      }
      is EntryPayload.StreamingTokenPayload -> {
        // TODO
      }
    }

    return map
  }

  @ReactMethod
  override fun markAsRead(entryDict: ReadableMap, promise: Promise) {
    try {
      if (conversationClient == null) {
        promise.reject("Error", "conversationClient not created.")
        return
      }
      val entryId = entryDict.getString("entryId")
      if (entryId.isNullOrEmpty()) {
        promise.reject(
          "mark_as_read_invalid_entry",
          "entryId is required"
        )
        return
      }
      scope.launch {
        try {
          val matchingEntry = conversationClient?.conversationEntries(10000)?.data?.firstOrNull { it.identifier == entryId }
          if (matchingEntry != null) {
            val result: Result<ConversationEntry>? =
              conversationClient?.markAsRead(matchingEntry)
            if (result is Result.Success) {
              //            val params = convertEntryToMap(result.data)
              // Emit the event with message data
              promise.resolve(true)
            } else {
              promise.reject("Error", result.toString())
            }
          } else {
            promise.reject("Error", "Entry not found")
          }
        } catch (e: Exception) {
          promise.reject("Error", e.message, e)
        }
      }
    } catch (e: Exception) {
      // Catch any exception and reject the promise
      promise.reject("Error", "An error occurred: ${e.message}", e)
    }
  }

  @ReactMethod
  override fun endConversation(promise: Promise) {
    try {
      if (conversationClient == null) {
        promise.reject("Error", "conversationClient not created.")
        return
      }
      scope.launch {
        try {
          val result: Result<Unit>? =
            conversationClient?.endSession()
          if (result is Result.Success) {
            promise.resolve(true)
          } else {
            promise.reject("Error", result.toString())
          }
        } catch (e: Exception) {
          promise.reject("Error", e.message, e)
        }
      }
    } catch (e: Exception) {
      // Catch any exception and reject the promise
      promise.reject("Error", "An error occurred: ${e.message}", e)
    }
  }


  @ReactMethod
  override fun sendMessage(message: String, promise: Promise) {
    try {
      if (conversationClient == null) {
        promise.reject("Error", "conversationClient not created.")
        return
      }
      scope.launch {
        try {
          val result: Result<ConversationEntry>? =
            conversationClient?.sendMessage(message)
          if (result is Result.Success) {
            //            val params = convertEntryToMap(result.data)
            // Emit the event with message data
            promise.resolve(true)
          } else {
            promise.reject("Error", result.toString())
          }
        } catch (e: Exception) {
          promise.reject("Error", e.message, e)
        }
      }
    } catch (e: Exception) {
      // Catch any exception and reject the promise
      promise.reject("Error", "An error occurred: ${e.message}", e)
    }
  }

  @ReactMethod
  override fun destroyStorageAndAuthorization(
    promise: Promise
  ) {
    try {
      coreClient?.stop()
      coreClient?.destroy()
      promise.resolve(true)
    } catch (e: Exception) {
      // Catch any exception and reject the promise
      promise.reject("Error", "An error occurred: ${e.message}", e)
    }
  }

  @ReactMethod
  override fun submitRemoteConfiguration(
    remoteConfiguration: ReadableMap,
    createConversationOnSubmit: Boolean,
    promise: Promise,
  ) {
    try {
      if (conversationClient == null) {
        promise.reject("Error", "conversationClient not created.")
        return
      }

      scope.launch {
        try {
          this@SalesforceMessagingInAppModule.remoteConfiguration?.forms?.forEach { form ->
            form.formFields.forEach { field ->
              val fieldName = field.name
              val preChatConfig = remoteConfiguration.getArray("preChatConfiguration")
              val preChatConfig0 = preChatConfig?.getMap(0)
              val preChatConfig0Fields = preChatConfig0?.getArray("preChatFields")
              val preChatConfig0FieldsArray = preChatConfig0Fields?.toArrayList()

              preChatConfig0FieldsArray?.forEach { filledField ->
                filledField as HashMap<*, *>
                val name = filledField["name"]
                if (name == fieldName) {
                  val value = filledField["value"]
                  if (value != null) {
                    field.userInput = value.toString()
                  }
                }
              }
            }
            form.hiddenFormFields.forEach { field ->
              val fieldName = field.name
              val preChatConfig = remoteConfiguration.getArray("preChatConfiguration")
              val preChatConfig0 = preChatConfig?.getMap(0)
              val preChatConfig0Fields = preChatConfig0?.getArray("hiddenPreChatFields")
              val preChatConfig0FieldsArray = preChatConfig0Fields?.toArrayList()

              preChatConfig0FieldsArray?.forEach { filledField ->
                filledField as HashMap<*, *>
                val name = filledField["name"]
                if (name == fieldName) {
                  val value = filledField["value"]
                  if (value != null) {
                    field.userInput = value.toString()
                  }
                }
              }
            }
          }

          val result: Result<Conversation>? =
            conversationClient?.submitRemoteConfiguration(
              this@SalesforceMessagingInAppModule.remoteConfiguration!!,
              createConversationOnSubmit
            )
          if (result is Result.Success) {
            promise.resolve(true)
          } else {
            promise.reject("Error", result.toString())
          }
        } catch (e: Exception) {
          promise.reject("Error", e.message, e)
        }
      }
    } catch (e: Exception) {
      // Catch any exception and reject the promise
      promise.reject("Error", "An error occurred: ${e.message}", e)
    }
  }

  @ReactMethod
  override fun sendPDF(filePath: String, fileName: String, message: String?, promise: Promise) {
    try {
      if (conversationClient == null) {
        promise.reject("Error", "conversationClient not created.")
        return
      }

      // Convert the filePath to a File
      val pdfFile = File(URI.create(filePath))

      if (!pdfFile.exists()) {
        promise.reject("FileNotFound", "PDF file not found at the specified path.")
        return
      }

      // Define the new file path in the app's cache directory
      val cacheDir = reactApplicationContext.cacheDir
      val newPdfFile = File(cacheDir, fileName)

      // Copy the original file to the new location with the new name
      pdfFile.copyTo(newPdfFile, overwrite = true)

      scope.launch {
        try {
          val result: Result<ConversationEntry>? =
            conversationClient?.sendFile(newPdfFile, message)

          if (result is Result.Success) {
            promise.resolve(true)
          } else {
            promise.reject("Error", result.toString())
          }
        } catch (e: Exception) {
          promise.reject("Error", e.message, e)
        }
      }
    } catch (e: Exception) {
      // Catch any exception and reject the promise
      promise.reject("Error", "An error occurred: ${e.message}", e)
    }
  }

  @ReactMethod
  override fun sendImage(imageBase64: String, fileName: String, uri: String, message: String?, promise: Promise) {
    try {
      if (conversationClient == null) {
        promise.reject("Error", "conversationClient not created.")
        return
      }
      localImageUri = uri

      // Decode Base64 string to ByteArray
      val decodedBytes: ByteArray = Base64.decode(imageBase64, Base64.DEFAULT)

      // Create a temporary file to store the decoded image data
      val tempFile =
        File.createTempFile(fileName, ".jpg") // Adjust file extension if necessary
      FileOutputStream(tempFile).use { fos -> fos.write(decodedBytes) }
      scope.launch {
        try {
          val result: Result<ConversationEntry>? =
            conversationClient?.sendFile(tempFile, message)
          if (result is Result.Success) {
            promise.resolve(true)
          } else {
            promise.reject("Error", result.toString())
          }
        } catch (e: Exception) {
          promise.reject("Error", e.message, e)
        }
      }
    } catch (e: Exception) {
      // Catch any exception and reject the promise
      promise.reject("Error", "An error occurred: ${e.message}", e)
    }
  }

  @ReactMethod
  override fun sendReply(choice: ReadableMap, promise: Promise) {
    try {
      if (conversationClient == null) {
        promise.reject("Error", "conversationClient not created.")
        return
      }
      scope.launch {
        try {
//          val optionId =
//            choice.getString("optionId")
//              ?: throw IllegalArgumentException("optionId is required")
//
//          val optionItem = choices.find { it.optionId == optionId }
//
//          if (optionItem != null) {
//            val result =
//              conversationClient?.sendReply(optionItem)
//                ?: throw IllegalStateException("Failed to send reply")
//
//            if (result is Result.Success) {
//              promise.resolve("Success")
//            } else {
//              promise.reject("Error", result.toString())
//            }
//          } else {
//            promise.reject("Error", "Option not found")
//          }
          val optionValue =
            choice.getString("optionValue")
          if (optionValue == null) {
            promise.reject("Error", "optionValue is required")
          } else {
            val result =
              conversationClient?.sendMessage(optionValue) // TODO: sendReply once bug is fixed in Core SDK

            if (result is Result.Success) {
              promise.resolve("Success")
            } else {
              promise.reject("Error", result.toString())
            }
          }

        } catch (e: Exception) {
          promise.reject("Error", e.message, e)
        }
      }
    } catch (e: Exception) {
      promise.reject("Error", "An error occurred: ${e.message}", e)
    }
  }

  @ReactMethod
  override fun sendTypingEvent(promise: Promise) {
    try {
      if (conversationClient == null) {
        promise.reject("Error", "conversationClient not created.")
        return
      }
      scope.launch {
        try {
          conversationClient?.sendTypingEvent()
            ?: throw IllegalStateException("Failed to send typing event")
          promise.resolve("Success")
        } catch (e: Exception) {
          promise.reject("Error", e.message, e)
        }
      }
    } catch (e: Exception) {
      promise.reject("Error", "An error occurred: ${e.message}", e)
    }
  }

  @ReactMethod
  override fun checkIfInBusinessHours(promise: Promise) {
    if (coreClient == null) {
      promise.reject("Error", "CoreClient not created.")
      return
    }
    scope.launch {
      try {
        val result = coreClient?.retrieveBusinessHours()
        if (result is Result.Success) {
          val businessHoursInfo: BusinessHoursInfo? = result.data
          promise.resolve(businessHoursInfo?.isWithinBusinessHours())
        } else {
          promise.reject("Error", result.toString())
        }
      } catch (e: Exception) {
        // Catch any exception and reject the promise
        promise.reject("Error", "An error occurred: ${e.message}", e)
      }
    }
  }

  @RequiresApi(Build.VERSION_CODES.FROYO)
  @ReactMethod
  override fun retrieveTranscript(promise: Promise) {
    try {
      if (conversationClient == null) {
        promise.reject("Error", "conversationClient not created.")
        return
      }
      scope.launch {
        try {
          val result = conversationClient?.retrieveTranscript()
          if (result is Result.Success) {
            val inputStream = result.data
            val byteArrayOutputStream = ByteArrayOutputStream()
            val buffer = ByteArray(1024)
            var bytesRead: Int
            while (inputStream.read(buffer).also { bytesRead = it } != -1) {
              byteArrayOutputStream.write(buffer, 0, bytesRead)
            }
            val byteArray = byteArrayOutputStream.toByteArray()
            val base64String = Base64.encodeToString(byteArray, Base64.DEFAULT)
            val timestamp = System.currentTimeMillis().toDouble()
            val entryId = UUID.randomUUID().toString()

            emitOnNewMessage(Arguments.createMap().apply {
              putString("format", "Transcript")
              putString("conversationId", "")
              putString("entryId", entryId)
              putString("entryType", "")
              putString("payloadId", "")
              putString("status", "Sent")
              putMap("sender", Arguments.createMap().apply {
                putString("role", "System")
                putString("displayName", "")
                putBoolean("local", false)
                putArray("options", Arguments.createArray())
                putString("subject", "")
              })
              putString("senderDisplayName", "")
              putDouble("timestamp", timestamp)
            })
            promise.resolve(Arguments.createMap().apply {
              putString("transcript", base64String)
              putString("entryId", entryId)
            })
          } else {
            promise.reject("Error", result.toString())
          }
        } catch (e: Exception) {
          promise.reject("Error", e.message, e)
        }
      }
    } catch (e: Exception) {
      promise.reject("Error", "An error occurred: ${e.message}", e)
    }
  }

  private fun encodeRichLinkImageToMap(imageAsset: FileAsset.ImageAsset.RichLinkImage): ReadableMap {
    if (imageAsset.file != null) {
      val file = imageAsset.file!!
      val bytes = file.readBytes()
      val options = BitmapFactory.Options().apply { inJustDecodeBounds = true }
      BitmapFactory.decodeFile(file.absolutePath, options)
      return Arguments.createMap().apply {
        putString("imageBase64", Base64.encodeToString(bytes, Base64.DEFAULT))
        putInt("height", options.outHeight)
        putInt("width", options.outWidth)
      }
    } else if (imageAsset.url != null) {
      return Arguments.createMap().apply {
        putString("url", imageAsset.url)
      }
    } else {
      return Arguments.createMap()
    }
  }

  companion object {
    const val NAME = "SalesforceMessagingInApp"
  }
}
