import React, { useEffect, useState } from 'react';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  FolderOpen, 
  Share2, 
  Check, 
  ChevronRight, 
  User, 
  Bookmark, 
  ThumbsUp, 
  MessageSquare,
  Sparkles
} from 'lucide-react';

export default function SinglePostPage({ slug }) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recentPosts, setRecentPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [copied, setCopied] = useState(false);
  const [likes, setLikes] = useState(24);
  const [hasLiked, setHasLiked] = useState(false);
  const [readProgress, setReadProgress] = useState(0);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Reading progress listener
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setReadProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch single post details
  useEffect(() => {
    setLoading(true);
    fetch(`/wp-json/wp/v2/posts?slug=${slug}&_embed`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setPost(data[0]);
          document.title = `${data[0].title.rendered} | Ohm Core Engineering`;
        } else {
          setPost(null);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching single post:', err);
        setPost(null);
        setLoading(false);
      });
  }, [slug]);

  // Fetch sidebar & recent posts
  useEffect(() => {
    fetch('/wp-json/wp/v2/posts?_embed&per_page=5')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setRecentPosts(data);
      })
      .catch((err) => console.error(err));

    fetch('/wp-json/wp/v2/categories?hide_empty=true')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setCategories(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const getFeaturedImage = (pObj) => {
    const media = pObj?._embedded?.['wp:featuredmedia']?.[0];
    return media?.source_url || '/wp-content/uploads/2026/07/ohm-services-cover.jpg';
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const getCategoryName = (pObj) => {
    const terms = pObj?._embedded?.['wp:term']?.[0];
    return terms && terms.length > 0 ? terms[0].name : 'Engineering';
  };

  const getAuthorName = (pObj) => {
    const author = pObj?._embedded?.['author']?.[0];
    return author ? author.name : 'OHM Core';
  };

  const calculateReadTime = (pObj) => {
    const text = pObj?.content?.rendered || '';
    const words = text.replace(/<[^>]+>/g, '').split(/\s+/).length;
    const minutes = Math.ceil(words / 180);
    return `${minutes || 4} min read`;
  };

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.share && isMobile) {
      navigator.share({
        title: post?.title?.rendered,
        url: url
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleLike = () => {
    if (!hasLiked) {
      setLikes(prev => prev + 1);
      setHasLiked(true);
    }
  };

  if (loading) {
    return (
      <div className="ohm-single-loading-wrap">
        <div className="ohm-single-spinner" />
        <p>Opening article...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <main className="ohm-single-empty-wrap">
        <h2>Article Not Found</h2>
        <p>The requested publication could not be located in our engineering journal archives.</p>
        <a href="/blog/" className="ohm-button ohm-button-orange">
          <ArrowLeft size={16} /> Back to Journal
        </a>
      </main>
    );
  }

  const category = getCategoryName(post);
  const author = getAuthorName(post);
  const readTime = calculateReadTime(post);
  const featImg = getFeaturedImage(post);

  // =========================================================================
  // 📱 MOBILE SINGLE POST VIEW: Medium / Substack Architectural Reading Experience
  // =========================================================================
  if (isMobile) {
    return (
      <main className="ohm-m-single-article-view">
        {/* Top Reading Progress Bar */}
        <div className="ohm-m-read-progress-bar" style={{ width: `${readProgress}%` }} />

        {/* Mobile Sticky Article Nav */}
        <div className="ohm-m-single-sticky-header">
          <a href="/blog/" className="ohm-m-single-back">
            <ArrowLeft size={18} />
          </a>
          <span className="ohm-m-single-header-title">{post.title.rendered}</span>
          <button className="ohm-m-single-share-icon" onClick={handleShare} aria-label="Share article">
            {copied ? <Check size={18} color="#ff5e14" /> : <Share2 size={18} />}
          </button>
        </div>

        {/* Mobile Article Header Container */}
        <header className="ohm-m-article-header">
          <div className="ohm-m-article-category-chip">{category}</div>
          <h1 className="ohm-m-article-title" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
          
          <div className="ohm-m-author-card">
            <div className="ohm-m-author-avatar">
              {(author || 'O').charAt(0).toUpperCase()}
            </div>
            <div className="ohm-m-author-meta">
              <strong>{author || 'OHM Core'}</strong>
              <div className="ohm-m-article-sub-meta">
                <span>{formatDate(post.date)}</span>
                <span>•</span>
                <span><Clock size={13} /> {readTime}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Mobile Featured Image Container */}
        <div className="ohm-m-article-hero-media">
          <img src={featImg} alt={post.title.rendered} loading="eager" />
        </div>

        {/* Mobile Main Body Content */}
        <article className="ohm-m-article-body">
          <div 
            className="ohm-post-entry-content"
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          />

          {/* Article Engagement Toolbar */}
          <div className="ohm-m-engagement-bar">
            <button className={`ohm-m-like-btn ${hasLiked ? 'is-liked' : ''}`} onClick={handleLike}>
              <ThumbsUp size={18} /> <span>{likes}</span>
            </button>
            <button className="ohm-m-share-action-btn" onClick={handleShare}>
              {copied ? <Check size={18} /> : <Share2 size={18} />}
              <span>{copied ? 'Link Copied' : 'Share'}</span>
            </button>
          </div>
        </article>

        {/* Mobile Related Articles Carousel */}
        {recentPosts.length > 0 && (
          <section className="ohm-m-related-section">
            <h3>More Engineering Insights</h3>
            <div className="ohm-m-related-grid">
              {recentPosts.filter(r => r.id !== post.id).slice(0, 3).map(rPost => (
                <a key={rPost.id} href={`/${rPost.slug}/`} className="ohm-m-related-card">
                  <img src={getFeaturedImage(rPost)} alt="" />
                  <div className="ohm-m-related-info">
                    <span className="ohm-m-related-cat">{getCategoryName(rPost)}</span>
                    <h4 dangerouslySetInnerHTML={{ __html: rPost.title.rendered }} />
                    <span className="ohm-m-related-date">{formatDate(rPost.date)}</span>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}
      </main>
    );
  }

  // =========================================================================
  // 💻 DESKTOP VIEW: Premium Desktop Single Article Experience
  // =========================================================================
  return (
    <main className="ohm-single-post-page">
      {/* Article Hero Area */}
      <section className="ohm-post-hero">
        <div className="ohm-container">
          <a href="/blog/" className="ohm-back-to-blog">
            <ArrowLeft size={16} /> BACK TO JOURNAL
          </a>
          <h1 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
          <div className="ohm-post-hero-meta">
            <span><User size={15} /> By {author}</span>
            <span><FolderOpen size={15} /> in {category}</span>
            <span><Calendar size={15} /> {formatDate(post.date)}</span>
            <span><Clock size={15} /> {readTime}</span>
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <section className="ohm-blog-grid-layout ohm-container">
        <div className="ohm-blog-content-col">
          <article className="ohm-single-post-content">
            {/* Featured Image */}
            <div className="ohm-single-post-featured-image">
              <img src={featImg} alt={post.title.rendered} />
            </div>

            {/* Post HTML Body */}
            <div 
              className="ohm-post-entry-content"
              dangerouslySetInnerHTML={{ __html: post.content.rendered }}
            />
          </article>
        </div>

        {/* Sidebar Column */}
        <aside className="ohm-blog-sidebar-col">
          {/* Categories Widget */}
          <div className="ohm-sidebar-widget">
            <h4 className="widget-title">Categories</h4>
            <ul className="ohm-sidebar-categories">
              <li>
                <a href="/blog/">All Categories</a>
              </li>
              {categories.map((cat) => (
                <li key={cat.id}>
                  <a href="/blog/">
                    {cat.name} <span>({cat.count})</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Recent Posts Widget */}
          <div className="ohm-sidebar-widget">
            <h4 className="widget-title">Recent Articles</h4>
            <div className="ohm-sidebar-recent-posts">
              {recentPosts.filter(r => r.id !== post.id).slice(0, 4).map((rPost) => (
                <a key={rPost.id} href={`/${rPost.slug}/`} className="recent-post-item">
                  <img src={getFeaturedImage(rPost)} alt="" />
                  <div className="recent-post-info">
                    <h5 dangerouslySetInnerHTML={{ __html: rPost.title.rendered }} />
                    <span>{formatDate(rPost.date)}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}
