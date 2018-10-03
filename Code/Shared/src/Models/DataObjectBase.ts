export default interface DataObjectBase {
    id: string;
    CreatedAt?: number;
    ModifiedAt?: number;
    application?: string;
    metadata?: object;
}