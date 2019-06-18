import React from 'react';
import cardService from '../../utils/cardService';

class CardUploadForm extends React.Component {
  state = {
    file: null,
    name: '',
    image: '',
    description: '',
    factoid: '',
  };

  submitCard = async e => {
    e.preventDefault();
    cardService.submitNewCard(this.state);
  }

  handleFileUpload = e => {
    this.setState({ file: e.target.files });
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
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
      </div>
    );
  }
}

export default CardUploadForm;