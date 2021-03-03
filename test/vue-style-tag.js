
const rule = require('../lib/index').rules['use-scoped-or-module']
let RuleTester
try {
    RuleTester = require('eslint/lib/rule-tester').RuleTester
} catch (e) {
    RuleTester = require('eslint/lib/testers/rule-tester.js')
}
const ruleTester = new RuleTester({
    parser: require.resolve('vue-eslint-parser'),
    parserOptions: { ecmaVersion: 6, sourceType: 'module' }
})

ruleTester.run('use-scoped-or-module', rule, {
    valid: [
        // without style tag
        [
            '',
        ].join('\n'),
        [
            '<template></template>',
        ].join('\n'),
        [
            '<script></script>',
        ].join('\n'),
        [
            '<template></template>',
            '<script></script>',
        ].join('\n'),

        // style tag with scoped or module attribute
        [
            '<style scoped></style>',
        ].join('\n'),
        [
            '<style module></style>',
        ].join('\n'),
        [
            '<template></template>',
            '<style module></style>',
        ].join('\n'),
        [
            '<script></script>',
            '<style module></style>',
        ].join('\n'),
        [
            '<template></template>',
            '<script></script>',
            '<style module></style>',
        ].join('\n'),
    ],
    invalid: [
        // style tag without scoped or module attribute
        {
            code: [
                '<style></style>',
            ].join('\n'),
            errors: [
                { line: 1, column: 1 },
            ],
        },
        {
            code: [
                '<template></template>',
                '<style></style>',
            ].join('\n'),
            errors: [
                { line: 2, column: 1 },
            ],
        },
        {
            code: [
                '<script></script>',
                '<style></style>',
            ].join('\n'),
            errors: [
                { line: 2, column: 1 },
            ],
        },
        {
            code: [
                '<template></template>',
                '<script></script>',
                '<style></style>',
            ].join('\n'),
            errors: [
                { line: 3, column: 1 },
            ],
        },
        {
            code: [
                '<template></template>',
                '<script></script>',
                '<style></style>',
                '<style scoped></style>',
            ].join('\n'),
            errors: [
                { line: 3, column: 1 },
            ],
        },
        {
            code: [
                '<template></template>',
                '<script></script>',
                '<style scoped></style>',
                '<style></style>',
            ].join('\n'),
            errors: [
                { line: 4, column: 1 },
            ],
        },
        {
            code: [
                '<template></template>',
                '<script></script>',
                '<style></style>',
                '<style></style>',
            ].join('\n'),
            errors: [
                { line: 3, column: 1 },
                { line: 4, column: 1 },
            ],
        },
    ],
})
