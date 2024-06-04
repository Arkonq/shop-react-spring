export const decodeJWT = (token: string) => {
  const parts = token.split(".");
  if (parts.length !== 3) {
    throw new Error("Invalid JWT token structure");
  }

  const [, payloadBase64] = parts;
  try {
    const binString = atob(payloadBase64.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(binString);
  } catch (error) {
    throw new Error("Invalid JWT token payload. Decoding failed");
  }
};
