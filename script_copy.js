// script_copy.js — handles footer button links and mobile menu toggling
document.addEventListener('DOMContentLoaded', function () {
    // Footer buttons (data-link)
    document.querySelectorAll('.icon-btn[data-link]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const link = btn.getAttribute('data-link');
            if (!link) return;
            if (link === 'reload') {
                // reload current page
                location.reload();
                return;
            }
            // open internal link in same tab if path is same-page, otherwise open new tab
            try {
                const url = new URL(link, location.href);
                // if same origin and likely a local page, open in same tab
                if (url.origin === location.origin && (url.pathname.endsWith('.html') || url.pathname === '/')) {
                    location.href = url.href;
                } else {
                    window.open(url.href, '_blank', 'noopener');
                }
            } catch (err) {
                // fallback: open as external
                window.open(link, '_blank', 'noopener');
            }
        });
    });

    // Mobile menu toggling
    const burger = document.getElementById('burgerBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileClose = document.getElementById('mobileMenuClose');

    function openMenu() {
        mobileMenu.classList.add('open');
        mobileMenu.setAttribute('aria-hidden', 'false');
        burger.setAttribute('aria-expanded', 'true');
        document.body.classList.add('no-scroll');
        // basic focus move to first interactive element
        const focusable = mobileMenu.querySelector('a, button');
        if (focusable) focusable.focus();
    }
    function closeMenu() {
        mobileMenu.classList.remove('open');
        mobileMenu.setAttribute('aria-hidden', 'true');
        burger.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('no-scroll');
        burger.focus();
    }

    if (burger && mobileMenu) {
        burger.addEventListener('click', openMenu);
    }
    if (mobileClose) mobileClose.addEventListener('click', closeMenu);

    // close when clicking outside inner panel
    mobileMenu.addEventListener('click', (e) => {
        if (e.target === mobileMenu) closeMenu();
    });

    // Close on Escape key when menu is open
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' || e.key === 'Esc') {
            if (mobileMenu.classList.contains('open')) closeMenu();
        }
    });

    // Links inside mobile menu use data-link, behave like footer
    mobileMenu.querySelectorAll('[data-link]').forEach(el => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            const link = el.getAttribute('data-link');
            if (!link) return;
            if (link === 'reload') return location.reload();
            try { window.open(new URL(link, location.href).href, '_blank', 'noopener'); } catch (err) { window.open(link, '_blank', 'noopener'); }
        });
    });
});
