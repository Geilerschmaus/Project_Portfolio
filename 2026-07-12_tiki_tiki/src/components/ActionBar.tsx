import type { Video } from "../types.ts";

interface VideoInfo {

    video: Video
}

function ActionBar({video}: VideoInfo){



    return(
        <div>

            <button type="button"></button>
            <p>{video.likeAmount}</p>
            <button type="button"></button>
            <p>{video.bookmarksAmount}</p>
            <button type="button"></button>
            <p>{video.shareAmount}</p>
        </div>
    )

}

export default ActionBar;