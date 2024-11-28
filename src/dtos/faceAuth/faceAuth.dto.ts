import { GeneralFileDto } from "@dtos/application/application.dto"
import { GetVisitorDetailsByTokenDto } from "@dtos/visitor/visitor.dto"

export interface CreateUserFaceAuthDto {
	faceData: GeneralFileDto
}

export interface CreateUpdateVisitorFaceAuthDto {
	visitorDetails: GetVisitorDetailsByTokenDto
	faceData: GeneralFileDto
}