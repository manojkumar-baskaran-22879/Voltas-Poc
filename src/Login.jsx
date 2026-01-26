// import { useEffect } from "react";
// import { Link } from "react-router-dom";
// const LoginPage = () => {
//     useEffect(() => {
//         //config is optional
//         const config =
//         {
//             service_url: window.location.origin + "/" 
//         }
//         catalyst.auth.signIn("login", config);
//     }, []);
//     return (
                     
            

//             <div id="login"></div>
            
//     );
// };


// export default LoginPage;

import { useEffect } from "react";

// const LoginPage = () => {
//     useEffect(() => {
//         const config = {
//             // service_url: window.location.origin + "/"
//             service_url: "https://voltas-service-manag-byqmrivi.onslate.com/dashboard"
//         };
//         catalyst.auth.signIn("login", config);
//     }, []);

//     return (
//         <div className="min-h-screen min-w-full bg-black flex items-center justify-center">
//             <div id="login"></div>
//         </div>
//     );
// };

function LoginPage() {
    useEffect(() => {
        window.location.href = window.origin + "/__catalyst/auth/login?redirect_url=/dashboard";
    }, []);
    return null;
}

export default LoginPage;
