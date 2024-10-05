export const generateObjectId = () => {
  const timestamp = Math.floor(new Date().getTime()).toString(); // Millisecond precision timestamp
  const random = Math.floor(Math.random() * 1e12).toString().padStart(12, '0'); // 12 random digits for extra uniqueness
  const numericId = timestamp + random; // Concatenate timestamp and random digits
  return numericId;
}