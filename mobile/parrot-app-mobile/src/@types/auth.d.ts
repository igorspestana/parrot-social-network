export interface Auth {
    user: string
    name?: string
    password: string
}

export interface UserToken {
    user: string
    profile: string
}