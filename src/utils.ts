/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatientEntry, Gender, NewEntry } from '../src/types';
import DiagnoseEntries from '../data/diagnoses';

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





export const toNewPatientEntry = (object: any): NewPatientEntry => {
    return {
        name: parseName(object.name),
        dateOfBirth: parseDateOfBirth(object.dateOfBirth),
        ssn: parseSsn(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation),
        entries: []
    };
};

//////////////////////////////////
/////  START OF toNewEntry ///////


const parseDescription = (description: any): string => {
    if(!description || !isString(description)) {
        throw new Error(`Incorrect or missing description: ${description}`);
    }

    return description;
};

const parseDate= (date: any): string => {
    if(!date || !isString(date) || !isDate(date)) {
        throw new Error(`Incorrect or missing DOB: ${date}`);
    }
    return date;
};

const parseSpecialist = (specialist: any): string => {
    if(!specialist || !isString(specialist)) {
        throw new Error(`Incorrect or missing specialist: ${specialist}`);
    }

    return specialist;
};

const isValidCode = (codeArray: string[]): boolean => {
   codeArray.map(code =>{
       const diagnoseCode = DiagnoseEntries.find(d => d.code === code);
       if(!diagnoseCode) {
           throw new Error(`Incorrect code: ${code}`);
       }

       return diagnoseCode;
   });

   return true;
};




const parseDiagnosisCodes = (diagnosisCodes: string[]): string[] | undefined => {
    console.log(diagnosisCodes);
    if(!diagnosisCodes) {
        return [];
    }

    if(diagnosisCodes && !isValidCode(diagnosisCodes)) {
        throw new Error(`Incorrect codes`);
    }

    return diagnosisCodes;
    
};

const isTypeValid = (type: any): boolean => {
    return type === "Hospital" || type === "HealthCheck" || type === "OccupationalHealthcare";
};


const parseType = (type: any): string => {
    if(!type || !isString(type) || !isTypeValid(type)) {
        throw new Error(`Incorrect or missing type: ${type}`);
    }
    return type;
};

// const isRatingValid = (rating: any): boolean => {
//     return rating >= 0 && rating <= 4;
// };

// const parseHealthCheckRating = (rating: any): HealthCheckRating => {
//     if (!rating || !isRatingValid(rating)) {
//         throw new Error(`Invalid Rating: ${rating}`);
//     }
//     return rating as HealthCheckRating;
// };


export const toNewEntry = (object: any): NewEntry => {
    if(object.type === "Hospital") {
        console.log(object.diagnosisCodes);
        return {
            type: parseType(object.type) as NewEntry['type'],
            description: parseDescription(object.description),
            date: parseDate(object.date),
            specialist: parseSpecialist(object.specialist),
            diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes)
        };
    }
    else if(object.type === "HealthCheck") {
        return {
            type: parseType(object.type) as NewEntry['type'],
            description: parseDescription(object.description),
            date: parseDate(object.date),
            specialist: parseSpecialist(object.specialist),
            diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes)
        };
    }
    else if(object.type === "OccupationalHealthcare") {
        return {
            type: parseType(object.type) as NewEntry['type'],
            description: parseDescription(object.description),
            date: parseDate(object.date),
            specialist: parseSpecialist(object.specialist),
            diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes)
        };
    }
    else {
        throw new Error(`Something wrong`);
    }
    
    
};
