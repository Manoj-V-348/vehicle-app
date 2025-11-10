# 🚗 Online Vehicle App - Complete Beginner's Guide

Welcome! This guide will help you set up and run the Online Vehicle App, even if you're new to React Native or mobile development.

---

## 📋 Table of Contents

1. [What is This App?](#what-is-this-app)
2. [Prerequisites](#prerequisites)
3. [Step-by-Step Setup](#step-by-step-setup)
4. [Running the App](#running-the-app)
5. [Understanding the App](#understanding-the-app)
6. [Troubleshooting](#troubleshooting)
7. [Next Steps](#next-steps)

---

## 🤔 What is This App?

The **Online Vehicle App System** is a mobile application that lets users:
- **Browse** and search for vehicles (cars, bikes, trucks, SUVs)
- **Buy** vehicles online
- **Rent** vehicles by day, week, or month
- **Book** test drives
- **Admin** can manage all vehicles and bookings

**Important**: This is a **Proof of Concept (POC)** with:
- ✅ Beautiful Apple-style UI design
- ✅ Full frontend functionality
- ✅ Mock/fake data (30 randomized vehicles)
- ❌ No real backend or database
- ❌ No real payments

---

## 📦 Prerequisites

### What You Need Before Starting

#### 1. **Node.js** (JavaScript Runtime)
Node.js is required to run the app.

**Check if you have it:**
```bash
node --version
```

If you see a version number like `v20.17.0`, you're good! ✅

**If not installed:**
- Download from: https://nodejs.org/
- Install the **LTS version** (Long Term Support)
- Restart your computer after installation

#### 2. **npm** (Package Manager)
npm comes with Node.js automatically.

**Check if you have it:**
```bash
npm --version
```

You should see something like `10.8.3` ✅

#### 3. **A Code Editor** (Optional but Recommended)
- **Visual Studio Code** (Free): https://code.visualstudio.com/
- Makes it easy to view and edit code

#### 4. **Expo Go App** (For Testing on Phone)
- **Android**: Download from Google Play Store
- **iOS**: Download from Apple App Store
- Search for "**Expo Go**"

---

## 🛠️ Step-by-Step Setup

### Step 1: Open Terminal/Command Prompt

**On Windows:**
- Press `Windows Key + R`
- Type `cmd` and press Enter
- Or search for "Command Prompt" in Start Menu

**On Mac:**
- Press `Command + Space`
- Type `terminal` and press Enter

**On Linux:**
- Press `Ctrl + Alt + T`

### Step 2: Navigate to the Project Folder

Use the `cd` command to go to the app folder:

```bash
cd d:\Vehicle\online-vehicle-app
```

**Tip**: You can also:
- Right-click the folder in File Explorer
- Select "Open in Terminal" (if available)

### Step 3: Verify You're in the Right Place

Type this command to see the files:

```bash
dir
```
(On Mac/Linux, use `ls` instead)

You should see files like:
- `App.tsx`
- `package.json`
- `src` folder
- `README.md`

✅ If you see these, you're in the right place!

### Step 4: Check Dependencies

The project should already have dependencies installed. Check if the `node_modules` folder exists:

```bash
dir
```

Look for a folder called `node_modules`.

**If it exists:** ✅ Skip to [Running the App](#running-the-app)

**If it doesn't exist:** Run this command:

```bash
npm install
```

This will:
- Download all required packages
- Take 2-5 minutes
- Show a progress bar

**Wait for it to complete!** You'll see:
```
added 728 packages in 2m
```

---

## 🚀 Running the App

### Step 1: Start the Development Server

In your terminal, run:

```bash
npm start
```

**What happens:**
- The Metro Bundler starts (this compiles your app)
- You'll see a QR code in the terminal
- You'll see options to run on different platforms

**Wait for this message:**
```
Metro waiting on exp://192.168.x.x:8081
```

✅ Your server is running!

### Step 2: Choose How to Run the App

You have **4 options**:

#### Option 1: 🌐 Run in Web Browser (Easiest!)

In the terminal, press:
```
w
```

Your default browser will open with the app!

**Pros:**
- ✅ Fastest and easiest
- ✅ No additional setup needed
- ✅ Good for testing

**Cons:**
- ❌ Some mobile features might not work perfectly

---

#### Option 2: 📱 Run on Your Phone (Most Realistic!)

**Requirements:**
- Expo Go app installed on your phone
- Phone and computer on the **same Wi-Fi network**

**Steps:**

1. Open **Expo Go** app on your phone

2. **On Android:**
   - Tap "Scan QR Code"
   - Point your camera at the QR code in the terminal

3. **On iOS:**
   - Open the Camera app
   - Point it at the QR code
   - Tap the notification that appears

**Wait for the app to load** (20-30 seconds first time)

✅ The app opens on your phone!

**Pros:**
- ✅ Most realistic experience
- ✅ Test touch gestures
- ✅ See actual mobile UI

**Cons:**
- ❌ Requires same Wi-Fi network
- ❌ Slightly slower to reload

---

#### Option 3: 🤖 Run on Android Emulator

**Requirements:**
- Android Studio installed
- Android emulator set up

In the terminal, press:
```
a
```

**If you don't have an emulator set up**, follow this guide:
https://docs.expo.dev/workflow/android-studio-emulator/

---

#### Option 4: 🍎 Run on iOS Simulator (Mac Only!)

**Requirements:**
- Mac computer
- Xcode installed

In the terminal, press:
```
i
```

The iOS Simulator will open with your app.

---

## 📱 Understanding the App

### Login Screen

When the app starts, you'll see a login screen.

#### Demo Accounts

The app comes with **2 demo accounts**:

**1. User Account** (Regular Customer)
```
Email: user@example.com
Password: password
```
**What you can do:**
- Browse vehicles
- Search and filter
- View vehicle details
- Book vehicles (purchase/test drive)
- Rent vehicles
- View booking history
- Manage profile

**2. Admin Account** (Vehicle Manager)
```
Email: admin@vehicleapp.com
Password: admin123
```
**What you can do:**
- View dashboard with statistics
- Add new vehicles
- Edit existing vehicles
- Delete vehicles
- Manage all bookings
- Confirm/cancel bookings

#### Quick Login Buttons

On the login screen, you'll see **two buttons**:
- **"User Account"** - Automatically fills user credentials
- **"Admin Account"** - Automatically fills admin credentials

Just tap a button and then tap **"Sign In"**!

---

### User Interface Tour

#### 🏠 Home Screen (User)
After logging in as a user, you'll see:

1. **Welcome Header** - Greeting and search button
2. **Quick Stats** - Total vehicles, availability, support
3. **Browse by Type** - Car, SUV, Bike, Truck icons
4. **Featured Vehicles** - Top-rated vehicles
5. **Quick Actions** - Rent or Buy shortcuts

**Try This:**
- Tap a vehicle card to see details
- Tap "Browse by Type" to filter vehicles
- Tap the search icon to open advanced search

---

#### 🚗 Browse Screen
View all vehicles with filters.

**Features:**
- Filter chips at the top (All, Car, SUV, Bike, Truck, Van)
- Tap a chip to filter by vehicle type
- Results count updates automatically
- Tap any vehicle to see details

---

#### 🔍 Vehicle Detail Screen
See complete information about a vehicle.

**What's Included:**
- **Image Carousel** - Swipe left/right to see more photos
- **Vehicle Name & Rating** - Top of screen
- **Specifications Grid** - 6 spec cards (mileage, fuel, transmission, etc.)
- **Features List** - Checkmarks for each feature
- **Availability Status** - Shows if vehicle is available
- **Action Buttons:**
  - **Test Drive** - Schedule a test drive
  - **Rent** - Open rental booking
  - **Buy Now** - Purchase the vehicle

---

#### 📅 Rental Screen
Book a vehicle for rental.

**How to Rent:**
1. Select **Rental Duration**:
   - Daily (per day)
   - Weekly (per week)
   - Monthly (per month)

2. Choose **Start Date**:
   - Swipe through the date picker
   - Tap a date to select

3. Choose **End Date**:
   - Must be after start date
   - Disabled dates are grayed out

4. Select **Pickup Time**:
   - Swipe through time options
   - Common times: 9 AM, 12 PM, 3 PM, etc.

5. **Add Insurance** (Optional):
   - Toggle the insurance switch
   - Adds $20/day to total

6. Review **Rental Summary**:
   - Duration calculated automatically
   - Pricing breakdown shown
   - Total at bottom

7. Tap **"Confirm Rental"**

---

#### 💳 Payment Screen
Mock payment confirmation.

**Features:**
- **Payment Summary** - Shows total amount
- **Payment Methods**:
  - Credit/Debit Card
  - PayPal
  - Apple Pay
  - Google Pay

**For Card Payment:**
1. Enter card number (any 16 digits)
2. Enter cardholder name
3. Enter expiry date (MM/YY format)
4. Enter CVV (any 3 digits)
5. Optionally save card
6. Tap **"Pay Now"**

**Success!** A confirmation modal appears.

---

#### 📊 Admin Dashboard
After logging in as admin, you'll see:

**Statistics:**
- Total Revenue
- Active Bookings
- Total Vehicles
- Available Now

**Booking Chart:**
- Visual bar chart showing booking distribution

**Recent Activity:**
- Timeline of recent actions
- Bookings, vehicle updates, user registrations

---

#### 🚙 Admin Vehicle Management

**Vehicles Screen:**
- Search bar at top
- Filter button with badge
- List of all vehicles
- Each card shows:
  - Vehicle image
  - Name, year, type
  - Availability toggle
  - Specs (mileage, seats, rating)
  - Prices (purchase & rental)
  - Edit, View, Delete buttons

**Add New Vehicle:**
1. Tap the **"+ Add Vehicle"** button
2. Fill out the form:
   - Basic Info (name, brand, model, year)
   - Type & Condition (select chips)
   - Pricing (purchase price, rental price)
   - Technical Specs (fuel, transmission, etc.)
   - Additional Details (location, description, features)
3. Tap **"Add Vehicle"**

**Edit Vehicle:**
1. Tap **Edit** button on any vehicle
2. Form is pre-filled with current data
3. Update any fields
4. Tap **"Save Changes"**

**Toggle Availability:**
- Tap the toggle switch on any vehicle card
- Green = Available
- Gray = Not Available

---

### Navigation

#### Bottom Tabs (User)
- **Home** 🏠 - Home screen
- **Browse** 🚗 - All vehicles
- **Profile** 👤 - User profile

#### Bottom Tabs (Admin)
- **Dashboard** 📊 - Admin dashboard
- **Vehicles** 🚙 - Manage vehicles
- **Bookings** 📅 - Manage bookings

#### Back Navigation
- Tap the **← back arrow** in the top-left corner
- Or swipe from left edge (iOS gesture)

---

## 🎨 App Features Explained

### Mock Data
The app includes **30 pre-generated vehicles**:

- **10 Cars** - Tesla, BMW, Mercedes, Audi, Porsche, Toyota, Honda, Ford, Chevrolet, Lexus
- **8 SUVs** - Range Rover, Jeep, Cadillac, BMW, Mercedes, Audi, Volvo, Lexus
- **6 Bikes/Motorcycles** - Harley-Davidson, Ducati, Yamaha, Kawasaki, Honda, Suzuki
- **4 Trucks** - Ford F-150, Chevrolet Silverado, Ram, GMC
- **2 Vans** - Mercedes Sprinter, Ford Transit

Each vehicle has:
- Randomized prices ($8,000 - $200,000)
- Rental rates ($50 - $650/day)
- Realistic specifications
- 6-10 features
- 3 images each
- Ratings and reviews

### Search & Filter
Find exactly what you need:

**Filters Available:**
- Vehicle Type (Car, SUV, Bike, Truck, Van)
- Fuel Type (Petrol, Diesel, Electric, Hybrid, CNG)
- Transmission (Automatic, Manual, CVT, Semi-Automatic)
- Price Range (Budget, Mid-Range, Luxury, Ultra-Luxury)
- Text Search (by name, brand, or model)

### Booking Types
Three ways to interact with vehicles:

1. **Purchase** - Buy the vehicle outright
2. **Rental** - Rent by day, week, or month
3. **Test Drive** - Schedule a free test drive

### Apple-Style Design
The app follows Apple's design principles:

**Visual Design:**
- Clean, minimalist layouts
- Generous white space
- Subtle shadows
- Rounded corners (12-16px)
- Premium color palette

**Typography:**
- Large, bold titles
- Clear hierarchy
- Readable body text
- System fonts (SF Pro-inspired)

**Interactions:**
- Smooth animations
- Touch feedback
- Intuitive gestures
- Clear buttons

**Colors:**
- Primary: iOS Blue (#007AFF)
- Success: Green (#34C759)
- Warning: Orange (#FF9500)
- Danger: Red (#FF3B30)
- Grays for backgrounds

---

## 🐛 Troubleshooting

### "Command not found: npm"

**Problem:** Node.js is not installed or not in PATH.

**Solution:**
1. Install Node.js from https://nodejs.org/
2. Restart your terminal
3. Try again

---

### "Cannot find module"

**Problem:** Dependencies not installed.

**Solution:**
```bash
cd d:\Vehicle\online-vehicle-app
npm install
```

Wait for installation to complete, then run `npm start` again.

---

### "Port 8081 already in use"

**Problem:** Another Metro Bundler is running.

**Solution:**

**Option 1:** Kill the process
```bash
# Windows
taskkill /F /IM node.exe

# Mac/Linux
killall node
```

**Option 2:** Use a different port
```bash
npm start -- --port 8082
```

---

### QR Code doesn't work on phone

**Problem:** Phone and computer not on same Wi-Fi.

**Solution:**
1. Connect both devices to the **same Wi-Fi network**
2. Restart the Metro Bundler (`npm start`)
3. Scan the new QR code

**Still not working?**
- Check if your Wi-Fi router allows device communication
- Try using a mobile hotspot from your phone
- Use web browser option instead (`w` in terminal)

---

### App crashes or shows errors

**Problem:** TypeScript or code errors.

**Solution:**
1. Stop the server (Press `Ctrl + C` in terminal)
2. Clear cache:
```bash
npm start -- --reset-cache
```
3. If still not working, reinstall:
```bash
rm -rf node_modules
npm install
npm start
```

---

### "Unable to resolve module"

**Problem:** Import paths are wrong or files missing.

**Solution:**
1. Check that all files exist in the `src` folder
2. Restart Metro Bundler:
```bash
npm start -- --reset-cache
```

---

### White screen on load

**Problem:** JavaScript bundle not loading.

**Solution:**
1. Check terminal for errors
2. Reload the app:
   - **Expo Go**: Shake device → Tap "Reload"
   - **Web**: Refresh browser (F5)
3. Restart Metro Bundler

---

## 📚 Understanding the Code

### Project Structure

```
online-vehicle-app/
│
├── src/                          # All source code
│   ├── components/               # Reusable UI components
│   │   ├── Button.tsx            # Custom button component
│   │   └── VehicleCard.tsx       # Vehicle display card
│   │
│   ├── data/                     # Mock data
│   │   ├── mockVehicles.ts       # 30 vehicle objects
│   │   └── mockUsers.ts          # User & booking data
│   │
│   ├── navigation/               # App navigation
│   │   └── AppNavigator.tsx      # Navigation setup
│   │
│   ├── screens/                  # All app screens
│   │   ├── auth/                 # Authentication screens
│   │   │   └── LoginScreen.tsx   # Login page
│   │   │
│   │   ├── user/                 # User screens (9 screens)
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
│   │   └── admin/                # Admin screens (5 screens)
│   │       ├── AdminDashboardScreen.tsx
│   │       ├── AdminVehiclesScreen.tsx
│   │       ├── AdminAddVehicleScreen.tsx
│   │       ├── AdminEditVehicleScreen.tsx
│   │       └── AdminBookingsScreen.tsx
│   │
│   ├── theme/                    # Design system
│   │   ├── colors.ts             # Color palette
│   │   └── typography.ts         # Font styles
│   │
│   └── types/                    # TypeScript types
│       └── index.ts              # Type definitions
│
├── assets/                       # Images and fonts
├── App.tsx                       # App entry point
├── app.json                      # Expo configuration
├── package.json                  # Dependencies list
├── tsconfig.json                 # TypeScript config
│
├── README.md                     # Full documentation
├── QUICKSTART.md                 # Quick start guide
├── PROJECT_SUMMARY.md            # Project overview
└── BEGINNER_GUIDE.md            # This file!
```

### Key Files Explained

#### `App.tsx` (Entry Point)
This is the first file that runs when the app starts.

```typescript
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return <AppNavigator />;
}
```

**What it does:**
- Loads the navigation system
- Displays the first screen (Login)

---

#### `src/types/index.ts` (Type Definitions)
Defines the structure of data used in the app.

```typescript
export interface Vehicle {
  id: string;
  name: string;
  brand: string;
  price: number;
  // ... more fields
}
```

**What it does:**
- Ensures type safety (TypeScript)
- Documents data structure
- Prevents errors

---

#### `src/data/mockVehicles.ts` (Mock Data)
Contains 30 randomized vehicles.

```typescript
export const mockVehicles: Vehicle[] = [
  {
    id: '1',
    name: 'Tesla Model 3',
    price: 45000,
    // ... more fields
  },
  // ... 29 more vehicles
];
```

**What it does:**
- Provides demo data
- No backend needed
- Realistic for testing

---

#### `src/theme/colors.ts` (Color System)
Defines all colors used in the app.

```typescript
export const colors = {
  primary: '#007AFF',      // iOS Blue
  success: '#34C759',      // Green
  // ... more colors
};
```

**What it does:**
- Consistent colors throughout
- Easy to change theme
- Apple-style palette

---

#### `src/navigation/AppNavigator.tsx` (Navigation)
Controls how screens are connected.

```typescript
<Stack.Navigator>
  <Stack.Screen name="Login" component={LoginScreen} />
  <Stack.Screen name="Home" component={HomeScreen} />
  // ... more screens
</Stack.Navigator>
```

**What it does:**
- Manages screen transitions
- Handles back navigation
- Shows tab bars

---

## 🎓 Learning Resources

### Want to Learn More?

#### React Native
- Official Docs: https://reactnative.dev/docs/getting-started
- Tutorial: https://reactnative.dev/docs/tutorial

#### Expo
- Official Docs: https://docs.expo.dev/
- Guides: https://docs.expo.dev/guides/overview/

#### TypeScript
- Official Handbook: https://www.typescriptlang.org/docs/handbook/intro.html
- Basics: https://www.typescriptlang.org/docs/handbook/2/basic-types.html

#### React Navigation
- Docs: https://reactnavigation.org/docs/getting-started
- Tab Navigation: https://reactnavigation.org/docs/tab-based-navigation

---

## 🚀 Next Steps

### After Running the App Successfully

1. **Explore the App**
   - Try all user features
   - Test admin dashboard
   - Create bookings
   - Add vehicles as admin

2. **Read the Code**
   - Open files in VS Code
   - Start with `App.tsx`
   - Read the comments
   - Understand the structure

3. **Modify Something Small**
   - Change a color in `src/theme/colors.ts`
   - Update text in `LoginScreen.tsx`
   - Add your name to the header
   - Save and see changes live!

4. **Add a Feature**
   - Add more mock vehicles
   - Create a new vehicle type
   - Add more features to vehicles
   - Customize the design

5. **Learn React Native**
   - Follow official tutorials
   - Build your own screens
   - Practice TypeScript
   - Understand hooks (useState, useEffect)

---

## 💡 Pro Tips

### Development Tips

1. **Live Reload**
   - Changes automatically reload
   - Save files to see updates
   - No need to restart server

2. **Console Logs**
   - Use `console.log()` to debug
   - Logs appear in terminal
   - Help understand data flow

3. **React DevTools**
   - Press `m` in terminal
   - Opens dev menu
   - Inspect components

4. **Reset Cache**
   - If things break, reset cache:
   ```bash
   npm start -- --reset-cache
   ```

5. **Keep Terminal Open**
   - Don't close the terminal
   - Server must stay running
   - Stop with `Ctrl + C`

---

## 📞 Getting Help

### If You're Stuck

1. **Check Error Messages**
   - Read the terminal output
   - Errors are usually helpful
   - Google the error message

2. **Read Documentation**
   - Check README.md
   - Review QUICKSTART.md
   - Look at PROJECT_SUMMARY.md

3. **Search Online**
   - Stack Overflow
   - Expo Forums
   - React Native Community

4. **Common Commands**
   ```bash
   # Install dependencies
   npm install

   # Start the app
   npm start

   # Clear cache and start
   npm start -- --reset-cache

   # Check for errors
   npx tsc --noEmit
   ```

---

## 🎉 Congratulations!

You've successfully set up and run the Online Vehicle App!

### What You've Achieved:
✅ Installed Node.js and dependencies
✅ Started a development server
✅ Ran a React Native app
✅ Explored a professional mobile app
✅ Learned about app structure

### Keep Learning:
- Experiment with the code
- Try making changes
- Build new features
- Learn React Native & TypeScript

---

## 📝 Quick Reference

### Essential Commands

```bash
# Navigate to project
cd d:\Vehicle\online-vehicle-app

# Install dependencies
npm install

# Start development server
npm start

# Run on web
# Press 'w' after starting

# Run on Android
# Press 'a' after starting

# Run on iOS (Mac only)
# Press 'i' after starting

# Stop server
Ctrl + C

# Clear cache
npm start -- --reset-cache

# Check TypeScript errors
npx tsc --noEmit
```

### Demo Accounts

**User:**
- Email: `user@example.com`
- Password: `password`

**Admin:**
- Email: `admin@vehicleapp.com`
- Password: `admin123`

---

**Happy Coding! 🚀**

Need help? Review this guide or check the other documentation files!
