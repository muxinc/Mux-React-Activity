import MuxPlayer from "@mux/mux-player-react";
import type MuxPlayerElement from "@mux/mux-player";
import { forwardRef, type ComponentPropsWithoutRef } from "react";

type PlayerProps = ComponentPropsWithoutRef<typeof MuxPlayer>;

const DEFAULT_PLAYBACK_ID = "I8xlBDJBDYArLB2lytmBDF3lBFl01xfPxbL4ib01Hlly8";

const Player = forwardRef<MuxPlayerElement, PlayerProps>(
  (
    {
      playbackId = DEFAULT_PLAYBACK_ID,
      streamType = "on-demand",
      accentColor = "#a0e9ff",
      thumbnailTime = 15,
      className,
      children,
      ...rest
    },
    ref,
  ) => (
    <MuxPlayer
      ref={ref}
      playbackId={playbackId}
      streamType={streamType}
      accentColor={accentColor}
      thumbnailTime={thumbnailTime}
      className={`aspect-[16/9] w-full max-w-[960px]${className ? ` ${className}` : ""}`}
      {...rest}
    >
      {children}
    </MuxPlayer>
  ),
);

Player.displayName = "Player";

export default Player;
