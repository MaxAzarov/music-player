///<reference path="interface.d.ts"/>
import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useCallback, useEffect, useState } from "react";

import MusicInfo from "../MusicInfo/MusicInfo";
import MusicManagement from "../MusicManagement/MusicManagement";
import MusicItem from "./MusicItem/MusicItem";
import Spinner from "../Spinner/Spinner";
import useWindowSize from "../utils/useWindowSize";
import "./Music.scss";

const Music = () => {
  const [musics, setMusics] = useState<IMusic[]>([]);
  const [next, setNext] = useState<boolean>(false);
  const [shuffle, setShuffle] = useState<boolean>(true);
  const [windowWidth] = useWindowSize();

  const [activeMusic, setActiveMusic] = useState<
    IMusic & { index: number | undefined }
  >({
    name: "",
    author: "",
    album: "",
    liked: false,
    link: "",
    image: "",
    index: undefined,
  });

  const ToggleLike = gql`
    mutation ToggleLike($name: String!) {
      ToggleLike(name: $name)
    }
  `;

  const [toggleLike] = useMutation(ToggleLike);

  /**
   *
   * @param name Name of music
   */
  const setLiked = (name: string) => {
    setMusics((prevState) => {
      prevState = [
        ...prevState.map((item) => {
          if (item.name === name) {
            item = { ...item, liked: !item.liked };
          }
          return item;
        }),
      ];
      return [...prevState];
    });
    toggleLike({ variables: { name } });
  };

  const SetMusic = useCallback(
    (index: number) => {
      const { name, author, album, liked, link, image } = musics[index];
      setActiveMusic({
        name,
        author,
        album,
        liked,
        link,
        image,
        index,
      });
      setNext(false);
    },
    [musics]
  );

  const GetMusics = gql`
    query {
      GetMusics {
        name
        link
        author
        album
        liked
        image
      }
    }
  `;

  const { data, loading } = useQuery(GetMusics);

  const GenerateIndex = useCallback((): number => {
    return Math.floor(Math.random() * musics.length);
  }, [musics.length]);

  useEffect(() => {
    if (data && !loading) {
      setMusics(data.GetMusics);
    }
  }, [data, loading]);

  useEffect(() => {
    if (next && shuffle) {
      let random = GenerateIndex();
      while (activeMusic.index === random) {
        random = GenerateIndex();
      }
      SetMusic(random);
    } else if (activeMusic.index && next && musics[activeMusic.index]) {
      SetMusic(activeMusic.index);
    }
  }, [next, musics, activeMusic.index, shuffle, GenerateIndex, SetMusic]);

  return (
    <section className="musics">
      <div className="musics__wrapper">
        {windowWidth < 992 &&
          !activeMusic.name &&
          (musics ? (
            <div className="musics__list">
              {musics.map((item, index) => (
                <MusicItem
                  key={index}
                  index={index}
                  music={item}
                  setActiveMusic={setActiveMusic}
                  setLiked={setLiked}
                />
              ))}
            </div>
          ) : (
            <Spinner />
          ))}

        {windowWidth > 992 && musics && (
          <div className="musics__list">
            {musics.map((item, index) => (
              <MusicItem
                key={index}
                index={index}
                music={item}
                setActiveMusic={setActiveMusic}
                setLiked={setLiked}
              />
            ))}
          </div>
        )}

        <MusicInfo musicInfo={activeMusic} setLiked={setLiked} />
      </div>
      {activeMusic.link && (
        <MusicManagement
          shuffle={shuffle}
          setShuffle={setShuffle}
          link={activeMusic.link}
          setNext={setNext}
          name={activeMusic.name}
        />
      )}
    </section>
  );
};
export default Music;
