export function loadYouTubeAPI(): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") return;
    
    if (window.YT && window.YT.Player) {
      resolve();
      return;
    }

    // Check if script is already added
    const existingScript = document.getElementById("youtube-iframe-api");
    if (existingScript) {
      // Just wait for it to load
      const originalCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (originalCallback) originalCallback();
        resolve();
      };
      return;
    }

    const script = document.createElement("script");
    script.id = "youtube-iframe-api";
    script.src = "https://www.youtube.com/iframe_api";
    script.async = true;

    window.onYouTubeIframeAPIReady = () => {
      resolve();
    };

    document.body.appendChild(script);
  });
}
