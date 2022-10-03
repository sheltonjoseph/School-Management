import React from 'react'
import styled from "styled-components";
import SchoolImg from "../images/Purple High School Logo.png"
import Login from '../Components/LoginForm';
import SignupForm from '../Components/SignupForm';

export const Home = () => {
  return (
    <Container>
        <Image src={SchoolImg}></Image>
        <SiginContainers>
            {/* <Login/> */}
            <SignupForm/>
        </SiginContainers>
    </Container>
  )
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
`;
const Image = styled.img`
  object-fit: contain;
`;
const SiginContainers = styled.div`
  flex:1;
  display: flex;
  align-Items:center;
  justify-Content:center
`;