export const GoogleLoginButton = () => {
    const REACT_APP_GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    const REACT_APP_GOOGLE_REDIRECT_URI = process.env.REACT_APP_GOOGLE_REDIRECT_URI;
    window.location.href = `https://accounts.google.com/o/oauth2/auth?client_id=${REACT_APP_GOOGLE_CLIENT_ID}&redirect_uri=${REACT_APP_GOOGLE_REDIRECT_URI}&response_type=code&scope=openid email profile`;
};

export const NaverLoginButton = () => {
    const REACT_APP_NAVER_CLIENT_ID = process.env.REACT_APP_NAVER_CLIENT_ID;
    const REACT_APP_NAVER_REDIRECT_URI = process.env.REACT_APP_NAVER_REDIRECT_URI;
    window.location.href = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${REACT_APP_NAVER_CLIENT_ID}&state=STATE_STRING&redirect_uri=${REACT_APP_NAVER_REDIRECT_URI}&auth_type=reprompt`;
};

export const KakaoLoginButton = () => {
    const REACT_APP_KAKAO_CLIENT_ID = process.env.REACT_APP_KAKAO_CLIENT_ID;
    const REACT_APP_KAKAO_REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=${REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`;
}
