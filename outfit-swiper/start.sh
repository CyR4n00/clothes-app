#!/bin/bash
cd outfit-swiper
echo "Installing dependencies..."
npm install
echo "Starting app..."
npx expo start --web -c
