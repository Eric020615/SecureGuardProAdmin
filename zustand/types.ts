
export interface UserSignUpFormDto {
    email: string;
    password: string;
    confirmPassword: string;
}

export interface SignInFormDto {
    email: string;
    password: string;
}

export interface GetFacilityBookingList {
    facilityId: string;
    startDate: string;
    endDate: string;
    numOfGuest: number;
    userGUID: string;
    bookingId: string;
    isCancelled: boolean
}

export interface CreateFacilityBooking {
    facilityId: string;
    startDate: string;
    endDate: string;
    numOfGuest: number;
    userGUID: string;
}

export interface CreateNotice {
    title: string;
    description: string;
    startDate: string;
    endDate: string;
}

export interface GetNoticeList {
    noticeId: string;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
}

export interface CancelBooking {
    bookingId: string;
    cancelRemark: string
}