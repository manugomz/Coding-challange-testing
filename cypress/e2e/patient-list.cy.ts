
import { fillAndSubmitForm } from "../support/formUtils";
import { assertData } from "../support/listUtils";

describe('Patient Intake Form', () => {
    const testData = [{
        firstName: 'John',
        lastName: 'Doe',
        birthDate: '1990-01-01',
        phone: '1234567890',
        email: 'john.doe@example.com',
        gender: 'male',
        street: 'Happy Street 01',
        city: 'New York',
        state: 'NY',
        zipCode: '12345',
    }, {
        firstName: 'Joanne',
        lastName: 'Blow',
        birthDate: '1995-02-28',
        phone: '9012345678',
        email: 'joanne.blow@example.com',
        gender: 'female',
        street: 'P.O. Box 45',
        city: 'Phoenix',
        state: 'AZ',
        zipCode: '43210',
    }]

    beforeEach(() => {
        cy.visit('http://localhost:3000/patient-intake');
        fillAndSubmitForm(testData[0]);
        cy.visit('http://localhost:3000/patient-intake');
        fillAndSubmitForm(testData[1]);
    });

    it('should display no patients message if the patients list is empty', () => {
        cy.window().then((window) => {
            window.localStorage.clear();
        });
        cy.contains('No patients found').should('exist');
    });

    it('should not display any dropdowns on initial render', () => {
        cy.get('div').contains('Patient Information').should('not.exist');
    });

    it('Should render all patients from the PatientFetch function', () => {
        cy.get('ul > div').should('have.length', testData.length);
    });

    it('should open the dropdown when "Show Details" is clicked', () => {
        cy.get('button').contains('Show Details').first().click();
        cy.get('div').contains('Patient Information').should('be.visible');
    });

    it('should close the dropdown when "Hide Details" is clicked', () => {
        cy.get('button').contains('Show Details').first().click();
        cy.get('button').contains('Hide Details').click();
        cy.get('div').contains('Patient Information').should('not.exist');
    });


    it('should display the correct details for a patient in the dropdown', () => {
        cy.get('button').contains('Show Details').first().click();
        cy.get('[data-cy=patient-information]').within(() => {
            assertData(testData[0]);
        });
    });

});