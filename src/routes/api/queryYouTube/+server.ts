import { YOUTUBE_API_KEY } from '$env/static/private';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	let API_KEY = YOUTUBE_API_KEY;
	let maxResults = 10;
	let params = new URLSearchParams(url.search);

	const res = await fetch(
		`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${maxResults}&q=${params.ticker}&type=video&order=date&key=${API_KEY}`
	);

	const data = await res.json();
	return new Response(JSON.stringify(data), {
		headers: { 'content-type': 'application/json' }
	});
};
