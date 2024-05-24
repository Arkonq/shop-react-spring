export const formDataToObject = (data: FormData) => {
  const object: any = {};
  data.forEach(function (value, key) {
    object[key] = String(value);
  });
  return object;
};
