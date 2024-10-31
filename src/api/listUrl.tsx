import { IType } from '@config/index'
import { getVisitorDetailsById } from './visitorService/visitorService'
import { getFacilityBookingDetails } from './facilityService/facilityService'

export const listUrl = {
    auth: {
        logIn: {
            path: 'auth/log-in',
            type: IType.post,
        },
        signUp: {
            path: 'auth/sign-up/',
            type: IType.post,
        },
        resetPassword: {
            path: 'auth/reset-password/',
            type: IType.post
        },
        requestResetPasswordEmail: {
            path: 'auth/reset-password/request',
            type: IType.post
        },
        checkJwtAuth: {
            path: 'auth/check-auth',
            type: IType.get,
        },
        checkSubUserAuth: {
            path: 'auth/check-auth/sub-user',
            type: IType.get,
        },
    },
    faceAuth: {
        create: {
            path: 'face-auth/user/upload',
            type: IType.post,
        },
    },
    user: {
        createUser: {
            path: 'user/create/',
            type: IType.post,
        },
        getUserProfileById: {
            path: 'user/profile/',
            type: IType.get,
        },
        editUserProfileById: {
            path: 'user/profile/',
            type: IType.put,
        },
    },
    facility: {
        book: {
            path: 'facility/create',
            type: IType.post,
        },
        getBookingHistory: {
            path: 'facility/admin',
            type: IType.get,
        },
        getFacilityBookingDetails: {
            path: 'facility/details',
            type: IType.get,
        },
        cancelBooking: {
            path: 'facility/cancel',
            type: IType.put,
        },
        checkAvailabilitySlot: {
            path: 'facility/available-slot/check',
            type: IType.get,
        },
    },
    notice: {
        create: {
            path: 'notice/create',
            type: IType.post,
        },
        getNotices: {
            path: 'notice/admin',
            type: IType.get,
        },
        getNoticeById: {
            path: 'notice/details',
            type: IType.get,
        },
        editNoticeById: {
            path: 'notice/edit/',
            type: IType.put,
        },
        deleteNoticeById: {
            path: 'notice/delete/',
            type: IType.delete,
        },
    },
    userManagement: {
        getUsers: {
            path: 'user/admin/user-list',
            type: IType.get,
        },
        getUserDetailsById: {
            path: 'user/details/',
            type: IType.get,
        },
        activateUserById: {
            path: 'user/activate/',
            type: IType.put,
        },
        deactivateUserById: {
            path: 'user/deactivate/',
            type: IType.put,
        },
    },
    vistorManagement: {
        getVisitors: {
            path: 'visitor/admin',
            type: IType.get,
        },
        getVisitorDetailsById: {
            path: 'visitor/details',
            type: IType.get,
        },
        getVisitorAnalytics: {
            path: 'visitor/admin/analytics',
            type: IType.get,
        }
    }
}
