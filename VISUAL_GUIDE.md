# Stock Price Analysis System - Visual Guide

## What You'll See When Running the Application

### Application Layout (All Pages)

```
┌─────────────────────────────────────────────────────────────────────┐
│  StockXs                          │  Stock Analysis     🔔  👤       │ Header
│  DSA Analysis                     │  API Connected                   │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│ Dashboard    │   Main Content Area                                   │
│ Features     │                                                       │
│ Add Stock    │   (Changes based on selected page)                   │
│ View Stocks  │                                                       │
│ Analysis     │                                                       │
│ History      │                                                       │
│              │                                                       │
│              │                                                       │
│ DSA Algos:   │                                                       │
│ • BST        │                                                       │
│ • Merge Sort │                                                       │
│ • Binary     │                                                       │
│ • Stack      │                                                       │
│              │                                                       │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 1. HOME PAGE - Dashboard

### Visual Layout
```
Welcome to StockXs
Advanced Stock Analysis with Data Structures & Algorithms

┌──────────────┬──────────────┬──────────────┬──────────────┐
│  📊          │  📈          │  🎯          │  ⚡          │
│ Total Stocks │Average Price │Highest Price │Active Algos  │
│      5       │    $197.36   │   $380.00    │      4       │
└──────────────┴──────────────┴──────────────┴──────────────┘

Featured Algorithms          Quick Start Guide
┌──────────────────┐        ┌──────────────────┐
│ • Binary Search  │        │ 1️⃣ Add Stocks    │
│   Tree (BST)     │        │ 2️⃣ Sort & Search │
│                  │        │ 3️⃣ Analyze Data  │
│ • Merge Sort     │        │ 4️⃣ Test Undo    │
│   O(n log n)     │        │                  │
│                  │        │ ✓ Backend: Connected
│ • Binary Search  │        │ ✓ All Algorithms: Active
│   O(log n)       │        │ ✓ Database: In-Memory
│                  │        │ ✓ Status: Production Ready
│ • Stack (LIFO)   │        │
│   O(1)           │        │
└──────────────────┘        └──────────────────┘
```

---

## 2. FEATURES PAGE - Algorithm Details

### Visual Layout
```
Featured Algorithms

┌────────────────────────────┬────────────────────────────┐
│ 🌳 Binary Search Tree      │ ⚡ Merge Sort              │
│ O(log n) avg, O(n) worst   │ O(n log n) guaranteed      │
│                            │                            │
│ Efficiently stores and     │ Divides and conquers -     │
│ retrieves stock data       │ consistently fast sorting   │
│                            │                            │
│ Insert    O(log n)         │ Divide    O(log n)        │
│ Search    O(log n)         │ Conquer   O(log n)        │
│ Traverse  O(n)             │ Merge     O(n)            │
│                            │                            │
│ ✓ Automatic sorting        │ ✓ Guaranteed O(n log n)   │
│ ✓ Fast insertion/lookup    │ ✓ Stable sorting          │
│ ✓ Balanced structure       │ ✓ Large datasets          │
└────────────────────────────┴────────────────────────────┘

┌────────────────────────────┬────────────────────────────┐
│ 🔍 Binary Search           │ ↩️ Stack (LIFO)            │
│ O(log n)                   │ O(1) for all operations    │
│                            │                            │
│ Rapidly finds companies    │ Last-In-First-Out          │
│ by eliminating half each   │ structure for undo         │
│ iteration                  │                            │
│                            │                            │
│ Compare Middle  O(1)       │ Push   O(1)               │
│ Eliminate Half  O(log n)   │ Pop    O(1)               │
│ Find Match      O(log n)   │ Peek   O(1)               │
│                            │                            │
│ ✓ Logarithmic search       │ ✓ Instant operations      │
│ ✓ Works on sorted data     │ ✓ Perfect for undo        │
│ ✓ Very fast for lists      │ ✓ Minimal overhead        │
└────────────────────────────┴────────────────────────────┘
```

---

## 3. ADD STOCK PAGE - Form

### Visual Layout
```
Add New Stock
Create a new stock entry with company details

