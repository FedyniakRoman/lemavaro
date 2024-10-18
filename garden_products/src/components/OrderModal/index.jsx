import React from "react"; 
import { IoIosClose } from "react-icons/io";
import s from "./index.module.css";

function OrderModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <>
            {isOpen && (
                <div className={s.modal_overlay}>
                    <div className={s.modal_content}> {/* Hier das schließende > hinzugefügt */}
                        <h3 className={s.sub_title}>Congratulations!</h3>
                        <p className={s.content}>
                            Your order has been successfully placed on the website.
                        </p>
                        <p className={s.content}>
                            A manager will contact you shortly to confirm your order.
                        </p>
                        <IoIosClose className={s.close_button} onClick={onClose} />
                    </div>
                </div>
            )}
        </>
    );
}

export default OrderModal;
