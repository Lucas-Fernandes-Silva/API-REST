import { format, parseIso } from 'date-fns';
import Mail from '../../lib/Mail';
import pt from 'date-fns/locale/pt';


class CancellationMail{
    get key(){
        return 'CancellationMail';
    }

    async handle({ data }){
        const { appointment } = data;

        console.log('A fila executou');

        await Mail.sendMail({
            to: `${appointment.provider.name} <${appointment.provider.email}>`,
            subject: 'Cancel',
            template: 'Cancel Appointment',
            context: {
                provider: appointment.provider.name,
                user: appointment.user.name,
                date: format(
                    parseIso(appointment.date),
                    "'dia' dd 'de' MMMM', às' H:mm'h'",{
                    locale: pt, 
                }),
            },
          });
     
    }
}

export default new CancellationMail();