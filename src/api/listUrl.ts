import { IType } from "@config/constant";

export const listUrl = {
    auth: {
        logIn: {
            path: 'auth/login',
            type: IType.post,
        },
        signUp: {
            path: 'auth/signup',
            type: IType.post,
        },
        resetPassword: {
            path: 'auth/reset-password',
            type: IType.post,
        },
        requestPasswordReset: {
            path: 'auth/reset-password/request',
            type: IType.post,
        },
        checkAuth: {
            path: 'auth/check',
            type: IType.get,
        },
        checkSubUserAuth: {
            path: 'auth/check/sub-user',
            type: IType.get,
        },
    },
    cards: {
        createCards: {
            path: 'cards',
            type: IType.post,
        },
        getCards: {
            path: 'cards',
            type: IType.get,
        },
        upload: {
            path: 'cards/face-auth',
            type: IType.post,
        },
        uploadVisitor: {
            path: 'cards/face-auth/visitors',
            type: IType.post,
        },
    },
    users: {
        create: {
            path: 'users',
            type: IType.post,
        },
        getById: {
            path: 'users/details',
            type: IType.get,
        },
        update: {
            path: 'users',
            type: IType.put,
        },
    },
    facilities: {
        book: {
            path: 'facilities',
            type: IType.post,
        },
        getBookingHistory: {
            path: 'facilities/admin/bookings',
            type: IType.get,
        },
        getDetails: {
            path: 'facilities/:id/details',
            type: IType.get,
        },
        cancelBooking: {
            path: 'facilities/bookings/:id/cancel',
            type: IType.put,
        },
        checkAvailability: {
            path: 'facilities/availability',
            type: IType.get,
        },
        getFacilityBookingUser: {
            path: 'facilities/admin/bookings/users',
            type: IType.get,
        },
    },
    noticeManagement: {
        create: {
            path: 'notices/admin',
            type: IType.post,
        },
        getAll: {
            path: 'notices/admin',
            type: IType.get,
        },
        getById: {
            path: 'notices/admin/:id/details',
            type: IType.get,
        },
        update: {
            path: 'notices/admin/:id',
            type: IType.put,
        },
        delete: {
            path: 'notices/admin/:id',
            type: IType.delete,
        },
    },
    userManagement: {
        getAll: {
            path: 'users/admin',
            type: IType.get,
        },
        getById: {
            path: 'users/admin/:id/details',
            type: IType.get,
        },
        activate: {
            path: 'users/admin/:id/activate',
            type: IType.put,
        },
        deactivate: {
            path: 'users/admin/:id/deactivate',
            type: IType.put,
        },
        delete: {
            path: 'users/admin/:id',
            type: IType.delete,
        },
    },
    visitorManagement: {
        getAll: {
            path: 'visitors/admin',
            type: IType.get,
        },
        getById: {
            path: 'visitors/admin/:id/details',
            type: IType.get,
        },
        getAnalytics: {
            path: 'visitors/admin/analytics',
            type: IType.get,
        },
    },
    visitor: {
        getVisitorPass: {
            path: 'visitors/pass',
            type: IType.get,
        },
        verifyToken: {
            path: 'visitors/verify-token',
            type: IType.get,
        },
    },
}
