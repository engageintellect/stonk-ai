import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const res = await fetch(`http://45.56.88.245:8000/api/stock/${params.slug}`);
	const data = await res.json();
	return data;
};
