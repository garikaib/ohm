import React, { useState, useEffect } from 'react';
import { Share2, Plus, Trash2, Save, RefreshCw, GripVertical, CheckCircle2, AlertCircle, ExternalLink } from 'lucide-react';

export default function SocialsTool() {
  const [socials, setSocials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState({ type: null, message: '' });

  const restUrl = window.ohmToolsData?.restUrl || '/wp-json/ohm/v1/';
  const nonce = window.ohmToolsData?.nonce || '';

  const fetchSocials = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${restUrl}socials`, {
        headers: { 'X-WP-Nonce': nonce },
      });
      if (res.ok) {
        const data = await res.json();
        setSocials(Array.isArray(data) ? data : []);
      } else {
        setStatus({ type: 'error', message: 'Failed to load social media links.' });
      }
    } catch (err) {
      setStatus({ type: 'error', message: 'Network error retrieving social media links.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSocials();
  }, []);

  const handleSocialChange = (index, field, value) => {
    setSocials((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const addSocial = () => {
    setSocials((prev) => [
      ...prev,
      {
        id: `soc_${Date.now()}`,
        platform: 'New Platform',
        url: '#',
        icon: 'Share2',
      },
    ]);
  };

  const removeSocial = (index) => {
    setSocials((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setStatus({ type: null, message: '' });

    try {
      const res = await fetch(`${restUrl}socials`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-WP-Nonce': nonce,
        },
        body: JSON.stringify(socials),
      });

      if (res.ok) {
        const result = await res.json();
        setStatus({ type: 'success', message: 'Social media links updated and active across site header, drawer, and blog!' });
        if (result.data) {
          setSocials(Array.isArray(result.data) ? result.data : []);
        }
      } else {
        setStatus({ type: 'error', message: 'Failed to save social media links.' });
      }
    } catch (err) {
      setStatus({ type: 'error', message: 'Network error saving social links.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-500">
        <RefreshCw className="w-9 h-9 animate-spin text-orange-500 mb-3" />
        <p className="text-sm font-semibold tracking-wide">Syncing Social Media Links...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl ohm-tools-tab-content">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <span>Social Media Links Manager</span>
            <span className="text-xs bg-orange-100 text-orange-600 font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">Agnostic List</span>
          </h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Add, reorder, or update your social media URLs (seeded with # by default). Changes automatically propagate to the site header, mobile navigation drawer, and blog widgets.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={addSocial}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-xl transition-all shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Social Link</span>
          </button>
          <button
            onClick={fetchSocials}
            className="p-2 text-slate-400 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-all"
            title="Reload Socials"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
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
        <div className="space-y-4">
          {socials.map((item, idx) => (
            <div
              key={item.id || idx}
              className="bg-slate-50/80 p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 ohm-tools-card-item"
            >
              <div className="flex items-center gap-3 flex-1">
                <GripVertical className="w-4 h-4 text-slate-300 shrink-0 cursor-grab" />
                <div className="w-32 shrink-0">
                  <input
                    type="text"
                    value={item.platform}
                    onChange={(e) => handleSocialChange(idx, 'platform', e.target.value)}
                    placeholder="Platform Name"
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-900 focus:outline-none focus:border-orange-500"
                    required
                  />
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    value={item.url}
                    onChange={(e) => handleSocialChange(idx, 'url', e.target.value)}
                    placeholder="URL (e.g. https://facebook.com/ohmcore or #)"
                    className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-700 focus:outline-none focus:border-orange-500"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => removeSocial(idx)}
                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                  title="Delete Social Link"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          {socials.length === 0 && (
            <div className="p-8 bg-slate-50 border border-dashed border-slate-200 rounded-2xl text-center text-slate-400 text-sm">
              No social media links configured. Click "Add Social Link" above.
            </div>
          )}
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
                <span>Saving Links...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Social Media Links</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
