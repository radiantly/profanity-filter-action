import * as core from '@actions/core'
import * as github from '@actions/github'

try {
  console.log("Hello World!");
  if (github.context.eventName === 'issue') {
    core.info(`The context contains: ${JSON.stringify(github.context)}`);
  }
} catch (error) {
  core.setFailed(error.message);
}