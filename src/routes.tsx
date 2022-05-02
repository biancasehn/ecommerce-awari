import { useEffect } from "react";
import { BrowserRouter, Route, Routes as Switch } from "react-router-dom";
import {
  Home,
  Cart,
  Search,
  Details,
  Register,
  Login,
  Checkout,
} from "./pages";
import { Layout } from "./components";
import { useUpdateCart, useAuth } from "./hooks";

const Routes = () => {
  const { getInitialCart } = useUpdateCart();
  const { verifyUserAuth } = useAuth();

  useEffect(() => {
    const initialCartItems = localStorage.getItem("items");
    initialCartItems && getInitialCart(JSON.parse(initialCartItems));

    const isVerified = async () => {
      try {
        await verifyUserAuth();
      } catch (error) {
        console.log(error);
        return;
      }
    };

    isVerified();
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
            <Route path={"/checkout"} element={<Checkout />} />
          </Switch>
        </Layout>
      </BrowserRouter>
    </>
  );
};

export default Routes;
