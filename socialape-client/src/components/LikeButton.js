import React, { useEffect, useContext } from "react";
import { likeScreams, unLikeScreams, checkToken } from "../hooks/Apihooks";
import { Link } from "react-router-dom";
import { MediaContext } from "../contexts/MediaContext";

//MUI STUFF
import Tooltip from "@material-ui/core/Tooltip";
import { makeStyles } from "@material-ui/core/styles";

//ICONS
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

const useStyles = makeStyles((theme) => ({
  liked: {
    color: "#33c9dc",
  },
  iconsConatainer: {
    display: "flex",
    margin: "0.5em",
  },
}));

const LikeButton = ({ file }) => {
  const [user, setUser] = useContext(MediaContext);

  const classes = useStyles();

  let authorized = false;
  let token = localStorage.getItem("FBIdToken");
  if (token != null) {
    authorized = true;
  }
  useEffect(() => {
    const checkUser = async () => {
      const userData = await checkToken(localStorage.getItem("FBIdToken"));
      await setUser(userData);
    };
    checkUser();
  }, [setUser]);

  const likedScream = (screamId) => {
    if (user !== null && file !== undefined) {
      if (user.likes && user.likes.find((like) => like.screamId === screamId)) {
        return true;
      } else {
        return false;
      }
    }
  };

  const likeScream = async () => {
    await likeScreams(file.screamId, localStorage.getItem("FBIdToken"));
  };
  const unLikeScream = async () => {
    await unLikeScreams(file.screamId, localStorage.getItem("FBIdToken"));
  };

  return (
    <>
      {file !== null && (
        <div className={classes.iconsConatainer}>
          {!authorized ? (
            <Link to="/login">
              <Tooltip title="Like">
                <FavoriteBorder color="primary" />
              </Tooltip>
            </Link>
          ) : likedScream(file.screamId) ? (
            <Tooltip title="Undo like" className={classes.liked}>
              <FavoriteIcon onClick={unLikeScream} />
            </Tooltip>
          ) : (
            <Tooltip title=" Like">
              <FavoriteBorder color="primary" onClick={likeScream} />
            </Tooltip>
          )}

          {file.likeCount}
        </div>
      )}
    </>
  );
};

export default LikeButton;
