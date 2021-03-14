import React, { useContext, useState } from 'react';

interface User {
    name: string;
    id: string;
}

interface InitContextProps {
    user: User | null;
    login: () => void;
}

const SessionContext = React.createContext({} as InitContextProps);

export const SessionProvider = ({children}:{children: React.ReactNode}) => {
    const [user, setUser] = useState<User|null>(null);
    const login = () => {
        setUser({
            name: Math.random().toFixed(2) + "-name",
            id: Math.random().toFixed(9),
        })
    }
    return <SessionContext.Provider value={{user, login}} children={children} />
}

export const useSession = () => {
    const context = useContext(SessionContext);
    return context;
}