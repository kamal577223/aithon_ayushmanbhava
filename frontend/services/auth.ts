export function setToken(token: string) {
  localStorage.setItem("token", token);
  document.cookie = `token=${token}; path=/; max-age=86400; samesite=lax`;
}

export function setUserRole(role: string) {
  localStorage.setItem("user_role", role);
  document.cookie = `user_role=${role}; path=/; max-age=86400; samesite=lax`;
}

export function getToken() {
  return localStorage.getItem("token");
}

export function clearToken() {
  localStorage.removeItem("token");
  localStorage.removeItem("user_role");
  document.cookie = "token=; path=/; max-age=0; samesite=lax";
  document.cookie = "user_role=; path=/; max-age=0; samesite=lax";
}
