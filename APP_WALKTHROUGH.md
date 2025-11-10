# 📱 App Walkthrough - Screen by Screen Guide

This document provides a detailed walkthrough of every screen in the Online Vehicle App System, explaining what each element does and how to use it.

---

## 🎯 Quick Navigation

**User Screens:**
- [Login Screen](#1-login-screen)
- [Home Screen](#2-home-screen)
- [Browse Screen](#3-browse-screen)
- [Vehicle Detail Screen](#4-vehicle-detail-screen)
- [Search Screen](#5-search-screen)
- [Rental Screen](#6-rental-screen)
- [Booking Screen](#7-booking-screen)
- [Payment Screen](#8-payment-screen)
- [Profile Screen](#9-profile-screen)
- [Booking History](#10-booking-history-screen)

**Admin Screens:**
- [Admin Dashboard](#11-admin-dashboard)
- [Admin Vehicles](#12-admin-vehicles-screen)
- [Add Vehicle](#13-add-vehicle-screen)
- [Edit Vehicle](#14-edit-vehicle-screen)
- [Admin Bookings](#15-admin-bookings-screen)

---

## 👤 User Screens

### 1. Login Screen

**Purpose:** Authentication entry point for both users and admins.

#### Visual Elements

**Header Section:**
- 🚗 Large car icon (64px) in circular container
- App title: "Vehicle App"
- Subtitle: "Your premium vehicle marketplace"

**Form Section:**
- Email input field with mail icon
- Password input field with lock icon
- Eye icon toggle to show/hide password
- "Sign In" gradient button

**Demo Account Buttons:**
- "User Account" button (gray background)
- "Admin Account" button (gray background)

#### How to Use

1. **Manual Login:**
   - Type email in the first field
   - Type password in the second field
   - Tap the eye icon to show/hide password
   - Tap "Sign In" button

2. **Quick Login (Recommended):**
   - Tap "User Account" button → Auto-fills user credentials
   - Tap "Admin Account" button → Auto-fills admin credentials
   - Then tap "Sign In"

#### Demo Accounts

**User Account:**
```
Email: user@example.com
Password: password
```
Access: Browse, search, book, rent vehicles

**Admin Account:**
```
Email: admin@vehicleapp.com
Password: admin123
```
Access: Full dashboard, manage vehicles & bookings

#### Design Features

- Gradient background (blue to purple)
- White text on gradient
- Rounded input fields
- Smooth transitions
- Touch feedback on buttons

---

### 2. Home Screen

**Purpose:** Main landing page showing featured content and quick actions.

#### Navigation Bar (Bottom)
- 🏠 **Home** (active) - Current screen
- 🚗 **Browse** - All vehicles
- 👤 **Profile** - User settings

#### Visual Sections

**1. Header Bar:**
```
Welcome back
Find Your Dream Vehicle       🔍
```
- Greeting text (gray)
- Main title (bold, black)
- Search button (right side, gray circle)

**2. Quick Stats Card (Gradient):**
```
┌─────────────────────────────────────┐
│   30        │    28      │   24/7   │
│  Total      │ Available  │ Support  │
│ Vehicles    │    Now     │          │
└─────────────────────────────────────┘
```
- Blue gradient background
- White text
- Three columns with dividers

**3. Browse by Type:**
```
Cars   SUVs   Bikes   Trucks
🚗     🚙     🏍️      🚛
```
- Horizontal scrollable list
- Colored icon circles:
  - Cars: Blue
  - SUVs: Purple
  - Bikes: Green
  - Trucks: Orange
- Tap to filter vehicles by type

**4. Featured Vehicles:**
```
Featured Vehicles              See All →
```
- Section title (bold)
- "See All" link (blue, right aligned)
- Top 5 vehicles displayed as cards

**Each Vehicle Card Shows:**
- Large vehicle image (220px height)
- Gradient overlay at bottom
- Badge: "New" / "Used" / "Certified" (top right)
- Vehicle name (bold)
- Year • Type (gray subtitle)
- Star rating (e.g., 4.5 ⭐)
- Specs row:
  - 🏁 Mileage
  - ⚡ Fuel type
  - ⚙️ Transmission
- Pricing:
  - Purchase price (left, blue, bold)
  - Rental price/day (right, black)

**5. Quick Actions (Bottom):**
```
┌──────────────┬──────────────┐
│   Rent a     │   Buy a      │
│   Vehicle    │   Vehicle    │
│  From $50/day│  Great deals │
└──────────────┴──────────────┘
```
- Two gradient cards (purple, pink)
- Icons at top
- Title and subtitle
- Tap to navigate

#### Interactions

- **Tap Search Icon:** Opens search screen
- **Tap Category Icon:** Filters vehicles by type
- **Tap Vehicle Card:** Shows vehicle details
- **Tap "See All":** Opens browse screen
- **Tap Quick Action:** Navigates to browse with filter

---

### 3. Browse Screen

**Purpose:** View and filter all available vehicles.

#### Header
```
Browse Vehicles                    🔍
```
- Title (bold, large)
- Search button (right, gray circle)

#### Filter Chips (Scrollable)
```
[All] Car SUV Bike Truck Van
```
- Horizontal scrollable
- Selected chip: Blue background, white text
- Unselected: Gray background, black text
- Tap to filter

#### Results Counter
```
28 vehicles found
```
- Gray text
- Updates based on filter

#### Vehicle List
- Vertical scrollable list
- Same vehicle cards as Home screen
- All 30 vehicles available
- Filtered based on selected type

#### Interactions

- **Tap Filter Chip:** Filter vehicles by type
- **Tap Search:** Open advanced search
- **Tap Vehicle:** Show vehicle details
- **Scroll:** Load more vehicles

---

### 4. Vehicle Detail Screen

**Purpose:** Complete vehicle information with booking options.

#### Top Section (Image Carousel)
- Full-width image (height: 300px)
- Swipe left/right for more images
- Dot indicators at bottom (shows 1/3, 2/3, etc.)
- Back button (top left, white)
- Gradient overlay at bottom

#### Floating Header (Appears on Scroll)
- White background
- Vehicle name
- Back button (black)
- Appears when scrolling down

#### Vehicle Header Card
```
┌─────────────────────────────────────┐
│ Tesla Model 3              4.8 ⭐   │
│ 2024 • Car                          │
│ $45,000                 $200/day    │
└─────────────────────────────────────┘
```
- Vehicle name (large, bold)
- Star rating (right side)
- Year and type (gray)
- Purchase price (blue) | Rental price (black)

#### Specifications Grid (3 columns × 2 rows)
```
┌─────────┬─────────┬─────────┐
│ 🏁 5,000│ ⚡ Electric│ 🪑 5    │
│ Mileage │ Fuel Type│ Seats  │
├─────────┼─────────┼─────────┤
│ ⚙️ Auto │ 📍 NYC  │ 🌟 4.8  │
│ Trans.  │ Location│ Rating │
└─────────┴─────────┴─────────┘
```
- White cards with shadows
- Icon at top
- Value (bold)
- Label (gray, small)

#### Features Section
```
✓ Apple CarPlay & Android Auto
✓ Adaptive Cruise Control
✓ Lane Keeping Assist
✓ Panoramic Sunroof
✓ Heated & Ventilated Seats
✓ Premium Sound System
```
- Checkmarks (green)
- Feature text (black)
- 2 columns on wider screens

#### Availability Status
```
┌─────────────────────────────────────┐
│ ✓  Available for immediate delivery │
└─────────────────────────────────────┘
```
- Green checkmark if available
- Red X if not available
- Light green/red background

#### Description
```
About this vehicle
Experience luxury and performance with this
stunning Tesla Model 3...
```
- Section title (bold)
- Description text (gray, multi-line)

#### Action Buttons (Bottom, Sticky)
```
┌──────────────────────────────────────┐
│ [Test Drive] [  Rent  ] [Buy Now]    │
└──────────────────────────────────────┘
```
- Test Drive: Gray outline button
- Rent: White button with border
- Buy Now: Blue gradient button
- Fixed at bottom when scrolling

#### Interactions

- **Swipe Images:** View all photos
- **Scroll Down:** See all details
- **Tap Test Drive:** Open booking form
- **Tap Rent:** Open rental screen
- **Tap Buy Now:** Open purchase form
- **Tap Back:** Return to previous screen

---

### 5. Search Screen

**Purpose:** Advanced filtering to find specific vehicles.

#### Header
```
← Search Vehicles
```
- Back button (left)
- Title (center)

#### Search Input
```
┌─────────────────────────────────────┐
│ 🔍  Search by name, brand, or model │
└─────────────────────────────────────┘
```
- Magnifying glass icon
- Placeholder text
- Real-time search

#### Filters Button
```
┌─────────────────────────────────────┐
│  Filters  🎚️                    [2] │
└─────────────────────────────────────┘
```
- Tap to open filter panel
- Badge shows active filter count
- Expands to show all filters

#### Filter Panel (Expandable)

**1. Vehicle Type:**
```
[ Car ]  [ SUV ]  [ Bike ]  [ Truck ]  [ Van ]
```
- Selectable chips
- Multiple selection allowed
- Blue when selected

**2. Fuel Type:**
```
[ Petrol ]  [ Diesel ]  [ Electric ]  [ Hybrid ]
```
- Chip selection
- Blue when active

**3. Transmission:**
```
[ Automatic ]  [ Manual ]  [ CVT ]
```
- Chip selection

**4. Price Range:**
```
○ All Prices
○ Budget (Under $25k)
○ Mid-Range ($25k - $60k)
○ Luxury ($60k - $150k)
○ Ultra-Luxury ($150k+)
```
- Radio buttons
- Single selection only

**Clear All Button:**
```
[ Clear All Filters ]
```
- Red text
- Resets all selections

#### Active Filters (Top)
```
[Electric ×]  [Automatic ×]  [Luxury ×]
```
- Shows selected filters
- Tap X to remove
- Scrollable horizontally

#### Results
```
15 vehicles found
```
- Count updates in real-time
- Filtered vehicle list below

#### Empty State (If No Results)
```
    🔍
No vehicles found
Try adjusting your filters

[ Reset Filters ]
```
- Icon and message
- Reset button

#### Interactions

- **Type in Search:** Filter by text
- **Tap Filters:** Expand/collapse panel
- **Select Filter:** Apply filter
- **Tap X on Chip:** Remove filter
- **Tap Clear All:** Reset all filters
- **Tap Vehicle:** Show details

---

### 6. Rental Screen

**Purpose:** Book a vehicle for rental with date selection.

#### Header
```
← Rent Vehicle
```
- Back button
- Title

#### Hero Image
```
┌─────────────────────────────────────┐
│                                     │
│        [Vehicle Image]              │
│                                     │
│  Tesla Model 3                      │
│  2024 • Electric                    │
└─────────────────────────────────────┘
```
- Large image (200px)
- Gradient overlay
- Vehicle name and details

#### Rental Duration Selector
```
[ Daily ]  [ Weekly ]  [ Monthly ]
```
- Three chips
- Single selection
- Changes pricing calculation

#### Date Selection

**Start Date:**
```
Start Date
[Mon 15] [Tue 16] [Wed 17] [Thu 18] ...
  Jan      Jan      Jan      Jan
```
- Horizontal scrollable date picker
- Tap to select
- Selected: Blue background
- Disabled dates: Gray

**End Date:**
```
End Date
[Wed 17] [Thu 18] [Fri 19] [Sat 20] ...
  Jan      Jan      Jan      Jan
```
- Must be after start date
- Past dates disabled
- Same style as start date

#### Pickup Time
```
Pickup Time
[ 9 AM ] [ 12 PM ] [ 3 PM ] [ 6 PM ] ...
```
- Horizontal scrollable
- Common times available
- Blue when selected

#### Add-ons

**Insurance:**
```
┌─────────────────────────────────────┐
│ Insurance Coverage          ○──    │
│ $20/day • Full protection          │
└─────────────────────────────────────┘
```
- Toggle switch
- Price shown
- Adds to total

#### Rental Summary
```
┌─────────────────────────────────────┐
│ Rental Summary                      │
│                                     │
│ Duration    3 days                  │
│ Daily Rate  $200 × 3 days = $600    │
│ Insurance   $20 × 3 days = $60      │
│ ─────────────────────────────────   │
│ Total       $660                    │
└─────────────────────────────────────┘
```
- Pricing breakdown
- Automatically calculated
- Updates on any change

#### Bottom Action Bar
```
┌─────────────────────────────────────┐
│ Total: $660        [Confirm Rental] │
└─────────────────────────────────────┘
```
- Fixed at bottom
- Shows total
- Blue gradient button

#### Interactions

- **Select Duration:** Changes rate
- **Select Dates:** Updates calculation
- **Select Time:** Sets pickup time
- **Toggle Insurance:** Adds/removes $20/day
- **Tap Confirm:** Proceeds to payment
- **Scroll Dates/Times:** View more options

#### Validation

- End date must be after start date
- At least 1 day rental required
- Past dates are disabled

---

### 7. Booking Screen

**Purpose:** Form for vehicle purchase or test drive booking.

#### Header
```
← Book Vehicle
```
OR
```
← Schedule Test Drive
```
- Back button
- Dynamic title based on booking type

#### Vehicle Summary Card
```
┌─────────────────────────────────────┐
│ [Image] Tesla Model 3               │
│         2024 • $45,000              │
└─────────────────────────────────────┘
```
- Small thumbnail
- Vehicle name and price
- Compact display

#### Personal Information Section

**Form Fields:**
```
Full Name
┌─────────────────────────────────────┐
│ 👤  John Smith                      │
└─────────────────────────────────────┘

Email Address
┌─────────────────────────────────────┐
│ ✉️  john@example.com                │
└─────────────────────────────────────┘

Phone Number
┌─────────────────────────────────────┐
│ 📞  +1 (555) 123-4567               │
└─────────────────────────────────────┘
```

**For Purchase Only:**
```
Delivery Address
┌─────────────────────────────────────┐
│ 📍  123 Main St, New York, NY 10001│
└─────────────────────────────────────┘

City
┌─────────────────────────────────────┐
│ 🏙️  New York                        │
└─────────────────────────────────────┘

State / ZIP Code
┌──────────────────┬──────────────────┐
│ 🗺️  NY          │ 📮  10001        │
└──────────────────┴──────────────────┘
```

**For Test Drive Only:**
```
Preferred Date & Time
┌─────────────────────────────────────┐
│ 📅  Select date and time            │
└─────────────────────────────────────┘
```

**Additional Notes:**
```
┌─────────────────────────────────────┐
│ Any special requests or questions?  │
│                                     │
│                                     │
└─────────────────────────────────────┘
```
- Multi-line input
- Optional field

#### Terms & Conditions
```
☐ I agree to the terms and conditions
```
- Checkbox
- Required to submit

#### Price Summary (Purchase Only)
```
┌─────────────────────────────────────┐
│ Vehicle Price    $45,000            │
│ Processing Fee   $500               │
│ ─────────────────────────────────   │
│ Total            $45,500            │
└─────────────────────────────────────┘
```

#### Submit Button
```
┌─────────────────────────────────────┐
│     [Proceed to Payment]            │
└─────────────────────────────────────┘
```
OR
```
┌─────────────────────────────────────┐
│     [Confirm Test Drive]            │
└─────────────────────────────────────┘
```
- Blue gradient button
- Full width
- Disabled until form valid

#### Form Validation

- All fields required (except notes)
- Email format validation
- Phone format validation
- Terms must be accepted
- Error messages show below fields

#### Interactions

- **Fill Form:** Type in each field
- **Check Terms:** Tap checkbox
- **Tap Submit:** Validate and proceed
- **Validation Error:** Shows red text below field

---

### 8. Payment Screen

**Purpose:** Process payment (mock) for purchases and rentals.

#### Header
```
← Payment
```

#### Security Indicator
```
🔒 Secure Payment
```
- Lock icon
- Gray text
- Top of screen

#### Payment Summary Card
```
┌─────────────────────────────────────┐
│ Payment Summary                     │
│                                     │
│ Tesla Model 3                       │
│ 2024 • Electric                     │
│                                     │
│ Amount Due        $45,500           │
└─────────────────────────────────────┘
```
- Blue gradient background
- White text
- Total amount (large)

#### Payment Method Selector
```
○ Credit/Debit Card
○ PayPal
○ Apple Pay
○ Google Pay
```
- Radio buttons
- Single selection
- Shows appropriate form

#### Card Payment Form (When Card Selected)

**Card Number:**
```
┌─────────────────────────────────────┐
│ 💳  1234 5678 9012 3456            │
└─────────────────────────────────────┘
```
- Auto-formats with spaces
- 16 digits required

**Cardholder Name:**
```
┌─────────────────────────────────────┐
│ 👤  John Smith                      │
└─────────────────────────────────────┘
```

**Expiry Date & CVV:**
```
┌──────────────────┬──────────────────┐
│ 📅  MM / YY     │ 🔒  123         │
└──────────────────┴──────────────────┘
```
- Expiry: MM/YY format
- CVV: 3 digits, masked

**Save Card:**
```
☐ Save this card for future purchases
```
- Optional checkbox

#### Alternative Payment Methods

**PayPal:**
```
┌─────────────────────────────────────┐
│ You'll be redirected to PayPal     │
│ to complete your payment            │
└─────────────────────────────────────┘
```

**Apple Pay:**
```
┌─────────────────────────────────────┐
│ Pay securely with Apple Pay         │
│  [Apple Pay Button]                │
└─────────────────────────────────────┘
```

**Google Pay:**
```
┌─────────────────────────────────────┐
│ Pay quickly with Google Pay         │
│  [Google Pay Button]                │
└─────────────────────────────────────┘
```

#### Pay Button
```
┌─────────────────────────────────────┐
│          [Pay $45,500]              │
└─────────────────────────────────────┘
```
- Shows amount
- Blue gradient
- Full width
- Shows loading spinner when processing

#### Success Modal
```
┌─────────────────────────────────────┐
│           ✓                         │
│    Payment Successful!              │
│                                     │
│ Your booking has been confirmed     │
│ Booking ID: #BK12345                │
│                                     │
│ [View Booking]  [Back to Home]      │
└─────────────────────────────────────┘
```
- Appears after payment
- Shows booking ID
- Two action buttons

#### Interactions

- **Select Payment Method:** Shows appropriate form
- **Fill Card Details:** Auto-formats as you type
- **Tap Pay:** Processes payment (mock)
- **Success:** Shows modal with options
- **View Booking:** Goes to booking history
- **Back to Home:** Returns to home screen

#### Form Validation

- Card number: 16 digits
- Expiry: Future date, MM/YY format
- CVV: 3 digits
- All fields required
- Error messages below fields

---

### 9. Profile Screen

**Purpose:** User account management and settings.

#### Profile Header (Gradient)
```
┌─────────────────────────────────────┐
│        [Profile Photo]              │
│        John Smith                   │
│    john@example.com                 │
│        ⭐ Premium Member             │
└─────────────────────────────────────┘
```
- Blue gradient background
- Circular profile photo
- Name (white, large)
- Email (white, small)
- Premium badge (gold star)

#### Stats Row
```
┌───────────┬───────────┬───────────┐
│     4     │     12    │     18    │
│ Bookings  │ Favorites │  Reviews  │
└───────────┴───────────┴───────────┘
```
- Three columns
- Number (large, bold)
- Label (small, gray)
- White background

#### My Activity Section
```
My Activity

┌─────────────────────────────────────┐
│ 📅 Booking History              →   │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ ❤️ My Favorites                 →   │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ ⭐ My Reviews                   →   │
└─────────────────────────────────────┘
```
- Icon + Label + Arrow
- Tappable cards
- White background
- Subtle shadow

#### Account Settings Section
```
Account Settings

┌─────────────────────────────────────┐
│ 👤 Edit Profile                 →   │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ 🔒 Change Password              →   │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ 💳 Payment Methods              →   │
└─────────────────────────────────────┘
```

#### Preferences Section
```
Preferences

┌─────────────────────────────────────┐
│ 🔔 Notifications            [○──]   │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ 🌙 Dark Mode                [──○]   │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ 📍 Location Services        [○──]   │
└─────────────────────────────────────┘
```
- Toggle switches
- Live updates
- No page reload

#### Support & About Section
```
Support & About

┌─────────────────────────────────────┐
│ 💬 Help & Support              →    │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ 📄 Terms & Conditions          →    │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ 🔒 Privacy Policy              →    │
└─────────────────────────────────────┘
```

#### Logout Button
```
┌─────────────────────────────────────┐
│           [ Log Out ]               │
└─────────────────────────────────────┘
```
- Red text
- Center aligned
- Confirmation alert

#### Interactions

- **Tap Booking History:** Shows bookings
- **Tap Favorites:** Shows saved vehicles
- **Tap Reviews:** Shows user reviews
- **Tap Settings:** Opens respective screen
- **Toggle Switches:** Enable/disable features
- **Tap Logout:** Shows confirmation → Logs out

---

### 10. Booking History Screen

**Purpose:** View all past and upcoming bookings.

#### Header
```
← Booking History
```

#### Tab Navigation
```
[All(12)] Upcoming(3) Completed(8) Cancelled(1)
```
- Tabs with counts in badges
- Selected tab: Blue underline
- Tap to switch views

#### Booking Cards

**Card Format:**
```
┌─────────────────────────────────────┐
│ [Image] Tesla Model 3               │
│                                     │
│ Booking ID: #BK001    [Confirmed]   │
│ Rental • Jan 15 - Jan 20            │
│ Total: $2,500                       │
│                                     │
│ [Cancel Booking]  [View Details]    │
└─────────────────────────────────────┘
```

**Status Badges:**
- Pending: Orange background
- Confirmed: Blue background
- Completed: Green background
- Cancelled: Red background

**Booking Types:**
- Purchase: 🛒 icon
- Rental: 📅 icon
- Test Drive: 🚗 icon

#### Action Buttons (Based on Status)

**Pending:**
- [Confirm Payment]
- [Cancel Booking]

**Confirmed:**
- [Cancel Booking] (if applicable)
- [View Details]

**Completed:**
- [Rate Experience]
- [View Details]

**Cancelled:**
- [View Details]

#### Empty State (Per Tab)
```
    📋
No bookings found
You haven't made any bookings yet

[ Browse Vehicles ]
```
- Icon + message
- Action button
- Centered

#### Interactions

- **Tap Tab:** Switch view
- **Tap Card:** Expand details
- **Tap Action Button:** Perform action
- **Swipe Card:** Additional options
- **Pull to Refresh:** Reload data

---

## 👨‍💼 Admin Screens

### 11. Admin Dashboard

**Purpose:** Overview of system statistics and activity.

#### Header
```
Dashboard                  🔔
Good morning, Admin
```
- Greeting (changes based on time)
- Notification icon (badge if new)

#### Quick Actions
```
┌──────────┬──────────┬──────────┐
│ + Add    │ Manage   │  View    │
│ Vehicle  │ Vehicles │ Bookings │
└──────────┴──────────┴──────────┘
```
- Three action buttons
- Gradient backgrounds
- Icons

#### Key Metrics (4 Cards)
```
┌───────────────┬───────────────┐
│  Total Revenue│ Active Bookings│
│   $284,500    │      12       │
│  ↑ +15%       │   ↑ +3        │
└───────────────┴───────────────┘

┌───────────────┬───────────────┐
│ Total Vehicles│ Available Now │
│      30       │      28       │
│  → Same       │   ↑ +2        │
└───────────────┴───────────────┘
```
- Number (large)
- Label (small)
- Trend indicator (arrow + %)
- Color-coded arrows (green up, red down)

#### Booking Overview Chart
```
Booking Overview
┌─────────────────────────────────────┐
│                  ▮                  │
│         ▮        ▮        ▮         │
│  ▮      ▮        ▮        ▮         │
│  ▮      ▮        ▮        ▮      ▮  │
│ Week 1  Week 2  Week 3  Week 4     │
│                                     │
│ ▮ Completed  ▮ Active  ▮ Pending   │
└─────────────────────────────────────┘
```
- Bar chart
- Color-coded bars
- Legend at bottom
- Shows 4 weeks of data

#### Recent Activity Feed
```
Recent Activity

○ New booking for Tesla Model 3
  2 hours ago

○ Vehicle updated: BMW X5
  5 hours ago

○ New user registration
  1 day ago

○ Payment received: $45,000
  1 day ago

[ View All Activity ]
```
- Timeline format
- Circle bullet points
- Time stamps
- "View All" at bottom

#### Interactions

- **Tap Quick Action:** Navigate to screen
- **Tap Metric Card:** View detailed stats
- **Tap Chart Bar:** View details
- **Tap Activity:** View full details
- **Pull Down:** Refresh data

---

### 12. Admin Vehicles Screen

**Purpose:** Manage all vehicles in the system.

#### Header
```
← Vehicles
```

#### Search Bar
```
┌─────────────────────────────────────┐
│ 🔍  Search vehicles...              │
└─────────────────────────────────────┘
```
- Real-time search
- Searches name, brand, model

#### Filter & Add Row
```
[🎚️ Filters (2)]          [+ Add Vehicle]
```
- Filter button (left) with badge
- Add button (right, blue)

#### Active Filters
```
[Available ×]  [Car ×]
```
- Scrollable horizontally
- Tap X to remove

#### Vehicle Cards
```
┌─────────────────────────────────────┐
│ [Image]                             │
│                                     │
│ Tesla Model 3        Available ○──  │
│ 2024 • Car • Automatic              │
│                                     │
│ 🏁 5,000 mi  🪑 5  ⭐ 4.8          │
│                                     │
│ Purchase: $45,000  Rent: $200/day   │
│                                     │
│ [Edit]  [View]  [Delete]            │
└─────────────────────────────────────┘
```

**Each Card Shows:**
- Vehicle image
- Name
- Availability toggle (interactive)
- Year, type, transmission
- Key specs
- Pricing
- Action buttons

**Availability Toggle:**
- Green: Available
- Gray: Not Available
- Tap to change instantly

#### Action Buttons
- **Edit:** Opens edit screen
- **View:** Shows full details
- **Delete:** Confirmation alert → Deletes

#### Filter Modal
```
┌─────────────────────────────────────┐
│ Filter Vehicles            [×]      │
│                                     │
│ Vehicle Type                        │
│ [Car] [SUV] [Bike] [Truck] [Van]   │
│                                     │
│ Availability                        │
│ [Available] [Not Available]         │
│                                     │
│ Sort By                             │
│ ○ Name (A-Z)                        │
│ ○ Price (Low to High)               │
│ ○ Price (High to Low)               │
│ ○ Rating (High to Low)              │
│ ○ Recently Added                    │
│                                     │
│ [Clear All]      [Apply Filters]    │
└─────────────────────────────────────┘
```
- Modal from bottom
- Multiple selections
- Single sort option
- Live preview count

#### Empty State
```
    🚗
No vehicles found
Try adjusting your filters

[ Clear Filters ]
```

#### Interactions

- **Type in Search:** Filter list
- **Tap Filters:** Open filter modal
- **Toggle Availability:** Update status
- **Tap Edit:** Open edit form
- **Tap View:** Show details
- **Tap Delete:** Confirm → Delete
- **Tap Add:** Open add form
- **Pull Down:** Refresh list

---

### 13. Add Vehicle Screen

**Purpose:** Form to add new vehicles to the system.

#### Header
```
← Add Vehicle
```

#### Form Sections

**1. Basic Information**
```
Vehicle Name *
┌─────────────────────────────────────┐
│ e.g., Tesla Model 3                 │
└─────────────────────────────────────┘

Brand *
┌─────────────────────────────────────┐
│ e.g., Tesla                         │
└─────────────────────────────────────┘

Model *
┌─────────────────────────────────────┐
│ e.g., Model 3                       │
└─────────────────────────────────────┘

Year *
┌─────────────────────────────────────┐
│ e.g., 2024                          │
└─────────────────────────────────────┘
```

**2. Vehicle Type & Condition**
```
Type *
[Car] SUV Bike Truck Van Motorcycle

Condition *
[New] Used Certified Pre-Owned
```
- Chip selectors
- Blue when selected
- Single selection

**3. Pricing**
```
Purchase Price *        Rental Price/Day *
┌──────────────────┬──────────────────┐
│ $ 45000          │ $ 200            │
└──────────────────┴──────────────────┘
```
- Side by side
- Numbers only
- Auto-formats with commas

**4. Technical Specifications**
```
Fuel Type *
[Petrol] Diesel Electric Hybrid CNG

Transmission *
[Automatic] Manual CVT Semi-Automatic

Mileage *
┌─────────────────────────────────────┐
│ e.g., 5000                          │
└─────────────────────────────────────┘

Seating Capacity *
┌─────────────────────────────────────┐
│ e.g., 5                             │
└─────────────────────────────────────┘

Color *
┌─────────────────────────────────────┐
│ e.g., Pearl White                   │
└─────────────────────────────────────┘
```

**5. Additional Details**
```
Location *
┌─────────────────────────────────────┐
│ e.g., New York, NY                  │
└─────────────────────────────────────┘

Description *
┌─────────────────────────────────────┐
│ Enter vehicle description...        │
│                                     │
│                                     │
└─────────────────────────────────────┘

Features (comma-separated)
┌─────────────────────────────────────┐
│ Apple CarPlay, Heated Seats,...     │
└─────────────────────────────────────┘
```

#### Submit Button
```
┌─────────────────────────────────────┐
│          [Add Vehicle]              │
└─────────────────────────────────────┘
```
- Blue gradient
- Full width
- Disabled until form valid

#### Form Validation

**Required Fields (marked with *):**
- All basic info fields
- Type and condition
- Both prices
- Fuel and transmission
- Mileage, seating, color
- Location and description

**Validation Rules:**
- Year: 1900 to current year + 1
- Prices: Positive numbers only
- Mileage: Positive number
- Seating: 1-20

**Error Display:**
- Red text below field
- Field border turns red
- Shows specific error message

**Example Errors:**
```
❌ Year must be between 1900 and 2025
❌ Price must be a positive number
❌ Seating capacity must be between 1 and 20
```

#### Success Confirmation
```
┌─────────────────────────────────────┐
│           ✓                         │
│    Vehicle Added Successfully!      │
│                                     │
│ [View Vehicle]  [Add Another]       │
└─────────────────────────────────────┘
```

#### Interactions

- **Fill Fields:** Type in each input
- **Select Chips:** Choose type, condition, fuel, transmission
- **Tap Add:** Validate and save
- **Validation Error:** Shows errors, prevents submission
- **Success:** Shows modal with options

---

### 14. Edit Vehicle Screen

**Purpose:** Modify existing vehicle information.

#### Header
```
← Edit Vehicle
```

#### Availability Toggle (Top)
```
┌─────────────────────────────────────┐
│ Availability          ○──────       │
│ Vehicle is currently not available  │
└─────────────────────────────────────┘
```
- Large toggle switch
- Status text below
- Updates color based on state

#### Form
- **Same as Add Vehicle Form**
- **Pre-filled with Current Data**
- All fields editable
- Same validation rules

#### Save Button
```
┌─────────────────────────────────────┐
│        [Save Changes]               │
└─────────────────────────────────────┘
```
- Blue gradient
- Shows loading spinner when saving

#### Loading State (Initial)
```
    ⏳
Loading vehicle details...
```
- Shown while fetching data
- Spinner animation

#### Success Confirmation
```
┌─────────────────────────────────────┐
│           ✓                         │
│   Changes Saved Successfully!       │
│                                     │
│ [Back to Vehicles]                  │
└─────────────────────────────────────┘
```

#### Interactions

- **Toggle Availability:** Update status
- **Edit Fields:** Modify any field
- **Tap Save:** Validate and update
- **Success:** Shows modal → Returns to list

---

### 15. Admin Bookings Screen

**Purpose:** View and manage all bookings.

#### Header
```
← Bookings
```

#### Statistics Row
```
┌────┬────┬────┬────┐
│ 12 │ 3  │ 4  │ 5  │
│All │Pend│Conf│Comp│
└────┴────┴────┴────┘
```
- Total count per status
- Color-coded boxes
- Tappable filters

#### Search Bar
```
┌─────────────────────────────────────┐
│ 🔍  Search by ID or vehicle...      │
└─────────────────────────────────────┘
```

#### Filter Tabs
```
[All] Pending Confirmed Completed Cancelled
```
- Horizontal scrollable
- Selected: Blue with underline
- Updates list

#### Booking Cards
```
┌─────────────────────────────────────┐
│ [Image] Tesla Model 3               │
│                                     │
│ #BK001                  [Pending]   │
│ Rental • Jan 15 - 20                │
│ john@example.com                    │
│ Total: $2,500                       │
│                                     │
│ [Confirm]  [Cancel]  [View Details] │
└─────────────────────────────────────┘
```

**Card Elements:**
- Vehicle thumbnail
- Booking ID
- Status badge (color-coded)
- Booking type icon
- Date range (for rentals)
- Customer email
- Total amount
- Action buttons

**Status Colors:**
- Pending: Orange
- Confirmed: Blue
- Completed: Green
- Cancelled: Red

#### Action Buttons (Status-based)

**Pending:**
- [Confirm] - Marks as confirmed
- [Cancel] - Cancels booking
- [View Details] - Opens modal

**Confirmed:**
- [Cancel] - Cancels booking
- [View Details] - Opens modal

**Completed/Cancelled:**
- [View Details] - Opens modal

#### Booking Detail Modal
```
┌─────────────────────────────────────┐
│                [×]                  │
│ [Large Vehicle Image]               │
│                                     │
│ Booking Details                     │
│                                     │
│ Booking ID: #BK001                  │
│ Status: Pending                     │
│                                     │
│ Vehicle: Tesla Model 3              │
│ Type: Rental                        │
│ Start: Jan 15, 2024                 │
│ End: Jan 20, 2024                   │
│                                     │
│ Customer Information                │
│ Name: John Smith                    │
│ Email: john@example.com             │
│ Phone: +1 555-123-4567              │
│                                     │
│ Payment Details                     │
│ Amount: $2,500                      │
│ Payment Status: Paid                │
│ Payment Method: Credit Card         │
│                                     │
│ [Confirm Booking]  [Cancel Booking] │
└─────────────────────────────────────┘
```
- Full-screen modal
- All booking details
- Scrollable content
- Action buttons at bottom

#### Empty State
```
    📋
No bookings found
No bookings match your criteria

[ View All Bookings ]
```

#### Interactions

- **Tap Stat Box:** Filter by status
- **Type in Search:** Filter bookings
- **Tap Tab:** Change status filter
- **Tap Card:** Open detail modal
- **Tap Confirm:** Confirm booking (alert)
- **Tap Cancel:** Cancel booking (alert)
- **Tap View Details:** Open modal
- **Pull Down:** Refresh list

#### Confirmation Alerts

**Confirm Booking:**
```
Confirm this booking?
This will notify the customer.

[Cancel]  [Confirm]
```

**Cancel Booking:**
```
Cancel this booking?
This action cannot be undone.

[Go Back]  [Yes, Cancel]
```

---

## 🎨 Design Elements

### Common Patterns

#### Colors
- **Primary Blue:** #007AFF (buttons, links)
- **Success Green:** #34C759 (available, confirmed)
- **Warning Orange:** #FF9500 (pending)
- **Danger Red:** #FF3B30 (cancelled, delete)
- **Text Black:** #000000
- **Text Gray:** #8E8E93
- **Background:** #FFFFFF
- **Background Gray:** #F2F2F7

#### Typography
- **Large Title:** 36px, bold
- **Title:** 28-32px, bold
- **Headline:** 18px, semibold
- **Body:** 16px, regular
- **Caption:** 12px, regular

#### Spacing
- **Card Padding:** 16px
- **Screen Padding:** 20px
- **Element Gap:** 12px
- **Section Gap:** 24px

#### Shadows
- **Light:** 0px 2px 8px rgba(0,0,0,0.08)
- **Medium:** 0px 4px 12px rgba(0,0,0,0.15)

#### Borders
- **Radius:** 12-16px
- **Color:** #E5E5EA
- **Width:** 1px or 0.5px

---

## 📝 Notes

- All screens are fully responsive
- All interactions have touch feedback
- All forms have validation
- All actions show loading states
- All lists support pull-to-refresh
- All modals have close buttons
- All images have placeholders
- All empty states have actions

---

**This guide covers all screens in the Online Vehicle App System. For setup instructions, see [BEGINNER_GUIDE.md](BEGINNER_GUIDE.md).**
