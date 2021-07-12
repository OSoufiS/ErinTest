import { Cascade, Collection, Entity, ManyToMany, ManyToOne, Property } from '@mikro-orm/core';
import { UsersBase } from './UsersBase';
var moment = require('moment-timezone');

@Entity()
export class User extends UsersBase {

  @Property()
  firstName: string;

  @Property()
  lastName: string;

  @Property()
  birthdateUTC: string;

  @Property()
  location: string;

  @Property()
  UID: string; 

  @Property()
  TimeZoneNumber: number;

  @Property()
  TimeZoneWord: string;

  @Property()
  anniversaryUTC : string;


  constructor(firstName: string, lastName: string, birthdate: string, location: string) {
    super();
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthdateUTC = moment.tz(birthdate + " 09:00",location).utc().format();
    this.location = location;
    let jsonUID =`{"firstName":"${firstName.toString()}","lastName":"${lastName.toString()}","birthdate":"${birthdate.toString()}"}`;
    this.UID = new Buffer(jsonUID).toString('base64');
    this.TimeZoneNumber = this.setTimeZone(location);
    this.TimeZoneWord = moment.tz(location).zoneAbbr();
    //this.anniversaryUTC = moment.tz(anniversary " 09:00",location).utc().format();
  }

  private setTimeZone (location){
    let hour = parseInt(moment.tz(location).format("Z"));
    if(parseInt(moment.tz(location).format("Z").split(":")[1]) == 30){
      hour+=0.5
    }
    return hour
  }

}