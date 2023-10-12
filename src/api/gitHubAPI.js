const BASE_URL = "https://api.github.com/users/";

export const getGitHubProfile = async (username) => {
  const response = await fetch(`${BASE_URL}${username}`);
  const data = await response.json();
  return data;
};

export const getUserRepositories = async (username) => {
  const response = await fetch(`${BASE_URL}${username}/repos`);
  const data = await response.json();
  return data;
};
