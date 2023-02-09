const path = require('path');

const fetch = (...args) =>
    import(`node-fetch`).then(({default: fetch}) => fetch(...args))

// exports.sourceNodes = async ({actions: {createNode}, createContentDigest,}) => {
//     // get data from GitHub API at build time
//     const result = await fetch(`https://d5dk4o8s4tqnirc00ktu.apigw.yandexcloud.net/api/v1/folder/root`)
//     const resultData = await result.json()
//     // create node for build time data example in the docs
//     createNode({
//         // nameWithOwner and url are arbitrary fields from the data
//         folders: resultData.folders,
//         algorithms: resultData.algorithms,
//         // required fields
//         id: `example-build-time-data`,
//         parent: null,
//         children: [],
//         internal: {
//             type: `Example`,
//             contentDigest: createContentDigest(resultData),
//         },
//     })
// }


exports.sourceNodes = async ({actions: {createNode}, createContentDigest,}) => {
    // get data from GitHub API at build time
    const result = await fetch(`https://d5dk4o8s4tqnirc00ktu.apigw.yandexcloud.net/api/v1/folder/root`)
    const resultData = await result.json()
    // create node for build time data example in the docs

    for (var j = 0; j < resultData.algorithms.length; j++)
    {
        createNode({
            // nameWithOwner and url are arbitrary fields from the data
            algorithmId: resultData.algorithms[j].algorithmId,
            descriptionEn: resultData.algorithms[j].descriptionEn,
            descriptionRu: resultData.algorithms[j].descriptionRu,
            folderId: resultData.algorithms[j].folderId,
            iterative: resultData.algorithms[j].iterative,
            nameEn: resultData.algorithms[j].nameEn,
            nameRu: resultData.algorithms[j].nameRu,
            // required fields
            id: `algorithms-get-${j}`,
            parent: null,
            children: [],
            internal: {
                type: `Algorithms`,
                contentDigest: createContentDigest(resultData),
            },
        })


        const resultMatrix = await fetch(`https://storage.yandexcloud.net/q.system/approximation/${resultData.algorithms[j].algorithmId}/matrix.json`)
        const resultMatrixData = await resultMatrix.json()

        createNode({
            // nameWithOwner and url are arbitrary fields from the data
            algorithmId: resultData.algorithms[j].algorithmId,
            X: resultMatrixData.data.X,
            processors: resultMatrixData.data.y.processors,
            ticks: resultMatrixData.data.y.ticks,
            // required fields
            id: `matrix-get-${j}`,
            parent: null,
            children: [],
            internal: {
                type: `AlgorithmsMatrix`,
                contentDigest: createContentDigest(resultMatrixData),
            },
        })


        const resultProc = await fetch(`https://storage.yandexcloud.net/q.system/approximation/${resultData.algorithms[j].algorithmId}/processors.json`)
        const resultProcData = await resultProc.json()

        createNode({
            // nameWithOwner and url are arbitrary fields from the data
            algorithmId: resultData.algorithms[j].algorithmId,
            coef: resultProcData.data.coef,
            names: resultProcData.data.names,
            json: resultProcData.data.json,
            latex: resultProcData.data.latex,
            img: resultProcData.data.img,
            // required fields
            id: `processors-get-${j}`,
            parent: null,
            children: [],
            internal: {
                type: `AlgorithmsProcessors`,
                contentDigest: createContentDigest(resultProcData),
            },
        })


        const resultTicks = await fetch(`https://storage.yandexcloud.net/q.system/approximation/${resultData.algorithms[j].algorithmId}/ticks.json`)
        const resultTicksData = await resultTicks.json()

        createNode({
            // nameWithOwner and url are arbitrary fields from the data
            algorithmId: resultData.algorithms[j].algorithmId,
            coef: resultTicksData.data.coef,
            names: resultTicksData.data.names,
            json: resultTicksData.data.json,
            latex: resultTicksData.data.latex,
            img: resultTicksData.data.img,
            // required fields
            id: `ticks-get-${j}`,
            parent: null,
            children: [],
            internal: {
                type: `AlgorithmsTicks`,
                contentDigest: createContentDigest(resultTicksData),
            },
        })
    }


    const resultFolders = await fetch(`https://d5d603o45jf9c91p4q4q.apigw.yandexcloud.net/folder`)
    const resultFoldersData = await resultFolders.json()

    for (var i = 0; i < resultFoldersData.length; i++)
    {
        createNode({
            // nameWithOwner and url are arbitrary fields from the data
            folderId: resultFoldersData[i].folderId,
            nameEn: resultFoldersData[i].nameEn,
            nameRu: resultFoldersData[i].nameRu,
            parentId: resultFoldersData[i].parentId || null,
            // required fields
            id: `folders-get-${i}`,
            parent: null,
            children: [],
            internal: {
                type: `Folders`,
                contentDigest: createContentDigest(resultFoldersData),
            },
        })
    }

}


exports.createPages = async ({graphql, actions}) => {
    const { data } = await graphql(`
        query Algorithms {
            allAlgorithms {
                nodes {
                    algorithmId
                }
            }
        }
    `)

    console.log('data >> ', data)

    data.allAlgorithms.nodes.forEach(node => {
        actions.createPage({
            path: "/algo/"+ node.algorithmId,
            component: path.resolve('./src/templates/algorithm.js'),
            context: {
                algorithm: node.algorithmId
            }
        })
    })
}

