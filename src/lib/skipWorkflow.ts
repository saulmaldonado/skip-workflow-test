import { getInput } from '@actions/core';
import { getOctokit, context } from '@actions/github';
import { OctokitResponse } from '@octokit/types/dist-types/OctokitResponse';
import { actionConfig } from '../config';

import { getWorkflowRunId } from './actionContext';

const { GITHUB_TOKEN_ID } = actionConfig;

type SkipWorkflow = () => Promise<OctokitResponse<any> | never>;

export const skipWorkflow: SkipWorkflow = async () => {
  try {
    const GITHUB_TOKEN: string = getInput(GITHUB_TOKEN_ID);

    const runId: number = getWorkflowRunId(context);

    const {
      repo: { owner, repo },
      sha,
      workflow,
    } = context;

    const { actions, checks } = getOctokit(GITHUB_TOKEN);

    await actions.cancelWorkflowRun({ run_id: runId, owner, repo });
    return checks.create({
      head_sha: sha,
      name: workflow,
      owner,
      repo,
      completed_at: new Date().toISOString(),
      conclusion: 'success',
    });
  } catch (error) {
    // throw new Error('❌ Error skipping workflow');
    // throw new Error('❌ Error skipping workflow');
    throw new Error(error);
  }
};
