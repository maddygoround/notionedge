const { call, values } = require('./call');
const { parsePageId } = require('./helpers/utils');

const loadPageChunk = ({
  pageId,
  limit = 100,
  cursor = { stack: [] },
  chunkNumber = 0,
  verticalColumns = false,
}, token) => {
  return call('loadPageChunk', {
    pageId: parsePageId(pageId),
    limit,
    cursor,
    chunkNumber,
    verticalColumns,
  }, token);
};

const getPageData = async (pageId, token) => {
  try {
    const data = await loadPageChunk({ pageId }, token);
    const blocks = values(data.recordMap.block);

    if (blocks[0] && blocks[0].value.content) {
      blocks.splice(0, 3);
    }

    return { blocks };
  } catch (err) {
    console.error(`Failed to load pageData for ${pageId}`, err);
    return { blocks: [] };
  }
};

module.exports = { getPageData, loadPageChunk };