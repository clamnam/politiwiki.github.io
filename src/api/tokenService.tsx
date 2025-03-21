import React from "react";



class TokenService extends React.Component {
    static tokenSave(token: string) {
        localStorage.setItem("token", token);
    };
    static tokenRetrieval() {
        const token = localStorage.getItem("token");
        if (token) {
            return token;
        } else {
            return null;
        }
    };
} export default TokenService;

