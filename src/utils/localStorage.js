export const getFavorites = () => JSON.parse(localStorage.getItem("favorites")) || [];
export const saveFavorites = (movies) => localStorage.setItem("favorites", JSON.stringify(movies));
