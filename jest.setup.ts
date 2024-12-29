import '@testing-library/jest-dom'

jest.mock('query-string', () => ({
    //mock whatever you use from query-string
    parse: jest.fn(),
    stringify: jest.fn(),
}))

// Mock useRouter:
jest.mock('next/navigation', () => ({
    useRouter() {
        return {
            prefetch: () => null,
        }
    },
}))

jest.mock('nextjs-toploader/app', () => ({
    useRouter() {
        
    }
}))