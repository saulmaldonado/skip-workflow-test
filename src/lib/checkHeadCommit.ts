/* eslint-disable camelcase */
import { context, getOctokit } from '@actions/github';

type CheckHeadCommit = () => void;

export const checkHeadCommit: CheckHeadCommit = async () => {
  const {
    payload: {
      client_payload: { githubToken, checkId },
    },
    repo: { owner, repo },
  } = context;

  console.log({ githubToken, checkId });

  const { checks } = getOctokit(githubToken);

  const result = await checks.update({
    check_run_id: checkId,
    owner,
    repo,
    conclusion: 'skipped',
  });
  console.log(result);
};
