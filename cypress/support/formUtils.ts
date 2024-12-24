import { Patient } from "@/app/patient-intake/types";

export const assertFields = (fieldLabels: string[]): void => {
    fieldLabels.forEach((fieldLabel) => {
        cy.get('label').contains(fieldLabel).should('be.visible');
    });
};

export const assertStorageData = (data: Patient[], position: number = 0, expectedData: Patient): void => {
    const actualData = data[position];

    Object.entries(expectedData).forEach(([key, value]) => {
        if (value) {
            expect(actualData[key as keyof Patient], `Mismatch for ${key}`).to.equal(value);
        }
    });
};

export const assertValidationErrors = (errors: Record<string, string>): void => {
    Object.keys(errors).forEach(field => {
        const errorMessage = errors[field];
        cy.get(`[data-cy=${field}-error]`).should('exist');
        cy.get(`[data-cy=${field}-error]`).should('have.text', errorMessage);
    });
};

export const fillAndSubmitForm = (data: Patient, submit: boolean = true): void => {
    if (data.firstName) cy.get('#firstName').type(data.firstName);
    if (data.lastName) cy.get('#lastName').type(data.lastName);
    if (data.birthDate) cy.get('#birthDate').type(data.birthDate);
    if (data.phone) cy.get('#phone').type(data.phone);
    if (data.email) cy.get('#email').type(data.email);
    if (data.gender) {
        cy.get(`input[name="gender"][value="${data.gender}"]`).check();
    }
    if (data.street) cy.get('#street').type(data.street);
    if (data.interior) cy.get('#interior').type(data.interior);
    if (data.city) cy.get('#city').type(data.city);
    if (data.state) cy.get('#state').select(data.state);
    if (data.zipCode) cy.get('#zipCode').type(data.zipCode);

    if (submit) cy.get('button[type="submit"]').click();
};
