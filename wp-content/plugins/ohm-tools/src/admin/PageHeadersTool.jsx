import React, { useState, useEffect } from 'react';
import { Image as ImageIcon, Save, RefreshCw, Upload, CheckCircle2, AlertCircle, Layout } from 'lucide-react';

const defaultPages = [
  { slug: 'about', title: 'About Us Page' },
  { slug: 'team', title: 'Team Page' },
  { slug: 'contact', title: 'Contact Us Page' },
  { slug: 'services', title: 'Services Overview Cover' },
  { slug: 'mechanical-engineering', title: 'Mechanical Engineering' },
  { slug: 'electrical-engineering', title: 'Electrical Engineering' },
  { slug: 'civil-engineering', title: 'Civil Engineering' },
  { slug: 'structural-engineering', title: 'Structural Engineering' },
  { slug: 'project-management', title: 'Project Management' },
  { slug: 'bim-technology', title: 'BIM Technology' },
  { slug: 'blog', title: 'Blog Journal Hero' },
];

export default function PageHeadersTool() {
  const [headers, setHeaders] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState({ type: null, message: '' });

  const restUrl = window.ohmToolsData?.restUrl || '/wp-json/ohm/v1/';
  const nonce = window.ohmToolsData?.nonce || '';

  const fetchHeaders = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${restUrl}page-headers`, {
        headers: { 'X-WP-Nonce': nonce },
      });
      if (res.ok) {
        const data = await res.json();
        setHeaders(data || {});
      } else {
        setStatus({ type: 'error', message: 'Failed to load page header image defaults.' });
      }
    } catch (err) {
      setStatus({ type: 'error', message: 'Network error loading page headers.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHeaders();
  }, []);

  const openMediaLibrary = (slug) => {
    if (window.wp && window.wp.media) {
      const frame = window.wp.media({
        title: `Select Background Image for ${slug}`,
        button: { text: 'Set Page Header' },
        multiple: false,
      });

      frame.on('select', () => {
        const attachment = frame.state().get('selection').first().toJSON();
        if (attachment && attachment.url) {
          handleHeaderChange(slug, attachment.url);
        }
      });

      frame.open();
    } else {
      const manualUrl = prompt('Enter Image URL:', headers[slug] || '');
      if (manualUrl !== null) {
        handleHeaderChange(slug, manualUrl);
      }
    }
  };

  const handleHeaderChange = (slug, url) => {
    setHeaders((prev) => ({ ...prev, [slug]: url }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setStatus({ type: null, message: '' });

    try {
      const res = await fetch(`${restUrl}page-headers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-WP-Nonce': nonce,
        },
        body: JSON.stringify(headers),
      });

      if (res.ok) {
        const result = await res.json();
        setStatus({ type: 'success', message: 'Page header background images saved and active!' });
        if (result.data) {
          setHeaders(result.data);
        }
      } else {
        setStatus({ type: 'error', message: 'Failed to save page header settings.' });
      }
    } catch (err) {
      setStatus({ type: 'error', message: 'Network error saving page headers.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-500">
        <RefreshCw className="w-9 h-9 animate-spin text-orange-500 mb-3" />
        <p className="text-sm font-semibold tracking-wide">Syncing Page Headers Config...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl ohm-tools-tab-content">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <span>Page Header Background Images</span>
            <span className="text-xs bg-orange-100 text-orange-600 font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">Global & Per-Page</span>
          </h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Configure global default header background images per page section here, or override them individually inside the WordPress Page Editor sidebar box.
          </p>
        </div>
        <button
          onClick={fetchHeaders}
          className="p-2 text-slate-400 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-all"
          title="Reload Headers"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {status.message && (
        <div
          className={`flex items-center gap-3 p-4 mb-6 rounded-xl text-sm font-semibold transition-all ${
            status.type === 'success'
              ? 'bg-emerald-50 text-emerald-900 border border-emerald-200 shadow-sm'
              : 'bg-rose-50 text-rose-900 border border-rose-200 shadow-sm'
          }`}
        >
          {status.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600" />
          ) : (
            <AlertCircle className="w-5 h-5 shrink-0 text-rose-600" />
          )}
          <span>{status.message}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {defaultPages.map((page) => {
            const currentUrl = headers[page.slug] || '';
            return (
              <div
                key={page.slug}
                className="bg-slate-50/80 p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between ohm-tools-card-item"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                      <Layout className="w-3.5 h-3.5 text-orange-500" />
                      <span>{page.title}</span>
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 bg-white px-2 py-0.5 rounded border border-slate-200">
                      /{page.slug}
                    </span>
                  </div>

                  <div className="relative aspect-[21/9] rounded-xl overflow-hidden bg-slate-200 border border-slate-300 group mb-3">
                    {currentUrl ? (
                      <img src={currentUrl} alt={page.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 p-2 text-center">
                        <ImageIcon className="w-6 h-6 mb-1" />
                        <span className="text-[11px] font-semibold">No Image Configured</span>
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => openMediaLibrary(page.slug)}
                      className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white text-xs font-bold transition-opacity cursor-pointer gap-1"
                    >
                      <Upload className="w-4 h-4" />
                      <span>{currentUrl ? 'Change Image' : 'Select Image'}</span>
                    </button>
                  </div>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={currentUrl}
                    onChange={(e) => handleHeaderChange(page.slug, e.target.value)}
                    placeholder="Image URL..."
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mono text-slate-600 focus:outline-none focus:border-orange-500"
                  />
                  <button
                    type="button"
                    onClick={() => openMediaLibrary(page.slug)}
                    className="px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-lg transition-all shrink-0 cursor-pointer"
                  >
                    Select
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Submit Bar */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-7 py-3.5 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white text-sm font-bold rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-50"
          >
            {saving ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Saving Headers...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save All Page Headers</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
