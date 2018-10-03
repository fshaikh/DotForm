/**
 * For a Lambda function's response to be handled the by API Gateway, it must return a response in this format:
{
    "isBase64Encoded": true|false,
    "statusCode": httpStatusCode,
    "headers": { "headerName": "headerValue", ... },
    "body": "..."
}
 */
export default interface APIGatewayResponse {
    /**
     * HTTP Status Code interpreted by the API Gateway that is returned
     *  to the caller of the API method.
     */
    statusCode: number;
    /**
     *  JSON string using JSON.stringify
     */
    body: string;
    /**
     * field is important if you're working with binary data; if you don't use this field, 
     * it should be set to a Boolean value of false.
     */
    isBase64Encoded: boolean;
    /**
     * collected and sent back with the API Gateway response.
     */
    headers: any;
}