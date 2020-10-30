import { Context } from '@actions/github/lib/context';

type GetPrId = (context: Context) => number | never;
export const getPrId: GetPrId = (context) => {
  const { ref: prRef } = context;
  const prIdRegex: RegExp = /(?<=refs\/pull\/)\d+(?=\/merge)/i;
  // 'refs/pull/:prNumber/merge'
  const [prId] = prIdRegex.exec(prRef) ?? [];
  if (!prId) {
    throw new Error(
      '❌ Error finding commit ID. Make sure this workflow is triggered by a "pull_request" event'
    );
  }
  return Number(prId);
};

type GetWorkflowRunId = (context: Context) => number;
export const getWorkflowRunId: GetWorkflowRunId = (context) => context.runId;
