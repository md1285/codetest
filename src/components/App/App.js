import React from 'react';
import './App.css';

import Cards from '../Cards/Cards';
import CardUploadForm from '../CardUploadForm/CardUploadForm';

import cardService from '../../utils/cardService';

class App extends React.Component {

  state = {
    cards: [],
    counter: 0,
    message: ''
  };

  async componentDidMount() {
    const cards = await cardService.getAllCards();
    this.setState({
      cards
    });
  }

  handleClick = iterator => {
    let newCounter = this.state.counter + iterator;
    if (newCounter < 0) newCounter = this.state.cards.length - 1;
    if (newCounter >= this.state.cards.length) newCounter = 0;
    this.setState({
      counter: newCounter,
      message: ''
    })
  }

  handleDelete = async id => {
    const cards = await cardService.deleteCard(id);
    const counter = this.state.counter;
    const cardsLength = this.state.cards.length;
    if (counter === cardsLength - 1 && counter !== 0) {
      this.setState({
        counter: this.state.counter - 1
      });
    }
    this.setState({
      cards,
    });
  }

  handleSubmitNewCard = async newCard => {
    const cards = await cardService.submitNewCard(newCard);
    const newCardExists = this.state.cards.length !== cards.length;
    this.setState({
      cards,
      counter: newCardExists ? cards.length - 1 : this.state.counter,
      message: newCardExists ? '' : 'Error: This game already exists in the database.'
    });
  }

  render() {
    return (
      <div className="App">
        <Cards
          cards={this.state.cards}
          counter={this.state.counter}
          handleClick={this.handleClick}
          handleDelete={this.handleDelete}
        />
        <CardUploadForm 
          handleSubmitNewCard={this.handleSubmitNewCard}
        />
        {this.state.message && 
        <p>{this.state.message}</p>
        }
      </div>
    );
  }
}

export default App;
