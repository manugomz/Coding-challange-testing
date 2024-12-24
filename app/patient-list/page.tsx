'use client';

import React, { useState } from 'react';
import BaseLayout from '@/app/ui/base-layout';
import { PatientFetch } from '@/app/lib/patient-storage';
import { Patient } from '@/app/patient-intake/types';


export default function Page() {
    const patients = PatientFetch();

    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    const handleToggleDropdown = (patientNumber: string) => {
        setOpenDropdown((prev) => (prev === patientNumber ? null : patientNumber));
    };

    return (
        <BaseLayout>
            <section className='flex flex-col items-center rounded-md bg-gray-50 px-6 pb-4 pt-8 h-[calc(100vh_-_16rem)]'>
                <h1 className='mb-3 text-2xl'>Patients List</h1>

                <ul className="w-11/12 lg:w-10/12 ">
                    {!patients && (<p>No patients found</p>)}
                    {patients?.map((patient: Patient) => (
                        <div key={patient.phone}>
                            <li className="flex w-full justify-between items-center p-3 border-b-2 shadow-md">
                                <span>{`${patient.firstName} ${patient.lastName}`}</span>
                                <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                                    onClick={() => handleToggleDropdown(patient.phone)}
                                    data-cy='details-button'
                                >
                                    {openDropdown === patient.phone ? 'Hide Details' : 'Show Details'}
                                </button>

                            </li>
                            {openDropdown === patient.phone && (
                                <div className=" p-4 border rounded-md" data-cy='patient-information'>
                                    <h3 className="text-lg font-bold text-center">Patient Information</h3>
                                    <div className='grid md:grid-cols-2'>
                                        <div>
                                            <p><strong>Gender:</strong> {patient.gender}</p>
                                            <p><strong>Phone:</strong> {patient.phone}</p>
                                            <p><strong>Email:</strong> {patient.email || 'None'}</p>
                                            <p><strong>Birth Date:</strong> {patient.birthDate}</p>
                                        </div>
                                        <div>
                                            <p><strong>Address:</strong> {patient.street},</p>
                                            <p> {patient.interior}</p>
                                            <p>{patient.city}, {patient.state}</p>
                                            <p>{patient.zipCode}</p>
                                        </div>
                                    </div>
                                </div>
                            )}</div>

                    ))}
                </ul>
            </section>
        </BaseLayout>
    );
};

