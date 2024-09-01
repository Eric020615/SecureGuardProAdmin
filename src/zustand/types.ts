import { RoleEnum } from "@config/constant/user";

export interface UserSignUpFormDto {
    email: string;
    password: string;
    confirmPassword: string;
}

export interface SignInFormDto {
    email: string;
    password: string;
}

export interface GetFacilityBooking {
    facilityId: string;
    startDate: string;
    endDate: string;
    numOfGuest: number;
    bookedBy: string;
    bookingId: string;
    isCancelled: boolean
}

export interface CreateFacilityBooking {
    bookedBy: string;
    facilityId: string;
    startDate: string;
    endDate: string;
    numOfGuest: number;
}

export interface CreateNotice {
    title: string;
    description: string;
    startDate: string;
    endDate: string;
}

export interface EditNotice {
    noticeId: string;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
}

export interface DeleteNotice {
    noticeId: string;
}

export interface GetNotice {
    noticeId: string
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    createdBy: string;
    createdDateTime: string;
    updatedBy: string;
    updatedDateTime: string;
}

export interface GetNoticeDetailsById {
    noticeId: string
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    createdBy: string;
    createdDateTime: string;
    updatedBy: string;
    updatedDateTime: string;
}

export interface CancelBooking {
    bookingId: string;
    cancelRemark: string
}

export interface GetUser {
    userId: string;
    firstName: string;
    lastName: string;
    userName: string;
    contactNumber: string;
    gender: string;
    role: RoleEnum;
    dateOfBirth: string;
    createdBy: string;
    createdDateTime: string;
    updatedBy: string;
    updatedDateTime: string;
}

export interface GetUserDetails {
    userId: string;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    contactNumber: string;
    gender: string;
    role: RoleEnum;
    roleInformation: ResidentInformation;
    dateOfBirth: string;
    isActive: boolean;
    createdBy: string;
    createdDateTime: string;
    updatedBy: string;
    updatedDateTime: string;
}

export interface ResidentInformation {
    floorNumber: string
	unitNumber: string
	supportedFiles: string[]
}