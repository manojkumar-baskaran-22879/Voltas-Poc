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

const LoginPage = () => {
    useEffect(() => {
        const config = {
            // service_url: window.location.origin + "/"
            service_url: "/dashboard"
        };
        catalyst.auth.signIn("login", config);
    }, []);

    return (
        <div className="min-h-screen min-w-full bg-black flex items-center justify-center">
            <div id="login"></div>
        </div>
    );
};

export default LoginPage;
