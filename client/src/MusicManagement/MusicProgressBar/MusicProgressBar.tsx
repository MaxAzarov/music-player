import React from "react";
import "./MusicProgressBar.scss";

interface Props {
  timer: number;
  duration: number;
  minutes: number;
  seconds: number;
  name: string;
}

const MusicProgressBar = ({
  name,
  minutes,
  seconds,
  timer,
  duration,
}: Props) => {
  const durMinutes = Math.floor(duration / 60);
  const durSeconds = Math.floor(duration - durMinutes * 60);

  return (
    <div className="music-progress">
      <p>{name}</p>
      <div>
        <p>
          {minutes < 10 ? "0" + minutes : minutes}:
          {seconds < 10 ? "0" + seconds : seconds}
        </p>
        <meter
          value={timer}
          min={0}
          max={duration}
          className="music-progress__duration"
        ></meter>
        <p>
          {durMinutes}:{durSeconds}
        </p>
      </div>
    </div>
  );
};

export default MusicProgressBar;
