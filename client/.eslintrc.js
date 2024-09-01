module.exports = {
    parser: '@typescript-eslint/parser', // Use this if you're using TypeScript
    parserOptions: {
      ecmaVersion: 2021, // Use the latest ECMAScript version
      sourceType: 'module', // Allow use of imports
    },
    extends: [
      'eslint:recommended',
      'plugin:react/recommended', // Use recommended settings for React
      'plugin:@typescript-eslint/recommended', // Use recommended settings for TypeScript
    ],
    plugins: [
      'react',
      '@typescript-eslint',
    ],
    rules: {
      'no-unused-vars': 'off', // Change to 'off' to disable
      'react/prop-types': 'off', // Turn off prop-types rule if using TypeScript
      'react/react-in-jsx-scope': 'off', // Required for React 17+
      'no-undef':'off',
      '@typescript-eslint/no-unused-vars': 'off', // Turn off
      // Add or override other rules as needed
    },
    settings: {
      react: {
        version: 'detect', // Automatically detect the React version
      },
    },
  };
  