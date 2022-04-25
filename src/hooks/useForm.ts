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
      const response = await fetch(`http://localhost:3001/auth/${pathname}`, {
        method: "POST",
        body: JSON.stringify(input),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.status === true) {
        return navigate("/");
      }
      setIsError(true);
      setErrorMessage(data.message);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return { handleInputChange, handleSubmit, input, isError, errorMessage };
};
