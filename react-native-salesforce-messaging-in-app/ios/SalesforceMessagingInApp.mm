#import "SalesforceMessagingInApp.h"
#import <PDFKit/PDFKit.h> // Required for working with PDFs
#import <SMIClientCore/SMIClientCore.h>
#import <React/RCTConvert.h>
#import <Foundation/Foundation.h>  // To handle NSData and Base64 decoding

@interface SalesforceMessagingInApp () <SMICoreDelegate> {
  bool hasListeners;
}

@end

@implementation SalesforceMessagingInApp
RCT_EXPORT_MODULE()

SMICoreConfiguration *config;
id<SMICoreClient> coreClient;
id<SMIConversationClient> conversationClient;
id<SMIRemoteConfiguration> remoteConfiguration;
NSMutableArray<id<SMIChoice>> *receivedChoices;
NSString *localImageUri;
RCT_EXPORT_METHOD(destroyStorageAndAuthorization:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
    @try {
        if (coreClient != nil) {
            [coreClient destroyStorageAndAuthorization:YES completion:^(NSError * _Nullable error) {
                [coreClient stop];
                [coreClient removeDelegate:self];
                conversationClient = nil;
                remoteConfiguration = nil;
                receivedChoices = nil;
                localImageUri = nil;
                config = nil;
                coreClient = nil;
                [self emitOnConnectionStatusChanged:@"Closed"];
                resolve(@(YES));
            }];
        }else {
            resolve(@(YES));
        }
    } @catch (NSException *exception) {
        // Handle exceptions by rejecting the promise
        NSError *error = [NSError errorWithDomain:@"destroyStorageAndAuthorization Exception"
                                             code:500
                                         userInfo:@{NSLocalizedDescriptionKey: [exception reason]}];
        reject(@"destroy_storage_and_authorization_exception", @"An exception occurred during destroyStorageAndAuthorization", error);
    }
}

RCT_EXPORT_METHOD(createCoreClient:(NSString *)url
                  organizationId:(NSString *)organizationId
                  developerName:(NSString *)developerName
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
    @try {
        if (coreClient != nil) {
            [coreClient stop];
            [coreClient removeDelegate:self];
            coreClient = nil;
            config = nil;
        }

        // Reset conversation-specific state whenever we create a new core client.
        conversationClient = nil;
        remoteConfiguration = nil;
        receivedChoices = nil;
        localImageUri = nil;
        [self emitOnConnectionStatusChanged:@"Connecting"];

        // Convert the string URL to an NSURL
        NSURL *serviceAPIURL = [NSURL URLWithString:url];

        // Check if the URL is valid
        if (serviceAPIURL == nil) {
            // Handle the error, perhaps by rejecting the promise
            NSError *error = [NSError errorWithDomain:@"Invalid URL"
                                                code:400
                                            userInfo:@{NSLocalizedDescriptionKey: @"The provided URL is invalid."}];
            reject(@"invalid_url", @"Invalid URL", error);
            return;
        }

        // Create the Configuration object (Assuming the Configuration class is from SMIClientCore)
        config = [[SMICoreConfiguration alloc] initWithServiceAPI:serviceAPIURL
                                                        organizationId:organizationId
                                                        developerName:developerName];

        // Now create the core client using the CoreFactory's create method
        coreClient = [SMICoreFactory createWithConfig:config];

        // Assuming successful creation of the core client, resolve the promise
        if (coreClient != nil) {
            [coreClient start];
            [coreClient addDelegate:self];
            resolve(@(YES));
        } else {
            NSError *error = [NSError errorWithDomain:@"CoreClient Creation Failed"
                                                code:500
                                            userInfo:@{NSLocalizedDescriptionKey: @"Failed to create CoreClient."}];
            reject(@"core_client_creation_failed", @"CoreClient creation failed", error);
        }
    } @catch (NSException *exception) {
        // Handle exceptions by rejecting the promise
        NSError *error = [NSError errorWithDomain:@"CoreClient Creation Exception"
                                             code:500
                                         userInfo:@{NSLocalizedDescriptionKey: [exception reason]}];
        reject(@"core_client_creation_exception", @"An exception occurred during CoreClient creation", error);
    }
}


RCT_EXPORT_METHOD(checkIfInBusinessHours:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
    NSError *error = [NSError errorWithDomain:@"checkIfInBusinessHours Exception"
                                             code:500
                                            userInfo:@{NSLocalizedDescriptionKey: @"not implemented"}];
    reject(@"not_implemented_exception", @"not implemented", error);
}

RCT_EXPORT_METHOD(createConversationClient:(NSString *)conversationId
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
    @try {
        // Never remove the core delegate here.
        // The delegate is required to receive connection/network events and messages.
        // Removing it breaks subsequent chat sessions (e.g. connection remains "Closed").
        conversationClient = nil;
        [self emitOnConnectionStatusChanged:@"Connecting"];
        NSUUID *uuid;
        
        // Check if the conversationId is nil or an empty string
        if (conversationId == nil || [conversationId isEqualToString:@""]) {
            // Generate a new UUID if conversationId is nil
            uuid = [NSUUID UUID];
        } else {
            // Convert the input string to NSUUID
            uuid = [[NSUUID alloc] initWithUUIDString:conversationId];
            
            // Check if the conversion was successful
            if (uuid == nil) {
                NSError *error = [NSError errorWithDomain:@"Invalid UUID"
                                                    code:400
                                                userInfo:@{NSLocalizedDescriptionKey: @"The provided conversation ID is not a valid UUID."}];
                reject(@"invalid_uuid", @"Invalid UUID", error);
                return;
            }
        }
        conversationClient = [coreClient conversationClientWithId:uuid];
        receivedChoices = [NSMutableArray array];
        localImageUri = nil;
        if (conversationClient != nil) {
            resolve(conversationClient.identifier.UUIDString);
        } else {
            NSError *error = [NSError errorWithDomain:@"ConversationClient Creation Failed"
                                                code:500
                                            userInfo:@{NSLocalizedDescriptionKey: @"Failed to create ConversationClient."}];
            reject(@"conversation_client_creation_failed", @"ConversationClient creation failed", error);
        }
    } @catch (NSException *exception) {
        // Handle exceptions by rejecting the promise
        NSError *error = [NSError errorWithDomain:@"ConversationClient Creation Exception"
                                             code:500
                                         userInfo:@{NSLocalizedDescriptionKey: [exception reason]}];
        reject(@"conversation_client_creation_exception", @"An exception occurred during ConversationClient creation", error);
    }
    /*
    NSError *error = [NSError errorWithDomain:@"checkIfInBusinessHours Exception"
                                             code:500
                                            userInfo:@{NSLocalizedDescriptionKey: @"not implemented"}];
    reject(@"not_implemented_exception", @"not implemented", error);*/
}

