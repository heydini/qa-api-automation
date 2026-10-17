
describe('Single user test scenario', () => {

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

    context('GET /api/users/{id}', () => {
        it('TC-API-USER-001: Verify that API successfully get user detail with valid user ID', () => {

            apiRequest({ method: 'GET', url: '/api/users/2' }).then((res) => {
                expect(res.status).to.eq(200);
                expect(res.headers['content-type']).to.include('application/json');
                expect(res.body).to.include.all.keys('data', 'support');
            });
        });

        it('TC-API-USER-002: Verify the response body structure', () => {
            apiRequest({ method: 'GET', url: '/api/users/2' }).then((res) => {
                const user = res.body.data;
                expect(user).to.have.all.keys('id', 'email', 'first_name', 'last_name', 'avatar');
                expect(user.id).to.be.a('number');
                expect(user.email).to.be.a('string');
                expect(user.first_name).to.be.a('string').and.not.be.empty;
                expect(user.last_name).to.be.a('string').and.not.be.empty;
                expect(user.avatar).to.be.a('string');
            });
        });

        it('TC-API-USER-003: Verify that returned user ID should match the requested user ID', () => {
            apiRequest({ method: 'GET', url: '/api/users/2' }).then((res) => {
                expect(res.body.data.id).to.eq(2);
            });
        });

        it('TC-API-USER-004: Verify the API response when user ID is not exists', () => {
            apiRequest({ method: 'GET', url: '/api/users/999' }).then((res) => {
                expect(res.status).to.eq(404);
                expect(res.body).to.be.empty;
            });
        });

        it('TC-API-USER-005: Verify the API response when user ID is invalid', () => {
            apiRequest({ method: 'GET', url: '/api/users/dini' }).then((res) => {
                expect(res.status).to.eq(404);
                expect(res.body).to.be.empty;
            });
        });

        it('TC-API-USER-006: Verify the API response when user ID is 0', () => {
            apiRequest({ method: 'GET', url: '/api/users/0' }).then((res) => {
                expect(res.status).to.eq(404);
                expect(res.body).to.be.empty;
            });
        });

        it('TC-API-USER-007: Verify the API response when user ID is negative', () => {
            apiRequest({ method: 'GET', url: '/api/users/-2' }).then((res) => {
                expect(res.status).to.eq(404);
                expect(res.body).to.be.empty;
            });
        });

        it('TC-API-USER-008: Verify that API rejected when request without authorization token', () => {
            apiRequest({ method: 'GET', url: '/api/users/2' }, false).then((res) => {
                expect(res.status).to.eq(403);
            });
        });
    });

});