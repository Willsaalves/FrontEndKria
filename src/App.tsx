import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/Home/Home';
import RepositoryDetails from './components/RepositoryDetails/RepositoryDetails';
import MyRepositories from './components/MyRepositories/MyRepositories'; // Importe o componente MyRepositories
import RepositorySearch from './components/RepositorySearch/RepositorySearch'; // Importe o componente RepositorySearch
import FavoriteRepositories from './components/Favorites/RepositoriesFav';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<HomePage />} />
        <Route path="/details/:owner/:repo" element={<RepositoryDetails />} />
        <Route path="/myRepositories" element={<MyRepositories />} />
        <Route path="/search" element={<RepositorySearch />} />
        <Route path="/favoriteRepositories" element={<FavoriteRepositories />} />
      </Routes>
    </Router>
  );
}

export default App;
