import { SERVER_ENDPOINT } from '$env/static/private';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	const ticker = url.searchParams.get('ticker');
	const date = url.searchParams.get('date');

	console.log('helleeeeeeeeeeeee')
	console.log('ticker:', ticker);
	console.log('date:', date);

	const res = await fetch(`${SERVER_ENDPOINT}/api/options/${ticker}${date}`);
	const data = await res.json();
	if (!res.ok) {
		throw new Error(data.message);
	} else {
		return new Response(JSON.stringify(data), {
			headers: { 'content-type': 'application/json' }
		});
	}
};

