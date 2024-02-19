import '../style/MyPage.css'

export const PostStatus = ({ status }) => {
    return (
        <div className="mypage-writtenpost-status">
            {status === 'ING' && (
                <div className="mypage-writtenpost-status-pending">매칭 전</div>
            )}
            {status === 'END' && (
                <div className="mypage-writtenpost-status-complete">매칭 완료</div>
            )}
        </div>
    );
};
