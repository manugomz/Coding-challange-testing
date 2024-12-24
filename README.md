
# Patient intake

This is a Next.js project created to manage patient healthcare information intake, storage and patient list. It is built with TypeScript, React, and uses Cypress for testing.

## Features

- **Patient Intake**: A form for adding patient details.
- **Patient List**: Displays a list of added patients.
- **Testing**: Automated tests using Cypress to ensure the functionality of key pages.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/manugomz/Next.git
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Run the development server:
   ```bash
   pnpm dev
   ```

4. Open your browser and go to `http://localhost:3000/patient-intake`.

## Pages

### Patient Intake

The **Patient Intake** page allows you to submit patient information through a form. The form includes basic fields like name, birth date, address and contact information. Once submitted, the patient data is stored and can be viewed in the patient list.

### Patient List

The **Patient List** page displays a list of all submitted patients. Each entry shows the basic patient information.

## Testing

This project uses Cypress for end-to-end testing.

1. To run tests, first ensure the app is running.
2. Then, run Cypress:
   ```bash
   pnpm cypress open
   ```
3. Select the test files to run and verify the functionality of the patient intake and patient list pages.

The following tests are included:
- **Patient Intake Form**: Verifies form submission and validation.
- **Patient List**: Ensures the correct display of patient data.

## Technologies

- **Next.js**: Framework for server-side rendering and static site generation.
- **TypeScript**: Strongly typed language for better maintainability.
- **Cypress**: End-to-end testing framework.
- **Tailwind CSS**: Utility-first CSS framework for styling.


