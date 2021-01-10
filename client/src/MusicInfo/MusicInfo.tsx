import classNames from "classnames";
import React from "react";

import "./MusicInfo.scss";

interface Props {
  link: string;
  author: string;
  album: string;
  name: string;
  liked: boolean;
  setLiked: (name: string) => void;
}

const MusicInfo = ({ link, name, author, album, liked, setLiked }: Props) => {
  const style = classNames({
    visibility: !link,
    "music-info": true,
  });

  const heart = classNames({
    opacity: liked,
  });

  // const setLiked = () => {
  //   setMusics((prevState) => {
  //     prevState = [
  //       ...prevState.map((item) => {
  //         if (item.name === name) {
  //           item = { ...item, liked: !item.liked };
  //         }
  //         return item;
  //       }),
  //     ];
  //     return [...prevState];
  //   });
  // };

  return (
    <div className={style}>
      <img className="music-info__img" src={link} alt="" />
      <div className="music-info__wrapper">
        <div className="music-info__title">
          <p>{name}</p>
          <p>
            {author} • {album}
          </p>
        </div>

        <div className="music-info__icons">
          <span
            style={{ fontSize: "1.2em", color: "#fff", marginRight: "5px" }}
            className={heart}
            onClick={() => setLiked(name)}
          >
            <i className="fas fa-heart"></i>
          </span>
        </div>
      </div>
    </div>
  );
};
export default MusicInfo;
