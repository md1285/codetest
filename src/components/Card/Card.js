import React from 'react';

class Card extends React.Component {


  render() {
    return (
      <div>
        <p>Name: {this.props.name}</p>
        <img src={this.props.image} alt={this.props.name}/>
        <p>Description: {this.props.description}</p>
        <p>Factoid: {this.props.factoid}</p>
      </div>
    );
  }
}

export default Card;