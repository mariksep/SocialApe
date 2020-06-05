import { useState, useEffect } from "react";

const baseUrl = "https://europe-west1-socialapp-7ba20.cloudfunctions.net/api";

const useAllScreams = () => {
  const [data, setData] = useState([]);
  const fetchUrl = async () => {
    const response = await fetch(baseUrl + "/screams");
    const json = await response.json();
    const items = await Promise.all(
      json.map(async (item) => {
        return item;
      })
    );
    setData(items);
  };
  useEffect(() => {
    fetchUrl();
  }, []);
  return data;
};

const postScream = async (inputs, token) => {
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ["Authorization"]: token,
    },
    body: JSON.stringify(inputs),
  };
  try {
    const resp = await fetch(baseUrl + "/scream", fetchOptions);
    const json = await resp.json();

    console.log(json);
    // return json;
  } catch (e) {
    throw new Error(e.message);
  }
};

const deleteScream = async (screamId, token) => {
  const fetchOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ["Authorization"]: token,
    },
  };
  try {
    const resp = await fetch(baseUrl + `/scream/${screamId}`, fetchOptions);
    const json = await resp.json();
    if (!resp.ok) throw new Error(json.message + ":" + json.error);
    return json;
  } catch (e) {
    throw new Error(e.message);
  }
};

const login = async (inputs) => {
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(inputs),
  };
  try {
    const resp = await fetch(baseUrl + "/login", fetchOptions);
    const json = await resp.json();
    if (!resp.ok) throw new Error(json.message + ":" + json.error);
    return json;
  } catch (e) {
    throw new Error(e.message);
  }
};

const signup = async (inputs) => {
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(inputs),
  };
  try {
    const resp = await fetch(baseUrl + "/signup", fetchOptions);
    const json = await resp.json();
    if (!resp.ok) throw new Error(json.message + ":" + json.error);
    console.log(json);
    return json;
  } catch (e) {
    throw new Error(e.message);
  }
};
const logout = () => {
  localStorage.removeItem("FBIdToken");
  window.location.reload();
};

const checkToken = async (token) => {
  const fetchOptions = {
    headers: {
      ["Authorization"]: token,
    },
  };
  try {
    const response = await fetch(baseUrl + "/user", fetchOptions);
    const json = await response.json();
    return json;
  } catch (e) {
    throw new Error(e.message);
  }
};
const updateProfile = async (inputs, token) => {
  console.log(inputs);
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ["Authorization"]: token,
    },
    body: JSON.stringify(inputs),
  };
  try {
    const resp = await fetch(baseUrl + "/user", fetchOptions);
    const json = await resp.json();
    if (!resp.ok) throw new Error(json.message + ":" + json.error);
    console.log(json);
    // return json;
  } catch (e) {
    throw new Error(e.message);
  }
};

const uploadImage = async (image, token) => {
  const fetchOptions = {
    method: "POST",
    headers: {
      ["Authorization"]: token,
    },
    body: image,
  };

  try {
    const resp = await fetch(baseUrl + "/user/image", fetchOptions);
    const json = await resp.json();
    console.log(json);
    window.location.reload();
  } catch (e) {
    throw new Error(e.message);
  }
};

const likeScreams = async (screamId, token) => {
  const fetchOptions = {
    method: "GET",
    headers: {
      ["Authorization"]: token,
    },
  };

  try {
    const resp = await fetch(
      baseUrl + `/scream/${screamId}/like`,
      fetchOptions
    );
    const json = await resp.json();
    console.log(json);
    window.location.reload();
  } catch (e) {
    throw new Error(e.message);
  }
};
const unLikeScreams = async (screamId, token) => {
  const fetchOptions = {
    method: "GET",
    headers: {
      ["Authorization"]: token,
    },
  };

  try {
    const resp = await fetch(
      baseUrl + `/scream/${screamId}/unlike`,
      fetchOptions
    );
    const json = await resp.json();
    console.log(json);
    window.location.reload();
  } catch (e) {
    throw new Error(e.message);
  }
};

const postComment = async (screamId, token, inputs) => {
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ["Authorization"]: token,
    },
    body: JSON.stringify(inputs),
  };
  try {
    const resp = await fetch(
      baseUrl + `/scream/${screamId}/comment`,
      fetchOptions
    );
    const json = await resp.json();

    console.log(json);
  } catch (e) {
    throw new Error(e.message);
  }
};

const getComments = async (screamId) => {
  try {
    const resp = await fetch(baseUrl + `/scream/${screamId}`);
    const json = await resp.json();
    return json;
  } catch (e) {
    throw new Error(e.message);
  }
};

const getUserInformation = async (handle) => {
  try {
    const resp = await fetch(baseUrl + `/user/${handle}`);
    const json = await resp.json();
    return json;
  } catch (e) {
    throw new Error(e.message);
  }
};
const markNotificationsRead = async (notificationIds, token) => {
  console.log(notificationIds);
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ["Authorization"]: token,
    },
    body: JSON.stringify(notificationIds),
  };
  try {
    const resp = await fetch(baseUrl + "/notifications", fetchOptions);
    const json = await resp.json();
    console.log(json);
  } catch (e) {
    throw new Error(e.message);
  }
};

export {
  useAllScreams,
  login,
  signup,
  checkToken,
  uploadImage,
  logout,
  updateProfile,
  postScream,
  likeScreams,
  unLikeScreams,
  deleteScream,
  getComments,
  postComment,
  getUserInformation,
  markNotificationsRead,
};
