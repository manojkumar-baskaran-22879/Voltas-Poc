import { useEffect } from "react";


function Login() {
    useEffect(() => {
        window.location.href = window.origin + "/__catalyst/auth/login?redirect_url=/welcome";
    }, []);
    return null;
}

export default Login;