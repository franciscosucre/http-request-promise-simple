# **http-request-promise-simple**

Dependency-less http methods for pure nodejs. Wraps the [nodejs http module](https://nodejs.org/api/http.html) in promises and handles some of the request events (like building the request body).


**How to install**
----------
```shell
npm install --save http-request-promise-simple
```

**Methods**
----------

All methods recieve an **options** parameter, this corresponds to the [node http request options](https://nodejs.org/api/http.html#http_http_request_options_callback).

Some methods can be passed a **data** parameter, this corresponds to the request body. This can be passed as an object or a JSON string.

- **request(options):** A generic http request, it uses by default the get method but can be used to make any type of request.

- **get(options):** A wrapper for the request method that forces the request to be of the GET type.

- **head(options):** A wrapper for the request method that forces the request to be of the HEAD type.

- **options(options):** A wrapper for the request method that forces the request to be of the OPTIONS type.

- **connect(options):** A wrapper for the request method that forces the request to be of the CONNECT type.

- **trace(options):** A wrapper for the request method that forces the request to be of the TRACE type.

- **post(options, data):** A wrapper for the request method that forces the request to be of the POST type.

- **put(options, data):** A wrapper for the request method that forces the request to be of the PUT type.

- **patch(options, data):** A wrapper for the request method that forces the request to be of the PATCH type.

- **deleteRequest(options):** A wrapper for the request method that forces the request to be of the DELETE type.

**Example - Promise**
----------

```javascript
const http = require('http-request-promise-simple')
return http.get({
        hostname: 'localhost',
        path: '/foo/bar',
        port: 8080,
    })
    .then(res => console.info(res.status))
    .catch(error => console.error(error));
```

**Example - Async/Await**
----------

```javascript
const http = require('http-request-promise-simple')
const res = await http.get({
        hostname: 'localhost',
        path: '/foo/bar',
        port: 8080,
    });
```