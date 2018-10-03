import DataObjectBase from "../Models/DataObjectBase";

export default interface FormSubmission extends DataObjectBase{
    formId: string;
    formData: any; 
    application?: string;
    metadata?: object;
}