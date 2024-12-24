import { Patient } from "@/app/patient-intake/types";

export const assertData = (data: Patient): void => {

    const { firstName, lastName, ...patient } = data;

    Object.entries(patient).forEach(([key, value]) => {
        if (value) {
            cy.contains(value).should('exist', `${key} should be visible`);
        }
    });
};
