const CrudRepository = require('../repositories/crudrepository');
const AirplaneRepository = require('../repositories/airplanerepository');
const Apperror=require('../utils/errors');
const { StatusCodes } = require('http-status-codes');
const airplaneRepo = new AirplaneRepository();

async function createairplane(data) {
    try {
        const airplane = await airplaneRepo.create(data);
        return airplane;
    } catch (error) {
        throw new Apperror('Some mistake in crud repo',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createairplane
};