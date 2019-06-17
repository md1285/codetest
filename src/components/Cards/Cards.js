import React from 'react';
import cardService from '../../utils/cardService';

import Card from '../Card/Card';

class Cards extends React.Component {

  state = {
    cards: [],
  };

  async componentDidMount() {
    const cards = await cardService.getAllCards();
    this.setState({
      cards
    })
  }

  render() {
    return (
      <div>
        {!this.state.cards[0] && <p>Loading...</p>}
        {this.state.cards.map(card => (
          <Card 
          name={card.name}
          image={card.image}
          description={card.description}
          factoid={card.factoid}
          />
        ))}
      </div>
    );
  }

}

export default Cards;