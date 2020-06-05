/* eslint-disable react/jsx-no-undef */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useContext, useEffect } from "react";
import dayjs from "dayjs";
import { uploadImage, logout, checkToken } from "../hooks/Apihooks";
import EditDetails from "./EditDetails";
import { MediaContext } from "../contexts/MediaContext";
import ProfileSkeleton from "./Skeletons/ProfileSkeleton";

//MUI
import { Link } from "react-router-dom";
import { Typography, Button } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import MuiLink from "@material-ui/core/Link";
import Tooltip from "@material-ui/core/Tooltip";
import { makeStyles } from "@material-ui/core/styles";
// Icons
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";
import EditIcon from "@material-ui/icons/Edit";
import KeyboardReturn from "@material-ui/icons/KeyboardReturn";

const useStyles = makeStyles((theme) => ({
  profile: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    objectFit: "cover",
    maxWidth: "100%",
    borderRadius: "50%",
  },
}));

const Profile = () => {
  const [user, setUser] = useContext(MediaContext);

  const classes = useStyles();
  useEffect(() => {
    const checkUser = async () => {
      const userData = await checkToken(localStorage.getItem("FBIdToken"));
      await setUser(userData);
    };
    checkUser();
  }, [setUser]);

  let token = localStorage.getItem("FBIdToken");

  const handleImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    console.log(image, image.name);

    formData.append("image", image, image.name);

    uploadImage(formData, token);
  };
  const handleEditPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };

  return (
    <>
      {user.userInfo && (
        <Paper className={classes.profile}>
          <img
            src={user.userInfo.imageUrl}
            alt="profile"
            className={classes.image}
          />

          <input
            hidden="hidden"
            type="file"
            id="imageInput"
            onChange={handleImageChange}
          />
          <Tooltip title="Edit profile picture">
            <EditIcon color="primary" onClick={handleEditPicture} />
          </Tooltip>

          <div>
            {user.userInfo.handle && (
              <MuiLink
                component={Link}
                to={`/users/${user.userInfo.handle}`}
                color="primary"
                variant="h5"
              >
                @{user.userInfo.handle}
              </MuiLink>
            )}
            <hr />
            {user.userInfo.bio && (
              <>
                <Typography variant="body2">{user.userInfo.bio}</Typography>
                <hr />
              </>
            )}
            {user.userInfo.location && (
              <>
                <LocationOn color="primary" />
                <span>{user.userInfo.location}</span>

                <hr />
              </>
            )}
            {user.userInfo.website && (
              <>
                <LinkIcon color="primary" />
                <a
                  href={user.userInfo.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {user.userInfo.website}
                </a>
                <hr />
              </>
            )}
            <CalendarToday color="primary" />{" "}
            <span>
              Joined {dayjs(user.userInfo.created).format("MMM YYYY")}
            </span>
            <EditDetails user={user} />
          </div>
          <Button onClick={logout}>
            <KeyboardReturn color="primary" />
          </Button>
        </Paper>
      )}
    </>
  );
};

export default Profile;
