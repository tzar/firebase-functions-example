/* eslint global-require: 0 */
require('module-alias/register');

const functions = require('firebase-functions');

// Optional, but chances are every function you have will
// need this and it can only be initialized once
const admin = require('firebase-admin');

admin.initializeApp();

// Default function options
const defaultRuntimeOpts = {
  memory: '1GB',
};

// Lazy registration function
//
// Accepts the name of the function & a function which will
// load the function, e.g via require
function register(fnName, loader) {
  const { FUNCTION_NAME } = process.env;
  if (!FUNCTION_NAME || fnName === FUNCTION_NAME) {
    exports[fnName] = loader(functions.runWith(defaultRuntimeOpts));
  }
}

// Example functions
register('getPosts', (fn) => fn.https.onCall(require('@/functions/getPosts')));
register('getComments', (fn) => fn.https.onCall(require('@/functions/getComments')));
register('emailNewUsers', (fn) => fn.auth.user().onCreate(
  require('@/functions/emailNewUsers'),
));
register('runBackup', (fn) => fn.pubsub.schedule('every 24 hours').onRun(
  require('@/functions/runBackup'),
));
