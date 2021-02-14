import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
// eslint-disable-next-line
import axios from 'axios';
//axios

export default class CreateMemeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {name: '',url:'',caption:''};

    this.onNameChange = this.onNameChange.bind(this);
    this.onUrlChange = this.onUrlChange.bind(this);
    this.onCaptionChange = this.onCaptionChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onNameChange(event) {
    this.setState({name: event.target.value});
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
    axios.post('http://localhost:5000/memes', meme)
      .then(res => {console.log(res.data);
      	window.location="/";
      })
      .catch(error => {
      	if (error.response) {
      		console.log(error.response.data);
      		console.log(error.response.status);
      		console.log(error.response.headers);}
      	
      	alert(error.response.data);

      })

  }

  render() {
    return (
    	<div>
      <h3>Create New Meme</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Name: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.name}
              onChange={this.onNameChange}
              />
        </div>
        <div className="form-group"> 
          <label>Caption: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.caption}
              onChange={this.onCaptionChange}
              />
        </div>
        <div className="form-group"> 
          <label>Url: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.url}
              onChange={this.onUrlChange}
              />
        </div>
        <div className="form-group">
          <input type="submit" value="Create Meme" className="btn btn-primary" />
        </div>
      </form>
    </div>
    );
  }
}