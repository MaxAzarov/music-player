import React from "react";
import classNames from "classnames";

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
          <span
            style={{ fontSize: "1.2em", color: "#fff", marginRight: "5px" }}
            className={heart}
            onClick={() => setLiked(musicInfo.name as string)}
          >
            <i className="fas fa-heart"></i>
          </span>
        </div>
      </div>
    </div>
  );
};
export default MusicInfo;
