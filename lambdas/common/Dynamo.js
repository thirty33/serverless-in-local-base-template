const AWS = require('aws-sdk');

AWS.config.update({
    region: 'us-east-1',
    endpoint: 'http://localhost:8089',
    accessKeyId: '-',
    secretAccessKey: '-'
});

let options = {
    region: 'localhost',
    endpoint: 'http://localhost:8089',
};

const documentClient = new AWS.DynamoDB.DocumentClient(options);
// const documentClient = new AWS.DynamoDB.DocumentClient();


const Dynamo = {
    
    get: async (ID, TableName) => {

        console.log('credential', AWS.config.credentials);
        
        const params = {
            TableName,
            Key: {
                ID
            }
        };

        const data = await documentClient
            .get(params)
            .promise()
        
        if(!data || !data.Item) {
            throw Error(`There was an error fetching the data for id of ${ID} from ${TableName}}`);
        }

        console.log(data);

        return data.Item;
    },

    write: async (data, TableName) => {

        if (!data.ID) {
            throw Error('no ID on the data')
        }

        const params = {
            TableName,
            Item: data
        };

        console.log('this is params', params);

        const res = await documentClient.put(params).promise();

        if(!res) {
            throw Error(`There was an error inserting ID of ${data.ID} into table ${TableName}`)
        }

        return data;
    },

    update: async ({tableName, primaryKey, primaryKeyValue, updateKey, updateValue}) => {

        const params = {
            TableName: tableName,
            Key: { 
                [primaryKey]: primaryKeyValue 
            },
            UpdateExpression: `set #${updateKey} = :updateValue`,
            ExpressionAttributeNames: {
                [`#${updateKey}`] : `${updateKey}`,
            },
            ExpressionAttributeValues: {
                ':updateValue': updateValue
            },
            ReturnValues: 'UPDATED_NEW'
        }
        return documentClient.update(params).promise()

    },

    query: async({tableName, index, queryKey, queryValue}) => {

        const params = {
            TableName: tableName,
            IndexName: index,
            KeyConditionExpression: `#${queryKey} = :hkey`,
            ExpressionAttributeNames: {
                [`#${queryKey}`] : `${queryKey}`,
            },
            ExpressionAttributeValues: {
                ':hkey': queryValue
            },
        }
        
        const res = await documentClient.query(params).promise();
        
        return res.Items || [];
    }
}

module.exports = Dynamo;

