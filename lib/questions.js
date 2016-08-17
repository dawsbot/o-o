// inquirer questions
module.exports = {
  clearOQuestion: [{
    type: 'confirm',
    name: 'clear',
    message: 'Are you sure you want to clear all bookmarks (this is irreversable):'
  }],
  newOQuestions: [
    {
      type: 'input',
      name: 'path',
      message: 'Enter a path (url, file, etc.) to o:',
      filter: val => {
        return val.trim();
      }
    },
    {
      type: 'input',
      name: 'alias',
      message: 'Enter a convenient alias to remember your new o (example: "hn" for hackernews):',
      filter: val => {
        return val.trim();
      }
    }
  ]
};
