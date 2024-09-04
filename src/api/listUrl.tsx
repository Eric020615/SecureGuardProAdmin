import { IType } from "@config/index"

export const listUrl = {
    auth: {
        logIn: {
            path: 'auth/log-in',
            type: IType.post
        },
        signUp: {
            path: 'auth/sign-up',
            type: IType.post
        },
        checkJwtAuth: {
            path: 'auth/check-auth/',
            type: IType.get
        },
    },
    user: {
        createUser: {
            path: 'user/create/',
            type: IType.post
        }
    },
    facility: {
        book: {
            path: "facility/create",
            type: IType.post
        },
        getBookingHistory: {
            path: "facility/admin",
            type: IType.get
        },
        cancelBooking: {
            path: "facility/cancel",
            type: IType.put
        }
    },
    notice: {
        create: {
            path: "notice/create",
            type: IType.post
        },
        getNotices: {
            path: "notice/admin",
            type: IType.get
        },
        getNoticeById: {
            path: "notice/detail",
            type: IType.get
        },
        editNoticeById: {
            path: "notice/edit/",
            type: IType.put
        },
        deleteNoticeById: {
            path: "notice/delete/",
            type: IType.delete
        }
    },
    userManagement: {
        getUsers: {
            path: "user/user-list",
            type: IType.get
        },
        getUserDetailsById: {
            path: "user/details/",
            type: IType.get
        },
        activateUserById: {
            path: "user/activate/",
            type: IType.put
        },
        deactivateUserById: {
            path: "user/deactivate/",
            type: IType.put
        },
    }
}