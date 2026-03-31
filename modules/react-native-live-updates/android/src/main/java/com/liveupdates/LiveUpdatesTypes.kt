package com.liveupdates

data class LiveUpdateImage(val url: String, val isRemote: Boolean)

data class LiveUpdateProgressPoint(val position: Int, val color: String? = null)

data class LiveUpdateProgressSegment(val length: Int, val color: String? = null)

data class LiveUpdateProgress(
  val max: Int?,
  val progress: Int?,
  val indeterminate: Boolean?,
  val points: ArrayList<LiveUpdateProgressPoint>? = null,
  val segments: ArrayList<LiveUpdateProgressSegment>? = null,
)

data class LiveUpdateState(
  val title: String,
  val text: String? = null,
  val subText: String? = null,
  val image: LiveUpdateImage? = null,
  val icon: LiveUpdateImage? = null,
  val shortCriticalText: String? = null,
  val progress: LiveUpdateProgress? = null,
  val showTime: Boolean? = null,
  val time: Long? = null,
)

data class LiveUpdateConfig(
  val channelId: String,
  val deepLinkUrl: String? = null,
  val iconBackgroundColor: String? = null,
)

object LiveUpdatesModuleEvents {
  const val ON_TOKEN_CHANGE = "onTokenChange"
  const val ON_NOTIFICATION_STATE_CHANGE = "onNotificationStateChange"
}