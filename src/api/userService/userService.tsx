import { EditUserDetailsByIdDto, UserInformationFormDto } from '@dtos/user/user.dto'
import { listUrl } from '../listUrl'
import { getCookies } from '@lib/cookies'
import { handleApiRequest, IResponse } from '@api/globalHandler'

// Function to create a new user
export const createUser = async (
    IUserInformationDto: UserInformationFormDto,
    tempToken: string
): Promise<IResponse<any>> => {
    try {
        const response = await handleApiRequest<any>(
            listUrl.users.create.path,
            listUrl.users.create.type,
            IUserInformationDto,
            tempToken
        )
        return response
    } catch (error) {
        return {
            success: false,
            msg: error instanceof Error ? error.message : String(error),
            data: null,
        }
    }
}

// Function to get user profile by ID
export const getUserProfileById = async (): Promise<IResponse<any>> => {
    try {
        const cookieValue = await getCookies('token')
        const response = await handleApiRequest<any>(
            listUrl.users.getById.path,
            listUrl.users.getById.type,
            {},
            cookieValue as string
        )
        return response
    } catch (error) {
        return {
            success: false,
            msg: error instanceof Error ? error.message : String(error),
            data: null,
        }
    }
}

// Function to edit user profile by ID
export const editUserProfileById = async (
    IEditUserDetailsByIdDto: EditUserDetailsByIdDto
): Promise<IResponse<any>> => {
    try {
        const cookieValue = await getCookies('token')
        const response = await handleApiRequest<any>(
            listUrl.users.update.path,
            listUrl.users.update.type,
            IEditUserDetailsByIdDto,
            cookieValue as string
        )
        return response
    } catch (error) {
        return {
            success: false,
            msg: error instanceof Error ? error.message : String(error),
            data: null,
        }
    }
}
