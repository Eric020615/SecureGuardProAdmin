import { GenderEnum, RoleEnum } from "@config/constant/user";

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
    gender: GenderEnum;
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
    gender: GenderEnum;
    role: RoleEnum;
    roleInformation: ResidentInformation | SystemAdminInformation;
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

export interface SystemAdminInformation {
    staffId: string
	supportedFiles: string[]
}

export type GeneralFile = {
	fileName: string;
	data: string
}

export interface UserInformationFormDto {
	firstName: string
	lastName: string
	userName: string
	contactNumber: string
	gender: GenderEnum
	dateOfBirth: string
    staffId: string
	supportedFiles: GeneralFile[]
}

export interface GetUserProfileByIdDto {
    userId: string;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    contactNumber: string;
    gender: GenderEnum;
    role: RoleEnum;
    roleInformation?: SystemAdminInformation;
    dateOfBirth: string;
    isActive?: boolean;
    createdBy: string;
    createdDateTime: string;
    updatedBy: string;
    updatedDateTime: string;
}

export interface EditUserDetailsByIdDto {
    userId: string;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    contactNumber: string;
    gender: string;
    dateOfBirth: string;
}

export interface CreateUserFaceAuthDto {
    faceData: string
}