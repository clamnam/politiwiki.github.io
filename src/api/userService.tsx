import React from "react";
import Cookies from 'js-cookie';
import {UserData} from '../types'

class UserService extends React.Component {
    static userSave(data: UserData) {
        
        // localStorage.setItem("token", token);
        Cookies.set('user-data', JSON.stringify(data), { expires: 1 });
    };
    static userRetrieval() {
        const userData = Cookies.get('user-data');
        if (userData) {
            return JSON.parse(userData);
        } else {
            return null;
        }
    };
    static userDelete() {
        // localStorage.setItem("token", token);
        Cookies.remove('user-data');
    };
} export default UserService;

