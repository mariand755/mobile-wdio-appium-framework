#!/usr/bin/env bash
set -euo pipefail

# ---- Docker-only workdir to avoid cross-platform node_modules conflicts ----
WORKDIR_IN_CONTAINER="/work/docker/.workdir"

mkdir -p "$WORKDIR_IN_CONTAINER"

# Copy package files into docker workdir for dependency installation
cp /work/package.json "$WORKDIR_IN_CONTAINER/"
cp /work/package-lock.json "$WORKDIR_IN_CONTAINER/"

# Install deps into docker/.workdir/node_modules (Linux) instead of /work/node_modules
cd "$WORKDIR_IN_CONTAINER"
echo "Installing dependencies in Docker workdir (npm ci)..."
npm ci

# Return to repo root for test execution, but use docker workdir node_modules
cd /work
export NODE_PATH="$WORKDIR_IN_CONTAINER/node_modules"

# Debug: List connected devices from inside the container
echo "DEBUG: adb devices (host emulator via 5037 from inside container):"
adb -H host.docker.internal -P 5037 devices

# Start Appium server
echo "Starting Appium on 0.0.0.0:4723..."
appium --address 0.0.0.0 --port 4723 --base-path / --log-level info &
APPIUM_PID=$!

# ✅ Register cleanup immediately
trap 'kill "$APPIUM_PID" 2>/dev/null || true' EXIT

# Wait for Appium to be ready
until curl -s http://127.0.0.1:4723/status >/dev/null; do
  echo "Waiting for Appium..."
  sleep 1
done

echo "Running Android local tests..."
"$WORKDIR_IN_CONTAINER/node_modules/.bin/wdio" run ./src/config/wdio.android.local.conf.ts "$@"

