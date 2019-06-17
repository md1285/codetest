import React from 'react';
import axios from 'axios';

class ImageUploadForm extends React.Component {
  state = {
    file: null,
    name: '',
    image: '',
    description: '',
    factoid: '',
    cards: []
  };

  submitCard = e => {
    e.preventDefault();
    const formData = new FormData();
    if (this.state.file) formData.append('file', this.state.file[0]);
    if (this.state.name) formData.append('name', this.state.name);
    if (this.state.description) formData.append('description', this.state.description);
    if (this.state.factoid) formData.append('factoid', this.state.factoid);
    axios.post('/cards', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
    })
      .then(res => {
        console.log(res.data);
        this.setState({
          cards: [...this.state.cards, res.data]
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
          onSubmit={this.submitCard}
        >
          <input
            type='file'
            onChange={this.handleFileUpload}
          />
          <input 
            placeholder='name'
            name='name'
            type='text'
            onChange={this.handleChange}
          />
          <input 
            placeholder='description'
            name='description'
            type='text'
            onChange={this.handleChange}
          />
          <input 
            placeholder='factoid'
            name='factoid'
            type='text'
            onChange={this.handleChange}
          />

          <button
            type='submit'
          >Submit</button>
        </form>
        {this.state.cards.length > 0 &&
        this.state.cards.map(card => (
          <img 
            src={card.image}
            alt={card.name}
            key={card.name}
          />
        ))
        }
      </div>
    );
  }
}

export default ImageUploadForm;