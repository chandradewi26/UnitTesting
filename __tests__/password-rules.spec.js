// password-rules.spec.js
const { oneUpperCaseRule } = require('../password-rules');

describe('one uppercase rule', function () {
    test('given no uppercase, it fails', () => {
        const result = oneUpperCaseRule('abc');
        expect(result.passed).toEqual(false);
    });

    test.each(['Abc', 'aBC'])
        ('given uppercases, it passes', (input) => {
            const result = oneUpperCaseRule(input);
            expect(result.passed).toEqual(true);
        });
});

// password-rules.spec.js
describe('v3 one uppercase rule', () => {
    test.each([['Abc', true],
        ['aBC', true],
        ['abc', false]])
    ('given %s, %s ', (input, expected) => {
        const result = oneUpperCaseRule(input);
        expect(result.passed).toEqual(expected);
    });
});

describe('v5 one uppercase rule, with vanila JS test.each', () => {
    const tests = {
        'Abc': true,
        'aBc': true,
        'abc': false,
    };

    for (const [input, expected] of Object.entries(tests)) {
        test(`given ${input}, ${expected}`, () => {
            const result = oneUpperCaseRule(input);
            expect(result.passed).toEqual(expected);
        });
    }
});