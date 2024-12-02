import { GenderEnum, RoleEnum } from "@config/constant/user"
import { GeneralFileResponseDto } from "@dtos/application/application.dto"

export interface GetUserDto {
    userId: number
    userGuid: string
    firstName: string
    lastName: string
    userName: string
    contactNumber: string
    gender: GenderEnum
    role: RoleEnum
    userStatus: string
    status: string
}

export interface GetUserDetailsByUserGuidDto {
    userId: number
    userGuid: string
    firstName: string
    lastName: string
    userName: string
    email: string
    contactNumber: string
    gender: string
    role: string
    roleInformation: ResidentInformationDto | StaffInformationDto
    dateOfBirth: string
    isActive: boolean
    badgeNumber: string
    supportedDocuments: GeneralFileResponseDto[]
    status: string
    createdBy: string
    createdDateTime: string
    updatedBy: string
    updatedDateTime: string
}

export interface ResidentInformationDto {
    floor: string
    unit: string
}

export interface StaffInformationDto {
    staffId: string
}