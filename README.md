# ErinTest

## Additional information  - Problem statement at the bottom

### Data Schema in Mongo DB
User {
  _id: ObjectId('60eaff66b00bfbd5d4174829'),
  createdAt: ISODate('2021-07-11T14:25:42.785Z'),
  updatedAt: ISODate('2021-07-11T14:50:09.569Z'),
  firstName: 'Omar',
  lastName: 'Tony',
  birthdateUTC: '2003-02-02',
  location: 'Europe/Berlin',
  UID: 'eyJmaXJzdE5hbWUiOiJPbWFyIiwibGFzdE5hbWUiOiJQcmVUZXN0IiwiYmlydGhkYXRlIjoiMjAwMS0wNi0wMSJ9',
  TimeZoneNumber: 10,
  TimeZoneWord: 'AEST'
}

### Inputable data
firstName : string 
lastName: : string
birthdate: string.Format("YYYY-MM-DD") - eg 1995-02-23 
location: string.Format("Continent/City") - eg Europe/Berlin or Australia/Melbourne

### APIs 

Post API - Fully tested and operational
Delete API - Fully tested and operational
Put API - Tested and operational

Express.js was used in conjunction with the ORM to allow better control and abstraction of the code and DB.

User.Controller.ts does the heavy lifting of all the operations and calls. 
server.ts ran the server and the ORM links as well


### Notes on Code
#### Guard Class: 
This class is a singleton class that is designed to provide devs with a more tailored way of doing checks/validation. It is product/program specific and instead of having sloppy code where you have to check if it exists/ if its a string or number or whatever, it can all be check in one class keeping the code clean. 

The methods come in 2 styles 
1. method(stringToSanitise) - this will return a sanitised version of the method or else it will return a false or  failed response. this is used to make sure no bad actors/ bad variables are being inputted and are cleaned out.
eg. isNumeric("123") => 123  .... isNumeric("Hello") => can return false or throw error.
2. method(stringToSanitise, checkOption) - this option checks to see if the data is valid based on the method. it will return a true or false and would be generally used in conditional statements. 
eg. isNumeric("123",true) => true  .... isNumeric("Hello", true) => false

Majority of the testing was done on this class as it takes care of the validation for the rest of the system

#### ORM
I selected MikroORM as the ORM of choice and applied a repositry pattern to connect with MongoDB. There were some challenges and Mongoose may have been a better choice, however it still behaved as expected. This allowed abstraction of the DB and the code and allowed a code-frist approach to the DB.

the ORM has multiple layers but ill focus on a couple below:
"Entity" - Users.ts/UserBase.ts - This formed the links to the db code itself. 
"EntityRepository" - UserRepositry.ts - This allowed the comms between code and DB

### Abstract Factory
I used an abstract factory pattern to create scalability, extensibility and abstraction. This pattern allows developers to interact with the factory ONLY and not have to worry about what happens in the background. 

### main.ts
the does the crux of the logic. It scans the DB every 30 mins (to account for half timezones), finds out where in the world its 9am, asks the db if there are any birthdays on this day and then proceeds to use the AbstractFactory Class to send the message through to the API endpoint.

Things i would consider if i had more time
1. Perfomance test current code against code that will ask the DB for a daily dump of birthdays and periodically check for updates. This would keep a lot of the data in memory but would need more rework and protection if the system went down. Calls such as OnStart() would need to be derived to make sure on recovery the system would pull all the latest info and recover cleanly. 
2. Perfomance test current code against the code with Worker threads or async queues to increase concurrency. Network threads and kernal limits may need to be addressed here but overall that should increase performace. A downside is depending on where you place the worker threads/async queues, duplication and race condition may occur. not putting them in was a time vs effort tradeoff in this test. 

### Testing
Mocha and Chai were used to test out the logic. If i had more time i would have added more tests to the PUT API and made sure to cover all permitations of it, however i believe currently its sufficiently tested. 

All 85 tests can be found in "Test results" 





=============================================
## Problem Statement / Checklist:
Write a simple node.js application to send a happy birthday message to users on their birthday at exactly 9am on their local time. For example, if one user is in New York and the second user is in Melbourne, they should be getting a birthday message in their own timezone.

Requirements
* Javascript or Typescript
*******Typescript

* Simple API to create or delete users only:
    * POST /user 
        *********Complete
    * DELETE /user
        *********Complete
* User has a first name and last name, birthday date and location (locations could be in any format of your choice)
*********Complete
* The system needs to send the following message at 9am on users’ local time via call to https://hookbin.com endpoint (create a new one for yourself): “Hey, {full_name} it’s your birthday”
https://hookb.in/2qq2OkaqMpcdzq88z1bN
*********Complete
* The system needs to be  able to recover if the service was down for a period of time (say a day).
*********Complete : The service will pick back up where it restarts. All information lost during the downtime was assumed to be acceptable loss.
* You may use any database technology you’d like, and you are allowed to take advantage of the database’s internal mechanisms.
* You may use 3rd party libs such as express.js, moment.js, ORM etc to save development time.

Things to consider
* Make sure your code is scalable and has a good level of abstraction. For example, in the future we may want to add a happy anniversary message as well.
*********Complete: Utilised Abstract Factory Pattern ; Repo Pattern ; Singleton Pattern in the code
* Make sure your code is tested and testable
*********Complete : results are in Tests Results
* Be mindful of race conditions, duplicate messages are unacceptable
*********Complete 
* Think about scalability (with the limits of localhost), will the system be able to handle thousands of birthdays a day?
*********Complete  - system handled a thousand birthdays in one timezone. hookbin didnt.

Bonus
* For extra brownie points, add PUT /user for the user to edit their details
*********Complete 
=============================================










