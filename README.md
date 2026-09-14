# JaduBazar - React Native Mobile Application

A clean, modular React Native mobile application built with TypeScript, supporting **Android** (and iOS/Web) featuring a configurable fixed **Bottom Tab Navigation** and extensible architecture.

---

## 📱 App Overview & Features

- **Bottom Tab Navigation**: Fixed bottom navigation bar with 5 primary screens:
  1. **Home**
  2. **Wallet**
  3. **Transactions**
  4. **Notifications**
  5. **Profile**
- **Modular Screen Architecture**: Each tab screen resides in its own isolated component folder (`src/screens/Home`, `src/screens/Wallet`, etc.).
- **Centered "Coming Soon" Layout**: Reusable centered component with feature badges, icons, status indicators, and clean dark slate aesthetics.
- **Configurable Menu Config**: Tab items, labels, vector icons, and route definitions are decoupled into `src/config/navigationConfig.ts` for quick customization.
- **Extensible Technical Foundation**: Ready for future additions (Authentication, Dashboard, Wallet operations, Deposit/Withdrawal, API services) without architectural refactoring.

---

## 📁 Code Architecture & Project Structure

```text
Jadubazar/
├── src/
│   ├── components/               # Shared reusable UI components
│   │   └── ComingSoon/
│   │       └── ComingSoonView.tsx # Centered Coming Soon screen view
│   │
│   ├── config/                   # Dynamic & configurable application settings
│   │   └── navigationConfig.ts   # Bottom tab menu items configuration
│   │
│   ├── navigation/               # Navigation configuration & types
│   │   ├── AppNavigator.tsx      # React Navigation Bottom Tab Navigator
│   │   └── types.ts              # TypeScript route parameter definitions
│   │
│   ├── screens/                  # Modular Screen components
│   │   ├── Home/
│   │   │   └── HomeScreen.tsx
│   │   ├── Wallet/
│   │   │   └── WalletScreen.tsx
│   │   ├── Transactions/
│   │   │   └── TransactionsScreen.tsx
│   │   ├── Notifications/
│   │   │   └── NotificationsScreen.tsx
│   │   └── Profile/
│   │       └── ProfileScreen.tsx
│   │
│   └── theme/                    # Design tokens & palette
│       └── theme.ts              # Color constants, typography styles
│
├── App.tsx                       # App entry point with SafeAreaProvider & StatusBar
├── app.json                      # Expo application metadata & Android config
├── package.json                  # Dependencies & scripts
├── tsconfig.json                 # TypeScript compiler configuration
└── README.md                     # Project documentation & local running guide
```

---

## 🚀 How to Run Locally

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) or `yarn` / `pnpm`
- **Android Development**:
  - [Android Studio](https://developer.android.com/studio) with configured Android Emulator, OR
  - Physical Android device with **Expo Go** app installed from Google Play Store.

---

### Step 1: Install Dependencies

Open terminal in the project root directory and run:

```bash
npm install
```

---

### Step 2: Start the Expo Development Server

To launch the dev server:

```bash
npm start
```

Or run directly for Android:

```bash
npm run android
```

---

### Step 3: Run on Android Device or Emulator

#### Option A: Android Emulator
1. Start an Android Virtual Device (AVD) from Android Studio.
2. Run `npm run android` (or press `a` in the Expo terminal menu).

#### Option B: Physical Android Device (Expo Go)
1. Install **Expo Go** from Google Play Store on your Android phone.
2. Scan the QR code printed in your terminal after running `npm start`.

#### Option C: Local Web Preview
To test instantly in your desktop web browser:

```bash
npm run web
```

---

## 🛠️ Adding New Tabs or Features

### Adding / Modifying a Tab Menu Item
Edit `src/config/navigationConfig.ts` to add or update items:

```typescript
export const TAB_MENU_ITEMS: TabMenuItem[] = [
  // Add new tab definition here
  {
    id: 'settings',
    name: 'Settings',
    label: 'Settings',
    iconName: 'settings-outline',
    activeIconName: 'settings',
  },
  ...
];
```

### Expanding a Screen with Real Functionality
Replace the `ComingSoonView` inside any screen component (e.g. `src/screens/Home/HomeScreen.tsx`) with your custom screen content when building full features in future phases.

---

## 📋 Technology Stack

- **React Native** (via Expo SDK 57)
- **TypeScript** (6.0)
- **React Navigation** (`@react-navigation/native`, `@react-navigation/bottom-tabs`)
- **Icons**: `@expo/vector-icons` (Ionicons)
- **Safe Area Management**: `react-native-safe-area-context`
# jaduBazar-Customer-App
