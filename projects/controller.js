const { handleError } = require('../utils/handleHttpError');
const { validateId } = require('../utils/validateId');
const projectsRepository = require('./repository');

async function getProject(req, res) {
  const { id } = req.params;

  if (!validateId(id)) {
    return handleError(res, 400);
  }

  try {
    const project = await projectsRepository.getProject(id);

    if (!project) {
      handleError(res, 404, `Project with id ${id} not found`);
    }

    return res.end(JSON.stringify(project));
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getProject,
};
