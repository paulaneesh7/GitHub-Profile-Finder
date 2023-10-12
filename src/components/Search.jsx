import { getGitHubProfile, getUserRepositories } from "../api/gitHubAPI";
import { useState, useEffect } from "react";

const Search = () => {
  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState(null);
  const [repositories, setRepositories] = useState([]);

  const handleSearch = async () => {
    if (username) {
      // Fetch user profile
      getGitHubProfile(username)
        .then((data) => setProfile(data))
        .catch((error) =>
          console.log(
            `Error fetching user profile. Please check the username ${error}`
          )
        );

      // Fetch user repositories
      getUserRepositories(username)
        .then((data) => setRepositories(data))
        .catch((error) =>
          console.log(`Error fetching user repositories ${error}`)
        );
    } else {
      console.log("Please enter a Github username");
    }
  };

  // useEffect(() => {
  //   const dateString = profile.created_at;
  //   const date = new Date(dateString);
  //   const convertedDateString = date.toLocaleDateString("en-US", {
  //     month: "numeric",
  //     day: "numeric",
  //     year: "numeric",
  //   });
  //   console.log(convertedDateString); // Outputs: "3/1/2023"
  // }, [profile]);

  // const dateString = profile.created_at;
  // const date = new Date(dateString);
  // const convertedDateString = date.toLocaleDateString("en-US", {
  //   month: "numeric",
  //   day: "numeric",
  //   year: "numeric",
  // });
  // console.log(convertedDateString); // Outputs: "3/1/2023"

  return (
    <>
      <div className="mt-10 flex flex-col justify-center">
        <div className="flex justify-center">
          <h2 className="text-xl md:text-2xl">Search users on GitHub</h2>
        </div>
        <div className="flex justify-center gap-2">
          <input
            type="text"
            className="bg-transparent border-2 w-4/6 md:w-3/6 rounded-md p-[1px] md:p-1 mt-2 text-base active:border-green-400"
            placeholder="Type a name (i.e: paulaneesh7)"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <div>
            <button
              className="mt-2 text-sm md:text-base  bg-green-500 px-2 md:px-4 py-1 rounded-md font-semibold hover:bg-green-600 duration-300"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>

        {/* Displaying the User's Profile */}
        {profile && (
          <div className="border-2 border-green-500 lg:w-3/5 md:w-4/5 mx-auto mt-10 p-8 rounded-xl flex flex-col md:flex-row justify-content-between align-items-center gap-6">
            <div className="">
              <img
                src={profile.avatar_url}
                alt=""
                className="w-28 h-28 rounded-full"
              />
              <button className="mt-2 text-sm bg-green-500 px-2 lg:px-4 py-1 rounded-md font-semibold hover:bg-green-600 duration-300">
                <a href={profile.html_url} rel="noreferrer" target="_blank">
                  View Profile
                </a>
              </button>
            </div>
            <div>
              <div className="flex gap-4 items-center font-sans">
                <p className="bg-yellow-100 text-yellow-800 font-bold text-sm p-[2px] rounded-sm">
                  Public Repo: {profile.public_repos}
                </p>
                <p className="bg-pink-100 text-pink-800 font-bold text-sm p-[2px] rounded-sm">
                  Public Gists: {profile.public_gists}
                </p>
                <p className="bg-sky-100 text-sky-800 font-bold text-sm p-[2px] rounded-sm">
                  Followers: {profile.followers}
                </p>
                <p className="bg-purple-100 text-purple-800 font-bold text-sm p-[2px] rounded-sm">
                  Following: {profile.following}
                </p>
              </div>
              <div className="flex flex-col mt-5 font-sans">
                <h2 className="text-green-400 text-xl font-semibold">
                  {profile.name}
                </h2>
                <p className="text-green-400 font-semibold text-sm">
                  {profile.bio}
                </p>
                <div className="text-sm mt-2">
                  <p>
                    <span className="text-green-200 font-bold">Company:</span>{" "}
                    {profile.company ? profile.company : "Not Specified"}
                  </p>
                  <p>
                    <span className="text-green-200 font-bold">Location:</span>{" "}
                    {profile.location
                      ? profile.location
                      : "Location Not Specified"}
                  </p>
                  <p>
                    <span className="text-green-200 font-bold">
                      Blog/Website:
                    </span>{" "}
                    <a
                      href={profile.blog}
                      className="hover:underline"
                      rel="noreferrer"
                      target="_blank"
                    >
                      {profile.blog}
                    </a>
                  </p>
                  <p>
                    <span className="text-green-200 font-bold">
                      Member Since:
                    </span>{" "}
                    {profile.created_at}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Displaying the User's repository */}
        <Repo repositories={repositories} />
      </div>
    </>
  );
};

export default Search;

export const Repo = ({ repositories }) => {
  return (
    <>
      <div className="mt-10 flex flex-col items-center">
        <h2 className="text-3xl uppercase text-green-400 font-sans font-bold">
          Repositories
        </h2>
        {/* Repo */}

        <ul className="w-4/5 mb-8">
          {repositories.map((repo) => (
            <div
              key={repo.id}
              className="mt-5 flex justify-between gap-10 bg-zinc-900 hover:bg-zinc-700 duration-300 px-8 py-4 lg:w-12/12 md:w-full rounded-md"
            >
              <div className="flex flex-col items-center">
                <h4 className="font-sans font-bold text-left">
                  <a
                    href={repo.html_url}
                    rel="noreferrer"
                    target="_blank"
                    className="hover:underline"
                  >
                    {repo.name}
                  </a>
                </h4>
                <p className="uppercase font-sans font-bold text-xs bg-green-100 text-green-800 rounded-sm px-[3px]">
                  Language: {repo.language ? repo.language : "Markdown"}
                </p>
              </div>
              <div className="flex gap-4 items-center">
                <p className="uppercase font-sans font-bold text-sm bg-yellow-100 text-yellow-800 rounded-sm px-[3px]">
                  Stars: {repo.stargazers_count}
                </p>
                <p className="uppercase font-sans font-bold text-sm bg-pink-100 text-pink-800 rounded-sm px-[3px]">
                  Forks: {repo.forks_count}
                </p>
                <p className="uppercase font-sans font-bold text-sm bg-sky-100 text-sky-800 rounded-sm px-[3px]">
                  Watchers: {repo.watchers_count}
                </p>
              </div>
            </div>
          ))}
        </ul>
      </div>
    </>
  );
};
