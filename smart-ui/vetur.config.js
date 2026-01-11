module.exports = {
  projects: [
    {
      root: '.',
      package: './package.json',
      tsconfig: './tsconfig.json',
      snippetFolder: './.vscode/vetur/snippets',
      globalComponents: [
        './src/components/**/*.vue'
      ]
    }
  ],
  settings: {
    'vetur.useWorkspaceDependencies': true,
    'vetur.experimental.templateInterpolationService': true,
    'vetur.validation.script': true,
    'vetur.validation.template': true,
    'vetur.validation.style': true,
    'vetur.format.defaultFormatter.html': 'prettier',
    'vetur.format.defaultFormatter.css': 'prettier',
    'vetur.format.defaultFormatter.scss': 'prettier',
    'vetur.format.defaultFormatter.postcss': 'prettier',
    'vetur.format.defaultFormatter.stylus': 'stylus-supremacy',
    'vetur.format.defaultFormatter.js': 'prettier',
    'vetur.format.defaultFormatter.ts': 'prettier'
  }
}
