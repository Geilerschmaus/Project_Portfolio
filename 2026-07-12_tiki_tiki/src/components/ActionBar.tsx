import type { Video } from "../types.ts";
import {Heart,Bookmark,Share2,MessageCircle,PlusCircleIcon} from 'lucide-react'

interface ActionBarProps {

    video: Video
    onLike: (videoId: string) => void;
    onBookmark: (videoId: string) => void;
    onFollow: (username: string) => void;
}

function ActionBar({video, onLike, onBookmark, onFollow}: ActionBarProps){



    return(
        <div>

            <div>
                <img src={video.avatarUrl} alt="Profile-Picture" />
                <button type="button" className="follow-button" onClick={() => onFollow(video.username)}>
                    <PlusCircleIcon size={10} color="black" fill=""></PlusCircleIcon>
                </button>
            </div>

            <div>

                <button type="button" className="clean-actionBar-button" onClick={() => {onLike(video.id)}}>

                <Heart size={28} color="black" fill={video.isLiked ? "red" : "white"}></Heart>
                </button>

                <p>{video.likeAmount}</p>
            </div>

            <div>

                <button type="button" className="clean-actionBar-button" onClick={() => {onBookmark(video.id)}}>

                <Bookmark size={28} color="black" fill={video.isBookmarked ? "yellow" : "white"}></Bookmark>
                </button>
                <p>{video.bookmarksAmount}</p>
            </div>

            <div>

                <MessageCircle size={28} color="black" fill="white"></MessageCircle>
                <p>{video.shareAmount}</p>
            </div>

            <div>

                <Share2 size={28} color="black" fill="white"></Share2>
                <p>{video.shareAmount}</p>
            </div>

        </div>
    )

}

export default ActionBar;