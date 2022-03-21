import { BrowserRouter, Route, Routes as Switch } from "react-router-dom";
import { Home, Cart, Search, Details } from "./pages";
import { Layout } from "./components";

const Routes = () => {
  return (
    <div>
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route path={"/"} element={<Home />} />
            <Route path={"/cart"} element={<Cart />} />
            <Route path={"/search/:pokeName"} element={<Search />} />
            <Route path={"/details/:pokeId"} element={<Details />} />
          </Switch>
        </Layout>
      </BrowserRouter>
    </div>
  );
};

export default Routes;
