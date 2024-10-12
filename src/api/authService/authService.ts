import GlobalHandler, { IResponse } from '../globalHandler'
import { listUrl } from '../listUrl'
import { setCookies } from '@lib/cookies'
import { RoleEnum } from '@config/constant/user'
import {
    AuthTokenPayloadDto,
    SignInFormDto,
    SubUserAuthTokenPayloadDto,
    UserSignUpFormDto,
} from '@dtos/auth/auth.dto'

export const signUp = async (ISignUp: UserSignUpFormDto, role: RoleEnum): Promise<any> => {
    try {
        const [success, response] = await GlobalHandler({
            path: listUrl.auth.signUp.path,
            type: listUrl.auth.signUp.type,
            data: ISignUp,
            params: { role: role },
        })
        const result: IResponse<any> = {
            success,
            msg: success ? 'success' : response?.message,
            data: success ? response?.data : undefined,
        }
        return result
    } catch (error: any) {
        const result: IResponse<any> = {
            success: false,
            msg: error,
            data: null,
        }
        return result
    }
}

export const signIn = async (ISignIn: SignInFormDto): Promise<any> => {
    try {
        const [success, response] = await GlobalHandler({
            path: listUrl.auth.logIn.path,
            type: listUrl.auth.logIn.type,
            data: ISignIn,
            params: { role: RoleEnum.SYSTEM_ADMIN },
        })
        const result: IResponse<any> = {
            success,
            msg: success ? 'success' : response?.message,
            data: success ? response?.data : undefined,
        }
        await setCookies('token', response?.data)
        return result
    } catch (error: any) {
        const result: IResponse<any> = {
            success: false,
            msg: error,
            data: null,
        }
        return result
    }
}

export const checkAuth = async (token: string, check: boolean): Promise<IResponse<AuthTokenPayloadDto>> => {
    try {
        const [success, response] = await GlobalHandler({
            path: listUrl.auth.checkJwtAuth.path,
            type: listUrl.auth.checkJwtAuth.type,
            _token: token,
            data: { check: check },
        })
        const result: IResponse<any> = {
            success,
            msg: success ? 'success' : response?.message,
            data: success ? response?.data : undefined,
        }
        return result
    } catch (error: any) {
        const result: IResponse<any> = {
            success: false,
            msg: error,
            data: null,
        }
        return result
    }
}

export const checkSubUserAuth = async (
    token: string
): Promise<IResponse<SubUserAuthTokenPayloadDto>> => {
    try {
        const [success, response] = await GlobalHandler({
            path: listUrl.auth.checkSubUserAuth.path,
            type: listUrl.auth.checkSubUserAuth.type,
            _token: token,
        })
        const result: IResponse<SubUserAuthTokenPayloadDto> = {
            success,
            msg: success ? 'success' : response?.message,
            data: success ? response?.data : undefined,
        }
        return result
    } catch (error: any) {
        const result: IResponse<any> = {
            success: false,
            msg: error,
            data: null,
        }
        return result
    }
}

export const signUpSubUser = async (ISignUp: UserSignUpFormDto): Promise<any> => {
    try {
        const [success, response] = await GlobalHandler({
            path: listUrl.auth.signUp.path,
            type: listUrl.auth.signUp.type,
            data: ISignUp,
            params: { role: RoleEnum.RESIDENT_SUBUSER },
        })
        const result: IResponse<any> = {
            success,
            msg: success ? 'success' : response?.message,
            data: success ? response?.data : undefined,
        }
        return result
    } catch (error: any) {
        const result: IResponse<any> = {
            success: false,
            msg: error,
            data: null,
        }
        return result
    }
}