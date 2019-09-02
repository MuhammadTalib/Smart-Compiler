import React, { Component } from 'react';
import "./style.css"
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

class Editor extends Component {
    state = { lines:10,start:0 }
    onLineChanged=(e)=>{
        var key=(e.which) ? e.which : e.keyCode
        console.log(key)
        if(key===13){
            var lineNo = e.target.value.substr(0, e.target.selectionStart).split(/\r?\n|\r/).length;
            // var lineText = e.target.value.split(/\r?\n|\r/)[lineNo - 1];
            // var numOfSpaces = lineText.split(/\s/).length - 1;
            if(lineNo>=this.state.lines){
                this.setState({lines:lineNo+1})
            }
        }
    }
    render() { 
        var rows = [];
        for (var i = this.state.start; i < this.state.lines; i++) {
            rows.push(<div key={i} style={{marginTop:"0px",marginRight:"5px"}}>{i}</div>);
            if(rows.length>35){
                this.setState({start:this.state.start+1});
                rows=[]
                continue;
            }
            
        }
        return ( <div className="mainwrapper">
            <div className="numberColumn" align="right">{rows}</div>
            <TextareaAutosize
                onClick={(event)=>this.onLineChanged(event)}
                onKeyPress={(event)=>this.onLineChanged(event)}
                onMouseUp={(e)=>{console.log(e)}}
                className="texteditor"
                rowsMax={10}
                defaultValue="#include <stdio.h>
                int main(){
                
                }"/>
            <div className="errorwrapper">
                {Error}
            </div>
             
        </div>);
    }
}
 
export default Editor;