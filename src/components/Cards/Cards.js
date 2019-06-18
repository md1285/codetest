import React from 'react';
import Card from '../Card/Card';

class Cards extends React.Component {

  render() {
    return (
      <div>
        {this.props.cards[0]
          ?
          <Card
            name={this.props.cards[this.props.counter].name}
            image={this.props.cards[this.props.counter].image}
            description={this.props.cards[this.props.counter].description}
            factoid={this.props.cards[this.props.counter].factoid}
            id={this.props.cards[this.props.counter]._id}

            currentNum={this.props.counter + 1}
            totalCards={this.props.cards.length}

            handleDelete={this.props.handleDelete}
          />
          :
          <p>Loading...</p>
        }
        <button
          onClick={() => {
            this.props.handleClick(-1)
          }}
        >&lt;--</button>
        <button
          onClick={() => this.props.handleClick(1)}
        >--></button>
      </div>
    );
  }
}

export default Cards;