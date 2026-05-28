import Link from 'next/link';

const footerLinks = [
  { href: '/about', label: 'About' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Service' },
  { href: '/contact', label: 'Contact' },
];

const communityLinks = [
  { href: '#', label: 'Discord' },
  { href: '#', label: 'Twitter' },
  { href: '#', label: 'Reddit' },
];

export default function Footer() {
  return (
    <footer className="bg-pixel-darker border-t border-pixel-accent mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div>
            <h3 className="font-pixel text-pixel-highlight text-sm mb-3">PokeTrade Hub</h3>
            <p className="text-gray-400 text-sm">
              Your ultimate Pokemon GO trading companion. Find trades, track raids, and connect with trainers.
            </p>
            <p className="text-gray-500 text-xs mt-2">
              Powered by LeekDuck data
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-pixel text-white text-xs mb-3">Links</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-pixel-highlight transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community Links */}
          <div>
            <h4 className="font-pixel text-white text-xs mb-3">Community</h4>
            <ul className="space-y-2">
              {communityLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-pixel-highlight transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-pixel-accent mt-8 pt-6 text-center">
          <p className="text-gray-500 text-xs">
            &copy; 2026 PokeTrade Hub. All rights reserved.
          </p>
          <p className="text-gray-600 text-xs mt-1">
            Not affiliated with Niantic, Inc. or The Pokemon Company.
          </p>
        </div>
      </div>
    </footer>
  );
}
