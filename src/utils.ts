/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatientEntry, Gender } from '../src/types';


const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseName = (name: any): string => {
    if(!name || !isString(name)) {
        throw new Error(`Incorrect or missing name: ${name}`);
    }

    return name;
};

//parse DOB checks if its a string before moves to isDate
const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseDateOfBirth = (dob: any): string => {
    if(!dob || !isString(dob) || !isDate(dob)) {
        throw new Error(`Incorrect or missing DOB: ${dob}`);
    }
    return dob;
};

const parseSsn = (ssn: any): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error(`Incorrect or missing ssn: ${ssn}`);
    }
    return ssn;
};

const parseOccupation = (occ: any): string => {
    if(!occ || !isString(occ)) {
        throw new Error(`Incorrect or missing Occupation: ${occ}`);
    }
    return occ;
};

const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param); //obj alt array.find
};

const parseGender = (gender: any): Gender => {
    if(!gender || !isGender(gender)) {
        throw new Error(`Incorrect or missing gender: ${gender}`);
    }
    return gender;
};





const toNewPatientEntry = (object: any): NewPatientEntry => {
    return {
        name: parseName(object.name),
        dateOfBirth: parseDateOfBirth(object.dateOfBirth),
        ssn: parseSsn(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation),
    };
};

export default toNewPatientEntry;