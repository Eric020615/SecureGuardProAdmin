import { DocumentStatusDescriptionEnum } from "@config/constant"
import { GeneralFileDto, GeneralFileResponseDto } from "@dtos/application/application.dto"

export interface CreateNoticeDto {
    title: string
    description: string
    startDate: string
    endDate: string
    attachments: GeneralFileDto[]
}

export interface EditNoticeDto {
    title: string
    description: string
    startDate: string
    endDate: string
    deletedAttachments?: string[]
	newAttachments?: GeneralFileDto[]
}

export interface DeleteNoticeDto {
    noticeGuid: string
}

export interface GetNoticeDto {
    noticeId: number
    noticeGuid: string
    title: string
    description: string
    startDate: string
    endDate: string
    status: keyof typeof DocumentStatusDescriptionEnum
}

export interface GetNoticeDetailsByIdDto {
    noticeId: number
    noticeGuid: string
    title: string
    description: string
    startDate: string
    endDate: string
    status: keyof typeof DocumentStatusDescriptionEnum
    attachments: GeneralFileResponseDto[]
    createdBy: string
    createdDateTime: string
    updatedBy: string
    updatedDateTime: string
}