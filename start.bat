@echo off
chcp 65001 >nul
cd /d "%~dp0"

where npm >nul 2>&1
if errorlevel 1 (
    echo.
    echo  [ПОМИЛКА] Node.js не знайдено в системі.
    echo.
    echo  Встановіть Node.js LTS: https://nodejs.org
    echo  або в терміналі: winget install OpenJS.NodeJS.LTS
    echo.
    echo  Після встановлення ЗАКРИЙТЕ і знову відкрийте термінал / Cursor.
    echo.
    pause
    exit /b 1
)

if not exist "node_modules\" (
    echo Встановлення залежностей...
    call npm install
    if errorlevel 1 pause & exit /b 1
)

echo.
echo  Запуск SpendWise: http://localhost:5173
echo  Зупинити: Ctrl+C
echo.
call npm run dev
pause
