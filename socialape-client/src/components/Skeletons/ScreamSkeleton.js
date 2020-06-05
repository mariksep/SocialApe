import React from "react";
import NoImg from "./no-img.png";
import { makeStyles } from "@material-ui/core/styles";

// MUI
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles((theme) => ({
  card: {
    display: "flex",
    marginBottom: 20,
  },
  cover: {
    minWidth: 200,
    objectFit: "cover",
  },
  handle: {
    height: 20,
    backgroundColor: theme.palette.primary.main,
    width: 60,
    margin: "0 auto 7px auto",
  },
  date: {
    height: 14,
    width: 100,
    backgroundColor: "rgba(0,0,0, 0.3)",
    marginBottom: 10,
  },
  fullLine: {
    height: 15,
    backgroundColor: "rgba(0,0,0,0.6)",
    width: "100%",
    marginBottom: 10,
  },
  halfLine: {
    height: 15,
    width: "50%",
    backgroundColor: "rgba(0,0,0, 0.6)",
    marginBottom: 10,
  },
}));

const ScreamSkeleton = () => {
  const classes = useStyles();

  return Array.from({ length: 5 }).map((item, index) => (
    <Card key={index} className={classes.card}>
      <CardMedia className={classes.cover} image={NoImg} />
      <CardContent>
        <div className={classes.handle} />
        <div className={classes.date} />
        <div className={classes.fullLine} />
        <div className={classes.fullLine} />
        <div className={classes.halfLine} />
      </CardContent>
    </Card>
  ));
};

export default ScreamSkeleton;
