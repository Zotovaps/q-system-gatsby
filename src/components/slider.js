import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {useFormInput} from "../utils/hooks";

import {SectionIconStyled, SliderIconStyled} from "../assets/Icon";
import NavigationTreeItem from "./NavigationTreeItem";
import NavigationTree from "./NavigationTree";
import {graphql, navigate, useStaticQuery} from "gatsby";


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


const Slider = () => {
    // const [algorithms, setAlgorithms] = useState(data.allAlgorithms.nodes);
    // const [folders, setFolders] = useState(data.allFolders.nodes);

    const [showHierarchy, setShowHierarchy] = useState(localStorage.getItem("isHierarchy") === "true");
    const searchInput = useFormInput("");


    const data = useStaticQuery(graphql
        `query {
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
  }`
    )


    const onChangeViewHandle = () => {
        setShowHierarchy(!showHierarchy)
        localStorage.setItem("isHierarchy", JSON.stringify(!showHierarchy))
    }

    return (
        <SidebarMenu>
            <div style={{
                background: "#FFFFFF",
                padding: "4px 10px",
                display: "flex",
                gap: "20px",
                justifyContent: "flex-end",
            }}>
                {/*<GrLanguage onClick={() => setShowEng(!showEng)}/>*/}
                {/*<div onClick={() => showCreateFolder.setValue(true)}>+</div>*/}
            </div>

            <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",

                width: "90%",
                margin: "0 auto"
            }}>
                <FilterSearchStyled>
                    <SectionIconStyled checked={showHierarchy}
                                       onClick={onChangeViewHandle}/>
                    <input type="search" placeholder="Search..." value={searchInput.value}
                           onChange={e => searchInput.onChange(e)}/>
                </FilterSearchStyled>

                {searchInput.value === "" && data && <>
                    {!showHierarchy ?
                         data.allAlgorithms.nodes.map((item, index) => {
                            return (
                                <NavigationTreeItem key={index} isFolder={false}
                                                    item={true ? item.nameEn : item.nameRu}
                                                    onClick={() => navigate(`/algo/${item.algorithmId}`)}
                                                    onDoubleClick={() => navigate(`/algo/${item.algorithmId}`)}/>
                            )
                        })

                        :

                        data.allFolders.nodes
                            .filter(i => i.parentId === null)
                            .map((item, index) => {
                                return (
                                    <NavigationTree key={index}
                                                    item={item}
                                                    folders={data.allFolders.nodes}
                                                    algorithms={data.allAlgorithms.nodes}
                                                    isFolder={true}
                                                    level={0}/>
                                )
                            })
                    }
                </>}


                {searchInput.value !== "" && data && <>
                    {data.allAlgorithms.nodes
                        .filter(i => i.nameEn.toUpperCase().includes(searchInput.value.toUpperCase()) ||
                            i.nameRu.toUpperCase().includes(searchInput.value.toUpperCase()))
                        .map((item, index) => {
                            return (
                                <NavigationTreeItem key={index}
                                                    isFolder={false}
                                                    item={true ? item.nameEn : item.nameRu}
                                                    onClick={() => navigate(`/algo/${item.algorithmId}`)}
                                                    onDoubleClick={() => navigate(`/algo/${item.algorithmId}`)}/>
                            )
                        })
                    }
                </>}
            </div>

        </SidebarMenu>
    )
}



export default Slider
