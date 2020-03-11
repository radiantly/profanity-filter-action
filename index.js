import * as core from '@actions/core'
import * as github from '@actions/github'
const Filter = require('bad-words');

async function run() {
  try {
    const token = core.getInput('repo-token');
    const octokit = new github.GitHub(token);

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
    } else if (github.context.eventName === 'pull_request') {
      let pr = github.context.payload.pull_request;
      let filter = new Filter();
      let cleanTitle = filter.clean(pr.title);
      let cleanBody = filter.clean(pr.body);
      if(cleanTitle !== pr.title || cleanBody !== pr.body) {
        console.log("Profanity detected, updating pull request.");
        await octokit.pulls.update({
          ...github.context.repo,
          pull_number: pr.number,
          title: cleanTitle,
          body: cleanBody
        });
      } else {
        console.log("Pull request is free from profanity.");
      }
    }
  } catch(error) {
    core.setFailed(error.message);
  }
}

run();
