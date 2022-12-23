export interface CommentModel {
    _id: string;
    description: string;
    profile: {
        name: string;
    };
    likes: string[];
    post: string;
}