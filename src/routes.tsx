import { Box, Flex } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes as Switch } from "react-router-dom";
import { Home, Cart, Search } from "./pages";
import { Header, SearchBar } from "./components";

const Routes = () => {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Flex justify="center">
          <Box w="70vw">
            <SearchBar />
            <Switch>
              <Route path={"/"} element={<Home />} />
              <Route path={"/cart"} element={<Cart />} />
              <Route path={"/search/:pokeName"} element={<Search />} />
            </Switch>
          </Box>
        </Flex>
      </BrowserRouter>
    </div>
  );
};

export default Routes;