RCT_EXPORT_METHOD(retrieveRemoteConfiguration:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
    // Ensure that the coreClient has been initialized
    if (coreClient == nil) {
        NSError *error = [NSError errorWithDomain:@"CoreClient Not Initialized"
                                             code:500
                                         userInfo:@{NSLocalizedDescriptionKey: @"CoreClient is not initialized."}];
        reject(@"core_client_not_initialized", @"CoreClient is not initialized", error);
        return;
    }
    
    // Call retrieveRemoteConfigurationWithCompletion on coreClient
    [coreClient retrieveRemoteConfigurationWithCompletion:^(id<SMIRemoteConfiguration> _Nullable remoteConfig, NSError * _Nullable error) {
        if (error != nil) {
            // Handle the error by rejecting the promise
            reject(@"retrieve_remote_config_failed", @"Failed to retrieve remote configuration", error);
        } else if (remoteConfig != nil) {
            remoteConfiguration = remoteConfig;
            // Manually construct a dictionary from the properties of remoteConfig
            NSMutableDictionary *configData = [NSMutableDictionary dictionary];
            
            // Add name
            [configData setObject:remoteConfig.name forKey:@"name"];
            
            // Add deploymentType
            [configData setObject:remoteConfig.deploymentType forKey:@"deploymentType"];
            
            configData[@"timestamp"] = @([remoteConfig.timestamp timeIntervalSince1970]);
            
            // Add preChatConfiguration if available (assuming it's an array of objects you can convert)
            if (remoteConfig.preChatConfiguration != nil) {
                NSMutableArray *preChatConfigs = [NSMutableArray array];
                for (id<SMIPreChatConfiguration> preChatConfig in remoteConfig.preChatConfiguration) {
                    NSMutableDictionary *preChatConfigDict = [NSMutableDictionary dictionary];

                    // Add formType (assuming it's an enum, convert to string or number)
                    preChatConfigDict[@"formType"] = preChatConfig.formType;
                    
                    // Handle preChatFields
                    NSMutableArray *preChatFieldsArray = [NSMutableArray array];
                    for (id<SMIPreChatField> preChatField in preChatConfig.preChatFields) {
                        // Construct dictionary for each preChatField
                        NSMutableDictionary *preChatFieldDict = [NSMutableDictionary dictionary];
                        preChatFieldDict[@"identifier"] = preChatField.identifier;
                        preChatFieldDict[@"type"] = preChatField.type;
                        preChatFieldDict[@"label"] = preChatField.label;
                        preChatFieldDict[@"name"] = preChatField.name;
                        preChatFieldDict[@"required"] = @(preChatField.required);
                        preChatFieldDict[@"maxLength"] = @(preChatField.maxLength);
                        preChatFieldDict[@"order"] = @(preChatField.order);
                        preChatFieldDict[@"value"] = preChatField.value ?: [NSNull null]; // Use NSNull for nullable value
                        preChatFieldDict[@"isHidden"] = @(preChatField.isHidden);
                        preChatFieldDict[@"editable"] = @(preChatField.isEditable);
                        
                        [preChatFieldsArray addObject:preChatFieldDict];
                    }
                    preChatConfigDict[@"preChatFields"] = preChatFieldsArray;
                    
                    // Handle hiddenPreChatFields
                    NSMutableArray *hiddenPreChatFieldsArray = [NSMutableArray array];
                    for (id<SMIHiddenPreChatField> hiddenField in preChatConfig.hiddenPreChatFields) {
                        // Construct dictionary for each hiddenPreChatField
                        NSMutableDictionary *hiddenFieldDict = [NSMutableDictionary dictionary];
                        hiddenFieldDict[@"identifier"] = hiddenField.identifier;
                        hiddenFieldDict[@"type"] = hiddenField.type;
                        hiddenFieldDict[@"label"] = hiddenField.label;
                        hiddenFieldDict[@"name"] = hiddenField.name;
                        hiddenFieldDict[@"required"] = @(hiddenField.required);
                        hiddenFieldDict[@"maxLength"] = @(hiddenField.maxLength);
                        hiddenFieldDict[@"order"] = @(hiddenField.order);
                        hiddenFieldDict[@"value"] = hiddenField.value ?: [NSNull null];
                        hiddenFieldDict[@"isHidden"] = @(hiddenField.isHidden);
                        hiddenFieldDict[@"editable"] = @(hiddenField.isEditable);
                        
                        [hiddenPreChatFieldsArray addObject:hiddenFieldDict];
                    }
                    preChatConfigDict[@"hiddenPreChatFields"] = hiddenPreChatFieldsArray;
                    
                    [preChatConfigs addObject:preChatConfigDict];
                }
                [configData setObject:preChatConfigs forKey:@"preChatConfiguration"];
            }
            
            // Add choiceListConfiguration if available
            if (remoteConfig.choiceListConfiguration != nil) {
                NSMutableDictionary *choiceListConfigDict = [NSMutableDictionary dictionary];
                
                // Handle choiceLists
                if (remoteConfig.choiceListConfiguration.choiceLists != nil) {
                    NSMutableArray *choiceListsArray = [NSMutableArray array];
                    for (id<SMIChoiceList> choiceList in remoteConfig.choiceListConfiguration.choiceLists) {
                        NSMutableDictionary *choiceListDict = [NSMutableDictionary dictionary];
                        choiceListDict[@"identifier"] = choiceList.identifier;
                        
                        // Handle choiceList values
                        NSMutableArray *choiceListValuesArray = [NSMutableArray array];
                        for (id<SMIChoiceListValue> choiceListValue in choiceList.values) {
                            NSMutableDictionary *choiceListValueDict = [NSMutableDictionary dictionary];
                            choiceListValueDict[@"valueId"] = choiceListValue.valueId;
                            choiceListValueDict[@"order"] = @(choiceListValue.order);
                            choiceListValueDict[@"label"] = choiceListValue.label ?: [NSNull null];
                            choiceListValueDict[@"isDefaultValue"] = @(choiceListValue.isDefaultValue);
                            choiceListValueDict[@"valueName"] = choiceListValue.valueName;
                            
                            [choiceListValuesArray addObject:choiceListValueDict];
                        }
                        choiceListDict[@"values"] = choiceListValuesArray;
                        
                        [choiceListsArray addObject:choiceListDict];
                    }
                    choiceListConfigDict[@"choiceLists"] = choiceListsArray;
                }
                
                // Handle valueDependencies
                NSMutableArray *valueDependenciesArray = [NSMutableArray array];
                for (id<SMIChoiceListDependency> dependency in remoteConfig.choiceListConfiguration.valueDependencies) {
                    NSMutableDictionary *dependencyDict = [NSMutableDictionary dictionary];
                    dependencyDict[@"parentId"] = dependency.parentId;
                    dependencyDict[@"childId"] = dependency.childId;
                    
                    [valueDependenciesArray addObject:dependencyDict];
                }
                choiceListConfigDict[@"valueDependencies"] = valueDependenciesArray;
                
                [configData setObject:choiceListConfigDict forKey:@"choiceListConfiguration"];
            }
            
            // Add termsAndConditions if available
            if (remoteConfig.termsAndConditions != nil) {
                NSMutableDictionary *termsAndConditionsDict = [NSMutableDictionary dictionary];
                
                // Convert NSAttributedString to NSString for the label
                NSString *termsLabelString = [remoteConfig.termsAndConditions.label string];
                termsAndConditionsDict[@"label"] = termsLabelString ?: [NSNull null];
                
                // Add isRequired and isEnabled
                termsAndConditionsDict[@"isRequired"] = @(remoteConfig.termsAndConditions.isRequired);
                termsAndConditionsDict[@"isEnabled"] = @(remoteConfig.termsAndConditions.isEnabled);
                
                [configData setObject:termsAndConditionsDict forKey:@"termsAndConditions"];
            }

            // Resolve the promise with the constructed dictionary
            resolve(configData);
        } else {
            NSError *unexpectedError = [NSError errorWithDomain:@"UnexpectedError"
                                                           code:500
                                                       userInfo:@{NSLocalizedDescriptionKey: @"Unknown error retrieving remote configuration."}];
            reject(@"unexpected_error", @"Unknown error", unexpectedError);
        }
    }];
}


