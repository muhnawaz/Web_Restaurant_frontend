#!/bin/bash

echo "🍽️  Starting AKIR Restaurant Website..."
echo ""

# Check if backend is running
if ! curl -s http://localhost:3001/health > /dev/null 2>&1; then
    echo "🚀 Starting Backend Server..."
    cd backend && npm start &
    BACKEND_PID=$!
    sleep 3
    echo "✅ Backend started on port 3001"
else
    echo "✅ Backend already running on port 3001"
fi

# Check if frontend is running
if ! curl -s http://localhost:5174 > /dev/null 2>&1; then
    echo "🌐 Starting Frontend Server..."
    npm run dev &
    FRONTEND_PID=$!
    sleep 5
    echo "✅ Frontend started on port 5174"
else
    echo "✅ Frontend already running on port 5174"
fi

echo ""
echo "🎉 AKIR Restaurant Website is ready!"
echo "📍 URL: http://localhost:5174"
echo ""
echo "📧 Email notifications: akirrestaurants@gmail.com"
echo "📞 Phone: 9391885317"
echo "📍 Address: Benz Circle, Patamata Lanka, Vijayawada - 520010"
echo ""
echo "🌐 Opening website in browser..."
open http://localhost:5174

echo "Press Ctrl+C to stop both servers"

# Wait for user to stop
wait
