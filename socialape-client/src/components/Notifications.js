/* eslint-disable no-unused-expressions */
import React, { useState } from "react";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import relativeTime from "dayjs/plugin/relativeTime";
import { markNotificationsRead } from "../hooks/Apihooks";

// MUI stuff
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";

// Icons
import NotificationsIcon from "@material-ui/icons/Notifications";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatIcon from "@material-ui/icons/Chat";

const Notifications = ({ file }) => {
  dayjs.extend(relativeTime);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = useState(false);

  const handleClickOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const onMenuOpen = () => {
    let unreadNotificationsIds = [];
    const list = file.filter((not) => not.read === false);
    list.map((not) => unreadNotificationsIds.push(not.notificationId));

    markNotificationsRead(
      unreadNotificationsIds,
      localStorage.getItem("FBIdToken")
    );
  };

  return (
    <>
      <>
        {file.filter((not) => not.read === false).length > 0 ? (
          <>
            <>
              <Tooltip title="Notifications">
                <IconButton onClick={handleClickOpen}>
                  <Badge
                    badgeContent={
                      file.filter((not) => not.read === false).length
                    }
                    color="secondary"
                  >
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
            </>
          </>
        ) : (
          <>
            <NotificationsIcon />
          </>
        )}
      </>

      <>
        <Menu
          keepMounted
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleClose}
          onEntered={onMenuOpen}
        >
          {file.length > 0 ? (
            <div>
              {file &&
                file.map((not) => {
                  return (
                    <MenuItem key={not.notificationId}>
                      <Typography
                        component={Link}
                        variant="body1"
                        to={`/users/${not.recipient}/scream/${not.screamId}`}
                      >
                        {not.type === "like" ? (
                          <FavoriteIcon
                            color="primary"
                            style={{ marginRight: 10 }}
                          />
                        ) : (
                          <ChatIcon
                            color="primary"
                            style={{ marginRight: 10 }}
                          />
                        )}
                        {not.sender}{" "}
                        {not.type === "like" ? "liked" : "commented on"} your
                        scream {dayjs(not.created).fromNow()}
                      </Typography>
                    </MenuItem>
                  );
                })}
            </div>
          ) : (
            <>
              <MenuItem>You have no notifications yet</MenuItem>
            </>
          )}
        </Menu>
      </>
    </>
  );
};

export default Notifications;
