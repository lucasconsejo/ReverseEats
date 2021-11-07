import { useContext } from "react";
import { UserContext } from "../context/userProvider";

const useUser = () => {
    const { userState, userDispatch } = useContext(UserContext);
    return [userState, userDispatch];
}

export default useUser;
