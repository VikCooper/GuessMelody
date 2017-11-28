export const getHash = (hash) => {
  const hashEnd = hash.indexOf(`=`);

  return hash.slice(1, hashEnd === -1 ? hash.length : hashEnd);
};

export const getHashObject = (hash) => {
  const hashEnd = hash.indexOf(`=`);
  const object = hashEnd === -1 ? `{}` : hash.slice(hashEnd + 1, hash.length);
  const decode = decodeURIComponent(object);

  return JSON.parse(decode);
};
