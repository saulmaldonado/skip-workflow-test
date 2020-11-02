import { context } from '@actions/github';

type GetPrId = () => number | never;
export const getPrId: GetPrId = () => {
  const { ref: prRef } = context;
  const prIdRegex: RegExp = /(?<=refs\/pull\/)\d+(?=\/merge)/i;

  const [prId] = prIdRegex.exec(prRef) ?? [];
  if (!prId) {
    throw new Error(
      '❌ Error finding commit ID. Make sure this workflow is triggered by a "pull_request" event'
    );
  }
  return Number(prId);
};
