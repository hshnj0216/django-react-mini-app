import { createContext, useState, useContext, useEffect, FC, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';
import api from '../api';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';
import { useRouter } from 'next/navigation';


interface AuthProviderProps{
    children: ReactNode;
}

export interface AuthContextValue{
    isLoggedIn: boolean;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void  ;
    register: (username: string, password: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

const AuthProvider:FC<AuthProviderProps> = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            const decoded: any = jwtDecode(token);
            if (decoded.exp * 1000 > Date.now()) {
                setIsLoggedIn(true);
            } else {
                localStorage.removeItem(ACCESS_TOKEN);
                localStorage.removeItem(REFRESH_TOKEN);
            }
        }
    }, []);

    const login = async (username: string, password: string) => {
        try {
            const res = await api.post("/api/token/", { username, password });
            localStorage.setItem(ACCESS_TOKEN, res.data.access);
            localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
            setIsLoggedIn(true);
            router.push("/");
        } catch (error) {
            alert("Login failed.");
            setIsLoggedIn(false);
        }
    };


    const register = async (username: string, password: string) => {
        try {
            await api.post("/api/user/register/", { username, password });
            await login(username, password);
        } catch (error) {
            alert("Registration failed.");
        }
    };

    const logout = () => {
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        setIsLoggedIn(false);
        router.push("/login");
    }


    return (
        <AuthContext.Provider value={{isLoggedIn, login, logout, register}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;

