/* eslint-disable camelcase */
import { getInput } from '@actions/core';
import { context, getOctokit } from '@actions/github';
import { actionConfig } from '../config';

type SkipWorkflow = () => void;

export const skipWorkflow: SkipWorkflow = async () => {
  const githubToken = getInput(actionConfig.GITHUB_TOKEN_ID);
  const repoToken = getInput(actionConfig.REPO_TOKEN_ID);

  const { checks } = getOctokit(githubToken);
  const { repos } = getOctokit(repoToken);

  const {
    repo: { owner, repo },
    payload: { pull_request },
  } = context;

  const {
    head: { sha },
  } = pull_request!;

  const result1 = await checks.listForRef({
    owner,
    repo,
    ref: sha,
    status: 'in_progress',
  });

  const checkId = result1.data.check_runs[0].id;

  const result = await repos.createDispatchEvent({
    event_type: 'skip-workflow',
    owner,
    repo,
    client_payload: {
      githubToken: getInput(actionConfig.GITHUB_TOKEN_ID),
      checkId,
    },
  });

  console.log(result);
};
