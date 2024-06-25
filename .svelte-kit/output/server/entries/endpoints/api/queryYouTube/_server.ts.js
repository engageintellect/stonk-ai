import { Y as YOUTUBE_API_KEY } from "../../../../chunks/private.js";
const GET = async ({ url }) => {
  let maxResults = 10;
  let params = new URLSearchParams(url.search);
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${maxResults}&q='${params} stock news'&type=video&order=date&key=${YOUTUBE_API_KEY}`
    // `https://www.googleapis.com/youtube/v3/search?part=snippet&fields=items(id(videoId),snippet(title,thumbnails/high/url,publishTime))&q=${params}&type=video&key=${YOUTUBE_API_KEY}&maxResults=${maxResults}&order=date`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data from YouTube");
  } else {
    const data = await res.json();
    return new Response(JSON.stringify(data), {
      headers: { "content-type": "application/json" }
    });
  }
};
export {
  GET
};
