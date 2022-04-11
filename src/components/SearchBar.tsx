import { useEffect, useState } from "react";
import { Box, Flex, Input } from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";

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
    <Flex p="16px" position="relative" alignItems="center">
      <form onSubmit={goToSearch} style={{ width: "100%" }}>
        <Input
          paddingLeft="50px"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search"
        />
      </form>
      <Box position="absolute" left="30px" color="gray">
        <AiOutlineSearch size="20px" />
      </Box>
    </Flex>
  );
};

export default SearchBar;
