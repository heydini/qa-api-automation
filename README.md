# qa-api-automation
API Automation

## 1. Prerequisites

Ensure the following tools are installed on your machine:

- Node.js
- npm (Node Package Manager)
- Cypress
- Visual Studio Code or another code editor
- Access to the API test environment

## 2. Clone or Open the Project

If the project is hosted in a Git repository, clone it first:

```bash
git clone <repository-url>
```

Navigate to the project directory:

```bash
cd <project-folder>
```

If the project already exists locally, open its folder in VS Code or your terminal.

## 3. Install Dependencies

Run the following command in the project root directory:

```bash
npm install
```

This installs the dependencies defined in `package.json`.

## 4. Configure Environment Variables

Add your API-key in `cypress.env.json`

## 5. Run All API Automation Tests

Execute all test files in the configured Cypress spec directory:

```bash
npx cypress run
```

Cypress executes the tests in headless mode and displays the execution results in the terminal.

## 6. Run a Specific Test File

To execute only the Login API tests:

```bash
npx cypress run --spec "cypress/e2e/api/login.cy.js"
```

To execute only the Get User Detail API tests:

```bash
npx cypress run --spec "cypress/e2e/api/get-user-detail.cy.js"
```

To execute only the Delete User API tests:

```bash
npx cypress run --spec "cypress/e2e/api/delete-user.cy.js"
```

Update the file paths if your project uses a different folder structure.

## 7. Run Tests Using the Cypress Test Runner

To execute tests interactively:

```bash
npx cypress open
```

Then:

1. Select **E2E Testing**.
2. Choose a browser.
3. Select the desired API test specification.
4. Review the test execution and assertion results.

## 8. Review Test Results

After execution, review the Cypress output to identify passed and failed tests.

Check the following:
- HTTP status codes.
- Response body and data structure.
- Assertion results.
- Error messages and request details for failed tests.

If a test fails, verify the API availability, test data, environment configuration, request headers, authorization tokens, and expected API behavior.

## 9. Expected Result

- All configured API test cases are executed.
- Each test is reported as passed or failed according to its assertions.
- Failed tests can be investigated using Cypress logs and response details.
- Execution results are available in the terminal or Cypress Test Runner.

**Note:** The actual result depends on the API environment, test data, and API contract. A successful test run should be confirmed by executing the project rather than assumed in advance.
