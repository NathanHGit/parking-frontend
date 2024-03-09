import { useEffect } from "react";
import Button from "./Button";

/**
 * Props for the ConfirmModal component.
 * @typedef {Object} ConfirmModalProps
 * @property {Object} content - The content of the modal.
 * @property {any} content.data - Additional data.
 * @property {string} content.header - The header of the modal.
 * @property {React.ReactNode} content.body - The body of the modal.
 * @property {string} content.color - The color of the modal confirm button.
 * @property {(data: any, event?: any, confirm?: boolean) => void} toggleModal - Function to toggle the modal.
 */
interface ConfirmModalProps {
  content: {
    data: any;
    header: string;
    body: React.ReactNode;
    color: string;
  };
  toggleModal: (data: any, event?: any, confirm?: boolean) => void;
}

/**
 * Modal component.
 */
function ConfirmModal({ content, toggleModal }: ConfirmModalProps) {
  const handleSubmit = (event: any) => {
    // Prevents form redirect
    event.preventDefault();
    toggleModal(content.data, event, true);
  };

  // Disables scroll + add margin to prevent overlay offset caused by the scrollbar
  useEffect(() => {
    const scrollbarWidth = window.innerWidth - document.body.clientWidth;
    document.body.style.marginRight = `${scrollbarWidth}px`;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.marginRight = "0px";
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <>
      <div className="fixed w-full h-full top-0 left-0 z-20">
        {/* MODAL BACKGROUND */}
        <div
          className="absolute inset-0 bg-gray-700 opacity-60"
          onClick={() => toggleModal(content.data)}
        ></div>
        {/* MODAL */}
        <form onSubmit={handleSubmit}>
          <div className="absolute inset-0 h-fit m-auto bg-white rounded-lg w-[500px] max-w-[90%] divide-y">
            {/* HEADER */}
            <div className="px-5 py-4 font-semibold text-lg	">
              {content.header}
            </div>
            {/* BODY */}
            <div className="px-5 pt-4 pb-10" style={{ whiteSpace: "pre-line" }}>
              {content.body}
            </div>
            {/* FOOTER */}
            <div className="px-5 py-4 flex justify-end gap-2">
              <Button
                type="button"
                text="Annuler"
                color="zinc"
                onClick={() => toggleModal(content.data)}
              />
              <Button type="submit" text="Confirmer" color={content.color} />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default ConfirmModal;
