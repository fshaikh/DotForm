import DataObjectBase from "../Models/DataObjectBase";

export default interface FormDefinition extends DataObjectBase{
    userId: string;
    formDefinition: any; 
    formName?: string;
    submissionCount?: number;
    lastSubmissionAt?: number;
    isArchive?: boolean;
    isTrash?: boolean;
    isFavorite?: boolean;
}