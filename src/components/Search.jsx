import { getGitHubProfile, getUserRepositories } from "../api/gitHubAPI";
import { useState, useEffect } from "react";
import Repo from "./Repo";
import { useToast } from "@chakra-ui/react";

const Search = () => {
  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState(null);
  const [repositories, setRepositories] = useState([]);
  const toast = useToast();

  const handleSearch = async () => {
    try {
      if (username) {
        // Fetch user profile
        const profileData = await getGitHubProfile(username);
        if (profileData.message === "Not Found") {
          toast({
            title: "Invalid username",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
          setProfile(null);
        }
        if (profileData) {
          setProfile(profileData);
          addUserToLocalStorage(profileData, username);

          // Fetch user repositories
          const repositoriesData = await getUserRepositories(username);
          if (repositoriesData.length > 0) setRepositories(repositoriesData);
          if (repositoriesData.message === "Not Found") {
            toast({
              title: "User has no repositories",
              status: "error",
              duration: 3000,
              isClosable: true,
            });
            setRepositories([]);
          }
        } else {
          toast({
            title: "Invalid username",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      } else {
        toast({
          title: "Please enter a Github username",
          status: "warning",
          duration: 3000,
          isClosable: true,
        });
        setRepositories([]);
      }
    } catch (error) {
      toast({
        title: "Error fetching data",
        description: "Please check the username",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      // Handle error gracefully, set profile and repositories to null
      setProfile(null);
      setRepositories(null);
    }
  };

  const addUserToLocalStorage = (data, username) => {
    // get the item from local-storage
    const users = JSON.parse(localStorage.getItem("github-users")) || [];
    const userExists = users.find((user) => user.id === username);

    // If user already exist then remove it
    if (userExists) {
      users.splice(users.indexOf(userExists), 1);
    }

    users.unshift({
      id: username,
      avatar_url: data.avatar_url,
      name: data.name,
      url: data.html_url,
    });

    // set the item in local-storage
    localStorage.setItem("github-users", JSON.stringify(users));
  };

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
            <div className="flex flex-col">
              <img
                src={profile.avatar_url || "https://via.placeholder.com/150"}
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
                    {new Date(profile.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Displaying the User's repository */}
        {repositories.length > 0 && <Repo repositories={repositories} />}
      </div>
    </>
  );
};

export default Search;
