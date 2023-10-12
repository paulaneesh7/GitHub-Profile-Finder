import { Icon } from "@iconify/react";
const Header = () => {
  return (
    <div className="mt-4 flex justify-around items-center">
      <div>
        <Icon icon="bi:github" color="white" width="35" className="ml-3 md:ml-5" />
        <p className="text-xl md:text-2xl">GitHub</p>
      </div>
      <div>
        <button className="bg-green-500 px-[8px] py-[5px] md:p-2 rounded-md font-semibold hover:bg-green-600 duration-300">
          Search History
        </button>
      </div>
    </div>
  );
};

export default Header;
