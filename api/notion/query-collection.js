const {call} = require('./call');

const queryCollection = ({
  collectionId,
  collectionViewId,
  loader = {},
  query = {},
},token)  =>{
  
  const {
    limit = 999, // TODO: figure out Notion's way of handling pagination
    loadContentCover = true,
    type = 'table',
    userLocale = 'en',
    userTimeZone = 'America/Phoenix',
  } = loader

  const {
    aggregate = [
      {
        aggregation_type: 'count',
        id: 'count',
        property: 'title',
        type: 'title',
        view_type: 'table',
      },
    ],
    filter = [],
    filter_operator = 'and',
    sort = [],
  } = query

  return call('queryCollection', {
    collectionId,
    collectionViewId,
    loader: {
      limit,
      loadContentCover,
      type,
      userLocale,
      userTimeZone,
    },
    query: {
      aggregate,
      filter,
      filter_operator,
      sort,
    },
  },token)
}

module.exports = { queryCollection };