export const DateFormat = (val) => {
  const date = new Date(val).toString().split(" ");
  return `${date[1]} ${date[3]}`;
};
