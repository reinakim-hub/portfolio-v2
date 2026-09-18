"use client";

import { useEffect, useRef } from "react";

type Player = {
  mute: () => void;
  playVideo: () => void;
  getIframe: () => HTMLIFrameElement;
  getOptions: (module: string) => string[];
  getOption: (module: string, option: string) => { languageCode?: string } | undefined;
  setOption: (module: string, option: string, value: object) => void;
  destroy: () => void;
};
type PlayerEvent = { target: Player; data?: number };
type YouTubeApi = {
  Player: new (iframe: HTMLIFrameElement, options: {
    events: {
      onReady: (event: PlayerEvent) => void;
      onApiChange: (event: PlayerEvent) => void;
      onStateChange: (event: PlayerEvent) => void;
    };
  }) => Player;
};
type YouTubeWindow = Window & {
  YT?: YouTubeApi;
  onYouTubeIframeAPIReady?: () => void;
};

let apiPromise: Promise<YouTubeApi> | undefined;

function loadApi() {
  const youtubeWindow = window as YouTubeWindow;
  if (youtubeWindow.YT?.Player) return Promise.resolve(youtubeWindow.YT);
  if (!apiPromise) {
    apiPromise = new Promise<YouTubeApi>((resolve, reject) => {
      const previousReady = youtubeWindow.onYouTubeIframeAPIReady;
      youtubeWindow.onYouTubeIframeAPIReady = () => {
        previousReady?.();
        if (youtubeWindow.YT) resolve(youtubeWindow.YT);
      };
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      script.onerror = () => {
        apiPromise = undefined;
        script.remove();
        reject(new Error("YouTube API unavailable"));
      };
      document.head.append(script);
    });
  }
  return apiPromise;
}

function disableCaptions({ target }: PlayerEvent) {
  // Caption modules load asynchronously and may reload when the video loops.
  // Only clear an active track, avoiding repeated API-change notifications.
  if (target.getOptions("captions")?.includes("track") &&
      target.getOption("captions", "track")?.languageCode) {
    target.setOption("captions", "track", {});
  }
}

export default function YouTubeBackgroundVideo({ videoId, title }: {
  videoId: string;
  title: string;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&playsinline=1&disablekb=1&cc_load_policy=0&iv_load_policy=3&rel=0`;

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let disposed = false;
    let player: Player | undefined;
    // Keep the API-owned iframe outside React's DOM ownership so cleanup
    // also works during Strict Mode and client-side navigation.
    const iframe = document.createElement("iframe");
    iframe.src = `${src}&enablejsapi=1&origin=${encodeURIComponent(window.location.origin)}`;
    iframe.title = title;
    iframe.className = "pointer-events-none h-full w-full border-0";
    iframe.tabIndex = -1;
    iframe.inert = true;
    iframe.allow = "autoplay; encrypted-media; fullscreen; picture-in-picture";
    iframe.allowFullscreen = true;
    iframe.referrerPolicy = "strict-origin-when-cross-origin";
    host.append(iframe);

    void loadApi().then((api) => {
      if (disposed) return;
      player = new api.Player(iframe, {
        events: {
          onReady: (event) => {
            // The SDK rewrites iframe attributes while initializing.
            const readyIframe = event.target.getIframe();
            readyIframe.title = title;
            readyIframe.tabIndex = -1;
            readyIframe.inert = true;
            event.target.mute();
            disableCaptions(event);
            event.target.playVideo();
          },
          onApiChange: disableCaptions,
          onStateChange: (event) => {
            if (event.data === 1) disableCaptions(event);
          },
        },
      });
    }).catch(() => {
      // The URL-configured player and the caption's original-video link
      // remain available if the optional API script cannot load.
    });

    return () => {
      disposed = true;
      player?.destroy();
      iframe.remove();
    };
  }, [src, title]);

  return (
    <div className="relative aspect-video w-full">
      <div ref={hostRef} className="h-full w-full" />
      <noscript>
        <iframe src={src} title={title} className="pointer-events-none absolute inset-0 h-full w-full border-0" tabIndex={-1} inert allow="autoplay; encrypted-media" />
      </noscript>
    </div>
  );
}
