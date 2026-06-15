#!/bin/bash
cd outfit-swiper
echo "Installing dependencies..."
npm install --legacy-peer-deps
echo "Starting app..."
npx expo start --web
