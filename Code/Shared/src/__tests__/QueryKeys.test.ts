import QueryKey from '../AWS/Models/QueryKey';
import QueryKeys from '../AWS/Models/QueryKeys';

describe('QueryKeys',()=>{
    it('should add query key', () => {
        var queryKey: QueryKey = {
            key: 'formId',
            value: '0'
        };
        const queryKeys: QueryKeys = new QueryKeys();
        queryKeys.addKey(queryKey);
        expect(queryKeys.getCount()).toEqual(1);
    });

    it('should return single key in correct format', () =>{
        var queryKey: QueryKey = {
            key: 'formId',
            value: '0'
        };
        const queryKeys: QueryKeys = new QueryKeys();
        queryKeys.addKey(queryKey);

        const keys = queryKeys.getQueryKeys();
        const expectedKeys = {
            Key: {
                formId: '0'
            }
        };
        expect(JSON.stringify(keys)).toEqual(JSON.stringify(expectedKeys));
    });

    it('should return multiple key in correct format', () =>{
        var queryKey1: QueryKey = {
            key: 'formId',
            value: '0'
        };

        var queryKey2: QueryKey = {
            key: 'id',
            value: '1234'
        };
        const queryKeys: QueryKeys = new QueryKeys();
        queryKeys.addKey(queryKey1);
        queryKeys.addKey(queryKey2);

        const keys = queryKeys.getQueryKeys();
        const expectedKeys = {
            Key: {
                formId: '0',
                id: '1234'
            }
        };
        expect(JSON.stringify(keys)).toEqual(JSON.stringify(expectedKeys));
    });
});