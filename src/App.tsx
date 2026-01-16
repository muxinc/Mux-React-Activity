import type { ReactNode } from "react";
import type MuxPlayerElement from "@mux/mux-player";
import { Button } from "@base-ui/react/button";
import { Tabs } from "@base-ui/react/tabs";
import { Activity, useLayoutEffect, useRef, useState } from "react";
import Player from "./components/player";

type TabKey = "video" | "notes";

type ExampleCardProps = {
  title: string;
  description: string;
  children: ReactNode;
};

const exampleCardClasses =
  "rounded-2xl border border-[#1d2742] bg-[#0a1325] p-5 shadow-[0_18px_40px_rgba(0,0,0,0.22)] sm:p-6";
const exampleHeaderClasses = "mb-3 flex flex-col gap-1.5";
const tabsListWrapperClasses =
  "mt-3 w-full rounded-2xl border border-[#1d2742] bg-[#050a16] p-1";
const tabButtonClasses =
  "w-full rounded-xl border border-[#1d2742] bg-[#0b172b] px-4 py-2 text-sm font-semibold text-[#e8f1ff] transition hover:border-[#5cd4ff]/70 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5cd4ff]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050a16] data-[active]:text-[#041221]";
const tabButtonActiveClasses =
  "data-[active]:border-transparent data-[active]:bg-[linear-gradient(120deg,#5cd4ff,#86f7d7)] data-[active]:shadow-[0_10px_30px_rgba(92,212,255,0.2)]";
const tabIndicatorClasses =
  "pointer-events-none absolute inset-y-1 left-0 -z-10 h-[calc(100%-0.5rem)] w-[var(--active-tab-width)] translate-x-[var(--active-tab-left)] rounded-xl bg-[linear-gradient(120deg,#5cd4ff,#86f7d7)] opacity-80 transition-all duration-200 ease-in-out";
const panelsClasses = "grid gap-4";
const panelClassName =
  "rounded-2xl border border-[#1d2742] bg-[#0c1427] p-5 shadow-[0_18px_40px_rgba(0,0,0,0.25)]";
const panelNoteClasses = "mt-3 text-sm leading-relaxed text-[#aab7d4]";
const codeBadgeClasses =
  "rounded-lg bg-[#0e1d35] px-1.5 py-0.5 text-sm text-[#c6e3ff]";

const ExampleCard = ({ title, description, children }: ExampleCardProps) => (
  <section className={exampleCardClasses}>
    <div className={exampleHeaderClasses}>
      <p className="m-0 text-xs font-bold uppercase tracking-[0.08em] text-[#5cd4ff]">
        Activity Troubleshooting
      </p>
      <h2 className="m-0 text-2xl font-semibold leading-tight text-white">
        {title}
      </h2>
      <p className="m-0 text-sm leading-relaxed text-[#aab7d4]">
        {description}
      </p>
    </div>
    {children}
  </section>
);

type TabSwitcherProps = {
  activeTab: TabKey;
  onChange: (tab: TabKey) => void;
  idPrefix: string;
};

const TabSwitcher = ({ activeTab, onChange, idPrefix }: TabSwitcherProps) => (
  <Tabs.Root
    value={activeTab}
    onValueChange={(value) => onChange(value as TabKey)}
    className="w-full"
  >
    <Tabs.List
      className={`relative flex flex-wrap gap-3 ${tabsListWrapperClasses}`}
      aria-label="Example tabs"
      id={`${idPrefix}-tabs`}
    >
      <Tabs.Tab
        id={`${idPrefix}-video-tab`}
        aria-controls={`${idPrefix}-video`}
        value="video"
        render={<Button className="w-full" />}
        className={`${tabButtonClasses} ${tabButtonActiveClasses}`}
      >
        Video tab
      </Tabs.Tab>
      <Tabs.Tab
        id={`${idPrefix}-notes-tab`}
        aria-controls={`${idPrefix}-notes`}
        value="notes"
        render={<Button className="w-full" />}
        className={`${tabButtonClasses} ${tabButtonActiveClasses}`}
      >
        Click here to test the{" "}
        <code className={codeBadgeClasses}>&lt;Activity/&gt;</code> component
      </Tabs.Tab>
      <Tabs.Indicator className={tabIndicatorClasses} />
    </Tabs.List>
  </Tabs.Root>
);

type PausingPlayerPanelProps = {
  isVisible: boolean;
  idPrefix: string;
};

const PausingPlayerPanel = ({
  isVisible,
  idPrefix,
}: PausingPlayerPanelProps) => {
  const playerRef = useRef<MuxPlayerElement | null>(null);

  useLayoutEffect(() => {
    const player = playerRef.current;
    return () => {
      player?.pause();
    };
  }, [isVisible]);

  return (
    <div
      id={`${idPrefix}-video`}
      role="tabpanel"
      aria-labelledby={`${idPrefix}-video-tab`}
      hidden={!isVisible}
      className={panelClassName}
    >
      <Player autoPlay muted ref={playerRef} />
      <p className={panelNoteClasses}>
        Play the video, switch to notes, then come back—the pause position is
        preserved.
      </p>
    </div>
  );
};

