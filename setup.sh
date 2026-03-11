#!/bin/bash
# Setup script for Student Account Management System (Node.js)

echo "Installing Node.js dependencies for the accounting application..."
cd "$(dirname "$0")/src/accounting"
npm install
echo "Installation complete!"
echo ""
echo "To run the application, use one of the following:"
echo "  1. npm start (from src/accounting directory)"
echo "  2. Use VS Code Debug: Press F5 or go to Run > Start Debugging"
echo "  3. Run in terminal: node src/accounting/index.js (from project root)"
