import React, {useState} from "react";
import "./Footer.css";
import icon from "../../assets/logo.png";
import {LoginControl} from "../../util/LoginControl";
import { ModalContent1, ModalContent2 } from '../../elements/TermsOfService';
export default function Footer() {
    const [showModal1, setShowModal1] = useState(false);
    const [showModal2, setShowModal2] = useState(false);

    const handleCloseModal = () => {
        setShowModal1(false);
        setShowModal2(false);
    };
  return (
    <div className="footer-root">
        <div className="footer-container">
            <div className="footer-title-container">
                <img src={icon} className="footer-icon" alt="footer"/>
                <div>
                    <LoginControl /> {'\u00A0|\u00A0'}
                    <span className="footer-span" onClick={() => setShowModal1(!showModal1)}>이용안내</span> {'\u00A0|\u00A0'}
                    <span className="footer-span" onClick={() => setShowModal2(!showModal2)}>개인정보처리방침</span>
                    {showModal1
                        ? <div className="modal" onClick={handleCloseModal}>
                            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                                <ModalContent1 onClose={handleCloseModal} />
                            </div>
                        </div>
                        : <></>
                    }

                    {showModal2
                        ?
                        <div className="modal" onClick={handleCloseModal}>
                            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                                <ModalContent2 onClose={handleCloseModal} />
                            </div>
                        </div>
                        : <></>
                    }
                </div>
            </div>
            <p className="footer-content">대표자:박주은 | 대표메일:TOgether@together.co.kr | 대표번호:0123-4567</p>
            <p className="footer-content">사업자등록번호:012-12-01234 | 서울특별시 도봉구 삼양로 144길 33 TOgether01</p>
            <p className="footer-copyright">Copyright ⓒ TOgether. All rights reserved</p>
        </div>
    </div>
  );
}