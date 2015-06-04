/**
 * Get request and send response when data is processed.
 * @param {Object} request
 * @param {Object} response
 * @param {function} callback
 */
function processRequest(state, callback) {
    var request = state.request,
        response = state.response;

    if(!request.hasOwnProperty("body"))
        throw new Error("You need to enable body parser for express.");

    var data = (request.method == "GET") ? request.query : request.body;

    callback(parseData(data), function(result) {
        sendResponse(result, response);
    });
}

function parseData(data) {
    data = data || {};

    var parsedData = {};
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

    response.json({
        id: data.source_id,
        status: "success"
    });
}

module.exports = {
    processRequest: processRequest,
    sendResponse: sendResponse
};