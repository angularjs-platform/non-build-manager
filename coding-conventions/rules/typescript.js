module.exports = {
    "rules": {
        "align": [
            false,
            "parameters",
            "arguments",
            "statements"
        ],
        "ban": false,
        "class-name": true,
        "comment-format": [
            true,
            "check-space"
        ],
        "curly": true,
        "eofline": true,
        "forin": true,
        "indent": [
            true,
            "spaces"
        ],
        "interface-name": true,
        "jsdoc-format": true,
        "label-position": true,
        "label-undefined": true,
        "max-line-length": [
            true,
            250
        ],
        "member-access": false,
        "member-ordering": [
            true,
            "public-before-private",
            "static-before-instance",
            "variables-before-functions"
        ],
        "no-any": false,
        "no-arg": true,
        "no-bitwise": true,
        "no-conditional-assignment": true,
        "no-consecutive-blank-lines": false,
        "no-console": [
            true,
            "debug",
            "info",
            "time",
            "timeEnd",
            "trace"
        ],
        "no-construct": true,
        "no-constructor-vars": false,
        "no-debugger": true,
        "no-duplicate-key": true,
        "no-duplicate-variable": true,
        "no-empty": true,
        "no-eval": true,
        "no-inferrable-types": false,
        "no-internal-module": true,
        "no-null-keyword": false,
        "no-require-imports": false,
        "no-shadowed-variable": true,
        "no-string-literal": false,
        "no-switch-case-fall-through": true,
        "no-trailing-whitespace": true,
        "no-unreachable": true,
        "no-unused-expression": false,
        "no-unused-variable": true,
        "no-use-before-declare": true,
        "no-var-keyword": true,
        "no-var-requires": false,
        "object-literal-sort-keys": false,
        "one-line": [
            true,
            "check-open-brace",
            "check-catch",
            "check-finally",
            "check-whitespace"
        ],
        "quotemark": [
            true,
            "single",
            "avoid-escape"
        ],
        "radix": true,
        "semicolon": [true, "always"],
        "switch-default": true,
        "trailing-comma": [
            true,
            {
                "multiline": "never",
                "singleline": "never"
            }
        ],
        "triple-equals": [
            true,
            "allow-null-check"
        ],
        "typedef": [
            true,
            "call-signature",
            "parameter",
            "arrow-parameter",
            "property-declaration",
            "variable-declaration"
        ],
        "typedef-whitespace": [
            true,
            {
                "call-signature": "nospace",
                "index-signature": "nospace",
                "parameter": "nospace",
                "property-declaration": "nospace",
                "variable-declaration": "nospace"
            },
            {
                "call-signature": "space",
                "index-signature": "space",
                "parameter": "space",
                "property-declaration": "space",
                "variable-declaration": "space"
            }
        ],
        "use-strict": [false],
        "variable-name": [
            true,
            "allow-leading-underscore",
            "ban-keywords"
        ],
        "whitespace": [
            true,
            "check-branch",
            "check-decl",
            "check-operator",
            "check-separator",
            "check-type"
        ],
        "no-constant-condition": false,
        "no-control-regex": true,
        "no-duplicate-case": true,
        "no-empty-character-class": true,
        "no-extra-boolean-cast": true,
        "no-extra-semi": true,
        "no-inner-declarations": [
            true,
            "functions"
        ],
        "no-invalid-regexp": true,
        "no-irregular-whitespace": true,
        "no-regex-spaces": true,
        "no-sparse-arrays": true,
        "no-unexpected-multiline": false,
        "use-isnan": true,
        "valid-typeof": true
    }
};
