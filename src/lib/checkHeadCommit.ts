/* eslint-disable camelcase */
import { context } from '@actions/github';

type CheckHeadCommit = () => Promise<string | never>;

export const checkHeadCommit: CheckHeadCommit = async () => {
  const {
    payload: { pull_request },
  } = context;

  const {
    head: { sha },
  } = pull_request!;

  return sha;
};
