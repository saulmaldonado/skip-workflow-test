import { getInput } from '@actions/core';
import { getOctokit, context } from '@actions/github';
import { OctokitResponse } from '@octokit/types/dist-types/OctokitResponse';
import { actionConfig } from '../config';

const { GITHUB_TOKEN_ID } = actionConfig;

type SkipWorkflow = () => Promise<OctokitResponse<any>>;

export const skipWorkflow: SkipWorkflow = () => {
  const githubToken: string = getInput(GITHUB_TOKEN_ID);

  const { runId } = context;

  const { actions } = getOctokit(githubToken);

  const {
    repo: { owner, repo },
  } = context;

  return actions.deleteWorkflowRun({ run_id: runId, owner, repo });
};
