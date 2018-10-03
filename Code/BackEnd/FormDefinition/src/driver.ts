import FormDefinitionController from "./FormDefinitionController";
import HTTPRequest from "@reversecurrent/fb-shared/Models/HTTPRequest";
import FormDefinition from "@reversecurrent/fb-shared/Models/FormDefinition";

(async function(){
   await submit_dev();
})();



async function submit_dev(){
    process.env.REGION = 'us-west-2';
    process.env.FORMSUBMISSIONTABLE = 'fb_FormDefinition';
    process.env.mode = 'dev';
    process.env.AccessKey = 'AKIAJPLIQJIEVQ7RZBKA';
    process.env.Secret = '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';
    
    await bulkImport();
    
    
}


async function bulkImport() {
    const controller = new FormDefinitionController();
    for(let i=0;i<3;i++){
        for(let j=0;j<10;j++){
            var formDefinition = {
                id: `${i}${j}`,
                userId: `${i}`,
                formDefinition: {
                    'rows':[
                        {}
                    ]
                },
                formName: `Form-${i}-${j}`,
                submissionCount: 0,
                isArchive: false,
                isTrash: false,
                isFavorite: false,
                CreatedAt: Date.now(),
                ModifiedAt: Date.now()
            };
            const response = await controller.saveFormDefinition(formDefinition);
            console.log(response);
        }
    }
}