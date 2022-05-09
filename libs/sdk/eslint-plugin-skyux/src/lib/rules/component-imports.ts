import { createRule } from '../utils/create-rule';

export const componentImports = createRule({
  name: '@skyux-eslint/component-imports',
  meta: {
    docs: {
      description: 'SKY UX components should not be imported',
      recommended: 'error',
      requiresTypeChecking: false,
    },
    messages: {},
    type: 'problem',
    schema: {},
  },
  defaultOptions: [],
  create: function () {
    return {
      ClassDeclaration(node) {
        console.log(node.body);
      },
    };
  },
});
