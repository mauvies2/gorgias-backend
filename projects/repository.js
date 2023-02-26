const dataStore = require('../data-store');

function getProject(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const project = dataStore.find((el) => el.id == id);

      if (project || project === undefined) {
        resolve(project);
      } else {
        reject();
      }
    }, 200);
  });
}

module.exports = {
  getProject,
};
