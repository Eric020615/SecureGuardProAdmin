export interface CreateNoticeDto {
    title: string
    description: string
    startDate: string
    endDate: string
}

export interface EditNoticeDto {
    noticeGuid: string
    title: string
    description: string
    startDate: string
    endDate: string
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
    status: string
}

export interface GetNoticeDetailsByIdDto {
    noticeId: number
    noticeGuid: string
    title: string
    description: string
    startDate: string
    endDate: string
    status: string
    createdBy: string
    createdDateTime: string
    updatedBy: string
    updatedDateTime: string
}