import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function ProtectedRoute({ children }) {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-[var(--color-background)]">
                <div className="flex items-center gap-2 text-sm text-gray-400 glass-card px-6 py-4 border-none shadow-2xl">
                    <span className="flex gap-1">
                        <span className="w-2 h-2 bg-[var(--color-primary)] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                        <span className="w-2 h-2 bg-[var(--color-primary)] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                        <span className="w-2 h-2 bg-[var(--color-primary)] rounded-full animate-bounce"></span>
                    </span>
                    Authenticating...
                </div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children ? children : <Outlet />;
}
