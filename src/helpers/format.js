export const formatPrice = (price) =>
  `R$ ${price.toFixed(2).replace('.', ',')}`;
export const formatTitle = (title) => title.slice(0, 15) + '...';
export const formatDescription = (description) =>
  description.slice(0, 40) + '...';