import { getToken } from "./token";
import decode from "jwt-decode";

const getUserId = () => {
  const token = getToken();
  if (!token) {
    return;
  }
  const decoded = decode(token);
  return decoded["https://hasura.io/jwt/claims"]["x-hasura-user-id"];
};

export default getUserId;
