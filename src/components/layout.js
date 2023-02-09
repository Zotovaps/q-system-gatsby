import React from "react"
import { createGlobalStyle } from "styled-components"

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
export default function Layout({ children }) {
    return (
        <React.Fragment>
            <GlobalStyle/>
            {children}
        </React.Fragment>
    )
}