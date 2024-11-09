import { create } from 'zustand'
import {
    createNotice,
    deleteNoticeById,
    getNoticeDetailsById,
    getNoticeList,
    updateNoticeById,
} from '@api/noticeManagementService/noticeManagementService'
import { generalAction } from '@store/application/useApplication'
import { IResponse } from '@api/globalHandler'
import {
    CreateNoticeDto,
    DeleteNoticeDto,
    EditNoticeDto,
    GetNoticeDetailsByIdDto,
    GetNoticeDto,
} from '@dtos/notice/notice.dto'
import { PaginationDirection } from '@config/constant'

interface State {
    noticeDetails: GetNoticeDetailsByIdDto
    notices: GetNoticeDto[]
    currentPage: number
    totalNotices: number
    deletedAttachments: string[]
}

interface Actions {
    createNoticeAction: (notice: CreateNoticeDto) => Promise<any>
    getNoticeDetailsByIdAction: (noticeGuid: string) => Promise<any>
    updateNoticeByIdAction: (
        noticeForm: EditNoticeDto,
        noticeGuid: string
    ) => Promise<any>
    deleteNoticeByIdAction: (noticeGuid: string) => Promise<any>
    getNoticeAction: (
        direction: PaginationDirection,
        limit: number
    ) => Promise<IResponse<any>>
    resetNoticeAction: () => void
    deleteAttachmentAction: (attachmentGuid: string) => void
}

export const useNotice = create<State & Actions>((set, get) => ({
    noticeDetails: {} as GetNoticeDetailsByIdDto,
    notices: [],
    currentPage: 0,
    totalNotices: 0,
    deletedAttachments: [],
    getNoticeAction: async (direction: PaginationDirection, limit: number) => {
        return generalAction(
            async () => {
                let response: any
                const { notices, currentPage } = get()
                if (direction === PaginationDirection.Next) {
                    // Pass the last booking ID from the current list for next pagination
                    const lastId =
                        notices.length > 0 ? notices[notices.length - 1].noticeId : 0 // If no history, pass 0 or handle accordingly

                    response = await getNoticeList(direction, lastId, limit)
                    set({ currentPage: currentPage + 1 })
                } else {
                    // Pass the first booking ID from the current list for previous pagination
                    const firstId = notices.length > 0 ? notices[0].noticeId : 0 // If no history, pass 0 or handle accordingly

                    response = await getNoticeList(direction, firstId, limit)
                    set({ currentPage: Math.max(currentPage - 1, 1) })
                }
                if (!response.success) {
                    throw new Error(response.msg)
                }
                set({
                    notices: response.data.list,
                    totalNotices: response.data.count,
                })
                return response
            },
            '',
            'Failed to retrieve notices. Please try again.'
        )
    },
    resetNoticeAction() {
        set({ notices: [], currentPage: 0, totalNotices: 0 })
    },
    createNoticeAction: async (notice: CreateNoticeDto) => {
        return generalAction(
            async () => {
                const response = await createNotice(notice)
                if (!response.success) {
                    throw new Error(response.msg)
                }
                return response
            },
            'Notice successfully created!',
            'Failed to create notice. Please try again.'
        )
    },
    getNoticeDetailsByIdAction: async (noticeGuid: string) => {
        return generalAction(
            async () => {
                const response = await getNoticeDetailsById(noticeGuid)
                set({
                    noticeDetails: response.data
                        ? response.data
                        : ({} as GetNoticeDetailsByIdDto),
                })
                console.log(response)
                if (!response.success) {
                    throw new Error(response.msg)
                }
                return response
            },
            '',
            'Failed to retrieve notice. Please try again.'
        )
    },
    updateNoticeByIdAction: async (noticeForm: EditNoticeDto, noticeGuid: string) => {
        return generalAction(
            async () => {
                const { deletedAttachments } = get()
                noticeForm.deletedAttachments = deletedAttachments
                const response = await updateNoticeById(noticeForm, noticeGuid)
                if (!response.success) {
                    throw new Error(response.msg)
                }
                return response
            },
            'Notice successfully updated!',
            'Failed to update notice. Please try again.'
        )
    },
    deleteNoticeByIdAction: async (noticeGuid: string) => {
        return generalAction(
            async () => {
                const response = await deleteNoticeById(noticeGuid)
                if (!response.success) {
                    throw new Error(response.msg)
                }
                return response
            },
            'Notice successfully deleted!',
            'Failed to delete notice. Please try again.'
        )
    },
    deleteAttachmentAction: (attachmentGuid: string) => {
        const { noticeDetails, deletedAttachments } = get()
        set({
            noticeDetails: {
                ...noticeDetails,
                attachments: noticeDetails.attachments.filter(
                    (attachment) => attachment.fileGuid !== attachmentGuid
                ),
            },
        })
        set({ deletedAttachments: [...deletedAttachments, attachmentGuid] })
    },
}))
