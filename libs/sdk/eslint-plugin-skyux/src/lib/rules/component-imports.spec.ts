import { RuleTester } from '@typescript-eslint/experimental-utils/dist/eslint-utils';

import { componentImports } from './component-imports';

const ruleTester = new RuleTester({
  parser: '@typescript-eslint/parser',
});

ruleTester.run('@skyux-eslint/component-imports', componentImports, {
  valid: [
    {
      code: `import {FooComponent} from '@skyux/foo/bar/baz.component';`,
    },
  ],
  invalid: [],
});
