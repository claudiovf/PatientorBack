export interface DiagnoseEntry {
    code: string;
    name: string;
    latin?: string;
}

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

export interface PatientEntry {
    id: number;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
}

export type NewPatientEntry = Omit<PatientEntry, 'id'>;

export type NoSsnPatientEntry = Omit<PatientEntry, 'ssn'>;