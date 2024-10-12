import { GenderEnum, RoleEnum } from "@config/constant/user"
import { GeneralFile } from "../application/application.dto"
import { SystemAdminInformationDto } from "../user-management/userManagement.dto"

export interface UserInformationFormDto {
    firstName: string
    lastName: string
    userName: string
    contactNumber: string
    gender: GenderEnum
    dateOfBirth: string
}

export interface SystemAdminInformationFormDto extends UserInformationFormDto {
    staffId: string
    supportedFiles: GeneralFile[]
}

export interface SubUserInformationFormDto extends UserInformationFormDto {
    parentUserGuid: string,
    subUserRequestGuid: string
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
    roleInformation?: SystemAdminInformationDto
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