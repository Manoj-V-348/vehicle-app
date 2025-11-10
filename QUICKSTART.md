# Quick Start Guide

## Get Started in 3 Steps

### 1. Start the Development Server
```bash
cd online-vehicle-app
npm start
```

### 2. Choose Your Platform

Once the server starts, you'll see options:

- Press **`w`** - Run in web browser (easiest to test)
- Press **`a`** - Run on Android emulator/device
- Press **`i`** - Run on iOS simulator (Mac only)
- **Scan QR code** with Expo Go app on your phone

### 3. Login

The app will open to the login screen. Use these demo accounts:

#### User Account (Browse & Book)
- Email: `user@example.com`
- Password: `password`

#### Admin Account (Manage Vehicles)
- Email: `admin@vehicleapp.com`
- Password: `admin123`

Or tap the demo account buttons on the login screen!

---

## What You Can Do

### As a User:
1. Browse 30+ vehicles (Cars, SUVs, Bikes, Trucks, Vans)
2. Search and filter vehicles
3. View detailed vehicle specs
4. Book vehicles for purchase
5. Rent vehicles (daily/weekly/monthly)
6. Schedule test drives
7. View booking history
8. Manage your profile

### As an Admin:
1. View dashboard with statistics
2. Add new vehicles
3. Edit vehicle details
4. Delete vehicles
5. Toggle vehicle availability
6. View all bookings
7. Confirm or cancel bookings

---

## Troubleshooting

### Port Already in Use
If you see a port conflict, kill the process and try again:
```bash
# Windows
taskkill /F /IM node.exe
npm start

# Mac/Linux
killall node
npm start
```

### Dependencies Issue
If you encounter dependency warnings:
```bash
npm install
npm start
```

### Can't Connect to Metro
Make sure no firewall is blocking port 8081, or try:
```bash
npm start -- --reset-cache
```

---

## Tips

- **Reload App**: Shake your device or press `R` in terminal
- **Open Dev Menu**: Press `D` in terminal
- **View Logs**: All console logs appear in the terminal
- **Element Inspector**: Press `I` in terminal for element inspector

---

## Project Structure Overview

```
src/
├── components/          # Reusable UI components
├── data/               # Mock data (30 vehicles)
├── navigation/         # Navigation setup
├── screens/
│   ├── auth/           # Login screen
│   ├── user/           # 9 user screens
│   └── admin/          # 5 admin screens
├── theme/              # Colors & typography
└── types/              # TypeScript definitions
```

---

## Key Features to Test

### User Flow:
1. Login → Home → Browse vehicles
2. Tap a vehicle → View details → Choose action
3. Rent: Select dates → Calculate price → Confirm
4. Buy: Fill form → Payment → Success
5. Profile → View booking history

### Admin Flow:
1. Login as admin → Dashboard
2. Vehicles → Add new vehicle → Fill form → Save
3. Vehicles → Edit existing → Update → Save
4. Bookings → View all → Confirm/Cancel

---

## Design Highlights

This app uses **Apple's design language**:

- ✨ Clean, minimalist interface
- 🎨 Premium color palette (iOS blue: #007AFF)
- 📝 SF Pro-inspired typography
- 🃏 Card-based layouts
- 🌈 Beautiful gradients
- ✅ Smooth animations
- 🎯 Intuitive navigation

---

## Need Help?

Check the full [README.md](README.md) for detailed documentation.

---

**Ready to explore? Run `npm start` and enjoy! 🚗**
