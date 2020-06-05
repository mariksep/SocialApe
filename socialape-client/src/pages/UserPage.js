import React, { PropTypes, useState, useEffect } from "react";
import { getUserInformation } from "../hooks/Apihooks";
import ProfileSkeleton from "../components/Skeletons/ProfileSkeleton";
import ScreamSkeleton from "../components/Skeletons/ScreamSkeleton";

import Scream from "../components/Scream";
import Profile from "../components/Profile";
import { MediaContext } from "../contexts/MediaContext";
import StaticProfile from "../components/StaticProfile";
import Grid from "@material-ui/core/Grid";

const UserPage = ({ match }) => {
  const [info, setInfo] = useState();

  const handle = match.params.handle;

  useEffect(() => {
    const User = async () => {
      const data = await getUserInformation(handle);
      setInfo(data);
    };
    User();
  }, [setInfo]);

  return (
    <Grid container spacing={10}>
      <Grid item sm={8} xs={12}>
        {info === undefined ? (
          <ScreamSkeleton></ScreamSkeleton>
        ) : (
          info.screams.map((dataInfo) => (
            <Scream key={info.user.userId} file={dataInfo} user={info.user} />
          ))
        )}
      </Grid>
      <Grid item sm={4} xs={12}>
        {info === undefined ? (
          <ProfileSkeleton />
        ) : (
          <StaticProfile user={info.user} />
        )}
      </Grid>
    </Grid>
  );
};

export default UserPage;
