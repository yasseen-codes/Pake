/**
 * PAKE YOUTUBE ENHANCER
 * Aggressive ad-blocker + Empty space collapser
 */

(function() {
    'use strict';

    // --- 1. COLLAPSE EMPTY AD SPACES (CSS INJECTION) ---
    // This permanently removes the invisible boxes that leave gaps in the layout.
    const injectLayoutFixer = () => {
        if (document.getElementById('pake-ad-block-css')) return;
        
        const style = document.createElement('style');
        style.id = 'pake-ad-block-css';
        style.textContent = `
            /* Hide banner ads, sidebar ads, and their containers */
            #masthead-ad, 
            #player-ads, 
            #panels:has(ytd-ads-engagement-panel-content-renderer),
            ytd-ad-slot-renderer,
            ytd-banner-promo-renderer,
            ytd-player-legacy-desktop-watch-ads-renderer,
            .ytd-promoted-sparkles-web-renderer,
            ytd-compact-promoted-video-renderer,
            ytd-in-feed-ad-layout-renderer,
            
            /* Hide the actual empty grid slots on the homepage */
            ytd-rich-item-renderer:has(ytd-ad-slot-renderer),
            ytd-rich-section-renderer:has(ytd-statement-banner-renderer),
            
            /* Kill the annoying "Try YouTube Premium" pop-ups */
            tp-yt-paper-dialog:has(yt-mealbar-promo-renderer) {
                display: none !important;
                height: 0 !important;
                width: 0 !important;
                margin: 0 !important;
                padding: 0 !important;
            }
        `;
        document.head.appendChild(style);
    };

    // --- 2. HANDLE VIDEO ADS INSTANTLY ---
    // Fast-forwards and clicks "Skip" before you even see them.
    const skipVideoAds = () => {
        const video = document.querySelector('video');
        const skipBtn = document.querySelector('.ytp-ad-skip-button, .ytp-ad-skip-button-modern, .ytp-skip-ad-button');
        const adOverlay = document.querySelector('.ytp-ad-overlay-close-button');

        // Click standard skip buttons instantly
        if (skipBtn) {
            skipBtn.click();
        } 
        // Close pop-up banner overlays over the video
        else if (adOverlay) {
            adOverlay.click();
        }
        // If an unskippable ad is playing, fast-forward it to the end
        else if (document.querySelector('.ad-showing') && video && !isNaN(video.duration)) {
            video.playbackRate = 16.0; 
            video.currentTime = video.duration || 9999; 
        }
    };

    // --- 3. INITIALIZE ---
    // Inject the CSS once
    injectLayoutFixer();
    
    // Run the video skipper every 100 milliseconds
    setInterval(skipVideoAds, 100);

    console.log("Pake YouTube Enhancer: Ads blocked and layout collapsed.");
})();
