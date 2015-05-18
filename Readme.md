npm package webix-request.
================================

Handling communication between [webix-data] (https://github.com/webix-hub/nodejs-data) package and client side.
This package is part of webix-data package.

How to use
-----------

### Installation

```sh
npm install webix-request
```

### API

```js
//Init handler.
var webix_request = require("webix-request");
```

```js
//Handle request object and send result to client.
webix_request.processRequest(request, response, callback);
```

- request - object of request.
- response - object of response.
- callback - function which provide request data and function - resolver.

Request data in callback has next parameters: 

- id - field 'id' from request body,
- status - status of data, it's determined by request body field "webix_operation" else set "read".
    For change order operation needed field "webix_move_id" from request body with id of data,
    and request data parameter 'status' will be set "move".
- data - request body data without fields "webix_operation" and "id".
 
Resolver has one parameter - hash of data. This data will be send to client.


```js
//Send data to client.
webix_request.sendResponse(data, response);
```

- data - data of response. Contains require property 'status' and optional properties:
    - error (if status = "error") - object of error,
    - data (if status = "read") - hash of data,
    - source_id, target_id (if status != "error"|"read") - ids of handled data.
- response - object of response.

Method send json to client:
    - for status = "error" - error message,
    - for status = "read" - data,
    - for other - object like {id: data.source_id, newid: data.target_id, status: "success"}

That is it.

License
----------

Webix is published under the GPLv3 license.

All other code is released under the MIT License:

Copyright (c) 2015

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
