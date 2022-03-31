export const LoginToken = {
  get: () => window.localStorage.getItem("login_token"),
  save: (token) => token && window.localStorage.setItem("login_token", token),
  delete: () => window.localStorage.removeItem("login_token"),
};

export default { LoginToken };
