import { useState } from "react";

const useProfileFrom = (callback) => {
  const [inputs, setInputs] = useState({
    bio: "",
    website: "",
    location: "",
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
    setInputs,
  };
};
export default useProfileFrom;
