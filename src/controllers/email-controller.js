const { StatusCodes } = require('http-status-codes');
const { EmailService } = require('../services');

async function create(req, res) {
    try {
        const response = await EmailService.createTicket({
            subject: req.body.subject,
            content: req.body.content,
            recepientEmail: req.body.recepientEmail
        });

        return res.status(StatusCodes.OK).json({
            success: true,
            message: 'Successfully created ticket',
            data: response
        });

    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = {
    create
};