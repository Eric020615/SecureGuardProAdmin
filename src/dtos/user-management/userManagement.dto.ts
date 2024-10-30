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
    floor: string
    unit: string
    supportedDocuments: GeneralFileResponseDto[]
}

export interface SystemAdminInformationDto {
    staffId: string
    supportedDocuments: GeneralFileResponseDto[]
}