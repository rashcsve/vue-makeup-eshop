const checkStorage = value => {
  if (localStorage.getItem(value)) {
    try {
      return JSON.parse(localStorage.getItem(value));
    } catch (e) {
      localStorage.removeItem(value);
      // throw e;
    }
  }
};

const saveToStorage = (key, value) =>
  localStorage.setItem(key, JSON.stringify(value));

export default { checkStorage, saveToStorage };
