import DynamoDbService from "../AWS/DynamoDb/DybamoDbService";
import * as Environment from '../Utils/Environment';
import EnvironmentNotSetError from "../Models/Exceptions/EnvironmentNotSetError";
import DynamoDbOptions from "../AWS/DynamoDb/DynamoDbOptions";
import ResponseBase from "../Models/ResponseBase";
import HTTPRequest from "../Models/HTTPRequest";
import QueryKeys from "../AWS/Models/QueryKeys";
/**
 * Base class for all controllers
 */
export default abstract class ControllerBase {
    public getDynamoDbService(table: string, index: string = '', sortAscending: boolean = false): DynamoDbService {
        // Read region and table from environment
        const region: string = Environment.getRegion() ;

        if(region === '' || table === ''){
            throw new EnvironmentNotSetError(this.getEnvrionmentVariableNotSetResponse(region, table));
        }
        // Save to dynamodb
        const dynamoDbOptions: DynamoDbOptions = {
            Region : region,
            TableName: table,
            IndexName: index,
            SortAscending: sortAscending,
            AccessKey : process.env.AccessKey,
            Secret: process.env.Secret
        };
        const dynamoDbService: DynamoDbService = new DynamoDbService(dynamoDbOptions);
        return dynamoDbService;
   }

   protected getEnvrionmentVariableNotSetResponse(region, table) {
    var errorResponse: ResponseBase = new ResponseBase();
    errorResponse.isSuccess = false;
    errorResponse.error = `Set REGION and table environment variables. Current values are:
                           REGION: ${region}
                           table: ${table}`;
    return errorResponse;
    }
   
    protected getQueryKeys(request: HTTPRequest) : QueryKeys {
        const queryKeys: QueryKeys = new QueryKeys();
        const keys = Object.keys(request.pathParameters);
        keys.forEach((key) => {
            queryKeys.addKey({key: key, value: request.pathParameters[key]});
        });
        return queryKeys;
    }
}