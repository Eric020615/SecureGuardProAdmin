import { getCookies } from '@lib/cookies'
import { handleApiRequest, IResponse } from '../globalHandler'
import { listUrl } from '../listUrl'
import { CreateUpdateVisitorFaceAuthDto, CreateUserFaceAuthDto } from '@dtos/faceAuth/faceAuth.dto'

export const uploadUserFaceAuth = async (
    createUserFaceAuthDto: CreateUserFaceAuthDto
): Promise<IResponse<any>> => {
    const cookieValue = await getCookies('token')
    return handleApiRequest<any>(
        listUrl.faceAuth.upload.path,
        listUrl.faceAuth.upload.type,
        createUserFaceAuthDto,
        cookieValue as string
    )
}

export const uploadVisitorFaceAuth = async (
    createUpdateVisitorFaceAuthDto: CreateUpdateVisitorFaceAuthDto
): Promise<IResponse<any>> => {
    const cookieValue = await getCookies('token')
    return handleApiRequest<any>(
        listUrl.faceAuth.uploadVisitor.path,
        listUrl.faceAuth.uploadVisitor.type,
        createUpdateVisitorFaceAuthDto,
        cookieValue as string
    )
}