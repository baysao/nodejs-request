/**
 * Get request and send response when data is processed.
 * @param {Object} request
 * @param {Object} response
 * @param {function} callback
 */
function processRequest(request, response, callback) {
    if(!request.hasOwnProperty("body"))
        throw new Error("Body-parser for express might wasn't included.");

    function _parse(data) {
        data = data || {};

        var parsedData = {};

        parsedData.id = (data.id || "").toString();
        delete data.id;

        parsedData.action = data.webix_operation || "read";
        delete data.webix_operation;

        if(data.hasOwnProperty("webix_move_id")) {
            parsedData.action = "move";
            parsedData.move_id = data.webix_move_id;
            delete data.webix_move_id;
            delete data.webix_move_index;
            delete data.webix_move_parent;
        }

        parsedData.data = data;
        return parsedData;
    }

    var data = request.body,
        counter = 0,
        countResolvers = null,
        resolversData = [];

    function _resolver(data) {
        resolversData.push(data);

        if(countResolvers == null) {
            sendResponse(data, response);
            return;
        }

        counter++;
        if(counter == countResolvers)
            sendResponse(resolversData, response);
    }

    callback(_parse(data), _resolver);
}

/**
 * Send response for data.
 * @param {Object} data - data of response. Contains require property status and optional properties:
 *      error (if status = "error") - object of error,
 *      data (if status = "read") - hash of data,
 *      source_id, target_id (if status != "error"|"read") - ids of handled data.
 * @param {Object} response - object of response
 */
function sendResponse(data, response) {
    var status = data.status;
    if(status == "error") {
        response.json(data.error.message);
        throw data.error;
    }

    if(status == "read") {
        response.json(data.data);
        return;
    }

    var resultData = {
        id: data.source_id,
        newid: data.target_id,
        status: "success"
    };

    response.json(resultData);
}

module.exports = {
    processRequest: processRequest,
    sendResponse: sendResponse
};