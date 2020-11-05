/* eslint-disable camelcase */
import { context, getOctokit } from '@actions/github';

type CheckHeadCommit = () => void;

export const checkHeadCommit: CheckHeadCommit = async () => {
  const {
    payload: {
      client_payload: { githubToken, runId },
    },
    repo: { owner, repo },
  } = context;

  const { checks } = getOctokit(githubToken);

  const result = await checks.update({
    check_run_id: runId,
    owner,
    repo,
    conclusion: 'skipped',
  });
  console.log(result);
};
