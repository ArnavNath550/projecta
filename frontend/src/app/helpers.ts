export const generateObjectId = () => {
  const timestamp = Math.floor(new Date().getTime() / 1000).toString(16);
  const random = 'xxxxxxxx'.replace(/[x]/g, () =>
    ((Math.random() * 16) | 0).toString(16)
  ).toLowerCase();
  const objectId = timestamp + random + '000000000000'.substr(0, 8);
  return objectId;
}