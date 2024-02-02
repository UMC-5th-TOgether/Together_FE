import React from 'react';

export function ModalContent1({ onClose }) {
    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-close-wrap"><button className="modal-close" onClick={onClose}>x</button></div>
                <div className="modal-title"> <p>서비스 이용 약관 (일반 회원용)</p> </div>
                <br /><br />

                <div className="modal-content-title">1. 약관의 적용</div>

                1-1. 본 서비스 이용 약관(이하 "약관")은 TOgether(이하 "회사"라 칭함)이 제공하는 소셜 네트워킹 웹 서비스(이하 "서비스")의 이용 조건 및 규정을 명시합니다.<br />
                1-2. 본 약관은 회원 가입 시 동의한 것으로 간주되며, 서비스 이용 시 회원에게 적용됩니다.<br /><br />


                <div className="modal-content-title">2. 회원 가입</div>

                2-1. 회원 가입은 실명, 이메일 주소, 비밀번호를 포함한 필수 정보를 제공하여 완료됩니다.<br />
                2-2. 회원은 제공한 정보의 정확성을 유지하고, 회사는 회원 정보를 보호하기 위해 노력합니다.<br /><br />

                <div className="modal-content-title">3. 서비스 이용</div>

                3-1. 회원은 서비스를 본래 용도에 맞게 사용해야 합니다.<br />
                3-2. 회원은 다른 회원의 개인 정보 및 서비스 내의 콘텐츠를 무단으로 수집, 전송, 게시하거나 공유해서는 안됩니다.<br /><br />

                <div className="modal-content-title">4. 개인 정보 보호</div>

                4-1. 회사는 회원의 개인 정보를 적절히 보호하며, 정보의 수집 및 이용은 개인 정보 보호 정책에 따릅니다.<br /><br />

                <div className="modal-content-title">5. 계정 보안</div>

                5-1. 회원은 자신의 계정을 안전하게 보관해야 하며, 계정 정보의 유출로 인한 문제는 회원의 책임입니다.<br />
                5-2. 계정에 불법적인 접근이 의심될 경우, 회원은 즉시 회사에 알려야 합니다.<br /><br />

                <div className="modal-content-title">6. 서비스 변경 및 중단</div>

                6-1. 회사는 사전 고지 후 서비스의 내용을 변경하거나 중단할 수 있습니다.<br /><br />

                <div className="modal-content-title">7. 면책 조항</div>

                7-1. 회사는 서비스 이용으로 발생한 손실이나 피해에 대해 일체의 책임을 지지 않습니다.<br /><br />

                <div className="modal-content-title">8. 약관의 변경</div>

                8-1. 회사는 필요한 경우 약관을 변경할 수 있으며, 변경된 약관은 서비스 내 공지로 효력을 발생합니다.<br /><br />

                <div className="modal-content-title">9. 준거법과 재판관할</div>

                9-1. 본 약관은 대한민국 법률에 따라 해석되며, 서비스 이용으로 인한 분쟁의 소송은 대한민국 법원을 관할합니다.<br /><br />

                <div className="modal-content-title">10. 문의처</div>

                10-1. 본 약관 또는 서비스에 대한 문의는 대표메일 TOgether@together.co.kr 또는 대표전화 0123-4567로 문의하실 수 있습니다.<br /><br />

                이상의 약관은 2024년 2월 1일에 최종 수정되었습니다.
            </div>
        </div>
    );
}

export function ModalContent2({ onClose }) {
    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-close-wrap"><button className="modal-close" onClick={onClose}>x</button></div>
                <div className="modal-title"> <p>개인정보 수집 및 이용 약관</p> </div>
                <br /><br />

                <div className="modal-content-title">1. 수집하는 개인 정보 항목</div>

                1-1. TOgether(이하 "회사"라 칭함)은 다음과 같은 개인 정보를 수집합니다.<br />

                - 실명, 전화번호, 이메일 주소, 기타 회원 가입 시 필요한 정보<br /><br />

                <div className="modal-content-title">2. 개인 정보 수집 및 이용 목적</div>

                2-1. 회사는 수집한 개인 정보를 다음 목적으로 이용합니다.<br />

                - 회원 가입 및 관리<br />
                - 서비스 제공 및 개선<br />
                - 이벤트 및 프로모션 안내<br />
                - 고객 지원 및 문의 응대<br />
                - 법령 및 이용 약관 위반 조사 및 대응<br /><br />

                <div className="modal-content-title">3. 개인 정보의 보유 및 이용 기간</div>

                3-1. 회사는 회원 탈퇴 또는 개인 정보 수집 및 이용 목적 달성 시까지 개인 정보를 보유하며, 해당 기간 이후에는 즉시 파기됩니다.<br /><br />

                <div className="modal-content-title">4. 개인 정보의 파기 절차 및 방법</div>

                4-1. 개인 정보는 수집 및 이용 목적이 달성된 경우, 또는 회원 탈퇴 요청 시에 안전하게 파기됩니다.<br />

                4-2. 파기된 개인 정보는 기록, 전자적 파일 등의 형태로 남지 않도록 파기됩니다.<br /><br />

                <div className="modal-content-title">5. 개인 정보의 제공 및 공유</div>

                5-1. 회사는 회원의 동의 없이 개인 정보를 타 기업이나 제3자와 공유하지 않습니다. 다만, 아래의 경우에는 예외로 합니다.<br />

                - 법령의 규정에 따른 경우<br />
                - 회원의 동의가 있을 경우<br /><br />

                <div className="modal-content-title">6. 개인 정보의 안전성 확보 조치</div>

                6-1. 회사는 개인 정보의 안전성을 확보하기 위해 다음과 같은 조치를 취합니다.<br />

                - 개인 정보에 대한 접근 제한<br /><br />

                <div className="modal-content-title">7. 개인정보 열람, 정정 및 삭제 권리</div>

                7-1. 회원은 언제든지 자신의 개인 정보를 열람, 정정, 삭제할 수 있습니다. 자세한 내용은 개인 정보 보호 정책을 참고하시기 바랍니다.<br /><br />

                <div className="modal-content-title">8. 개인 정보 보호 책임자 및 문의처</div>

                8-1. 개인 정보 보호 책임자는 김대표이며, 개인 정보와 관련된 문의 및 불만 사항은 대표메일 TOgether@together.co.kr 또는 대표전화 0123-4567로 연락하여 주십시오.<br /><br />

                <div className="modal-content-title">9. 약관의 변경</div>

                9-1. 회사는 필요한 경우 개인정보 수집 및 이용 약관을 변경할 수 있으며, 변경된 약관은 서비스 내 공지로 효력을 발생합니다.<br /><br />


                이상의 약관은 2024년 2월 1일에 최종 수정되었습니다.
            </div>
        </div>
    );
}


