import { DI } from './server';
import { AbstractFactoryMessageCreator, ConcreteMessageCreatorFactory } from './MessageFactory';
var moment = require('moment-timezone');
var cron = require('node-cron');
import { Guard } from './controllers/Guard'

const GuardVars = Guard.getInstance();
/**
 * simulate time trigger lambda/function every 30 mins 
 * */
cron.schedule('*/30 * * * *', () => {
    let timeshift = [];
    /** 
     * LOGIC I USED 
     * 1. find out what the time is in UTC 
     * 2. find out where 9 am is in comparisson to that ... ie what timezone it is 
     * 3. to timezone to query DB for users
     */

    let UTCtime = parseInt(moment.utc().format("HH"));
    if (moment.utc().format("mm") == 30 ){
        UTCtime+=0.5;
    }
    if (UTCtime < 21 && UTCtime >= 0) {
        timeshift.push(9 - UTCtime);
    }
    else if (UTCtime == 21) {
        timeshift.push(12);
    }
    else if (UTCtime > 21 && UTCtime < 25) {
        timeshift.push(UTCtime - 12);
    }
    getUsersandSendMessage(timeshift);
});

async function getUsersandSendMessage(timezone) {
    if (GuardVars.isNumeric(timezone, true)) {
        const result = await DI.userRepository.find({ TimeZoneNumber: GuardVars.isNumeric(timezone) });
        if (result) {
            
            result.forEach((element) => {
                try {
                    // ---- check for birthday
                    if (moment(element.birthdateUTC, 'YYYY-MM-DD').format('D') == moment().utc().format('D') && moment(element.birthdateUTC, 'YYYY-MM-DD').format('M') == moment().utc().format('M')) {
                        createMessage(element, "Birthday", new ConcreteMessageCreatorFactory());
                    }
                    // ---- check for anniverssary
                    /*if (moment(element.birthdateUTC, 'YYYY-MM-DD').format('D') == moment().format('D') && moment(element.birthdateUTC, 'YYYY-MM-DD').format('M') == moment().format('M')) {
                        createMessage(element,"Anniversary", new ConcreteMessageCreatorFactory());
                    }
                    */
                }
                catch (err) {
                    console.log("Error: Something went wrong: " + err);
                }
            });
        }
    }

}
function createMessage(user, messageType, factory: AbstractFactoryMessageCreator) {
    let fullName = `${user.firstName} ${user.lastName}`;
    switch (messageType) {
        case "Birthday":
            const HappyBirthday = factory.createMessageHappyBirthday();
            HappyBirthday.GenerateMessage(fullName);
            break;
        case "Anniversary":
            /** const HappyAnniversary = factory.createMessageHappyAnniversary();
             * HappyAnniversary.GenerateMessage(fullName);
             * */
            break;
        default:
            console.log("Error: messageType not found ");
            break;
    }
}




