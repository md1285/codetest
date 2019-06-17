import React from 'react';
import './App.css';

import Cards from '../Cards/Cards';
import CardUploadForm from '../CardUploadForm/CardUploadForm';

function App() {
  return (
    <div className="App">
      <Cards />
      <CardUploadForm />
    </div>
  );
}

export default App;
