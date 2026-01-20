# Mux + React 19.2 Activity Component

## The Problem

When building video streaming apps with tabbed interfaces, you face a UX dilemma: **how do you preserve video playback position when users switch between tabs?**

Traditional React unmounts components when they're hidden, which resets video playback to the beginning. This repo demonstrates three approaches to solving this problem using React 19.2's new `Activity` component with [Mux Player](https://www.npmjs.com/package/@mux/mux-player-react).

## Three Scenarios Compared

### Scenario 1: No Activity Component (The Problem)

**Problem:** Switching tabs unmounts the video player, losing all playback state.

![Problem: unmounting resets playback](public/unmounted.gif)

When you return to the video tab, the player remounts and playback restarts from the beginning. Users lose their progress.

### Scenario 2: Activity Without Pause (Unfinished Solution)

**Problem:** Video keeps playing in the background after switching tabs.

![Hidden but still playing](public/hide-play.gif)

Using `Activity` keeps the player mounted and preserves state, but audio continues playing when you switch away. This creates a confusing UX where users hear audio from a tab they can't see. This actually might not be a problem because it depends on the experience you're looking for. There may be a case where you'd want the video to keep playing.

### Scenario 3: Activity With Auto-Pause (Complete Solution)

**Solution:** Video pauses automatically when hidden, resumes seamlessly when visible.

![Finished: pause before hiding](public/hide-pause.gif)

Combining `Activity` with `useLayoutEffect` provides the ideal UX: the player pauses immediately when you switch tabs, and because the player stays mounted, returning to the tab resumes playback exactly where you left off.

## What is the Activity Component?

The `Activity` component is a new feature in React 19.2 that preserves the state and DOM of hidden UI while its rendering. Instead of unmounting components when they're hidden, `Activity` keeps them in memory while making them invisible.

Here's a basic example:

```tsx
import { Activity, useState } from "react";

function App() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div>
      <nav>
        <button onClick={() => setActiveTab("home")}>Home</button>
        <button onClick={() => setActiveTab("profile")}>Profile</button>
      </nav>

      <Activity mode={activeTab === "home" ? "visible" : "hidden"}>
        <HomeTab />
      </Activity>

      <Activity mode={activeTab === "profile" ? "visible" : "hidden"}>
        <ProfileTab />
      </Activity>
    </div>
  );
}
```

This pattern is perfect for video players, forms, data tables, and any UI where preserving state across view changes is critical to the UX.

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
