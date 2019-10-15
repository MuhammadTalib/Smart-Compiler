import React from 'react';
import './App.css';
import Editor from './Components/Editor/Editor';
import MenuBar from "./Components/MenuBar/Menubar"
import Error from "./Components/Error/Error"

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: ""
    };
  }

  componentDidMount() {
    this.readTextFile('./untitled.txt');
  }

  readTextFile = file => {
    /* var rawFile = new XMLHttpRequest();
     rawFile.open("GET", file, false);
     rawFile.onreadystatechange = () => {
       if (rawFile.readyState === 4) {
         if (rawFile.status === 200 || rawFile.status == 0) {
           var allText = rawFile.responseText;
           this.setState({
             text: allText
           });
         }
       }
     };
     rawFile.send(null);*/
  };

  render() {
    return (
      <div>
        <MenuBar />
        <Editor />
        <Error />
      </div>
    );
  }
}

export default App;
