# Mux + React 19.2

React 19.2 is a powerful upgrade to React. It provides a wide range of features and tools to help developers create high-quality, scalable, and maintainable applications. There are a ton of new features in this version of React that make user experiences really smooth. 

## Activity Component

The `Activity` component is a new feature in React 19.2 that allows you to preserve the state and DOM of hidden UI while deprioritizing its rendering. It's perfect for tabs, navigation, or any UI that needs to maintain state when switching views.

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

This Example uses the Activity component to show you how to use it with the [mux-player-react component](https://www.npmjs.com/package/@mux/mux-player-react). This is perfect for video streaming apps where you want to preserve the user's progress and input state across tabs or views.


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

To learn more about Rsbuild, check out the following resources:

- [Rsbuild documentation](https://rsbuild.rs) - explore Rsbuild features and APIs.
- [Rsbuild GitHub repository](https://github.com/web-infra-dev/rsbuild) - your feedback and contributions are welcome!
# Mux-React-Activity
