/* ============================================
   JAVASCRIPT COMPLET - Mboup & Gaye
   Animations, interactions et fonctionnalités
   ============================================ */
import { Analytics } from '@vercel/analytics/react';

function App() {
  return (
    <>
      {/* Ton application */}
      <Analytics />
    </>
  );
}

export default App;
(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        whatsapp: '221781396489',  // Numéro WhatsApp mis à jour
        instagram: 'MboupGaye',
        tiktok: 'MboupGaye'
    };

    // ----- DOM READY -----
    document.addEventListener('DOMContentLoaded', function() {

        // ============================================
        // 1. MOBILE MENU
        // ============================================
        const menuToggle = document.querySelector('.menu-toggle');
        const navLinks = document.querySelector('.nav-links');

        if (menuToggle && navLinks) {
            menuToggle.addEventListener('click', function(e) {
                e.stopPropagation();
                this.classList.toggle('active');
                navLinks.classList.toggle('open');
                document.body.classList.toggle('menu-open');
            });

            // Fermer au clic sur un lien
            navLinks.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    menuToggle.classList.remove('active');
                    navLinks.classList.remove('open');
                    document.body.classList.remove('menu-open');
                });
            });

            // Fermer au clic extérieur
            document.addEventListener('click', function(e) {
                if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
                    menuToggle.classList.remove('active');
                    navLinks.classList.remove('open');
                    document.body.classList.remove('menu-open');
                }
            });
        }

        // ============================================
        // 2. HEADER SCROLL EFFECT
        // ============================================
        const header = document.querySelector('header');
        let lastScroll = 0;

        if (header) {
            window.addEventListener('scroll', function() {
                const currentScroll = window.pageYOffset || window.scrollY;

                if (currentScroll > 80) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }

                lastScroll = currentScroll;
            }, { passive: true });
        }

        // ============================================
        // 3. ANIMATION DES STATS (Compteur)
        // ============================================
        const statNumbers = document.querySelectorAll('.stat-item h3');
        let statsAnimated = false;

        function animateStats() {
            if (statsAnimated || statNumbers.length === 0) return;

            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-count')) || 0;
                const suffix = stat.getAttribute('data-suffix') || '';
                const duration = 2000;
                const startTime = performance.now();

                function updateCounter(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    // Easing function pour un effet plus naturel
                    const eased = 1 - Math.pow(1 - progress, 3);
                    const current = Math.floor(eased * target);

                    stat.textContent = current + suffix;

                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        stat.textContent = target + suffix;
                    }
                }

                requestAnimationFrame(updateCounter);
            });

            statsAnimated = true;
        }

        // Observer les stats
        if (statNumbers.length > 0) {
            const statsContainer = statNumbers[0].closest('.stats');
            if (statsContainer) {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            animateStats();
                            observer.unobserve(entry.target);
                        }
                    });
                }, {
                    threshold: 0.3,
                    rootMargin: '0px 0px -50px 0px'
                });
                observer.observe(statsContainer);
            }
        }

        // ============================================
        // 4. LIGHTBOX / GALERIE PRODUIT
        // ============================================
        const thumbnails = document.querySelectorAll('.thumbnails img');
        const mainImage = document.querySelector('.main-image img');

        if (thumbnails.length > 0 && mainImage) {
            // Activer le premier thumbnail
            if (thumbnails[0]) {
                thumbnails[0].classList.add('active');
            }

            thumbnails.forEach(thumb => {
                thumb.addEventListener('click', function() {
                    thumbnails.forEach(t => t.classList.remove('active'));
                    this.classList.add('active');

                    const newSrc = this.getAttribute('data-full') || this.src;
                    const alt = this.alt;

                    // Animation de transition
                    mainImage.style.opacity = '0.5';
                    mainImage.style.transform = 'scale(0.95)';

                    setTimeout(() => {
                        mainImage.src = newSrc;
                        mainImage.alt = alt;
                        mainImage.style.opacity = '1';
                        mainImage.style.transform = 'scale(1)';
                    }, 200);
                });
            });
        }

        // ============================================
        // 5. WHATSAPP BUTTONS
        // ============================================
        const whatsappButtons = document.querySelectorAll('.btn-whatsapp, .whatsapp-trigger');

        whatsappButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();

                const productName = this.getAttribute('data-product') ||
                    document.querySelector('.product-name')?.textContent ||
                    'produit Mboup & Gaye';

                const phone = CONFIG.whatsapp;
                const message = `Bonjour Mboup & Gaye, je souhaite obtenir le prix, les caractéristiques et la disponibilité du ${productName}. Merci.`;

                const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
                window.open(url, '_blank');
            });
        });

        // ============================================
        // 6. WHATSAPP FLOATING BUTTON
        // ============================================
        const whatsappFloat = document.querySelector('.whatsapp-float');
        if (whatsappFloat) {
            whatsappFloat.addEventListener('click', function(e) {
                e.preventDefault();
                const phone = CONFIG.whatsapp;
                const message = 'Bonjour Mboup & Gaye, je souhaite obtenir des informations sur vos produits. Merci.';
                window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
            });
        }

        // ============================================
        // 7. RESEAUX SOCIAUX - Instagram & TikTok
        // ============================================
        // Instagram
        document.querySelectorAll('.social-icon.instagram, .btn-instagram').forEach(el => {
            el.addEventListener('click', function(e) {
                e.preventDefault();
                window.open(`https://instagram.com/${CONFIG.instagram}`, '_blank');
            });
        });

        // TikTok
        document.querySelectorAll('.social-icon.tiktok, .btn-tiktok').forEach(el => {
            el.addEventListener('click', function(e) {
                e.preventDefault();
                window.open(`https://tiktok.com/@${CONFIG.tiktok}`, '_blank');
            });
        });

        // ============================================
        // 8. BACK TO TOP BUTTON
        // ============================================
        const backToTop = document.createElement('button');
        backToTop.className = 'back-to-top';
        backToTop.innerHTML = '↑';
        backToTop.setAttribute('aria-label', 'Retour en haut');
        document.body.appendChild(backToTop);

        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }, { passive: true });

        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // ============================================
        // 9. SCROLL ANIMATIONS (Fade In)
        // ============================================
        const animateElements = document.querySelectorAll(
            '.product-card, .category-card, .testimonial-card, .catalogue-category'
        );

        if (animateElements.length > 0 && 'IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            animateElements.forEach(el => {
                if (el.style.display === 'none') return;
                observer.observe(el);
            });
        }

        // ============================================
        // 10. RECHERCHE PRODUITS (optionnel)
        // ============================================
        const searchInput = document.getElementById('search-products');
        const productCards = document.querySelectorAll('.product-card');

        if (searchInput && productCards.length > 0) {
            let searchTimeout;

            searchInput.addEventListener('input', function() {
                clearTimeout(searchTimeout);

                const query = this.value.toLowerCase().trim();

                searchTimeout = setTimeout(() => {
                    productCards.forEach(card => {
                        const name = card.querySelector('h4')?.textContent?.toLowerCase() || '';
                        const desc = card.querySelector('p')?.textContent?.toLowerCase() || '';
                        const tag = card.querySelector('.tag')?.textContent?.toLowerCase() || '';

                        const match = name.includes(query) || desc.includes(query) || tag.includes(query);

                        if (match) {
                            card.style.display = '';
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        } else {
                            card.style.display = 'none';
                        }
                    });

                    // Afficher un message si aucun résultat
                    const visibleCards = document.querySelectorAll('.product-card[style*="display: none"]');
                    const grid = document.querySelector('.products-grid');
                    let noResultMsg = document.querySelector('.no-result');

                    if (visibleCards.length === productCards.length && query.length > 0) {
                        if (!noResultMsg) {
                            noResultMsg = document.createElement('div');
                            noResultMsg.className = 'no-result';
                            noResultMsg.style.cssText = `
                                        grid-column: 1 / -1;
                                        text-align: center;
                                        padding: 40px;
                                        color: var(--text-light);
                                        font-size: 1.1rem;
                                    `;
                            noResultMsg.innerHTML = `
                                        🔍 Aucun produit trouvé pour "<strong>${query}</strong>"
                                    `;
                            grid?.appendChild(noResultMsg);
                        } else {
                            noResultMsg.innerHTML = `🔍 Aucun produit trouvé pour "<strong>${query}</strong>"`;
                            noResultMsg.style.display = '';
                        }
                    } else if (noResultMsg) {
                        noResultMsg.style.display = 'none';
                    }
                }, 300);
            });
        }

        // ============================================
        // 11. SMOOTH SCROLL ANCHORS
        // ============================================
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#' || href === '#!') return;

                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // ============================================
        // 12. IMAGE FALLBACK
        // ============================================
        document.querySelectorAll('img').forEach(img => {
            img.addEventListener('error', function() {
                const width = this.width || 300;
                const height = this.height || 200;
                const text = this.alt || 'Image';
                this.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}'%3E%3Crect width='100%25' height='100%25' fill='%231a1a2e'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='14' fill='%23e94560' text-anchor='middle' dy='.3em'%3E${text}%3C/text%3E%3C/svg%3E`;
            });
        });

        // ============================================
        // 13. KEYBOARD NAVIGATION
        // ============================================
        document.addEventListener('keydown', function(e) {
            // ESC pour fermer le menu
            if (e.key === 'Escape') {
                const menuOpen = document.querySelector('.nav-links.open');
                if (menuOpen) {
                    menuToggle?.classList.remove('active');
                    menuOpen.classList.remove('open');
                    document.body.classList.remove('menu-open');
                }
            }
        });

        // ============================================
        // 14. PERFORMANCE - DÉTECTION CONNEXION
        // ============================================
        if ('connection' in navigator) {
            const connection = navigator.connection;
            if (connection.saveData) {
                document.querySelectorAll('.hero-dots').forEach(el => el.style.display = 'none');
                document.querySelectorAll('.btn::after').forEach(el => el.style.display = 'none');
            }
        }

        // ============================================
        // 15. CONSOLE LOG
        // ============================================
        console.log('%c Mboup & Gaye ', 'background: #e94560; color: white; font-size: 20px; font-weight: bold; padding: 10px 20px; border-radius: 5px;');
        console.log('%c Site vitrine - Matériel photo, vidéo, informatique et gaming ', 'color: #2d2d3f; font-size: 14px;');
        console.log(`📱 WhatsApp: ${CONFIG.whatsapp}`);
        console.log(`📸 Instagram: @${CONFIG.instagram}`);
        console.log(`🎵 TikTok: @${CONFIG.tiktok}`);
        console.log(`📊 ${productCards.length} produits affichés`);

    }); // Fin DOMContentLoaded

})();
