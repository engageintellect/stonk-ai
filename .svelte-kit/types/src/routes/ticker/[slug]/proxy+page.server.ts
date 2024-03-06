// @ts-nocheck
import type { PageServerLoad } from './$types';

export const load = async ({ params }: any) => {
	const res = await fetch(`http://localhost:8000/api/stock/${params.slug}`);
	const data = await res.json();
	return data;
};
;null as any as PageServerLoad;