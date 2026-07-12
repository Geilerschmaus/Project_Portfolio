import type { Video } from "../types.ts"

interface VideoInfo {
    video: Video
}

function VideoInfo({video}: VideoInfo) {

    return(
        <div>

            <p>{video.username}</p>
            <p>{video.caption}</p>
            <p>{video.musicName}</p>
        </div>
        
        
    )
}

export default VideoInfo