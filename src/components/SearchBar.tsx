import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Input } from "@chakra-ui/react";

const SearchBar: React.FC<any> = () => {
  const [searchValue, setSearchValue] = useState("");
  let navigate = useNavigate();

  const goToSearch = (e: React.SyntheticEvent) => {
    e.preventDefault();
    navigate(`/search/${searchValue}`)
    setSearchValue('')
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
