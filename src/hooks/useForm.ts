import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useForm = () => {
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  let navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput({
      ...input,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    pathname: string
  ) => {
    event.preventDefault();
    try {
      const data = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/${pathname}`,
        input
      );
      if (!!data.status) {
        return navigate("/");
      }
    } catch (error: any) {
      setIsError(true);
      setErrorMessage(error.response.data.message);
    }
  };

  return { handleInputChange, handleSubmit, input, isError, errorMessage };
};
