import { getInput } from '@actions/core';
import { context, getOctokit } from '@actions/github';
import { actionConfig } from '../config';

type SkipWorkflow = () => void;

export const skipWorkflow: SkipWorkflow = async () => {
  const githubToken = getInput(actionConfig.REPO_TOKEN_ID);

  const { repos } = getOctokit(githubToken);

  const {
    repo: { owner, repo },
  } = context;

  const result = await repos.createDispatchEvent({
    event_type: 'skip-workflow',
    owner,
    repo,
    client_payload: { githubToken },
  });

  console.log(result);
};
