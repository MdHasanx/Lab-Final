const fetchALlPosts = async () => {
     let data;

     try{
            const res = await fetch ("http://localhost:5000/getAllPosts");
            data = await res.json();
            console.log(data);
            showPosts(data);
     }
     catch (err){
        console.log("Error fetching data from server");
    }
};

const showPosts = (allPosts) => {
    const postContainer = document.getElementById('post-container');
    postContainer.innerHTML = "";

    allPosts.forEach(async (post) => {
        const postDiv = document.createElement('div');
        postDiv.classList.add('post');

        postDiv.innerHTML = `
        <div class="post-header">
            <div class="post-user-image">
                <img 
                src="${post.postedUserImage}"/>
            </div>

            <div class="post-username-time">
                <p class="post-username">${post.postedUserName}</p>
                <div class="posted-time">
                <span>${post.postedTime}</span>
                <span>hours ago</span>
                </div>
            </div>
        </div>

        <div class="post-text">
            <p class="post-text-content">${post.postText}</p>
        </div>

        <div class="post-image">
            <img src="${post.postImageUrl}"
            />
        </div>
        `;

        postContainer.appendChild(postDiv);

        // comments under a post

        let postComments = await fetchAllCommentsofAPost(post.postId);
        console.log("postComments: ", postComments);

        postComments.forEach((comment) => {
            const commentsHolderDiv = document.createElement('div');
        commentsHolderDiv.classList.add('comments-holder');

        commentsHolderDiv.innerHTML = `
        <div class="comment">
                <div class="comment-user-image">
                    <img src="${comment.connectedUserImage}"
                    />
                </div>

                <div class="comment-text-container">
                    <h4>${comment.commentedUserName}</h4>
                    <p class="comment-text">
                        ${comment.commentText}
                    </p>
                </div>
            </div>
        `;

        postDiv.appendChild(commentsHolderDiv);

        });

        //adding a new comment to the post

        const addNewCommentDiv = document.createElement('div');
        addNewCommentDiv.classList.add("postComment-holder");

        addNewCommentDiv.innerHTML = `
        <div class="post-comment-input-field-holder">
                <input type="text" placeholder="Post your comment" class="postComment-input-field"id="postComment-input-for-postId-${post.postId}"/>
            </div>
            <div class="comment-btn-holder">
                <button onClick=handlePostComment(${post.postId}) id="comment-btn" class="postComment-btn">Comment</button>
            </div>
        `;

        postDiv.appendChild(addNewCommentDiv);
    });
};

const handlePostComment = async (postId) => {
    // collecting logged in user ID from localStorage

    let user = localStorage.getItem("loggedInUser");
    if(user){
        user = JSON.parse(user);
    }
    const commentedUserId = user.userid;

    //getting comment text from input

    const commentedTextElement = document.getElementById(
        `postComment-input-for-postId-${postId}`
    );

    const commentText = commentedTextElement.value;

    // current time of the comment

    let now = new Date();
    
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset()); 

    let timeofComment = now.toISOString();

    const commentObject = {
        commentofPostId : postId,
        commentedUserId : commentedUserId,
        commentText : commentText,
        commentTime : timeofComment,
    };

    try{
        const res = await fetch ('http://localhost:5000/postComment', {
        method: 'POST',
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(commentObject),
        });
        const data = await res.json();
    }
    catch(err){
        console.log("Error while sending data to the server: ", err);
    }
    finally{
        location.reload();
    }
};

const fetchAllCommentsofAPost = async(postId) => {
    let commentsofPost = [];
    try{
        const res = await fetch (`http://localhost:5000/getAllComments/${postId}`);
        commentsofPost = await res.json();
    }
    catch(err){
        console.log("Error fetching comments from the server:", err);
    }
    finally{
        return commentsofPost;
    }
};



fetchALlPosts(); 