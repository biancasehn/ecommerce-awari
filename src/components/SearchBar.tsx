import { useState } from "react";
import { Box, Input } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const SearchBar: React.FC<any> = () => {
  const [searchValue, setSearchValue] = useState("");
  let navigate = useNavigate();

  const goToSearch = (e: React.SyntheticEvent) => {
    e.preventDefault();
    navigate(`/search/${searchValue}`)
  }

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
}

export default SearchBar;
