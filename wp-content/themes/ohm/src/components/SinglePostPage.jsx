import React, { useEffect, useState } from 'react';
import { ArrowLeft, Calendar, FolderOpen, Search, User } from 'lucide-react';

export default function SinglePostPage({ slug }) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recentPosts, setRecentPosts] = useState([]);
  const [categories, setCategories] = useState([]);

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

  // Fetch sidebar data
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

  if (loading) {
    return (
      <div className="ohm-blog-loading-container ohm-container">
        <div className="ohm-blog-loading-spinner"></div>
        <p>Loading post details...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <main className="ohm-blog-empty-container ohm-container">
        <h2>Post Not Found</h2>
        <p>We couldn't find the article you are looking for.</p>
        <a href="/blog/" className="ohm-button ohm-button-orange">
          <ArrowLeft size={16} /> Back to Journal
        </a>
      </main>
    );
  }

  const getFeaturedImage = (pObj) => {
    const media = pObj._embedded?.['wp:featuredmedia']?.[0];
    return media?.source_url || '/wp-content/uploads/2026/07/ohm-services-cover.jpg';
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const getCategoryName = (pObj) => {
    const terms = pObj._embedded?.['wp:term']?.[0];
    return terms && terms.length > 0 ? terms[0].name : 'Uncategorized';
  };

  const getAuthorName = (pObj) => {
    const author = pObj._embedded?.['author']?.[0];
    return author ? author.name : 'OHM Core';
  };

  return (
    <main className="ohm-single-post-page">
      {/* Article Hero Area */}
      <section className="ohm-post-hero">
        <div className="ohm-container">
          <a href="/blog/" className="ohm-back-to-blog">
            <ArrowLeft size={16} /> BACK TO JOURNAL
          </a>
          <h1>{post.title.rendered}</h1>
          <div className="ohm-post-hero-meta">
            <span><User size={15} /> By {getAuthorName(post)}</span>
            <span><FolderOpen size={15} /> in {getCategoryName(post)}</span>
            <span><Calendar size={15} /> {formatDate(post.date)}</span>
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <section className="ohm-blog-grid-layout ohm-container">
        <div className="ohm-blog-content-col">
          <article className="ohm-single-post-content">
            {/* Featured Image */}
            <div className="ohm-single-post-featured-image">
              <img src={getFeaturedImage(post)} alt={post.title.rendered} />
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
          {/* Search Widget */}
          <div className="ohm-sidebar-widget">
            <h4 className="widget-title">Search Journal</h4>
            <form action="/blog/" method="GET" className="ohm-sidebar-search-form">
              <input
                type="text"
                name="search"
                placeholder="Search articles..."
              />
              <button type="submit" aria-label="Search"><Search size={18} /></button>
            </form>
          </div>

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
                    <h5>{rPost.title.rendered}</h5>
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
