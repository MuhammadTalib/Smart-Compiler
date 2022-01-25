import React, { Component } from "react";
import "./style.css";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

import { connect } from "react-redux";
import FileTab from "./../FileTab/FileTab";
import { edit_file } from "./../../Redux/File/action";

class Editor extends Component {
  state = {
    lines: 10,
    start: 0,
    text: "#include <stdio.h>\nint main(){\n}",
    indent: 0,
  };
  onLineChanged = (e) => {
    document.getElementById("textarea");
    var key = e.which ? e.which : e.keyCode;
    if (key === 13) {
      var lineNo = e.target.value
        .substr(0, e.target.selectionStart)
        .split(/\r?\n|\r/).length;
      if (lineNo >= this.state.lines) {
        this.setState({ lines: lineNo + 1 });
      }
      // var t=this.state.text
      // t+="\n"
      // for(var i=0;i<this.state.indent;i++){
      //     t+="    "
      //     this.props.editFile(t)
      //     this.setState({text:t})
      // }
    }
  };
  checkName = (e) => {
    if (e.target.value === "s") {
      e.target.style.color = "#ff0";
    }
  };
  render() {
    var rows = [];
    for (var i = this.state.start; i < this.state.lines; i++) {
      rows.push(
        <div key={i} style={{ marginTop: "0px", marginRight: "5px" }}>
          {i}
        </div>
      );
      if (rows.length > 35) {
        this.setState({ start: this.state.start + 1 });
        rows = [];
        continue;
      }
    }
    return (
      <div className="mainwrapper">
        <FileTab />
        <div className="numberColumn" align="right">
          {rows}
        </div>
        <TextareaAutosize
          name="query_field_one"
          id="textarea"
          spellCheck="false"
          onClick={(event) => this.onLineChanged(event)}
          onKeyPress={(event) => this.onLineChanged(event)}
          onKeyUp={this.checkName}
          className="texteditor"
          rowsMax={10}
          onChange={(e) => {
            this.setState({ text: e.target.value });
            this.props.editFile(e.target.value);
          }}
          value={this.props.selectedFile.text}
        ></TextareaAutosize>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    selectedFile: state.files.selectedFile,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    editFile: (text) => dispatch(edit_file(text)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Editor);