┌─────────────────────────────┐    ┌──────────────────┐
│ Company Name               │    │ Quick Tips:      │
│ ┌─────────────────────────┐│    │                  │
│ │ Apple Inc.             ││    │ • Use real names │
│ └─────────────────────────┘│    │ • Uppercase auto │
│                             │    │ • 2 decimals ok  │
│ Stock Symbol               │    │ • Stored in BST  │
│ ┌─────────────────────────┐│    │ • Unique ID set  │
│ │ AAPL                    ││    │                  │
│ └─────────────────────────┘│    └──────────────────┘
│                             │
│ Price ($)                  │    Data Structure: BST
│ ┌─────────────────────────┐│
│ │ 150.25                  ││    Insert  O(log n)
│ └─────────────────────────┘│    Search  O(log n)
│                             │    Traverse O(n)
│    [+ Add Stock]            │
│                             │    Example Stocks:
│                             │    • AAPL - $150.25
│                             │    • GOOGL - $140.50
│                             │    • MSFT - $380.00
│                             │    • TSLA - $240.75
└─────────────────────────────┘    └──────────────────┘
```

---

## 4. VIEW STOCKS PAGE - Table & Sorting

### Visual Layout
```
View Stocks - Manage stocks with sorting and search

Sorting Algorithms        Binary Search          Linear Search
┌─────────────────────┐  ┌──────────────────┐   ┌──────────────────┐
│ Merge Sort O(n log) │  │ Search Company   │   │ Search Symbol    │
│                     │  │ ┌────────────────┐│  │ ┌────────────────┐│
│ BST Inorder O(n)    │  │ │ Microsoft      ││  │ │ MSFT           ││
│                     │  │ └────────────────┘│  │ └────────────────┘│
│ Original Order      │  │ [Search O(log n)]│  │ [Search O(n)]    │
│                     │  └──────────────────┘  └──────────────────┘
│ Algorithm Info:     │
│ Shows current sort  │  Results:
│ method & details    │  ┌─────────────────────────────────────┐
└─────────────────────┘  │ Microsoft Corp - MSFT - $380.00     │
                         │ ✓ Found                             │
                         └─────────────────────────────────────┘

All Stocks (5)

┌────────────────┬────────┬──────────┬────────────┬────────┐
│ Company        │ Symbol │  Price   │   Added    │ Action │
├────────────────┼────────┼──────────┼────────────┼────────┤
│ Google LLC     │ GOOGL  │ $140.50  │ 12/09/2025 │  🗑️   │
│ Apple Inc.     │ AAPL   │ $150.25  │ 12/09/2025 │  🗑️   │
│ Amazon Corp    │ AMZN   │ $175.30  │ 12/09/2025 │  🗑️   │
│ Tesla Inc      │ TSLA   │ $240.75  │ 12/09/2025 │  🗑️   │
│ Microsoft Corp │ MSFT   │ $380.00  │ 12/09/2025 │  🗑️   │
└────────────────┴────────┴──────────┴────────────┴────────┘
```

---

## 5. ANALYSIS PAGE - Charts & Statistics

### Visual Layout
```
Stock Analysis - Real-time statistical analysis

┌──────────────┬──────────────┬──────────────┬──────────────┐
│ Total Stocks │Average Price │   Min Price  │   Max Price  │
│      5       │    $197.36   │   $140.50    │   $380.00    │
└──────────────┴──────────────┴──────────────┴──────────────┘

