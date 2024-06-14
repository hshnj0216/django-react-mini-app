import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from './useAuth';

const useProtectedRoute = () => {
    const { isLoggedIn } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoggedIn) {
            router.push('/login');
        }
    }, [isLoggedIn]);

    return isLoggedIn;
};

export default useProtectedRoute;
