import { handleApiRequest, IResponse } from '../globalHandler'
import { listUrl } from '../listUrl'
import { getCookies, setCookies } from '@lib/cookies'
import { RoleEnum } from '@config/constant/user'
import {
    AuthTokenPayloadDto,
    RequestResetPasswordDto,
    ResetPasswordDto,
    SignInFormDto,
    SubUserAuthTokenPayloadDto,
    UserSignUpFormDto,
} from '@dtos/auth/auth.dto'

// Sign up a new user
export const signUp = async (
    ISignUp: UserSignUpFormDto,
    role: RoleEnum
): Promise<IResponse<any>> => {
    return handleApiRequest<any>(
        listUrl.auth.signUp.path,
        listUrl.auth.signUp.type,
        ISignUp,
        undefined,
        { role }
    )
}

// Sign in an existing user
export const signIn = async (ISignIn: SignInFormDto): Promise<IResponse<any>> => {
    const response = await handleApiRequest<any>(
        listUrl.auth.logIn.path,
        listUrl.auth.logIn.type,
        ISignIn
    )

    if (response.success) {
        await setCookies('token', response.data)
    }

    return response
}

// forgot password
export const forgotPassword = async (
    requestResetPasswordDto: RequestResetPasswordDto
): Promise<IResponse<any>> => {
    return handleApiRequest<any>(
        listUrl.auth.requestPasswordReset.path,
        listUrl.auth.requestPasswordReset.type,
        requestResetPasswordDto
    )
}

// Reset password
export const resetPassword = async (
    resetPasswordDto: ResetPasswordDto
): Promise<IResponse<any>> => {
    const cookieValue = await getCookies('token')
    return handleApiRequest<any>(
        listUrl.auth.resetPassword.path,
        listUrl.auth.resetPassword.type,
        resetPasswordDto,
        cookieValue as string
    )
}

// Check authentication
export const checkAuth = async (
    token: string,
    check: boolean
): Promise<IResponse<AuthTokenPayloadDto>> => {
    const response = await handleApiRequest<AuthTokenPayloadDto>(
        listUrl.auth.checkAuth.path,
        listUrl.auth.checkAuth.type,
        undefined,
        token,
    )
    return response
}

// Check sub-user authentication
export const checkSubUserAuth = async (
    token: string
): Promise<IResponse<SubUserAuthTokenPayloadDto>> => {
    return handleApiRequest<SubUserAuthTokenPayloadDto>(
        listUrl.auth.checkSubUserAuth.path,
        listUrl.auth.checkSubUserAuth.type,
        {},
        token
    )
}

// Sign up a sub-user
export const signUpSubUser = async (
    ISignUp: UserSignUpFormDto
): Promise<IResponse<any>> => {
    return handleApiRequest<any>(
        listUrl.auth.signUp.path,
        listUrl.auth.signUp.type,
        ISignUp,
        undefined,
        { role: RoleEnum.RESIDENT_SUBUSER }
    )
}
