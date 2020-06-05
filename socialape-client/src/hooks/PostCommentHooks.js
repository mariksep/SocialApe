import React, { useState } from "react";

const usePostCommentFrom = (callback) => {
  const [inputs, setInputs] = useState({
    body: "",
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
    inputs.body = "";
  };

  return {
    inputs,
    setInputs,
    handlesubmit,
    handleInputChange,
  };
};

export default usePostCommentFrom;
