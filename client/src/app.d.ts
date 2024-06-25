// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
		// $types.ts
	}

	// $types.ts
	export interface PageData {
		ticker: string;
		info: {
			currentPrice: number;
			previousClose: number;
			dayHigh: number;
			shortName: string;
			website: string;
			city: string;
			state: string;
			fullTimeEmployees: number;
			sectorDisp: string;
			marketCap: number;
			volume: number;
			open: number;
			dayLow: number;
			recommendationKey: string;
			shortRatio: number;
			shortPercentOfFloat: number;
			longBusinessSummary: string;
		};
		prices: {
			date: string;
			price: number;
		}[];
	}
}

export {};
