@echo off
echo 🍽️  Starting AKIR Restaurant Website...
echo.

echo 🚀 Starting Backend Server...
cd backend
start "Backend Server" cmd /k "npm start"
cd ..

echo 🌐 Starting Frontend Server...
start "Frontend Server" cmd /k "npm run dev"

timeout /t 8 /nobreak > nul

echo.
echo 🎉 AKIR Restaurant Website is ready!
echo 📍 URL: https://web-restaurant-backend-rexh.onrender.com
echo.
echo 📧 Email notifications: akirrestaurants@gmail.com
echo 📞 Phone: 9391885317
echo 📍 Address: Benz Circle, Patamata Lanka, Vijayawada - 520010
echo.
echo Press any key to open website...
pause > nul

start https://web-restaurant-backend-rexh.onrender.com
