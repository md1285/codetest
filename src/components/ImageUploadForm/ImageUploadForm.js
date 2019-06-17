import React from 'react';
import axios from 'axios';

class ImageUploadForm extends React.Component {
  state = {
    file: null,
    images: []
  };

  submitFile = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', this.state.file[0]);
    axios.post('/image-upload', formData, {
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
        console.log(err);
      });
  }

  handleFileUpload = e => {
    this.setState({ file: e.target.files });
  }

  render() {
    return (
      <div>
        <form
          onSubmit={this.submitFile}
        >
          <input
            label='upload image'
            type='file'
            onChange={this.handleFileUpload}
          />
          <button
            type='submit'
          >Submit</button>
        </form>
        {this.state.images.length > 0 &&
        this.state.images.map(image => (
          <img 
            src={image}
            alt='an uploaded image'
          />
        ))
        }
      </div>
    );
  }
}

export default ImageUploadForm;