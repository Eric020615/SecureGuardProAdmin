import { IType } from "../config/"

export const listUrl = {
    auth: {
        logIn: {
            path: 'log-in',
            type: IType.post
        },
        signUp: {
            path: 'sign-up',
            type: IType.post
        }
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
        }
    }
}