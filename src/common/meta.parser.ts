const axios = require("axios").default;
const cheerio = require("cheerio");

export async function parse(url: string): Promise<UrlMeta> {
  const res = await axios.get(url);
  const $ = cheerio.load(res.data);

  const title = $("title").text();

  let description = $("meta[property='og:description']").attr("content");
  if (description === undefined || description === "") {
    description = $("meta[name='description']").attr("content");
  }
  if (description === undefined || description === "") {
    description = $("meta[name='twitter:description']").attr("content");
  }

  let image = $("meta[property='og:image']").attr("content");
  if (image === undefined || image === "") {
    image = $("meta[name='twitter:image']").attr("content");
  }

  return { title, description, image };
}

export class UrlMeta {
  title: string;
  description: string;
  image: string;
}
