import React, { useEffect, useRef, useState } from "react";
import "./MusicProgressBar.scss";

interface Props {
  timer: number;
  duration: number;
  minutes: number;
  seconds: number;
  name: string;
  updateTime: (newTime: number) => void;
}

const MusicProgressBar = ({
  name,
  minutes,
  seconds,
  timer,
  duration,
  updateTime,
}: Props) => {
  const durMinutes = Math.floor(duration / 60);
  const durSeconds = Math.floor(duration - durMinutes * 60);
  const [width, setWidth] = useState<number>();
  const [barWidth, setBarWidth] = useState(0); // bar width
  const barRef = useRef<any>(null);
  const barRef2 = useRef<any>(null);
  useEffect(() => {
    setBarWidth(barRef.current.clientWidth);
  }, [setBarWidth]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const mouseX = e.pageX - barRef.current.offsetLeft;
    const newTime = (mouseX * duration) / barWidth;
    updateTime(newTime);
  };

  useEffect(() => {
    setWidth((timer * barWidth) / duration);
  }, [timer, barWidth, duration, setWidth]);

  return (
    <div className="music__progress music-progress">
      <p>{name}</p>
      <div>
        <p>
          {minutes < 10 ? "0" + minutes : minutes}:
          {seconds < 10 ? "0" + seconds : seconds}
        </p>

        <div
          className="music-progress__defaultBar"
          ref={barRef}
          onClick={handleClick}
        >
          <div
            className="music-progress__progressbar"
            ref={barRef2}
            style={{ width }}
          ></div>
        </div>
        <p>
          {durMinutes}:{durSeconds}
        </p>
      </div>
    </div>
  );
};

export default MusicProgressBar;
