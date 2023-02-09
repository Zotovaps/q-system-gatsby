import * as React from "react";
import {graphql, useStaticQuery,Link} from "gatsby";
import Layout from "../components/layout";


const Algorithm = ({ data }) => {

    return (
        <Layout>
            <Link to={"/"}>{`<-`}</Link>
            <div>{data.allAlgorithms.nodes[0].nameRu}</div>
            <div>{data.allAlgorithms.nodes[0].descriptionRu}</div>
        </Layout>
    )
}

export default Algorithm

export const data = graphql`
    query AlgoQuery($algorithm: String) {
        allAlgorithms(filter: {algorithmId: {eq: $algorithm}}) {
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
    }`