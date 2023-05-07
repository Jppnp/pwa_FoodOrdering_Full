export function userLogin(userRole) {
  localStorage.setItem("Role", userRole);
}

export function isLogin() {
  if (localStorage.getItem("Token")) {
    return true
  } else {
    return false
  }
}

export function userLogout() {
    localStorage.removeItem("Token")
}