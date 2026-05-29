/**
 * PAKE YOUTUBE ENHANCER
 * Aggressive, lightweight ad-blocker
 */

(function() {
    'use strict';

    const cleanYouTube = () => {
        // --- 1. HANDLE VIDEO ADS ---
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
            video.playbackRate = 16.0; // Play at 16x speed
            video.currentTime = video.duration || 9999; // Jump to the end
        }

        // --- 2. HIDE VISUAL/BANNER ADS ---
        const adSelectors = [
            'ytd-ad-slot-renderer',
            'ytd-banner-promo-renderer',
            'ytd-player-legacy-desktop-watch-ads-renderer',
            '.ytd-promoted-sparkles-web-renderer',
            '#masthead-ad',
            '#player-ads'
        ];

        adSelectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(ad => {
                // Use display: none !important to ensure YouTube's CSS doesn't override it
                ad.style.setProperty('display', 'none', 'important'); 
            });
        });
    };

    // Run the cleaner every 100 milliseconds to catch ads the second they appear
    setInterval(cleanYouTube, 100);

    console.log("Pake YouTube Ad-Blocker Injected Successfully.");
})();
