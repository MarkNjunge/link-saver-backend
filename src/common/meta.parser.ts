const axios = require("axios").default;
const cheerio = require("cheerio");
const https = require("https");

export async function parse(url: string): Promise<UrlMeta> {
  const agent = new https.Agent({
    rejectUnauthorized: false,
  });

  const res = await axios.get(url, { httpsAgent: agent });
  const $ = cheerio.load(res.data);

  let title = $("head title").text();
  // Happens with pdfs
  if (!title) {
    const decodedUrl = decodeURI(url);
    const parts = decodedUrl.split("/");
    title = parts[parts.length - 1];
  }

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
