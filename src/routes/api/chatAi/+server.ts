import { json } from '@sveltejs/kit';
import { SERVER_ENDPOINT } from '$env/static/private';
import type { RequestHandler } from './$types';
export const POST: RequestHandler = async ({ request }) => {
	const { query } = await request.json();

	const res = await fetch(`${SERVER_ENDPOINT}/api/chat/`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			message: query
		})
	});

	if (!res.ok) {
		throw new Error('Failed to fetch data from OpenAI');
	} else {
		const data = await res.json();
		return json(data);
	}
};
