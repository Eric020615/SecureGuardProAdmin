module.exports = {
    root: true,
    env: { browser: true, es2021: true },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs', "components/**/*.tsx"],
    parser: '@typescript-eslint/parser',
    plugins: ['react-refresh'],
    rules: {
        curly: ["error", "multi", "consistent"],
        'react-refresh/only-export-components': [
            'warn',
            { allowConstantExport: true },
        ],
        // '@typescript-eslint/no-explicit-any': ['on'],
    },
}
