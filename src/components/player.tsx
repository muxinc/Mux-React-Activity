import type MuxPlayerElement from "@mux/mux-player";
import MuxPlayer from "@mux/mux-player-react";
import { forwardRef } from "react";

type PlayerProps = {
  playbackId?: string;
  autoPlay?: boolean;
  muted?: boolean;
};

const Player = forwardRef<MuxPlayerElement, PlayerProps>(
  (
    {
      playbackId = "I8xlBDJBDYArLB2lytmBDF3lBFl01xfPxbL4ib01Hlly8",
      autoPlay,
      muted,
    },
    ref,
  ) => {
    return (
      <MuxPlayer
        ref={ref}
        playbackId={playbackId}
        autoPlay={autoPlay}
        muted={muted}
        streamType="on-demand"
        accentColor="#a0e9ff"
        thumbnailTime={15}
        className="aspect-[16/9] w-full max-w-[960px]"
      />
    );
  },
);

Player.displayName = "Player";

export default Player;
