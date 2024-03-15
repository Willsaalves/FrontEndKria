import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios, { AxiosError } from 'axios'; 
import styled from 'styled-components';
import Loading from '../Loading/Loading';

interface Repository {
  id: number;
  name: string;
  owner: {
    login: string;
  };
}

const MyRepositories: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [error, setError] = useState<string | null>(null);

  const env = `Bearer ${process.env.REACT_APP_GITHUBTOKEN}`

  useEffect(() => {
    console.log(env)
    const fetchRepositories = async () => {
      setLoading(true);
      try {
        const response = await axios.get<Repository[]>('https://api.github.com/user/repos', {
          headers: {
            Authorization: env
        }
        });
        setRepositories(response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError;
          if (axiosError.response && (axiosError.response.status === 403 || axiosError.response.status === 404)) {
            setError('Repository not available');
          } else {
            setError(String(axiosError.message));
          }
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRepositories();
  }, []);

  if (loading) return <Loading />;
  if (error) return <div>Error: {error}</div>;

  return (
    <Container>
      <h1>My Repositories</h1>
      <RepositoryGrid>
        {repositories.map(repo => (
          <RepositoryCard key={repo.id}>
            <StyledLink to={`/details/${repo.owner.login}/${repo.name}`}>
              <RepositoryName>{repo.name}</RepositoryName>
            </StyledLink>
          </RepositoryCard>
        ))}
      </RepositoryGrid>
      <BackLink to="/">Back to Menu</BackLink>
      
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RepositoryGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
`;

const RepositoryCard = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const RepositoryName = styled.h3`
  margin: 0;
`;

const StyledLink = styled(Link)`
  color: #333;
  text-decoration: none;

  &:hover {
    color: #4ef6f8;
  }
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

export default MyRepositories;
