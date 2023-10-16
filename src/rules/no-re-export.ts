import { AST_NODE_TYPES, ESLintUtils, TSESTree } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/christianvuerings/eslint-plugin-no-re-export/blob/main/docs/${name}.md`,
);

interface ReportInfo {
  location: TSESTree.SourceLocation;
  type: "DefaultReExport" | "ExportDefault" | "ExportObject" | "ObjectProperty" | "Variable";
}

export default createRule({
  name: "no-re-export",
  defaultOptions: [],
  meta: {
    docs: {
      description:
        "Disallow re-exports of imports. Avoids losing type safety & ensures bundle size does not increase by importing too much.",
      recommended: "error",
    },
    messages: {
      noReExports: "Do not re-export '{{name}}'",
    },
    type: "problem",
    schema: [],
  },

  create(context) {
    const imports = new Map();
    const exports: Record<string, ReportInfo[]> = {};

    const appendToExports = (name: string, reportInfo: ReportInfo) => {
      exports[name] = [...(exports[name] ? exports[name] : []), reportInfo];
    };

    return {
      ImportDefaultSpecifier(node) {
        imports.set(node.local.name, { node });
      },
      ImportSpecifier(node) {
        imports.set(node.local.name, { node });
      },
      ImportNamespaceSpecifier(node) {
        imports.set(node.local.name, { node });
      },
      // export * from 'app/CustomCustomButton'
      ExportAllDeclaration(node) {
        context.report({
          loc: node.loc,
          messageId: "noReExports",
          data: {
            name: node.source.value,
          },
        });
      },
      ExportNamedDeclaration(node) {
        if (
          node.declaration &&
          node.declaration?.type === AST_NODE_TYPES.VariableDeclaration &&
          node.declaration.declarations
        ) {
          node.declaration.declarations.forEach((declaration) => {
            if (declaration.init?.type === AST_NODE_TYPES.Identifier && declaration.init?.name) {
              // export const CustomButtom = Button;
              appendToExports(declaration.init.name, {
                location: declaration.init.loc,
                type: "Variable",
              });
            } else if (
              declaration.init?.type === AST_NODE_TYPES.ObjectExpression &&
              declaration.init.properties
            ) {
              declaration.init.properties.forEach((property) => {
                if (
                  property?.type === AST_NODE_TYPES.Property &&
                  property.value.type === AST_NODE_TYPES.Identifier &&
                  property.value?.name
                ) {
                  // export const CustomButton = { Button }
                  appendToExports(property.value.name, {
                    location: property.loc,
                    type: "ObjectProperty",
                  });
                }
              });
            }
          });
        } else if (node.specifiers) {
          node.specifiers.forEach((specifier) => {
            if (node.source && specifier.local.name === "default") {
              // export { default as Button } from 'app/CustomButtom';
              appendToExports(specifier.exported.name, {
                location: specifier.exported.loc,
                type: "DefaultReExport",
              });
            } else {
              // export { Button }
              appendToExports(specifier.local.name, {
                location: specifier.local.loc,
                type: "ExportObject",
              });
            }
          });
        }
      },
      ExportDefaultDeclaration(node) {
        if (node.declaration.type === AST_NODE_TYPES.Identifier) {
          // export default Button
          appendToExports(node.declaration.name, {
            location: node.declaration.loc,
            type: "ExportDefault",
          });
        }
      },
      "Program:exit": function programExit() {
        Object.keys(exports).forEach((exportName) => {
          const reportInfoList = exports[exportName];
          reportInfoList.forEach(({ location, type }) => {
            if (imports.has(exportName) || type === "DefaultReExport") {
              context.report({
                loc: location,
                messageId: "noReExports",
                data: {
                  name: exportName,
                },
              });
            }
          });
        });
      },
    };
  },
});
