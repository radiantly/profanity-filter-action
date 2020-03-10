import * as core from '@actions/core'
import * as github from '@actions/github'
const Filter = require('bad-words');

async function run() {
  try {
    const octokit = new github.GitHub(github.context.token);

    console.log("Profanity check commencing!");
    if (github.context.eventName === 'issues') {
      let issue = github.context.payload.issue;
      let filter = new Filter();
      let cleanTitle = filter.clean(issue.title);
      let cleanBody = filter.clean(issue.body);
      if(cleanTitle !== issue.title || cleanBody !== issue.body) {
        console.log("Profanity detected, updating issue.");
        await octokit.issues.update({
          ...github.context.repo,
          issue_number: issue.number,
          title: cleanTitle,
          body: cleanBody
        });
      } else {
        console.log("Issue is free from profanity.");
      }
    } else if (github.context.eventName === 'issue_comment') {
      let issueComment = github.context.payload.comment;
      let filter = new Filter();
      let cleanComment = filter.clean(issueComment.body);
      if(cleanComment !== issueComment.body) {
        console.log("Profanity detected, updating issue comment.");
        await octokit.issues.updateComment({
          ...github.context.repo,
          comment_id: issueComment.id,
          body: cleanComment
        });
      } else {
        console.log("Issue comment is free from profanity.");
      }
    }
  } catch(error) {
    core.setFailed(error.message);
  }
}

run();
