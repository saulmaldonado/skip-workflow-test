/* eslint-disable camelcase */
import { context } from '@actions/github';

type CheckHeadCommit = () => void;

export const checkHeadCommit: CheckHeadCommit = async () => {
  const { payload } = context;

  // const { githubToken } = payload;

  // const {} = getOctokit(githubToken);
  console.log(payload);
};
