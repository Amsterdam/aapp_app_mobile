#!/bin/sh
set -e

# Try to get the key from the environment
API_KEY="$GOOGLE_MAPS_API_KEY_IOS"
API_KEY_SOURCE="env"

# If not set, try to load from .env (location varies depending on Xcode's SRCROOT)
if [ -z "$API_KEY" ]; then
  for ENV_FILE in "${SRCROOT}/../.env" "${SRCROOT}/../../.env"; do
    if [ -f "$ENV_FILE" ]; then
      # Extract the value from the .env file (supports quotes and no quotes)
      API_KEY=$(grep -E '^GOOGLE_MAPS_API_KEY_IOS=' "$ENV_FILE" | head -n1 | cut -d '=' -f2- | sed -e 's/^"//' -e 's/"$//' -e "s/^'//" -e "s/'$//" | tr -d '\r')
      if [ -n "$API_KEY" ]; then
        API_KEY_SOURCE="$ENV_FILE"
        break
      fi
    fi
  done
fi

if [ -z "$API_KEY" ]; then
  echo "error: GOOGLE_MAPS_API_KEY_IOS is not set in environment or .env file"
  exit 1
fi

# Safe debug output: never print the API key value
echo "GOOGLE_MAPS_API_KEY_IOS source: $API_KEY_SOURCE" >&1
echo "GOOGLE_MAPS_API_KEY_IOS length: ${#API_KEY}" >&1

target_plist="$TARGET_BUILD_DIR/$INFOPLIST_PATH"
echo "target_plist: $target_plist" >&1

if [ -f "$target_plist" ]; then
    echo "Updating Plist: $target_plist" >&1
    # /usr/libexec/PlistBuddy -c "Delete :GOOGLE_MAPS_API_KEY" "$target_plist" 2>/dev/null
    /usr/libexec/PlistBuddy -c "Set :GOOGLE_MAPS_API_KEY $API_KEY" "$target_plist"
else
    echo "Plist file not found: $target_plist" >&1
fi
echo "Done (updated built Info.plist)" >&1