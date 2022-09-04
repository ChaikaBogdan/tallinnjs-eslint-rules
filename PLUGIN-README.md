# eslint-plugin-tallinnjs-rules

Eslint plugin and rules for TallinnJS talk please check [original repo](https://github.com/bogdan-bashev/tallinnjs-eslint-rules) for step-by-step guide.

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-tallinnjs-rules`:

```sh
npm install eslint-plugin-tallinnjs-rules --save-dev
```

## Usage

Add `tallinnjs-rules` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "tallinnjs-rules"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "tallinnjs-rules/playwright-allure-story": 2
    }
}
```

## Supported Rules

* playwright-allure-story - Every Playwright test should have Allure story annotaion


