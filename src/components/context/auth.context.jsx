import { createContext, useState } from "react";

export const AuthContext = createContext({
    email: "",
    phone: "",
    fullName: "",
    role: "",
    avatar: "",
    id: ""
})

export const AuthWrapper = (props) => {
    const [user, setUser] = useState({
        email: "",
        phone: "",
        fullName: "",
        role: "",
        avatar: "",
        id: ""
    })

    const [isAppLoading, setIsAppLoading] = useState(true)

    const delay = (milSeconds) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve()
            }, milSeconds)
        })
    }

    return (
        <AuthContext.Provider value={{ user, setUser, isAppLoading, setIsAppLoading, delay }}>
            {props.children}
        </AuthContext.Provider>
    )
}

