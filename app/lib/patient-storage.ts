'use client';

import { useEffect } from 'react';

import { Patient } from "../patient-intake/types";

export function savePatientIntake(value: Patient) {

    const localData = localStorage.getItem('patients');
    const parsedData = localData ? JSON.parse(localData) : [];

    const phoneExists = parsedData.some((user: Patient) => user.phone === value.phone);

    if (!phoneExists) {
        parsedData.push(value);
        localStorage.setItem('patients', JSON.stringify(parsedData));
    }

}

export function PatientFetch() {
    const data = localStorage.getItem('patients');

    if (data) { return JSON.parse(data) }
}