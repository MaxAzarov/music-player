import React from "react";
import classNames from "classnames";

import Span from "../Shared/Span";
import "./MusicInfo.scss";

interface Props {
  musicInfo: Partial<IMusic>;
  setLiked: (name: string) => void;
}

const MusicInfo = ({ musicInfo, setLiked }: Props) => {
  const style = classNames({
    visibility: !musicInfo.image,
    "music-info": true,
  });

  const heart = classNames({
    opacity: musicInfo.liked,
  });

  return (
    <div className={style}>
      <img className="music-info__img" src={musicInfo.image} alt="" />
      <div className="music-info__wrapper">
        <div className="music-info__title">
          <p>{musicInfo.name}</p>
          <p>
            {musicInfo.author} • {musicInfo.album}
          </p>
        </div>

        <div className="music-info__icons">
          <Span
            className={heart}
            onClick={() => setLiked(musicInfo.name as string)}
          >
            <i className="fas fa-heart"></i>
          </Span>
        </div>
      </div>
    </div>
  );
};
export default MusicInfo;