RCT_EXPORT_METHOD(submitRemoteConfiguration:(JS::NativeSalesforceMessagingInApp::RemoteConfiguration &)remoteConfigurationDict
                  createConversationOnSubmit:(BOOL)createConversationOnSubmit
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
    @try {
        // Ensure that the conversation client has been initialized
        if (conversationClient == nil) {
            NSError *error = [NSError errorWithDomain:@"ConversationClient Not Initialized"
                                                code:500
                                            userInfo:@{NSLocalizedDescriptionKey: @"ConversationClient is not initialized."}];
            reject(@"send_reply_exception", @"[submitRemoteConfiguration] ConversationClient is not initialized", error);
            return;
        }

        id<SMIRemoteConfiguration> remoteConfig = remoteConfiguration;

        // Get the pre-chat fields from the remote config.
        NSArray *preChatFields = remoteConfiguration.preChatConfiguration.firstObject.preChatFields;
        facebook::react::LazyVector<JS::NativeSalesforceMessagingInApp::PreChatField> filledPreChatFields = remoteConfigurationDict.preChatConfiguration().at(0).preChatFields();
        if (preChatFields != nil) {
            // Set the pre-chat values.
            for (id field in preChatFields) {
                NSString *fieldName = [field valueForKey:@"name"];  // Get the name of the field.
                
                // Ensure that fieldName is a valid string.
                if (![fieldName isKindOfClass:[NSString class]]) {
                    continue; // Skip if fieldName isn't a valid string.
                }
                
                // Find the corresponding field in filledPreChatFields with the same name.
                auto matchingField = std::find_if(
                    filledPreChatFields.begin(),
                    filledPreChatFields.end(),
                    [&](const auto& field) {
                        // Replace with the appropriate condition matching your predicate
                        return [field.name() isEqualToString:fieldName];
                    }
                );
                // If a matching field is found, set its value.
                if (matchingField != filledPreChatFields.end()) {
                    const auto& foundfield = *matchingField;
                    NSString *fieldValue = foundfield.value();
                    
                    // Ensure fieldValue is a valid string before setting.
                    if ([fieldValue isKindOfClass:[NSString class]]) {
                        // Use Key-Value Coding to set the value safely.
                        [field setValue:fieldValue forKey:@"value"];
                    }
                }
            }
        }
        // Get the pre-chat fields from the remote config.
        NSArray *hiddenPreChatFields = remoteConfiguration.preChatConfiguration.firstObject.hiddenPreChatFields;
        facebook::react::LazyVector<JS::NativeSalesforceMessagingInApp::PreChatField> filledHiddenPreChatFields = remoteConfigurationDict.preChatConfiguration().at(0).hiddenPreChatFields();
        if (hiddenPreChatFields != nil) {
            // Set the pre-chat values.
            for (id field in hiddenPreChatFields) {
                NSString *fieldName = [field valueForKey:@"name"];  // Get the name of the field.
                
                // Ensure that fieldName is a valid string.
                if (![fieldName isKindOfClass:[NSString class]]) {
                    continue; // Skip if fieldName isn't a valid string.
                }
                
                // Find the corresponding field in filledHiddenPreChatFields with the same name.
                auto matchingField = std::find_if(
                    filledHiddenPreChatFields.begin(),
                    filledHiddenPreChatFields.end(),
                    [&](const auto& field) {
                        // Replace with the appropriate condition matching your predicate
                        return [field.name() isEqualToString:fieldName];
                    }
                );
                
                // If a matching field is found, set its value.
                if (matchingField != filledHiddenPreChatFields.end()) {
                    const auto& foundfield = *matchingField;
                    NSString *fieldValue = foundfield.value();
                    // Ensure fieldValue is a valid string before setting.
                    if ([fieldValue isKindOfClass:[NSString class]]) {
                        // Use Key-Value Coding to set the value safely.
                        [field setValue:fieldValue forKey:@"value"];
                    }
                }
            }
        }
        [conversationClient submitRemoteConfiguration:remoteConfig createConversationOnSubmit:createConversationOnSubmit];
        resolve(@(YES));
    } @catch (NSException *exception) {
        // Handle exceptions by rejecting the promise
        NSError *error = [NSError errorWithDomain:@"sendReply Exception"
                                             code:500
                                         userInfo:@{NSLocalizedDescriptionKey: [exception reason]}];
        reject(@"send_reply_exception", @"An exception occurred during sendReply", error);
    }
}

