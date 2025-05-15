import { formatDate } from "../utils/formatDate";

function PostCard({ post, onClick }) {
    return (
        <div className="post-card">
            <div className="post-header">
                <span className="site-name">{post.site.name}</span>
                <span className="post-date">em {formatDate(post.pubDate)}</span>
            </div>
            <h2 className="post-title">{post.title}</h2>
            <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="post-link"
                onClick={(e) => onClick(post.id, e)}
                onAuxClick={(e) => onClick(post.id, e)}
                onContextMenu={(e) => e.preventDefault()}
            >
                Assistir
            </a>
        </div>
    );
}

export default PostCard;