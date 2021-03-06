import { Request, Response } from 'express';
import Router from 'express-promise-router';
import { QueryOrder, wrap } from '@mikro-orm/core';
import { DI } from '../server';
import { User } from '../entities';
import {Guard} from '../controllers/Guard'
var moment = require('moment-timezone');

const GuardVars = Guard.getInstance();
const router = Router();

/*router.get('/:id', async (req: Request, res: Response) => {
  const user = await DI.userRepository.find({UID: req.params.id} )
  if (!user) {
    return res.status(404).json({ message: 'Error: Please check values and try again' });
  }
  res.json(user);
});*/

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    if(GuardVars.isValidBase64(req.params.id, true)){
      const user = await DI.userRepository.remove({UID:GuardVars.isValidBase64(req.params.id) })
      if (!user) {
        return res.status(500).json({ message: 'Error: Please check values and try again' });
      }
      await DI.userRepository.persist(user).flush();
      res.status(200).send(''); 
    }
  } catch (e) {
    return res.status(500).send('Error: Please check values and try again');
  }
});

router.post('/', async (req: Request, res: Response) => {
  if (!GuardVars.isString(req.body.firstName,true) || !GuardVars.isString(req.body.lastName, true) || !GuardVars.isValidDay(req.body.birthdate, true) || !GuardVars.isValidLocation(req.body.location,true)) {
    return res.status(500).send('Error: Please check values and try again');
  }
  else{
    try {
      //Make sure not already existing
      let jsonUID =`{"firstName":"${GuardVars.isString(req.body.firstName)}","lastName":"${GuardVars.isString(req.body.lastName)}","birthdate":"${GuardVars.isValidDay(req.body.birthdate)}"}`;
      let UID = new Buffer(jsonUID).toString('base64');
      let checkIfUserExists = await DI.userRepository.findOne({UID: UID});
      if(checkIfUserExists){
        return res.status(500).send('Error: Please check values and try again');
      }
      //proceed to insert
      const user = new User(GuardVars.isString(req.body.firstName), GuardVars.isString(req.body.lastName), GuardVars.isValidDay(req.body.birthdate), GuardVars.isValidLocation(req.body.location));
      wrap(user).assign(req.body);
      await DI.userRepository.persist(user).flush();
      res.status(201).send('');
    } catch (e) {
      return res.status(500).send('Error: Please check values and try again');
    }
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  if (!GuardVars.isValidBase64(req.params.id,true)) {
    res.status(400);
    return res.json({ message: 'Error: Please check values and try again' });
  }
  
  try {
    const user = await DI.userRepository.findOne({UID : req.params.id} );
    if (!user) {
      return res.status(404).json({ message: 'Error: Please check values and try again' });
    }

    if(GuardVars.isString(req.body.firstName,true)){
      user.firstName = GuardVars.isString(req.body.firstName);
    }
    if(GuardVars.isString(req.body.lastName,true)){
      user.lastName = GuardVars.isString(req.body.lastName);
    }
    if(GuardVars.isValidLocation(req.body.location,true)){
      user.location = GuardVars.isValidLocation(req.body.lastName);
    }
    if(GuardVars.isValidDay(req.body.birthdate,true)){
      user.birthdateUTC = GuardVars.isValidDay(req.body.birthdate);
      user.TimeZoneNumber = parseInt(moment.tz(user.location).format("Z"));
      user.TimeZoneWord = moment.tz(user.location).zoneAbbr();
    }
    await DI.userRepository.flush();

    res.status(204).send('');
  } catch (e) {
    return res.status(500).send('Error: Please check values and try again');
  }
});

export const UserController = router;