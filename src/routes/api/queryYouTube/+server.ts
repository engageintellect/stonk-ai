import { YOUTUBE_API_KEY } from '$env/static/private';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	let maxResults = 10;
	let params = new URLSearchParams(url.search);

	const res = await fetch(
		`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${maxResults}&q='${params} stock news'&type=video&order=date&key=${YOUTUBE_API_KEY}`
		// `https://www.googleapis.com/youtube/v3/search?part=snippet&fields=items(id(videoId),snippet(title,thumbnails/high/url,publishTime))&q=${params}&type=video&key=${YOUTUBE_API_KEY}&maxResults=${maxResults}&order=date`
	);

	if (!res.ok) {
		throw new Error('Failed to fetch data from YouTube');
	} else {
		const data = await res.json();
		return new Response(JSON.stringify(data), {
			headers: { 'content-type': 'application/json' }
		});
	}
};
