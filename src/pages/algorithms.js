import React, {useEffect, useState} from "react";
import {graphql, Link, navigate} from "gatsby";
import {useFormInput} from "../utils/hooks";
import Layout from "../components/layout";
import styled from "styled-components";
import {GrLanguage} from "@react-icons/all-files/gr/GrLanguage";
import {GrEdit} from "@react-icons/all-files/gr/GrEdit";
import {RiDeleteBin6Line} from "@react-icons/all-files/ri/RiDeleteBin6Line";
import {SectionIconStyled} from "../assets/Icon";
import NavigationTreeItem from "../components/NavigationTreeItem";
import NavigationTree from "../components/NavigationTree";
import MainPanel from "../components/MainPanel";
import * as Console from "console";


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
    flex: 1;
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

const AlgorithmsPage = ({data}) => {
    const size = 460;
    const [showHierarchy, setShowHierarchy] = useState(true);
    const [showEng, setShowEng] = useState(true);
    const selectedAlgorithm = useFormInput(undefined);
    const searchInput = useFormInput("");





    useEffect(() => {

        if (window.location.hash.substr(1) !== '') {
            selectedAlgorithm.setValue(data.allAlgorithms.nodes.find(item => item.algorithmId === window.location.hash.substr(1)))
        } else {
            selectedAlgorithm.setValue(undefined)
        }

    }, [window.location.hash])



    return (
        <Layout>

            <SidebarMenu>
                <div style={{
                    background: "#FFFFFF",
                    padding: "4px 10px",
                    display: "flex",
                    gap: "20px",
                    justifyContent: "flex-end",
                }}>
                    <GrLanguage onClick={() => setShowEng(!showEng)}/>
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
                            // onClick={() => window.location.hash = 'modal-add-company'}/>
                                           onClick={() => setShowHierarchy(!showHierarchy)}/>
                        <input type="search" placeholder="Search..." value={searchInput.value}
                               onChange={e => searchInput.onChange(e)}/>
                    </FilterSearchStyled>

                    {searchInput.value === "" && data && <>
                        {!showHierarchy ?
                            data.allAlgorithms.nodes.map((item, index) => {
                                return (
                                    <NavigationTreeItem key={index} isFolder={false}
                                                        item={showEng ? item.nameEn : item.nameRu}
                                                        onClick={() => window.location.hash = item.algorithmId}/>
                                        // onClick={() => selectedAlgorithm.setValue(item)}
                                        //                 onDoubleClick={() => navigate(`/algo/${item.algorithmId}`)}/>
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
                                                        level={0}
                                                        selectedAlgorithm={selectedAlgorithm}/>
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
                                                        item={showEng ? item.nameEn : item.nameRu}
                                                        onClick={() => window.location.hash = item.algorithmId}/>
                                                        // onDoubleClick={() => navigate(`/algo/${item.algorithmId}`)}/>
                                )
                            })
                        }
                    </>}
                </div>

            </SidebarMenu>

            {/*<Slider/>*/}


            <Main style={{width: `calc(100vw - ${size}px)`}}>
                {selectedAlgorithm.value &&
                <>
                    <MainPanel item={selectedAlgorithm.value} showEng={showEng}/>

                    <Link to={`/determinants/${selectedAlgorithm.value.algorithmId}`}>
                        <div>
                            Show Q-determinants
                        </div>
                    </Link>

                    <div style={{
                        flex: "1",
                        overflowX: "hidden",
                        overflowY: "auto",
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px"
                    }}>
                        <img style={{
                            width: "500px",
                            margin: "0 auto"
                        }}
                             src={data.allAlgorithmsProcessors.nodes.find(i => i.algorithmId === selectedAlgorithm.value.algorithmId).img}/>

                        <img style={{
                            width: "500px",
                            margin: "0 auto 30px"
                        }}
                             src={data.allAlgorithmsTicks.nodes.find(i => i.algorithmId === selectedAlgorithm.value.algorithmId).img}/>
                    </div>
                </>}
            </Main>
        </Layout>
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


export default AlgorithmsPage

export const Head = () => <title>Q-system</title>
