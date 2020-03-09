import * as core from '@actions/core'
import * as github from '@actions/github'
const Filter = require('bad-words');

try {
  console.log("Hello World!");
  let currentContext = github.context;
  if (currentContext.eventName === 'issue') {
    let filter = new Filter();
    let title = currentContext.issue.title;
    let body = currentContext.issue.body;
    let cleanTitle = filter.clean(title);
    let cleanBody = filter.clean(body);
    if(cleanTitle === title) console.log("Title is clean!");
    if(cleanBody == body) console.log("Title is clean!");
  }
} catch (error) {
  core.setFailed(error.message);
}