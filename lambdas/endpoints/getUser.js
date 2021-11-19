const Responses = require('../common/API_Responses');

exports.handler = async event => {
    console.log('event', event)

    if(!event.pathParameters || !event.pathParameters.ID) {
        //
        return Responses._400({ message: 'missing the ID from the path'})
    }

    let ID = event.pathParameters.ID;

    if(data[ID]) {
        //return the data
        return Responses._200(data[ID])
    }

    //failed ad ID not in the data
    return Responses._400({ message: 'no ID in data' })

}

const data = {
    1234: { name: 'Anna Jones', age: 26, job: 'journalist' },
    7893: { name: 'Anna Jones', age: 25, job: 'journalist' },
    5132: { name: 'Anna Jones', age: 25, job: 'journalist' }
}