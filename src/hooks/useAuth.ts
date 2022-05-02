import axios from "axios";
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
      accessToken: "",
      id: "",
    });
    localStorage.removeItem("user");
  };

  const verifyUserAuth = async () => {
    const initialUser = localStorage.getItem("user");
    if (!initialUser) {
      throw "User not authenticated";
    }
    const initialUserParsed = JSON.parse(initialUser);
    const config = {
      headers: { Authorization: `Bearer ${initialUserParsed.accessToken}` },
    };
    try {
      const user = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/`,
        config
      );
      handleLogin(initialUserParsed);
      return user;
    } catch (error: any) {
      handleLogout();
      throw error.message;
    }
  };

  return {
    onLogin: handleLogin,
    onLogout: handleLogout,
    verifyUserAuth,
  };
};
