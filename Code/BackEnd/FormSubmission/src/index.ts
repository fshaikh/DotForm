import FormSubmission from "@reversecurrent/fb-shared/Models/FormSubmission";
import FormSubmissionController from "./FormSubmissionController";
import ResponseBase from "@reversecurrent/fb-shared/Models/ResponseBase";
import * as AWSAdapter from '@reversecurrent/fb-shared/AWS/AWSAdapter';
import HTTPMethodEnum from '@reversecurrent/fb-shared/Models/HTTPMethodEnum';
import HTTPRequest from "@reversecurrent/fb-shared/Models/HTTPRequest";

/**
 *    For FormSubmission resource, we are writing a single lamdba function.
      FormBuilder Severless backend is as below:
      API Gateway
        /   (Root resource)
        /formsubmission (FormSubmission Sub-resource) =>  fb_FormSubmission Lambda
             POST (upsert formsubmission)
             GET  (get form submission by Id)
             GET  (get all form submissions for a form id)
             DELETE (Delete form submission)
        /formDefinition (FormDefinition sub-resource) =>  fb_FormDefinition Lambda
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

     const controller = new FormSubmissionController(); 
     const response: ResponseBase =  await controller.handleRoute(httpRequest);
     return AWSAdapter.getAPIGatewayResponse(response);
};



(async function(){
    process.env.REGION = 'us-west-2';
    process.env.FORMSUBMISSIONTABLE = 'fb_FormSubmission_1';
   // await handler({httpMethod: 'GET', queryStringParameters:{submissionId: '1234'}},null);
   await submit_dev();
})();



async function submit_dev(){
    process.env.REGION = 'us-west-2';
    process.env.FORMSUBMISSIONTABLE = 'fb_FormSubmission_1';
    process.env.mode = 'dev';
    process.env.AccessKey = '';
    process.env.Secret = '';
    
    await bulkImport();
    
    
}

async function scan() {
    const controller = new FormSubmissionController();
    var request: HTTPRequest = {
        httpMethod: 'GET',
        path: 'form',
        pathParameters: {formId: '0'},
        requestId: '1000'
    };
    const response = await controller.getFormSubmissions(request)
    console.log(response.data)
}

async function bulkImport() {
    const controller = new FormSubmissionController();
    for(let i=0;i<10;i++){
        for(let j=0;j<20;j++){
            var formSubmission: FormSubmission = {
                id: `${i}${j}`,
                formId: `${i}`,
                formData: {
                    firstName: `Furqan-${i}${j}`,
                    lastName: `Shaikh-${i}${j}`
                },
                ModifiedAt: Date.now()
            };
            const response = await controller.saveFormSubmission(formSubmission);
            console.log(response);
        }
    }
}
