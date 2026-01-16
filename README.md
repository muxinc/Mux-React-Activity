# Mux + React 19.2

React 19.2 is a powerful upgrade to React. It provides a wide range of features and tools to help developers create high-quality, scalable, and maintainable applications. There are a ton of new features in this version of React that make user experiences really smooth especially for video streaming apps. Use this repo to explore the new Activity component introduced in React 19.2.

## Activity Component

The `Activity` component is a new feature in React 19.2 that allows you to preserve the state and DOM of hidden UI while deprioritizing its rendering. It's perfect for tabs, navigation, or any UI that needs to maintain state when switching views.

Here's some example code:

```tsx
import { Activity, useState } from 'react';

function App() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div>
      <nav>
        <button onClick={() => setActiveTab('home')}>Home</button>
        <button onClick={() => setActiveTab('profile')}>Profile</button>
      </nav>

      <Activity mode={activeTab === 'home' ? 'visible' : 'hidden'}>
        <HomeTab />
      </Activity>

      <Activity mode={activeTab === 'profile' ? 'visible' : 'hidden'}>
        <ProfileTab />
      </Activity>
    </div>
  );
}
```

## So why would a video streaming app use the Activity component?

The Activity component is perfect for video streaming apps where you want to preserve the user's progress and input state across tabs or views. It allows you to maintain the state of the video player (we used [mux-player-react component](https://www.npmjs.com/package/@mux/mux-player-react)) even when the user switches to another tab or view. This is especially useful when the user's progress and input state are critical to the UX.

The Activity component is also useful for preserving the state of other UI elements, such as forms, tables and other dashboard type components, that need to maintain their state when switching views.

## Setup

Install the dependencies:

```bash
bun install
```

## Get started

Start the dev server, and the app will be available at [http://localhost:3000](http://localhost:3000).

```bash
bun run dev
```

Build the app for production:

```bash
bun run build
```

Preview the production build locally:

```bash
bun run preview
```

## Learn more

To learn more about Mux, check out the following resources:

- [Mux documentation](https://docs.mux.com) - explore Mux features and APIs.
- [Mux Player React](https://docs.mux.com/guides/mux-player-web) - learn how to use Mux Player in your React apps.
- [React Activity Component](https://react.dev/reference/react/Activity) - learn about the Activity component in React 19.2.
