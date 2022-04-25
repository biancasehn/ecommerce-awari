import { useEffect } from "react";
import { BrowserRouter, Route, Routes as Switch } from "react-router-dom";
import { Home, Cart, Search, Details, Register, Login } from "./pages";
import { Layout } from "./components";
import { useUpdateCart } from "./hooks/useUpdateCart";

const Routes = () => {
  const { updateCart } = useUpdateCart();

  useEffect(() => {
    const initialLocalStorage = localStorage.getItem("items");
    if (!initialLocalStorage) return;
    updateCart(JSON.parse(initialLocalStorage));
  }, []);

  return (
    <div>
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
    </div>
  );
};

export default Routes;
