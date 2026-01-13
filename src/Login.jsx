import { useEffect } from "react";
import { Link } from "react-router-dom";
const LoginPage = () => {
    useEffect(() => {
        //config is optional
        const config =
        {
            //css_url: "/embeddediframe.css", // Login page customization css file path, if not provided default css will be rendered
            is_customize_forgot_password: false, // Default value is false. Keep this value as true, if you wish to customize Forgot Password page
            forgot_password_id: "login", // Element id in which forgot password page should be loaded, by default will render in the "loginDivElementId"
            //forgot_password_css_url: "/fpwd.css", // Forgot password page customization css file path, if not provided default css will be rendered
            // redirect_url: window.host + window.location.origin + "/"
            redirect_url: window.location.protocol + "//" + window.location.host + "/"
        }
        catalyst.auth.signIn("login", config);
    }, []);
    return (
        <div className="container">
            {/* <img
                width="80px"
                height="80px"
                src="https://cdn2.iconfinder.com/data/icons/user-management/512/profile_settings-512.png"
            /> */}
            <h1 className="title">Voltas Service Management Login</h1>
            <div id="login"></div>
            {/* <p className="homepage">
                <b>
                    Don't have an account?{" "}
                    
                    now!
                </b>
            </p> */}
        </div>
    );
};
export default LoginPage;