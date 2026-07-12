import type { Video } from "../../types.ts";
export const videoObjects: Video[] = [
    {
        id: "video1",
        username: "megaking",
        displayName: "megaking432",
        avatarUrl: "/src/assets/avatars/user1.jpg",
        caption: "Wait for the drop 🔥",
        musicId: "music1",
        musicName: "Superdance - DJ Vibes",
        videoUrl: "/src/assets/videos/video1.mp4",
        isFollowed: false,
        likeAmount: 9876,
        isLiked: true,
        commentAmount: 32,
        bookmarksAmount: 3,
        isBookmarked: true,
        shareAmount: 64
    },
    {
        id: "video2",
        username: "skaterlife",
        displayName: "Jake Skates",
        avatarUrl: "/src/assets/avatars/user2.jpg",
        caption: "Perfect landing 🛹",
        musicId: "music2",
        musicName: "Good 4 U - Olivia Rodrigo",
        videoUrl: "/src/assets/videos/video2.mp4",
        isFollowed: false,
        likeAmount: 4521,
        isLiked: false,
        commentAmount: 89,
        bookmarksAmount: 12,
        isBookmarked: false,
        shareAmount: 156
    },
    {
        id: "video3",
        username: "foodiequeen",
        displayName: "Sarah Eats",
        avatarUrl: "/src/assets/avatars/user3.jpg",
        caption: "Best pasta in town 🍝",
        musicId: "music3",
        musicName: "Levitating - Dua Lipa",
        videoUrl: "/src/assets/videos/video3.mp4",
        isFollowed: true,
        likeAmount: 1203,
        isLiked: false,
        commentAmount: 45,
        bookmarksAmount: 67,
        isBookmarked: true,
        shareAmount: 23
    }
];