const { authenticate } = require('@feathersjs/authentication').hooks;

const setTimestamp = name => {
  return async context => {
    context.data[name] = new Date();

    return context;
  };
};

const processMessage = require('../../hooks/process-message');

const populateUser = require('../../hooks/populate-user');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [setTimestamp('createdAt'), processMessage()],
    update: [setTimestamp('updatedAt')],
    patch: [],
    remove: []
  },

  after: {
    all: [populateUser()],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
