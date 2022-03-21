import { useEffect, useState } from "react";
import { Box, Input } from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";

const SearchBar: React.FC<any> = () => {
  const [searchValue, setSearchValue] = useState("");
  let navigate = useNavigate();
  const { pathname } = useLocation();

  const goToSearch = (event: React.SyntheticEvent) => {
    event.preventDefault();
    navigate(`/search/${searchValue}`);
  };

  useEffect(() => {
    !pathname.includes("/search") && setSearchValue("");
  }, [pathname]);

  return (
    <Box p={4}>
      <form onSubmit={goToSearch}>
        <Input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search"
          size="md"
          _focus={{ boxShadow: "none" }}
        />
      </form>
    </Box>
  );
};

export default SearchBar;
