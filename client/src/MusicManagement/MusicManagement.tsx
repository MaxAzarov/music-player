import React, {
  useEffect,
  useMemo,
  useState,
  useCallback,
  SetStateAction,
  Dispatch,
} from "react";
import classNames from "classnames";

import MusicProgressBar from "./MusicProgressBar/MusicProgressBar";
import "./MusicManagement.scss";

interface Props {
  link: string;
  setNext: any;
  name: string;
  shuffle: boolean;
  setShuffle: Dispatch<SetStateAction<boolean>>;
}

const MusicManagement = ({
  link,
  setNext,
  name,
  shuffle,
  setShuffle,
}: Props) => {
  const [play, setPlay] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(0);
  const [loop, setLoop] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>();
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);

  const audio = useMemo(() => new Audio(link), [link]);

  const Play = useCallback(() => {
    setPlay(true);
    audio.play();
  }, [audio, setPlay]);

  const Pause = useCallback(() => {
    setPlay(false);
    audio.pause();
  }, [audio, setPlay]);

  useEffect(() => {
    link && Play();
    return () => Pause();
  }, [Play, Pause, link]);

  const UpdateTime = (newTime: number) => {
    audio.currentTime = newTime;
  };

  const shuffleStyle = classNames({
    opacity: !shuffle,
  });

  const loopStyle = classNames({
    opacity: !loop,
  });

  //  duration of loaded music
  audio.onloadedmetadata = () => setDuration(audio.duration);

  // music play
  audio.ontimeupdate = () => {
    setTimer(audio.currentTime);
    if (audio.ended) {
      // next music
      setPlay(false);
      setNext(true);
    }
    // current second and minute of music
    const minutes = Math.floor(audio.currentTime / 60);
    const seconds = Math.floor(audio.currentTime - minutes * 60);
    setMinutes(minutes);
    setSeconds(seconds);
  };

  const styles = { color: "#fff", fontSize: "1.5rem", opacity: 0.7 };
  const styles2 = { color: "#fff", fontSize: "2em", opacity: 0.7 };
  const style3 = { color: "#fff", fontSize: "1.5em" };

  return (
    <div className="music-management">
      <div className="music-management__control">
        <span
          style={styles}
          onClick={() => {
            audio.currentTime = 0;
            setTimer(0);
          }}
        >
          <i className="fas fa-step-backward"></i>
        </span>

        {play ? (
          <span
            className="music-management__continue"
            style={styles2}
            onClick={() => Pause()}
          >
            <i className="fas fa-pause"></i>
          </span>
        ) : (
          <span
            className="music-management__continue"
            style={styles2}
            onClick={() => Play()}
          >
            <i className="fas fa-play"></i>
          </span>
        )}

        <span
          style={styles}
          onClick={() => {
            Pause();
            setNext(true);
          }}
        >
          <i className="fas fa-step-forward"></i>
        </span>
      </div>

      {duration && (
        <MusicProgressBar
          name={name}
          duration={duration}
          minutes={minutes}
          seconds={seconds}
          timer={timer}
          updateTime={UpdateTime}
        />
      )}

      <div className="music-management__musics">
        <span
          className={loopStyle + " music-management__loop"}
          style={style3}
          onClick={() => {
            audio.loop = !loop;
            setLoop(!loop);
          }}
        >
          <i className="fal fa-repeat-alt"></i>
        </span>
        <span
          className={shuffleStyle}
          style={style3}
          onClick={() => setShuffle(!shuffle)}
        >
          <i className="fal fa-random"></i>
        </span>
      </div>
    </div>
  );
};
export default MusicManagement;
