import React from 'react';
import Button from '@material-ui/core/Button';
import "./style.css"
const FileTabItem = (props) => {
    return (
        <div
            className="filetabitem"
            style={{ height: "36px" }}>
            <Button
                className="filetabbtn"
                style={{ height: "36px" }}
                onClick={() => props.clickHandler()}>
                <div>
                    Untitled.txt
                </div>
            </Button>


        </div>);
}

export default FileTabItem;