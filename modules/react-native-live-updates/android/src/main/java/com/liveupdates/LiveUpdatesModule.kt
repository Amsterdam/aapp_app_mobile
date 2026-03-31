package com.liveupdates

import android.app.Notification
import android.app.PendingIntent
import android.content.Intent
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.util.Log
import androidx.annotation.RequiresPermission
import androidx.core.app.NotificationCompat
import androidx.core.app.NotificationCompat.ProgressStyle.Point
import androidx.core.app.NotificationCompat.ProgressStyle.Segment
import androidx.core.app.NotificationManagerCompat
import androidx.core.graphics.toColorInt
import androidx.core.net.toUri
import com.facebook.fbreact.specs.NativeLiveUpdatesSpec
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.module.annotations.ReactModule
import java.io.File
import java.net.URL

private const val TAG = "LiveUpdatesManager"
private const val DEFAULT_MAX_PROGRESS = 100

object NotificationActionExtra {
  const val NOTIFICATION_ACTION = "notificationAction"
  const val NOTIFICATION_ID = "notificationId"
}

@ReactModule(name = LiveUpdatesModule.NAME)
class LiveUpdatesModule(reactContext: ReactApplicationContext) :
  NativeLiveUpdatesSpec(reactContext) {
  private val notificationManager = NotificationManagerCompat.from(reactContext)
  private val idGenerator = IdGenerator(reactContext)

  @RequiresPermission("android.permission.POST_NOTIFICATIONS")
  @ReactMethod
  override fun startLiveUpdate(state: ReadableMap, config: ReadableMap): Double? {
    val notificationId = idGenerator.generateNextId()

    if (notificationExists(notificationId)) {
      Log.w(
        TAG,
        "failed to start notification - notification with id $notificationId already exists"
      )
      return null
    }

    val liveUpdateState = LiveUpdateState(
      title = state.getString("title") ?: return null,
      text = state.getString("text"),
      subText = state.getString("subText"),
      shortCriticalText = state.getString("shortCriticalText"),
      showTime = if (state.hasKey("showTime")) state.getBoolean("showTime") else null,
      time = if (state.hasKey("time")) state.getDouble("time").toLong() else null,
      image = if (state.hasKey("image")) state.getMap("image")?.let { image ->
        LiveUpdateImage(
          url = image.getString("url") ?: return null,
          isRemote = image.getBoolean("isRemote"),
        )
      } else null,
      icon = if (state.hasKey("icon")) state.getMap("icon")?.let { icon ->
        LiveUpdateImage(
          url = icon.getString("url") ?: return null,
          isRemote = icon.getBoolean("isRemote"),
        )
      } else null,
      progress = if (state.hasKey("progress")) state.getMap("progress")?.let { progress ->
        LiveUpdateProgress(
          max = if (progress.hasKey("max")) progress.getInt("max") else null,
          progress = if (progress.hasKey("progress")) progress.getInt("progress") else null,
          indeterminate = if (progress.hasKey("indeterminate")) progress.getBoolean("indeterminate") else null,
          points = if (progress.hasKey("points")) progress.getArray("points")?.let { points ->
            ArrayList((0 until points.size()).mapNotNull { i ->
              val point = points.getMap(i) ?: return@mapNotNull null
              LiveUpdateProgressPoint(
                position = point.getInt("position"),
                color = point.getString("color"),
              )
            })
          } else null,
          segments = if (progress.hasKey("segments")) progress.getArray("segments")
            ?.let { segments ->
              ArrayList((0 until segments.size()).mapNotNull { i ->
                val segment = segments.getMap(i) ?: return@mapNotNull null
                LiveUpdateProgressSegment(
                  length = segment.getInt("length"),
                  color = segment.getString("color"),
                )
              })
            } else null,
        )
      } else null,
    )

    val liveUpdateConfig = LiveUpdateConfig(
      channelId = config.getString("channelId") ?: return null,
      deepLinkUrl = config.getString("deepLinkUrl"),
      iconBackgroundColor = config.getString("iconBackgroundColor"),
    )

    val notification = createNotification(liveUpdateState, notificationId, liveUpdateConfig)
    notificationManager.notify(notificationId, notification)
    NotificationStateEventEmitter.emit(notificationId, NotificationAction.STARTED)
    return notificationId.toDouble()
  }

  private fun createNotification(
    state: LiveUpdateState,
    notificationId: Int,
    config: LiveUpdateConfig,
  ): Notification {
    state.progress?.let { createProgressStyle(it) }

    val notificationBuilder =
      NotificationCompat.Builder(this.reactApplicationContext, config.channelId)
        .setContentTitle(state.title)
        .setContentText(state.text)
        .setSmallIcon(android.R.drawable.star_on)
        .setSubText(state.subText)

    notificationBuilder.setShortCriticalText(state.shortCriticalText)
    notificationBuilder.setOngoing(true)
    notificationBuilder.setRequestPromotedOngoing(true)

    val image = state.image
    if (image != null) {
      val largeIconBitmap: Bitmap? = getBitmapFromImage(image)
      if (largeIconBitmap != null) {
        notificationBuilder.setLargeIcon(largeIconBitmap)
      }
    }

    val progress = state.progress
    if (progress != null) {
      if (progress.indeterminate == true) {
        notificationBuilder.setProgress(0, 0, true)
      } else {
        val style = createProgressStyle(progress)
        notificationBuilder.setStyle(style)

      }
    }

    if (state.showTime == false) {
      notificationBuilder.setShowWhen(false)
    } else {
      val time = state.time
      if (time != null) {
        notificationBuilder.setWhen(time)
      }
    }

    config.iconBackgroundColor?.let { backgroundColor ->
      try {
        notificationBuilder.setColor(backgroundColor.toColorInt())
      } catch (e: IllegalArgumentException) {
        Log.e(TAG, getInvalidColorFormatErrorMessage(backgroundColor), e)
      }
    }

    setNotificationDeleteIntent(notificationId, notificationBuilder)
    setNotificationClickIntent(notificationId, config, notificationBuilder)

    return notificationBuilder.build()
  }

  private fun getBitmapFromImage(image: LiveUpdateImage): Bitmap? {
    try {
      val (url, isRemote) = image
      return if (isRemote) getBitmapFromRemoteUrl(url) else getBitmapFromLocalUrl(url)
    } catch (e: Exception) {
      Log.w(TAG, "Creating bitmap from url failed.", e)
      return null
    }
  }

  private fun getBitmapFromLocalUrl(url: String): Bitmap {
    val fileUrl = url.replace("file://", "")
    val file = File(fileUrl)

    if (file.exists()) {
      return BitmapFactory.decodeFile(file.absolutePath)
    } else {
      throw Exception("FileCheck could not find file at $fileUrl.")
    }
  }

  private fun getBitmapFromRemoteUrl(url: String): Bitmap {
    val parsedUrl = URL(url)
    return BitmapFactory.decodeStream(parsedUrl.openConnection().getInputStream())
  }

  private fun createProgressStyle(progress: LiveUpdateProgress): NotificationCompat.ProgressStyle {
    val points =
      progress.points?.map {
        val (position, color) = it
        val point = Point(position)
        color?.let { color ->
          try {
            point.setColor(color.toColorInt())
          } catch (e: IllegalArgumentException) {
            Log.e(TAG, getInvalidColorFormatErrorMessage(color), e)
          }
        }
        point
      }

    val segments =
      progress.segments?.map {
        val (length, color) = it
        val segment = Segment(length)
        color?.let { color ->
          try {
            segment.setColor(color.toColorInt())
          } catch (e: IllegalArgumentException) {
            Log.e(TAG, getInvalidColorFormatErrorMessage(color), e)
          }
        }
        segment
      } ?: listOf(Segment(progress.max ?: DEFAULT_MAX_PROGRESS))

    val style = NotificationCompat.ProgressStyle().setProgressSegments(segments)

    points?.let { style.setProgressPoints(it) }
    progress.progress?.let { style.setProgress(it) }

    return style
  }

  private fun getInvalidColorFormatErrorMessage(color: String): String {
    return "Invalid color format: $color"
  }

  private fun setNotificationDeleteIntent(
    notificationId: Int,
    notificationBuilder: NotificationCompat.Builder,
  ) {
    val context = this.reactApplicationContext
    val deleteIntent = Intent(context, NotificationDismissedReceiver::class.java)
    deleteIntent.putExtra(NotificationActionExtra.NOTIFICATION_ID, notificationId)
    val deletePendingIntent =
      PendingIntent.getBroadcast(
        context,
        notificationId,
        deleteIntent,
        PendingIntent.FLAG_CANCEL_CURRENT or PendingIntent.FLAG_IMMUTABLE,
      )
    notificationBuilder.setDeleteIntent(deletePendingIntent)
  }

  private fun setNotificationClickIntent(
    notificationId: Int,
    config: LiveUpdateConfig?,
    notificationBuilder: NotificationCompat.Builder,
  ) {
    val context = this.reactApplicationContext
    val clickIntent = context.packageManager.getLaunchIntentForPackage(context.packageName)

    clickIntent?.apply {
      action = Intent.ACTION_VIEW

      val scheme = getScheme()

      config?.deepLinkUrl?.let { deepLink ->
        scheme?.let { data = "$scheme://${deepLink.removePrefix("/")}".toUri() }
          ?: run {
            Log.w(
              TAG,
              "deepLinkUrl property ignored. Please configure withChannelConfig plugin with scheme in app.config.ts to enable managing Live Update deeplinks.",
            )
          }
      }

      putExtra(NotificationActionExtra.NOTIFICATION_ACTION, NotificationAction.CLICKED)
      putExtra(NotificationActionExtra.NOTIFICATION_ID, notificationId)
    }

    val clickPendingIntent =
      PendingIntent.getActivity(
        context,
        notificationId,
        clickIntent,
        PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE,
      )
    notificationBuilder.setContentIntent(clickPendingIntent)
  }

  private fun notificationExists(notificationId: Int): Boolean {
    return notificationManager.activeNotifications.any { it.id == notificationId }
  }

  companion object {
    const val NAME = NativeLiveUpdatesSpec.NAME
  }
}
