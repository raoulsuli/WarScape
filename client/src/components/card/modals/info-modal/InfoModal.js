import Modal from "react-modal";
import { XIcon, ChevronRightIcon } from "@heroicons/react/outline";
import { MODAL_STYLES } from "../../../../utils/constants";
import { FooterItem } from "./FooterItem";

export const InfoModal = ({
  isModalOpen,
  setIsModalOpen,
  type,
  title,
  body,
  footer,
}) => {
  const isShelter = () => type === "Shelter" && footer;
  const { resources, doctors } = footer;

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={() => setIsModalOpen(false)}
      ariaHideApp={false}
      style={MODAL_STYLES}
    >
      <div className={`grid grid-rows-${isShelter() ? "3 gap-12" : "2"}`}>
        <div className="modalTitle">
          {`${type} ${title} Information`}
          <XIcon className="closeIcon" onClick={() => setIsModalOpen(false)} />
        </div>
        <div className="infoModalBody">
          {body.map((row, index) => {
            return (
              <div key={`row-${index}`} className="flex font-semibold">
                <ChevronRightIcon className="h-6 colorRed" />
                <span className="colorGreen font-semibold mr-2">
                  {row.key}:
                </span>
                <span className={row.color}>{row.value}</span>
              </div>
            );
          })}
        </div>
        {isShelter() && (
          <div className="infoModalFooter">
            <FooterItem content={resources} title="Resources" />
            <FooterItem content={doctors} title="Doctors" />
          </div>
        )}
      </div>
    </Modal>
  );
};
