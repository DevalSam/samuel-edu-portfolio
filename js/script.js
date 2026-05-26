// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navigation active state
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });

    // Navbar background on scroll
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Reveal animations on scroll
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(element => {
    revealObserver.observe(element);
});

// Mobile menu toggle
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenu.classList.remove('active');
    });
});

// Contact form handling
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Create mailto link
    const mailtoLink = `mailto:edubsam@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Show success message
    showNotification('Email client opened! Please send the email to complete your message.', 'success');
    
    // Reset form
    this.reset();
});

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#6366f1'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Typing effect for hero subtitle
const subtitle = document.querySelector('.hero-content .subtitle');
if (subtitle) {
    const text = subtitle.textContent;
    subtitle.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            subtitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    // Start typing effect after page load
    window.addEventListener('load', () => {
        setTimeout(typeWriter, 1000);
    });
}

// Add dynamic cursor effect
document.addEventListener('mousemove', (e) => {
    const cursor = document.querySelector('.custom-cursor');
    if (cursor) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    }
});

// Animate statistics on scroll
const animateStats = () => {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const targetValue = stat.textContent.replace(/[^\d]/g, '');
        if (targetValue) {
            const increment = Math.ceil(targetValue / 100);
            let current = 0;
            const timer = setInterval(() => {
                current += increment;
                if (current >= targetValue) {
                    current = targetValue;
                    clearInterval(timer);
                }
                stat.textContent = current + (stat.textContent.includes('+') ? '+' : '') + 
                                 (stat.textContent.includes('%') ? '%' : '');
            }, 20);
        }
    });
};

// Trigger stats animation when stats section is visible
const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statsObserver.observe(statsSection);
}

// Add scroll-to-top button
function createScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: none;
        background: var(--gradient-1);
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        opacity: 0;
        transform: translateY(100px);
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 5px 20px rgba(99, 102, 241, 0.3);
    `;
    
    document.body.appendChild(scrollBtn);
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.transform = 'translateY(0)';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.transform = 'translateY(100px)';
        }
    });
    
    // Scroll to top functionality
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effect
    scrollBtn.addEventListener('mouseenter', () => {
        scrollBtn.style.transform = 'translateY(-5px) scale(1.1)';
        scrollBtn.style.boxShadow = '0 10px 30px rgba(99, 102, 241, 0.4)';
    });
    
    scrollBtn.addEventListener('mouseleave', () => {
        scrollBtn.style.transform = 'translateY(0) scale(1)';
        scrollBtn.style.boxShadow = '0 5px 20px rgba(99, 102, 241, 0.3)';
    });
}

// Initialize scroll to top button
createScrollToTop();

// Add loading animation
function showLoadingAnimation() {
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = `
        <div class="loader-content">
            <div class="loader-spinner"></div>
            <div class="loader-text">Loading Portfolio...</div>
        </div>
    `;
    
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--dark-bg);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        transition: opacity 0.5s ease;
    `;
    
    // Add loader styles
    const loaderStyles = document.createElement('style');
    loaderStyles.textContent = `
        .loader-content {
            text-align: center;
            color: var(--text-primary);
        }
        
        .loader-spinner {
            width: 50px;
            height: 50px;
            border: 3px solid rgba(99, 102, 241, 0.3);
            border-top: 3px solid var(--primary);
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 1rem;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        .loader-text {
            font-size: 1.1rem;
            font-weight: 600;
            background: var(--gradient-1);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
    `;
    
    document.head.appendChild(loaderStyles);
    document.body.appendChild(loader);
    
    // Hide loader when page is loaded
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                if (document.body.contains(loader)) {
                    document.body.removeChild(loader);
                }
                if (document.head.contains(loaderStyles)) {
                    document.head.removeChild(loaderStyles);
                }
            }, 500);
        }, 1000);
    });
}

// Show loading animation
showLoadingAnimation();

// Add particle system
function createParticleSystem() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particles';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
    `;
    
    // Create particles
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: var(--primary);
            border-radius: 50%;
            opacity: 0.6;
            animation: float ${15 + Math.random() * 10}s infinite linear;
            left: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 15}s;
        `;
        particleContainer.appendChild(particle);
    }
    
    // Add particle animation styles
    const particleStyles = document.createElement('style');
    particleStyles.textContent = `
        @keyframes float {
            0% {
                transform: translateY(100vh) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 0.6;
            }
            90% {
                opacity: 0.6;
            }
            100% {
                transform: translateY(-100px) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    
    document.head.appendChild(particleStyles);
    document.body.appendChild(particleContainer);
}

// Initialize particle system
createParticleSystem();

// Add skills animation on hover
document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.05)';
        this.style.boxShadow = '0 10px 20px rgba(99, 102, 241, 0.3)';
    });
    
    tag.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = 'none';
    });
});

