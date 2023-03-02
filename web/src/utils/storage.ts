const storage = localStorage || window.localStorage;

export const setToken = (token: string) => {
  storage.setItem("token", token);
};

export const getToken = () => {
  return storage.getItem("token") || null;
};

export const clearToken = () => {
  storage.removeItem("token");
};
