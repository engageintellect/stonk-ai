import { SERVER_ENDPOINT } from '$env/static/private';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }: any) => {
	const res = await fetch(`${SERVER_ENDPOINT}/api/stock/${params.slug}`);
	const data = await res.json();
	return data;
};
