import HTTPRequest from '@reversecurrent/fb-shared/Models/HTTPRequest';
import HTTPMethodEnum from '@reversecurrent/fb-shared/Models/HTTPMethodEnum';
import DynamoDbService from '@reversecurrent/fb-shared/AWS/DynamoDb/DybamoDbService';
import ResponseBase from '@reversecurrent/fb-shared/Models/ResponseBase';
import * as Environment from '@reversecurrent/fb-shared/Utils/Environment';
import FormDefinition from '@reversecurrent/fb-shared/Models/FormDefinition';
import DeleteModel from '@reversecurrent/fb-shared/Models/DeleteModel';
import ControllerBase from '@reversecurrent/fb-shared/Classes/ControllerBase';

export default class FormDefinitionController extends ControllerBase{
    public async handleRoute(httpRequest: HTTPRequest) {
        switch(httpRequest.httpMethod) {
            case HTTPMethodEnum.POST:
                return await this.saveFormDefinition(httpRequest.body);
            case HTTPMethodEnum.GET:
                const keys = Object.keys(httpRequest.pathParameters);
                if(keys.length === 1) {
                    return await this.getFormDefinitionsForUser(httpRequest);
                }
            case HTTPMethodEnum.DELETE:
                return await this.deleteFormDefinition(httpRequest);
            case HTTPMethodEnum.PATCH:
                return await this.updateFormDefinition(httpRequest);
        }
    }

    public async saveFormDefinition(formDefinition: FormDefinition) : Promise<ResponseBase> {
        try{
            const service = super.getDynamoDbService(Environment.getFormDefinitionTable())
            const response = await service.save(formDefinition);
            return response;
        }catch(error) {
            return error.Response;
        }
    }

    public async getFormDefinitionsForUser(httpRequest: HTTPRequest): Promise<ResponseBase> {
        try{
            const service: DynamoDbService = super.getDynamoDbService(Environment.getFormDefinitionTable(),Environment.getFormDefinitionModifiedAtIndex())
            const response: ResponseBase = await service.query(super.getQueryKeys(httpRequest));
            return response;
        }catch(error){
            console.log(error);
            return error.response;
        }
    }

    public async deleteFormDefinition(httpRequest: HTTPRequest): Promise<ResponseBase>{
        try{
            const service = super.getDynamoDbService(Environment.getFormDefinitionTable());
            return await service.delete(super.getQueryKeys(httpRequest));
        }catch(error){
            console.log(error);
            return error.response;
        }
    }

    public async updateFormDefinition(httpRequest: HTTPRequest): Promise<ResponseBase> {
        try{
            const service = super.getDynamoDbService(Environment.getFormDefinitionTable());
            return await service.update(super.getQueryKeys(httpRequest), httpRequest.body);
        }catch(error){
            console.log(error);
            return error.response;
        }
    }
}