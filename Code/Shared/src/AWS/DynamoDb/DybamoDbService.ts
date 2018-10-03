/**
 * Provides abstracion over DynamoDB
 */
import AWS = require('aws-sdk/global');
import DyanmoDb = require('aws-sdk/clients/dynamodb');
import { DynamoDB } from 'aws-sdk/clients/all';
import DynamoDbOptions from './DynamoDbOptions';
import { PutItemInput, PutItemOutput } from 'aws-sdk/clients/dynamodb';
import ResponseBase from '../../Models/ResponseBase';
import QueryKeys from '../Models/QueryKeys';
import QueryKey from '../Models/QueryKey';



 export default class DynamoDbService {
     constructor(private options: DynamoDbOptions) {

     }

     public async save(item: any): Promise<ResponseBase> {
        return new Promise<ResponseBase>((resolve,reject)=>{
            var response: ResponseBase = new ResponseBase();
            const connector = this.GetDynamoDbConnector();
            const dbItem = Object.assign({},this.GetDbItem(), {Item: item});
            connector.put(dbItem)
                     .promise()
                     .then((putItemOutput: PutItemOutput) => {
                        resolve(response);
                     })
                     .catch((error) => {
                        response.isSuccess = false;
                        response.error = error;
                        resolve(response);
                     });
        });
     }

     public async get(queryKeys: QueryKeys): Promise<ResponseBase> {
        return new Promise<ResponseBase>((resolve,reject)=>{
            var response: ResponseBase = new ResponseBase();
            const connector = this.GetDynamoDbConnector();
            const dbItem = Object.assign({},this.GetDbItem(), queryKeys.getQueryKeys());

            connector.get(dbItem)
                     .promise()
                     .then((getItemOutput: DynamoDB.DocumentClient.GetItemOutput) => {
                        response.data = getItemOutput.Item;
                        resolve(response);
                     })
                     .catch((error) => {
                         console.log(error);
                        response.isSuccess = false;
                        response.error = error;
                        resolve(response);
                     });
        });
     }

     public async query(queryKeys: QueryKeys): Promise<ResponseBase>{
         return new Promise<ResponseBase>((resolve, reject) => {
            var response: ResponseBase = new ResponseBase();
            const connector = this.GetDynamoDbConnector();

            const dbItem = Object.assign({},
                                         this.GetDbItem(),
                                         {ScanIndexForward : this.options.SortAscending},
                                         this.GetQueryExpressionParams(queryKeys));
            connector.query(dbItem)
                     .promise()
                     .then((queryOutput: DynamoDB.DocumentClient.QueryOutput)=>{
                         console.log(queryOutput);
                        response.data = queryOutput.Items;
                        resolve(response);
                     })
                     .catch((error) => {
                        console.log(error);
                       response.isSuccess = false;
                       response.error = error;
                       resolve(response);
                    });
         });

     }

     public async update(queryKeys: QueryKeys, item: any) : Promise<ResponseBase> {
         return new Promise<ResponseBase>((resolve,reject) => {
            var response: ResponseBase = new ResponseBase();
            const connector = this.GetDynamoDbConnector();
            const dbItem = Object.assign({},
                                           this.GetDbItem(),
                                           queryKeys.getQueryKeys(),
                                           this.GetUpdateExpressionParams(item));
            connector.update(dbItem)
                     .promise()
                     .then((output) => {
                         console.log(output);
                         resolve(response);
                     })
                     .catch((error) => {
                        console.log(error);
                        response.isSuccess = false;
                        response.error = error;
                        resolve(response);
                     })
         });
     }

     public async delete(queryKeys: QueryKeys): Promise<ResponseBase> {
         return new Promise<ResponseBase>((resolve,reject)=>{
            var response: ResponseBase = new ResponseBase();
            const connector = this.GetDynamoDbConnector();
            const dbItem = Object.assign({}, this.GetDbItem(), queryKeys.getQueryKeys());
            connector.delete(dbItem)
                     .promise()
                     .then((deleteItemOutput: DynamoDB.DocumentClient.DeleteItemOutput) => {
                         resolve(response);
                     })
                     .catch((error) => {
                         response.isSuccess = false;
                         response.error = error;
                         resolve(response);
                     })
         });
     }

     private GetDynamoDbConnector() {
         return process.env.mode === 'dev' ?
            new DynamoDB.DocumentClient({
                region: this.options.Region,
                accessKeyId : this.options.AccessKey,
                secretAccessKey : this.options.Secret
            }):
            new DynamoDB.DocumentClient({
                region: this.options.Region
            });
         
     }

     private GetDbItem(): any {
         return {
                TableName: this.options.TableName,
                IndexName: this.options.IndexName ,
                ReturnConsumedCapacity: "TOTAL"
                
         };
     }

     public GetQueryExpressionParams(queryKeys: QueryKeys) {
        const data = queryKeys.getData();
        var expressionParams = {};
        var keyConditionExpression = '';
        for (let index = 0; index < data.length; index++) {
            const element: QueryKey = data[index];
            expressionParams[`:${element.key}`] = element.value;
            keyConditionExpression += `${element.key} = :${element.key}`;
            if(index !== data.length - 1){
                keyConditionExpression += ' AND ';
            }
        }
        return { 
                    ExpressionAttributeValues : expressionParams,
                    KeyConditionExpression : keyConditionExpression
         };
     }

     public GetUpdateExpressionParams(item: any) {
         var expressionAttributeNames = {};
         var expressionAttributeValues = {};
         var updateExpression = 'SET ';
         const length = Object.keys(item).length;
         var index = 0;
        Object.keys(item).forEach((key) => {
            const propertyValue = item[key];
            const attributeNameKey = `#${key}`;
            const attributeValueKey = `:${key}`
            expressionAttributeNames[attributeNameKey] = key;
            expressionAttributeValues[attributeValueKey] = propertyValue;
            updateExpression += `${attributeNameKey} = ${attributeValueKey}`;
            if(index !== length - 1){
                updateExpression += ' , ';
            }
            index++;
        });
        return {
            ExpressionAttributeNames: expressionAttributeNames,
            ExpressionAttributeValues: expressionAttributeValues,
            UpdateExpression:updateExpression
        };
     }
 }