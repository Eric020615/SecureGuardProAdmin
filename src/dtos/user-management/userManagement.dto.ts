import { GenderEnum, RoleEnum } from "@config/constant/user"

export interface GetUserDto {
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

export interface GetUserDetailsByUserGuidDto {
    userId: number
    userGuid: string
    firstName: string
    lastName: string
    userName: string
    email: string
    contactNumber: string
    gender: GenderEnum
    role: RoleEnum
    roleInformation: ResidentInformationDto | SystemAdminInformationDto
    dateOfBirth: string
    isActive: boolean
    createdBy: string
    createdDateTime: string
    updatedBy: string
    updatedDateTime: string
}

export interface ResidentInformationDto {
    floorNumber: string
    unitNumber: string
    supportedFiles: string[]
}

export interface SystemAdminInformationDto {
    staffId: string
    supportedFiles: string[]
}