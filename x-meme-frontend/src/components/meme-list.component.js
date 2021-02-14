import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
//eslint-disable-next-line
import { BrowserRouter as Router, Route} from "react-router-dom";
import MemeComponent from "./meme.component"
import axios from 'axios';

import "./meme-list.component.css";

export default class MemesList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {memes: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/memes/')
      .then(response => {
        this.setState({ memes: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  memeList() {
    return this.state.memes.map(meme => {
      return <MemeComponent meme={meme}  key={meme.id}/>;
    })
  }

  render() {
    return (
    	<div className="main">
      		<h3 >Memes</h3>
      		<ul className="cards">
        
        
	            { this.memeList() }
        
    	  	</ul>
      </div>
    )
  }
}