#!/bin/bash

# Start Backend Server
echo "🚀 Starting AKIR Restaurant Backend..."
cd backend && npm start &
BACKEND_PID=$!

# Wait for backend to start
sleep 3

# Start Frontend Server
echo "🌐 Starting AKIR Restaurant Frontend..."
npm run dev &
FRONTEND_PID=$!

echo "✅ Both servers are starting..."
echo "📧 Backend API: http://localhost:3001"
echo "🌐 Frontend: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for user to stop
wait
