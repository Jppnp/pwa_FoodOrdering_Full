import axios from "axios";

export const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});
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

export function merchantLogout() {
  localStorage.removeItem("userData");
  localStorage.removeItem("Restaurant");
}

export async function merchantLogin(uid, userRole, restaurant_location_id) {
  try {
    const locationResponse = await api.get(
      `/restaurant/locations/location/${restaurant_location_id}`
    );
    localStorage.setItem("restaurant", JSON.stringify(locationResponse.data));
    localStorage.setItem("userData", JSON.stringify({ id: uid, role: userRole }));
  } catch (error) {
    console.log("Error While merchant login ", error)
  }
}
