const Responses = require('../common/API_Responses');
const Dynamo = require('../common/Dynamo');

const tableName = process.env.tableName

exports.handler = async event => {
    console.log('event', event)

    if(!event.pathParameters || !event.pathParameters.game) {
        //failded without game
        return Responses._400({ message: 'missing the ID from the path'})
    }

    const game = event.pathParameters.game;

    const params = {
        tableName,
        index: 'game-index',
        queryKey: 'game',
        queryValue: game
    }
    
    const gamePlayers = await Dynamo.query(params);
    
    return Responses._200(gamePlayers);
}