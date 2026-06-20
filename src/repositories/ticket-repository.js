const CrudRepository = require('./crud-repository');
const {Ticket} = require('../models')
const {ENUM}=require('../utils/common');
class TicketRepository extends CrudRepository{
    constructor()
    {
        super(Ticket);
    }   
    async getPendingTickets(){
        const resposne = await Ticket.findAll({
            where :{
                status: ENUM.NOTI_STATUS.PENDING
            }
        });
     return response;
    }
}

module.exports=TicketRepository