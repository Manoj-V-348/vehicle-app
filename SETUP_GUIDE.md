# 🔧 Complete Setup & Installation Guide

This guide covers everything you need to know about setting up, installing, and configuring the Online Vehicle App System.

---

## 📑 Table of Contents

1. [System Requirements](#system-requirements)
2. [Installation Steps](#installation-steps)
3. [Project Configuration](#project-configuration)
4. [Running the App](#running-the-app)
5. [Development Setup](#development-setup)
6. [Build Configuration](#build-configuration)
7. [Testing](#testing)
8. [Deployment](#deployment)

---

## 💻 System Requirements

### Minimum Requirements

| Component | Requirement |
|-----------|-------------|
| **OS** | Windows 10/11, macOS 10.15+, Linux (Ubuntu 18.04+) |
| **Node.js** | v20.17.0 or higher |
| **npm** | v10.8.3 or higher |
| **RAM** | 4 GB minimum, 8 GB recommended |
| **Storage** | 2 GB free space |
| **Internet** | Required for initial setup |

### Recommended Setup

- **OS**: Windows 11 or macOS 13+
- **Node.js**: Latest LTS version (v20.x)
- **RAM**: 16 GB
- **CPU**: Quad-core processor
- **IDE**: Visual Studio Code with extensions

---

## 📥 Installation Steps

### Step 1: Install Node.js

Node.js is the runtime environment required to run the app.

#### Windows

1. **Download Node.js:**
   - Visit: https://nodejs.org/
   - Download the **LTS version** (Long Term Support)
   - Current recommended: v20.x.x

2. **Run the Installer:**
   - Double-click the downloaded `.msi` file
   - Follow the installation wizard
   - ✅ Check "Automatically install necessary tools"
   - ✅ Check "Add to PATH"

3. **Verify Installation:**
   ```bash
   node --version
   # Should show: v20.17.0 or higher

   npm --version
   # Should show: 10.8.3 or higher
   ```

#### macOS

1. **Using Homebrew (Recommended):**
   ```bash
   # Install Homebrew if not installed
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

   # Install Node.js
   brew install node@20
   ```

2. **Or Download from Website:**
   - Visit: https://nodejs.org/
   - Download the macOS installer
   - Run the `.pkg` file

3. **Verify Installation:**
   ```bash
   node --version
   npm --version
   ```

#### Linux (Ubuntu/Debian)

```bash
# Update package index
sudo apt update

# Install Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

---

### Step 2: Install Git (Optional)

Git is useful for version control but not required for running the app.

#### Windows
- Download from: https://git-scm.com/download/win
- Run installer with default settings

#### macOS
```bash
brew install git
```

#### Linux
```bash
sudo apt install git
```

---

### Step 3: Install Visual Studio Code (Recommended)

VS Code is a free, powerful code editor.

1. **Download:**
   - Visit: https://code.visualstudio.com/
   - Download for your OS

2. **Install Extensions (Recommended):**
   - Open VS Code
   - Press `Ctrl+Shift+X` (Windows/Linux) or `Cmd+Shift+X` (Mac)
   - Search and install:
     - **ES7+ React/Redux/React-Native snippets**
     - **TypeScript React code snippets**
     - **Prettier - Code formatter**
     - **ESLint**
     - **React Native Tools**

---

### Step 4: Navigate to Project Directory

Open your terminal/command prompt and navigate to the project:

```bash
# Windows
cd d:\Vehicle\online-vehicle-app

# macOS/Linux (adjust path as needed)
cd /path/to/online-vehicle-app
```

**Tip:** You can also right-click the folder and select "Open in Terminal" (Windows 11) or "Open in Terminal" (macOS).

---

### Step 5: Install Project Dependencies

The project dependencies should already be installed, but if the `node_modules` folder is missing:

```bash
npm install
```

**What This Does:**
- Reads `package.json`
- Downloads all required packages
- Creates `node_modules` folder
- Takes 2-5 minutes

**Expected Output:**
```
added 728 packages, and audited 729 packages in 2m

61 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

✅ Installation complete!

---

### Step 6: Verify Installation

Check that everything is installed correctly:

```bash
# Check if node_modules exists
dir node_modules     # Windows
ls node_modules      # macOS/Linux

# Check TypeScript compilation
npx tsc --noEmit
# Should complete with no errors

# Check project structure
dir src              # Windows
ls -la src           # macOS/Linux
```

---

## ⚙️ Project Configuration

### Understanding `package.json`

The `package.json` file contains project metadata and dependencies:

```json
{
  "name": "online-vehicle-app",
  "version": "1.0.0",
  "main": "expo/AppEntry.js",
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web"
  },
  "dependencies": {
    "react": "18.3.1",
    "react-native": "0.81.5",
    "expo": "~52.0.23",
    "@react-navigation/native": "^7.0.14",
    // ... more dependencies
  }
}
```

### Understanding `app.json`

The `app.json` file configures Expo and app settings:

```json
{
  "expo": {
    "name": "Vehicle App",
    "slug": "online-vehicle-app",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash-icon.png",
      "backgroundColor": "#007AFF"
    },
    "ios": {
      "bundleIdentifier": "com.vehicleapp.online"
    },
    "android": {
      "package": "com.vehicleapp.online"
    }
  }
}
```

**Key Settings:**
- `name`: App display name
- `slug`: URL-friendly identifier
- `version`: App version number
- `orientation`: Portrait (vertical) or landscape
- `icon`: App icon image
- `splash`: Splash screen configuration

---

### Understanding `tsconfig.json`

TypeScript configuration file:

```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "esModuleInterop": true,
    "jsx": "react-native"
  }
}
```

**What It Does:**
- Enables TypeScript features
- Sets compilation options
- Defines module resolution

---

## 🚀 Running the App

### Start the Development Server

```bash
npm start
```

**What Happens:**
1. Metro Bundler starts (JavaScript bundler)
2. QR code appears in terminal
3. Options menu displays
4. Server runs on port 8081

**Expected Output:**
```
Starting project at D:\Vehicle\online-vehicle-app
Starting Metro Bundler
Waiting on http://localhost:8081

› Press w to open in web browser
› Press a to open Android
› Press i to open iOS simulator
› Press r to reload app
```

---

### Running on Different Platforms

#### 1. Web Browser (Fastest)

```bash
# After npm start, press:
w
```

**OR** run directly:
```bash
npm run web
```

**Pros:**
- ✅ Instant preview
- ✅ Easy debugging
- ✅ Chrome DevTools

**Cons:**
- ❌ Not 100% native behavior

---

#### 2. Android Device/Emulator

**Requirements:**
- Expo Go app installed on device
- OR Android Studio with emulator

**On Physical Device:**
1. Install Expo Go from Play Store
2. Connect to same Wi-Fi as computer
3. Open Expo Go
4. Scan QR code from terminal

**On Emulator:**
```bash
# After npm start, press:
a
```

**OR** run directly:
```bash
npm run android
```

---

#### 3. iOS Simulator (Mac Only)

**Requirements:**
- macOS computer
- Xcode installed

**Setup Xcode:**
```bash
# Install Xcode from App Store
# Then install command line tools:
xcode-select --install
```

**Run App:**
```bash
# After npm start, press:
i
```

**OR** run directly:
```bash
npm run ios
```

---

#### 4. Physical iOS Device

**Requirements:**
- iPhone or iPad
- Expo Go app from App Store
- Same Wi-Fi network

**Steps:**
1. Install Expo Go from App Store
2. Open Expo Go
3. Scan QR code with Camera app
4. Tap notification to open in Expo Go

---

## 🛠️ Development Setup

### Setting Up Your IDE

#### Visual Studio Code

1. **Open Project:**
   ```bash
   cd d:\Vehicle\online-vehicle-app
   code .
   ```

2. **Install Recommended Extensions:**
   - React Native Tools
   - ES7+ React/Redux snippets
   - TypeScript React snippets
   - Prettier
   - ESLint

3. **Configure Settings:**

   Create `.vscode/settings.json`:
   ```json
   {
     "editor.formatOnSave": true,
     "editor.defaultFormatter": "esbenp.prettier-vscode",
     "typescript.tsdk": "node_modules/typescript/lib"
   }
   ```

---

### Understanding the Project Structure

```
online-vehicle-app/
│
├── 📁 src/                       # Source code
│   │
│   ├── 📁 components/            # Reusable components
│   │   ├── Button.tsx            # Custom button
│   │   └── VehicleCard.tsx       # Vehicle display card
│   │
│   ├── 📁 data/                  # Mock data
│   │   ├── mockVehicles.ts       # 30 vehicles
│   │   └── mockUsers.ts          # Users & bookings
│   │
│   ├── 📁 navigation/            # Navigation setup
│   │   └── AppNavigator.tsx      # Main navigator
│   │
│   ├── 📁 screens/               # All screens
│   │   ├── 📁 auth/              # Authentication
│   │   │   └── LoginScreen.tsx
│   │   │
│   │   ├── 📁 user/              # User screens (9)
│   │   │   ├── HomeScreen.tsx
│   │   │   ├── BrowseScreen.tsx
│   │   │   ├── VehicleDetailScreen.tsx
│   │   │   ├── SearchScreen.tsx
│   │   │   ├── BookingScreen.tsx
│   │   │   ├── RentalScreen.tsx
│   │   │   ├── ProfileScreen.tsx
│   │   │   ├── BookingHistoryScreen.tsx
│   │   │   └── PaymentScreen.tsx
│   │   │
│   │   └── 📁 admin/             # Admin screens (5)
│   │       ├── AdminDashboardScreen.tsx
│   │       ├── AdminVehiclesScreen.tsx
│   │       ├── AdminAddVehicleScreen.tsx
│   │       ├── AdminEditVehicleScreen.tsx
│   │       └── AdminBookingsScreen.tsx
│   │
│   ├── 📁 theme/                 # Design system
│   │   ├── colors.ts             # Color palette
│   │   └── typography.ts         # Typography
│   │
│   └── 📁 types/                 # TypeScript types
│       └── index.ts              # Type definitions
│
├── 📁 assets/                    # Static assets
│   ├── icon.png                  # App icon
│   ├── splash-icon.png           # Splash screen
│   └── adaptive-icon.png         # Android icon
│
├── 📄 App.tsx                    # Entry point
├── 📄 app.json                   # Expo config
├── 📄 package.json               # Dependencies
├── 📄 tsconfig.json              # TypeScript config
│
└── 📚 Documentation
    ├── README.md                 # Main documentation
    ├── QUICKSTART.md             # Quick start
    ├── BEGINNER_GUIDE.md         # Beginner guide
    ├── SETUP_GUIDE.md            # This file
    └── PROJECT_SUMMARY.md        # Project overview
```

---

## 🔨 Build Configuration

### Building for Production

#### Android APK

**Prerequisites:**
- EAS CLI installed

**Install EAS CLI:**
```bash
npm install -g eas-cli
```

**Login to Expo:**
```bash
eas login
```

**Configure Build:**
```bash
eas build:configure
```

**Build APK:**
```bash
eas build --platform android --profile preview
```

---

#### iOS IPA (Mac Only)

**Prerequisites:**
- macOS computer
- Apple Developer account
- Xcode installed

**Build IPA:**
```bash
eas build --platform ios --profile preview
```

---

### Creating a Standalone APK (Android)

For testing without Expo Go:

```bash
# Build APK
eas build --platform android --profile preview

# Download from Expo website
# Install on Android device
```

---

## 🧪 Testing

### TypeScript Type Checking

Check for type errors without running the app:

```bash
npx tsc --noEmit
```

**Expected:** No output = no errors ✅

---

### Testing on Multiple Devices

1. **Web Browser:**
   ```bash
   npm run web
   ```
   - Test in Chrome, Firefox, Safari, Edge

2. **Android Devices:**
   - Test on different screen sizes
   - Test on different Android versions

3. **iOS Devices:**
   - Test on iPhone and iPad
   - Test on different iOS versions

---

### Performance Testing

Monitor app performance:

1. **React DevTools:**
   - Press `m` in terminal
   - Select "Open React DevTools"

2. **Performance Monitor:**
   - Press `Shift + m` in terminal
   - View FPS, memory usage

---

## 🚢 Deployment

### Deploying to Expo

The app is automatically accessible via Expo Go after running `npm start`.

**Share with Others:**
1. Run `npm start`
2. Copy the Expo Go URL
3. Share the link or QR code

---

### Publishing to App Stores

#### Google Play Store (Android)

1. **Create Developer Account:**
   - Cost: $25 one-time fee
   - Register at: https://play.google.com/console

2. **Build Release APK:**
   ```bash
   eas build --platform android --profile production
   ```

3. **Upload to Play Store:**
   - Follow Google Play Console wizard
   - Provide app details, screenshots
   - Submit for review

---

#### Apple App Store (iOS)

1. **Create Developer Account:**
   - Cost: $99/year
   - Register at: https://developer.apple.com/

2. **Build Release IPA:**
   ```bash
   eas build --platform ios --profile production
   ```

3. **Upload to App Store:**
   - Use Xcode or Application Loader
   - Provide app details, screenshots
   - Submit for review

---

## 🔧 Advanced Configuration

### Environment Variables

Create `.env` file for environment-specific settings:

```bash
# .env
API_URL=https://api.example.com
API_KEY=your-api-key-here
```

**Install dotenv:**
```bash
npm install react-native-dotenv
```

---

### Custom Fonts

Add custom fonts to `assets/fonts/`:

**Update `app.json`:**
```json
{
  "expo": {
    "plugins": [
      [
        "expo-font",
        {
          "fonts": [
            "./assets/fonts/CustomFont-Regular.ttf",
            "./assets/fonts/CustomFont-Bold.ttf"
          ]
        }
      ]
    ]
  }
}
```

---

### App Icons & Splash Screen

**Generate Icons:**
1. Create 1024x1024 PNG icon
2. Place in `assets/icon.png`
3. Run:
```bash
npx expo-optimize
```

**Customize Splash:**
1. Edit `assets/splash-icon.png`
2. Update `app.json`:
```json
{
  "splash": {
    "image": "./assets/splash-icon.png",
    "backgroundColor": "#007AFF",
    "resizeMode": "contain"
  }
}
```

---

## 📝 Common Tasks

### Updating Dependencies

```bash
# Update all dependencies to latest
npm update

# Update specific package
npm install react-navigation@latest

# Check for outdated packages
npm outdated
```

---

### Clearing Cache

If you encounter strange errors:

```bash
# Clear Metro bundler cache
npm start -- --reset-cache

# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

---

### Adding New Dependencies

**Install a new package:**
```bash
npm install package-name

# For TypeScript types
npm install --save-dev @types/package-name
```

**Example:**
```bash
npm install axios
npm install --save-dev @types/axios
```

---

## 🐛 Troubleshooting Setup Issues

### Issue: "npm command not found"

**Solution:**
- Node.js not installed or not in PATH
- Reinstall Node.js
- Restart terminal/computer

---

### Issue: "EACCES: permission denied"

**Solution (Mac/Linux):**
```bash
sudo chown -R $USER:$USER ~/.npm
```

**Solution (Windows):**
- Run terminal as Administrator

---

### Issue: "Port 8081 already in use"

**Solution:**
```bash
# Windows
taskkill /F /IM node.exe

# Mac/Linux
killall node
```

---

### Issue: "Unable to resolve module"

**Solution:**
```bash
# Clear cache and restart
npm start -- --reset-cache

# Reinstall dependencies
rm -rf node_modules
npm install
```

---

## ✅ Setup Checklist

Before running the app, ensure:

- [ ] Node.js v20+ installed
- [ ] npm v10+ installed
- [ ] Project folder accessible
- [ ] `node_modules` folder exists
- [ ] No TypeScript errors (`npx tsc --noEmit`)
- [ ] Terminal in correct directory
- [ ] Port 8081 available
- [ ] Expo Go app installed (for mobile testing)

---

## 📞 Getting Help

### Resources

- **Expo Documentation:** https://docs.expo.dev/
- **React Native Docs:** https://reactnative.dev/docs/getting-started
- **React Navigation:** https://reactnavigation.org/
- **TypeScript:** https://www.typescriptlang.org/docs/

### Community

- **Expo Forums:** https://forums.expo.dev/
- **Stack Overflow:** Tag: `react-native` or `expo`
- **Reddit:** r/reactnative

---

## 🎉 You're All Set!

Your development environment is now configured and ready to go!

**Next Steps:**
1. Run `npm start` to start the app
2. Check [BEGINNER_GUIDE.md](BEGINNER_GUIDE.md) for usage instructions
3. Explore the code in `src/` folder
4. Start building amazing features!

---

**Happy Coding! 🚀**
