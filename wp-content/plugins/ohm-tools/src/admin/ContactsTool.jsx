import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Clock3, Save, CheckCircle2, AlertCircle, RefreshCw, Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-react';

export default function ContactsTool() {
  const [contacts, setContacts] = useState({
    phones: [],
    emails: [],
    office_address: '',
    short_address: '',
    operating_hours: '',
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState({ type: null, message: '' });

  const restUrl = window.ohmToolsData?.restUrl || '/wp-json/ohm/v1/';
  const nonce = window.ohmToolsData?.nonce || '';

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${restUrl}contacts`, {
        headers: { 'X-WP-Nonce': nonce },
      });
      if (res.ok) {
        const data = await res.json();
        setContacts({
          phones: Array.isArray(data.phones) ? data.phones : [],
          emails: Array.isArray(data.emails) ? data.emails : [],
          office_address: data.office_address || '',
          short_address: data.short_address || '',
          operating_hours: data.operating_hours || '',
        });
      } else {
        setStatus({ type: 'error', message: 'Failed to load contact settings.' });
      }
    } catch (err) {
      setStatus({ type: 'error', message: 'Network error while retrieving contact details.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // Handlers for Phone List
  const handlePhoneChange = (index, value) => {
    setContacts((prev) => {
      const updated = [...prev.phones];
      updated[index] = value;
      return { ...prev, phones: updated };
    });
  };

  const addPhone = () => {
    setContacts((prev) => ({
      ...prev,
      phones: [...prev.phones, ''],
    }));
  };

  const removePhone = (index) => {
    setContacts((prev) => ({
      ...prev,
      phones: prev.phones.filter((_, i) => i !== index),
    }));
  };

  const movePhone = (index, direction) => {
    setContacts((prev) => {
      const updated = [...prev.phones];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= updated.length) return prev;
      const temp = updated[index];
      updated[index] = updated[targetIndex];
      updated[targetIndex] = temp;
      return { ...prev, phones: updated };
    });
  };

  // Handlers for Email List
  const handleEmailChange = (index, value) => {
    setContacts((prev) => {
      const updated = [...prev.emails];
      updated[index] = value;
      return { ...prev, emails: updated };
    });
  };

  const addEmail = () => {
    setContacts((prev) => ({
      ...prev,
      emails: [...prev.emails, ''],
    }));
  };

  const removeEmail = (index) => {
    setContacts((prev) => ({
      ...prev,
      emails: prev.emails.filter((_, i) => i !== index),
    }));
  };

  const moveEmail = (index, direction) => {
    setContacts((prev) => {
      const updated = [...prev.emails];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= updated.length) return prev;
      const temp = updated[index];
      updated[index] = updated[targetIndex];
      updated[targetIndex] = temp;
      return { ...prev, emails: updated };
    });
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setContacts((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setStatus({ type: null, message: '' });

    try {
      const res = await fetch(`${restUrl}contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-WP-Nonce': nonce,
        },
        body: JSON.stringify(contacts),
      });

      if (res.ok) {
        const result = await res.json();
        setStatus({ type: 'success', message: 'Contact lists updated and saved across site!' });
        if (result.data) {
          setContacts({
            phones: Array.isArray(result.data.phones) ? result.data.phones : [],
            emails: Array.isArray(result.data.emails) ? result.data.emails : [],
            office_address: result.data.office_address || '',
            short_address: result.data.short_address || '',
            operating_hours: result.data.operating_hours || '',
          });
        }
      } else {
        setStatus({ type: 'error', message: 'Failed to update contact settings.' });
      }
    } catch (err) {
      setStatus({ type: 'error', message: 'Network error saving settings.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-500">
        <RefreshCw className="w-9 h-9 animate-spin text-orange-500 mb-3" />
        <p className="text-sm font-semibold tracking-wide">Syncing Contacts List...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl ohm-tools-tab-content">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <span>Dynamic Contact Lists</span>
            <span className="text-xs bg-orange-100 text-orange-600 font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">Unlabeled Array</span>
          </h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Add or remove entries in the phone numbers and email lists. The first item is used at the top, and all items iterate cleanly across the theme.
          </p>
        </div>
        <button
          onClick={fetchContacts}
          className="p-2 text-slate-400 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-all"
          title="Reload Data"
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

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Unlabeled Phone Numbers List */}
        <div className="bg-slate-50/80 p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-orange-600 font-bold text-sm uppercase tracking-wider">
              <Phone className="w-4 h-4" />
              <span>Phone Numbers List ({contacts.phones.length})</span>
            </div>
            <button
              type="button"
              onClick={addPhone}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-lg transition-all shadow-sm cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Phone Number</span>
            </button>
          </div>

          <div className="space-y-3">
            {contacts.phones.map((phone, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-xs ohm-tools-card-item"
              >
                <div className="flex flex-col gap-0.5 shrink-0">
                  <button
                    type="button"
                    disabled={idx === 0}
                    onClick={() => movePhone(idx, 'up')}
                    className="p-1 text-slate-400 hover:text-orange-500 disabled:opacity-20 disabled:hover:text-slate-400 transition-colors"
                    title="Move Up"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    disabled={idx === contacts.phones.length - 1}
                    onClick={() => movePhone(idx, 'down')}
                    className="p-1 text-slate-400 hover:text-orange-500 disabled:opacity-20 disabled:hover:text-slate-400 transition-colors"
                    title="Move Down"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className="text-xs font-bold text-slate-500 w-10 uppercase text-center bg-slate-100 py-1 rounded-md">
                  #{idx + 1}
                </span>
                <div className="flex-1">
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => handlePhoneChange(idx, e.target.value)}
                    placeholder="+263 78 301 7009"
                    className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 font-medium focus:outline-none focus:border-orange-500"
                    required
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removePhone(idx)}
                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                  title="Delete phone"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}

            {contacts.phones.length === 0 && (
              <p className="text-xs text-slate-400 italic text-center py-4">No phone numbers in list. Click "Add Phone Number" above.</p>
            )}
          </div>
        </div>

        {/* Unlabeled Email Addresses List */}
        <div className="bg-slate-50/80 p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-orange-600 font-bold text-sm uppercase tracking-wider">
              <Mail className="w-4 h-4" />
              <span>Email Addresses List ({contacts.emails.length})</span>
            </div>
            <button
              type="button"
              onClick={addEmail}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-lg transition-all shadow-sm cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Email Address</span>
            </button>
          </div>

          <div className="space-y-3">
            {contacts.emails.map((email, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-xs ohm-tools-card-item"
              >
                <div className="flex flex-col gap-0.5 shrink-0">
                  <button
                    type="button"
                    disabled={idx === 0}
                    onClick={() => moveEmail(idx, 'up')}
                    className="p-1 text-slate-400 hover:text-orange-500 disabled:opacity-20 disabled:hover:text-slate-400 transition-colors"
                    title="Move Up"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    disabled={idx === contacts.emails.length - 1}
                    onClick={() => moveEmail(idx, 'down')}
                    className="p-1 text-slate-400 hover:text-orange-500 disabled:opacity-20 disabled:hover:text-slate-400 transition-colors"
                    title="Move Down"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className="text-xs font-bold text-slate-500 w-10 uppercase text-center bg-slate-100 py-1 rounded-md">
                  #{idx + 1}
                </span>
                <div className="flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => handleEmailChange(idx, e.target.value)}
                    placeholder="sales@ohmcore.co.zw"
                    className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 font-medium focus:outline-none focus:border-orange-500"
                    required
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeEmail(idx)}
                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                  title="Delete email"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}

            {contacts.emails.length === 0 && (
              <p className="text-xs text-slate-400 italic text-center py-4">No email addresses in list. Click "Add Email Address" above.</p>
            )}
          </div>
        </div>

        {/* Office & Operating Hours */}
        <div className="bg-slate-50/80 p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 mb-4 text-orange-600 font-bold text-sm uppercase tracking-wider">
            <MapPin className="w-4 h-4" />
            <span>Locations & Operating Hours</span>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Full Head Office Address
                </label>
                <textarea
                  name="office_address"
                  value={contacts.office_address}
                  onChange={handleFieldChange}
                  rows={2}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-orange-500 transition-colors resize-none"
                  placeholder="8 Favershame Road, Malbereign, Harare, Zimbabwe"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Compact / Footer Address
                </label>
                <input
                  type="text"
                  name="short_address"
                  value={contacts.short_address}
                  onChange={handleFieldChange}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-orange-500 transition-colors"
                  placeholder="8 Favershame Rd, Malbereign, Harare"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Operating Hours
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="operating_hours"
                  value={contacts.operating_hours}
                  onChange={handleFieldChange}
                  className="w-full px-3.5 py-2.5 pl-10 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-orange-500 transition-colors"
                  placeholder="Mon - Fri: 8:00 - 17:00"
                />
                <Clock3 className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              </div>
            </div>
          </div>
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
                <span>Saving Lists...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save All Contacts</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
