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

export interface BaseEntry {
    id: number;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<DiagnoseEntry['code']>;
    type: "HealthCheck" | "Hospital" | "OccupationalHealthcare"
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

interface HealthCheckEntry extends BaseEntry {
    //type: "HealthCheck";
    healthCheckRating?: HealthCheckRating;
}

interface Discharge {
    date: string;
    criteria: string;
}

export interface HospitalEntry extends BaseEntry {
    //type: "Hospital";
    discharge?: Discharge;
}

interface SickLeave {
    startDate: string;
    endDate: string;
}

interface OccupationalHelthcareEntry extends BaseEntry {
    //type: "OccupationalHealthcare";
    employerName?: string;
    sickLeave?: SickLeave;
}

export type Entry =
    | HospitalEntry
    | OccupationalHelthcareEntry
    | HealthCheckEntry;

export interface PatientEntry {
    id: number;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
    entries: Entry[];
}

export type NewPatientEntry = Omit<PatientEntry, 'id'>;

export type NewEntry = Omit<Entry, 'id'>;

export type PublicPatient = Omit<PatientEntry, 'ssn'> | undefined;