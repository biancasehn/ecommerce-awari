// import { useNavigate } from "react-router-dom";
import { useStore } from "../services/store";

export const useAuth = () => {
  const { setIsAuthed, setUserData } = useStore();
  // let navigate = useNavigate();

  const handleLogin = (user: any) => {
    setIsAuthed(true);
    setUserData(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const handleLogout = () => {
    setIsAuthed(false);
    setUserData({
      name: "",
      email: "",
      token: "",
      id: "",
    });
    localStorage.removeItem("user");
  };

  const verifyAuth = () => {};

  return {
    onLogin: handleLogin,
    onLogout: handleLogout,
    onProtectedPage: verifyAuth,
  };
};
