import ResponseBase from "../Models/ResponseBase";
import HTTPRequest from '../Models/HTTPRequest';
import HTTPMethodEnum from '../Models/HTTPMethodEnum';

export const getAPIGatewayResponse = (response: ResponseBase) => {
    return {
        "statusCode": response.isSuccess ? 200 : 500,
        "headers":{
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Credentials": true
        },
        "body": JSON.stringify(response),
        "isBase64Encoded": false
    }
};

export const getHTTPRequest = (event) => {
    var httpRequest: HTTPRequest = {
        httpMethod: event.httpMethod,
        path: event.path,
        requestId: event.requestId,
        queryString: event.queryStringParameters,
        pathParameters: event.pathParameters
     };
     const body = event.body 
     switch(event.httpMethod){
         case HTTPMethodEnum.POST:
            httpRequest.body = JSON.parse(body);
            httpRequest.httpMethod = HTTPMethodEnum.POST;
            break;
        case HTTPMethodEnum.GET:
            httpRequest.httpMethod = HTTPMethodEnum.GET;
            break;
        case HTTPMethodEnum.PATCH:
            httpRequest.body = JSON.parse(body);
            httpRequest.httpMethod = HTTPMethodEnum.PATCH;
            break;
        case HTTPMethodEnum.DELETE:
            httpRequest.httpMethod = HTTPMethodEnum.DELETE;
            break;
     }

     return httpRequest;
};