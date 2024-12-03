import { RoleDescriptionEnum } from "@config/constant/user"

export interface UserSignUpFormDto {
    email: string
    password: string
    confirmPassword: string
}

export interface SignInFormDto {
    email: string
    password: string
}

export interface AuthTokenPayloadDto {
    userGuid: string
    role: keyof typeof RoleDescriptionEnum
}

export interface SubUserAuthTokenPayloadDto {
    subUserRequestGuid: string
    subUserEmail: string
    parentUserGuid: string
}

export interface ResetPasswordDto {
    currentPassword: string
	newPassword: string
}

export interface RequestResetPasswordDto {
	email: string
}