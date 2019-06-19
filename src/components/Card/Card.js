import React from 'react';
import styles from './Card.module.css'

import { Modal, Button } from 'react-materialize';

const trigger = <Button className='red'>Delete</Button>;

class Card extends React.Component {

  render() {
    return (
      <div className={`${styles.Card} resizeInner`}>
        <p>{this.props.currentNum}/{this.props.totalCards}</p>
        <p className={styles.gameTitle}>{this.props.name}</p>
        <img 
          src={this.props.image} 
          alt={this.props.name} 
          className={styles.image}
          />
        <div>
          <p className={styles.p}>Description: {this.props.description}</p>
          <p className={styles.p}>Factoid: {this.props.factoid}</p>
        </div>

        <Modal trigger={trigger}>
          <p>
            Are you sure? This cannot be undone.
          </p>
          <Button
            onClick={() => {
              this.props.handleDelete(this.props.id)
            }}
            modal='close'
            className='red'
          >Yes, Delete</Button>
        </Modal>
        <p>{this.props.errorMessage}</p>

      </div>
    );
  }

}

export default Card;