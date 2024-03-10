import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
export const POST: RequestHandler = async ({ request }) => {
	const { query } = await request.json();
	console.log('query', query);

	const res = await fetch('https://engage-dev.com:8000/api/chat/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			message: query
		})
	});

	const data = await res.json();
	console.log('response', data);
	return json(data);
};