RCT_EXPORT_METHOD(markAsRead:(JS::NativeSalesforceMessagingInApp::ConversationEntryBase &)entryDict
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
    @try {
        // Ensure that the conversation client has been initialized
        if (conversationClient == nil) {
            NSError *error = [NSError errorWithDomain:@"ConversationClient Not Initialized"
                                                code:500
                                            userInfo:@{NSLocalizedDescriptionKey: @"ConversationClient is not initialized."}];
            reject(@"mark_as_read_exception", @"[markAsRead] ConversationClient is not initialized", error);
            return;
        }

        // Extract entryId from entryDict
        NSString *entryId = entryDict.entryId();
        if (!entryId) {
            NSError *error = [NSError errorWithDomain:@"mark_as_read_exception"
                                                 code:400
                                             userInfo:@{NSLocalizedDescriptionKey: @"entryId is required"}];
            reject(@"mark_as_read_invalid_entry", @"entryId is required", error);
            return;
        }

        // Query the entries from the conversation client
        NSDate *fromDate = [NSDate dateWithTimeIntervalSince1970:0];
        SMIListAPIDirections queryDirection = SMIListAPIDirectionsAscending;

        [conversationClient entriesWithLimit:10000
                                fromTimestamp:fromDate
                                    direction:queryDirection
                                  completion:^(NSArray<id<SMIConversationEntry>> *entries, id<SMIConversation> conversation, NSError *error) {
            if (error) {
                // Handle errors during the query
                reject(@"mark_as_read_query_error", @"Failed to retrieve entries", error);
                return;
            }

            // Find the entry with the matching entryId
            id<SMIConversationEntry> matchingEntry = nil;
            for (id<SMIConversationEntry> entry in entries) {
                if ([entry.identifier isEqualToString:entryId]) {
                    matchingEntry = entry;
                    break;
                }
            }

            if (matchingEntry) {
                // Mark the found entry as read
                [coreClient markAsRead:matchingEntry];
                
                // Resolve the promise indicating success
                resolve(@(YES));
            } else {
                // Entry not found
                NSError *notFoundError = [NSError errorWithDomain:@"mark_as_read_exception"
                                                             code:404
                                                         userInfo:@{NSLocalizedDescriptionKey: @"SMIConversationEntry not found for the provided entryId."}];
                reject(@"mark_as_read_not_found", @"Entry not found", notFoundError);
            }
        }];
    } @catch (NSException *exception) {
        // Handle exceptions by rejecting the promise
        NSError *error = [NSError errorWithDomain:@"mark_as_read_exception"
                                             code:500
                                         userInfo:@{NSLocalizedDescriptionKey: [exception reason]}];
        reject(@"mark_as_read_exception", @"An exception occurred during markAsRead", error);
    }
}

