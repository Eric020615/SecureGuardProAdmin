import { getCookies } from '@lib/cookies'
import { handleApiRequest, IResponse } from '../globalHandler'
import { listUrl } from '../listUrl'
import { CreateUserFaceAuthDto } from '@dtos/faceAuth/faceAuth.dto'

export const uploadUserFaceAuth = async (
    createUserFaceAuthDto: CreateUserFaceAuthDto
): Promise<IResponse<any>> => {
    const cookieValue = await getCookies('token')
    return handleApiRequest<any>(
        listUrl.noticeManagement.create.path,
        listUrl.noticeManagement.create.type,
        createUserFaceAuthDto,
        cookieValue as string
    )
}
