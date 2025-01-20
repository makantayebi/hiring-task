// utils/globalFunctions.ts
import { useNavigate } from "react-router-dom";

const twentyFourHoursInMillis: number = 24 * 3600 * 1000;

export const isLoggedIn = (): boolean => {
  var currentMillis: number = Date.now();
  try {
    var epochMillis: string = localStorage.getItem(
      "jwtTokenTimestampMillis"
    ) as string;
    return (
      parseInt(epochMillis, 10) + twentyFourHoursInMillis > currentMillis &&
      localStorage.getItem("username") !== undefined &&
      localStorage.getItem("jwtToken") !== undefined &&
      localStorage.getItem("username") !== null &&
      localStorage.getItem("jwtToken") !== null
    );
  } catch (err) {
    console.log("following error happened: " + JSON.stringify(err));
    return false;
  }
};

export const login = (
  username: string,
  jwtToken: string,
  isAdmin: string
): void => {
  localStorage.setItem("jwtToken", jwtToken);
  localStorage.setItem("jwtTokenTimestampMillis", "" + Date.now());
  localStorage.setItem("username", username);
  localStorage.setItem("isAdmin", isAdmin);
};

export const logout = (): void => {
  localStorage.removeItem("jwtToken");
  localStorage.removeItem("jwtTokenTimestampMillis");
  localStorage.removeItem("username");
  localStorage.removeItem("isAdmin");
  const navigate = useNavigate();
  navigate("/login");
};

export const isAdmin = (): boolean => {
  return localStorage.getItem("isAdmin") === "true";
};
