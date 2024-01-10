export const GoogleLoginButton = () => {
    const GOOGLE_CLIENT_ID = '557105506337-7vh9818hjrjg3rr50l9m34e64suuhd19.apps.googleusercontent.com';
    const GOOGLE_REDIRECT_URI = 'http://localhost:3000/'
    window.location.href = `https://accounts.google.com/o/oauth2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=openid email profile`;
};

export const NaverLoginButton = () => {
    const NAVER_CLIENT_ID = 'eYnm3Nbek0wkd_kXW1bU';
    const NAVER_REDIRECT_URI = 'http://localhost:3000/'
    window.location.href = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=STATE_STRING&redirect_uri=${NAVER_REDIRECT_URI}&auth_type=reprompt`;
};

export const KakaoLoginButton = () => {
    const KAKAO_CLIENT_ID = '0c224b34562f178eee5a9ab7386ddd60';
    const KAKAO_REDIRECT_URI = 'http://localhost:3000/';
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
}