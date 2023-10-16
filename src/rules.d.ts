import type { RuleModule } from "@typescript-eslint/utils/ts-eslint";

export interface TypeScriptESLintRules {
  [ruleName: string]: RuleModule<string, unknown[]>;
}
declare const rules: TypeScriptESLintRules;
export = rules;
