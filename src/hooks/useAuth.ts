import { useNavigate } from "react-router-dom";
// Redux
import {
  auth_end,
  auth_error,
  auth_logginIn,
  auth_logout,
  auth_started,
  auth_success,
} from "../slices/auth";
// Hooks
import { useAppDispatch } from "../store/hooks";
// Services
import { getCurrentUser, getToken, refreshToken } from "../services/auth";
// Types
import { RegularErrorType } from "../types/error";

function useAuth() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  async function login(code: string, code_verifier: string) {
    dispatch(auth_logginIn());

    try {
      const tokenData = await getToken(code, code_verifier);
      const currentUser = await getCurrentUser(tokenData.access_token);

      if (currentUser.product === "premium") {
        dispatch(auth_success(currentUser));
        navigate("/", { replace: true });

        localStorage.setItem(
          "access_token",
          JSON.stringify({
            token: tokenData.access_token,
            expires_at: tokenData.expires_in * 1000 + Date.now(),
          })
        );
        localStorage.setItem("refresh_token", tokenData.refresh_token);
      } else {
        dispatch(auth_error("This site requires a premium account"));
      }

      sessionStorage.removeItem("state");
      sessionStorage.removeItem("code_verifier");
    } catch (error) {
      dispatch(auth_error((error as RegularErrorType).error_description));
    }
  }

  async function load() {
    dispatch(auth_started());
    const localRefreshToken = localStorage.getItem("refresh_token");

    if (localRefreshToken) {
      try {
        const tokenData = await refreshToken(localRefreshToken);
        const currentUser = await getCurrentUser(tokenData.access_token);

        if (currentUser.product === "premium") {
          dispatch(auth_success(currentUser));

          localStorage.setItem(
            "access_token",
            JSON.stringify({
              token: tokenData.access_token,
              expires_at: tokenData.expires_in * 1000 + Date.now(),
            })
          );
          localStorage.setItem("refresh_token", tokenData.refresh_token);
        } else {
          logout();
        }
      } catch (error) {
        logout();
      }
    }

    dispatch(auth_end());
  }

  function checkRefreshTokenInStorage(): boolean {
    const localRefreshToken = localStorage.getItem("refresh_token");

    if (localRefreshToken) {
      return true;
    } else {
      return false;
    }
  }

  function logout() {
    dispatch(auth_logout());
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("access_token");

    navigate("/login", { replace: true });
  }

  return { checkRefreshTokenInStorage, login, logout, load };
}

export default useAuth;
