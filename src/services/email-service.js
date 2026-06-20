const {TicketRepository} = require('../repositories');
const {AppError}=require('../utils/errors')
const {Ticket} = require('../models')
const {MAILER} = require('../config')
const ticketRepo = new TicketRepository();
const { StatusCodes } = require('http-status-codes');
const {ENUM}=require('../utils/common');

async function sendEmail(mailFrom,mailTo,subject,text) {
    try {
        const response = await MAILER.sendMail({
            from:mailFrom,
            to:mailTo,
            subject:subject,
            text:text
        });
        if(!response){
            throw new AppError('Incorrect Details',StatusCodes.BAD_REQUEST);
        }
        return response;
    } catch (error) {
        if(error instanceof AppError) throw error;
        throw new AppError(
            'Something went wrong',
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}

async function createTicket(data) {
    try {
        const response = await ticketRepo.create(data);
        if(!response){
            throw new AppError('Incorrect Details',StatusCodes.BAD_REQUEST);
        }
        return response
    } catch (error) {
        if(error instanceof AppError) throw error;
        throw new AppError(
            'Something went wrong',
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}

async function getPendingEmails() {
    try {
        const response = await ticketRepo.getPendingTickets();
        if(!response){
            throw new AppError('data not found',StatusCodes.NOT_FOUND);
        }
        return response;
    } catch (error) {
        if(error instanceof AppError) throw error;
        throw new AppError(
            'Something went wrong',
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}
module.exports={
    sendEmail,
    createTicket,
    getPendingEmails
}