const fetch  =  require('node-fetch');
const { API_ENDPOINT } = require('./constants');

const call = async (resource, body , token ) => {
      const res = await fetch(`${API_ENDPOINT}/${resource}`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          ...(token && { cookie: `token_v2=${token}` }),
        },
        body: JSON.stringify(body),
      })
    
      if (res.ok) {
        return res.json()
      } else {
        throw new Error(await getError(res))
      }
};


const getError = async (res) => {
    return `Notion API error (${res.status}) \n${getJSONHeaders(
      res
    )}\n ${await getBodyOrNull(res)}`
  }
  
 const getJSONHeaders = (res) => {
    return JSON.stringify(res.headers.raw())
  }
  
const getBodyOrNull = (res) => {
    try {
      return res.text()
    } catch (err) {
      return null
    }
  }
  
 const values = (obj) => {
    const vals = []
  
    Object.keys(obj).forEach(key => {
      vals.push(obj[key])
    });

    return vals
  }
  
  module.exports = {call,values}
