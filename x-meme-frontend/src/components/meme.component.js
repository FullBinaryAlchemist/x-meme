import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
// eslint-disable-next-line
import axios from 'axios';
import "./meme.component.css";

export default class MemeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {name: this.props.meme.name,url:this.props.meme.url,caption:this.props.meme.caption};

    this.onUrlChange = this.onUrlChange.bind(this);
    this.onCaptionChange = this.onCaptionChange.bind(this);
    
  }

  onUrlChange(event) {
    this.setState({url: event.target.value});
  }

  onCaptionChange(event) {
    this.setState({caption: event.target.value});
  }


  onSubmit(event) {
    event.preventDefault();
    const meme={name:this.state.name,
    			url:this.state.url,
    			caption:this.state.caption
    			};
    console.log(meme);
    axios.patch('http://ec2-3-91-197-94.compute-1.amazonaws.com:8081/memes'+this.props.key, meme)
      .then(res => {console.log(res.data)
      		 //window.location = '/';
      })
      .catch(error => {
      	if (error.response) {
      		console.log(error.response.data);
      		console.log(error.response.status);
      		console.log(error.response.headers);}
      	
      	alert(error.response.data);

      })

  }

  makeEditable(){
  		console.log("Funciton to edit ");
  }

  render() {
    return (
    <li className="cards_item">
    	<div className="card">
        	<div className="card_image"><img src={this.state.url} alt="meme"/></div>
        	<div className="card_content">
          		<h2 className="card_title">{this.state.caption}</h2>
          		<p className="card_text">By:{this.state.name}</p>
          		<button className="btn card_btn" onClick={this.makeEditable()}>Edit</button>
        	</div>
        </div>
    </li>  	
    );
  }
}