import { GetterTree } from "vuex";
import { IUserState } from "./state";

const getters: GetterTree<IUserState, unknown> =  {
    getUsers(state) {
        return state.users;
    },
    getLoggedUser(state) {
        return state.loggedUser;
    },
    getSelectedUser(state) {
        return state.selectedUser;
    },
    getIsLoading(state) {
        return state.isLoading;
    }
}

export default getters;