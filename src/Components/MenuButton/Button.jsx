import React from "react";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import "./style.css";
import MenuItem from "../MenuItem/MenuItem";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
  },
  paper: {
    position: "absolute",
    top: 36,
    right: 0,
    left: 0,
  },
}));

const MenuButton = (props) => {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const handleClick = () => {
    setOpen((prev) => !prev);
  };
  const handleClickAway = () => {
    setOpen(false);
  };
  return (
    <div
      className={classes.root + " menubuttonwrapper"}
      style={{ marginLeft: props.margin + "px" }}
    >
      <ClickAwayListener onClickAway={handleClickAway}>
        <div>
          <Button className="btn" onClick={handleClick}>
            {props.title}
          </Button>
          {open ? (
            <Paper className={classes.paper}>
              {props.dropDowns.map((item) => (
                <MenuItem
                  key={item.subItem}
                  subItem={item.subItem}
                  clickHandler={item.clickHandler}
                />
              ))}
            </Paper>
          ) : null}
        </div>
      </ClickAwayListener>
    </div>
  );
};
export default MenuButton;
