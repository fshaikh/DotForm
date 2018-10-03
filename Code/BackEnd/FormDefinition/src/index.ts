import FormSubmission from "@reversecurrent/fb-shared/Models/FormSubmission";
import FormDefinitionController from "./FormDefinitionController";
import ResponseBase from "@reversecurrent/fb-shared/Models/ResponseBase";
import * as AWSAdapter from '@reversecurrent/fb-shared/AWS/AWSAdapter';
import HTTPMethodEnum from '@reversecurrent/fb-shared/Models/HTTPMethodEnum';
import HTTPRequest from "@reversecurrent/fb-shared/Models/HTTPRequest";

/**
 *    For FormDefinition resource, we are writing a single lamdba function.
      FormBuilder Severless backend is as below:
      API Gateway
        /   (Root resource)
        /formdefinition (FormDefinition Sub-resource) =>  fb_FormDefinition Lambda
             POST (upsert formdefinition)
             GET  (get form definition by Id)
             GET  (get all form definitions for a user id)
             DELETE (Delete form definition)
             PATCH (Update part of form definition by form id)
        /formSubmission (FormSubmission sub-resource) =>  fb_FormSubmission Lambda
        /users          (User sub-resource)
        Stage
           Beta
           Prod
 * @param event - When the handler is invoked from API Gateway, event object contains
                  request, http method, headers, query string, api key, body ,etc.
 * @param context - Client specific context information
 */
export const handler = async (event, context) =>  {
    console.log(event);
     // Each resource action (HTTP Method) will be handled by a separate handler.
     // We need to write custom routing here
     var httpRequest: HTTPRequest = AWSAdapter.getHTTPRequest(event);

     const controller = new FormDefinitionController(); 
     const response: ResponseBase =  await controller.handleRoute(httpRequest);
     return AWSAdapter.getAPIGatewayResponse(response);
};