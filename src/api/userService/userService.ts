import { EditUserDetailsByIdDto, UserInformationFormDto } from '@dtos/user/user.dto'
import { listUrl } from '@api/listUrl'
import { getCookies } from '@libs/cookies'
import { handleApiRequest, IResponse } from '@api/globalHandler'

// Function to create a new user
export const createUser = async (
    IUserInformationDto: UserInformationFormDto,
    tempToken: string
): Promise<IResponse<any>> => {
    const response = await handleApiRequest<any>(
        listUrl.users.create.path,
        listUrl.users.create.type,
        IUserInformationDto,
        tempToken
    )
    return response
}

// Function to get user profile by ID
export const getUserProfileById = async (): Promise<IResponse<any>> => {
    const cookieValue = await getCookies('token')
    const response = await handleApiRequest<any>(
        listUrl.users.getById.path,
        listUrl.users.getById.type,
        {},
        cookieValue as string
    )
    return response
}

// Function to edit user profile by ID
export const editUserProfileById = async (
    IEditUserDetailsByIdDto: EditUserDetailsByIdDto
): Promise<IResponse<any>> => {
    const cookieValue = await getCookies('token')
    const response = await handleApiRequest<any>(
        listUrl.users.update.path,
        listUrl.users.update.type,
        IEditUserDetailsByIdDto,
        cookieValue as string
    )
    return response
}
