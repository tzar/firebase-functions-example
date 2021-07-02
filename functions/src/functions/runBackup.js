const functions = require('firebase-functions');
const firestore = require('@google-cloud/firestore');

const client = new firestore.v1.FirestoreAdminClient();

// Curious about this function works? Here's an article:
//
// https://levelup.gitconnected.com/how-to-back-up-firestore-easily-and-automatically-eab6bf0d7e1f
module.exports = function runBackup() {
  const backupConfig = functions.config().backups;
  if (!backupConfig) {
    console.log('No backup config, skipping');
    return 'skip';
  }
  const projectId = process.env.GCP_PROJECT || process.env.GCLOUD_PROJECT;
  const databaseName = client.databasePath(projectId, '(default)');
  const { bucket } = backupConfig;

  return client
    .exportDocuments({
      name: databaseName,
      outputUriPrefix: bucket,
      // Empty array == all collections
      collectionIds: [],
    })
    .then(([response]) => {
      console.log(`Operation Name: ${response.name}`);
      return response;
    })
    .catch((err) => {
      console.error(err);
      throw new Error('Export operation failed');
    });
};