// Add project card flip effect
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const header = this.querySelector('.project-header');
        if (header) {
            header.style.transform = 'perspective(1000px) rotateX(10deg)';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        const header = this.querySelector('.project-header');
        if (header) {
            header.style.transform = 'perspective(1000px) rotateX(0deg)';
        }
    });
});

// Add dynamic text highlighting
function highlightText() {
    const highlights = document.querySelectorAll('.timeline-highlight');
    highlights.forEach((highlight, index) => {
        highlight.style.animationDelay = `${index * 0.2}s`;
        highlight.style.animation = 'pulse 2s ease-in-out infinite';
    });
}

// Add pulse animation for highlights
const pulseStyles = document.createElement('style');
pulseStyles.textContent = `
    @keyframes pulse {
        0%, 100% {
            background: rgba(99, 102, 241, 0.1);
        }
        50% {
            background: rgba(99, 102, 241, 0.2);
        }
    }
`;
document.head.appendChild(pulseStyles);

// Initialize text highlighting
highlightText();

// Add form validation
function validateForm() {
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value.trim()) {
                this.style.borderColor = '#ef4444';
                this.style.boxShadow = '0 0 10px rgba(239, 68, 68, 0.3)';
            } else {
                this.style.borderColor = 'var(--border)';
                this.style.boxShadow = 'none';
            }
        });
        
        input.addEventListener('focus', function() {
            this.style.borderColor = 'var(--primary)';
            this.style.boxShadow = '0 0 20px rgba(99, 102, 241, 0.3)';
        });
    });
}

// Initialize form validation
validateForm();

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu if open
        const navLinks = document.querySelector('.nav-links');
        const mobileMenu = document.querySelector('.mobile-menu');
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
    }
});

// Add focus trap for mobile menu
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    );
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];

    element.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusableElement) {
                    lastFocusableElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusableElement) {
                    firstFocusableElement.focus();
                    e.preventDefault();
                }
            }
        }
    });
}

// Add smooth reveal animations with stagger
function staggerRevealAnimations() {
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((element, index) => {
        element.style.transitionDelay = `${index * 0.1}s`;
    });
}

// Initialize stagger animations
staggerRevealAnimations();

// Add performance optimization - lazy load images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
lazyLoadImages();

// Add theme toggle and persistence
function updateToggleIcon(theme) {
    const toggleBtn = document.getElementById('theme-toggle');
    if (!toggleBtn) return;
    const icon = toggleBtn.querySelector('i');
    if (!icon) return;
    
    if (theme === 'light') {
        icon.className = 'fas fa-moon';
        icon.style.transform = 'rotate(360deg)';
    } else {
        icon.className = 'fas fa-sun';
        icon.style.transform = 'rotate(0deg)';
    }
}

function saveThemePreference(theme) {
    try {
        localStorage.setItem('theme', theme);
    } catch (e) {
        console.log('Could not save theme preference');
    }
}

function initThemeToggle() {
    const toggleBtn = document.getElementById('theme-toggle');
    if (!toggleBtn) return;
    
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Default theme is dark as defined in portfolio style
    let currentTheme = 'dark';
    if (savedTheme) {
        currentTheme = savedTheme;
    } else if (savedTheme === null && !prefersDark) {
        currentTheme = 'light';
    }
    
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateToggleIcon(currentTheme);
    
    toggleBtn.addEventListener('click', () => {
        const theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', theme);
        saveThemePreference(theme);
        updateToggleIcon(theme);
        
        // Track the theme change event
        if (typeof trackEvent === 'function') {
            trackEvent('theme_toggle_click', { theme: theme });
        }
    });
}

// Initialize theme toggle
initThemeToggle();

