import axios from 'axios';

const submitNewCard = state => {
  const formData = new FormData();
  if (state.file) formData.append('file', state.file[0]);
  if (state.name) formData.append('name', state.name);
  if (state.description) formData.append('description', state.description);
  if (state.factoid) formData.append('factoid', state.factoid);
  return axios.post('/cards', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
    .then(res => {
      if (res.statusText === 'OK') return res.data;
      throw new Error('There was an error submitting the card.')
    });
};

export default {
  submitNewCard,
};