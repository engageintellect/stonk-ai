import { SERVER_ENDPOINT } from '$env/static/private';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {

	const res = await fetch(`${SERVER_ENDPOINT}/api/interestRates/`);
	const data = await res.json();
	if (!res.ok) {
		throw new Error(data.message);
	} else {
		return new Response(JSON.stringify(data), {
			headers: { 'content-type': 'application/json' }
		});
	}
};
