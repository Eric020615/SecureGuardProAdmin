import { getCookies } from '@libs/cookies'
import { handleApiRequest, IResponse } from '@api/globalHandler'
import { listUrl } from '@api/listUrl'
import {
    CreateUpdateVisitorFaceAuthDto,
    CreateUserFaceAuthDto,
    GetCardByUserDto,
} from '@dtos/card/card.dto'

// Create User Card
export const createUserCard = async (): Promise<IResponse<any>> => {
    const cookieValue = await getCookies('token')
    return handleApiRequest<any>(
        listUrl.cards.createCards.path,
        listUrl.cards.createCards.type,
        undefined,
        cookieValue as string
    )
}

// Get User Card
export const getUserCard = async (): Promise<IResponse<GetCardByUserDto>> => {
    const cookieValue = await getCookies('token')
    return handleApiRequest<GetCardByUserDto>(
        listUrl.cards.getCards.path,
        listUrl.cards.getCards.type,
        undefined,
        cookieValue as string
    )
}

export const uploadUserFaceAuth = async (
    createUserFaceAuthDto: CreateUserFaceAuthDto
): Promise<IResponse<any>> => {
    const cookieValue = await getCookies('token')
    return handleApiRequest<any>(
        listUrl.cards.upload.path,
        listUrl.cards.upload.type,
        createUserFaceAuthDto,
        cookieValue as string
    )
}

export const uploadVisitorFaceAuth = async (
    createUpdateVisitorFaceAuthDto: CreateUpdateVisitorFaceAuthDto
): Promise<IResponse<any>> => {
    const cookieValue = await getCookies('token')
    return handleApiRequest<any>(
        listUrl.cards.uploadVisitor.path,
        listUrl.cards.uploadVisitor.type,
        createUpdateVisitorFaceAuthDto,
        cookieValue as string
    )
}
