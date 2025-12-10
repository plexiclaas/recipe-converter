# PWA Setup Instructions

## ✅ What's Already Done

Your app is now configured as a Progressive Web App (PWA)! Here's what was set up:

1. ✅ Installed `@ducanh2912/next-pwa` package
2. ✅ Created `manifest.json` with app metadata
3. ✅ Updated `next.config.mjs` with PWA configuration
4. ✅ Updated `app/layout.js` with manifest links and metadata
5. ✅ Created placeholder SVG icons

## 📱 Creating PNG Icons (Required)

The manifest references PNG icons, but currently only SVG placeholders exist. You need to create PNG versions:

### Option 1: Online Converter (Easiest)
1. Go to https://convertio.co/svg-png/ or https://cloudconvert.com/svg-to-png
2. Upload `public/icon-192x192.svg` and convert to PNG at 192x192
3. Save as `public/icon-192x192.png`
4. Upload `public/icon-512x512.svg` and convert to PNG at 512x512
5. Save as `public/icon-512x512.png`

### Option 2: Using Image Editor
1. Open the SVG files in any image editor (Photoshop, GIMP, Figma, etc.)
2. Export as PNG at the exact sizes:
   - `icon-192x192.png` (192x192 pixels)
   - `icon-512x512.png` (512x512 pixels)

### Option 3: Custom Icons
Replace the SVG files with your own custom icons:
- Use a cake/baking themed icon
- Square format with rounded corners
- White background (#ffffff)
- Save as PNG files at 192x192 and 512x512 sizes

## 🚀 How to Use on Your Smartphone

### For Development (Local Testing):
1. Make sure your phone and computer are on the same WiFi network
2. Find your computer's local IP address:
   - Windows: Open Command Prompt, type `ipconfig`, look for "IPv4 Address"
   - Mac/Linux: Open Terminal, type `ifconfig` or `ip addr`
3. Run `npm run dev`
4. On your phone's browser, go to `http://YOUR_IP_ADDRESS:3000`
   - Example: `http://192.168.1.100:3000`

### For Production (After Deployment):
1. Deploy your app to a hosting service (Vercel, Netlify, etc.)
2. Make sure it's served over HTTPS (required for PWA)
3. Visit your deployed URL on your smartphone

### Installing the App:
1. **On Android (Chrome):**
   - Open your app in Chrome
   - Tap the menu (3 dots) → "Add to Home screen" or "Install app"
   - Or you'll see an install banner at the bottom

2. **On iPhone (Safari):**
   - Open your app in Safari
   - Tap the Share button (square with arrow)
   - Select "Add to Home Screen"
   - Customize the name if needed
   - Tap "Add"

3. **The app will now appear on your home screen!**
   - Tap it to open in standalone mode (no browser UI)
   - Works offline (after first load)

## 🔧 Testing Locally

1. Build the production version:
   ```bash
   npm run build
   npm start
   ```

2. The PWA features are disabled in development mode by default
3. Test the install prompt in production build or after deployment

## 📝 Notes

- The app works offline after the first visit (cached)
- Service worker is automatically generated in the `public` folder
- Make sure to create the PNG icons for the best experience
- HTTPS is required for PWA features (localhost works for development)



