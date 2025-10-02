#!/bin/bash

echo "🍽️  Setting up AKIR Restaurant local domain..."
echo ""

# Check if running on macOS
if [[ "$OSTYPE" == "darwin"* ]]; then
    echo "📝 Adding local domain to hosts file..."
    
    # Backup hosts file
    sudo cp /etc/hosts /etc/hosts.backup
    
    # Add AKIR Restaurant domain
    echo "127.0.0.1 akir-restaurant.local" | sudo tee -a /etc/hosts
    echo "127.0.0.1 akirrestaurant.local" | sudo tee -a /etc/hosts
    echo "127.0.0.1 akir.local" | sudo tee -a /etc/hosts
    
    echo "✅ Local domains added:"
    echo "   - akir-restaurant.local"
    echo "   - akirrestaurant.local" 
    echo "   - akir.local"
    echo ""
    
    echo "🌐 Now you can access your website by typing:"
    echo "   - akir-restaurant.local:5174"
    echo "   - akirrestaurant.local:5174"
    echo "   - akir.local:5174"
    echo ""
    
    echo "🚀 Starting website servers..."
    ./start-website.sh &
    
    sleep 5
    echo "🎉 AKIR Restaurant is now accessible at:"
    echo "   http://akir-restaurant.local:5174"
    echo "   http://akirrestaurant.local:5174"
    echo "   http://akir.local:5174"
    
else
    echo "❌ This script is designed for macOS. For other systems:"
    echo "   1. Edit your hosts file manually"
    echo "   2. Add: 127.0.0.1 akir-restaurant.local"
    echo "   3. Access via: http://akir-restaurant.local:5174"
fi
