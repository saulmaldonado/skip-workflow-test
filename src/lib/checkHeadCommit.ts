/* eslint-disable camelcase */
import { getInput } from '@actions/core';
import { context, getOctokit } from '@actions/github';
import { actionConfig } from '../config';

type CheckHeadCommit = () => Promise<string | never>;

const { GITHUB_TOKEN_ID } = actionConfig;

export const checkHeadCommit: CheckHeadCommit = async () => {
  const githubToken = getInput(GITHUB_TOKEN_ID);
  const { request } = getOctokit(githubToken);

  const {
    repo: { owner, repo },
    workflow,
    payload: { pull_request },
  } = context;

  const {
    head: { sha },
  } = pull_request!;

  const result = await request(
    'PUT /repos/{owner}/{repo}/actions/workflows/{workflow_id}/disable',
    {
      owner,
      repo,
      workflow_id: workflow,
    }
  );

  // const result1 = await checks.listForRef({
  //   owner,
  //   repo,
  //   ref: sha,
  //   status: 'in_progress',
  // });

  // const checkId = result1.data.check_runs[0].id;

  // const result = await checks.update({
  //   check_run_id: checkId,
  //   owner,
  //   repo,
  //   status: 'completed',
  //   conclusion: 'success',
  // });

  console.log(result);

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
