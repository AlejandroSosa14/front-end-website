export const getRandomUnavailableDates = () => {
	const randomConsecutiveDates = [];
	const initialDate = new Date();

	const rangeInitialRandom = Math.floor(Math.random() * 30);
	initialDate.setDate(initialDate.getDate() + rangeInitialRandom);

	let beginningRandom = new Date(initialDate);

	for (let i = 0; i < 3; i++) {
		const año = beginningRandom.getFullYear();
		const mes = String(beginningRandom.getMonth() + 1).padStart(2, "0"); // Meses van de 0 a 11
		const dia = String(beginningRandom.getDate()).padStart(2, "0");
		randomConsecutiveDates.push(`${año}-${mes}-${dia}`);

		// Avanzar al día siguiente
		beginningRandom.setDate(beginningRandom.getDate() + 1);
	}

	return randomConsecutiveDates;
};
