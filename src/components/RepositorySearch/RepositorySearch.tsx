import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Loading from '../Loading/Loading'; // Importando o componente de loading

interface Repository {
  id: number;
  name: string;
  owner: {
    login: string;
  };
}

const RepositorySearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get<{ items: Repository[] }>(
        `https://api.github.com/search/repositories?q=${searchTerm}`
      );
      setSearchResults(response.data.items);
    } catch (error) {
      console.error('Error searching repositories:', error);
    }
    setLoading(false);
  };

  return (
    <Container>
      <Title>Search Repositories</Title>
      <Form onSubmit={handleSubmit}>
        <Input type="text" value={searchTerm} onChange={handleChange} />
        <Button type="submit">Search</Button>
      </Form>
      {loading && <Loading />} {/* Renderizando o componente Loading quando loading é verdadeiro */}
      <RepoList>
        {searchResults.map(repo => (
          <RepoItem key={repo.id}>
            
            <StyledLink to={`/details/${repo.owner.login}/${repo.name}`}>{repo.name}</StyledLink>
                    
          </RepoItem>
        ))}
      </RepoList>
      <BackLink to="/">Back to Menu</BackLink>
    </Container>
  );
};

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
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

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;
const StyledLink = styled(Link)`
  color: #333;
  text-decoration: none;

  &:hover {
    color: #4ef6f8;
  }
`;

const Form = styled.form`
  display: flex;
  margin-bottom: 20px;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 16px;
`;

const RepoList = styled.ul`
  list-style: none;
  padding: 0;
`;

const RepoItem = styled.li`
  margin-bottom: 10px;
`;

const RepoLink = styled(Link)`
  color: #007bff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;


export default RepositorySearch;
