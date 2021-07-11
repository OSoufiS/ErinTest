# ErinTest

=============================================

Write a simple node.js application to send a happy birthday message to users on their birthday at exactly 9am on their local time. For example, if one user is in New York and the second user is in Melbourne, they should be getting a birthday message in their own timezone.

Requirements
* Javascript or Typescript
    Typescript
* Simple API to create or delete users only:
    * POST /user   -> done
    * DELETE /user   -> done
* User has a first name and last name, birthday date and location (locations could be in any format of your choice)
    DONE
* The system needs to send the following message at 9am on users’ local time via call to https://hookbin.com endpoint (create a new one for yourself): “Hey, {full_name} it’s your birthday”
https://hookb.in/mZZgEapO2lFeqq71QQw2
* The system needs to be  able to recover if the service was down for a period of time (say a day).
     WHAT DOES RECOVER MEAN ? SEND ALL PREVIOUS OR JUST CONTINUE WHERE IT LEFT OFF?
* You may use any database technology you’d like, and you are allowed to take advantage of the database’s internal mechanisms.
* You may use 3rd party libs such as express.js, moment.js, ORM etc to save development time.

Things to consider
* Make sure your code is scalable and has a good level of abstraction. For example, in the future we may want to add a happy anniversary message as well.
* Make sure your code is tested and testable
* Be mindful of race conditions, duplicate messages are unacceptable
* Think about scalability (with the limits of localhost), will the system be able to handle thousands of birthdays a day?

Bonus
* For extra brownie points, add PUT /user for the user to edit their details   -> done
