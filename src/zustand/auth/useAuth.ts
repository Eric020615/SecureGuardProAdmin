import { create } from "zustand"
import { SignInFormDto, UserSignUpFormDto } from "../types"
import { checkAuth, checkSubUserAuth, signIn, signUp } from "@api/authService/authService"
import { generalAction } from "@zustand/application/useApplication";

interface State {
	isLogged: boolean
	tempToken: string
}

interface Actions {
	signUpAction: (userSignUpForm: UserSignUpFormDto) => Promise<any>
	signInAction: (userSignInForm: SignInFormDto) => Promise<any>
	checkJwtAuthAction: (token: string) => Promise<any>
    checkSubUserAuthAction: (token: string) => Promise<any>
	setTempTokenAction: (token: string) => void
}


export const useAuth = create<State & Actions>((set) => ({
	isLogged: false,
	tempToken: '',
	signUpAction: async (userSignUpForm: UserSignUpFormDto) => {
		return generalAction(
			async () => {
				const response = await signUp(userSignUpForm)
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
			'', // Custom success message
			'Sign-in failed. Please check your credentials and try again.', // Custom error message
		)
	},

	checkJwtAuthAction: async (token: string) => {
		return generalAction(
			async () => {
				const response = await checkAuth(token)
				if(!response.success){
					throw new Error(response.msg)
				}
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
				return response
			},
			'',
			'Authentication failed. Please log in again.', // Custom error message
		)
    },

	setTempTokenAction: (token: string) => set({ tempToken: token }),
}))