import { DocumentStatusDescriptionEnum } from "@config/constant"
import { VisitorCategoryDescriptionEnum } from "@config/constant/visitor"

export interface CreateVisitorDto {
    visitorName: string
    visitorEmail: string
    visitorCategory: keyof typeof VisitorCategoryDescriptionEnum
    visitorContactNumber: string
    visitDateTime: string
}

export interface EditVisitorByIdDto {
    visitorName: string
    visitorEmail: string
    visitorCategory: keyof typeof VisitorCategoryDescriptionEnum
    visitorContactNumber: string
    visitDateTime: string
}

export interface GetVisitorDto {
    visitorId: number
    visitorGuid: string
    visitorName: string
    visitorEmail: string
    visitorCategory: keyof typeof VisitorCategoryDescriptionEnum
    visitorContactNumber: string
    visitDateTime: string
    status: keyof typeof DocumentStatusDescriptionEnum
}

export interface GetVisitorDetailsDto {
    visitorId: number
    visitorGuid: string
    visitorName: string
    visitorEmail: string
    visitorCategory: keyof typeof VisitorCategoryDescriptionEnum
    visitorContactNumber: string
    visitDateTime: string
    status: keyof typeof DocumentStatusDescriptionEnum
    createdBy: string
    updatedBy: string
    createdDateTime: string
    updatedDateTime: string
}

export interface GetVisitorByDateDto {
    date: string
    count: number
}

export interface GetQrCodeByVisitorDto {
    badgeNumber: string
    data: string
}

export interface GetVisitorPassDetailsDto {
    visitorId: number
    visitorGuid: string
    visitorName: string
    visitorEmail: string
    visitorCategory: keyof typeof VisitorCategoryDescriptionEnum
    visitorContactNumber: string
    visitDateTime: string
}

export interface GetVisitorDetailsByTokenDto {
	visitorId: number
	visitorGuid: string
	visitorName: string
	visitorEmail: string
    visitorCategory: keyof typeof VisitorCategoryDescriptionEnum
	visitorContactNumber: string
	visitDateTime: string
}
