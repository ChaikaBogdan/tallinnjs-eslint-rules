# tallinnjs-eslint-rules
## BEFORE ALL: Get familiar with AST
- https://www.twilio.com/blog/abstract-syntax-trees
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

## STEP II: Parsing code tree using [AST Explorer](https://astexplorer.net/), [ESQuery](http://estools.github.io/esquery/) to define your rule 
1. Prepare your real-life code snippests both positive and negative. TDD is encouraged while working with ESlint rules.
2. Open https://astexplorer.net/, select desired Parser/Transformer(@babel/eslint-parser-7.13.14, ESLint v8-8.9.0, TS suported too!)
3. Paste your first most simple snippet into [AST](https://en.wikipedia.org/wiki/Abstract_syntax_tree) Explorer
```
test('test1',async()=>{allure.story("JIRA-123");expect(success).toBeTruthy();});
console.log('123')
test('test2',async()=>{expect(success).toBeTruthy();});
```
4. Clean the rule code a little bit, we dont need fixer for now
```
export const meta = {
  type: "problem"
};
export function create(context) {
  return {
    "your querry": (node) => {
      // your rule login goes here
      context.report({
        node,
        message: "Your warning"
      });
    }
  };
}
```
5. Get familiar with your code nodes using AST Explorer
```
Program - whole program
Literals - values
CallExpressions - function calls
ArrowFunctionExpression - arrow functions
ArrayExpressions - arrays
Check what objects have callee, arguments, properties, etc
```
You can parse from Program (if for example you need file names to filter spec files), but usually its not needed as you can target specific node type.

6. Create your entry point query, try to be as narrow as you can for speed, and node object complexity.
You can debug how your query works in http://estools.github.io/esquery/. You can read more about query language in https://github.com/estools/esquery
```
CallExpression[callee.name ='test']" - will catch all Playwrigth test functions
```
7. Using AST parse down to the required by rule elements, in my case - I need to check what test body doesnot have any allure.story calls
```
  "CallExpression[callee.name ='test']": (node) => {
      let testBody = node.arguments[1].body.body;
      if (!testBody) {
        return;
      }
      let story = testBody.filter(
        (expression) =>
          expression.type === "ExpressionStatement" &&
          expression.expression.type == "CallExpression" &&
          expression.expression.callee.object.name == "allure" &&
          expression.expression.callee.property.name === "story"
      );
      if (!story.length) {
        context.report({
          node,
          message: "At least allure.story() should be annotated!"
        });
      }
    }
```
8. Check our new rule on various negative and positive cases, add them to tests and run `npm test`

## STEP III: Test and enable your rule
1. Use pre-provisioned Mocha tests with `npm test`. You can also [midnight-smoker](https://www.npmjs.com/package/midnight-smoker) to test before publish to NPM
2. Store it in your repository and add `"eslint-plugin-<plugin_name>": "file:/path/to/plugin"` to your projects `package.json`
3. Use `npm link`
4. Publish it to an npm registry and simply add the plugin name to your `package.json`
