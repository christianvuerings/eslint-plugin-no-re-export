import { RuleTester } from "@typescript-eslint/rule-tester";
import rule from "../rules/no-re-export";

const ruleTester = new RuleTester({
  parser: "@typescript-eslint/parser",
});

ruleTester.run("no-re-export", rule, {
  valid: [
    `
import Button from 'app/CustomButton';
export const CustomButtom = 'Button';
`,
  ],
  invalid: [
    {
      code: `
import Button1 from 'app/CustomButton';
export const CustomButtom = Button1;
`,
      errors: [{ messageId: "noReExports" as const }],
    },
    {
      code: `
import { Button as CustomButtom2 } from 'app/CustomButton';
export const CustomButtom = CustomButtom2;
`,
      errors: [{ messageId: "noReExports" as const }],
    },
    {
      code: `
import * as Button3 from "app/Button"
export const CustomButtom = Button3;
`,
      errors: [{ messageId: "noReExports" as const }],
    },
    {
      code: `
import Button4 from 'app/CustomButtom';
export default Button4;
`,
      errors: [{ messageId: "noReExports" as const }],
    },
    {
      code: `
export { default as Button5 } from 'app/CustomButtom';
`,
      errors: [{ messageId: "noReExports" as const }],
    },
    {
      code: `
import Button6 from 'app/CustomButtom';
export {
  Button6
};
`,
      errors: [{ messageId: "noReExports" as const }],
    },
    {
      code: `
import Button7 from 'app/CustomButtom';
export const Buttons = {
  Button: Button7
};
`,
      errors: [{ messageId: "noReExports" as const }],
    },
    {
      code: `
import Button8 from 'app/CustomButtom';
export default Button8;
export { Button8 }
`,
      errors: [{ messageId: "noReExports" as const }, { messageId: "noReExports" as const }],
    },
    {
      code: `
export * from 'app/CustomButtom';
      `,
      errors: [{ messageId: "noReExports" as const }],
    },
  ],
});
