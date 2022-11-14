module.exports = (plop) => {
  plop.setGenerator("component", {
    description: "Main plopfile",
    prompts: [
      {
        type: "list",
        name: "componentType",
        message: "Type of the Component",
        choices: ["components", "pages"],
      },
      {
        type: "input",
        name: "componentName",
        message: "Name of the Component",
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/{{componentType}}/{{pascalCase componentName}}/{{pascalCase componentName}}.scss",
        templateFile: "plop_templates/components/component.scss.hbs",
      },
      {
        type: "add",
        path: "src/{{componentType}}/{{pascalCase componentName}}/{{pascalCase componentName}}.types.ts",
        templateFile: "plop_templates/components/component.types.hbs",
      },
      {
        type: "add",
        path: "src/{{componentType}}/{{pascalCase componentName}}/{{pascalCase componentName}}.tsx",
        templateFile: "plop_templates/components/component.hbs",
      },
      {
        type: "add",
        path: "src/{{componentType}}/{{pascalCase componentName}}/index.ts",
        templateFile: "plop_templates/components/index.hbs",
      },
      {
        type: "add",
        path: "src/{{componentType}}/{{pascalCase componentName}}/__test__/{{pascalCase componentName}}.test.tsx",
        templateFile: "plop_templates/components/component.test.hbs",
      },
      {
        type: "append",
        path: "src/styles/main.scss",
        pattern: "/* PLOP_INJECT_IMPORT */",
        template:
          "@import '../{{componentType}}/{{pascalCase componentName}}/{{pascalCase componentName}}.scss';",
      },
      {
        type: "append",
        path: "src/styles/theme/colors.scss",
        pattern: "/* PLOP_INJECT_IMPORT */",
        template: ".sa-{{kebabCase componentName}}{\n}\n",
      },
      {
        type: "append",
        path: "src/{{componentType}}/index.ts",
        pattern: "/* PLOP_INJECT_IMPORT */",
        template: 'export * from "./{{pascalCase componentName}}";',
      },
    ],
  });
};
