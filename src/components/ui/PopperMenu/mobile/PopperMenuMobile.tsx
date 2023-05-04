import { MouseEvent, PropsWithChildren } from "react";
import { createPortal } from "react-dom";
import { X } from "react-feather";
import { motion } from "framer-motion";
import { MobileModal } from "./PopperMenuMobile.styles";

interface PopperMenuMobileProps extends PropsWithChildren {
  image?: string;
  title?: string;
  close: () => void;
  onClickInside?: (e: MouseEvent) => void;
}

function PopperMenuMobile({
  image,
  title,
  close,
  children,
  onClickInside,
}: PopperMenuMobileProps) {
  return createPortal(
    <MobileModal
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { delay: 0.12, duration: 0.1 } }}
      transition={{ duration: 0.1 }}
      id="modal"
      onClick={onClickInside}
    >
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0, transition: { delay: 0.12, duration: 0.3 } }}
        exit={{ y: "100%" }}
        transition={{ duration: 0.3 }}
        className="wrapper"
      >
        {/* <div className="wrapper"> */}
        <div className="top">
          {image && <img src={image} alt="" />}
          {title && <h4>{title}</h4>}
        </div>
        <div className="items-list" onClick={close}>
          {children}
        </div>
        <div className="close">
          <button onClick={close}>
            <X />
          </button>
        </div>
        {/* </div> */}
      </motion.div>
    </MobileModal>,
    document.getElementById("portal")!
  );
}

export default PopperMenuMobile;
