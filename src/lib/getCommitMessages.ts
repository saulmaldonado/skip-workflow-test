import { getInput } from '@actions/core';
import { context, getOctokit } from '@actions/github';
import { actionConfig } from '../config';
import { getPrId } from './actionContext';

type GithubPRCommitMessagesResponse = {
  repository: {
    pullRequest: {
      commits: {
        nodes: Array<{ commit: { message: string } }>;
      };
    };
  };
};

const { GITHUB_TOKEN_ID } = actionConfig;

const COMMIT_MESSAGES_QUERY = `
query($repoOwner: String!, $repoName: String!, $prId: Int!) {
  repository(owner: $repoOwner, name: $repoName) {
    pullRequest(number: $prId){
       commits(first: 250) {
        nodes {
          commit {
            message
          }
        }
      }
    }
  }
}
`;

type GetCommitMessages = () => Promise<string[] | never>;

export const getCommitMessages: GetCommitMessages = async () => {
  try {
    const octokit = getOctokit(getInput(GITHUB_TOKEN_ID));

    const {
      repo: { owner, repo },
    } = context;
    const prId = getPrId(context);

    const {
      repository: {
        pullRequest: {
          commits: { nodes: commits },
        },
      },
    } = await octokit.graphql<GithubPRCommitMessagesResponse>(
      COMMIT_MESSAGES_QUERY,
      {
        repoOwner: owner,
        repoName: repo,
        prId,
      }
    );

    return commits.map(({ commit }) => commit.message);
  } catch (error) {
    throw new Error(error);
  }
};
