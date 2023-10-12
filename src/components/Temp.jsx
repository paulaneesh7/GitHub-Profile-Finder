const Temp = () => {
  return (
    <>
      <div className="flex justify-center">
        <input
          type="text"
          className="bg-transparent border-2 w-4/6 rounded-md p-1 mt-2 text-base"
          placeholder="Type a name (i.e: paulaneesh7)"
        />
      </div>
      <div className="flex justify-center">
        <button className="mt-2 text-base bg-green-500 px-4 py-1 rounded-md font-semibold hover:bg-green-600 duration-300">
          Search
        </button>
      </div>{" "}
      

      {/* Repo */}
      <div className="mt-5 flex justify-between gap-10 bg-zinc-900 px-8 py-4 lg:w-3/5 md:w-10/12 rounded-md mb-4">
          <div className="flex flex-col items-center">
            <h4 className="font-sans font-bold">Bankist Application</h4>
            <p className="uppercase font-sans font-bold text-xs bg-green-100 text-green-800 rounded-sm px-[3px]">
              Language: JavaScript
            </p>
          </div>
          <div className="flex gap-4 items-center">
            <p className="uppercase font-sans font-bold text-sm bg-yellow-100 text-yellow-800 rounded-sm px-[3px]">
              Stars: 30911
            </p>
            <p className="uppercase font-sans font-bold text-sm bg-pink-100 text-pink-800 rounded-sm px-[3px]">
              Forks: 8135
            </p>
            <p className="uppercase font-sans font-bold text-sm bg-sky-100 text-sky-800 rounded-sm px-[3px]">
              Watchers: 30911
            </p>
          </div>
        </div>
    </>
  );
};

export default Temp;
