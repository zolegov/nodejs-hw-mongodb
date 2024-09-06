const parseContactType = (type) => {
  const isString = typeof type === 'string';
  if (!isString) return;
  const isType = (type) => ['work', 'home', 'personal'].includes(type);
  if (isType(type)) return type;
};
const parseContactIsFavorite = (value) => {
  const isString = typeof value === 'string';
  if (!isString) return;

  if (value === 'true') return true;
  if (value === 'false') return false;
};
// const parseContactIsFavorite = (value) => {
//   if (typeof value !== 'string') return undefined;
//   if (value === 'true') return true;
//   if (value === 'false') return false;
//   return undefined;
// };

export const parseFilterParams = (query) => {
  const { type, isFavourite } = query;
  const parsedType = parseContactType(type);
  const parsedIsFavorite = parseContactIsFavorite(isFavourite);

  return {
    contactType: parsedType,
    isFavourite: parsedIsFavorite,
  };
};
