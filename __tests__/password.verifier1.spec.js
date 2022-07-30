// password.verifier1.spec.js
// Using Before Each()
// Using Factory Method Route (const)
const { PasswordVerifier1 } = require('../password-verifier1');

describe('v7 PasswordVerifier1', () => {
    let verifier;
    beforeEach(() => verifier = new PasswordVerifier1());

    test('verify, with no rules, throws exception', () => {
        try {
            verifier.verify('any input');
            fail('error was expected but not thrown');
        } catch (e) {
            expect(e.message).toContain('no rules configured');
        }
    });

    describe('with a failing rule', () => {
        //Arrange
        let errors;
        beforeEach(() => {
            verifier.addRule(makeFailingRule('fake reason'));
            //Act
            errors = verifier.verify('any value');
        });

        it('has an error message based on the rule.reason', () => {
            //Assert
            expect(errors[0]).toContain('fake reason');
        })

        it('has exactly one error', () => {
            //Assert
            expect(errors.length).toBe(1);
        })
    });

    describe('with a passing rule', () => {
        //Arrange
        let fakeRule, errors;
        beforeEach(() => {
            verifier.addRule(makePassingRule());
            //Act
            errors = verifier.verify('any value');
        });
        it('has no errors', () => {
            //Assert
            expect(errors.length).toBe(0);
        });
    });


    describe('with a failing and a passing rule', () => {
        //Arrange
        let fakeRulePass, fakeRuleFail, errors;
        beforeEach(() => {
            verifier.addRule(makePassingRule());
            verifier.addRule(makeFailingRule('fake reason'));
            //Act
            errors = verifier.verify('any value');
        });
        it('has one error', () => {
            //Assert
            expect(errors.length).toBe(1);
        });
        it('error text belongs to failed rule', () => {
            //Assert
            expect(errors[0]).toContain('fake reason');
        });
    });


    const makeFailingRule = (reason) => {
        return (input) => {
            return { passed: false, reason: reason };
        };
    };

    const makePassingRule = () => (input) => {
        return { passed: true, reason: '' }
    };
});

