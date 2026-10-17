
describe('Delete user test scenario', () => {

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

    context('DELETE /api/users/{id}', () => {
        it('TC-API-DELETE-USER-001: Successfully delete a user with valid user ID', () => {
            apiRequest({ method: 'DELETE', url: '/api/users/2' }).then((res) => {
                expect(res.status).to.eq(204);
                expect(res.body).to.be.empty;
            });
        });

        it('TC-API-DELETE-USER-002: Verify that delete rejected when request without authorization token', () => {
            apiRequest({ method: 'DELETE', url: '/api/users/2' }, false).then((res) => {
                expect(res.status).to.eq(403);
            });
        });
    });

});