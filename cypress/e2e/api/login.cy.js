
describe('Login test scenario', () => {

    // Helper so the API key header isn't repeated in every request
    const apiRequest = (options, withKey = true) =>
        cy.env(['apiKey']).then(({ apiKey }) => {
            // fail cepat dengan pesan jelas kalau key tidak terbaca
            if (withKey && !apiKey) {
                throw new Error('apiKey is not set. Check cypress.env.json in the project root.');
            }

            return cy.request({
                failOnStatusCode: false, // allow asserting 4xx statuses instead of failing immediately
                ...options,
                headers: {
                    ...(withKey ? { 'x-api-key': apiKey } : { 'x-api-key': 'invalid-api-key' }),
                    ...(options.headers || {}),
                },
            });
        });

    context('POST /api/login', () => {
        beforeEach(() => {
            cy.fixture('login').as('loginData');
        });

        it('TC-API-LOGIN-001: Successfully login with valid credentials', function () {
            apiRequest({
                method: 'POST',
                url: '/api/login',
                body: this.loginData.valid,
            }).then((res) => {
                expect(res.status).to.eq(200);
                expect(res.body).to.have.property('token');
                expect(res.body.token).to.be.a('string').and.not.be.empty;
            });
        });

        it('TC-API-LOGIN-002: Verify failed login with unregistered email', function () {
            apiRequest({
                method: 'POST',
                url: '/api/login',
                body: this.loginData.unregistered,
            }).then((res) => {
                expect(res.status).to.eq(400);
                expect(res.body.error).to.eq('user not found');
            });
        });

        it('TC-API-LOGIN-003: Verify failed login with invalid format email', function () {
            apiRequest({
                method: 'POST',
                url: '/api/login',
                body: this.loginData.invalidFormatEmail,
            }).then((res) => {
                expect(res.status).to.eq(400);
                expect(res.body.error).to.eq('user not found');
            });
        });

        it('TC-API-LOGIN-004: Verify failed login with both email and password empty', function () {
            apiRequest({
                method: 'POST',
                url: '/api/login',
                body: {},
            }).then((res) => {
                expect(res.status).to.eq(400);
                expect(res.body.error).to.eq('Missing email or username');
            });
        });

        it('TC-API-LOGIN-005: Verify failed login without email', function () {
            apiRequest({
                method: 'POST',
                url: '/api/login',
                body: this.loginData.missingEmail,
            }).then((res) => {
                expect(res.status).to.eq(400);
                expect(res.body.error).to.eq('Missing email or username');
            });
        });

        it('TC-API-LOGIN-006: Verify failed login without password', function () {
            apiRequest({
                method: 'POST',
                url: '/api/login',
                body: this.loginData.missingPassword,
            }).then((res) => {
                expect(res.status).to.eq(400);
                expect(res.body.error).to.eq('Missing password');
            });
        });

        it('TC-API-LOGIN-007: Verify that login rejected when request without authorization token', function () {
            apiRequest(
                { method: 'POST', url: '/api/login', body: this.loginData.valid },
                false
            ).then((res) => {
                expect(res.status).to.eq(403);
            });
        });
    });

});