/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';

import patientService from '../services/patientService';
import {toNewEntry, toNewPatientEntry} from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getNoSsnPatients());
});

router.post('/', (req, res) => {
    try {
        const newPatientEntry = toNewPatientEntry(req.body);

        const addedPatient = patientService.addPatient(newPatientEntry);
        res.json(addedPatient);

    } catch (e) {
        res.status(400).send(e.message);
    }
});

router.post('/:id/entries', (req, res) => {
    try {
        const newEntryObj = toNewEntry(req.body);

            const addedEntry = patientService.addEntry(newEntryObj, Number(req.params.id));

            res.json(addedEntry);
        
    } catch (e) {
        res.status(400).send(e.message);
    }
});


router.get('/:id', (req, res) => {
    res.send(patientService.getPatientById(Number(req.params.id)));
});



export default router;