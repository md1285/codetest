import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import styles from './App.module.css'

import Navbar from '../Navbar/Navbar'
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
    const cards = await cardService.getAllCards(this.updateErrorMessage);
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
    const cards = await cardService.deleteCard(id, this.updateErrorMessage);
    const counter = this.state.counter;
    const cardsLength = this.state.cards.length;
    if (counter === cardsLength - 1 && counter !== 0) {
      this.setState({
        counter: this.state.counter - 1
      });
    }
    if (cards) {
      this.setState({
        cards,
      });
    }
  }

  handleSubmitNewCard = async newCard => {
    const cards = await cardService.submitNewCard(newCard, this.updateErrorMessage);
    console.log(cards)
    if (!this.state.message) {
      console.log('got here')
      this.setState({
        cards,
        counter: cards.length - 1,
        message: ''
      });
    }
  }

  handleSeedDatabase = async () => {
    const cards = await cardService.seedDatabase(this.updateErrorMessage);
    if (cards) {
      this.setState({
        cards,
        counter: 0
      });
    }
  };

  updateErrorMessage = message => {
    this.setState({
      message
    });
  };

  render() {
    return (
      <div className={styles.App}>
        <Navbar />
        <Switch>
          <Route
            exact path='/'
            render={() => (
              <Redirect to='/cards' />
            )}
          />
          <Route
            exact path='/cards/new'
            render={props => (
              <CardUploadForm
                history={props.history}
                errorMessage={this.state.message}

                handleSubmitNewCard={this.handleSubmitNewCard}
                updateErrorMessage={this.updateErrorMessage}
              />
            )}
          />
          <Route
            exact path='/cards'
            render={props => (
              <Cards
                cards={this.state.cards}
                counter={this.state.counter}
                errorMessage={this.state.message}

                handleClick={this.handleClick}
                handleDelete={this.handleDelete}
                handleSeedDatabase={this.handleSeedDatabase}
                updateErrorMessage={this.updateErrorMessage}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
