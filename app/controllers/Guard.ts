var stringvalidator = require("string-sanitizer");
var moment = require('moment-timezone');

export class Guard {
    private static instance: Guard;

    constructor() {}

    public static getInstance(): Guard {
        if (!Guard.instance) {
            Guard.instance = new Guard();
        }

        return Guard.instance;
    }

    public isString(dirty: string, checkOnly? : boolean) : any {
        let checkOnlyValue = checkOnly? checkOnly: false;
        if (typeof dirty === 'string' && dirty === stringvalidator.sanitize.removeNumber(dirty)  ) {
            if(checkOnlyValue)return true;
            else return dirty;
        }
        else {
           
            return false;
        }

    }
    public isNumeric (dirty: Number, checkOnly? : boolean ) : any {
        let checkOnlyValue = checkOnly? checkOnly: false;
        if (!isNaN(Number(dirty))) {
            if(checkOnlyValue)return true;
            else return dirty;
        }
        else {
           
            return false;
        }
    }
    public isAlphaNumeric(dirty: string , checkOnly?: boolean ): any {
        let checkOnlyValue = checkOnly? checkOnly: false;
        const returnValue =stringvalidator.sanitize.keepNumber(dirty)
        if (returnValue == dirty) {
            if(checkOnlyValue)return true;
            else return returnValue;
        }
        else {
            
            return false;
        }
        

    }

    public isValidLocation(dirty : string , checkOnly : boolean = false) : any {
        let checkOnlyValue = checkOnly? checkOnly: false;
        const returnValue = moment.tz.names().includes(dirty);
        if (returnValue) {
            if(checkOnlyValue)return true;
            else return dirty;
        }
        else {
            
            return false;
        }
        
    }

    public isValidDay(dirty : string , checkOnly : boolean = false): any {
        let checkOnlyValue = checkOnly? checkOnly: false;
        if(!dirty){
            if(checkOnlyValue)return false;
            else return false;
        }
        if(moment(Date.parse(dirty)).isValid() && dirty.length >= 10){
            if(checkOnlyValue)return true;
            else return dirty;
        }
        else{
            
            return false;
        }
    }

    public isValidBase64(dirty : string , checkOnly : boolean = false): any {
        let checkOnlyValue = checkOnly? checkOnly: false;
        let dirtyBuffer = Buffer.from(dirty, 'base64').toString('binary');
        let returnValue = JSON.parse(dirtyBuffer);
        if(this.isString(returnValue.firstName, true) && this.isString(returnValue.lastName, true) && this.isValidDay(returnValue.birthdate, true) ){
            if(checkOnlyValue)return true;
            else return dirty;
        }
        else{
            return false;
        }
    }









}