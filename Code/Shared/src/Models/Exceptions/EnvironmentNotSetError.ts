import ResponseBase from '../ResponseBase';

export default class EnvironmentNotSetError extends Error {
    constructor(public Response: ResponseBase){
        super();
    }


}