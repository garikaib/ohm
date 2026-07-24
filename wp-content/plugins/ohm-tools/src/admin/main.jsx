import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { PhoneCall, Sliders, Info, Shield, Cpu, LayoutTemplate, Share2 } from 'lucide-react';
import ContactsTool from './ContactsTool.jsx';
import SliderTool from './SliderTool.jsx';
import PageHeadersTool from './PageHeadersTool.jsx';
import SocialsTool from './SocialsTool.jsx';
import './index.css';

function App() {
  const [activeTab, setActiveTab] = useState('slider');

  return (
    <div className="bg-white text-slate-800 p-8 rounded-2xl shadow-xl border border-slate-200/80">
      {/* Admin Header */}
      <div className="flex flex-wrap justify-between items-center mb-8 border-b border-slate-100 pb-6 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center font-black text-xl shadow-md">
            Ω
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <span>OHM CORE</span>
              <span className="text-xs bg-orange-100 text-orange-600 font-bold px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                Tools Suite
              </span>
            </h1>
            <p className="text-xs font-medium text-slate-500 mt-0.5">Centralized site controls & dynamic management plugins</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200">
          <Cpu className="w-3.5 h-3.5 text-orange-500" />
          <span>Engine v1.0.0</span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Navigation Sidebar */}
        <aside className="w-full md:w-64 shrink-0 flex flex-col gap-2">
          <button
            onClick={() => setActiveTab('slider')}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer ${
              activeTab === 'slider'
                ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20 translate-x-1'
                : 'hover:bg-slate-100 text-slate-600'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Home Slider Config</span>
          </button>

          <button
            onClick={() => setActiveTab('page-headers')}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer ${
              activeTab === 'page-headers'
                ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20 translate-x-1'
                : 'hover:bg-slate-100 text-slate-600'
            }`}
          >
            <LayoutTemplate className="w-4 h-4" />
            <span>Page Header Images</span>
          </button>

          <button
            onClick={() => setActiveTab('socials')}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer ${
              activeTab === 'socials'
                ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20 translate-x-1'
                : 'hover:bg-slate-100 text-slate-600'
            }`}
          >
            <Share2 className="w-4 h-4" />
            <span>Social Media Links</span>
          </button>

          <button
            onClick={() => setActiveTab('contacts')}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer ${
              activeTab === 'contacts'
                ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20 translate-x-1'
                : 'hover:bg-slate-100 text-slate-600'
            }`}
          >
            <PhoneCall className="w-4 h-4" />
            <span>Contacts Tool</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer ${
              activeTab === 'security'
                ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20 translate-x-1'
                : 'hover:bg-slate-100 text-slate-600'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Security Tweaks</span>
          </button>

          <button
            onClick={() => setActiveTab('info')}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer ${
              activeTab === 'info'
                ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20 translate-x-1'
                : 'hover:bg-slate-100 text-slate-600'
            }`}
          >
            <Info className="w-4 h-4" />
            <span>System Info</span>
          </button>
        </aside>

        {/* Content Area */}
        <main className="flex-1 bg-white p-6 rounded-2xl border border-slate-100 shadow-xs min-h-[480px]">
          {activeTab === 'slider' && <SliderTool />}
          {activeTab === 'page-headers' && <PageHeadersTool />}
          {activeTab === 'socials' && <SocialsTool />}
          {activeTab === 'contacts' && <ContactsTool />}

          {activeTab === 'security' && (
            <div className="ohm-tools-tab-content">
              <h2 className="text-xl font-bold mb-4">Security Hardening</h2>
              <p className="text-slate-500 text-sm mb-6">
                Active security measures for Ohm Core site administration.
              </p>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div>
                    <h4 className="font-bold text-sm">Mask Login Errors</h4>
                    <p className="text-xs text-slate-500">Hides username and password hint details on login failure.</p>
                  </div>
                  <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full">
                    Enabled
                  </span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'info' && (
            <div className="ohm-tools-tab-content">
              <h2 className="text-xl font-bold mb-4">System Information</h2>
              <p className="text-slate-500 text-sm mb-6">
                Environment endpoints and admin parameters.
              </p>
              <table className="w-full text-sm">
                <tbody>
                  <tr className="border-b border-slate-100">
                    <td className="py-3 font-semibold text-slate-600">Ohm REST Endpoint</td>
                    <td className="py-3 font-mono text-xs text-orange-600">{window.ohmToolsData?.restUrl || '/wp-json/ohm/v1/'}</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-3 font-semibold text-slate-600">Admin Email</td>
                    <td className="py-3 font-mono text-xs">{window.ohmToolsData?.adminEmail}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

const root = document.getElementById('ohm-tools-root');
if (root) {
  createRoot(root).render(<App />);
}
