/* eslint-disable eslint-plugin/prefer-message-ids */
/**
 * @fileoverview Every Playwright test should have Allure story annotaion
 * @author Bogdan Bashev
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'problem', // `problem`, `suggestion`, or `layout`
    docs: {
      description: "Every Playwright test should have Allure story annotaion",
      recommended: true,
    },
    schema: [],
  },

  create: (context) => ({
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
    },
  })
};
