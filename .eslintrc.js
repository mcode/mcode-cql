module.exports = {
  env: {
    commonjs: true,
    es2020: true,
    jest: true,
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 11,
  },
  rules: {
    'no-console': 'off',
    'no-underscore-dangle': [2, { allow: ['_json'] }],
  },
};
