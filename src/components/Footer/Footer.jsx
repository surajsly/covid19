import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import styles from "./Footer.module.css";
import cx from "classnames";

const useStyles = makeStyles((theme) => ({
  footer: {
    // marginTop: theme.spacing(8),
    padding: theme.spacing(6, 0),
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={cx(styles.bottom, classes.footer)}>
      <h3 className={styles.heading}>Handcrafted by:</h3>
      <Typography
        variant="subtitle1"
        align="center"
        color="#fffff"
        component="p"
      >
        <a href="https://github.com/surajsly">Suraj Singh</a>{" "}
        <a href="https://github.com/surajsly">and</a>{" "}
        <a href="https://github.com/HimanshuGawri"> Himanshu</a>
      </Typography>
    </footer>
  );
};

export default Footer;