// Add intersection observer for better performance
function optimizeAnimations() {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (mediaQuery.matches) {
        // Disable animations for users who prefer reduced motion
        const style = document.createElement('style');
        style.textContent = `
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize animation optimization
optimizeAnimations();

console.log('Portfolio website loaded successfully! 🚀');
console.log('Built with ❤️ by Samuel Edu');

// Analytics helper (placeholder)
function trackEvent(eventName, properties = {}) {
    console.log(`Event tracked: ${eventName}`, properties);
    // Add your analytics tracking code here
}

// Track page interactions
document.addEventListener('click', (e) => {
    if (e.target.matches('a[href^="#"]')) {
        trackEvent('navigation_click', {
            section: e.target.getAttribute('href')
        });
    }
    
    if (e.target.matches('.project-link')) {
        trackEvent('project_link_click', {
            project: e.target.closest('.project-card').querySelector('.project-title').textContent
        });
    }
});

// ==========================================
// Demo Showcase Modal & Slide Reels Controller
// ==========================================

const demoModal = document.getElementById('demo-modal');
const demoModalClose = document.getElementById('demo-modal-close');
const demoModalContent = document.getElementById('demo-modal-content');
const demoModalOverlay = demoModal ? demoModal.querySelector('.demo-modal-overlay') : null;

// Demo content registry
const demoContents = {
    'polka-evm-app': {
        title: 'Polka-EVM-App',
        tech: ['Solidity', 'TypeScript', 'React', 'Polkadot API', 'Ethers.js'],
        slides: [
            {
                title: 'Smart Contract Compilation & Deployment',
                desc: 'Compiling Solidity smart contracts and deploying them directly onto Polkadot Parachain EVM networks (e.g. Moonbeam, Astar).',
                visual: `<div class="console-terminal" id="polka-terminal-1">
                    <div class="console-line">> contracts/Compiling ERC-20 Ledger token...</div>
                </div>`,
                interactive: `<button class="btn-inline-demo" id="btn-compile-demo"><i class="fas fa-hammer"></i> Run Compile & Deploy</button>`
            },
            {
                title: 'Web3 Wallet Handshake',
                desc: 'Connecting decentralized browser extensions (like MetaMask or Polkadot.js) and matching EVM account keys for state access.',
                visual: `<div class="wallet-mock-container" style="display:flex; flex-direction:column; align-items:center; gap:1rem; width:80%;">
                    <div id="wallet-status-box" style="padding:1rem; border-radius:10px; background:rgba(255,255,255,0.05); border:1px dashed var(--border); width:100%; text-align:center;">
                        <i class="fas fa-wallet" style="font-size:2rem; margin-bottom:0.5rem; color:var(--primary);"></i>
                        <div>Wallet Status: <strong>Disconnected</strong></div>
                    </div>
                </div>`,
                interactive: `<button class="btn-inline-demo" id="btn-wallet-connect-demo"><i class="fas fa-plug"></i> Connect Mock Wallet</button>`
            },
            {
                title: 'EVM Contract Interaction (State Writes)',
                desc: 'Sending transaction payloads to modify smart contract storage, listening for block emission events, and rendering real-time UI state updates.',
                visual: `<div class="interaction-mock-container" style="display:flex; flex-direction:column; gap:0.75rem; width:90%;">
                    <div class="form-group" style="margin-bottom:0px; width: 100%;">
                        <input type="text" id="contract-greet-input" placeholder="Enter greeting..." value="Hello Polkadot EVM!" style="padding:0.7rem; font-size:0.9rem; width:100%; border-radius:8px; border:1px solid var(--border); background:rgba(26,26,46,0.4); color:var(--text-primary);">
                    </div>
                    <div id="contract-response-box" style="padding:0.8rem; background:rgba(16,185,129,0.1); border:1px solid rgba(16,185,129,0.2); border-radius:8px; display:none; text-align:left; font-family:monospace; font-size:0.85rem; color:#10b981; width:100%;">
                    </div>
                </div>`,
                interactive: `<button class="btn-inline-demo" id="btn-contract-call-demo"><i class="fas fa-paper-plane"></i> Execute Write (greet)</button>`
            }
        ]
    },
    'verydot-core': {
        title: 'VeryDot-Core P2P Protocol',
        tech: ['Rust', 'Substrate', 'P2P Net', 'Escrow Account', 'Polkadot Relay'],
        slides: [
            {
                title: 'Decentralized P2P Node Handshake',
                desc: 'Establishing secure peer connections between buyers, sellers, and oracle nodes across the Substrate network.',
                visual: `<div class="flowchart-container" id="p2p-flowchart">
                    <div class="flowchart-node" id="node-buyer"><i class="fas fa-user" style="margin-bottom: 4px;"></i>Buyer Node</div>
                    <div class="flowchart-arrow"><i class="fas fa-exchange-alt"></i></div>
                    <div class="flowchart-node" id="node-relay"><i class="fas fa-network-wired" style="margin-bottom: 4px;"></i>P2P Relay</div>
                    <div class="flowchart-arrow"><i class="fas fa-exchange-alt"></i></div>
                    <div class="flowchart-node" id="node-seller"><i class="fas fa-user-tie" style="margin-bottom: 4px;"></i>Seller Node</div>
                </div>`,
                interactive: `<button class="btn-inline-demo" id="btn-handshake-demo"><i class="fas fa-sync-alt"></i> Execute Handshake</button>`
            },
            {
                title: 'Escrow Lockup & Vault Staking',
                desc: 'Depositing assets into a smart substrate multisig vault where funds are securely frozen pending transaction verification.',
                visual: `<div class="escrow-visual-container" style="text-align:center;">
                    <div id="vault-status" style="font-size:3rem; color:var(--text-secondary); margin-bottom:1rem; transition:color 0.5s;">
                        <i class="fas fa-lock"></i>
                    </div>
                    <div id="vault-text" style="font-weight:600;">Vault Status: Locked</div>
                </div>`,
                interactive: `<button class="btn-inline-demo" id="btn-vault-lock-demo"><i class="fas fa-unlock-alt"></i> Unlock / Reset Escrow</button>`
            },
            {
                title: 'P2P Hash Verification',
                desc: 'Validating product file integrity on the buyer side by comparing cryptographic SHA-256 hashes against substrate-anchored receipts.',
                visual: `<div class="hash-visual-container" style="display:flex; flex-direction:column; gap:0.5rem; width:80%; text-align:left; font-family:monospace; font-size:0.85rem; word-break:break-all;">
                    <div>Expected Hash: <span style="color:var(--primary); font-weight:700;">f8c4e2a9b70d51f67f2b189a05de23789ccb8ef091102ef</span></div>
                    <div>Computed Hash: <span id="computed-hash-val" style="color:var(--text-secondary);">Waiting verification...</span></div>
                    <div id="hash-match-status" style="font-weight:700; margin-top:0.5rem; text-align:center;"></div>
                </div>`,
                interactive: `<button class="btn-inline-demo" id="btn-verify-hash-demo"><i class="fas fa-fingerprint"></i> Compute & Verify Hash</button>`
            },
            {
                title: 'Block Settlement & Payout Release',
                desc: 'Broadcasting confirmation signatures to the blockchain, triggering smart payout transfers to the seller, and recording metrics.',
                visual: `<div class="settle-visual-container" style="width:90%;">
                    <div id="block-settle-logs" class="console-terminal" style="height:140px;">
                        <div class="console-line">Ready for block submission...</div>
                    </div>
                </div>`,
                interactive: `<button class="btn-inline-demo" id="btn-settle-demo"><i class="fas fa-check-circle"></i> Broadcast Settlement</button>`
            }
        ]
    },
    'ai-text-processor': {
        title: 'AI-Powered Text Processor',
        tech: ['TypeScript', 'LangChain', 'AI Agents', 'OpenRouter', 'Deno Edge'],
        isPlayground: true
    }
};

// Open Modal
function openDemoModal(demoId) {
    if (!demoModal || !demoModalContent) return;
    
    const data = demoContents[demoId];
    if (!data) return;
    
    document.body.style.overflow = 'hidden';
    demoModal.classList.add('active');
    
    if (data.isPlayground) {
        renderPlaygroundView(data);
    } else {
        renderSlideReelView(data);
    }
}

// Close Modal
function closeDemoModal() {
    if (!demoModal) return;
    demoModal.classList.remove('active');
    document.body.style.overflow = '';
    if (demoModalContent) demoModalContent.innerHTML = '';
}

if (demoModalClose) demoModalClose.addEventListener('click', closeDemoModal);
if (demoModalOverlay) demoModalOverlay.addEventListener('click', closeDemoModal);

// Intercept Demo links click
document.addEventListener('click', (e) => {
    const demoLink = e.target.closest('a[data-demo]');
    if (demoLink) {
        e.preventDefault();
        const demoId = demoLink.getAttribute('data-demo');
        openDemoModal(demoId);
    }
});

// Slide Reel Renderer
let currentSlideIndex = 0;
function renderSlideReelView(data) {
    currentSlideIndex = 0;
    
    const techBadges = data.tech.map(t => `<span class="tech-badge">${t}</span>`).join('');
    
    let slidesHtml = '';
    let dotsHtml = '';
    
    data.slides.forEach((slide, idx) => {
        slidesHtml += `
            <div class="carousel-slide ${idx === 0 ? 'active' : ''}" data-index="${idx}">
                <div class="slide-visual">
                    ${slide.visual}
                </div>
                <div class="slide-caption-title">${slide.title}</div>
                <div class="slide-caption-desc">${slide.desc}</div>
                <div class="slide-interactive-element">
                    ${slide.interactive}
                </div>
            </div>
        `;
        dotsHtml += `<div class="slide-dot ${idx === 0 ? 'active' : ''}" data-index="${idx}"></div>`;
    });
    
    demoModalContent.innerHTML = `
        <div class="reel-header">
            <h3>${data.title} - Showcase Reel</h3>
            <div class="tech-badge-container">
                ${techBadges}
            </div>
        </div>
        <div class="reel-body">
            <div class="carousel-slides-wrapper">
                ${slidesHtml}
            </div>
        </div>
        <div class="reel-footer">
            <button class="btn-nav-slide" id="btn-prev-slide" disabled><i class="fas fa-chevron-left"></i> Previous</button>
            <div class="slide-dots">
                ${dotsHtml}
            </div>
            <button class="btn-nav-slide" id="btn-next-slide">Next <i class="fas fa-chevron-right"></i></button>
        </div>
    `;
    
    // Bind navigation buttons
    const prevBtn = document.getElementById('btn-prev-slide');
    const nextBtn = document.getElementById('btn-next-slide');
    const slides = demoModalContent.querySelectorAll('.carousel-slide');
    const dots = demoModalContent.querySelectorAll('.slide-dot');
    
    const updateSlideView = () => {
        slides.forEach((slide, idx) => {
            if (idx === currentSlideIndex) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
        dots.forEach((dot, idx) => {
            if (idx === currentSlideIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
        
        prevBtn.disabled = currentSlideIndex === 0;
        nextBtn.disabled = currentSlideIndex === data.slides.length - 1;
        
        // Execute slide load-in triggers
        initSlideInteractive(data.title, currentSlideIndex);
    };
    
    prevBtn.addEventListener('click', () => {
        if (currentSlideIndex > 0) {
            currentSlideIndex--;
            updateSlideView();
        }
    });
    
    nextBtn.addEventListener('click', () => {
        if (currentSlideIndex < data.slides.length - 1) {
            currentSlideIndex++;
            updateSlideView();
        }
    });
    
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            currentSlideIndex = parseInt(dot.getAttribute('data-index'));
            updateSlideView();
        });
    });
    
    // Initial load
    initSlideInteractive(data.title, 0);
}

// Slide Interactive simulation triggers
function initSlideInteractive(projectTitle, slideIdx) {
    if (projectTitle.includes('Polka-EVM-App')) {
        if (slideIdx === 0) {
            const btn = document.getElementById('btn-compile-demo');
            const term = document.getElementById('polka-terminal-1');
            if (btn && term) {
                btn.onclick = () => {
                    btn.disabled = true;
                    term.innerHTML = '';
                    const logs = [
                        '> solidity compiler version: 0.8.20+commit.a1b2c3d4',
                        '> Compiling standard ERC-20 Ledger token (Ledger.sol)...',
                        '> ABI generated successfully. Bytecode compiled: 4326 bytes.',
                        '> Connecting to Moonbeam Alpha Parachain Node...',
                        '> Sending EVM contract creation transaction (gas price: 100 Gwei)...',
                        '> Broadcasted. Waiting for block inclusion...',
                        '> Transaction Hash: 0xa87c92b3d881ef126588a45e99812b109e25c04b8686e58cf7b6c7aef516c29a',
                        '> Block Mined! Contract deployed at address: 0x4f3aE8c6B999a0E927c3f81eEa2B3D55c2826a7E',
                        '> SUCCESS: Polka EVM contract instance active!'
                    ];
                    let delay = 0;
                    logs.forEach((line) => {
                        setTimeout(() => {
                            const lDiv = document.createElement('div');
                            lDiv.className = 'console-line';
                            lDiv.textContent = line;
                            term.appendChild(lDiv);
                            term.scrollTop = term.scrollHeight;
                        }, delay);
                        delay += 300;
                    });
                    setTimeout(() => { btn.disabled = false; }, delay);
                };
            }
        } else if (slideIdx === 1) {
            const btn = document.getElementById('btn-wallet-connect-demo');
            const box = document.getElementById('wallet-status-box');
            if (btn && box) {
                btn.onclick = () => {
                    btn.disabled = true;
                    box.innerHTML = `<i class="fas fa-spinner fa-spin" style="font-size:2rem; margin-bottom:0.5rem; color:var(--primary);"></i><div>Connecting MetaMask extension...</div>`;
                    setTimeout(() => {
                        box.innerHTML = `
                            <i class="fas fa-check-circle" style="font-size:2rem; margin-bottom:0.5rem; color:#10b981;"></i>
                            <div>Wallet Connected: <strong style="font-family:monospace; color:#10b981;">0x71C4B441F1A3A9b7297e700dE047b47409893530</strong></div>
                            <div style="font-size:0.85rem; color:var(--text-secondary); margin-top:0.25rem;">Network: Moonbase Alpha (EVM-1287)</div>
                        `;
                        btn.innerHTML = `<i class="fas fa-unlink"></i> Disconnect Wallet`;
                        btn.disabled = false;
                        btn.onclick = () => {
                            btn.innerHTML = `<i class="fas fa-plug"></i> Connect Mock Wallet`;
                            box.innerHTML = `
                                <i class="fas fa-wallet" style="font-size:2rem; margin-bottom:0.5rem; color:var(--primary);"></i>
                                <div>Wallet Status: <strong>Disconnected</strong></div>
                            `;
                            initSlideInteractive(projectTitle, slideIdx);
                        };
                    }, 1200);
                };
            }
        } else if (slideIdx === 2) {
            const btn = document.getElementById('btn-contract-call-demo');
            const input = document.getElementById('contract-greet-input');
            const resp = document.getElementById('contract-response-box');
            if (btn && input && resp) {
                btn.onclick = () => {
                    const txt = input.value.trim() || 'Hello EVM!';
                    btn.disabled = true;
                    resp.style.display = 'block';
                    resp.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Dispatching greet("${txt}") transaction...`;
                    setTimeout(() => {
                        resp.innerHTML = `
                            <div style="margin-bottom:0.25rem; font-weight:700; color:#10b981;">✔ Tx Confirmed in Block #284712</div>
                            <div>Storage set -> greeting = "${txt}"</div>
                            <div style="color:var(--text-secondary); font-size:0.8rem; margin-top:0.2rem;">Gas Used: 43,261 Gwei | Block Hash: 0xf37...b2a</div>
                        `;
                        btn.disabled = false;
                    }, 1400);
                };
            }
        }
    } else if (projectTitle.includes('VeryDot-Core')) {
        if (slideIdx === 0) {
            const btn = document.getElementById('btn-handshake-demo');
            const buyer = document.getElementById('node-buyer');
            const relay = document.getElementById('node-relay');
            const seller = document.getElementById('node-seller');
            if (btn && buyer && relay && seller) {
                btn.onclick = () => {
                    btn.disabled = true;
                    buyer.className = 'flowchart-node highlight';
                    setTimeout(() => {
                        relay.className = 'flowchart-node highlight';
                        setTimeout(() => {
                            seller.className = 'flowchart-node highlight';
                            btn.innerHTML = `<i class="fas fa-link"></i> Handshake Established`;
                            setTimeout(() => {
                                buyer.className = 'flowchart-node';
                                relay.className = 'flowchart-node';
                                seller.className = 'flowchart-node';
                                btn.innerHTML = `<i class="fas fa-sync-alt"></i> Execute Handshake`;
                                btn.disabled = false;
                            }, 2000);
                        }, 500);
                    }, 500);
                };
            }
        } else if (slideIdx === 1) {
            const btn = document.getElementById('btn-vault-lock-demo');
            const icon = document.getElementById('vault-status');
            const text = document.getElementById('vault-text');
            if (btn && icon && text) {
                btn.onclick = () => {
                    btn.disabled = true;
                    icon.style.color = '#10b981';
                    icon.innerHTML = `<i class="fas fa-lock"></i>`;
                    text.innerHTML = `Vault Locked: <span style="color:#10b981;">1,250 DOT Deposited</span>`;
                    btn.innerHTML = `<i class="fas fa-unlock-alt"></i> Unlock / Reset Escrow`;
                    btn.disabled = false;
                    btn.onclick = () => {
                        icon.style.color = 'var(--text-secondary)';
                        icon.innerHTML = `<i class="fas fa-lock-open"></i>`;
                        text.innerHTML = 'Vault Status: Unlocked';
                        btn.innerHTML = `<i class="fas fa-key"></i> Lock Funds in Escrow`;
                        initSlideInteractive(projectTitle, slideIdx);
                    };
                };
            }
        } else if (slideIdx === 2) {
            const btn = document.getElementById('btn-verify-hash-demo');
            const computed = document.getElementById('computed-hash-val');
            const status = document.getElementById('hash-match-status');
            if (btn && computed && status) {
                btn.onclick = () => {
                    btn.disabled = true;
                    computed.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Digesting product binary...`;
                    status.innerHTML = '';
                    setTimeout(() => {
                        computed.innerHTML = `<span style="color:#10b981; font-weight:700;">f8c4e2a9b70d51f67f2b189a05de23789ccb8ef091102ef</span>`;
                        status.innerHTML = `<i class="fas fa-check-circle" style="color:#10b981;"></i> Cryptographic checksum match verified!`;
                        btn.disabled = false;
                    }, 1200);
                };
            }
        } else if (slideIdx === 3) {
            const btn = document.getElementById('btn-settle-demo');
            const term = document.getElementById('block-settle-logs');
            if (btn && term) {
                btn.onclick = () => {
                    btn.disabled = true;
                    term.innerHTML = '';
                    const logs = [
                        '> Initiating settlement dispatch protocol...',
                        '> Collecting signature shares from escrow oracles...',
                        '> Signature 1 (Buyer): Verified (0x8ef4...21a)',
                        '> Signature 2 (Seller): Verified (0x4cb9...88d)',
                        '> Combining witness claims & generating block extrinsics...',
                        '> Submitting extrinsic to Polkadot VeryDot Parachain...',
                        '> Block #4,182,752 validated successfully.',
                        '> 1,250 DOT disbursed to seller account 0x92f...7e4.',
                        '> Settlement finalized.'
                    ];
                    let delay = 0;
                    logs.forEach((line) => {
                        setTimeout(() => {
                            const lDiv = document.createElement('div');
                            lDiv.className = 'console-line';
                            lDiv.textContent = line;
                            term.appendChild(lDiv);
                            term.scrollTop = term.scrollHeight;
                        }, delay);
                        delay += 250;
                    });
                    setTimeout(() => { btn.disabled = false; }, delay);
                };
            }
        }
    }
}

// Mini AI Playground Renderer
const presets = {
    summarize: "This Software as a Service Agreement ('Agreement') is entered into by and between CloudSaaS Corp ('Provider') and AcmeTech LLC ('Customer'). Provider agrees to deliver enterprise-grade cloud analytics tools, offering 99.9% uptime SLA and 24/7 dedicated engineering support. Customer will pay a recurring subscription fee of $4,500/month, payable within 30 days of invoicing. Either party may terminate with a 60-day written notice.",
    entities: "Samuel Edu is a Full Stack Developer, DevOps Engineer, and AI Agents Developer based in Nigeria. He is the co-founder of Genuine Stuffs and specializes in React, Node.js, and Substrate blockchain infrastructure.",
    sentiment: "I absolutely love the new workspace layout! The design is extremely premium, fonts are highly readable, and the light/dark mode transitions are so smooth. Best update ever!"
};

const simulatedResponses = {
    summarizer: `### AI Summarization Output

**Core Document:** SaaS Agreement between CloudSaaS Corp (Provider) and AcmeTech LLC (Customer).

**Key Provisions:**
- **Service Offering:** Cloud analytics tools with a **99.9% uptime SLA** and 24/7 support.
- **Pricing:** **$4,500/month** subscription fee (30-day payment term).
- **Termination Term:** Requires **60-day written notice** by either party.`,
    
    extractor: `{
  "document_type": "professional_bio",
  "entities": [
    {
      "name": "Samuel Edu",
      "type": "Person",
      "roles": [
        "Full Stack Developer",
        "DevOps Engineer",
        "AI Agents Developer",
        "Co-founder"
      ]
    },
    {
      "name": "Nigeria",
      "type": "Location",
      "role": "Country of residence/work"
    },
    {
      "name": "Genuine Stuffs",
      "type": "Organization",
      "role": "Co-founded enterprise"
    },
    {
      "name": "React, Node.js, Substrate",
      "type": "Technologies",
      "role": "Technical specializations"
    }
  ]
}`,
    
    sentiment: `### Sentiment Analysis Report

- **Overall Sentiment Rating:** **98/100** (Strongly Positive)
- **Primary Emotions Detected:** Satisfaction, Enthusiasm, Appreciation.
- **Key Extractable Drivers:**
  1. *Workspace layout* ("absolutely love")
  2. *Visual Aesthetics* ("extremely premium")
  3. *Typography/Readability* ("highly readable")
  4. *Transitions* ("so smooth")`
};

function renderPlaygroundView(data) {
    demoModalContent.innerHTML = `
        <div class="reel-header">
            <h3>${data.title} - Mini AI Playground</h3>
            <div class="tech-badge-container">
                ${data.tech.map(t => `<span class="tech-badge">${t}</span>`).join('')}
            </div>
            <p style="font-size:0.95rem; color:var(--text-secondary); margin-bottom: 0.5rem;">Test out the core capabilities of the AI Agent-driven text pipeline below. Select an agent, choose a preset, or write your own text to execute.</p>
        </div>
        
        <div class="playground-container">
            <div class="playground-input-group">
                <label for="playground-text" style="font-size: 0.9rem; font-weight: 700;">Input Text</label>
                <textarea id="playground-text" class="playground-textarea" placeholder="Enter text here...">${presets.summarize}</textarea>
            </div>
            
            <div class="playground-presets">
                <span class="preset-chip" data-preset="summarize">SaaS Contract (Summarize)</span>
                <span class="preset-chip" data-preset="entities">Bio Profile (Extract Entities)</span>
                <span class="preset-chip" data-preset="sentiment">User Feedback (Sentiment Analysis)</span>
            </div>
            
            <div class="playground-config-row">
                <div class="agent-selector">
                    <button class="agent-btn active" data-agent="summarizer">Summarizer Agent</button>
                    <button class="agent-btn" data-agent="extractor">Entity Extractor</button>
                    <button class="agent-btn" data-agent="sentiment">Sentiment Analyzer</button>
                </div>
                <button class="btn-play-run" id="btn-run-ai">
                    <i class="fas fa-play"></i> Run Agent Pipeline
                </button>
            </div>
            
            <div class="playground-trace-panel" id="playground-trace">
                <div class="trace-line system"><i class="fas fa-terminal"></i> Ready to run agent execution trace...</div>
            </div>
            
            <div class="playground-output-area">
                <div class="output-header-row">
                    <span style="font-size: 0.9rem; font-weight: 700;">Structured Output</span>
                    <button class="btn-inline-demo" id="btn-copy-output" style="padding:0.35rem 0.75rem; font-size:0.8rem; display:none;"><i class="fas fa-copy"></i> Copy</button>
                </div>
                <div class="playground-output-box empty" id="playground-output">
                    Click 'Run Agent Pipeline' to see results.
                </div>
            </div>
        </div>
    `;
    
    // Selectors
    const textarea = document.getElementById('playground-text');
    const runBtn = document.getElementById('btn-run-ai');
    const tracePanel = document.getElementById('playground-trace');
    const outputBox = document.getElementById('playground-output');
    const copyBtn = document.getElementById('btn-copy-output');
    const chips = demoModalContent.querySelectorAll('.preset-chip');
    const agentBtns = demoModalContent.querySelectorAll('.agent-btn');
    
    let activeAgent = 'summarizer';
    
    // Preset chip triggers
    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            const key = chip.getAttribute('data-preset');
            textarea.value = presets[key];
            
            // Auto match agent type
            agentBtns.forEach(btn => btn.classList.remove('active'));
            if (key === 'summarize') {
                activeAgent = 'summarizer';
                document.querySelector('[data-agent="summarizer"]').classList.add('active');
            } else if (key === 'entities') {
                activeAgent = 'extractor';
                document.querySelector('[data-agent="extractor"]').classList.add('active');
            } else if (key === 'sentiment') {
                activeAgent = 'sentiment';
                document.querySelector('[data-agent="sentiment"]').classList.add('active');
            }
        });
    });
    
    // Agent buttons toggle
    agentBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            agentBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeAgent = btn.getAttribute('data-agent');
        });
    });
    
    // Copy output
    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(outputBox.textContent).then(() => {
            copyBtn.innerHTML = `<i class="fas fa-check"></i> Copied!`;
            setTimeout(() => {
                copyBtn.innerHTML = `<i class="fas fa-copy"></i> Copy`;
            }, 2000);
        });
    });
    
    // Run Simulated AI
    runBtn.addEventListener('click', () => {
        const textValue = textarea.value.trim();
        if (!textValue) {
            showNotification('Please enter some text in the input box first.', 'info');
            return;
        }
        
        // Disable UX
        textarea.disabled = true;
        runBtn.disabled = true;
        chips.forEach(c => c.style.pointerEvents = 'none');
        agentBtns.forEach(b => b.disabled = true);
        copyBtn.style.display = 'none';
        
        outputBox.innerHTML = '';
        outputBox.classList.add('empty');
        outputBox.textContent = 'Agent running...';
        
        // Trace logs sequence
        tracePanel.innerHTML = '';
        const steps = [
            { t: 0, text: `[System] Bootstrapping AI sandbox env...`, type: 'system' },
            { t: 400, text: `[Agent] Initializing LangChain core execution flow for ${activeAgent}...`, type: 'agent' },
            { t: 900, text: `[Agent] Pre-processing input (character count: ${textValue.length})...`, type: 'agent' },
            { t: 1400, text: `[System] Sending prompts to OpenRouter inference API (model: meta-llama/llama-3-8b-instruct)...`, type: 'system' },
            { t: 2000, text: `[System] Fetching completion response headers...`, type: 'system' },
            { t: 2500, text: `[Agent] Structuring output and parsing raw completion schema...`, type: 'agent' },
            { t: 3000, text: `[System] Execution finished in 3042ms. Output schema verified.`, type: 'success' }
        ];
        
        steps.forEach(step => {
            setTimeout(() => {
                const line = document.createElement('div');
                line.className = `trace-line ${step.type}`;
                
                let iconClass = 'fa-terminal';
                if (step.type === 'agent') iconClass = 'fa-robot';
                if (step.type === 'success') iconClass = 'fa-check';
                
                line.innerHTML = `<i class="fas ${iconClass}"></i><span>${step.text}</span>`;
                tracePanel.appendChild(line);
                tracePanel.scrollTop = tracePanel.scrollHeight;
            }, step.t);
        });
        
        // Final Output Typewriter emission
        setTimeout(() => {
            outputBox.innerHTML = '';
            outputBox.classList.remove('empty');
            const targetOutput = simulatedResponses[activeAgent];
            
            let charIndex = 0;
            const speed = 6; // Typing speed in ms
            
            const typeText = () => {
                if (charIndex < targetOutput.length) {
                    outputBox.innerHTML += targetOutput.charAt(charIndex);
                    charIndex++;
                    outputBox.scrollTop = outputBox.scrollHeight;
                    setTimeout(typeText, speed);
                } else {
                    // Re-enable UI controls
                    textarea.disabled = false;
                    runBtn.disabled = false;
                    chips.forEach(c => c.style.pointerEvents = 'auto');
                    agentBtns.forEach(b => b.disabled = false);
                    copyBtn.style.display = 'block';
                }
            };
            
            typeText();
            
        }, 3100);
    });
}

// Add error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
});

// Add resize handler for responsive adjustments
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Recalculate animations and layouts if needed
        console.log('Window resized, adjusting layout...');
    }, 250);
});