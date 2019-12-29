module.exports = {
    root: true,
    "env": {
        "browser": true,
    },
    parser: "babel-eslint",
    parserOptions: {
        sourceType: 'module',
        allowImportExportEverywhere: true
    },
    extends: [
        'eslint:recommended',
        //'airbnb-base'  // broken as of 14.0.0
    ],
    "rules": {
        //'airbnb-base' overrides
        "no-underscore-dangle": ["error", {
            "allowAfterThis": true
        }],
        "prefer-destructuring": ["error", {
            "array": false,
            "object": true
        }],
        "max-len": ["error", 100, 4, {
            "ignoreUrls": true,
            "ignoreComments": true,
            "ignoreTrailingComments": true,
            "ignoreRegExpLiterals": true,
            "ignoreStrings": true,
            "ignoreTemplateLiterals": true,
        }],
        "no-new": 0,
        "no-plusplus": ["error", {
            "allowForLoopAfterthoughts": true
        }],
        'comma-dangle': ['error', {
            arrays: 'always-multiline',
            objects: 'always-multiline',
            imports: 'always-multiline',
            exports: 'always-multiline',
            functions: 'never',
        }],
        'no-console': ['error', {
            'allow': ['warn', 'error']
            }
        ],
    },
    'globals': {
        'EventBus': true,
        'StateMachine': true,
        'Components': true
    }
}