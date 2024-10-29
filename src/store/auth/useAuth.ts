import { create } from "zustand"
import { checkAuth, checkSubUserAuth, requestResetPassword, resetPassword, signIn, signUp } from "@api/authService/authService"
import { generalAction, internalGeneralAction } from "@store/application/useApplication";
import { AuthTokenPayloadDto, RequestResetPasswordDto, ResetPasswordDto, SignInFormDto, SubUserAuthTokenPayloadDto, UserSignUpFormDto } from "@dtos/auth/auth.dto";
import { IResponse } from "@api/globalHandler";
import { RoleEnum } from "@config/constant/user";
import { deleteCookies } from "@lib/cookies";

interface State {
	isLogged: boolean
	tempToken: string
	authTokenPayload: AuthTokenPayloadDto
	subUserPayload: SubUserAuthTokenPayloadDto
}

interface Actions {
	signUpAction: (userSignUpForm: UserSignUpFormDto, role?: RoleEnum) => Promise<any>
	signInAction: (userSignInForm: SignInFormDto) => Promise<any>
	requestResetPasswordAction: (requestResetPasswordDto: RequestResetPasswordDto) => Promise<any>
	resetPasswordAction: (resetPasswordDto: ResetPasswordDto) => Promise<any>
	logOutAction: () => void
	checkJwtAuthAction: (token: string, check?: boolean) => Promise<any>
    checkSubUserAuthAction: (token: string) => Promise<IResponse<SubUserAuthTokenPayloadDto>>
}


export const useAuth = create<State & Actions>((set) => ({
	isLogged: false,
	tempToken: '',
	subUserPayload: {} as SubUserAuthTokenPayloadDto,
	authTokenPayload: {} as AuthTokenPayloadDto,
	signUpAction: async (userSignUpForm: UserSignUpFormDto, role = RoleEnum.SYSTEM_ADMIN) => {
		return generalAction(
			async () => {
				const response = await signUp(userSignUpForm, role)
				if(!response.success){
					throw new Error(response.msg)
				}
				set({ isLogged: true, tempToken: response.data })
				return response
			},
			'', // Custom success message
			'Account created failed. Please try again.', // Custom error message
		)
	},

	signInAction: async (userSignInForm: SignInFormDto) => {
		return generalAction(
			async () => {
				const response = await signIn(userSignInForm)
				if (response.success) {
					set({ isLogged: true })
				} else {
					throw new Error(response.msg)
				}
				return response
			},
			'Welcome back.', // Custom success message
			'Sign-in failed. Please check your credentials and try again.', // Custom error message
		)
	},

	logOutAction: () => {
		return internalGeneralAction(
			async () => {
				set({ isLogged: false, authTokenPayload: {} as AuthTokenPayloadDto })
				deleteCookies('token')
				return null
			},
			'', // Custom success message
			'Logout failed. Please try again.', // Custom error message
		)
	},

	resetPasswordAction: async (resetPasswordDto: ResetPasswordDto) => {
		return generalAction(
			async () => {
				const response = await resetPassword(resetPasswordDto)
				if(!response?.success){
					throw new Error(response.msg)
				}
				return response
			},
			'Password reset successful!', // Custom success message
			'Failed to reset password. Please try again.', // Custom error message
		)
	},

	requestResetPasswordAction: async (requestResetPasswordDto: RequestResetPasswordDto) => {
		return generalAction(
			async () => {
				const response = await requestResetPassword(requestResetPasswordDto)
				if(!response?.success){
					throw new Error(response.msg)
				}
				return response
			},
			'Password reset email sent! Please check your email', // Custom success message
			'Failed to send password reset email. Please try again.', // Custom error message
		)
	},

	checkJwtAuthAction: async (token: string, check = false) => {
		return generalAction(
			async () => {
				const response = await checkAuth(token, check)
				if(!response.success){
					throw new Error(response.msg)
				}
				set({ authTokenPayload: response.data })
				return response
			},
			'',
			'Authentication failed. Please log in again.', // Custom error message
		)
	},

    checkSubUserAuthAction: async (token: string) => {
        return generalAction(
			async () => {
                const response = await checkSubUserAuth(token);
				if(!response.success){
					throw new Error(response.msg)
				}
				set({ subUserPayload: response.data })
				return response
			},
			'',
			'Authentication failed. Please log in again.', // Custom error message
		)
    },
}))