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
//             //service_url: window.origin + "/dashboard"
//             service_url: "https://voltas-service-manag-byqmrivi.onslate.com/dashboard"
//         };
//         catalyst.auth.signIn("login", config);
//     }, []);


//     return (
//         <div className="min-h-screen w-full bg-black flex items-center justify-center p-4">
//             {/* Injecting a style tag to target the iframe specifically */}
//             <style>
//                 {`
//                     #login iframe {
//                         width: 100% !important;
//                         height: 600px !important; /* Forces the internal iframe to be tall enough */
//                         border: none !important;
//                     }
//                 `}
//             </style>
            
//             <div 
//                 id="login" 
//                 className="w-full max-w-[450px] bg-white rounded-lg shadow-xl overflow-hidden"
//                 style={{ minHeight: '600px' }} 
//             >
//                 {/* Catalyst SDK will render the iframe here */}
//             </div>
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
