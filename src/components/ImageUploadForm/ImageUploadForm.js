import React from 'react';
import axios from 'axios';

class ImageUploadForm extends React.Component {
  state = {
    file: null,
    title: null,
    images: []
  };

  submitFile = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', this.state.file[0]);
    axios.post('/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(res => {
        console.log(res.data.Location);
        this.setState({
          images: [...this.state.images, res.data.Location]
        })
      })
      .then(err => {
        if (err) console.log(err);
      });
  }

  handleFileUpload = e => {
    this.setState({ file: e.target.files });
  }

  handleChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  render() {
    return (
      <div>
        <form
          onSubmit={this.submitFile}
        >
          <input
            type='file'
            onChange={this.handleFileUpload}
          />
          <input 
            name='title'
            type='text'
            onChange={this.handleChange}
          />

          <button
            type='submit'
          >Submit</button>
        </form>
        {this.state.images.length > 0 &&
        this.state.images.map(image => (
          <img 
            src={image}
            alt='user uploaded file'
            key={image}
          />
        ))
        }
      </div>
    );
  }
}

export default ImageUploadForm;