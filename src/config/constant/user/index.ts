export enum GenderEnum {
    MALE = 'M',
    FEMALE = 'F',
}

export enum GenderDescriptionEnum {
    M = "Male",
    F = 'Female',
}

export enum RoleEnum {
    SYSTEM_ADMIN = 'SA',
    RESIDENT = 'RES',
    RESIDENT_SUBUSER = 'SUB',
    STAFF = 'STF',
}

export enum RoleDescriptionEnum {
    RES = 'Resident',
    SUB = 'Resident Sub User',
    SA = 'System Admin',
    STF = 'Staff',
}

export const GenderConst = {
    M: 'Male',
    F: 'Female',
}

export const userInformationConst = {
    firstName: '',
    lastName: '',
    userName: '',
    staffId: '',
    phoneNumber: '',
    gender: '',
    dateOfBirth: '',
    files: [],
}
