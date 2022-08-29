# tallinnjs-eslint-rules
## STEP I: How to generate your own ESLint plugin and rule using Yeoman
1. Install [Yeoman](https://yeoman.io/) and [ESLint generator](https://www.npmjs.com/package/generator-eslint) for it
```
npm install -g yo generator-eslint
```
2. Invoke `yo` and init your own ESLint Plugin
```
Run a generator: ESlint
Do you want to generate a rule or a plugin? Plugin
What is your name? Bogdan Bashev
What is the plugin ID? tallinnjs-rules
Type a short description of this plugin: Eslint plugin and rules for TallinnJS talk
Does this plugin contain custom ESLint rules? Yes
Does this plugin contain one or more processors? No
```
3. Now just `npm install` and you have yourself a plugin
4. Invoke `yo` again and init your first rule
```
Run a generator: ESlint
Do you want to generate a rule or a plugin? Rule
What is your name? Bogdan Bashev
Where will this rule be published? ESLint Plugin
What is the rule ID? playwright-allure-story
Type a short description of this rule: Every Playwright test should have Allure story annotaion
Type a short example of the code that will fail: test('test1',async()=>{expect(success).toBeTruthy();});
```
5. Check new files generated for the rule:
 - `lib/rules/<rule-name>.js` This is where we’ll write the logic to implement the rule.
 - `docs/rules/<rule-name>.md` This is a Markdown file that documents your rule.
 - `tests/lib/rules/<rule-name>.js` This is a scaffold of a test suite with an example of a test of some invalid code.

6. Add one postive scenario to `tests/lib/rules/<rule-name>.js` and make sure your `npm test` failing on tests, and not on the code samples. For example: for Playwright code I was forced to use `parserOptions:{ecmaVersion:8}`
