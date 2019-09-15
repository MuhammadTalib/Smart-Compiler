import React, { Component } from 'react';
import "./style.css"

import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { open_selected_file } from '../../Redux/File/action';

class FileTab extends Component {
    state = {}
    render() {
        return (<div className="filetabbar">
            {this.props.files.map((f, index) =>
                <Button
                    key={index}
                    className={"filetabbutton " + f.selected}
                    onClick={() => this.props.openSelectedFile(f)}
                >
                    {f.title + f.type}
                </Button>
            )}
            {/* <FileTabItem title="Untitled.txt" clickHandler={() => { }} />
            <FileTabItem title="Untitled.txt" clickHandler={() => { }} /> */}
        </div>);
    }
}
export const mapStateToProps = (state) => {
    return {
        files: state.files.files
    }
}

export const mapDispatchToProps = (dispatch) => {
    return {
        openSelectedFile: (file) => dispatch(open_selected_file(file))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FileTab);