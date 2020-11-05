import { Context } from '@actions/github/lib/context';

type GetPrId = (context: Context) => number;
export const getPrId: GetPrId = (context) => {
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
