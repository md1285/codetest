import axios from 'axios';

const submitNewCard = imageFile => {
  const formInput = document.getElementById('submission-form')
  const form = new FormData(formInput);
  form.set('file', imageFile)
  return axios.post('/api/cards', form, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
    .then(res => {
      if (res.statusText === 'OK') return res.data;
    })
    .catch(err => {
      console.log(`There was an error submitting the card: ${err}`)
    });
};

const getAllCards = () => {
  return axios.get('/api/cards')
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.log(`There was an error getting the cards: ${err}`)
    });
};

const deleteCard = id => {
  return axios.delete(`/api/cards/${id}`)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.log(`There was an error deleting the card: ${err}`)
    })
}

const seedDatabase = () => {
  return axios.delete('/api/cards')
  .then(res => {
    return res.data;
  })
  .catch(err => {
    console.log(`There was an error getting the cards: ${err}`)
  });
};

export default {
  submitNewCard,
  getAllCards,
  deleteCard,
  seedDatabase
};