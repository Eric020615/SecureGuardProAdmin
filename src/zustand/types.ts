import { GenderEnum, RoleEnum } from '@config/constant/user'

export interface UserSignUpFormDto {
    email: string
    password: string
    confirmPassword: string
}

export interface SignInFormDto {
    email: string
    password: string
}

export interface GetFacilityBooking {
    bookingId: number
    bookingGuid: string
    startDate: string
    facilityId: string
    facilityName: string
    endDate: string
    bookedBy: string
    numOfGuest: number
    isCancelled: boolean
    cancelRemark: string
    createdBy: string
    createdDateTime: string
    updatedBy: string
    updatedDateTime: string
}

export interface CreateFacilityBooking {
    bookedBy: string
    facilityId: string
    startDate: string
    endDate: string
    numOfGuest: number
}

export interface CreateNotice {
    title: string
    description: string
    startDate: string
    endDate: string
}

export interface EditNotice {
    noticeGuid: string
    title: string
    description: string
    startDate: string
    endDate: string
}

export interface DeleteNotice {
    noticeGuid: string
}

export interface GetNotice {
    noticeId: number
    noticeGuid: string
    title: string
    description: string
    startDate: string
    endDate: string
    createdBy: string
    createdDateTime: string
    updatedBy: string
    updatedDateTime: string
}

export interface GetNoticeDetailsById {
    noticeId: number
    noticeGuid: string
    title: string
    description: string
    startDate: string
    endDate: string
    createdBy: string
    createdDateTime: string
    updatedBy: string
    updatedDateTime: string
}

export interface CancelBooking {
    bookingGuid: string
    cancelRemark: string
}

export interface GetUser {
    userId: number
    userGuid: string
    firstName: string
    lastName: string
    userName: string
    contactNumber: string
    gender: GenderEnum
    role: RoleEnum
    dateOfBirth: string
    createdBy: string
    createdDateTime: string
    updatedBy: string
    updatedDateTime: string
}

export interface GetUserDetails {
    userId: number
    userGuid: string
    firstName: string
    lastName: string
    userName: string
    email: string
    contactNumber: string
    gender: GenderEnum
    role: RoleEnum
    roleInformation: ResidentInformation | SystemAdminInformation
    dateOfBirth: string
    isActive: boolean
    createdBy: string
    createdDateTime: string
    updatedBy: string
    updatedDateTime: string
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
    fileName: string
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
    userId: string
    firstName: string
    lastName: string
    userName: string
    email: string
    contactNumber: string
    gender: GenderEnum
    role: RoleEnum
    roleInformation?: SystemAdminInformation
    dateOfBirth: string
    isActive?: boolean
    createdBy: string
    createdDateTime: string
    updatedBy: string
    updatedDateTime: string
}

export interface EditUserDetailsByIdDto {
   firstName: string
	lastName: string
	userName: string
	email: string
	contactNumber: string
	gender: string
	dateOfBirth: string
}

export interface CreateUserFaceAuthDto {
    faceData: string
}
