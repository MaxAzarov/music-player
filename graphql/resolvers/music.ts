import Music from "./../../models/Music";

interface IMusic {
  name: string;
  link: string;
  author: string;
  album: string;
  liked: boolean;
  image: string;
}

const resolvers = {
  Query: {
    GetMusics: async function (_: any, {}) {
      const musics = await Music.find({});
      // console.log(musics);
      return musics;
    },
    hello: async function () {
      return "hello";
    },
  },
  Mutation: {
    AddMusic: async function (
      _: any,
      { name, link, author, album, liked, image }: IMusic
    ) {
      console.log("🚀 ~ file: music.ts ~ line 28 ~ name", name);

      const music = new Music({ name, link, author, album, liked, image });
      await music.save();

      return {
        name,
        link,
        author,
        album,
        liked,
        image,
      };
    },
    ToggleLike: async function (_: any, { name }: { name: string }) {
      let music = await Music.findOne({ name });
      console.log(music);
      music.liked = !music.liked;
      await music.save();
      return "ok";
    },
  },
};
export default resolvers;
