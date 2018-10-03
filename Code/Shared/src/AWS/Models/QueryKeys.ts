import QueryKey from "./QueryKey";

export default class QueryKeys {
    private queryKeys: Array<QueryKey> = [];

    constructor(){
        this.queryKeys = [];
    }
    public addKey(queryKey: QueryKey): void{
        this.queryKeys.push(queryKey);
    }

    public getQueryKeys(){
        var key = {};
        key['Key'] = {};
        this.queryKeys.forEach((queryKey: QueryKey) => {
            key['Key'][queryKey.key] = queryKey.value;
        });
        return key;
    }

    public getData(){
        return this.queryKeys;
    }

    public getCount(): number {
        return this.queryKeys.length;
    }
}