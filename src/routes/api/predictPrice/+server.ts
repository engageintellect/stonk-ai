import { SERVER_ENDPOINT } from '$env/static/private';

export async function GET() {
	const res = await fetch(`${SERVER_ENDPOINT}/api/predict/pltr`);
	const data = await res.json();
	return new Response(JSON.stringify(data), {
		headers: { 'content-type': 'application/json' }
	});
}
