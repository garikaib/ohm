import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Settings, Info, Shield } from 'lucide-react';
import './index.css';

function App() {
  const [activeTab, setActiveTab] = useState('general');

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen text-slate-800 dark:text-slate-100 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Ohm Core Tools</h1>
          <p className="text-sm text-slate-550">Manage utilities and configurations for Ohm Core Engineering</p>
        </div>
        <div className="text-xs bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-350 font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
          v0.1.0 Scaffold
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Navigation Sidebar */}
        <aside className="w-full md:w-64 shrink-0 flex flex-col gap-2">
          <button
            onClick={() => setActiveTab('general')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${
              activeTab === 'general'
                ? 'bg-orange-500 text-white shadow-md'
                : 'hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>General Config</span>
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${
              activeTab === 'security'
                ? 'bg-orange-500 text-white shadow-md'
                : 'hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Security Tweaks</span>
          </button>
          <button
            onClick={() => setActiveTab('info')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${
              activeTab === 'info'
                ? 'bg-orange-500 text-white shadow-md'
                : 'hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
            }`}
          >
            <Info className="w-4 h-4" />
            <span>System Info</span>
          </button>
        </aside>

        {/* Content Area */}
        <main className="flex-1 bg-white dark:bg-slate-950 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm min-h-[400px]">
          {activeTab === 'general' && (
            <div>
              <h2 className="text-xl font-bold mb-4">General Configuration</h2>
              <p className="text-slate-500 text-sm mb-6">
                Define the environment variables and general plugin behaviors for custom features.
              </p>
              <div className="p-4 bg-slate-50 dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-800 rounded-lg text-center text-slate-500 text-sm">
                Placeholder for SMTP, Comments control and general engineering modules.
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div>
              <h2 className="text-xl font-bold mb-4">Security Hardening</h2>
              <p className="text-slate-500 text-sm mb-6">
                Toggle automated WordPress hardening options.
              </p>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                  <div>
                    <h4 className="font-bold text-sm">Mask Login Errors</h4>
                    <p className="text-xs text-slate-550">Hide generic username/password failure hints.</p>
                  </div>
                  <span className="text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 px-3 py-1 rounded-full">
                    Enabled
                  </span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'info' && (
            <div>
              <h2 className="text-xl font-bold mb-4">System Information</h2>
              <p className="text-slate-550 text-sm mb-6">
                Technical properties and paths for Ohm Core.
              </p>
              <table className="w-full text-sm">
                <tbody>
                  <tr className="border-b border-slate-100 dark:border-slate-900">
                    <td className="py-3 font-semibold text-slate-600 dark:text-slate-400">REST API Url</td>
                    <td className="py-3 font-mono text-xs">{window.ohmToolsData?.restUrl || '/wp-json/'}</td>
                  </tr>
                  <tr className="border-b border-slate-100 dark:border-slate-900">
                    <td className="py-3 font-semibold text-slate-600 dark:text-slate-400">Admin Email</td>
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
