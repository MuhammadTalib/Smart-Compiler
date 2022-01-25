import React from "react";
import "./style.css";
import Button from "@material-ui/core/Button";
const MenuItem = (props) => {
  return (
    <div className="menuitem">
      <Button className="subbtn" onClick={() => props.clickHandler()}>
        <div>{props.subItem}</div>
        {props.subItem === "Open File" && (
          <input
            type="file"
            id="inputfile"
            onChange={(e) => {
              console.log("data", e.target.files);
            }}
            style={{ display: "none" }}
          />
        )}
      </Button>
    </div>
  );
};

export default MenuItem;
