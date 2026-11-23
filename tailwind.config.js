/** SALT Electrical: Tailwind config
 *  Every colour below is sampled from the business's own logo and banner
 *  (_fb-pack/images/profile.jpg and cover.jpg), then given a role.
 */
module.exports = {
  content: ['./index.html', './thanks.html', './404.html', './assets/js/**/*.js'],
  theme: {
    extend: {
      colors: {
        // ink: the black slanted panel behind "SALT" in the logo (#151515)
        ink: { DEFAULT: '#151515', soft: '#3b3936', mute: '#5f5b55' },
        // cream: the ground of the logo and banner (#fef5ec)
        cream: { DEFAULT: '#fef5ec', deep: '#f5e7d6', paper: '#fffaf4' },
        // action: the orange "ELECTRICAL" bar (#fc9606). The ONLY click-me colour.
        action: { DEFAULT: '#fc9606', dark: '#e48500', tint: '#ffe2b8' },
        // steel: the grey fuse caps in the logo (#949492); line-art and rules
        steel: { DEFAULT: '#949492', light: '#d9d6d0' },
        // lamp: a lit-bulb tint derived from the logo orange; illustrations only
        lamp: { DEFAULT: '#ffd27d', soft: '#fff0cf' },
      },
      fontFamily: {
        display: ['"Red Hat Display Variable"', '"Arial Black"', 'system-ui', 'sans-serif'],
        sans: ['"Host Grotesk Variable"', 'system-ui', '-apple-system', '"Segoe UI"', 'sans-serif'],
        mono: ['"Chivo Mono"', 'ui-monospace', 'Menlo', 'monospace'],
      },
      maxWidth: { site: '82rem' },
      transitionTimingFunction: { out: 'cubic-bezier(.2,.7,.2,1)', snap: 'cubic-bezier(.3,1.4,.5,1)' },
      keyframes: {
        'fade-up': { '0%': { opacity: 0, transform: 'translateY(14px)' }, '100%': { opacity: 1, transform: 'none' } },
      },
      animation: { 'fade-up': 'fade-up .6s cubic-bezier(.2,.7,.2,1) both' },
    },
  },
  plugins: [],
};
