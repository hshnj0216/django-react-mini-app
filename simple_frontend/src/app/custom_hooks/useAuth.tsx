import { AuthContextValue, AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";

const useAuth = (): AuthContextValue => {
    const context = useContext(AuthContext);
    if(context === null) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

export default useAuth;
