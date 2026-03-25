#!/bin/sh
set -e

# Try to get the key from the environment
API_KEY="$GOOGLE_MAPS_API_KEY_IOS"

# If not set, try to load from .env in the project root
if [ -z "$API_KEY" ]; then
  ENV_FILE="${SRCROOT}/../.env"
  if [ -f "$ENV_FILE" ]; then
    # Extract the value from the .env file (supports quotes and no quotes)
    API_KEY=$(grep -E '^GOOGLE_MAPS_API_KEY_IOS=' "$ENV_FILE" | head -n1 | cut -d '=' -f2- | sed -e 's/^"//' -e 's/"$//' -e "s/^'//" -e "s/'$//" | tr -d '\r')
  fi
fi

if [ -z "$API_KEY" ]; then
  echo "error: GOOGLE_MAPS_API_KEY_IOS is not set in environment or .env file"
  exit 1
fi

target_plist="$TARGET_BUILD_DIR/$INFOPLIST_PATH"
echo "target_plist: $target_plist" >&1

if [ -f "$target_plist" ]; then
    echo "Updating Plist: $target_plist" >&1
    # /usr/libexec/PlistBuddy -c "Delete :GOOGLE_MAPS_API_KEY" "$target_plist" 2>/dev/null
    /usr/libexec/PlistBuddy -c "Set :GOOGLE_MAPS_API_KEY $API_KEY" "$target_plist"
else
    echo "Plist file not found: $target_plist" >&1
fi
echo "Generated $OUTPUT_FILE"