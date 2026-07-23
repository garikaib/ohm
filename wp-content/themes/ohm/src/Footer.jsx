import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="w-full bg-zinc-900 dark:bg-black text-zinc-400 py-12 border-t border-zinc-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h4 className="text-white font-bold text-base mb-4 uppercase tracking-widest">Ohm Core Engineering</h4>
          <p className="text-sm text-zinc-500 leading-relaxed">
            High performance engineering and electrical systems solutions designed for industrial efficiency.
          </p>
        </div>
        <div>
          <h4 className="text-white font-bold text-base mb-4 uppercase tracking-widest">Links</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/about" className="hover:text-accent transition-colors">About Us</a></li>
            <li><a href="/services" className="hover:text-accent transition-colors">Services</a></li>
            <li><a href="/contact" className="hover:text-accent transition-colors">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold text-base mb-4 uppercase tracking-widest">Contact</h4>
          <ul className="space-y-2 text-sm text-zinc-500">
            <li>Email: info@ohmcore.com</li>
            <li>Harare, Zimbabwe</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-12 pt-6 border-t border-zinc-800 text-xs text-zinc-600 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p>&copy; {currentYear} Ohm Core Engineering. All rights reserved.</p>
      </div>
    </footer>
  );
}
