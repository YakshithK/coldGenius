# ColdGenius Installation Guide

You encountered a build error because some required dependencies are missing. Follow these steps to fix the issue and run the application correctly:

## Option 1: Install dependencies manually

1. Open a terminal or command prompt in the project directory
2. Run the following commands to install the missing dependencies:

```bash
npm install @hookform/resolvers
npm install @tailwindcss/forms
npm install @tailwindcss/typography
npm install date-fns
```

3. Once the installation is complete, run the application:

```bash
npm run dev
```

## Option 2: Use the provided batch file (Windows)

1. Simply double-click the `install-dependencies.bat` file in the project directory
2. Wait for the installation to complete
3. Run the application with:

```bash
npm run dev
```

## Option 3: Update package.json and install

1. Make sure the package.json file contains all the required dependencies:
   - "@hookform/resolvers": "^3.3.2"
   - "date-fns": "^2.30.0"
   - "@tailwindcss/forms": "^0.5.7"
   - "@tailwindcss/typography": "^0.5.10"

2. Run:

```bash
npm install
```

3. After successful installation, run:

```bash
npm run dev
```

## Fixing Tailwind Configuration

If you encounter issues with Tailwind plugins, update your `tailwind.config.js` file:

```js
plugins: [
  require('@tailwindcss/forms'),
  require('@tailwindcss/typography'),
],
```

## Troubleshooting

If you still encounter errors:

1. Delete the `node_modules` folder and `package-lock.json`
2. Run `npm install` to reinstall all dependencies
3. Start the development server with `npm run dev`

---

After successful installation, you should be able to access the application at [http://localhost:3000](http://localhost:3000) 