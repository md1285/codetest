import React from 'react';
import './App.css';

import Cards from '../Cards/Cards';
import CardUploadForm from '../CardUploadForm/CardUploadForm';

import cardService from '../../utils/cardService';

class App extends React.Component {

  state = {
    cards: [],
    counter: 0,
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
      counter: newCounter
    })
  }

  handleDelete = async id => {
    const cards = await cardService.deleteCard(id);
    let counter = this.state.counter;
    let cardsLength = this.state.cards.length
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
    this.setState({
      cards,
      counter: cards.length -1
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
      </div>
    );
  }
}

export default App;
