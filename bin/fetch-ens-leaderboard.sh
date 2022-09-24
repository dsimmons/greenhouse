#!/usr/bin/env bash

PAGE_SIZE=100
# A bit of a hack. For now, it's easiest to just hardcode how many pages there are total.
NUM_PAGES=1101
SCRIPT_DIR="$(dirname "${0}")"
OUTPUT_DIR="$SCRIPT_DIR/../data"

mkdir -p "$OUTPUT_DIR"

for i in $(eval echo "{1..$NUM_PAGES}")
do
  profiles_seen=$(((i-1)*$PAGE_SIZE))
  profile_min=$(($profiles_seen+1))
  profile_max=$((i*$PAGE_SIZE))

  echo "Fetching profiles $profile_min - $profile_max..."

  curl "https://ethleaderboard.xyz/api/frens?skip=$profiles_seen" > \
    "$OUTPUT_DIR/profiles_page-$i.json"

  # Wait between requests to be polite.
  sleep 1
done
