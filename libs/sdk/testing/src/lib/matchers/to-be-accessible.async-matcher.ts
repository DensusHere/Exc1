import axe from 'axe-core';

import { SkyAsyncMatcherToBeAccessibleConfig } from './to-be-accessible-config';

function formatViolations(results: axe.AxeResults): string {
  let message = `Expected element to pass accessibility checks.

The following violation(s) must be addressed:
---------------------------------------------
`;

  for (const violation of results.violations) {
    const tags = `Tags:             ${violation.tags.join(' ')}`;

    message += `
${violation.nodes.reduce(
  (accumulator: string, node: axe.NodeResult) =>
    `${accumulator}\n${node.html}\n`,
  ''
)}
Rule:             \x1b[31m${violation.id}\x1b[0m
Impact:           ${violation.impact || 'unknown'}
Description:      ${violation.description}
How to resolve:   ${violation.help}
More info:        ${violation.helpUrl}
${tags}
${'-'.repeat(tags.length)}
`;
  }

  return message;
}

function getAxeConfig(
  config: SkyAsyncMatcherToBeAccessibleConfig
): axe.RunOptions {
  const axeRulesOverrides = new Map<string, { enabled: boolean }>();

  // Enable all rules by default.
  // axe
  //   .getRules([
  //     'wcag2a',
  //     'wcag2aa',
  //     'wcag2aaa',
  //     'wcag21a',
  //     'wcag21aa',
  //     'wcag21aaa',
  //   ])
  //   .forEach((rule) => {
  //     axeRulesOverrides.set(rule.ruleId, { enabled: true });
  //   });

  // Disable rules for default theme.
  if (config.skyTheme === 'default') {
    axeRulesOverrides.set('color-contrast', { enabled: false });
  }

  const axeConfig: axe.RunOptions = {
    ...{},
    ...(config?.axeOverrides || {}),
  };
  axeConfig.rules = {
    ...Object.fromEntries(axeRulesOverrides),
    ...(config?.axeOverrides?.rules || {}),
  };
  return axeConfig;
}

function toBeA11y(): jasmine.CustomAsyncMatcher {
  return {
    async compare(
      actual: Element | null,
      config?: SkyAsyncMatcherToBeAccessibleConfig
    ): Promise<jasmine.CustomMatcherResult> {
      if (!actual) {
        throw new Error('No element was specified for accessibility checking.');
      }

      const defaults: SkyAsyncMatcherToBeAccessibleConfig = {
        skyTheme: 'default',
      };

      const settings: SkyAsyncMatcherToBeAccessibleConfig = {
        ...defaults,
        ...(config || {}),
      };

      // Reconfigure axe for each run.
      axe.reset();
      axe.configure({
        reporter: 'v2',
      });

      const axeConfig = getAxeConfig(settings);

      try {
        const result = await axe.run(actual, axeConfig);
        if (result.violations) {
          return { pass: false, message: formatViolations(result) };
        }
      } catch (err) {
        return { pass: false, message: (err as Error).message };
      }

      return { pass: true };
    },
  };
}

export const SkyJasmineAsyncMatchers: jasmine.CustomAsyncMatcherFactories = {
  toBeA11y,
};
