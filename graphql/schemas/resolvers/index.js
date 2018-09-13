const fs = require('fs');
const path = require('path');
const {forEach} = require('lodash');

let resolvers = {
	Query: {},
  Mutation: {}
};

const folders = [
  `${__dirname}/mutations`,
  `${__dirname}/querys`,
  `${__dirname}/connections`
];

forEach(folders, (folder) => {
  fs
    .readdirSync(folder)
    .filter((file) => {
      return (file.indexOf('.') !== 0) && (file.slice(-3) === '.js');
    })
    .forEach((file) => {
      if(file.match(/(query)/)) {
        Object.assign(resolvers.Query, require(path.join(folder, file)))
      } else if (file.match(/(mutation)/)) {
        Object.assign(resolvers.Mutation, require(path.join(folder, file)))
      } else {
        Object.assign(resolvers, require(path.join(folder, file)))
      }
    });
});

module.exports = resolvers;