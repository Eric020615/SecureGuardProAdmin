import { GeneralFileDto } from '@dtos/application/application.dto'
import { GetVisitorDetailsByTokenDto } from '@dtos/visitor/visitor.dto'

export interface CreateUserFaceAuthDto {
    faceData: GeneralFileDto
}

export interface CreateUpdateVisitorFaceAuthDto {
    visitorGuid: string
    faceData: GeneralFileDto
}

export interface GetQrCodeByUserDto {
    badgeNumber: string
    data: string
}

export interface GetCardByUserDto {
    badgeNumber: string
    cardHolder: string
}
