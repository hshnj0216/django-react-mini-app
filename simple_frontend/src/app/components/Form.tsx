"use client";
import { useState, FC, FormEvent } from 'react';
import useAuth from '../custom_hooks/useAuth';

interface FormProps{
    route: string,
    method: string,
}

const Form:FC<FormProps> = ({route, method}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { login, register } = useAuth();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (method === "login") {
                await login(username, password);
            } else if (method === "register") {
                await register(username, password);
            }
        } catch (error) {
            alert('Submission failed');
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <form onSubmit={handleSubmit} className="p-10 border rounded flex flex-col gap-3 bg-blue-200">
            <div className="flex flex-col mb-3">
                <label htmlFor="username">Username</label>
                <input 
                    id="username" 
                    type="text" 
                    name="username" 
                    title="username" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username..."
                    className="p-2"
                    tabIndex={0}
                />
            </div>
            <div className="flex flex-col mb-3">
                <label htmlFor="password">Password</label>
                <input 
                    id="password" 
                    type="password" 
                    name="password" 
                    title="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password..."
                    className="p-2"
                    tabIndex={0}
                />
            </div>
            <button 
                className="p-3 bg-blue-400 hover:bg-blue-600 rounded"
                type="submit"
                tabIndex={0}
            >
                {method.charAt(0).toUpperCase() + method.slice(1)}
            </button>
        </form>
    )
}

export default Form;