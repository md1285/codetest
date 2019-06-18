import React from 'react';

class Card extends React.Component {


  render() {
    return (
      <div>
        <p>{this.props.currentNum}/{this.props.totalCards}</p>
        <p>Name: {this.props.name}</p>
        <img src={this.props.image} alt={this.props.name}/>
        <p>Description: {this.props.description}</p>
        <p>Factoid: {this.props.factoid}</p>
        <button
          onClick={() => this.props.handleDelete(this.props.id)}
        >Delete</button>
      </div>
    );
  }
}

export default Card;