const FinishedExample = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("video");
  const isVideoTab = activeTab === "video";

  return (
    <ExampleCard
      title="Finished: pause before hiding"
      description="useLayoutEffect pauses immediately, and Activity keeps the player mounted so playback resumes from where you left off."
    >
      <TabSwitcher
        idPrefix="finished"
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      <section className={panelsClasses}>
        <Activity
          name="Finished player"
          mode={isVideoTab ? "visible" : "hidden"}
        >
          <PausingPlayerPanel isVisible={isVideoTab} idPrefix="finished" />
        </Activity>

        <Activity
          name="Finished notes"
          mode={!isVideoTab ? "visible" : "hidden"}
        >
          <div
            id="finished-notes"
            role="tabpanel"
            aria-labelledby="finished-notes-tab"
            hidden={isVideoTab}
            className={panelClassName}
          >
            <h3 className="mt-0 text-lg font-semibold text-white">
              Why this works
            </h3>
            <ul className="ml-4 list-disc space-y-2 text-sm text-[#aab7d4]">
              <li>
                <code className={codeBadgeClasses}>&lt;Activity&gt;</code> keeps
                both tabs mounted, so player state lives on.
              </li>
              <li>
                <code className={codeBadgeClasses}>
                  &lt;useLayoutEffect&gt;
                </code>{" "}
                pauses before paint, so audio never leaks.
              </li>
              <li>
                The seek position remains when you return to the video tab.
              </li>
            </ul>
          </div>
        </Activity>
      </section>
    </ExampleCard>
  );
};

const HiddenButPlayingExample = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("video");
  const isVideoTab = activeTab === "video";

  return (
    <ExampleCard
      title="Hidden but still playing"
      description="Well this might not actually be a problem. It really depends on the experience you're looking for. Activity hides the player but, without pausing, the audio keeps playing in the background."
    >
      <TabSwitcher
        idPrefix="hidden"
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      <section className={panelsClasses}>
        <Activity name="Hidden player" mode={isVideoTab ? "visible" : "hidden"}>
          <div
            id="hidden-video"
            role="tabpanel"
            aria-labelledby="hidden-video-tab"
            hidden={!isVideoTab}
            className={panelClassName}
          >
            <Player autoPlay muted />
            <p className={panelNoteClasses}>
              If you start playback and switch to notes, the player keeps
              running because nothing pauses it when the tab hides.
            </p>
          </div>
        </Activity>

        <Activity name="Hidden notes" mode={!isVideoTab ? "visible" : "hidden"}>
          <div
            id="hidden-notes"
            role="tabpanel"
            aria-labelledby="hidden-notes-tab"
            hidden={isVideoTab}
            className={panelClassName}
          >
            <h3 className="mt-0 text-lg font-semibold text-white">Fix</h3>
            <p className={panelNoteClasses}>
              Add a <code className={codeBadgeClasses}>useLayoutEffect</code>{" "}
              that calls <code className={codeBadgeClasses}>pause()</code> when
              the tab hides to stop background playback.
            </p>
          </div>
        </Activity>
      </section>
    </ExampleCard>
  );
};

const UnmountedExample = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("video");
  const isVideoTab = activeTab === "video";

  return (
    <ExampleCard
      title="Problem: unmounting resets playback"
      description="Without Activity, switching tabs unmounts the player and restarts the stream when you come back."
    >
      <TabSwitcher
        idPrefix="unmounted"
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      <section className={panelsClasses}>
        {isVideoTab ? (
          <div
            id="unmounted-video"
            role="tabpanel"
            aria-labelledby="unmounted-video-tab"
            className={panelClassName}
          >
            <Player autoPlay muted />
            <p className={panelNoteClasses}>
              Switch away and back—the player remounts and restarts because the
              component was removed from the tree.
            </p>
          </div>
        ) : (
          <div
            id="unmounted-notes"
            role="tabpanel"
            aria-labelledby="unmounted-notes-tab"
            className={panelClassName}
          >
            <h3 className="mt-0 text-lg font-semibold text-white">Fix</h3>
            <p className={panelNoteClasses}>
              Wrap each tab in{" "}
              <code className={codeBadgeClasses}>&lt;Activity&gt;</code>
              to keep the player mounted and preserve its state while hidden.
            </p>
          </div>
        )}
      </section>
    </ExampleCard>
  );
};

const App = () => {
  return (
    <main className="mx-auto flex max-w-[1200px] flex-col gap-6 px-6 pb-24 pt-14">
      <header className="flex flex-col gap-3">
        <p className="m-0 text-xs font-bold uppercase tracking-[0.08em] text-[#5cd4ff]">
          React 19.2 Activity
        </p>
        <h1 className="m-0 text-4xl font-semibold text-white md:text-5xl">
          Keep Mux playback in sync
        </h1>
        <p className="m-0 max-w-3xl text-base leading-relaxed text-[#aab7d4]">
          Three examples from the Activity troubleshooting guide: start with the
          broken cases, then finish with the{" "}
          <code className={codeBadgeClasses}>useLayoutEffect</code> fix that
          solves them.
        </p>
      </header>

      <div className="flex flex-col gap-5">
        <UnmountedExample />
        <HiddenButPlayingExample />
        <FinishedExample />
      </div>
    </main>
  );
};

export default App;
