// api landing response. return a summary of commands available.
const apiLanding = async (req, res) => {
  const resource = {
    'List All Characters': '/api/character',
    'List All Planets': '/api/planet',
  };
  res.status(200).json(resource);
};

module.exports = { apiLanding };