RCT_EXPORT_METHOD(endConversation:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{

    @try {
        // Ensure that the coreClient has been initialized
        if (conversationClient == nil) {
            NSError *error = [NSError errorWithDomain:@"ConversationClient Not Initialized"
                                                code:500
                                            userInfo:@{NSLocalizedDescriptionKey: @"[endConversation] ConversationClient is not initialized"}];
            reject(@"end_conversation_exception", @"[endConversation] ConversationClient is not initialized", error);
            return;
        }

        [conversationClient endSessionWithCompletion:^(NSError * _Nullable error) {
            if (error == nil) {
                [self emitOnConnectionStatusChanged:@"Closed"];
                resolve(@(YES));
            }else {
                reject(@"end_conversation_exception", @"An exception occurred during endSessionWithCompletion", error);
            }
        }];

    } @catch (NSException *exception) {
        // Handle exceptions by rejecting the promise
        NSError *error = [NSError errorWithDomain:@"endConversation Exception"
                                             code:500
                                         userInfo:@{NSLocalizedDescriptionKey: [exception reason]}];
        reject(@"end_conversation_exception", @"An exception occurred during endConversation", error);
    }
}

RCT_EXPORT_METHOD(sendMessage:(NSString *)message
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{

    @try {
        // Ensure that the coreClient has been initialized
        if (conversationClient == nil) {
            NSError *error = [NSError errorWithDomain:@"ConversationClient Not Initialized"
                                                code:500
                                            userInfo:@{NSLocalizedDescriptionKey: @"ConversationClient is not initialized."}];
            reject(@"send_message_exception", @"[sendMessage] ConversationClient is not initialized", error);
            return;
        }

        [conversationClient sendMessage:message];
        resolve(@(YES));

    } @catch (NSException *exception) {
        // Handle exceptions by rejecting the promise
        NSError *error = [NSError errorWithDomain:@"sendMessage Exception"
                                             code:500
                                         userInfo:@{NSLocalizedDescriptionKey: [exception reason]}];
        reject(@"send_message_exception", @"An exception occurred during sendMessage", error);
    }
}
RCT_EXPORT_METHOD(sendReply:(JS::NativeSalesforceMessagingInApp::Choice &)replyDict
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
    @try {
        // Ensure that the conversation client has been initialized
        if (conversationClient == nil) {
            NSError *error = [NSError errorWithDomain:@"ConversationClient Not Initialized"
                                                code:500
                                            userInfo:@{NSLocalizedDescriptionKey: @"ConversationClient is not initialized."}];
            reject(@"send_reply_exception", @"[sendReply] ConversationClient is not initialized", error);
            return;
        }

        // Create a SMIChoice object from the provided reply dictionary
        NSString *optionId = replyDict.optionId();
        id<SMIChoice> reply = nil;
        for (id<SMIChoice> choice in receivedChoices) {
            if ([choice.optionId isEqualToString:optionId]) { // Match by optionId
                reply = choice;
                break; // Exit loop once the correct choice is found
            }
        }

        // If the choice was found, send the reply
        if (reply) {
            [conversationClient sendReply:reply];
            resolve(@(YES));
        } else {
            NSError *error = [NSError errorWithDomain:@"send_reply_exception"
                                                code:404
                                            userInfo:@{NSLocalizedDescriptionKey: @"SMIChoice not found for the provided optionId."}];
            reject(@"send_reply_not_found", @"SMIChoice not found", error);
        }

    } @catch (NSException *exception) {
        // Handle exceptions by rejecting the promise
        NSError *error = [NSError errorWithDomain:@"sendReply Exception"
                                             code:500
                                         userInfo:@{NSLocalizedDescriptionKey: [exception reason]}];
        reject(@"send_reply_exception", @"An exception occurred during sendReply", error);
    }
}

RCT_EXPORT_METHOD(sendTypingEvent:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
    @try {
        // Ensure that the coreClient has been initialized
        if (conversationClient == nil) {
            NSError *error = [NSError errorWithDomain:@"ConversationClient Not Initialized"
                                                code:500
                                            userInfo:@{NSLocalizedDescriptionKey: @"ConversationClient is not initialized."}];
            reject(@"send_message_exception", @"[sendTypingEvent] ConversationClient is not initialized", error);
            return;
        }

        [conversationClient sendTypingEvent];
        resolve(@(YES));

    } @catch (NSException *exception) {
        // Handle exceptions by rejecting the promise
        NSError *error = [NSError errorWithDomain:@"sendMessage Exception"
                                             code:500
                                         userInfo:@{NSLocalizedDescriptionKey: [exception reason]}];
        reject(@"send_message_exception", @"An exception occurred during sendMessage", error);
    }
}

RCT_EXPORT_METHOD(sendPDF:(NSString *)filePath
                  fileName:(NSString *)fileName
                  message:(id)message
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
    @try {
        // Ensure that the conversation client has been initialized
        if (conversationClient == nil) {
            NSError *error = [NSError errorWithDomain:@"ConversationClient Not Initialized"
                                                code:500
                                            userInfo:@{NSLocalizedDescriptionKey: @"ConversationClient is not initialized."}];
            reject(@"send_pdf_exception", @"[sendPDF] ConversationClient is not initialized", error);
            return;
        }
        // Remove the 'file://' prefix if present
        NSString *pdfPath = [filePath stringByReplacingOccurrencesOfString:@"file://" withString:@""];

        // Check if the original PDF file exists
        if (![[NSFileManager defaultManager] fileExistsAtPath:pdfPath]) {
            reject(@"file_not_found", @"PDF file not found at path", nil);
            return;
        }
        
        // Define the new file path in the app's documents directory
        // NSString *newFilePath = [[NSSearchPathForDirectoriesInDomains(NSCachesDirectory, NSUserDomainMask, YES) firstObject]
        //                          stringByAppendingPathComponent:fileName];
        // Extract the directory of the original file (DocumentPicker directory)
        NSString *documentPickerDirectory = [pdfPath stringByDeletingLastPathComponent];
        
        // Define the new file path in the DocumentPicker directory
        NSString *newFilePath = [documentPickerDirectory stringByAppendingPathComponent:fileName];

        // Remove any existing file at the destination path
        if ([[NSFileManager defaultManager] fileExistsAtPath:newFilePath]) {
            [[NSFileManager defaultManager] removeItemAtPath:newFilePath error:nil];
        }

        // Copy the PDF to the new location with the new name
        NSError *copyError = nil;
        [[NSFileManager defaultManager] copyItemAtPath:pdfPath toPath:newFilePath error:&copyError];
        
        if (copyError) {
            reject(@"file_copy_error", @"Failed to copy PDF file with new name", copyError);
            return;
        }

        // Load the PDF data from the new path
        NSData *pdfData = [NSData dataWithContentsOfFile:newFilePath];
        if (pdfData == nil) {
            NSError *error = [NSError errorWithDomain:@"PDFData Error"
                                                code:500
                                            userInfo:@{NSLocalizedDescriptionKey: @"Failed to read PDF data."}];
            reject(@"send_pdf_exception", @"Failed to read PDF data", error);
            return;
        }
        
        NSString *safeMessage;

        if ([message isKindOfClass:[NSString class]]) {
            safeMessage = (NSString *)message;
        } else {
            safeMessage = @"";
        }
        
        [conversationClient sendFile:pdfData fileName:fileName message:safeMessage];

        resolve(@(YES));
    } @catch (NSException *exception) {
        NSError *error = [NSError errorWithDomain:@"sendPDF Exception"
                                             code:500
                                         userInfo:@{NSLocalizedDescriptionKey: [exception reason]}];
        reject(@"send_pdf_exception", @"An exception occurred during sendPDF", error);
    }
}

// Method to send the Base64-encoded image
RCT_EXPORT_METHOD(sendImage:(NSString *)base64Image
                  fileName:(NSString *)fileName
                  uri:(NSString *)uri
                  message:(id)message
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
    @try {
        if (conversationClient == nil) {
            NSError *error = [NSError errorWithDomain:@"ConversationClient Not Initialized"
                                                code:500
                                            userInfo:@{NSLocalizedDescriptionKey: @"ConversationClient is not initialized."}];
            reject(@"send_image_exception", @"[sendImage] ConversationClient is not initialized", error);
            return;
        }
        // Decode the Base64 string into NSData
        NSData *imageData = [[NSData alloc] initWithBase64EncodedString:base64Image options:0];
        
        localImageUri = uri;
        
        // Ensure the image data is valid
        if (imageData == nil) {
            NSError *error = [NSError errorWithDomain:@"Invalid Base64"
                                                 code:500
                                             userInfo:@{NSLocalizedDescriptionKey: @"Failed to decode Base64 image data"}];
            reject(@"send_image_exception", @"Failed to decode Base64 image data", error);
            return;
        }

        NSString *safeMessage;

        if ([message isKindOfClass:[NSString class]]) {
            safeMessage = (NSString *)message;
        } else {
            safeMessage = @"";
        }
        
        [conversationClient sendFile:imageData fileName:fileName message:safeMessage];

        resolve(@(YES));
    } @catch (NSException *exception) {
        // Handle any exceptions by rejecting the promise
        NSError *error = [NSError errorWithDomain:@"sendImage Exception"
                                             code:500
                                         userInfo:@{NSLocalizedDescriptionKey: [exception reason]}];
        reject(@"send_image_exception", @"An exception occurred during sendImage", error);
    }
}

RCT_EXPORT_METHOD(retrieveTranscript:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
    @try {
        if (conversationClient == nil) {
            NSError *error = [NSError errorWithDomain:@"ConversationClient Not Initialized"
                                                code:500
                                            userInfo:@{NSLocalizedDescriptionKey: @"ConversationClient is not initialized."}];
            reject(@"retrieve_transcript_exception", @"[retrieveTranscript] ConversationClient is not initialized", error);
            return;
        }
        // Call retrieveTranscript on the conversationClient
        [conversationClient retrieveTranscript:^(PDFDocument * _Nullable pdfDocument, NSError * _Nullable error) {
            if (error != nil) {
                // Handle error by rejecting the promise
                reject(@"retrieve_transcript_error", @"Failed to retrieve transcript", error);
                return;
            }

            if (pdfDocument != nil) {
                // Convert PDFDocument to NSData
                NSData *pdfData = [pdfDocument dataRepresentation];
                
                if (pdfData == nil) {
                    // Handle error in case PDF data is nil
                    NSError *dataError = [NSError errorWithDomain:@"retrieveTranscript"
                                                             code:500
                                                         userInfo:@{NSLocalizedDescriptionKey: @"Failed to retrieve PDF data"}];
                    reject(@"retrieve_transcript_data_error", @"Failed to retrieve PDF data", dataError);
                    return;
                }

                // Encode the PDF data to a Base64 string
                NSString *base64PdfString = [pdfData base64EncodedStringWithOptions:0];
            
                NSInteger timestamp = (NSInteger)[[NSDate date] timeIntervalSince1970];
                NSUUID *entryId = [NSUUID UUID];
                
                NSMutableDictionary *messageDict = [NSMutableDictionary dictionary];
                messageDict[@"format"] = @"Transcript";
                messageDict[@"conversationId"] = @"";
                messageDict[@"entryId"] = [entryId UUIDString];
                messageDict[@"entryType"] = @"";
                messageDict[@"payloadId"] = @"";
                messageDict[@"senderDisplayName"] = @"";
                messageDict[@"status"] = @"Sent";
                
                messageDict[@"timestamp"] = @(timestamp);
                
                NSMutableDictionary *senderDict = [NSMutableDictionary dictionary];
                senderDict[@"role"] = @"System";
                senderDict[@"displayName"] = @"";
                senderDict[@"local"] = @(NO);
                senderDict[@"options"] = [NSMutableArray array];
                senderDict[@"subject"] = @"";
                
                messageDict[@"sender"] = senderDict;

                [self emitOnNewMessage:messageDict];
                NSMutableDictionary *resultDict = [NSMutableDictionary dictionary];
                resultDict[@"transcript"] = base64PdfString;
                resultDict[@"entryId"] = [entryId UUIDString];


                // Resolve the promise with the Base64-encoded PDF string
                resolve(resultDict);
            } else {
                // Handle case where pdfDocument is nil, though no error was returned
                NSError *noPdfError = [NSError errorWithDomain:@"retrieveTranscript"
                                                         code:500
                                                     userInfo:@{NSLocalizedDescriptionKey: @"No PDF document returned"}];
                reject(@"retrieve_transcript_no_pdf", @"No PDF document returned", noPdfError);
            }
        }];
    } @catch (NSException *exception) {
        // Catch and handle any exceptions by rejecting the promise
        NSError *exceptionError = [NSError errorWithDomain:@"retrieveTranscriptException"
                                                     code:500
                                                 userInfo:@{NSLocalizedDescriptionKey: [exception reason]}];
        reject(@"retrieve_transcript_exception", @"An exception occurred during retrieveTranscript", exceptionError);
    }
}
 
RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(generateUUID)
{
    NSUUID *uuid;
    uuid = [NSUUID UUID];
    return [uuid UUIDString];
}

- (NSDictionary *)parseChoiceToDictionary:(id<SMIChoice>)choice
{
    [receivedChoices addObject:choice];
    NSMutableDictionary *choiceDict = [NSMutableDictionary dictionary];
    choiceDict[@"optionId"] = choice.optionId;
    choiceDict[@"title"] = choice.title;
    choiceDict[@"optionValue"] = choice.optionValue;
    choiceDict[@"parentEntryId"] = choice.parentEntryId;
    return [choiceDict copy];
}

- (NSMutableArray *)parseChoiceArrayToDictionaryArray:(NSArray<id<SMIChoice>> *)choices
{
    NSMutableArray *choiceArray = [NSMutableArray array];
    for (id<SMIChoice> choice in choices) {
        [choiceArray addObject:[self parseChoiceToDictionary:choice]];
    }
    return choiceArray;
}

- (NSMutableArray *)parseAttachmentsArrayToDictionaryArray:(NSArray<id<SMIFileAsset>> *)attachments
{
    NSMutableArray *attachmentsArray = [NSMutableArray array];
    for (id<SMIFileAsset> attachment in attachments) {
        NSMutableDictionary *attachmentDict = [NSMutableDictionary dictionary];
        attachmentDict[@"name"] = attachment.name;
        attachmentDict[@"id"] = attachment.identifier;
        attachmentDict[@"mimeType"] = attachment.mimeType;
        if ([attachment.mimeType hasPrefix:@"image"] && localImageUri != nil && attachment.url == nil) {
            attachmentDict[@"url"] = localImageUri;
        } else {
            attachmentDict[@"url"] = attachment.url ? [attachment.url absoluteString] : nil;
        }
        NSString *stringFromData = [[NSString alloc] initWithData:attachment.file encoding:NSUTF8StringEncoding];
        if (stringFromData) {
            attachmentDict[@"file"] = stringFromData;
        }
        
        [attachmentsArray addObject:attachmentDict];
    }
    return attachmentsArray;
}

- (NSDictionary *)parseParticipantToDictionary:(id<SMIParticipant>)participant
{
    NSMutableDictionary *participantDict = [NSMutableDictionary dictionary];
    participantDict[@"subject"] = participant.subject;
    participantDict[@"role"] = participant.role;
    participantDict[@"local"] = @(participant.isLocal);
    participantDict[@"displayName"] = participant.displayName ?: [NSNull null];
    participantDict[@"options"] = [self parseChoiceArrayToDictionaryArray:participant.clientMenu.options];
    return [participantDict copy];
}

// Helper function to parse entry into a dictionary
- (NSDictionary *)parseEntryToDictionary:(id<SMIConversationEntry>)entry
{
    // You can add other fields from the `entry` or `payload` if needed
    // Example: NSString *format = entry.format;
    // messageDict[@"format"] = format;
    NSString *format = entry.format;

    // Extract fields from payload, assuming `entry.payload` conforms to `SMIEntryPayload`
    id<SMIEntryPayload> payload = entry.payload;

    // NSString *replyToEntryId = payload.replyTo ? payload.replyTo.identifier : @"";  // Handle replyTo entry
    // Convert the extracted properties into a dictionary
    NSMutableDictionary *messageDict = [NSMutableDictionary dictionary];
    messageDict[@"entryId"] = entry.identifier;
    messageDict[@"payloadDescription"] = entry.payload ? [entry.payload description] : @"";
    // messageDict[@"senderDisplayName"] = senderDisplayName ?: [NSNull null];
    messageDict[@"sender"] = [self parseParticipantToDictionary:entry.sender];
    messageDict[@"senderDisplayName"] = entry.senderDisplayName ?: [NSNull null];
    messageDict[@"messageType"] = entry.messageType ?: [NSNull null];
    messageDict[@"timestamp"] = @([entry.timestamp timeIntervalSince1970]);
    messageDict[@"conversationId"] = entry.conversationId.UUIDString;
    messageDict[@"status"] = entry.status;
    messageDict[@"format"] = format;
    messageDict[@"payloadId"] = payload.identifier ?: @"";
    messageDict[@"inReplyToEntryId"] = payload.inReplyToEntryId ?: @"";
    NSString * type = entry.type;
    messageDict[@"entryType"] = type;
    if (format == SMIConversationFormatTypesAttachments) {
        id<SMIAttachmentEntry> attachmentsPayload = (id<SMIAttachmentEntry>)payload;
        //https://salesforce-async-messaging.github.io/messaging-in-app-ios/Protocols/SMIAttachments.html#/c:objc(pl)SMIAttachments(py)attachments
        messageDict[@"attachments"] = [self parseAttachmentsArrayToDictionaryArray:attachmentsPayload.attachments];
        messageDict[@"text"] = attachmentsPayload.text ?: @"";
    }
    if (format == SMIConversationFormatTypesCarousel) {
        id<SMICarousel> carouselPayload = (id<SMICarousel>)payload;
        //https://salesforce-async-messaging.github.io/messaging-in-app-ios/Protocols/SMICarousel.html#/c:objc(pl)SMICarousel(py)items
        NSMutableArray *itemArray = [NSMutableArray array];
        for (id<SMITitleLinkItem> item in carouselPayload.items) {
            NSMutableDictionary *itemDict = [NSMutableDictionary dictionary];
            itemDict[@"interactionItems"] = [self parseChoiceArrayToDictionaryArray:item.interactionItems];
            itemDict[@"itemType"] = item.titleItem.itemType;
            itemDict[@"title"] = item.titleItem.title;
            itemDict[@"subTitle"] = item.titleItem.subTitle;
            itemDict[@"secondarySubTitle"] = item.titleItem.secondarySubTitle;
            itemDict[@"tertiarySubTitle"] = item.titleItem.tertiarySubTitle;
            itemDict[@"referenceId"] = item.titleItem.referenceId;
            
            [itemArray addObject:itemDict];
        }
        messageDict[@"items"] = itemArray;
        messageDict[@"attachments"] = [self parseAttachmentsArrayToDictionaryArray:carouselPayload.attachments];
        messageDict[@"selected"] = [self parseChoiceArrayToDictionaryArray:carouselPayload.selected];
    }
    if (format == SMIConversationFormatTypesImageMessage) {
        // id<SMIAttachments> textPayload = (id<SMIAttachments>)payload;
        // text = textPayload.text ?: @"";
    }
    if (format == SMIConversationFormatTypesInputs) {
        // id<SMIFormInputs> textPayload = (id<SMIFormInputs>)payload;
        //https://salesforce-async-messaging.github.io/messaging-in-app-ios/Protocols/SMIFormInputs.html
        //https://salesforce-async-messaging.github.io/messaging-in-app-ios/Protocols/SMIChoicesResponse.html
        // text = textPayload.text ?: @"";
    }
    if (format == SMIConversationFormatTypesRichLink) {
        id<SMIRichLinkMessage> richLinkPayload = (id<SMIRichLinkMessage>)payload;
        //https://salesforce-async-messaging.github.io/messaging-in-app-ios/Protocols/SMIRichLinkMessage.html
        // text = textPayload.text ?: @"";
        messageDict[@"title"] = richLinkPayload.title;
        messageDict[@"url"] = [richLinkPayload.url absoluteString];
        messageDict[@"messageReason"] = richLinkPayload.messageReason;

        NSMutableDictionary *assetDict = [NSMutableDictionary dictionary];
        if (richLinkPayload.asset.url) {
            assetDict[@"url"] = richLinkPayload.asset.url.absoluteString;
        } else if(richLinkPayload.asset.file) {
            assetDict[@"width"] = @(richLinkPayload.asset.width);
            assetDict[@"height"] = @(richLinkPayload.asset.height);
            // messageDict[@"asset"] = assetDict;
            // Fetch the image asset (assuming fetchContentWithCompletion just returns an error if there's a problem)
            /*[textPayload.asset fetchContentWithCompletion:^(NSError * _Nullable error) {
                if (error) {
                    NSLog(@"Error fetching image: %@", error.localizedDescription);
                } else {
                    // Access the image after fetching completes
                    UIImage *image = textPayload.asset.image;
                    if (image) {
                        // You can either add the UIImage directly or convert it to base64 string representation
                        NSData *imageData = UIImagePNGRepresentation(image);
                        if (imageData) {
                            NSString *base64String = [imageData base64EncodedStringWithOptions:NSDataBase64Encoding64CharacterLineLength];
                            assetDict[@"imageBase64"] = base64String;
                        }
                    }
                }
                
                // Add the asset dictionary to messageDict
                messageDict[@"asset"] = assetDict;

            }];*/
        }
        
        messageDict[@"asset"] = assetDict;

    }
    if (format == SMIConversationFormatTypesListPicker) {
        id<SMIListPicker> listPickerPayload = (id<SMIListPicker>)payload;
        //https://salesforce-async-messaging.github.io/messaging-in-app-ios/Protocols/SMIListPicker.html
        messageDict[@"text"] = listPickerPayload.text ?: @"";
        messageDict[@"messageReason"] = listPickerPayload.messageReason;
        messageDict[@"choices"] = [self parseChoiceArrayToDictionaryArray:listPickerPayload.choices];
        messageDict[@"selected"] = [self parseChoiceArrayToDictionaryArray:listPickerPayload.selected];
    }
    if (format == SMIConversationFormatTypesSelections) {
        id<SMIChoicesResponse> selectionsPayload = (id<SMIChoicesResponse>)payload;
        messageDict[@"selections"] = [self parseChoiceArrayToDictionaryArray:selectionsPayload.selections];
    }
    if (format == SMIConversationFormatTypesWebView) {
        // Describes a webview formatted message.
        // id<SMIAttachments> textPayload = (id<SMIAttachments>)payload;
        //https://salesforce-async-messaging.github.io/messaging-in-app-ios/Protocols/SMITemplatedURL.html
        // text = textPayload.text ?: @"";
    }
    if (format == SMIConversationFormatTypesResult) {
        // Describes a Form Message Response Result format.
        // id<SMIRoutingWorkResult> textPayload = (id<SMIRoutingWorkResult>)payload;
        // text = textPayload.text ?: @"";
    }
    if (format == SMIConversationFormatTypesUnspecified) {
        // id<SMIUnknownEntry> textPayload = (id<SMIUnknownEntry>)payload;
        //https://salesforce-async-messaging.github.io/messaging-in-app-ios/Protocols.html#/c:objc(pl)SMIUnknownEntry

        // Deze zijn in ieder geval mogelijk bij unspecified
        // SMIParticipantChangedPayload (gebruiker joined bijvoorbeeld, waarschijnlijk vergelijkbaar met deze props: https://salesforce-async-messaging.github.io/messaging-in-app-android/messaging-inapp-network/com.salesforce.android.smi.network.data.domain.conversationEntry.entryPayload.event.entries/-participant-changed-entry/index.html)
        //https://salesforce-async-messaging.github.io/messaging-in-app-ios/Protocols/SMIRoutingWorkResult.html
        //https://salesforce-async-messaging.github.io/messaging-in-app-ios/Protocols/SMIRoutingResult.html
        //https://salesforce-async-messaging.github.io/messaging-in-app-ios/Protocols/SMITypingIndicator.html
        // text = textPayload.text ?: @"";
        if (type == SMIConversationEntryTypesParticipantChanged) {
            id<SMIParticipantChanged> participantChangedPayload = (id<SMIParticipantChanged>)payload;
            messageDict[@"format"] = @"ParticipantChanged";
            NSMutableArray *operationsArray = [NSMutableArray array];
            for (id<SMIParticipantChangedOperation> operation in participantChangedPayload.operations) {
                NSMutableDictionary *operationDict = [NSMutableDictionary dictionary];
                operationDict[@"type"] = operation.type;
                operationDict[@"participant"] = [self parseParticipantToDictionary:operation.participant];
                [operationsArray addObject:operationDict];
            }
            messageDict[@"operations"] = operationsArray;
        } else if (type == SMIConversationEntryTypesTypingIndicator) {
            id<SMITypingIndicator> typingIndicatorPayload = (id<SMITypingIndicator>)payload;
            if(typingIndicatorPayload.type == SMITypingIndicatorTypesStarted){
                messageDict[@"format"] = @"TypingStartedIndicator";
            } else {
                messageDict[@"format"] = @"TypingStoppedIndicator";
            }
            messageDict[@"startedTimestamp"] = @([typingIndicatorPayload.timestamp timeIntervalSince1970]);
        } else if (type == SMIConversationEntryTypesRoutingWorkResult) {
            id<SMIRoutingWorkResult> routingWorkResultPayload = (id<SMIRoutingWorkResult>)payload;
            messageDict[@"format"] = @"RoutingWorkResult";
            messageDict[@"workType"] = routingWorkResultPayload.workType;
        } else if (type == SMIConversationEntryTypesRoutingResult) {
            id<SMIRoutingResult> routingResultPayload = (id<SMIRoutingResult>)payload;
            messageDict[@"format"] = @"RoutingResult";
            messageDict[@"routingType"] = routingResultPayload.routingType;
            messageDict[@"failureType"] = routingResultPayload.failureType;
            messageDict[@"failureReason"] = routingResultPayload.failureReason;
            messageDict[@"recordId"] = routingResultPayload.recordId;
            messageDict[@"estimatedWaitTime"] = @(routingResultPayload.estimatedWaitTime);
            messageDict[@"isEWTAvailable"] = @(routingResultPayload.isEWTAvailable);
            messageDict[@"isEWTRequested"] = @(routingResultPayload.isEWTRequested);
        } else if ([type isEqualToString:@"SessionStatusChanged"]) {
            id<SMISessionStatusChanged> sessionStatusPayload = (id<SMISessionStatusChanged>)payload;
            messageDict[@"sessionId"] = sessionStatusPayload.sessionId ?: @"";
            messageDict[@"channelAddressIdentifier"] = sessionStatusPayload.channelAddressIdentifier ?: @"";
            messageDict[@"sessionStatus"] = sessionStatusPayload.sessionStatus ?: SMISessionStatusUnknown;
            messageDict[@"sessionStatusPrev"] = sessionStatusPayload.sessionStatusPrev ?: [NSNull null];
            messageDict[@"sessionStartTime"] = @([sessionStatusPayload.sessionStartTime timeIntervalSince1970]);
            messageDict[@"sessionEndTime"] = sessionStatusPayload.sessionEndTime
              ? @([sessionStatusPayload.sessionEndTime timeIntervalSince1970])
              : [NSNull null];
            messageDict[@"sessionEndedByRole"] = sessionStatusPayload.sessionEndedByRole ?: [NSNull null];
        }
    }
    if (format == SMIConversationFormatTypesTextMessage) {
        id<SMITextMessage> textPayload = (id<SMITextMessage>)payload;
        messageDict[@"text"] = textPayload.text ?: @"";
        messageDict[@"messageReason"] = textPayload.messageReason;
    }
    if (format == SMIConversationFormatTypesQuickReplies) {
        id<SMIQuickReply> quickRepliesPayload = (id<SMIQuickReply>)payload;
        messageDict[@"text"] = quickRepliesPayload.text ?: @"";
        messageDict[@"messageReason"] = quickRepliesPayload.messageReason;
        messageDict[@"choices"] = [self parseChoiceArrayToDictionaryArray:quickRepliesPayload.choices];
        messageDict[@"selected"] = [self parseChoiceArrayToDictionaryArray:quickRepliesPayload.selected];
    }
    //https://salesforce-async-messaging.github.io/messaging-in-app-ios/Protocols/SMIEntryAck.html

    
    return [messageDict copy]; // Return an immutable dictionary
}

// This is triggered when new entries (messages) are added to a conversation.
- (void)core:(nonnull id<SMICoreClient>)core
  conversation:(nonnull id<SMIConversation>)conversation
didReceiveEntries:(nonnull NSArray<id<SMIConversationEntry>> *)entries
        paged:(BOOL)paged
{
    for (id<SMIConversationEntry> entry in entries) {
        NSDictionary *finalMessageDict = [self parseEntryToDictionary:entry];
        [self emitOnNewMessage:finalMessageDict];
    }
}

// Triggered when the status of entries is updated
- (void)core:(nonnull id<SMICoreClient>)core
  conversation:(nonnull id<SMIConversation>)conversation
didUpdateEntries:(nonnull NSArray<id<SMIConversationEntry>> *)entries
{
    for (id<SMIConversationEntry> entry in entries) {
        NSDictionary *finalMessageDict = [self parseEntryToDictionary:entry];
        [self emitOnUpdatedMessage:finalMessageDict];
        
    }
}

// Triggered when network status changes
- (void)core:(nonnull id<SMICoreClient>)core
didChangeNetworkState:(nonnull SMINetworkConnectivityState)state
{
    [self emitOnNetworkStatusChanged:state];
}

- (void)core:(nonnull id<SMICoreClient>)core
didChangeConnectionState:(nonnull SMIRealtimeConnectionState)state
{
    if (conversationClient == nil) {
        return;
    }
    [self emitOnConnectionStatusChanged:state];
}

- (void)core:(nonnull id<SMICoreClient>)core
didCreateConversation:(nonnull id<SMIConversation>)state
{
    
}

- (void)core:(nonnull id<SMICoreClient>)core
didUpdateConversation:(nonnull id<SMIConversation>)state
{
    
}

// Triggered when there is an error
- (void)core:(nonnull id<SMICoreClient>)core
didError:(nonnull NSError *)error
{
    NSMutableDictionary *errorMessageDict = [NSMutableDictionary dictionary];
    errorMessageDict[@"message"] = [error description];
    [self emitOnError:[errorMessageDict copy]];
}

// Triggered when a typing event starts
- (void)core:(nonnull id<SMICoreClient>)core
conversation:(id<SMIConversation>) conversation
didReceiveEvents:(NSArray<id<SMIConversationEntry>>*)events
{
//- (void) client:(id<SMIConversationClient>) client
//didReceiveEvents:(NSArray<id<SMIConversationEntry>> *) events
//{
    
    for (id<SMIConversationEntry> entry in events) {
        if (entry.type == SMIConversationEntryTypesTypingIndicator) {
            id<SMITypingIndicator> typingIndicatorPayload = (id<SMITypingIndicator>)entry.payload;
            if(typingIndicatorPayload.type == SMITypingIndicatorTypesStarted){
                NSDictionary *finalMessageDict = [self parseEntryToDictionary:entry];
                [self emitOnTypingStarted:finalMessageDict];
            } else if (typingIndicatorPayload.type == SMITypingIndicatorTypesStopped) {
                NSDictionary *finalMessageDict = [self parseEntryToDictionary:entry];
                [self emitOnTypingStopped:finalMessageDict];
            }
        }
    }
}

// Will be called when this module's first listener is added.
-(void)startObserving {
    hasListeners = YES;
    // Set up any upstream listeners or background tasks as necessary
}

// Will be called when this module's last listener is removed, or on dealloc.
-(void)stopObserving {
    hasListeners = NO;
    // Remove upstream listeners, stop unnecessary background tasks
}

- (void)addListener:(NSString *)eventName {
    hasListeners = YES;
}


- (void)removeListeners:(double)count {
    hasListeners = NO;
}

- (NSArray<NSString *> *)supportedEvents {
    return @[@"onNewMessage", @"onUpdatedMessage", @"onNetworkStatusChanged", @"onConnectionStatusChanged", @"onTypingStarted", @"onTypingStopped", @"onError"];
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeSalesforceMessagingInAppSpecJSI>(params);
}

@end
