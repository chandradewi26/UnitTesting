// password.verifier0.spec.js
const { verifyPassword } = require('../password-verifier0');

describe('verifyPassword', () => {
    describe('given a failing rule', () => {
        test('returns errors', () => { //or it rather than test

            //Arrange
            const fakeRule = input => ({
                passed: false,
                reason: 'fake reason'
            });

            //Act
            const errors = verifyPassword('any value', [fakeRule]);

            //Assert
            expect(errors[0]).toContain('fake reason');
        });
    });
});