#!/bin/bash

# Define color codes
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if the version argument is provided
if [ -z "$1" ]; then
  echo -e "${RED}Error: No version number provided.${NC}"
  echo -e "${YELLOW}Usage: $0 <version>${NC}"
  echo -e "${YELLOW}Example: $0 1.2.3${NC}"
  echo -e "${YELLOW}This script updates the version in Cargo.toml, tauri.conf.json, and package.json files.${NC}"
  exit 1
fi

VERSION=$1

# Update version in Cargo.toml
sed -i "s/^version = \".*\"/version = \"$VERSION\"/" ./src-tauri/Cargo.toml

# Update version in tauri.conf.json
sed -i "s/\"version\": \".*\"/\"version\": \"$VERSION\"/" ./src-tauri/tauri.conf.json

# Update version in package.json
sed -i "s/\"version\": \".*\"/\"version\": \"$VERSION\"/" ./package.json

echo "Version updated to $VERSION in all files."