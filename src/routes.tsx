import { useEffect } from "react";
import { BrowserRouter, Route, Routes as Switch } from "react-router-dom";
import { Home, Cart, Search, Details, Register, Login } from "./pages";
import { Layout } from "./components";
import { useUpdateCart, useAuth } from "./hooks";

const Routes = () => {
  const { getInitialCart } = useUpdateCart();
  const { onLogin } = useAuth();

  useEffect(() => {
    const initialCartItems = localStorage.getItem("items");
    initialCartItems && getInitialCart(JSON.parse(initialCartItems));

    const initialUser = localStorage.getItem("user");
    initialUser && onLogin(JSON.parse(initialUser));
  }, []);

  return (
    <>
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route path={"/"} element={<Home />} />
            <Route path={"/cart"} element={<Cart />} />
            <Route path={"/search/:pokeName"} element={<Search />} />
            <Route path={"/details/:pokeId"} element={<Details />} />
            <Route path={"/register"} element={<Register />} />
            <Route path={"/login"} element={<Login />} />
          </Switch>
        </Layout>
      </BrowserRouter>
    </>
  );
};

export default Routes;
