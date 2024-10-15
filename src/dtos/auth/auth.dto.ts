import { RoleEnum } from "@config/constant/user"

export interface UserSignUpFormDto {
    email: string
    password: string
    confirmPassword: string
}

export interface SignInFormDto {
    email: string
    password: string
    role: string[]
}

export interface AuthTokenPayloadDto {
    userGuid: string
    role: RoleEnum
}

export interface SubUserAuthTokenPayloadDto {
    subUserRequestGuid: string
    subUserEmail: string
    parentUserGuid: string
}

export interface ResetPasswordDto {
	email: string
}