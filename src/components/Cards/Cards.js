import React from 'react';
import Card from '../Card/Card';
import styles from './Cards.module.css'

import { Modal, Button } from 'react-materialize';

const trigger = <Button className='orange'>Seed Database</Button>;

class Cards extends React.Component {

  componentDidMount() {
    this.props.updateErrorMessage('');
  }

  render() {
    return (
      <div className={`${styles.Cards} largeScreenResize`}>
        {this.props.cards[0]
          ?
          <Card
            name={this.props.cards[this.props.counter].name}
            image={this.props.cards[this.props.counter].image}
            description={this.props.cards[this.props.counter].description}
            factoid={this.props.cards[this.props.counter].factoid}
            id={this.props.cards[this.props.counter]._id}
            errorMessage={this.props.errorMessage}

            currentNum={this.props.counter + 1}
            totalCards={this.props.cards.length}

            handleDelete={this.props.handleDelete}
          />
          :
          <p>{this.props.errorMessage || 'Loading...'}</p>
        }
        <div className={styles.cardNavButtonsWrapper}>
          <button
            className='btn'
            onClick={() => {
              this.props.handleClick(-1)
            }}
          ><i class="medium material-icons">arrow_back</i></button>
          <Modal trigger={trigger}>
            <p>
              Re-seed the database with games from boardgamegeek.com? This will delete all user additions and cannot be undone.
          </p>
            <Button
              className='btn orange'
              onClick={this.props.handleSeedDatabase}
              modal='close'
            >Confirm</Button>
          </Modal>
          <button
            className='btn'
            onClick={() => this.props.handleClick(1)}
          ><i class="medium material-icons">arrow_forward</i></button>
        </div>
      </div>
    );
  }
}

export default Cards;