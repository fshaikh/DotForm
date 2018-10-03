export default class GetFormsRequest {
    constructor(userId, includeMetadata = false) {
        this.userId = userId;
        this.includeMetadata = includeMetadata;
    }
}