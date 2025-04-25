# ColdGenius Setup Script

# Create directories
Write-Host "Creating directory structure..." -ForegroundColor Green
New-Item -ItemType Directory -Force -Path app
New-Item -ItemType Directory -Force -Path app/api
New-Item -ItemType Directory -Force -Path app/api/generate
New-Item -ItemType Directory -Force -Path components
New-Item -ItemType Directory -Force -Path public

# Install dependencies
Write-Host "Installing dependencies..." -ForegroundColor Green
npm init -y
npm install next react react-dom typescript @types/node @types/react @types/react-dom openai react-loading
npm install --save-dev tailwindcss postcss autoprefixer eslint eslint-config-next

# Initialize Tailwind CSS
Write-Host "Initializing Tailwind CSS..." -ForegroundColor Green
npx tailwindcss init -p

Write-Host "Setup complete! Run 'npm run dev' to start the development server." -ForegroundColor Green 