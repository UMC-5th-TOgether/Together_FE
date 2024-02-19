import '../style/MyPage.css'

export const PostStatus = ({ status }) => {
    return (
        <div className="mypage-writtenpost-status">
            {status === '매칭 전' && (
                <div className="mypage-writtenpost-status-pending">매칭 전</div>
            )}
            {status === '매칭 완료' && (
                <div className="mypage-writtenpost-status-complete">매칭 완료</div>
            )}
        </div>
    );
};
