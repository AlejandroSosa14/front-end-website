export const getBestPrices = (prices, percent) => {
	if (prices.length === 0) return 0;
	const sortedPrices = [...prices].sort((a, b) => a - b);
	const q1Index = Math.floor(sortedPrices.length * percent);
	return sortedPrices[q1Index] || 0;
};
