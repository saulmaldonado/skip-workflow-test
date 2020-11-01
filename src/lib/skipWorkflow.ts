import { getInput } from '@actions/core';
import { getOctokit, context } from '@actions/github';
import { OctokitResponse } from '@octokit/types/dist-types/OctokitResponse';
import { actionConfig } from '../config';

import { getWorkflowRunId } from './actionContext';

const { GITHUB_TOKEN_ID } = actionConfig;

type SkipWorkflow = () => Promise<OctokitResponse<any> | never>;

export const skipWorkflow: SkipWorkflow = () => {
  try {
    const githubToken: string = getInput(GITHUB_TOKEN_ID);

    const runId: number = getWorkflowRunId();

    const { actions } = getOctokit(githubToken);

    const {
      repo: { owner, repo },
    } = context;

    return actions.deleteWorkflowRun({ run_id: runId, owner, repo });

    // setFailed('Skipping');
  } catch (error) {
    throw new Error('❌ Error skipping workflow');
  }
};
