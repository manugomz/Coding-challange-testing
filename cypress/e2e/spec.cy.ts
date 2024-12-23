describe('Patient Intake Form', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/patient-intake');
    });

    it('should display the form fields', () => {
        cy.get('label').contains('First Name').should('be.visible');
        cy.get('label').contains('Last Name').should('be.visible');
        cy.get('label').contains('Birth Date').should('be.visible');
        cy.get('label').contains('Phone Number').should('be.visible');
        cy.get('label').contains('Email').should('be.visible');
        cy.get('label').contains('Street Address').should('be.visible');
        cy.get('label').contains('City').should('be.visible');
        cy.get('label').contains('State').should('be.visible');
        cy.get('label').contains('ZIP Code').should('be.visible');
    });

    it('should show error messages when submitting empty form', () => {
        cy.get('button[type="submit"]').click();

        cy.get('.text-red-500').should('have.length', 10); 
    });

    it('should show error messages when there is formatting errors', () => {
        cy.get('button[type="submit"]').click();

        cy.get('.text-red-500').should('have.length', 10); 
    });

    it('should redirect to patient list on successful form submission', () => {

        cy.get('#firstName').type('John');
        cy.get('#lastName').type('Doe');
        cy.get('#birthDate').type('1990-01-01');
        cy.get('#phone').type('1234567890');
        cy.get('#email').type('john.doe@example.com');
        cy.get('input[type="radio"][value="male"]').check();
        cy.get('#street').type('happy street-42');
        cy.get('#city').type('New York');
        cy.get('#state').select('NY');
        cy.get('#zipCode').type('12345');

        cy.get('button[type="submit"]').click();

        cy.url().should('include', '/patient-list');  
    });

    it('should save patient data in local storage', () => {
        cy.get('#firstName').type('John');
        cy.get('#lastName').type('Doe');
        cy.get('#birthDate').type('1990-01-01');
        cy.get('#phone').type('1234567890');
        cy.get('#email').type('john.doe@example.com');
        cy.get('input[type="radio"][value="male"]').check();
        cy.get('#street').type('happy street-42');
        cy.get('#city').type('New York');
        cy.get('#state').select('NY');
        cy.get('#zipCode').type('12345');

        cy.get('button[type="submit"]').click();

        cy.window().then((window) => {
            const savedData = window.localStorage.getItem('patients');
            expect(savedData).to.not.be.null;
            const patientData = JSON.parse(savedData!);
            expect(patientData[0].firstName).to.equal('John');
            expect(patientData[0].lastName).to.equal('Doe');
        });
    });
});