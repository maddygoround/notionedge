const {queryCollection} = require('./query-collection');
const {getNotionValue} = require('./helpers/utils');
const {getUsers} = require('./users');

const loadTable = async (collection, collectionViewId ,token ) => {

    const { value } = collection;

    const table = await queryCollection({
        collectionId: value.id,
        collectionViewId: collectionViewId,
    }, token);

    const collectionRows = value.schema;
    const collectionColKeys = Object.keys(collectionRows);
  
    const tableBlocks = table.result.blockIds.map(
      (id) => table.recordMap.block[id]
    );
  
    const tableData = tableBlocks.filter(
      (b) =>
        b.value && b.value.properties && b.value.parent_id === value.id
    );

    const rows = [];

    for (const td of tableData) {
        let row = { id: td.value.id };
    
        for (const key of collectionColKeys) {
          const val = td.value.properties[key];
          if (val) {
            const schema = collectionRows[key];
            row[schema.name] = getNotionValue(val, schema.type);
            if (schema.type === "person" && row[schema.name]) {
              const users = await getUsers(row[schema.name]);
              row[schema.name] = users;
            }
          }
        }
        rows.push(row);
      }
    
      return { rows, schema: collectionRows };

}

module.exports = {loadTable}