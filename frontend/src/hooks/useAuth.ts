import Cookies from "js-cookie";

export const useAuth = () => {
  const token = Cookies.get("token");
  return { isAuthenticated: !!token };
};