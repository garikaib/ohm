import React, { useState, useEffect } from 'react';
import { Image as ImageIcon, Plus, Trash2, Save, RefreshCw, GripVertical, CheckCircle2, AlertCircle, Upload } from 'lucide-react';

export default function SliderTool() {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState({ type: null, message: '' });

  const restUrl = window.ohmToolsData?.restUrl || '/wp-json/ohm/v1/';
  const nonce = window.ohmToolsData?.nonce || '';

  const fetchSlides = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${restUrl}slides`, {
        headers: { 'X-WP-Nonce': nonce },
      });
      if (res.ok) {
        const data = await res.json();
        setSlides(Array.isArray(data) ? data : []);
      } else {
        setStatus({ type: 'error', message: 'Failed to load home slider items.' });
      }
    } catch (err) {
      setStatus({ type: 'error', message: 'Network error retrieving slider items.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  // Open WP Media Uploader for image selection
  const openMediaLibrary = (index) => {
    if (window.wp && window.wp.media) {
      const frame = window.wp.media({
        title: 'Select Slide Background Image',
        button: { text: 'Use Selected Image' },
        multiple: false,
      });

      frame.on('select', () => {
        const attachment = frame.state().get('selection').first().toJSON();
        if (attachment && attachment.url) {
          handleSlideChange(index, 'image', attachment.url);
        }
      });

      frame.open();
    } else {
      const manualUrl = prompt('Enter Image URL:', slides[index]?.image || '');
      if (manualUrl !== null) {
        handleSlideChange(index, 'image', manualUrl);
      }
    }
  };

  const handleSlideChange = (index, field, value) => {
    setSlides((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const addSlide = () => {
    setSlides((prev) => [
      ...prev,
      {
        id: `slide_${Date.now()}`,
        image: '',
        eyebrow: 'INTEGRATED ENGINEERING SERVICES',
        title: 'NEW SLIDE TITLE',
        body: 'Multidisciplinary engineering solutions designed for safe, efficient, and dependable project delivery.',
      },
    ]);
  };

  const removeSlide = (index) => {
    setSlides((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setStatus({ type: null, message: '' });

    try {
      const res = await fetch(`${restUrl}slides`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-WP-Nonce': nonce,
        },
        body: JSON.stringify(slides),
      });

      if (res.ok) {
        const result = await res.json();
        setStatus({ type: 'success', message: 'Home slider items saved and updated live on homepage!' });
        if (result.data) {
          setSlides(Array.isArray(result.data) ? result.data : []);
        }
      } else {
        setStatus({ type: 'error', message: 'Failed to update home slider items.' });
      }
    } catch (err) {
      setStatus({ type: 'error', message: 'Network error saving slider configuration.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-500">
        <RefreshCw className="w-9 h-9 animate-spin text-orange-500 mb-3" />
        <p className="text-sm font-semibold tracking-wide">Syncing Home Slider Config...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl ohm-tools-tab-content">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <span>Home Hero Slider Configuration</span>
            <span className="text-xs bg-orange-100 text-orange-600 font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">Agnostic List</span>
          </h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Add, reorder, or update background images, kicker eyebrow tags, titles, and body texts for the homepage hero carousel.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={addSlide}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-xl transition-all shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Slide</span>
          </button>
          <button
            onClick={fetchSlides}
            className="p-2 text-slate-400 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-all"
            title="Reload Slides"
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
        <div className="space-y-5">
          {slides.map((slide, idx) => (
            <div
              key={slide.id || idx}
              className="bg-slate-50/80 p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4 ohm-tools-card-item"
            >
              {/* Slide Card Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-200/80">
                <div className="flex items-center gap-2">
                  <GripVertical className="w-4 h-4 text-slate-300 cursor-grab" />
                  <span className="text-xs font-black text-slate-500 uppercase tracking-wider bg-white px-2.5 py-1 rounded-md border border-slate-200">
                    Slide #{idx + 1}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => removeSlide(idx)}
                  className="flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-rose-600 hover:bg-rose-50 px-2.5 py-1 rounded-lg transition-all"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove Slide</span>
                </button>
              </div>

              {/* Image Selector & Form Controls */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
                {/* Image Preview / Selector Box */}
                <div className="md:col-span-4">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Background Image
                  </label>
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-200 border border-slate-300 group">
                    {slide.image ? (
                      <img src={slide.image} alt={`Slide ${idx + 1}`} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 p-4 text-center">
                        <ImageIcon className="w-8 h-8 mb-1" />
                        <span className="text-xs font-semibold">No Image Selected</span>
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => openMediaLibrary(idx)}
                      className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white text-xs font-bold transition-opacity cursor-pointer gap-1"
                    >
                      <Upload className="w-5 h-5" />
                      <span>{slide.image ? 'Change Image' : 'Select Image'}</span>
                    </button>
                  </div>
                  <div className="mt-2 flex gap-2">
                    <input
                      type="text"
                      value={slide.image}
                      onChange={(e) => handleSlideChange(idx, 'image', e.target.value)}
                      placeholder="Image URL..."
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mono text-slate-600 focus:outline-none focus:border-orange-500"
                    />
                    <button
                      type="button"
                      onClick={() => openMediaLibrary(idx)}
                      className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold rounded-lg transition-all"
                    >
                      Browse
                    </button>
                  </div>
                </div>

                {/* Text Content Inputs */}
                <div className="md:col-span-8 space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Kicker Eyebrow Tag
                    </label>
                    <input
                      type="text"
                      value={slide.eyebrow}
                      onChange={(e) => handleSlideChange(idx, 'eyebrow', e.target.value)}
                      placeholder="e.g. INTEGRATED ENGINEERING SERVICES"
                      className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 uppercase tracking-wider focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Main Slide Title
                    </label>
                    <input
                      type="text"
                      value={slide.title}
                      onChange={(e) => handleSlideChange(idx, 'title', e.target.value)}
                      placeholder="e.g. ENGINEERING BETTER TOMORROWS"
                      className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-sm font-extrabold text-slate-900 focus:outline-none focus:border-orange-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Description Body Text
                    </label>
                    <textarea
                      value={slide.body}
                      onChange={(e) => handleSlideChange(idx, 'body', e.target.value)}
                      rows={2}
                      placeholder="Slide description text..."
                      className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:border-orange-500 resize-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}

          {slides.length === 0 && (
            <div className="p-8 bg-slate-50 border border-dashed border-slate-200 rounded-2xl text-center text-slate-400 text-sm">
              No slides configured. Click "Add Slide" to build your homepage hero slider.
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
                <span>Saving Slider...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Home Slider Config</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
