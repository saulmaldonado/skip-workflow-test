import { getInput } from '@actions/core';
import { context, getOctokit } from '@actions/github';
import { actionConfig } from '../config';
import { getPrId } from './actionContext';

const { GITHUB_TOKEN_ID } = actionConfig;

type GetCommitMessages = () => Promise<string[] | never>;

export const getCommitMessages: GetCommitMessages = async () => {
  try {
    const octokit = getOctokit(getInput(GITHUB_TOKEN_ID));

    const {
      repo: { owner, repo },
    } = context;

    const prId: number = getPrId();

    const { data: commits } = await octokit.pulls.listCommits({
      pull_number: prId,
      owner,
      repo,
    });

    return commits.map(({ commit }) => commit.message);
  } catch (error) {
    throw new Error(
      '❌ Error getting commit message. Make sure you provided GITHUB_TOKEN input and are authorized to run this workflow'
    );
  }
};
