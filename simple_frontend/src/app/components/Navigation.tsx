"use client";
import Link from "next/link";
import useAuth from "../custom_hooks/useAuth";

const Navigation = () => {
    const { isLoggedIn, logout } = useAuth();

    return (
        <nav>
            <ul className="list-none flex justify-end items-center gap-5 px-5 h-full bg-blue-200">
                <li className="hover:bg-blue-300 h-full flex items-center">
                    <Link href="/" className="h-full flex items-center px-3">
                        Home
                    </Link>
                </li>
                {isLoggedIn ? (
                    <li className="hover:bg-blue-300 h-full flex items-center">
                        <button onClick={logout} className="h-full flex items-center px-3">
                            Logout
                        </button>
                    </li>
                ) : (
                    <>
                        <li className="hover:bg-blue-300 h-full flex items-center">
                            <Link href="/login" className="h-full flex items-center px-3">
                                Login
                            </Link>
                        </li>
                        <li className="hover:bg-blue-300 h-full flex items-center">
                            <Link href="/register" className="h-full flex items-center px-3">
                                Register
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navigation;
