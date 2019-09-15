import React from 'react';
import './App.css';
import Editor from './Components/Editor/Editor';
import MenuBar from "./Components/MenuBar/Menubar"

// function onFilesChange(files) {
//   console.log(files)
// }

// function onFilesError(error, file) {
//   console.log('error code ' + error.code + ': ' + error.message)
// }
// function App() {
//   return (
//     <div>
//       {/* <MenuBar />
//       <Editor /> */}
//       <Files
//         className='files-dropzone'
//         onChange={onFilesChange}
//         onError={onFilesError}
//         accepts={['image/png', '.pdf', 'audio/*','.txt']}
//         multiple
//         maxFiles={3}
//         maxFileSize={10000000}
//         minFileSize={0}
//         clickable
//       >
//         Drop files here or click to upload
//         </Files>
//     </div>
//   );
// }

// export default App;

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
      /* <div>
         {this.state.text.split("\n").map((item, key) => {
           return <span key={key}>{item}<br /></span>;
         })}
       </div>*/
      <React.Fragment>
        <MenuBar />
        <Editor />
      </React.Fragment>
    );
  }
}

export default App;
