export async function GET() {
	const res = await fetch(`http://localhost:8000/api/predict/pltr`);
	const data = await res.json();
	return new Response(JSON.stringify(data), {
		headers: { 'content-type': 'application/json' }
	});
}
