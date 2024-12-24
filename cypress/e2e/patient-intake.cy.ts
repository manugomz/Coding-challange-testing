import { assertFields, assertStorageData, assertValidationErrors, fillAndSubmitForm } from "../support/formUtils";

describe('Patient Intake Form', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/patient-intake');
        cy.window().then((window) => {
            window.localStorage.clear();
        });
    });

    const testDataValid = {
        firstName: 'John',
        lastName: 'Doe',
        birthDate: '1990-01-01',
        phone: '1234567890',
        email: 'john.doe@example.com',
        gender: 'male',
        street: '123 Main St.',
        city: 'New York',
        state: 'NY',
        zipCode: '12345',
    }

    it('Should display the form fields', () => {
        const labels = ['First Name', 'Last Name', 'Birth Date', 'Phone Number', 'Email', 'Street Address', 'City', 'State', 'ZIP Code'];
        assertFields(labels);
    });

    it('Should show error messages when submitting empty form', () => {
        const expectedErrors = {
            firstName: 'First name is required',
            lastName: 'Last name is required',
            birthDate: 'Birth date is required',
            phone: 'Phone number is required',
            email: 'Email is required',
            street: 'Street address is required',
            city: 'City is required',
            zipCode: 'ZIP code is required'
        };

        cy.get('button[type="submit"]').click();
        assertValidationErrors(expectedErrors);
    });

    it('Should show validation errors for short inputs', () => {
        const testData = {
            firstName: 'P',
            lastName: 'D',
            birthDate: '1990-01-01',
            phone: '123450',
            email: 'john.doe@example.com',
            gender: 'male',
            street: 'A',
            city: 'P',
            state: 'NY',
            zipCode: '12345',
        }

        const expectedErrors = {
            firstName: 'First name must be at least 3 characters',
            lastName: 'Last name must be at least 3 characters',
            street: 'Street address must be at least 5 characters',
            city: 'City name must be at least 2 characters',
            phone: 'Phone number must be exactly 10 digits (only numbers allowed)',
        };

        fillAndSubmitForm(testData);
        assertValidationErrors(expectedErrors);
    });

    it('Should show validation errors for long inputs', () => {
        const testData = {
            firstName: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
            lastName: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
            birthDate: '1990-01-01',
            phone: '12345678901234',
            email: 'john.doe@example.com',
            gender: 'male',
            street: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
            city: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
            state: 'NY',
            zipCode: '12345',
        };

        const expectedErrors = {
            firstName: 'First name cannot exceed 30 characters',
            lastName: 'Last name cannot exceed 30 characters',
            street: 'Street address cannot exceed 80 characters',
            city: 'City name cannot exceed 30 characters',
            phone: 'Phone number must be exactly 10 digits (only numbers allowed)'
        };

        fillAndSubmitForm(testData);
        assertValidationErrors(expectedErrors);
    });

    it('Should show validation error for formatting errors', () => {
        const testData = {
            firstName: 'Jóhn',
            lastName: 'Doe12',
            birthDate: '2010-09-01',
            phone: 'AAAAA7890',
            email: 'john.doeexample.com',
            gender: 'male',
            street: 'Sé#$%/&(()°|',
            city: 'New1234',
            state: 'NY',
            zipCode: '123789',
        }
        const expectedErrors = {
            firstName: 'No special characters allowed',
            lastName: 'No special characters allowed',
            phone: 'Phone number must be exactly 10 digits (only numbers allowed)',
            email: 'Invalid email format',
            city: 'City name can only contain letters, spaces, hyphens, and apostrophes',
            street: 'Invalid street address',
            zipCode: 'ZIP code must be 5 digits or ZIP+4 (e.g., 12345 or 12345-6789)',
        };

        fillAndSubmitForm(testData);
        assertValidationErrors(expectedErrors);
    });

    it('Should show validation error for age greater than 110', () => {
        const testData = {
            firstName: 'John',
            lastName: 'Doe',
            birthDate: '1290-01-01',
            phone: '1234567890',
            email: 'john.doe@example.com',
            gender: 'male',
            street: '789 St. John’s Rd',
            city: 'New York',
            state: 'NY',
            zipCode: '12345',
        };

        fillAndSubmitForm(testData);

        cy.get('[data-cy=birthDate-error]').should('contain', 'Please verify the year');
    });

    it('Should show validation error for future dates', () => {
        const testData = {
            firstName: 'John',
            lastName: 'Doe',
            birthDate: '2030-01-01',
            phone: '1234567890',
            email: 'john.doe@example.com',
            gender: 'male',
            street: '456 Elm St. Road',
            city: 'New York',
            state: 'NY',
            zipCode: '12345',
        }

        fillAndSubmitForm(testData);

        cy.get('[data-cy=birthDate-error]').should('contain', 'Birth date cannot be in the future');
    });

    it('Should redirect to patient list on successful form submission', () => {
        fillAndSubmitForm(testDataValid);
        cy.url().should('include', '/patient-list');
    });

    it('Should save patient data in local storage', () => {
        fillAndSubmitForm(testDataValid);

        cy.window().then((window) => {
            const savedData = window.localStorage.getItem('patients');
            expect(savedData).to.not.be.null;
            const patientData = JSON.parse(savedData!);

            assertStorageData(patientData, 0, testDataValid)
        });
    });

    it('Should save multiple patient data in local storage', () => {
        fillAndSubmitForm(testDataValid);

        cy.visit('http://localhost:3000/patient-intake');

        const testDataValid2 = {
            firstName: 'Joanne',
            lastName: 'Blow',
            birthDate: '1995-02-28',
            phone: '9012345678',
            email: 'joanne.blow@example.com',
            gender: 'female',
            street: 'P.O. Box 45',
            interior: 'Interior 305',
            city: 'Phoenix',
            state: 'AZ',
            zipCode: '43210',
        }

        fillAndSubmitForm(testDataValid2);

        cy.window().then((window) => {
            const savedData = window.localStorage.getItem('patients');
            expect(savedData).to.not.be.null;
            const patientData = JSON.parse(savedData!);

            assertStorageData(patientData, 0, testDataValid)
            assertStorageData(patientData, 1, testDataValid2)
        });
    });
});