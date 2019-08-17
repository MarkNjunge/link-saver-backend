const axios = require("axios").default;
const cheerio = require("cheerio");

export async function parse(url: string): Promise<UrlMeta> {
  const res = await axios.get(url);
  const $ = cheerio.load(res.data);

  let title = $("meta[property='og:title']").attr("content");
  const description = $("meta[property='og:description']").attr("content");
  const image = $("meta[property='og:image']").attr("content");

  if (title == undefined) {
    title = url
      .split(/(http|https):\/\//)
      .slice(-1)[0]
      .split("/")[0];
  }

  return { title, description, image };
}

export class UrlMeta {
  title: string;
  description: string;
  image: string;
}
