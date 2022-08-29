/**
 * @fileoverview Every Playwright test should have Allure story annotaion
 * @author Bogdan Bashev
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/playwright-allure-story"),
  RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run("playwright-allure-story", rule, {
  valid: [
    {
      code: `test('test1',async()=>{allure.story("JIRA-123");expect(success).toBeTruthy();});`,
      parserOptions: { ecmaVersion: 8 },
    }
  ],

  invalid: [
    {
      code: `test('test1',async()=>{expect(success).toBeTruthy();});`,
      parserOptions: { ecmaVersion: 8 },
      errors: [{ message: "Fill me in.", type: "Me too" }],
    },
  ],
});
