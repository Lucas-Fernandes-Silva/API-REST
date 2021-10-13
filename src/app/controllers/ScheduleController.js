import Appointment from '../models/Appointment';
import { startOfDay, endOfDay, parseISO } from 'date-fns';
import User from '../models/User';
import { Op } from 'sequelize';


class ScheduleController {
    async index(req, res){
        const CheckUserProvider = await User.findOne({
            where:{ id: red.userId, provider: true },
        });

        if(!CheckUserProvider){
            return res.status(401).json({ error : 'User is not Provider' });
        }

        const { date } = req.query;
        const parsedDate = parseIso(date);

        const appointments = await Appointment.findAll({
            where: {
                provider: req.UserId,
                canceled_at: null,
                date:{
                    [Op.between]: [
                        startOfDay(parsedDate), endOfDay(parsedDate)
                    ],
                }, 
              },
              order: ['date'],
        });

        return res.json({date});
    }
}

export default new ScheduleController