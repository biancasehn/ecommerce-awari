import { useStore } from "../services/store";
import { User } from "../types";

export const useAuth = () => {
  const { setIsAuthed, setUserData } = useStore();

  const handleLogin = (user: User) => {
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
