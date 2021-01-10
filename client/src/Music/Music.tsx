import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useCallback, useEffect, useState } from "react";

import MusicInfo from "../MusicInfo/MusicInfo";
import MusicManagement from "../MusicManagement/MusicManagement";
import "./Music.scss";
import MusicItem from "./MusicItem/MusicItem";

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
    console.log("shuffle", shuffle);
    if (next && shuffle) {
      console.log(
        "🚀 ~ file: Music.tsx ~ line 85 ~ useEffect ~ shuffle",
        shuffle
      );
      // console.log(shuffle);
      let random = GenerateIndex();
      console.log("compare:", random === activeMusic.index);
      while (activeMusic.index === random) {
        // setActiveMusic({
        //   name: musics[random].name,
        //   author: musics[random].author,
        //   album: musics[random].album,
        //   liked: musics[random].liked,
        //   link: musics[random].link,
        //   image: musics[random].image,
        //   index: random,
        // });
        console.log(random);
        random = GenerateIndex();
      }

      console.log("setActiveMusic");
      setActiveMusic({
        name: musics[random].name,
        author: musics[random].author,
        album: musics[random].album,
        liked: musics[random].liked,
        link: musics[random].link,
        image: musics[random].image,
        index: random,
      });
      setNext(false);
      // if(activeMusic.index !== random){
      //   setActiveMusic({
      //     name: musics[random].name,
      //     author: musics[random].author,
      //     album: musics[random].album,
      //     liked: musics[random].liked,
      //     link: musics[random].link,
      //     image: musics[random].image,
      //     index: random + 1,
      //   });
      // }
    } else if (activeMusic.index && next && musics[activeMusic.index]) {
      // next music
      setActiveMusic({
        name: musics[activeMusic.index].name,
        author: musics[activeMusic.index].author,
        album: musics[activeMusic.index].album,
        liked: musics[activeMusic.index].liked,
        link: musics[activeMusic.index].link,
        image: musics[activeMusic.index].image,
        index: activeMusic.index,
      });
      setNext(false);
    }
  }, [next, musics, activeMusic.index, shuffle, GenerateIndex]);

  // const AddMusic = gql`
  //   mutation AddMusic(
  //     $name: String!
  //     $link: String!
  //     $author: String!
  //     $album: String!
  //     $image: String!
  //     $liked: Boolean!
  //   ) {
  //     AddMusic(
  //       name: $name
  //       link: $link
  //       author: $author
  //       album: $album
  //       liked: $liked
  //       image: $image
  //     ) {
  //       name
  //       # link
  //       # author
  //       # album
  //       # liked
  //       # image
  //     }
  //   }
  // `;

  // const [addMusic] = useMutation(AddMusic);

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
        {/*
        <button
          onClick={() =>
            addMusic({
              variables: {
                name: "Sapphire",
                link: "Sapphire",
                author: "Sapphire",
                album: "Sapphire",
                liked: false,
                image: "Sapphire",
              },
            })
          }
        >
          click
        </button> */}

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
