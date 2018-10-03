import DynamoDbService from '../AWS/DynamoDb/DybamoDbService';
import DynamoDbOptions from '../AWS/DynamoDb/DynamoDbOptions';
import QueryKey from '../AWS/Models/QueryKey';
import QueryKeys from '../AWS/Models/QueryKeys';
import { CostExplorer } from 'aws-sdk/clients/all';

describe("DynamoDbService", () => {
    it('should construct correct Query Expression Params for one query key', ()=>{
        const dynamoDbService: DynamoDbService = new DynamoDbService({Region: '',TableName: ''});
        var queryKey: QueryKey = {
            key: 'formId',
            value: '0'
        };
        const queryKeys: QueryKeys = new QueryKeys();
        queryKeys.addKey(queryKey);

        const params = dynamoDbService.GetQueryExpressionParams(queryKeys);
        const expectedParams = { ExpressionAttributeValues: { ':formId': '0' },
        KeyConditionExpression: 'formId = :formId' };

        expect(JSON.stringify(params)).toEqual(JSON.stringify(expectedParams));
    });

    it('should construct correct Query Expression Params for two query keys', ()=>{
        const dynamoDbService: DynamoDbService = new DynamoDbService({Region: '',TableName: ''});
        var queryKey1: QueryKey = {
            key: 'formId',
            value: '0'
        };
        var queryKey2: QueryKey = {
            key: 'id',
            value: '00'
        };
        const queryKeys: QueryKeys = new QueryKeys();
        queryKeys.addKey(queryKey1);
        queryKeys.addKey(queryKey2);

        const params = dynamoDbService.GetQueryExpressionParams(queryKeys);
        console.log(params)
        const expectedParams = { ExpressionAttributeValues: { ':formId': '0',':id':'00' },
        KeyConditionExpression: 'formId = :formId AND id = :id' };

        expect(JSON.stringify(params)).toEqual(JSON.stringify(expectedParams));
    });
    it.only("should construct correct Update Expression params",()=>{
        const dynamoDbService: DynamoDbService = new DynamoDbService({Region: '',TableName: ''});
        const params = dynamoDbService.GetUpdateExpressionParams({"isTrash": true, "submissionCount": 2});
        console.log(params);
        const expectedParams = {
                                ExpressionAttributeNames: {'#isTrash': 'isTrash','#submissionCount': 'submissionCount' },
                                ExpressionAttributeValues: {':isTrash': true, ':submissionCount': 2},
                                UpdateExpression: 'SET #isTrash = :isTrash, #submissionCount = :submissionCount'};
        expect(JSON.stringify(params)).toEqual(JSON.stringify(expectedParams));
    });
    
});