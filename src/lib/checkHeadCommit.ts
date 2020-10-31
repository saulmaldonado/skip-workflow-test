import { getInput } from '@actions/core';
import { context, getOctokit } from '@actions/github';
import { actionConfig } from '../config';

type CheckHeadCommit = () => Promise<string | never>;

const { GITHUB_TOKEN_ID } = actionConfig;

export const checkHeadCommit: CheckHeadCommit = async () => {
  try {
    const githubToken = getInput(GITHUB_TOKEN_ID);
    const { checks } = getOctokit(githubToken);

    const {
      repo: { owner, repo },
      sha,
      workflow,
    } = context;

    const result = await checks.create({
      head_sha: sha,
      name: workflow,
      owner,
      repo,
      /* must be ISO 8601 format https://docs.github.com/en/free-pro-team@latest/rest/reference/checks#create-a-check-run */
      completed_at: new Date().toISOString(),
      conclusion: 'success',
    });
    console.log(result);
    return sha;
  } catch (error) {
    throw new Error('❌ Error checking head commit');
  }
};
