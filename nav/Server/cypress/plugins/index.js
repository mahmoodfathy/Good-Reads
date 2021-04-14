/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
const MongoClient = require("mongodb").MongoClient;
module.exports = (on, config) => {
  on("task", {
    getCategoriesTask(id) {
      return new Promise((resolve) => {
        MongoClient.connect("mongodb://localhost:27017", (err, client) => {
          if (err) {
            console.log(`MONGO CONNECTION ERROR: ${err}`);
            throw err;
          } else {
            const db = client.db("goodReads");
            db.collection("categories")
              .find({})
              .toArray(function (error, nodocs) {
                // console.log(nodocs[2]._id);
                resolve(nodocs);
                client.close();
              });
          }
        });
      }); // end of return Promise
    },
  }); // end of task
};
