import FormSubmission from '@reversecurrent/fb-shared/Models/FormSubmission';
import DynamoDbOptions from '@reversecurrent/fb-shared/AWS/DynamoDb/DynamoDbOptions';
import DynamoDbService from '@reversecurrent/fb-shared/AWS/DynamoDb/DybamoDbService';
import ResponseBase from '@reversecurrent/fb-shared/Models/ResponseBase';
import * as Environment from '@reversecurrent/fb-shared/Utils/Environment';
import GetFormSubmissionRequest from '@reversecurrent/fb-shared/Models/GetFormSubmissionRequest';
import GetFormSubmissionResponse from '@reversecurrent/fb-shared/Models/GetFormSubmissionResponse';
import EnvironmentNotSetError from '@reversecurrent/fb-shared/Models/Exceptions/EnvironmentNotSetError';
import HTTPRequest from '@reversecurrent/fb-shared/Models/HTTPRequest';
import HTTPMethodEnum from '@reversecurrent/fb-shared/Models/HTTPMethodEnum';
import QueryKeys from '@reversecurrent/fb-shared/AWS/Models/QueryKeys';
import QueryKey from '@reversecurrent/fb-shared/AWS/Models/QueryKey';

/**
 * 
 * Routes:
 * /formsubmission
    POST (upsert a form submission)

   /formsubmission/{formId}/{id}
     GET (get a form submission by a id)
     DELETE (delete a form submission by a id)

   /formsubmission/{formId}
     GET (get all submissions for a form id)

    fb_formsubmission table design
    Partition Key: formId
    Sort Key : id

    Local Secondary Index:
    PArtition Key: formId
    Sort Key : ModifiedAt 
 */
export default class FormSubmissionController {
    public async handleRoute(httpRequest: HTTPRequest) {
        switch(httpRequest.httpMethod) {
            case HTTPMethodEnum.POST:
                return await this.saveFormSubmission(httpRequest.body);
            case HTTPMethodEnum.GET:
            const keys = Object.keys(httpRequest.pathParameters);
                if(keys.length === 2){
                    return await this.getFormSubmission(httpRequest);
                }
                if(keys.length === 1) {
                    return await this.getFormSubmissions(httpRequest);
                }
            case HTTPMethodEnum.DELETE:
                return await this.deleteFormSubmission(httpRequest);
        }
    }
    public async saveFormSubmission(formSubmission: FormSubmission): Promise<ResponseBase> {
        try{
            const response = await this.getDynamoDbService().save(formSubmission);
            return response;
        }catch(error) {
            return error.Response;
        }
    }

    public async getFormSubmission(request: HTTPRequest): Promise<GetFormSubmissionResponse>{
        var getFormSubmissionResponse: GetFormSubmissionResponse = new GetFormSubmissionResponse();
        try{
            const response: ResponseBase = await this.getDynamoDbService().get(this.getFormSubmissionQueryKeys(request));
            getFormSubmissionResponse.isSuccess = response.isSuccess;
            getFormSubmissionResponse.formSubmission = response.data;
            return getFormSubmissionResponse;
        }catch(error) {
            return error.Response;
        }
    }

    public async getFormSubmissions(request: HTTPRequest): Promise<GetFormSubmissionResponse> {
        var getFormSubmissionResponse: GetFormSubmissionResponse = new GetFormSubmissionResponse();
        try{
            const response: ResponseBase = await this.getDynamoDbService().query(this.getFormSubmissionQueryKeys(request));
            getFormSubmissionResponse.isSuccess = response.isSuccess;
            getFormSubmissionResponse.formSubmission = response.data;
            return getFormSubmissionResponse;
        }catch(error) {
            return error.Response;
        }
    }

    public async deleteFormSubmission(request: HTTPRequest): Promise<ResponseBase> {
        try{
            const key: string = Object.keys(request.pathParameters)[0];
            const value: string = request.pathParameters[key];
            const response: ResponseBase = await this.getDynamoDbService().delete(key, value);
            return response;
        }catch(error){
            return error.Response;
        }
    }

    private getEnvrionmentVariableNotSetResponse(region, formSubmissionTable) {
        var errorResponse: ResponseBase = new ResponseBase();
        errorResponse.isSuccess = false;
        errorResponse.error = `Set REGION and FORMSUBMISSIONTABLE environment variables. Current values are:
                               REGION: ${region}
                               FORMSUBMISSIONTABLE: ${formSubmissionTable}`;
        return errorResponse;
    }

    private getDynamoDbService(): DynamoDbService {
         // Read region and table from environment
         const region: string = Environment.getRegion() ;
         const formSubmissionTable: string = Environment.getFormSubmissionTable();
 
         if(region === '' || formSubmissionTable === ''){
             throw new EnvironmentNotSetError(this.getEnvrionmentVariableNotSetResponse(region, formSubmissionTable));
         }
         // Save to dynamodb
         const dynamoDbOptions: DynamoDbOptions = {
             Region : region,
             TableName: formSubmissionTable,
             IndexName: Environment.getFormSubmissionLSIndex(),
             SortAscending: false,
             AccessKey : process.env.AccessKey,
             Secret: process.env.Secret
         };
         const dynamoDbService: DynamoDbService = new DynamoDbService(dynamoDbOptions);
         return dynamoDbService;
    }

    private getFormSubmissionQueryKeys(request: HTTPRequest) : QueryKeys {
        const queryKeys: QueryKeys = new QueryKeys();
        const keys = Object.keys(request.pathParameters);
        keys.forEach((key) => {
            queryKeys.addKey({key: key, value: request.pathParameters[key]});
        });
        return queryKeys;
    }

   
}