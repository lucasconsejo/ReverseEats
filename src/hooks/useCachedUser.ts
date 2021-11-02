import { useEffect, useState } from "react";
import { getCacheUser } from "../cache/user";
import { User } from "../types/global.types";

const useCachedUser = () => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        getCacheUser()
        .then(res => { setUser(JSON.parse(`${res}`))});
    }, []);

    return user;
}

export default useCachedUser
