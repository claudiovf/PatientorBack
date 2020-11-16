import patientEntries from '../../data/patients';

import { PatientEntry, NoSsnPatientEntry, NewPatientEntry } from '../types';

const getPatients = (): Array<PatientEntry> => {
    return patientEntries;
};

const addPatient = (entry: NewPatientEntry): PatientEntry => {
    const newPatientEntry = {
        id: Math.max(...patientEntries.map(p => p.id)) + 1,
        ...entry
    };

    patientEntries.push(newPatientEntry);
    return newPatientEntry;
};

const getNoSsnPatients = (): NoSsnPatientEntry[] => {
    return patientEntries.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};

export default {
    getPatients,
    getNoSsnPatients,
    addPatient
};