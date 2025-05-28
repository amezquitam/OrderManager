// authProvider.js
export default {
  login: ({ username, password }) => {
    if (username === "admin" && password === "admin") {
      localStorage.setItem("auth", btoa(`${username}:${password}`));
      return Promise.resolve();
    }
    return Promise.reject("Invalid credentials");
  },
  logout: () => {
    localStorage.removeItem("auth");
    return Promise.resolve();
  },
  checkAuth: () =>
    localStorage.getItem("auth") ? Promise.resolve() : Promise.reject(),
  checkError: () => Promise.resolve(),
  getPermissions: () => Promise.resolve(),
};
