import React, { useEffect } from "react";
import { useNavigate } from "react-router";

const LandingPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timeer = setTimeout(() => {
            navigate("/home");
        }, 3000);
        return () => clearTimeout(timeer);
    }, [navigate]);
    
    return (
        <section>
        <div>
            <h1>Welcome to the Anime Blog</h1>
            <p>You will be redirected to the home page shortly...</p>
        </div>
        </section>
    )
}

export default LandingPage; 
