import type { PageData } from './$types';

export const calculatePercentageChange = (previousValue: number, currentValue: number): number => {
	const difference = currentValue - previousValue;
	const percentageChange = (difference / Math.abs(previousValue)) * 100;
	return percentageChange;
};

export const prettifyDate = (dateString: string): string => {
	const date = new Date(dateString);
	const year = String(date.getFullYear()).slice(2);
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');
	const hours = String(date.getHours()).padStart(2, '0');
	const minutes = String(date.getMinutes()).padStart(2, '0');
	const seconds = String(date.getSeconds()).padStart(2, '0');

	return `${month}-${day}-${year} ${hours}:${minutes}:${seconds}`;
};

export const formatPercent = (number?: number): string => (number ? (number * 100).toFixed(2) : '');

export const formatPrice = (number?: number): string =>
	number ? number.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) : '';

export const camelCaseToRegular = (camelCaseString: string): string => {
	return camelCaseString
		.replace(/([a-z])([A-Z])/g, '$1 $2') // insert space between lowercase and uppercase letters
		.replace(/^./, function (str) {
			return str.toUpperCase();
		}); // capitalize the first letter
};

export const calculatePricePercentage = (high: number, low: number, currentPrice: number): {} => {
	if (high <= low || currentPrice < low || currentPrice > high) {
		throw new Error(
			'Invalid input. Ensure 52-week high is greater than 52-week low, and current price is within the range.'
		);
	}

	const priceRange = high - low;
	const priceAboveLow = currentPrice - low;
	const percentage = (priceAboveLow / priceRange) * 100;
	return {
		high: Number(high),
		low: Number(low),
		percentage: Number(percentage)
	};
};

export function generateTicker(data: PageData) {
	return {
		info: {
			symbol: data.ticker?.toUpperCase() ?? '',
			name: data.ticker_info?.shortName ?? '',
			currentPrice: formatPrice(data.ticker_info?.currentPrice),
			website: data.ticker_info?.website ?? '',
			city: data.ticker_info?.city ?? '',
			state: data.ticker_info?.state ?? '',
			employees: data.ticker_info?.fullTimeEmployees?.toLocaleString('en-US') ?? '',
			sector: data.ticker_info?.sectorDisp ?? ''
		},

		analysis: {
			recommendation: data.ticker_info?.recommendationKey?.toUpperCase() ?? '',
			debtToEquity: data.ticker_info?.debtToEquity ?? '',
			freeCashFlow: formatPrice(data.ticker_info?.freeCashflow),
			ebitda: formatPrice(data.ticker_info?.ebitda),
			shortFloat: formatPercent(data.ticker_info?.shortPercentOfFloata ?? 0),
			beta: data.ticker_info?.beta ?? '',
			trailingEps: formatPrice(data.ticker_info?.trailingEps),
			forwardEps: formatPrice(data.ticker_info?.forwardEps)
		},

		performance: {
			currentPrice: formatPrice(data.ticker_info?.currentPrice),
			yesterdaysClose: formatPrice(data.ticker_info?.previousClose),
			volume: formatPrice(data.ticker_info?.volume),
			open: formatPrice(data.ticker_info?.open),
			low: formatPrice(data.ticker_info?.dayLow),
			high: formatPrice(data.ticker_info?.dayHigh),
			fiftyTwoWeekHigh: formatPrice(data.ticker_info?.fiftyTwoWeekHigh),
			fiftyTwoWeekLow: formatPrice(data.ticker_info?.fiftyTwoWeekLow),
			fiftyTwoWeekRange: calculatePricePercentage(
				data.ticker_info?.fiftyTwoWeekHigh,
				data.ticker_info?.fiftyTwoWeekLow,
				data.ticker_info?.currentPrice
			)
		},

		financials: {
			marketCap: formatPrice(data.ticker_info?.marketCap),
			revenue: formatPrice(data.ticker_info?.revenue),
			grossProfit: formatPrice(data.ticker_info?.grossProfit),
			profitMargin: data.ticker_info?.profitMargins,
			operatingIncome: formatPrice(data.ticker_info?.operatingIncome),
			netIncome: formatPrice(data.ticker_info?.netIncome),
			totalAssets: formatPrice(data.ticker_info?.totalAssets),
			totalLiabilities: formatPrice(data.ticker_info?.totalLiab),
			totalDebt: formatPrice(data.ticker_info?.totalDebt),
			currentRatio: data.ticker_info?.currentRatio,
			quickRatio: data.ticker_info?.quickRatio,
			operatingCashFlow: formatPrice(data.ticker_info?.operatingCashflow),
			leveredFreeCashFlow: formatPrice(data.ticker_info?.leveredFreeCashflow),
			dividentYield: data.ticker_info?.dividendYield,
			payoutRatio: data.ticker_info?.payoutRatio,
			trailingPE: data.ticker_info?.trailingPE,
			forwardPE: data.ticker_info?.forwardPE,
			enterpriseValue: formatPrice(data.ticker_info?.enterpriseValue)
		},

		short: {
			floatShares: formatPrice(data.ticker_info?.floatShares),
			sharesOutstanding: formatPrice(data.ticker_info?.sharesOutstanding),
			sharesShort: formatPrice(data.ticker_info?.sharesShort),
			sharesShortPriorMonth: formatPrice(data.ticker_info?.sharesShortPriorMonth),
			// shortPercent: formatPercent(data.ticker_info?.shortPercentOfFloat) + '%',

			shortPercent:
				data.ticker_info?.shortPercentOfFloat !== null &&
				data.ticker_info?.shortPercentOfFloat !== undefined
					? formatPercent(data.ticker_info.shortPercentOfFloat) + '%'
					: undefined, // or '' depending on what you want for undefined cases

			shortRatio: data.ticker_info?.shortRatio
		}
	};
}
