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
  CheckoutSuccess,
} from "./pages";
import { Layout } from "./components";
import { useStore } from "./services/store";
import { useUpdateCart, useAuth } from "./hooks";

const Routes = () => {
  const { getInitialCart } = useUpdateCart();
  const { verifyUserAuth } = useAuth();
  const { displayPokemons, currentPage } = useStore();

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

  console.log("displayPokemons", displayPokemons);
  console.log("currentPage", currentPage);

  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path={"/"} element={<Layout />}>
            <Route index element={<Home />} />
            <Route path={"cart"} element={<Cart />} />
            <Route path={"search/:pokeName"} element={<Search />} />
            <Route path={"details/:pokeId"} element={<Details />} />
            <Route path={"register"} element={<Register />} />
            <Route path={"login"} element={<Login />} />
            <Route path={"checkout"} element={<Checkout />} />
            <Route path={"checkoutSuccess"} element={<CheckoutSuccess />} />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default Routes;
