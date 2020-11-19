import patientEntries from '../../data/patients';

import { PatientEntry, PublicPatient, NewPatientEntry } from '../types';

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

const getNoSsnPatients = (): PublicPatient[] => {
    return patientEntries.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries,
    }));
};

const getPatientById = (id: number): PublicPatient => {
    return patientEntries.find(p => p.id === id);
};

export default {
    getPatients,
    getNoSsnPatients,
    addPatient,
    getPatientById
};