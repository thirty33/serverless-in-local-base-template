const Responses = require('../common/API_Responses');
const Dynamo = require('../common/Dynamo');

const tableName = process.env.tableName

exports.handler = async event => {
    console.log('event', event)

    if(!event.pathParameters || !event.pathParameters.ID) {
        //
        return Responses._400({ message: 'missing the ID from the path'})
    }

    let ID = event.pathParameters.ID;
    const {name} = JSON.parse(event.body);

    const params = {
        tableName,
        primaryKey: 'ID',
        primaryKeyValue: ID,
        updateKey: 'name',
        updateValue: name
    };

    const res = await Dynamo.update(params);

    return Responses._200({  });
}