export function ModalContent3({ onClose }) {
    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-close-wrap"><button className="modal-close" onClick={onClose}>x</button></div>
                <div className="modal-title"> <p>위치기반서비스 이용약관</p> </div>
                <br /><br />

                <div className="modal-content-title">1. 약관의 적용</div>

                1-1. 본 위치기반서비스 이용약관(이하 "약관")은 TOgether(이하 "회사"라 칭함)이 제공하는 위치기반서비스(이하 "서비스")의 이용 조건 및 규정을 명시합니다.<br />
                1-2. 본 약관은 회원 가입 시 동의한 것으로 간주되며, 서비스 이용 시 회원에게 적용됩니다.<br /><br />

                <div className="modal-content-title">2. 위치정보의 수집 및 이용 목적</div>

                2-1. 회사는 서비스 제공을 위해 회원의 위치정보를 수집하며, 다음 목적으로 이용합니다.<br />

                - 근처 지하철역 표시 및 서비스의 맞춤화<br />
                - 서비스 이용에 필요한 지역 기반 정보 제공<br /><br />

                <div className="modal-content-title">3. 수집하는 위치정보 항목</div>

                3-1. 회사는 다음과 같은 위치정보를 수집합니다.<br />

                - GPS 정보<br /><br />

                <div className="modal-content-title">4. 위치정보 수집 방법</div>

                4-1. 회사는 위치정보를 사용자로부터 수집하며, 해당 정보는 서비스 이용 시 자동으로 수집됩니다.<br /><br />

                <div className="modal-content-title">5. 위치정보의 보유 및 이용 기간</div>

                5-1. 회사는 위치정보의 수집 목적이 달성된 경우 또는 회원 탈퇴 요청 시에 해당 정보를 즉시 파기합니다.<br /><br />

                <div className="modal-content-title">6. 위치정보 제공 및 공유</div>

                6-1. 회사는 위치정보를 회원 동의 없이 타 기업이나 제3자와 공유하지 않습니다. 다만, 아래의 경우에는 예외로 합니다.<br />

                - 법령의 규정에 따른 경우<br />
                - 회원의 동의가 있을 경우<br /><br />

                <div className="modal-content-title">7. 회원의 권리와 의무</div>

                7-1. 회원은 언제든지 위치기반서비스 이용을 거부할 수 있으나, 전체 서비스 이용에 어려움이 있을 수 있습니다.<br />

                7-2. 회원은 자신의 위치정보를 정확하게 제공해야 하며, 부정확한 정보 제공으로 발생한 문제에 대한 책임은 회원에게 있습니다.<br /><br />

                <div className="modal-content-title">8. 약관의 변경</div>

                8-1. 회사는 필요한 경우 위치기반서비스 이용약관을 변경할 수 있으며, 변경된 약관은 서비스 내 공지로 효력을 발생합니다.<br /><br />

                <div className="modal-content-title">9. 면책 조항</div>

                9-1. 회사는 위치정보 이용으로 발생한 손실이나 피해에 대해 일체의 책임을 지지 않습니다.<br /><br />

                <div className="modal-content-title">10. 준거법과 재판관할</div>

                10-1. 본 약관은 대한민국 법률에 따라 해석되며, 위치기반서비스 이용으로 인한 분쟁의 소송은 대한민국 법원을 관할합니다.<br /><br />

                <div className="modal-content-title">11. 문의처</div>

                11-1. 본 약관 또는 서비스에 대한 문의는 대표메일 TOgether@together.co.kr 또는 대표전화 0123-4567로 문의하실 수 있습니다.<br /><br />


                이상의 약관은 2024년 2월 1일에 최종 수정되었습니다.
            </div>
        </div>
    );
}
