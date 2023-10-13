import { Icon } from "@iconify/react";
import { Button, ButtonGroup, useDisclosure } from "@chakra-ui/react";
import HistoryModal from "./HistoryModal";
const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div className="mt-4 flex justify-around items-center">
      <div>
        <Icon
          icon="bi:github"
          color="white"
          width="35"
          className="ml-3 md:ml-5"
        />
        <p className="text-xl md:text-2xl">GitHub</p>
      </div>
      <div>
        <Button size="md" colorScheme="whatsapp" onClick={onOpen}>
          Search History
        </Button>
      </div>

      {isOpen && <HistoryModal isOpen={isOpen} onClose={onClose} />}
    </div>
  );
};

export default Header;
