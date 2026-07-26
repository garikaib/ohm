import React, { useEffect, useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Calendar, 
  FolderOpen, 
  Search, 
  User, 
  Clock, 
  Grid, 
  List, 
  Sparkles, 
  ChevronRight, 
  BookOpen, 
  Filter, 
  X, 
  Share2, 
  Check 
} from 'lucide-react';

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [activeSearch, setActiveSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  // Mobile detection
  const [isMobile, setIsMobile] = useState(false);
  // Mobile UI States
  const [activeFilterTab, setActiveFilterTab] = useState(null);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Fetch posts based on filters
  useEffect(() => {
    setLoading(true);
    let url = `/wp-json/wp/v2/posts?_embed&per_page=6&page=${currentPage}`;
    if (selectedCategory) {
      url += `&categories=${selectedCategory}`;
    }
    if (activeSearch) {
      url += `&search=${encodeURIComponent(activeSearch)}`;
    }

    fetch(url)
      .then((res) => {
        const pages = Number(res.headers.get('X-WP-TotalPages')) || 1;
        setTotalPages(pages);
        return res.json();
      })
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
  }, [selectedCategory, activeSearch, currentPage]);

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
    setCurrentPage(1);
    setActiveSearch(searchQuery);
    setShowSearchModal(false);
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
    return terms && terms.length > 0 ? terms[0].name : 'Engineering';
  };

  const getAuthorName = (post) => {
    const author = post._embedded?.['author']?.[0];
    return author ? author.name : 'OHM Core';
  };

  const calculateReadTime = (post) => {
    const text = post.content?.rendered || post.excerpt?.rendered || '';
    const words = text.replace(/<[^>]+>/g, '').split(/\s+/).length;
    const minutes = Math.ceil(words / 180);
    return `${minutes || 3} min read`;
  };

  const handleShare = (e, post) => {
    e.preventDefault();
    e.stopPropagation();
    const url = `${window.location.origin}/${post.slug}/`;
    if (navigator.share) {
      navigator.share({
        title: post.title.rendered,
        url: url
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url);
      setCopiedId(post.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const blogHeroImg = window.ohmThemeData?.pageHeaderImages?.['blog'] || window.ohmThemeData?.currentHeaderImage;

  // =========================================================================
  // 📱 MOBILE VIEW: Premium WordPress Grid Plugin ("The Grid") Style Layout
  // =========================================================================
  if (isMobile) {
    const featuredPost = posts.length > 0 ? posts[0] : null;
    const gridPosts = posts.length > 0 ? posts : [];

    return (
      <main className="ohm-blog-page-mobile">
        <header className="ohm-m-editorial-header">
          <div className="ohm-m-header-content">
            <span className="ohm-m-header-sub">Ohm Core Engineering</span>
            <h1>Insights & Journal</h1>
            <p>Thought leadership at the intersection of engineering and innovation.</p>
          </div>
        </header>

        {/* Mobile Grid Controls & Horizontal Filter Bar */}
        <div className="ohm-m-controls-sticky">
          <div className="ohm-m-filter-bar">
            <button 
              className={`ohm-m-filter-chip ${selectedCategory === null && !activeSearch ? 'is-active' : ''}`}
              onClick={() => { setSelectedCategory(null); setActiveSearch(''); setSearchQuery(''); setCurrentPage(1); }}
            >
              All Articles
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`ohm-m-filter-chip ${selectedCategory === cat.id ? 'is-active' : ''}`}
                onClick={() => { setSelectedCategory(cat.id); setActiveSearch(''); setCurrentPage(1); }}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="ohm-m-search-trigger-bar">
            <button className="ohm-m-search-btn" onClick={() => setShowSearchModal(true)}>
              <Search size={16} />
              <span>{activeSearch ? `Search: "${activeSearch}"` : 'Search insights & topics...'}</span>
            </button>
            {activeSearch && (
              <button className="ohm-m-clear-search" onClick={() => { setActiveSearch(''); setSearchQuery(''); }}>
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Mobile Grid Layout Container */}
        <div className="ohm-m-grid-container">
          {loading ? (
            <div className="ohm-m-grid-skeleton">
              {[...Array(4)].map((_, i) => (
                <div key={i} className={`ohm-m-card-skeleton ${i === 0 ? 'is-hero' : ''}`}>
                  <div className="sk-img" />
                  <div className="sk-body">
                    <div className="sk-line sk-cat" />
                    <div className="sk-line sk-title" />
                    <div className="sk-line sk-desc" />
                  </div>
                </div>
              ))}
            </div>
          ) : posts.length === 0 ? (
            <div className="ohm-m-empty">
              <BookOpen size={40} />
              <h3>No articles found</h3>
              <p>We couldn't find anything matching your filters or search terms.</p>
              <button 
                className="ohm-button ohm-button-orange"
                onClick={() => { setSelectedCategory(null); setActiveSearch(''); setSearchQuery(''); }}
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="ohm-m-grid-masonry">
              {gridPosts.map((post, idx) => {
                const isHeroCard = idx === 0 && currentPage === 1 && !selectedCategory && !activeSearch;
                const isSkinAlt = idx % 3 === 2; // Dynamic visual variety for "The Grid" effect
                const dateObj = formatDate(post.date);
                const category = getCategoryName(post);
                const readTime = calculateReadTime(post);
                const imgUrl = getFeaturedImage(post);

                if (isHeroCard) {
                  return (
                    <article key={post.id} className="ohm-m-grid-card ohm-m-card-featured">
                      <a href={`/${post.slug}/`} className="ohm-m-card-link">
                        <div className="ohm-m-card-media">
                          <img src={imgUrl} alt={post.title.rendered} loading="eager" />
                          <div className="ohm-m-media-overlay" />
                          <span className="ohm-m-badge-cat">{category}</span>
                          <span className="ohm-m-badge-feat">Featured</span>
                        </div>
                        <div className="ohm-m-card-content">
                          <div className="ohm-m-meta-top">
                            <span className="ohm-m-date"><Calendar size={13} /> {dateObj.month} {dateObj.day}, {dateObj.year}</span>
                            <span className="ohm-m-read"><Clock size={13} /> {readTime}</span>
                          </div>
                          <h2 className="ohm-m-card-title" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                          <p 
                            className="ohm-m-card-excerpt" 
                            dangerouslySetInnerHTML={{ __html: post.excerpt.rendered.replace(/<[^>]+>/g, '').slice(0, 110) + '...' }} 
                          />
                          <div className="ohm-m-card-footer">
                            <span className="ohm-m-read-more">
                              Read Article <ChevronRight size={16} />
                            </span>
                            <button className="ohm-m-share-btn" onClick={(e) => handleShare(e, post)} aria-label="Share article">
                              {copiedId === post.id ? <Check size={16} color="#ff5e14" /> : <Share2 size={16} />}
                            </button>
                          </div>
                        </div>
                      </a>
                    </article>
                  );
                }

                // Grid Card Variants ("The Grid" Wordpress Plugin style overlay vs card skin)
                return (
                  <article key={post.id} className={`ohm-m-grid-card ${isSkinAlt ? 'ohm-m-card-overlay-skin' : 'ohm-m-card-standard'}`}>
                    <a href={`/${post.slug}/`} className="ohm-m-card-link">
                      <div className="ohm-m-card-media">
                        <img src={imgUrl} alt={post.title.rendered} loading="lazy" />
                        <div className="ohm-m-media-overlay" />
                        <span className="ohm-m-badge-cat">{category}</span>
                      </div>
                      <div className="ohm-m-card-content">
                        <div className="ohm-m-meta-top">
                          <span className="ohm-m-date">{dateObj.month} {dateObj.day}</span>
                          <span className="ohm-m-dot">•</span>
                          <span className="ohm-m-read">{readTime}</span>
                        </div>
                        <h3 className="ohm-m-card-title" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                        {!isSkinAlt && (
                          <p 
                            className="ohm-m-card-excerpt" 
                            dangerouslySetInnerHTML={{ __html: post.excerpt.rendered.replace(/<[^>]+>/g, '').slice(0, 75) + '...' }} 
                          />
                        )}
                        <div className="ohm-m-card-footer">
                          <span className="ohm-m-read-more">
                            Explore <ArrowRight size={14} />
                          </span>
                          <button className="ohm-m-share-btn" onClick={(e) => handleShare(e, post)} aria-label="Share article">
                            {copiedId === post.id ? <Check size={15} color="#ff5e14" /> : <Share2 size={15} />}
                          </button>
                        </div>
                      </div>
                    </a>
                  </article>
                );
              })}
            </div>
          )}

          {/* Mobile Pagination */}
          {totalPages > 1 && (
            <div className="ohm-m-pagination">
              <button 
                type="button" 
                disabled={currentPage === 1} 
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              >
                <ArrowLeft size={16} /> Prev
              </button>
              <span className="ohm-m-page-info">Page {currentPage} of {totalPages}</span>
              <button 
                type="button" 
                disabled={currentPage === totalPages} 
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              >
                Next <ArrowRight size={16} />
              </button>
            </div>
          )}
        </div>

        {/* Mobile Search Modal Drawer */}
        {showSearchModal && (
          <div className="ohm-m-search-modal-backdrop">
            <div className="ohm-m-search-modal">
              <div className="ohm-m-modal-header">
                <h3>Search Articles</h3>
                <button type="button" onClick={() => setShowSearchModal(false)}><X size={20} /></button>
              </div>
              <form onSubmit={handleSearchSubmit} className="ohm-m-search-modal-form">
                <div className="ohm-m-modal-input-wrap">
                  <Search size={18} />
                  <input
                    type="text"
                    placeholder="Search engineering topics, BIM, civil..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                  />
                </div>
                <button type="submit" className="ohm-button ohm-button-orange">
                  Search Journal
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    );
  }

  // =========================================================================
  // 💻 DESKTOP VIEW: Clean, Unchanged Desktop Layout
  // =========================================================================
  return (
    <main className="ohm-blog-page">
      {/* Blog Hero Banner */}
      <section className="ohm-blog-hero" style={{ backgroundImage: blogHeroImg ? `url(${blogHeroImg})` : undefined }}>
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
            <>
            <div className="ohm-blog-posts-holder">
              {posts.map((post) => {
                const dateObj = formatDate(post.date);
                return (
                  <article key={post.id} className={`ohm-blog-card ${post === posts[0] ? 'ohm-blog-card-featured' : ''}`}>
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
                          <a href={`/${post.slug}/`} dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
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
            {totalPages > 1 && (
              <nav className="ohm-blog-pagination" aria-label="Blog pagination">
                <button type="button" disabled={currentPage === 1} onClick={() => setCurrentPage((page) => page - 1)} aria-label="Previous page"><ArrowLeft size={16} /></button>
                {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                  <button key={page} type="button" className={currentPage === page ? 'is-active' : ''} onClick={() => setCurrentPage(page)} aria-current={currentPage === page ? 'page' : undefined}>{page}</button>
                ))}
                <button type="button" disabled={currentPage === totalPages} onClick={() => setCurrentPage((page) => page + 1)} aria-label="Next page"><ArrowRight size={16} /></button>
              </nav>
            )}
            </>
          )}
        </div>

        {/* Sidebar Column */}
        <aside className="ohm-blog-sidebar-col">
          <div className="ohm-sidebar-author">
            <p className="ohm-sidebar-eyebrow">OHM JOURNAL</p>
            <h3>Practical insight for better project decisions.</h3>
            <p>Perspectives from the connected disciplines behind safer, more efficient, and more resilient places.</p>
          </div>

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
                  onClick={() => { setSelectedCategory(null); setCurrentPage(1); }}
                >
                  All Categories
                </button>
              </li>
              {categories.map((cat) => (
                <li key={cat.id}>
                  <button
                    className={selectedCategory === cat.id ? 'is-active' : ''}
                    onClick={() => { setSelectedCategory(cat.id); setCurrentPage(1); }}
                  >
                    {cat.name} <span>({cat.count})</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="ohm-sidebar-widget">
            <h4 className="widget-title">Topics</h4>
            <div className="ohm-sidebar-tags">
              {['BIM & digital delivery', 'MEP systems', 'Infrastructure', 'Project management', 'Sustainability', 'Safety & compliance'].map((tag) => <button key={tag} type="button" onClick={() => { setSearchQuery(tag); setActiveSearch(tag); setCurrentPage(1); }}>{tag}</button>)}
            </div>
          </div>

          {/* Recent Posts Widget */}
          <div className="ohm-sidebar-widget">
            <h4 className="widget-title">Recent Articles</h4>
            <div className="ohm-sidebar-recent-posts">
              {recentPosts.map((rPost) => (
                <a key={rPost.id} href={`/${rPost.slug}/`} className="recent-post-item">
                  <img src={getFeaturedImage(rPost)} alt="" />
                  <div className="recent-post-info">
                    <h5 dangerouslySetInnerHTML={{ __html: rPost.title.rendered }} />
                    <span>{formatDate(rPost.date).day} {formatDate(rPost.date).month} {formatDate(rPost.date).year}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
          <div className="ohm-sidebar-follow">
            <h4 className="widget-title">Follow OHM</h4>
            <div>
              <a href="#" aria-label="Facebook">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
              </a>
              <a href="#" aria-label="LinkedIn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.74a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z" /></svg>
              </a>
              <a href="#" aria-label="WhatsApp">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.763.459 3.486 1.332 5.002L2 22l5.129-1.341a9.96 9.96 0 0 0 4.881 1.28h.004c5.507 0 9.99-4.478 9.99-9.984 0-2.668-1.039-5.176-2.928-7.063C17.189 3.004 14.68 2 12.012 2zm5.836 14.283c-.247.697-1.444 1.334-1.996 1.397-.506.058-1.164.086-3.766-.991-3.327-1.378-5.46-4.757-5.626-4.978-.165-.221-1.353-1.802-1.353-3.437 0-1.635.856-2.439 1.159-2.767.303-.328.662-.41.883-.41.22 0 .441.002.634.011.205.009.48-.077.75.57.276.662.937 2.294 1.02 2.46.083.165.138.358.028.578-.11.221-.165.358-.33.551-.165.193-.347.432-.496.58-.165.165-.337.345-.145.675.193.33 0 .855 1.83 2.614 1.261 1.22 2.324 1.602 2.655 1.767.33.165.523.138.716-.083.193-.221.826-.964 1.047-1.295.22-.33.441-.276.744-.165.303.11 1.93.91 2.26 1.075.33.165.551.247.634.386.083.138.083.801-.164 1.498z" /></svg>
              </a>
              <a href="#" aria-label="X">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
              </a>
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}
