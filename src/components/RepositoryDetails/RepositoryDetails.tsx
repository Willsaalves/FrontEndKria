import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { FaStar } from 'react-icons/fa';
import axios from 'axios';
import Loading from '../Loading/Loading';

interface Repository {
    id: number;
    name: string;
    description: string;
    language: string;
    updated_at: string;
    owner: {
        login: string;
    };
}

interface Contributor {
    id: number;
    login: string;
}

const RepositoryDetails: React.FC = () => {
    const params = useParams<{ owner: string; repo: string }>();
    const { owner, repo } = params;
    const [repository, setRepository] = useState<Repository | null>(null);
    const [contributors, setContributors] = useState<Contributor[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [favorited, setFavorited] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
            .get<boolean>(`http://localhost:5093/api/Favorite/GetByRepoName?RepoName=${repo}`)
            .then(response => {
                setFavorited(response.data);
            })
            .catch(error => {
                console.error('Error checking if repository is favorited:', error);
            });

        axios
            .get<Repository>(`https://api.github.com/repos/${owner}/${repo}`)
            .then(response => {
                setRepository(response.data);
            })
            .catch(error => {
                console.error('Error fetching repository:', error);
                setError('Error fetching repository');
            })
            .finally(() => {
                setLoading(false);
            });

        axios
            .get<Contributor[]>(`https://api.github.com/repos/${owner}/${repo}/contributors`)
            .then(response => {
                setContributors(response.data);
            })
            .catch(error => {
                console.error('Error fetching contributors:', error);
            });
    }, [owner, repo]);

    const handleFavoriteToggle = () => {
        if (favorited) {
            axios.delete(`http://localhost:5093/api/Favorite/DeleteByRepoName?RepoName=${repo}`)
                .then(response => {
                    console.log('Repository unfavorited successfully');
                    setFavorited(false); 
                })
                .catch(error => {
                    console.error('Error unfavoriting repository:', error);
                });
        } else {
            if (repository) {
                axios.post('http://localhost:5093/api/Favorite/CreateFavorite', {
                    Owner: owner,
                    RepoName: repo,
                    LastUpdate: repository.updated_at,
                    Language: repository.language, // Enviar a linguagem
                    Status: true
                })
                .then(response => {
                    console.log('Repository favorited successfully');
                    setFavorited(true); 
                })
                .catch(error => {
                    console.error('Error favoriting repository:', error);
                });
            }
        }
    };

    if (loading) return <Loading />;
    if (error) return <div>Error: {error}</div>;
    if (!repository) return <div>No repository found</div>;

    return (
        <Container>
            <RepositoryHeader>
                <RepositoryName>
                    {repository.name}
                    <StarIcon
                        onClick={handleFavoriteToggle}
                        favorited={favorited}
                    />
                </RepositoryName>
                <p>Description: {repository.description}</p>
                <p>Language: {repository.language}</p>
                <p>Last Updated: {new Date(repository.updated_at).toLocaleDateString()}</p>
                <p>Owner: {repository.owner.login}</p>
            </RepositoryHeader>

            <ContributorsSection>
                <h2>Contributors</h2>
                <ul>
                    {contributors.map(contributor => (
                        <li key={contributor.id}>{contributor.login}</li>
                    ))}
                </ul>
            </ContributorsSection>
            
            <BackLink to="/myRepositories">Back to Repositories</BackLink>
            <BackLink2 to="/favoriteRepositories">Favoritos</BackLink2>
        </Container>
    );
};

const Container = styled.div`
    padding: 20px;
`;

const RepositoryHeader = styled.div`
    background-color: #f0f0f0;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const RepositoryName = styled.h1`
    display: flex;
    align-items: center;
`;

const ContributorsSection = styled.div`
    margin-top: 20px;
`;

const BackLink = styled(Link)`
    margin-top: 20px;
    margin-right: 10px;
    padding: 10px 20px;

    border: none;
    background-color: #333;
    color: #fff;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: #008789;
    }
`;

const BackLink2 = styled(Link)`
    margin-top: 20px;
    margin-left: 10px;
    padding: 10px 20px;
    border: none;
    background-color: #333;
    color: #fff;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: #008789;
    }
`;

const StarIcon = styled(FaStar)<{ favorited: boolean }>`
    margin-left: 5px;
    color: ${props => props.favorited ? 'yellow' : 'gray'};
    cursor: pointer;
`;

export default RepositoryDetails;
