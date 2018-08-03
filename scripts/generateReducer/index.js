const fs = require('fs');
const path = require('path');
const program = require('commander');
const { prompt } = require('inquirer');
const colors = require('colors/safe');

const question = {
  type: 'input',
  name: 'name',
  message: 'What would you like to name this reducer? ...',
};

const getMainJS = name =>
`/* @flow */
import types from './types';

const initialState: {} = {};
type Action = {
  type: string
};

export default function (state: {} = initialState, action: Action) {
  switch (action.type) {
    default: return state;
  }
}
`;

const getTypesJS = () =>
`/* @flow */

export default {};
`;

const getTestsJS = name =>
`import ${name} from './';

describe('${name} reducer', () => {
  it('should return the previous state when the action type is unmatched', () => {
    const previousState = { foo: 'bar' };
    expect(${name}(previousState, {})).toMatchObject(previousState);
  });
});
`;

const createReducer = ({ name }) => {
  const fullDirectory = path.join('src/reducers/', name);
  fs.mkdirSync(fullDirectory);
  fs.writeFileSync(path.join(fullDirectory, 'index.js'), getMainJS(name), 'utf8');
  fs.writeFileSync(path.join(fullDirectory, 'types.js'), getTypesJS(), 'utf8');
  fs.writeFileSync(path.join(fullDirectory, 'index.test.js'), getTestsJS(name), 'utf8');
  console.log(colors.green('Your reducer has been created!'));
};

program
  .command('generateReducer')
  .description('Add a reducer to the project.')
  .action(() => {
    prompt(question).then((answer) => {
      if (!answer.name) {
        console.error(colors.red('You must provide a name for your reducer'));
      } else {
        createReducer(answer);
      }
    });
  });

program.parse(process.argv);
