import { useState } from "react";

const Repo = ({ repositories }) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <>
      <div className="mt-10 flex flex-col items-center">
        <h2 className="text-3xl uppercase text-green-400 font-sans font-bold">
          {repositories.length > 0 ? 'Repositories' : ''}
        </h2>
        {/* Repo */}

        <ul className="w-4/5 mb-8">
          {repositories
            .sort((a, b) => b.stargazers_count - a.stargazers_count)
            .map((repo, idx) => {
              if (idx > 4 && !showMore) return null;
              return (
                <div
                  key={repo.id}
                  className="mt-5 flex justify-between gap-10 bg-zinc-900 hover:bg-zinc-700 duration-300 px-8 py-4 lg:w-12/12 md:w-full rounded-md cursor-pointer"
                >
                  <div className="flex flex-col items-start gap-1">
                    <h4 className="font-sans font-bold">
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
              );
            })}

          <div className="flex justify-center mt-2">
            {showMore && (
              <button
                className=" mt-2 text-sm md:text-base  bg-green-500 px-2 md:px-4 py-1 rounded-md font-semibold hover:bg-green-600 duration-300"
                onClick={() => setShowMore(false)}
              >
                Show Less
              </button>
            )}
            {!showMore && repositories.length > 5 && (
              <button
                className=" mt-2 text-sm md:text-base  bg-green-500 px-2 md:px-4 py-1 rounded-md font-semibold hover:bg-green-600 duration-300"
                onClick={() => setShowMore(true)}
              >
                Show More
              </button>
            )}
          </div>
        </ul>
      </div>
    </>
  );
};

export default Repo;
