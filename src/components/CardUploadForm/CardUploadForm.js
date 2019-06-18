import React from 'react';

class CardUploadForm extends React.Component {

  state = {
    file: null,
    name: '',
    image: '',
    description: '',
    factoid: '',
  };

  handleFileUpload = e => {
    this.setState({ file: e.target.files });
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.handleSubmitNewCard(this.state)
    e.target.reset();
  }

  render() {
    return (
      <div>
        <form
          onSubmit={this.handleSubmit}
        >
          <input
            type='file'
            required={true}
            onChange={this.handleFileUpload}
          />
          <input
            placeholder='name'
            name='name'
            type='text'
            required={true}
            onChange={this.handleChange}
          />
          <input
            placeholder='description'
            name='description'
            type='text'
            required={true}
            onChange={this.handleChange}
          />
          <input
            placeholder='factoid'
            name='factoid'
            type='text'
            required={true}
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