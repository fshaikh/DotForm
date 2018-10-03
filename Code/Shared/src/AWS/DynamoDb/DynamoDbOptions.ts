import AWSOptions from '../Models/AWSOptions';

export default interface DynamoDbOptions extends AWSOptions {
    TableName: string;
    IndexName?: string;
    AccessKey?: string;
    Secret?: string;
    SortAscending?: boolean;
}