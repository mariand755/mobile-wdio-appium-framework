# This Docker image is the “source of truth” for Node + dependencies + Appium.
# It intentionally targets Node 20 LTS for stability across CI and developer machines.

FROM node:20-bullseye

WORKDIR /work

# Install ADB tools and Java runtime (needed for Android automation tooling).
RUN apt-get update && apt-get install -y --no-install-recommends \
  android-sdk-platform-tools \
  android-sdk-build-tools \
  default-jre \
  bash \
  && rm -rf /var/lib/apt/lists/*

  # Tell Appium (and Android tooling) where the SDK lives in Debian images
ENV ANDROID_SDK_ROOT=/usr/lib/android-sdk
ENV ANDROID_HOME=/usr/lib/android-sdk
ENV PATH=$PATH:$ANDROID_SDK_ROOT/platform-tools

# Install Appium v2 + Android driver inside the container.
RUN npm i -g appium@latest \
  && appium driver install uiautomator2

# Install project dependencies (copied via bind-mount at runtime, but we keep this for caching if desired).
# We'll still run `npm ci` in the run script so the working directory is consistent with the mounted code.
