import { https, pubsub } from "firebase-functions";
import { http, cron } from "@any-cloud/core";

const server = http();

// Graphql api
// https://us-central1-<project-name>.cloudfunctions.net/api/
export const api = https.onRequest(server);

Object.keys(cron).forEach(cronJobName => {
  const cronJob = cron[cronJobName];
  const [cronSpec, cronFn] = cronJob;
  module.exports[cronJobName] = pubsub.schedule(cronSpec).onRun(cronFn);
});
