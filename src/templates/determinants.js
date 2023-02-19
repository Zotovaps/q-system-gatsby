import * as React from "react";
import {graphql, useStaticQuery, Link} from "gatsby";
import Layout from "../components/layout";
import Slider from "../components/slider";
import {Breadcrumb, Table} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useEffect, useState} from "react";


const Determinants = ({data}) => {
    const [algorithmId, setAlgorithmId] = useState(undefined)

    useEffect(() => {
        setAlgorithmId(window.location.pathname.split('/')[2])
    }, [window.location.pathname])

    return (
        <Layout>
            <div style={{display: "flex", flexDirection: "column", gap: "10px", width: "100%", padding: "30px", boxSizing: "border-box"}}>
                <Breadcrumb>
                    <Breadcrumb.Item href="/">Menu</Breadcrumb.Item>
                    <Breadcrumb.Item href={`/algorithms/#${algorithmId}`}>
                        {data.allAlgorithms.nodes[0].nameEn}
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>Determinants</Breadcrumb.Item>
                </Breadcrumb>

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

export default Determinants

export const data = graphql`
    query AlgoQuery($algorithm: String) {
        allAlgorithms(filter: {algorithmId: {eq: $algorithm}}) {
            nodes {
                nameRu
                nameEn
            }
        }
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