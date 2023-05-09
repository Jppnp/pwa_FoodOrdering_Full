export function userLogin(uid, userRole) {
  const user = {
    id: uid,
    role: userRole,
  };
  localStorage.setItem("userData", JSON.stringify(user));
}

export function isLogin() {
  if (localStorage.getItem("userData")) {
    return true;
  } else {
    return false;
  }
}

export function getRole() {
  if (isLogin()) {
    const datas = JSON.parse(localStorage.getItem("userData"));
    return datas.role;
  }
}

export function userLogout() {
  localStorage.removeItem("userData");
}
