export const LoginToken = {
  get: () => window.sessionStorage.getItem("login_token"),
  save: (token) => token && window.sessionStorage.setItem("login_token", token),
  delete: () => window.sessionStorage.removeItem("login_token"),
};

export default { LoginToken };
