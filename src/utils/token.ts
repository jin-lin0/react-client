export const LoginToken = {
  get: () => window.sessionStorage.getItem("login_token"),
  save: (token) => token && window.sessionStorage.setItem("login_token", token),
  delete: () => window.sessionStorage.removeItem("login_token"),
};

export const FreshToken = {
  get: () => window.sessionStorage.getItem("fresh_token"),
  save: (value) => value && window.sessionStorage.setItem("fresh_token", value),
  delete: () => window.sessionStorage.removeItem("fresh_token"),
};

export default { LoginToken, FreshToken };
