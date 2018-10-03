import HTTPMethodEnum from './HTTPMethodEnum'
/**
 * Represents a HTTP Request
 */
export default interface HTTPRequest {
    httpMethod?: HTTPMethodEnum;
    body?: any;
    headers?: any;
    apiKey?: string;
    queryString?: any;
    path: string;
    requestId: string;
    pathParameters? : any;
}