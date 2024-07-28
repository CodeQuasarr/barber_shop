import {defineStore} from "pinia";


export const useUserStore = defineStore('user', {
    state: () => {
        return {
            token: null as string | null,
            name: null as string | null,
            image: null as string | null,
        }
    },

    actions: {
        setUserInfo(token: string, name: string, image: string) {
            this.token = token;
            this.name = name;
            this.image = image;
        },

        removeUserInfo() {
            this.token = null;
            this.name = null;
            this.image = null;
        },
    },

    getters: {
        isAuth(): boolean {
            return !!this.token;
        },
    },
});
