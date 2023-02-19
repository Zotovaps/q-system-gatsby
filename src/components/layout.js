import React from "react"
import styled, { createGlobalStyle } from "styled-components"
import Slider from "./slider";

const GlobalStyle = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;

    font-family: 'Segoe UI', sans-serif;
    -moz-user-select: none;
    -khtml-user-select: none;
    user-select: none;
    overflow-x: hidden;
  }
  
  .nav-link.active {
    background: #FAFBFF !important;
    color: #2D334D !important;
    border-bottom: 1px solid #FAFBFF !important
  }

  ::-webkit-scrollbar-track
  {
    -webkit-box-shadow: inset 0 0 6px #FAFBFF;
    background-color: #F5F5F5;
  }

  ::-webkit-scrollbar
  {
    width: 6px;
    background-color: #F5F5F5;
  }

  ::-webkit-scrollbar-thumb
  {
    background-color: #ECEDF4;
  }

`

const IndexFrame = styled.div`
  display: flex;
  flex-direction: row;
  
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;

  background: #FAFBFF;
  overflow: hidden;


`


export default function Layout({ children }) {
    return (
        <React.Fragment>
            <GlobalStyle/>
            <IndexFrame>
                {/*<Slider/>*/}
                {children}
            </IndexFrame>
        </React.Fragment>
    )
}