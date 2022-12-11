export const formatCurrency = (currency) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(currency);
};

export const removeZeroElementsFromObject = (item) =>
  Object.keys(item)
    .filter((key) => item[key] !== 0)
    .reduce((newObj, key) => Object.assign(newObj, { [key]: item[key] }), {});
