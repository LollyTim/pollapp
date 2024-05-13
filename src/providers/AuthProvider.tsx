import { Session, User } from "@supabase/supabase-js";
import {
    PropsWithChildren,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import { supabase } from "../lib/supabase";

type AuthContextType = {
    session: Session | null;
    user: User | null;
    isAthenticated: boolean;
};

const AuthContext = createContext<AuthContextType>({
    session: null,
    user: null,
    isAthenticated: false,
});

export default function AuthProvider({ children }: PropsWithChildren) {
    const [session, setSession] = useState<Session | null>(null);

    useEffect(() => {
        supabase.auth.getSession().then(async ({ data: { session } }) => {
            setSession(session);
            if (!session) {
                supabase.auth.signInAnonymously();
            }
        });

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });
    }, []);

    return (
        <AuthContext.Provider
            value={{
                session,
                user: session?.user,
                isAthenticated: !!session?.user && !session.user.is_anonymous,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
