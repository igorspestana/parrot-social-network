export interface UserModel {
    _id: string,
    user: string,
    password: string,
    profile: {
        name: string
        image: boolean,
        imageUrl: string,
    },
}