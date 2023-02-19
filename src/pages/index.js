import React, {useState} from "react";
import {graphql, navigate} from "gatsby";
import styled from "styled-components";
import Layout from "../components/layout";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {useFormInput} from "../utils/hooks";
import {Container, Navbar} from "react-bootstrap";


const SidebarMenu = styled.div`
  //height: 100%;

  display: flex;
  flex-direction: column;
  gap: 30px;

  box-sizing: border-box;
  width: 768px;

  background: #FAFBFF;

  overflow-y: scroll;
  overflow-x: hidden;

`

const Main = styled.div`
  box-sizing: border-box;

  width: auto;
  height: 100%;

  //padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: #FFFFFF;

  //overflow-x: hidden;
  //overflow-y: auto;

`

const FilterSearchStyled = styled.div`
  display: flex;
  flex-direction: row;
  flex: none;
  min-width: 200px;

  box-sizing: border-box;
  padding: 5px 0;
  margin-bottom: 20px;
  gap: 10px;

  height: 38px;
  border-radius: 8px;
  overflow: hidden;


  input {
    width: 100%;
    border: 1px solid #ECEDF4;
    border-radius: 8px;
    outline: none;
    padding: 0 5px;
  }

`

const EditAlgorithmModalStyled = styled.div`
  display: ${props => props.showModal ? "flex" : "none"};
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: rgb(215, 215, 215, 0.4);

  .edit-modal {
    display: flex;
    flex-direction: column;

    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    margin: auto;

    box-sizing: border-box;
    width: 600px;
    height: 400px;

    padding: 30px;

    background: #FFFFFF;
    border-radius: 8px;
  }


`


const IndexFrame = styled.div`
  display: flex;
  flex-direction: row;

  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  padding: 0 30px;

  background: #FAFBFF;
`

const GridStyled = styled.div`
  /* display: grid; */
  /* grid-template-columns: repeat(auto-fill,200px); */
  /* grid-auto-rows: minmax(100px,auto); */
  /* grid-column-gap: 20px; */
  /* grid-row-gap: 20px; */
  width: 860px;
  height: fit-content;
  margin: auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: center;
  padding: 0 30px;

  div {
    width: 200px;
    min-height: 100px;
    background: #ECEDF4;
    border-radius: 8px;
    overflow: hidden;
    padding: 8px;
    text-align: center;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    //font-family: "Courier New", sans-serif;
    font-size: 16px;
    font-weight: 600;
    line-height: 20px;
    cursor: pointer;
  }

  div:hover {
    background: #2D334D;
    color: #FFFFFF;
  }
`

const NavbarStyled = styled.div`

`

const IndexPage = ({data}) => {
    const [show, setShow] = useState(false);
    const login = useFormInput('');
    const password = useFormInput('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleAuth = () => {
        sessionStorage.setItem("accessToken", "123");
        setShow(false);
    }

    const handleExit = () => {
        sessionStorage.removeItem("accessToken")
    }


    return (
        <>

            <Layout>
                <GridStyled>
                    <div onClick={() => navigate('/algorithms')}>Алгоритмы и их Q-детерминанты</div>
                    <div>Сравнение алгоритмов</div>
                    <div>Сервис аппроксимации</div>
                    <div>Документация</div>
                    <div>Публикации</div>
                    {
                        sessionStorage.getItem("accessToken") ?
                            <div onClick={handleExit}>Выйти</div>
                            :
                            <div onClick={handleShow}>Авторизация</div>
                    }
                    <div onClick={() => navigate('/admin')}>Управление</div>
                </GridStyled>


                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Авторизация</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{display: "flex", flexDirection: "column", gap: "10px"}}>
                        <input value={login.value} onChange={login.onChange} placeholder="Enter login"/>
                        <input value={password.value} onChange={password.onChange} placeholder="Enter password"/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleAuth} disabled={login.value === '' || password.value === ''}>
                            Войти
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Layout>

        </>



    );
}


export const gatsbyAlgo = graphql`
  query {
    allAlgorithms {
      nodes {
        algorithmId
        descriptionEn
        descriptionRu
        folderId
        iterative
        nameEn
        nameRu
      }
    }
    
    allFolders {
      nodes {
        folderId
        nameEn
        nameRu
        parentId
      }
    }
    
    allAlgorithmsProcessors {
      nodes {
        algorithmId
        img
      }
    }
    
    allAlgorithmsTicks {
      nodes {
        algorithmId
        img
      }
    }
  }
`


export default IndexPage

export const Head = () => <title>Q-system</title>
