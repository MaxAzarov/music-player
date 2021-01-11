import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useCallback, useEffect, useState } from "react";

import MusicInfo from "../MusicInfo/MusicInfo";
import MusicManagement from "../MusicManagement/MusicManagement";
import MusicItem from "./MusicItem/MusicItem";
import "./Music.scss";

interface IMusic {
  name: string;
  author: string;
  album: string;
  liked: boolean;
  link: string;
  image: string;
}

const Music = () => {
  const [musics, setMusics] = useState<IMusic[]>([]);
  const [next, setNext] = useState<boolean>(false);
  const [shuffle, setShuffle] = useState<boolean>(true);

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

  const ToggleLike = gql`
    mutation ToggleLike($name: String!) {
      ToggleLike(name: $name)
    }
  `;

  const [toggleLike] = useMutation(ToggleLike);

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
      setActiveMusic({
        name: musics[index].name,
        author: musics[index].author,
        album: musics[index].album,
        liked: musics[index].liked,
        link: musics[index].link,
        image: musics[index].image,
        index: index,
      });
      setNext(false);
    },
    [musics]
  );

  const { data, loading } = useQuery(GetMusics);

  const GenerateIndex = useCallback(() => {
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
    <div className="music-wrapper">
      <div className="music">
        <div className="musics">
          {musics.map((item, index) => (
            <MusicItem
              key={index}
              index={index}
              link={item.link}
              name={item.name}
              author={item.author}
              album={item.album}
              liked={item.liked}
              image={item.image}
              setActiveMusic={setActiveMusic}
              setLiked={setLiked}
            ></MusicItem>
          ))}
        </div>

        <MusicInfo
          link={activeMusic.image}
          author={activeMusic.author}
          album={activeMusic.album}
          name={activeMusic.name}
          liked={activeMusic.liked}
          setLiked={setLiked}
        />
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
    </div>
  );
};
export default Music;
