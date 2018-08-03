const fs = require('fs');
const path = require('path');
const program = require('commander');
const { prompt, registerPrompt } = require('inquirer');
const colors = require('colors/safe');
const { getMainJS, getStylesJS, getTestsJS } = require('./templates');

registerPrompt('fuzzypath', require('inquirer-fuzzy-path'));

const questions = [
  {
    type: 'input',
    name: 'name',
    message: 'What would you like to name this component? ...',
  },
  {
    type: 'list',
    name: 'type',
    message: 'What type of component will this be? ...',
    choices: [ 'Class', 'Functional', 'Higher Order' ],
  },
  {
    type: 'fuzzypath',
    name: 'directory',
    pathFilter: isDirectory => isDirectory,
    message: 'What directory do you want this component located in? ...',
    suggestOnly: false,
  },
];

const createComponent = ({ name, type, directory }) => {
  const fullDirectory = path.join(directory, name);
  fs.mkdirSync(fullDirectory);
  fs.writeFileSync(path.join(fullDirectory, 'index.js'), getMainJS(name, type), 'utf8');
  if (type !== 'Higher Order') {
    fs.writeFileSync(path.join(fullDirectory, 'index.styles.js'), getStylesJS(), 'utf8');
  }
  fs.writeFileSync(path.join(fullDirectory, 'index.test.js'), getTestsJS(name, type), 'utf8');
  console.log(colors.green('Your component has been created!'));
};

const getDefaultDirectory = componentType => (componentType === 'Higher Order' ? 'HOC' : './');

program
  .command('generateComponent')
  .description('Add a component to the project.')
  .action(() => {
    prompt(questions.slice(0, 2)).then((answers) => {
      prompt({ ...questions[2], rootPath: getDefaultDirectory(answers.type) }).then((answer) => {
        if (!answers.name) {
          console.error(colors.red('You must provide a name for your component'));
        } else {
          createComponent({ ...answers, ...answer });
        }
      });
    });
  });

program.parse(process.argv);