Price Distribution              Statistical Summary
                                ┌──────────────────┐
  $400  ┌────┐                 │ Total Value      │
  $350  │    │                 │ $986.80          │
  $300  │    │  ┌────┐         │                  │
  $250  │    │  │    │         │ Price Variance   │
  $200  │    │  │    │ ┌────┐  │ 8750.45          │
  $150  ┌────┤  │    │ │    │  │                  │
  $100  │    │  │    │ │    │  │ Range            │
   $50  │    │  │    │ │    │  │ $239.50          │
    $0  └────┴──┴────┴─┴────┘  │                  │
        GOOGL AAPL AMZN TSLA   │ Top 5 Companies  │
                                │ 1. MSFT - $380   │
        Chart.js Bar Chart       │ 2. TSLA - $240   │
        • Color coded           │ 3. AMZN - $175   │
        • Sorted ascending      │ 4. AAPL - $150   │
        • Interactive hover     │ 5. GOOGL - $140  │
        • Responsive sizing     └──────────────────┘

Insights
┌──────────────────────┬──────────────────────┬──────────────────────┬──────────────────────┐
│ Highest Price        │ Lowest Price         │ Price Spread         │ Diversity            │
│ $380.00 - MSFT      │ $140.50              │ $239.50              │ 5 companies tracked  │
└──────────────────────┴──────────────────────┴──────────────────────┴──────────────────────┘
```

---

## 6. HISTORY PAGE - Undo & Stack

### Visual Layout
```
Action History & Undo - Stack-based operation tracking

Action Timeline                      Undo Control
┌─────────────────────────────────┐  ┌──────────────────────┐
│ ⏰ Stack: 5 items               │  │ [↩️ Undo Last Action]│
│                                 │  │                      │
│ ▌ 🟢 ADD MSFT Microsoft - 10:45 │  │ Total Actions    5   │
│ │                               │  │ Last Action   ADD    │
│ └─ 🟢 ADD TSLA Tesla - 10:44    │  │ Stack Status  5 items│
│    🟢 ADD AMZN Amazon - 10:43   │  └──────────────────────┘
│    🟢 ADD AAPL Apple - 10:42    │
│    🟢 ADD GOOGL Google - 10:41  │  Stack Visualization
│                                 │  ┌─────────────────────┐
│ Timeline shows ALL actions      │  │ ADD MSFT (Top)      │
│ in reverse chronological order  │  │ ← Next to Undo      │
│                                 │  │                     │
│ LIFO Principle:                 │  │ ADD TSLA            │
│ Most recent action at top       │  │                     │
│ Last added = First to undo      │  │ ADD AMZN            │
└─────────────────────────────────┘  │                     │
                                      │ +2 more             │
                                      └─────────────────────┘

How Stack (LIFO) Works              Key Characteristics
┌─────────────────────────────────┐ ┌──────────────────────┐
│ Last-In-First-Out (LIFO)         │ │ • LIFO order         │
│ Most recent at top of stack      │ │ • O(1) operations    │
│                                  │ │ • Linear space       │
│ Stack Operations:                │ │ • One at top         │
│ • Push: Add action → O(1)       │ │                      │
│ • Pop: Remove action → O(1)     │ │ Real-World Examples: │
│ • Peek: View last → O(1)        │ │ • Browser back btn   │
│                                  │ │ • Text undo          │
│ Undo Implementation:             │ │ • Call stack         │
│ 1. Pop action from stack        │ │                      │
│ 2. Reverse the operation        │ │                      │
│ 3. Update display               │ │                      │
│ 4. All O(1) operations!         │ │                      │
└─────────────────────────────────┘ └──────────────────────┘
```

---

## Color Scheme Used

### Primary Colors
```
Background:        #0F172A (Slate-900)
Gradient Base:     #1E293B to #1e3a8a (Slate-900 to Blue-900)

Accent Colors:
- Blue:            #3B82F6 (Primary actions)
- Purple:          #A855F7 (Secondary)
- Green:           #22C55E (Success)
- Orange:          #F97316 (Warnings)
- Red:             #EF4444 (Errors)

