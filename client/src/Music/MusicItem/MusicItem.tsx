import React, { Dispatch, SetStateAction } from "react";
import classNames from "classnames";

import "./MusicItem.scss";

interface Props {
  name: string;
  author: string;
  album: string;
  liked: boolean;
  index: number;
  link: string;
  image: string;
  setActiveMusic: Dispatch<
    SetStateAction<IMusic & { index: number | undefined }>
  >;
  setLiked: (name: string) => void;
}

const MusicItem = ({
  name,
  author,
  album,
  liked,
  index,
  link,
  image,
  setActiveMusic,
  setLiked,
}: Props) => {
  const heart = classNames({
    opacity: !liked,
  });

  return (
    <div
      className="music-item"
      onClick={() => {
        setActiveMusic((prevState) => ({
          ...prevState,
          name,
          author,
          album,
          link,
          image,
          liked,
          index: index + 1,
        }));
      }}
    >
      <div className="music-item__wrapper">
        <span className="music-item__index">{index + 1}</span>

        <div className="music-item__info">
          <span className="music-item__name">{name}</span>
          <p className="music-item__details">
            {author}&nbsp;•&nbsp;{album}
          </p>
        </div>
      </div>

      <div className="music-item__icons">
        <span
          style={{ fontSize: "1.2em", color: "#fff", marginRight: "5px" }}
          className={heart}
          onClick={() => setLiked(name)}
        >
          <i className="fas fa-heart"></i>
        </span>

        <span style={{ fontSize: "1.2em", color: "#fff", marginRight: "5px" }}>
          <i className="fas fa-arrow-circle-right"></i>
        </span>
      </div>
    </div>
  );
};
export default MusicItem;
