import * as React from "react";
import {graphql, useStaticQuery, Link} from "gatsby";
import Layout from "../components/layout";
import Slider from "../components/slider";
import {Table} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';


const Algorithm = ({data}) => {

    return (
        <Layout>
            <div style={{display: "flex", flexDirection: "column", gap: "10px", width: "100%"}}>
                <Link to={"/algorithms"}>{`<-`}</Link>

                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    flex: "1",
                    overflow: "hidden auto",
                    gap: "10px",
                    alignItems: "center"
                }}>

                <Table striped bordered hover style={{width: "calc(100vw - 60px)"}}>
                    <thead>
                    <tr>
                        <th>Dimensions</th>
                        <th>Iteration</th>
                        <th>Processors</th>
                        <th>Ticks</th>
                    </tr>
                    </thead>

                    <tbody>
                    {data && data.allDeterminants.nodes.map(item => {
                        return (
                            <tr>
                                <td>{item.dimensions}</td>
                                <td>{item.iterations || "Empty"}</td>
                                <td>{item.processors}</td>
                                <td>{item.ticks}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </Table>


                    
                </div>

            </div>
        </Layout>
    )
}

export default Algorithm

export const data = graphql`
    query AlgoQuery($algorithm: String) {
        allDeterminants(filter: {algorithmId: {eq: $algorithm}}) {
            nodes {
                algorithmId
                determinantId
                dimensions
                processors
                ticks
                iterations
            }
        }
    }`