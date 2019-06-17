import React from 'react';
import cardService from '../../utils/cardService';

import Card from '../Card/Card';

class Cards extends React.Component {

  state = {
    cards: [],
    counter: 0,
  };

  async componentDidMount() {
    const cards = await cardService.getAllCards();
    this.setState({
      cards
    })
  }

  handleClick = iterator => {
    let newCounter = this.state.counter + iterator;
    if (newCounter < 0) newCounter = this.state.cards.length -1;
    if (newCounter >= this.state.cards.length) newCounter = 0;
    this.setState({
      counter: newCounter
    })
  }

  render() {
    return (
      <div>
        {!this.state.cards[0] && <p>Loading...</p>}
        {this.state.cards[0] && 
          <Card 
          name={this.state.cards[this.state.counter].name}
          image={this.state.cards[this.state.counter].image}
          description={this.state.cards[this.state.counter].description}
          factoid={this.state.cards[this.state.counter].factoid}
          />
        }
        <button
          onClick={() => {
            this.handleClick(-1)
          }}
        >&lt;--</button>
        <button
          onClick={() => this.handleClick(1)}
        >--></button>
      </div>
    );
  }

}

export default Cards;