import { getInput } from '@actions/core';
import { getOctokit, context } from '@actions/github';
import { OctokitResponse } from '@octokit/types/dist-types/OctokitResponse';
import { actionConfig } from '../config/config';

import { getWorkflowRunId } from './actionContext';

const { GITHUB_TOKEN_ID } = actionConfig;

type SkipWorkflow = () => Promise<OctokitResponse<any> | never>;

export const skipWorkflow: SkipWorkflow = () => {
  try {
    const GITHUB_TOKEN: string = getInput(GITHUB_TOKEN_ID);

    const runId: number = getWorkflowRunId(context);

    const { actions } = getOctokit(GITHUB_TOKEN);

    const {
      repo: { owner, repo },
    } = context;

    return actions.cancelWorkflowRun({ run_id: runId, owner, repo });
  } catch (error) {
    throw new Error('❌ Error skipping workflow');
  }
};
