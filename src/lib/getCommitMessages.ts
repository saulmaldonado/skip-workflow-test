import { getOctokit } from '@actions/github';
import { Context } from '@actions/github/lib/context';
import { getPrId } from './actionContext';

type GetCommitMessages = (
  octokit: ReturnType<typeof getOctokit>,
  context: Context
) => Promise<string[] | never>;

export const getCommitMessages: GetCommitMessages = async (
  octokit,
  context
) => {
  const { pulls } = octokit;

  const {
    repo: { owner, repo },
    eventName,
  } = context;

  console.log(eventName);

  const prId: number = getPrId(context);

  const { data: commits } = await pulls.listCommits({
    pull_number: prId,
    owner,
    repo,
  });

  return commits.map(({ commit }) => commit.message);
};
