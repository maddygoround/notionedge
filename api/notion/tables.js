const { loadPageChunk } = require("./pages");
const { loadTable } = require("./loadtable");

const getTableData = async (pageId, token) => {
    try {
        const page = await loadPageChunk({ pageId }, token);

        if (!page.recordMap.collection){
            return { rows: [] };
        }

        const collection = Object.keys(page.recordMap.collection).map(
            (k) => page.recordMap.collection[k]
        )[0];

        const collectionView = Object.keys(page.recordMap.collection_view).map(
            (k) => page.recordMap.collection_view[k]
          )[0];
        
        const { rows } = await loadTable(collection, collectionView.value.id , token);
        return { rows };

    } catch (err) {
        console.error(`Failed to load pageData for ${pageId}`, err);
        return { rows: [] };
    }

}

module.exports = { getTableData }