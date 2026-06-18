@echo off
chcp 65001 > nul
cd outfit-swiper
echo Installing dependencies...
call npm install
echo Starting app...
call npx expo start --web -c
