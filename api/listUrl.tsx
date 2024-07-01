import { IType } from "../config/"

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
    facility: {
        book: {
            path: "facility/book/admin",
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
            path: "notice/create-notice",
            type: IType.post
        },
        getNotices: {
            path: "notice",
            type: IType.get
        },
        getNoticeById: {
            path: "notice/id",
            type: IType.get
        },
        updateNoticeById: {
            path: "notice/update/",
            type: IType.put
        },
        deleteNoticeById: {
            path: "notice/delete-notice/",
            type: IType.delete
        }
    }
}