import { useState } from "react";

const useProfileImage = (callback) => {
  const [inputsPic, setInputsPic] = useState({
    image: null,
  });
  const handleSubmitPicture = (event) => {
    if (event) {
      event.preventDefault();
    }
    callback();
  };

  const handleFileChangePicture = (event) => {
    event.persist();
    setInputsPic((inputsPic) => {
      console.log(event.target.files);
      return {
        ...inputsPic,
        image: event.target.files[0],
      };
    });
  };

  return {
    handleSubmitPicture,
    handleFileChangePicture,
    inputsPic,
  };
};

export default useProfileImage;