Text:
- Primary:         #FFFFFF (White)
- Secondary:       #CBD5E1 (Slate-300)
- Muted:           #94A3B8 (Slate-400)
```

---

## Interactive Elements

### Buttons
```
Primary Button:      Blue gradient, hover effect, rounded
Success Button:      Green, hover brightens
Danger Button:       Red, trash icon, hover darkens
Disabled Button:     Gray, not clickable
```

### Forms
```
Input Fields:        Dark background, blue border on focus
Error Messages:      Red text below field
Validation:          Real-time feedback
Placeholders:        Gray, helpful hints
```

### Tables
```
Header Row:          Dark background, bold text
Data Rows:           Hover effect (darker background)
Alternating Colors:  Subtle alternation for readability
Delete Buttons:      Red, trash icon, hover effect
```

### Cards
```
Background:          Dark with transparency
Border:              Blue, subtle glow
Hover State:         Border brightens, shadow grows
Icons:               Colored badges
```

---

## Responsive Behavior

### Mobile (< 768px)
```
Layout:              Single column
Sidebar:             Collapsible or bottom nav
Charts:              Full width, adjusted height
Tables:              Horizontal scroll
Buttons:             Full width
Cards:               Stack vertically
```

### Tablet (768px - 1024px)
```
Layout:              Two columns
Grid:                2-column for cards
Charts:              Optimized sizing
Tables:              Slightly scrollable
Sidebar:             Narrow but visible
```

### Desktop (> 1024px)
```
Layout:              Full featured
Sidebar:             Full width (256px)
Grid:                3-4 columns
Charts:              Full width
Tables:              All visible
Spacing:             Generous margins
```

---

## Animation Examples

### Page Transitions
```
Fade In:             0.3s smooth opacity
Slide Up:            0.4s from bottom
Scale In:            0.3s from center
```

### Hover Effects
```
Button Hover:        Scale 1.02, shadow grows
Card Hover:          Border brightens, shadow grows
Icon Hover:          Color shifts, scale 1.1
```

### Loading States
```
Pulsing Dot:         Green dot pulses (API Connected)
Loading Text:        "Loading analysis..."
Spinner Animation:   (Could be added)
```

### Notifications
```
Success Toast:       Green background, slides in from right
Error Toast:         Red background, slides in from right
Auto-dismiss:        3 seconds then slides out
```

---

## UI Component Examples

### Stat Cards
```
┌──────────────────┐
│  💡 Icon         │
│  Label           │
│  Big Value       │
│  Small Detail    │
└──────────────────┘
```

### Algorithm Cards
```
┌──────────────────────┐
│ 🔍 Title             │
│ O(n) Complexity      │
│                      │
│ Description...       │
│                      │
│ Ops | Time  | Space  │
│ op1 │ O(log)│ O(1)   │
│                      │
│ Benefits:           │
│ ✓ Benefit 1         │
│ ✓ Benefit 2         │
└──────────────────────┘
```

### Action Items
```
┌──────────────┬──────────┐
│ 🔵 Action    │ Timestamp│
│ Details...   │ 10:45 AM │
│ Company Name │          │
└──────────────┴──────────┘
```

---

## Icon Usage (Lucide React)

```
Home:              House icon
Features:          Info icon
Add Stock:         Plus icon
View Stocks:       Eye icon
Analysis:          TrendingUp icon
History:           Clock icon
Search:            Search icon
Delete:            Trash2 icon
Undo:              RotateCcw icon
Notifications:     Bell icon
User:              User icon
Database:          Database icon
Zap:               Zap icon (lightning)
```

---

## Typography Hierarchy

```
H1 (Page Title):        4xl bold (36px)
H2 (Section Title):     2xl bold (24px)
H3 (Card Title):        lg bold (18px)
Body Text:              base regular (16px)
Small Text:             sm regular (14px)
Tiny Text:              xs regular (12px)
Labels:                 sm semibold (14px)
Data Values:            3xl bold (30px)
```

---

## Spacing System

```
Base Unit:              8px
Padding:                4, 6, 8, 12, 16, 24, 32
Margin:                 4, 6, 8, 12, 16, 24, 32
Gap:                    3, 4, 6, 8, 12
Border Radius:          4px, 8px, 12px, 16px
```

---

This visual guide shows exactly what the application looks like at every step, from the dashboard to the undo functionality!
