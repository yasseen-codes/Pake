/**
 * PAKE YOUTUBE ENHANCER (V3)
 * The Nuclear Ad-Skipper (Bypasses "Waiting for Click" freezes)
 */

(function() {
    'use strict';

    // --- 1. COLLAPSE EMPTY AD SPACES ---
    const injectLayoutFixer = () => {
        if (document.getElementById('pake-ad-block-css')) return;
        
        const style = document.createElement('style');
        style.id = 'pake-ad-block-css';
        style.textContent = `
            #masthead-ad, #player-ads, ytd-ad-slot-renderer, 
            ytd-banner-promo-renderer, ytd-player-legacy-desktop-watch-ads-renderer, 
            .ytd-promoted-sparkles-web-renderer, ytd-compact-promoted-video-renderer, 
            ytd-in-feed-ad-layout-renderer, ytd-rich-item-renderer:has(ytd-ad-slot-renderer),
            ytd-popup-container:has(ytd-premium-promo-dialog-renderer) {
                display: none !important; height: 0 !important; width: 0 !important;
            }
        `;
        document.head.appendChild(style);
    };

    // --- 2. THE NUCLEAR SKIPPER ---
    const skipAds = () => {
        // A. Handle the video player directly
        const video = document.querySelector('video');
        const player = document.querySelector('#movie_player');
        
        // Check if YouTube's player states an ad is interrupting
        const isAdShowing = player && (player.classList.contains('ad-showing') || player.classList.contains('ad-interrupting'));

        if (isAdShowing && video) {
            video.muted = true; // Mute immediately
            if (!isNaN(video.duration) && video.duration > 0) {
                // Force the video to 0.1 seconds before the end
                video.currentTime = video.duration - 0.1;
                video.playbackRate = 16.0; 
            }
        }

        // B. Simulate real physical mouse clicks on EVERY known skip button
        const skipButtonSelectors = [
            '.ytp-ad-skip-button',
            '.ytp-ad-skip-button-modern',
            '.ytp-skip-ad-button',
            '.ytp-ad-skip-button-text',
            '.videoAdUiSkipButton',
            '[id^="skip-button:"]',
            '.ytp-ad-overlay-close-button'
        ];

        skipButtonSelectors.forEach(selector => {
            const buttons = document.querySelectorAll(selector);
            buttons.forEach(btn => {
                // Standard click
                btn.click(); 
                
                // Synthetic mouse click to bypass YouTube's anti-bot detection
                btn.dispatchEvent(new MouseEvent('click', {
                    view: window,
                    bubbles: true,
                    cancelable: true
                }));
            });
        });
        
        // C. Clear static overlay ads that sit on the bottom of the video
        const overlays = document.querySelectorAll('.ytp-ad-overlay-container');
        overlays.forEach(overlay => {
            overlay.style.display = 'none';
        });
    };

    // --- 3. INITIALIZE ---
    injectLayoutFixer();
    
    // Run extremely fast (every 50ms) to catch the button before the player freezes
    setInterval(skipAds, 50);

    console.log("Pake YouTube Enhancer V3: Nuclear Ad-Blocker Active.");
})();
