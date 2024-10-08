export const FormatPrice = (decimalValue) => {
	// Converte para floa e formata
	return parseFloat(decimalValue.toString()).toFixed(2);
};
