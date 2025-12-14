import LockReport from "./Lockreport/LockReport";
import {  Modal, useDisclosure } from "@chakra-ui/react";

const ReportModal = ({name,image,heading,footdesc,onOpen}) => {
    const { isOpen, onClose } = useDisclosure();

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <LockReport
        //   to={to}
          name={name}
          image={image}
          heading={heading}
          footdesc={footdesc}
        />
      </Modal>
    </div>
  );
};

export default ReportModal;
