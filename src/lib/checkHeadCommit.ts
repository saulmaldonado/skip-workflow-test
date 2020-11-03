/* eslint-disable camelcase */
import { getInput } from '@actions/core';
import { context, getOctokit } from '@actions/github';
import { actionConfig } from '../config';

type CheckHeadCommit = () => Promise<string | never>;

export const checkHeadCommit: CheckHeadCommit = async () => {
  const { GITHUB_TOKEN_ID } = actionConfig;
  const githubToken = getInput(GITHUB_TOKEN_ID);
  // const repoToken = getInput(REPO_TOKEN_ID);

  const { checks } = getOctokit(githubToken);

  const {
    repo: { owner, repo },
    // workflow,
    payload: { pull_request },
  } = context;

  const {
    head: { sha },
  } = pull_request!;

  const result1 = await checks.listForRef({
    owner,
    repo,
    ref: sha,
    status: 'in_progress',
  });

  const checkId = result1.data.check_runs[0].id;

  await checks.update({
    check_run_id: checkId,
    owner,
    repo,
    status: 'completed',
    conclusion: 'neutral',
    completed_at: new Date().toISOString(),
  });

  // await checks.create({
  //   head_sha: sha,
  //   name: workflow,
  //   owner,
  //   repo,
  //   /* must be ISO 8601 format https://docs.github.com/en/free-pro-team@latest/rest/reference/checks#create-a-check-run */
  //   completed_at: new Date().toISOString(),
  //   conclusion: 'success',
  // });

  return sha;
};
