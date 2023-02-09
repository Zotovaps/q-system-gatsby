import React, {useEffect, useState} from "react";
import {graphql, useStaticQuery} from "gatsby";
import styled from "styled-components";
import {EditIconStyled} from "../assets/Icon";

const MainPaneStyled = styled.div`
  width: auto;
  height: fit-content;

  box-sizing: border-box;
  padding: 10px 30px;
  display: flex;
  flex-direction: column;

  .edit-icon {
    display: none;
  }

  .algo-name:hover .edit-icon {
    display: block;
  }

  .algo-name {
    display: flex;
    font-style: normal;
    font-weight: 400;
    font-size: 22px;
    line-height: 120%;
    margin: 0 0 10px 0;
    align-items: center;
    gap: 5px;
  }

  .algo-description {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 120%;
    color: #8B95BB;
  }
`

const EditAlgorithmModalStyled = styled.div`
  position: absolute;

  width: 100px;
  height: 100px;
  background: red;
`


function MainPanel(props, {data}) {
    const [algorithm, setAlgorithm] = useState(undefined)

    useEffect(() => {
        // let requestOptions = {
        //     method: 'GET',
        //     redirect: 'follow'
        // };
        //
        // fetch(`https://d5dk4o8s4tqnirc00ktu.apigw.yandexcloud.net/api/v1/algorithm/${props.item.algorithmId}`, requestOptions)
        //     .then(response => response.json())
        //     .then(result => {
        //         setAlgorithm(result)
        //         console.log(result)
        //     })
        //     .catch(error => console.log('error', error));

        props.item && setAlgorithm(props.item)


        // setAlgorithm(data.allAlgorithms.nodes[0])


    }, [props.item])

    return (
        <>
            {algorithm && <MainPaneStyled>
                <div className="algo-name">
                    {props.showEng ? algorithm.nameEn : algorithm.nameRu}
                </div>

                <div className="algo-description">
                    {props.showEng ? algorithm.descriptionEn : algorithm.descriptionRu}
                </div>
            </MainPaneStyled>}
        </>
    )
}

// export const data = graphql
//     `
//               query AlgoQuery($algorithmId: String) {
//                 allAlgorithms(
//                   filter: {algorithmId: {eq: $algorithmId}
//                 ) {
//                   nodes {
//                     algorithmId
//                     descriptionEn
//                     descriptionRu
//                     folderId
//                     iterative
//                     nameEn
//                     nameRu
//                   }
//                 }
//               }
//             `

export default MainPanel