#!/bin/sh
set -e

API_KEY="$GOOGLE_MAPS_API_KEY_IOS"

if [ -z "$API_KEY" ]; then
  for ENV_FILE in "${SRCROOT}/../.env" "${SRCROOT}/../../.env"; do
    if [ -f "$ENV_FILE" ]; then
      API_KEY=$(grep -E '^GOOGLE_MAPS_API_KEY_IOS=' "$ENV_FILE" | head -n1 | cut -d '=' -f2- | sed -e 's/^"//' -e 's/"$//' -e "s/^'//" -e "s/'$//" | tr -d '\r')
      [ -n "$API_KEY" ] && break
    fi
  done
fi

if [ -z "$API_KEY" ]; then
  echo "error: GOOGLE_MAPS_API_KEY_IOS is not set in environment or .env file" >&2
  exit 1
fi

target_plist="$BUILT_PRODUCTS_DIR/$INFOPLIST_PATH"

if [ ! -f "$target_plist" ]; then
  echo "error: Plist file not found: $target_plist" >&2
  exit 1
fi

if /usr/libexec/PlistBuddy -c "Print :GOOGLE_MAPS_API_KEY" "$target_plist" >/dev/null 2>&1; then
  /usr/libexec/PlistBuddy -c "Set :GOOGLE_MAPS_API_KEY $(printf '%s' "$API_KEY")" "$target_plist"
else
  /usr/libexec/PlistBuddy -c "Add :GOOGLE_MAPS_API_KEY string $(printf '%s' "$API_KEY")" "$target_plist"
fi