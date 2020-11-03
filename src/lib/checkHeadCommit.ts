/* eslint-disable camelcase */
import { getInput } from '@actions/core';
import { context, getOctokit } from '@actions/github';
import { actionConfig } from '../config';

type CheckHeadCommit = () => Promise<string | never>;

export const checkHeadCommit: CheckHeadCommit = async () => {
  const { GITHUB_TOKEN_ID, REPO_TOKEN_ID } = actionConfig;
  const githubToken = getInput(GITHUB_TOKEN_ID);
  const repoToken = getInput(REPO_TOKEN_ID);

  const { checks } = getOctokit(githubToken);

  const {
    repo: { owner, repo },
    workflow,
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
    conclusion: 'skipped',
    completed_at: new Date().toISOString(),
  });

  await checks.create({
    head_sha: sha,
    name: workflow,
    owner,
    repo,
    /* must be ISO 8601 format https://docs.github.com/en/free-pro-team@latest/rest/reference/checks#create-a-check-run */
    completed_at: new Date().toISOString(),
    conclusion: 'success',
  });

  // const path = '.github/workflows/checkWorkflow.yaml';

  // const result = await actions.listRepoWorkflows({
  //   owner,
  //   repo,
  // });

  // const { id } = result.data.workflows.find(
  //   ({ name }) => name === 'check workflow'
  // )!;

  const { request } = getOctokit(repoToken);

  const res = await request(
    'POST /repos/:owner/:repo/actions/workflows/:workflow_id/dispatches',
    {
      owner,
      ref: 'pr1',
      repo,
      // @ts-ignore
      workflow_id: 'checkWorkflow.yaml',
    }
  );

  // const  = await actions.createWorkflowDispatch({
  //   owner,
  //   repo,
  //   workflow_id: ('checkWorkflow.yaml' as unknown) as number,
  //   ref: 'pr1',
  // });

  console.log(res);

  return sha;
};
