import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HomePage: React.FC = () => {
    return (
        <Container>
            <Title>Explore GitHub Repositories</Title>
            <ButtonContainer>
                <StyledLink to="/myRepositories">My Repositories</StyledLink>
                <StyledLink to="/search">Search Repositories</StyledLink>
                <StyledLink to="/favoriteRepositories">Favorites</StyledLink>
            </ButtonContainer>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
`;

const Title = styled.h1`
    font-size: 2rem;
    margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
    display: flex;
    gap: 20px;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    padding: 10px 20px;
    border: 2px solid #333;
    border-radius: 5px;
    color: #333;
    font-weight: bold;
    transition: all 0.3s ease;

    &:hover {
        background-color: #333;
        color: #fff;
    }
`;

export default HomePage;
