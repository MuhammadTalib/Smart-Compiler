import React, { Component } from 'react';
import "./style.css"
import MenuButton from '../MenuButton/Button';
import {connect} from "react-redux"
import { buttonData } from "./buttonData"
import {open_new_file} from "./../../Redux/File/action"
import { RunCompiler } from '../../Backend/Compiler/RunFunction';
class MenuBar extends Component {
    state = {}
    onfileInput=()=>{
        var input=document.getElementById("imageFile");
        var text
        var reader = new FileReader();
        var openNewFile=this.props.openNewFile
        reader.addEventListener('load',function(event) {
            text=event.target.result
            openNewFile({fileName:input.files[0].name,text:text})
        });
        if(input.files[0]!==undefined) reader.readAsText(input.files[0]);
    }
    render() {
        return (
            <div className="menubar">
                <input 
                    type="file" 
                    id="imageFile" 
                    accept="*" 
                    onChange={this.onfileInput}
                    style={{display:"none"}}>
                </input>
                {buttonData.map((btn, index) =>
                    <MenuButton
                        key={btn.title}
                        title={btn.title}
                        clickHandler={btn.clickHandler}
                        margin={(index * 110) + 10}
                        dropDowns={btn.dropDowns}
                    />
                )}
               
                <button className="runbtn" onClick={() => {
                    RunCompiler()
                }}>Run</button>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        selectedFile:state.files.selectedFile
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        openNewFile: (openedFile) => dispatch(open_new_file(openedFile))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(MenuBar);