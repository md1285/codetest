import React from 'react';
import cardService from '../../utils/cardService';


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
      </div>
    );
  }

}

export default Cards;