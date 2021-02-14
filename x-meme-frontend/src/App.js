import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import MemeListComponent from "./components/meme-list.component"
import CreateMemeComponent from "./components/create-meme.component"

function App() {
  return (
      <div className="container">
        <br/>
        <CreateMemeComponent/>
        <hr/>
        <MemeListComponent/>
      </div>
  );
}

export default App;
