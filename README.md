<p align="center">
  <img width="460" height="300" src="https://github.com/maddygoround/notionedge/blob/master/image.png">
</p>

![API Version](https://badgen.net/badge/API%20Version/v1/green)

A **serverless wrapper** for the private Notion API. It provides fast and easy access to your Notion content.
Ideal to use Notion your CMS.

The API is designed to be hosted on lamdba@edge. You can test the api on hosted version of this project on [`https://notionedge.zoop.sh/`](https://notionedge.zoop.sh/).You can also host it yourself. Lambda@Edge does not offer any free plan. Yet the cost of lambda is very nominal.

_Use with caution. This is based on the private Notion API. We can not gurantee it will stay stable._

## Features

🍭 **Easy to use** – Receive Notion data with a single GET request

🗄 **Table Access** – Get structured data from tables & databases

🛫 **CORS Friendly** – Access your data where you need it

✨ **Easy to Extend** – Add your own routes as per your needs.

## Use Cases

- Use it as data-source for blogs and documentation. Create a table with pages and additional metadata. Query the `/tables` endpoints everytime you want to render a list of all pages.

## Endpoints

### Load page data

`/v1/pages/<PAGE_ID>`

Returns all block data for a given page.
For example, you can render this data with [`react-notion`](https://github.com/splitbee/react-notion).

[`https://notionedge.zoop.sh/v1/pages/2e22de6b770e4166be301490f6ffd420`](https://notionedge.zoop.sh/v1/pages/2e22de6b770e4166be301490f6ffd420)

### Load data from table

`/v1/tables/<PAGE_ID>`

[`https://notionedge.zoop.sh/v1/tables/20720198ca7a4e1b92af0a007d3b45a4`](https://notionedge.zoop.sh/v1/tables/20720198ca7a4e1b92af0a007d3b45a4)

## Authentication for private pages

All public pages can be accessed without authorization. If you want to fetch private pages there are two options.
- You can set the `Authorization: Bearer <NOTION_TOKEN>` header to authorize your requests.

### Receiving the token
To obtain your token, login to Notion and open your DevTools and find your cookies. There should be a cookie called `token_v2`, which is used for the authorization.

## Deployment
Deployment is done using serverless. Serverless yml exists in the project directory. You need use serverless profile to provide aws credentails / profile.

## Routes
Routes are written using a modified version of [jeremydaly/lambda-api](https://github.com/jeremydaly/lambda-api). The library is changed to support Lambda@edge Events.

You can find the library code under [./http](https://github.com/maddygoround/notionedge/tree/master/http)

The code recognize the routes using manifest file.

## Credits
- [splitbee](https://github.com/splitbee/notion-api-worker) – Idea, Documentation and Code
- [jeremydaly](https://github.com/jeremydaly/lambda-api) – Code

