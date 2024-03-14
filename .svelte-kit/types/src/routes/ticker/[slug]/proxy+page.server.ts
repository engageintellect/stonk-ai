// @ts-nocheck
import { SERVER_ENDPOINT } from '$env/static/private';

import type { PageServerLoad } from './$types';

export const load = async ({ params }: any) => {
	const res = await fetch(`${SERVER_ENDPOINT}/api/stock/${params.slug}`);
	if (!res.ok) {
		throw new Error('Failed to fetch data from server');
	} else {
		const data = await res.json();
		return data;
	}
};
null as any as PageServerLoad;
