# Todo App Native

A modern, cross-platform todo application built with React Native, Expo, and Convex backend. Features dark/light mode, drag-and-drop reordering, and real-time synchronization.

## Features

- ✅ Create, update, and delete todos
- 🌓 Dark and light mode support
- 🔄 Real-time synchronization with Convex backend
- 📱 Drag and drop to reorder todos
- 🔍 Filter todos (All, Active, Completed)
- 🎨 Beautiful UI with custom background images
- 📦 Cross-platform (iOS, Android, Web)

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI (installed globally or via npx)
- Expo account (for building APK/IPA)
- Convex account (for backend)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd todo-app-native
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables Configuration

Create a `.env` file in the root directory:

```bash
touch .env
```

Add the following environment variable:

```env
EXPO_PUBLIC_CONVEX_URL=your-convex-deployment-url-here
```

**Important:** Replace `your-convex-deployment-url-here` with your actual Convex deployment URL (format: `https://<deployment-name>.convex.cloud`)

### 4. Convex Setup Steps

#### Step 1: Install Convex CLI (if not already installed)

```bash
npm install -g convex
```

#### Step 2: Login to Convex

```bash
npx convex login
```

#### Step 3: Initialize Convex in your project

```bash
npx convex dev
```

This command will:

- Set up your Convex project
- Create a deployment
- Generate the `.env` file with your Convex URL automatically
- Push your backend functions to Convex

#### Step 4: Get Your Convex Deployment URL

After running `npx convex dev`, you'll get a deployment URL. You can also find it:

1. Go to [Convex Dashboard](https://dashboard.convex.dev)
2. Select your project
3. Find your deployment URL in the format: `https://<deployment-name>.convex.cloud`
4. Update your `.env` file with this URL

**Example `.env` file:**

```env
EXPO_PUBLIC_CONVEX_URL=https://wary-cardinal-22.convex.cloud
```

#### Step 5: Verify Convex Functions

Your Convex functions are located in the `convex/` directory:

- `convex/schema.ts` - Database schema
- `convex/todos.ts` - Todo CRUD operations

The functions are automatically deployed when you run `npx convex dev`.

## Running the App

### Development Mode

Start the Expo development server:

```bash
npm start
```

Or use specific platform commands:

```bash
# For Android
npm run android

# For iOS
npm run ios

# For Web
npm run web
```

### Using Expo Go

1. Install **Expo Go** on your device:
   - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
   - [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. Start the development server:

   ```bash
   npm start
   ```

3. Scan the QR code with Expo Go app

**Note:** Make sure your phone and computer are on the same Wi-Fi network.

## Build Commands

### Building APK for Android

#### Prerequisites

- EAS CLI installed: `npm install -g eas-cli`
- Expo account (sign up at [expo.dev](https://expo.dev))

#### Steps

1. **Login to EAS:**

   ```bash
   npx eas login
   ```

2. **Build APK (Cloud Build):**

   ```bash
   npx eas build --platform android --profile preview
   ```

   - This builds in the cloud (takes 10-20 minutes)
   - You'll get a download link when complete

3. **Build APK (Local Build - Faster):**

   ```bash
   npx eas build --platform android --profile preview --local
   ```

   - Requires Android SDK installed
   - Faster than cloud build

4. **Production Build:**
   ```bash
   npx eas build --platform android --profile production
   ```

### Building for iOS

```bash
npx eas build --platform ios --profile preview
```

**Note:** iOS builds require an Apple Developer account.

### Build Profiles

The `eas.json` file contains three build profiles:

- **development**: For development builds with development client
- **preview**: For testing (APK/IPA files)
- **production**: For app store releases

## Project Structure

```
todo-app-native/
├── app/                    # Expo Router pages
│   ├── (tabs)/            # Tab navigation
│   │   ├── index.tsx      # Main todo screen
│   │   └── explore.tsx    # Explore tab
│   └── _layout.tsx         # Root layout
├── components/             # React components
│   ├── TodoInput.tsx      # Todo input field
│   ├── TodoItem.tsx       # Individual todo item
│   ├── TodoHeader.tsx     # App header
│   └── TodoFilters.tsx    # Filter buttons
├── convex/                 # Convex backend
│   ├── schema.ts          # Database schema
│   └── todos.ts           # Todo functions
├── contexts/               # React contexts
│   └── ConvexProvider.tsx  # Convex client provider
├── constants/              # App constants
│   └── theme.ts           # Theme colors
├── hooks/                  # Custom hooks
│   └── use-theme.ts       # Theme hook
├── assets/                 # Images and assets
│   └── images/            # App images
├── .env                    # Environment variables (not in git)
├── eas.json                # EAS Build configuration
└── app.json                # Expo configuration
```

## Environment Variables

### Required Variables

| Variable                 | Description                | Example                                 |
| ------------------------ | -------------------------- | --------------------------------------- |
| `EXPO_PUBLIC_CONVEX_URL` | Your Convex deployment URL | `https://wary-cardinal-22.convex.cloud` |

### How to Get Convex URL

1. Run `npx convex dev` - it will create/update `.env` automatically
2. Or get it from [Convex Dashboard](https://dashboard.convex.dev)
3. Format: `https://<deployment-name>.convex.cloud`

### Environment File Example

```env
# Convex Configuration
EXPO_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud
```

**Important:**

- Never commit `.env` file to git
- The `.env` file is already in `.gitignore`
- Use `.env.example` for documentation (optional)

## Troubleshooting

### Convex Connection Issues

If you see "Convex URL not configured" warning:

1. Check your `.env` file exists and has `EXPO_PUBLIC_CONVEX_URL`
2. Verify the URL format: `https://<deployment>.convex.cloud`
3. Restart the Expo dev server after updating `.env`
4. Run `npx convex dev` to ensure deployment is active

### Build Issues

- **"Not logged in"**: Run `npx eas login`
- **"No EAS project"**: Run `npx eas build:configure` first
- **Build fails**: Check your `app.json` configuration

### App Not Loading

- Clear Expo cache: `npx expo start --clear`
- Restart Metro bundler
- Check Convex deployment is active

## Development

### Linting

```bash
npm run lint
```

### Type Checking

```bash
npx tsc --noEmit
```

## Learn More

- [Expo Documentation](https://docs.expo.dev/)
- [Convex Documentation](https://docs.convex.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [Expo Router Documentation](https://docs.expo.dev/router/introduction/)

## License

Private project
