import React, { Dispatch, SetStateAction } from "react";
import classNames from "classnames";

import Span from "../../Shared/Span";
import "./MusicItem.scss";

interface Props {
  music: IMusic;
  index: number;
  setActiveMusic: Dispatch<
    SetStateAction<IMusic & { index: number | undefined }>
  >;
  setLiked: (name: string) => void;
}

const MusicItem = ({ index, music, setActiveMusic, setLiked }: Props) => {
  const heart = classNames({
    opacity: !music.liked,
  });

  return (
    <div
      className="music-item"
      onClick={() => {
        setActiveMusic((prevState) => ({
          ...prevState,
          ...music,
          index: index + 1,
        }));
      }}
    >
      <div className="music-item__wrapper">
        <span className="music-item__index">{index + 1}</span>

        <div className="music-item__info">
          <span className="music-item__name">{music.name}</span>
          <p className="music-item__details">
            {music.author}&nbsp;•&nbsp;{music.album}
          </p>
        </div>
      </div>

      <div className="music-item__icons">
        <Span
          className={heart}
          onClick={(e) => {
            e.stopPropagation();
            setLiked(music.name);
          }}
        >
          <i className="fas fa-heart"></i>
        </Span>

        <Span>
          <i className="fas fa-arrow-circle-right"></i>
        </Span>
      </div>
    </div>
  );
};
export default MusicItem;
