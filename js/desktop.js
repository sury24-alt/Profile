/* ==========================================================================
   ADAPTIVE DUAL-THEME GLASSMORPHIC JAVASCRIPT ENGINE
   Features: Light/Dark Theme Switcher, Resume Modal Viewer, 3D Hover Tilt, Clipboard
   ========================================================================== */

(function () {
  'use strict';

  // 1. Instant Initialization & Zero-Latency Execution
  document.addEventListener('DOMContentLoaded', () => {
    initThemeSwitcher();
    init3DTilt();
    initCopyClipboard();
    initScrollSpy();
    initQuickMessageForm();
    initKeyboardShortcuts();
    initResumeModal();
  });

  // 2. Dynamic Light / Dark Theme Switcher with LocalStorage Persistence
  function initThemeSwitcher() {
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const htmlElement = document.documentElement;

    const savedTheme = localStorage.getItem('surya_portfolio_theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'dark');

    setTheme(initialTheme);

    if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme') || 'dark';
        const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(nextTheme);
        showToast(nextTheme === 'light' ? '☀️ Crystal White Light Mode Active' : '🌙 Cyber Crimson Dark Mode Active');
      });
    }

    function setTheme(theme) {
      htmlElement.setAttribute('data-theme', theme);
      localStorage.setItem('surya_portfolio_theme', theme);
      if (themeToggleBtn) {
        themeToggleBtn.innerHTML = theme === 'dark' ? '☀️' : '🌙';
        themeToggleBtn.setAttribute('title', `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`);
        themeToggleBtn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`);
      }
    }
  }

  // 3. Isolated High-Clarity Resume Modal Viewer Controller
  function initResumeModal() {
    const modal = document.getElementById('resumeModalOverlay');
    const dockBtn = document.getElementById('openResumeDockBtn');
    const actionBtn = document.getElementById('openResumeActionBtn');
    const closeBtn = document.getElementById('closeResumeBtn');

    if (!modal) return;

    const openModal = () => {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    };

    if (dockBtn) dockBtn.addEventListener('click', openModal);
    if (actionBtn) actionBtn.addEventListener('click', openModal);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    });
  }

  // 4. 3D Hover Tilt Physics for Bento Cards & Action Blocks
  function init3DTilt() {
    const tiltCards = document.querySelectorAll('.bento-card, .glass-card, .resume-action-card');
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || window.innerWidth < 768) return;

    tiltCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -4;
        const rotateY = ((x - centerX) / centerX) * 4;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  // 5. Direct Email Copy to Clipboard with Visual Toast
  function initCopyClipboard() {
    const copyBtn = document.getElementById('copyEmailTrigger');
    const toast = document.getElementById('copyToastNotice');
    if (!copyBtn || !toast) return;

    copyBtn.addEventListener('click', async () => {
      const email = copyBtn.getAttribute('data-email') || 'suryapedapudi2404@gmail.com';
      
      try {
        await navigator.clipboard.writeText(email);
        showToast('✓ Email copied to clipboard!');
      } catch (err) {
        const tempInput = document.createElement('input');
        tempInput.value = email;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        showToast('✓ Email copied to clipboard!');
      }
    });
  }

  function showToast(message) {
    const toast = document.getElementById('copyToastNotice');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

  // 6. ScrollSpy Navigation Sync
  function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.dock-link');

    if (!sections.length || !navLinks.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const activeId = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${activeId}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, {
      rootMargin: '-30% 0px -60% 0px'
    });

    sections.forEach(section => observer.observe(section));
  }

  // 7. Quick Message Form Submission Simulation
  function initQuickMessageForm() {
    const form = document.getElementById('quickMessageForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.innerHTML = '<span>⚡ Transmitting...</span>';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = '<span>✓ Message Sent!</span>';
        submitBtn.style.background = 'linear-gradient(135deg, #10b981, #e11d48)';
        showToast('✓ Message sent! Surya will get back to you soon.');
        form.reset();

        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
          submitBtn.style.background = '';
        }, 3500);
      }, 600);
    });
  }

  // 8. Keyboard Navigation Shortcuts
  function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

      if (e.key === '1') {
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
      } else if (e.key === '2') {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
      } else if (e.key === '3') {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

})();