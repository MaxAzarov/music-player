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
    GetMusics: async function (_: any, {}): Promise<any> {
      const musics = await Music.find({});
      return musics;
    },
  },
  Mutation: {
    AddMusic: async function (
      _: any,
      { name, link, author, album, liked, image }: IMusic
    ): Promise<IMusic> {
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
    ToggleLike: async function (
      _: any,
      { name }: { name: string }
    ): Promise<string> {
      let music = await Music.findOne({ name });
      music.liked = !music.liked;
      await music.save();
      return "ok";
    },
  },
};
export default resolvers;
