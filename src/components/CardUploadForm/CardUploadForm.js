import React from 'react';
import styles from './CardUploadForm.module.css'

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
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();
    await this.props.handleSubmitNewCard(this.state.file[0]);
    this.props.history.push('/cards');
  };

  render() {
    return (
      <div className={styles.CardUploadForm}>
        <form
          className={`${styles.form} largeScreenResize`}
          onSubmit={this.handleSubmit}
          id='submission-form'
        >
          <div className="file-field input-field">
            <div className='btn'>
              <span>Upload Image</span>
              <input
                type='file'
                required={true}
                onChange={this.handleFileUpload}
              />
            </div>
            <div className='file-path-wrapper'>
              <input className="file-path validate" type="text" />
            </div>
            </div>

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
              className={`${styles.btnResize} btn`}
              type='submit'
            >Submit</button>
        </form>
      <p>{this.props.errorMessage}</p>
      </div>
        );
      }
    }
    
export default CardUploadForm;