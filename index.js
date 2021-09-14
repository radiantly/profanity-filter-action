import * as core from "@actions/core";
import * as github from "@actions/github";
const Filter = require("bad-words");

async function run() {
  try {
    const token = core.getInput("repo-token");
    const octokit = github.getOctokit(token);
    const context = github.context;

    console.log("Profanity check commencing!");
    if (context.eventName === "issues") {
      let issue = context.payload.issue;
      let filter = new Filter();
      let cleanTitle = filter.clean(issue.title);
      let cleanBody = filter.clean(issue.body);
      if (cleanTitle !== issue.title || cleanBody !== issue.body) {
        console.log("Profanity detected, updating issue.");
        await octokit.rest.issues.update({
          ...context.repo,
          issue_number: issue.number,
          title: cleanTitle,
          body: cleanBody,
        });
      } else {
        console.log("Issue is free from profanity.");
      }
    } else if (context.eventName === "issue_comment") {
      let issueComment = context.payload.comment;
      let filter = new Filter();
      let cleanComment = filter.clean(issueComment.body);
      if (cleanComment !== issueComment.body) {
        console.log("Profanity detected, updating issue comment.");
        await octokit.rest.issues.updateComment({
          ...context.repo,
          comment_id: issueComment.id,
          body: cleanComment,
        });
      } else {
        console.log("Issue comment is free from profanity.");
      }
    } else if (context.eventName === "pull_request") {
      let pr = context.payload.pull_request;
      let filter = new Filter();
      let cleanTitle = filter.clean(pr.title);
      let cleanBody = filter.clean(pr.body);
      if (cleanTitle !== pr.title || cleanBody !== pr.body) {
        console.log("Profanity detected, updating pull request.");
        await octokit.rest.pulls.update({
          ...context.repo,
          pull_number: pr.number,
          title: cleanTitle,
          body: cleanBody,
        });
      } else {
        console.log("Pull request is free from profanity.");
      }
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
