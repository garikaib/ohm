import React, { useEffect, useState } from 'react';
import { ArrowRight, Calendar, FolderOpen, Search, User } from 'lucide-react';

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [activeSearch, setActiveSearch] = useState('');

  // Fetch posts based on filters
  useEffect(() => {
    setLoading(true);
    let url = `/wp-json/wp/v2/posts?_embed&per_page=8`;
    if (selectedCategory) {
      url += `&categories=${selectedCategory}`;
    }
    if (activeSearch) {
      url += `&search=${encodeURIComponent(activeSearch)}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setPosts(data);
        } else {
          setPosts([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching posts:', err);
        setPosts([]);
        setLoading(false);
      });
  }, [selectedCategory, activeSearch]);

  // Fetch sidebar data on mount
  useEffect(() => {
    document.title = 'Journal & Insights | Ohm Core Engineering';
    // Categories
    fetch('/wp-json/wp/v2/categories?hide_empty=true')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setCategories(data);
      })
      .catch((err) => console.error(err));

    // Recent Posts (limit 5)
    fetch('/wp-json/wp/v2/posts?_embed&per_page=5')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setRecentPosts(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setActiveSearch(searchQuery);
  };

  const getFeaturedImage = (post) => {
    const media = post._embedded?.['wp:featuredmedia']?.[0];
    return media?.source_url || '/wp-content/uploads/2026/07/ohm-services-cover.jpg';
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return {
      day: date.getDate(),
      month: months[date.getMonth()],
      year: date.getFullYear()
    };
  };

  const getCategoryName = (post) => {
    const terms = post._embedded?.['wp:term']?.[0];
    return terms && terms.length > 0 ? terms[0].name : 'Uncategorized';
  };

  const getAuthorName = (post) => {
    const author = post._embedded?.['author']?.[0];
    return author ? author.name : 'OHM Core';
  };

  return (
    <main className="ohm-blog-page">
      {/* Blog Hero Banner */}
      <section className="ohm-blog-hero">
        <div className="ohm-container">
          <p className="ohm-kicker">OHM JOURNAL & INSIGHTS</p>
          <h1>Engineering insights<br /><span>& innovation updates.</span></h1>
          <p>Read about Level of Development (LOD) standards, decarbonization trends, structural resiliency, and civil infrastructure solutions.</p>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="ohm-blog-grid-layout ohm-container">
        <div className="ohm-blog-content-col">
          {loading ? (
            <div className="ohm-blog-loading">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="ohm-blog-skeleton-card">
                  <div className="skeleton-image"></div>
                  <div className="skeleton-line title"></div>
                  <div className="skeleton-line meta"></div>
                  <div className="skeleton-line text"></div>
                </div>
              ))}
            </div>
          ) : posts.length === 0 ? (
            <div className="ohm-blog-empty">
              <h3>No posts found</h3>
              <p>Try clearing your search query or choosing another category filter.</p>
              {(selectedCategory || activeSearch) && (
                <button
                  className="ohm-button ohm-button-orange"
                  onClick={() => {
                    setSelectedCategory(null);
                    setActiveSearch('');
                    setSearchQuery('');
                  }}
                >
                  Clear Filters
                </button>
              )}
            </div>
          ) : (
            <div className="ohm-blog-posts-holder">
              {posts.map((post) => {
                const dateObj = formatDate(post.date);
                return (
                  <article key={post.id} className="ohm-blog-card">
                    <div className="ohm-blog-card-image">
                      <a href={`/${post.slug}/`}>
                        <img src={getFeaturedImage(post)} alt={post.title.rendered} loading="lazy" />
                      </a>
                    </div>
                    <div className="ohm-blog-card-text">
                      <div className="ohm-blog-card-header">
                        <div className="ohm-blog-date-badge">
                          <strong>{dateObj.day}</strong>
                          <span>{dateObj.month}</span>
                        </div>
                        <h2 className="ohm-blog-card-title">
                          <a href={`/${post.slug}/`}>{post.title.rendered}</a>
                        </h2>
                      </div>
                      <div className="ohm-blog-card-meta">
                        <span><User size={15} /> {getAuthorName(post)}</span>
                        <span><FolderOpen size={15} /> {getCategoryName(post)}</span>
                        <span><Calendar size={15} /> {dateObj.day} {dateObj.month} {dateObj.year}</span>
                      </div>
                      <p
                        className="ohm-blog-card-excerpt"
                        dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                      />
                      <div className="ohm-blog-card-more">
                        <a href={`/${post.slug}/`} className="ohm-button ohm-button-orange">
                          Read More <ArrowRight size={17} />
                        </a>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>

        {/* Sidebar Column */}
        <aside className="ohm-blog-sidebar-col">
          {/* Search Widget */}
          <div className="ohm-sidebar-widget">
            <h4 className="widget-title">Search Journal</h4>
            <form onSubmit={handleSearchSubmit} className="ohm-sidebar-search-form">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" aria-label="Search"><Search size={18} /></button>
            </form>
          </div>

          {/* Categories Widget */}
          <div className="ohm-sidebar-widget">
            <h4 className="widget-title">Categories</h4>
            <ul className="ohm-sidebar-categories">
              <li>
                <button
                  className={selectedCategory === null ? 'is-active' : ''}
                  onClick={() => setSelectedCategory(null)}
                >
                  All Categories
                </button>
              </li>
              {categories.map((cat) => (
                <li key={cat.id}>
                  <button
                    className={selectedCategory === cat.id ? 'is-active' : ''}
                    onClick={() => setSelectedCategory(cat.id)}
                  >
                    {cat.name} <span>({cat.count})</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Recent Posts Widget */}
          <div className="ohm-sidebar-widget">
            <h4 className="widget-title">Recent Articles</h4>
            <div className="ohm-sidebar-recent-posts">
              {recentPosts.map((rPost) => (
                <a key={rPost.id} href={`/${rPost.slug}/`} className="recent-post-item">
                  <img src={getFeaturedImage(rPost)} alt="" />
                  <div className="recent-post-info">
                    <h5>{rPost.title.rendered}</h5>
                    <span>{formatDate(rPost.date).day} {formatDate(rPost.date).month} {formatDate(rPost.date).year}</span>
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
