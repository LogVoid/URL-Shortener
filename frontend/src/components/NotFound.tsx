import { useLocation } from "react-router-dom";
import React, { useEffect } from "react";

const Login: React.FC = () => {
    const location = useLocation();
    const { pathname } = location;

    const pointer = pathname.substring(1);

    useEffect(() => {
        const redirectToLink = async () => {
            try {
                const response = await fetch("http://localhost:5000/get", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        pointer: pointer,
                    }),
                });

                if (response.ok) {
                    const data = await response.json();
                    window.location.href = data.link;
                }
            } catch (error) {
                console.error("Error occurred while fetching link:", error);
            }
        };
        if (pointer.length === 10) { // If Length of route is 10 then check if its a shortlink
            redirectToLink();
        }
    }, [pointer]);

    return (
        <></>
    );
};

export default Login;
