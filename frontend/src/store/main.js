import {create} from "zustand";


const useStore = create((set) => ({

    logPage: false,

    logTitle: "Register",

    insideNav: false,

    onlineUser: {
        username: "",
        token: ""
    },

    AllUsers: [],

    MsgReceiver: "",

    AllMessages: [],

    AllCards: [],

    AllIcons: [],

    OtherUsersIcons: [],

    AllRequestsIcons: [],

    askedIcons: [],


    changeLogPage: (page, title) => set({
        logPage: page,
        logTitle: title
    }),

    changeMainNav: (nav, title) => set({
        insideNav: nav,
        logTitle: title
    }),

    RegisterUser: (value) => set((state) => ({
        onlineUser: value,

        AllUsers: value,
    })),

    LogInUser: (userInfo, userToken) => set((state) => ({
        onlineUser: {
            username: userInfo,
            token: userToken
        }
    })),

    ChooseReceiver: (value) => set({MsgReceiver: value}),

    GetAllMessages: (value) => set((state) => ({
        AllMessages: value
    })),

    GetAllCards: (value) => set((state) => ({
        AllCards: value
    })),

    GetAllIcons: (value) => set((state) => ({
        AllIcons: value
    })),

    GetVisitedUserIcons: (value) => set((state) => ({
        OtherUsersIcons: value
    })),

    GetAllRequests: (value) => set((state) => ({
        AllRequestsIcons: value
    })),

    AskForIcons: (value) => set((state) => ({
        askedIcons: [...state.askedIcons, value]
    })),

    ClearAskedIcons: (value) => set((state) => ({
        askedIcons: []
    }))

}))

export default useStore;