import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface Repository {
  owner: string;
  repoName: string;
  lastUpdate: string;
  language:string;
  status: boolean;
}

const FavoriteRepositories: React.FC = () => {
  const [favoriteRepos, setFavoriteRepos] = useState<Repository[]>([]);

  useEffect(() => {
    // Função para buscar os repositórios favoritos do backend
    const fetchFavoriteRepos = async () => {
      try {
        // Substitua 'sua-url-backend' pela URL real do seu backend
        const response = await axios.get<any[]>('http://localhost:5093/api/Favorite/GetAll');
        console.log(response.data)
        const extractedData = response.data.map(item => ({
          owner: item.Owner,
          repoName: item.RepoName,
          lastUpdate:item.LastUpdate,
          language:item.Language,
          status: item.Status
        }));
        setFavoriteRepos(extractedData);
      } catch (error) {
        console.error('Erro ao obter repositórios favoritos:', error);
      }
    };

    fetchFavoriteRepos();
  }, []);

  return (
    <Container>
      <h1>My Favorite Repositories</h1>
      <GridContainer>
        {favoriteRepos.map(repo => (
          <GridItem key={`${repo.owner}-${repo.repoName}`}>
            <p>Owner: {repo.owner}</p>
            <p>Repo Name: {repo.repoName}</p>
            <p>Last update:{repo.lastUpdate}</p>
            <p>Language:{repo.language}</p>
            <p>Status: {repo.status ? 'Favoritado' : 'Não Favoritado'}</p>
          </GridItem>
        ))}
      </GridContainer>
      <BackLink to="/">Back to Menu</BackLink>
      <BackLink2 to="/myRepositories">Back to Repositories</BackLink2>
      <BackLink2 to="/search">Search</BackLink2>
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
  text-align: center;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 20px;
`;

const GridItem = styled.div`
  padding-left: 10px;
  
  background-color: #f0f8ff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border: 1px solid #add8e6; /* Cor da borda azul clara */
`;

const BackLink = styled(Link)`
  display: inline-block;
  padding: 10px 20px;
  margin-top: 20px;
  color: #333;
  text-decoration: none;
  font-weight: bold;
  border: 2px solid #007bff;
  border-radius: 5px;
  transition: color 0.3s ease, border-color 0.3s ease;

  &:hover {
    color: #4ef6f8;
    border-color: #4ef6f8;
  }
`;


const BackLink2 = styled(Link)`
    margin-top: 20px;
    margin-left: 10px;
    padding: 10px 20px;
    border: none;

    display: inline-block;

  
    color: #333;
    text-decoration: none;
    font-weight: bold;
    border: 2px solid #007bff;
    border-radius: 5px;
    transition: color 0.3s ease, border-color 0.3s ease;
  

    &:hover {
      color: #4ef6f8;
      border-color: #4ef6f8;
    }
`;

export default FavoriteRepositories;
