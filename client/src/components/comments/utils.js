export default function transformComments(comments) {
    const mapPush = {};
    const result = [];

    comments.forEach(comment => {
        comment.children = [];
        mapPush[comment._id] = comment;
    });

    comments.forEach(comment => {
        if (comment.comment_parentId) {
            mapPush[comment.comment_parentId].children.push(comment);
        } else {
            result.push(comment);
        }
    });

    return result;
}
