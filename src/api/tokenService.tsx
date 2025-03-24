import React from "react";
import Cookies from 'js-cookie';


class TokenService extends React.Component {
    static tokenSave(token: string) {
        // localStorage.setItem("token", token);
        Cookies.set('token', token, { expires: 1 });
    };
    static tokenRetrieval() {
        const token = Cookies.get('token');
        if (token) {
            return token;
        } else {
            return null;
        }
    };
    static tokenDelete() {
        // localStorage.setItem("token", token);
        Cookies.remove('token');
    };
} export default TokenService;

