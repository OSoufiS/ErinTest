var moment = require('moment-timezone');
const axios = require('axios');
const https = require("https");

/**
 * Utilising Abstract Factory for Scalability and Extensibility
*/

/**
 * Abstract factory message creator
 */
export interface AbstractFactoryMessageCreator {
    createMessageHappyBirthday(): AbstractHappyBirthday;
    //createMessageHappyAnniversary(): HappyAnniversaryMessage;
}

/**
 * Conscrete Factory: Concrete message creator factory
 */
export class ConcreteMessageCreatorFactory implements AbstractFactoryMessageCreator {
    public createMessageHappyBirthday(): AbstractHappyBirthday {
        return new HappyBirthday();
    }

    /* public createProductB(): HappyAnniversaryMessage {
        return new HappyAnniversary();
    }*/
}


/**
 * 
 * Interface for HappyBirthday Message
 */
interface AbstractHappyBirthday {
    GenerateMessage(user): string;
}

/*interface AbstractHappyAnniversary{
    GenerateMessage(user): string;
}*/

/**
 *  Concrete Products : Happy Birthday
 */
class HappyBirthday implements AbstractHappyBirthday {
    public GenerateMessage(user): string {
        let Message = `Hey, ${user} it’s your birthday`

        const data = JSON.stringify({
            Message: Message
        })
        
        const options = {
            hostname: "hookb.in",
            port: 443,
            path: "/2qq2OkaqMpcdzq88z1bN",
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Content-Length": data.length
            }
        }
        
        const req = https.request(options, (res) => {
            console.log(`status: ${res.statusCode}`);
        });
        
        req.write(data);
        req.end();
        return;
    }

}

/*class HappyAnniversary implements AbstractHappyAnniversary{
    public GenerateMessage(user): string {
        ....
        CODE TO RETURN HAPPY ANNIVERSARY MESSAGE. Similar to above
        ....
    }
}*/



