type SearchCommitMessages = (
  commitMessages: string[],
  stringToFind: string
) => string | undefined;

export const searchCommitMessages: SearchCommitMessages = (
  commitMessages,
  stringToFind
) =>
  commitMessages.find((message: string) =>
    message.match(new RegExp(stringToFind, 'i'))
  );
