export function formatMoney(number) {
  return number.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
}

export const totalProducts = (products) => {
  return products
    .map((item) => parseInt(item.quantity))
    .reduce((prev, curr) => prev + curr, 0);
};

export const getDataFromLocalStorage = (key) => {
  try {
    const persistedState = localStorage.getItem(key);
    if (persistedState) return JSON.parse(persistedState);
  } catch (e) {
    console.log(e);
  }
};
