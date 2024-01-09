// import { GoogleLogin } from "@react-oauth/google";
// import { GoogleOAuthProvider } from "@react-oauth/google";
// import jwt_decode from 'jwt-decode';

const GoogleLoginButton = () => {
    const GOOGLE_CLIENT_ID = '557105506337-7vh9818hjrjg3rr50l9m34e64suuhd19.apps.googleusercontent.com';
    const GOOGLE_REDIRECT_URI = 'http://localhost:3000/'
    window.location.href = `https://accounts.google.com/o/oauth2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=openid email profile`;
    // const clientId = '557105506337-7vh9818hjrjg3rr50l9m34e64suuhd19.apps.googleusercontent.com'
    // return (
    //     <div>
    //         <GoogleOAuthProvider clientId={clientId}>
    //             <GoogleLogin
    //                 onSuccess={(res) => {
    //                     console.log(res);
    //                     // const decodeding = jwt_decode(res.credential);
    //                     // console.log(decodeding)
    //                 }}
    //                 onFailure={(err) => {
    //                     console.log(err);
    //                 }}
    //             />
    //         </GoogleOAuthProvider>
    //     </div>
    // );
};

export default GoogleLoginButton;
