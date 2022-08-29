# tallinnjs-eslint-rules

## STEP I: How to generate your own ESLint plugin and rule using Yeoman

1. Install [Yeoman](https://yeoman.io/) and [ESLint generator](https://www.npmjs.com/package/generator-eslint) for it
```
npm install -g yo generator-eslint
```
2. Invoke `yo` and init your own ESLint Plugin
```
```
3. Now just `npm install` and you have yourself a plugin

4. Invoke `yo` again and init your first rule
```
```
5. Check new files generated for the rule:
 - `lib/rules/<rule-name>.js` This is where we’ll write the logic to implement the rule.
 - `docs/rules/<rule-name>.md` This is a Markdown file that documents your rule.
 - `tests/lib/rules/<rule-name>.js` This is a scaffold of a test suite with an example of a test of some invalid code.
