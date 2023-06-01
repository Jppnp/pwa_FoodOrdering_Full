import { HandymanOutlined } from "@mui/icons-material";
import axios from "axios";

export const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});
export function userLogin(uid, fname, lname, userRole) {
  const user = {
    id: uid,
    fname: fname,
    lname: lname,
    role: userRole,
  };
  localStorage.setItem("userData", JSON.stringify(user));
}

export function adminLogin() {
  localStorage.setItem("userData", JSON.stringify({ role: "admin" }));
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
  localStorage.removeItem("restaurant");
}

export async function merchantLogin(uid, userRole, restaurant_location_id) {
  try {
    const locationResponse = await api.get(
      `/restaurant/locations/location/${restaurant_location_id}`
    );
    localStorage.setItem("restaurant", JSON.stringify(locationResponse.data));
    localStorage.setItem(
      "userData",
      JSON.stringify({ id: uid, role: userRole })
    );
  } catch (error) {
    console.log("Error While merchant login ", error);
  }
}

export function getCustomerInfo() {
  const customer = JSON.parse(localStorage.getItem("userData"));
  return customer;
}

export async function pushOfflineRequest(path, method, data) {
  try {
    const offlineRequest = {
      path,
      method,
      data,
    };
    const storedRequests =
      JSON.parse(localStorage.getItem("offlineRequests")) || [];
    storedRequests.push(offlineRequest);
    localStorage.setItem("offlineRequests", JSON.stringify(storedRequests));
  } catch {
    (err) => {
      console.log(`cannot auto syncronize: ${err}`);
    };
  }
}

export function isOnline() {
  if(navigator.onLine){
    return true
  }else {
    return false
  }
}
