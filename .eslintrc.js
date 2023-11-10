module.exports = {
    root: true,
    extends: [
        'airbnb-base',
        'airbnb-typescript/base'
    ],
    plugins: ['import', 'prettier'],
    parserOptions: {
      project: './tsconfig.eslint.json',
    },
    rules: {
        "import/prefer-default-export": "off",
        "no-underscore-dangle":  "off",
        "max-classes-per-file": "off",
        "max-len": "off",
        "class-methods-use-this": "off",
        "no-param-reassign": "off",
        "default-param-last" : "off",
        "import/no-cycle": "off",
        "no-useless-escape": "off"
    }
  };
  