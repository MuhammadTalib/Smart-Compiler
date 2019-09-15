import React, { Component } from 'react';
import "./style.css"
import MenuButton from '../MenuButton/Button';
import { buttonData, run } from "./buttonData"
class MenuBar extends Component {
    state = {}
    render() {
        return (
            <div className="menubar">
                {buttonData.map((btn, index) =>
                    <MenuButton
                        key={btn.title}
                        title={btn.title}
                        clickHandler={btn.clickHandler}
                        margin={(index * 110) + 10}
                        dropDowns={btn.dropDowns}
                    />
                )}
                <button onClick={() => {
                    run()
                }}>Run</button>
            </div>
        );
    }
}

export default MenuBar;