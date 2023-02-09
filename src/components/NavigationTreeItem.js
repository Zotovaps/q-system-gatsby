import React, {useState} from "react"
import styled from "styled-components";

const NavigationTreeItemStyled = styled.div`
  display: flex;
  flex-direction: row;
  flex: none;
  gap: 5px;


  box-sizing: border-box;
  height: 28px;
  min-width: 200px;
  padding: 5px 10px;
  margin-left: ${props => `calc(${props.level} * 15px)`};



  background: ${props => props.isFolder ? "#ECEDF4" : "#FAFBFF"};
  border: 1px solid #ECEDF4;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;

  &:hover {
    background: ${props => props.isFolder ? "#dcdde6" : "#f7f8fa"};

  }

  div {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 120%;
    color: #2D334D;

    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    cursor: pointer;
  }
`


const NavigationTreeItem = (props) => {

    return (
        <NavigationTreeItemStyled level={props.level} isFolder={props.isFolder} onClick={props.onClick} onDoubleClick={props.onDoubleClick}>
            <div>{props.item}</div>
        </NavigationTreeItemStyled>
    )
}

export default NavigationTreeItem