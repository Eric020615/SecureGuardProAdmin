import moment from 'moment-timezone'

// Convert a DateTimeOffset string to a Date object
export const convertDateStringToDate = (dateString: string) => {
    if (!dateString) return null
    return moment.parseZone(dateString).toDate()
}

// Convert a Date object to a formatted DateTimeOffset string
export const convertDateToDateString = (date: Date, dateFormat: string) => {
    if (!date) return ''
    return moment(date).format(dateFormat)
}

// Convert a DateTimeOffset string to a formatted DateTimeOffset string
export const convertDateStringToFormattedString = (
    dateString: string,
    dateFormat: string
) => {
    if (!dateString) return ''
    return moment(dateString).format(dateFormat)
}

// Get the current date as a Date object
export const getCurrentDate = () => {
    return new Date()
}

// Get the current date as a formatted DateTimeOffset string
export const getCurrentDateString = (dateFormat: string) => {
    return moment().format(dateFormat)
}

// Get a formatted DateTimeOffset string from a Date object
export const getFormattedDateStringFromDate = (date: Date, dateFormat: string) => {
    if (!date) return ''
    return moment(date).format(dateFormat)
}

// Get relative time from now for a given date
export const getRelativeTimeFromNow = (date: Date) => {
    if (!date) return ''
    return moment(date).fromNow()
}

export const initializeDateAtBoundary = (
    date: Date,
    boundary: 'start' | 'end' = 'start'
): Date => {
    // Initialize date to the start or end of the day based on the boundary parameter
    return boundary === 'start'
        ? moment(date).startOf('day').toDate()
        : moment(date).endOf('day').toDate()
}
