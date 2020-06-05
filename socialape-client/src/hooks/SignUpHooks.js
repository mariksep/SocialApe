import { useState } from "react";

const useSignUpForm = (callback) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    handle: "",
  });

  const handlesubmit = (event) => {
    if (event) {
      event.preventDefault();
    }
    callback();
  };

  const handleInputChange = (event) => {
    event.persist();
    setInputs((inputs) => {
      return {
        ...inputs,
        [event.target.name]: event.target.value,
      };
    });
  };

  return {
    handlesubmit,
    handleInputChange,
    inputs,
  };
};

export default useSignUpForm;
