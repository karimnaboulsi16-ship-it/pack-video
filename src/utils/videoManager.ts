export interface RectLike {
  left: number;
  right: number;
  top: number;
  bottom: number;
  width: number;
  height: number;
}

export function isRectNearViewport(
  rect: RectLike,
  viewportWidth: number,
  viewportHeight: number,
  marginX = 120,
  marginY = 220
): boolean {
  if (rect.width <= 0 || rect.height <= 0) return false;
  return (
    rect.bottom >= -marginY &&
    rect.top <= viewportHeight + marginY &&
    rect.right >= -marginX &&
    rect.left <= viewportWidth + marginX
  );
}

export function isCarouselItemInView(
  itemRect: RectLike,
  containerRect: RectLike,
  marginX = 160
): boolean {
  if (itemRect.width <= 0 || itemRect.height <= 0) return false;
  if (containerRect.width <= 0 || containerRect.height <= 0) return false;
  return (
    itemRect.right >= containerRect.left - marginX &&
    itemRect.left <= containerRect.right + marginX
  );
}

export function prepareMutedInlineVideo(video: HTMLVideoElement): void {
  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.loop = true;
  video.setAttribute('muted', '');
  video.setAttribute('playsinline', '');
  video.setAttribute('webkit-playsinline', 'true');
}

export function hydrateVideoSource(video: HTMLVideoElement): boolean {
  const lazySrc = video.dataset?.src;
  if (!video.getAttribute('src') && lazySrc) {
    video.src = lazySrc;
    return true;
  }
  return false;
}

export function safePlayMutedVideo(video: HTMLVideoElement): void {
  if (typeof document !== 'undefined' && document.hidden) return;
  hydrateVideoSource(video);
  video.muted = true;
  if (video.paused) {
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {});
    }
  }
}

export function safePauseVideo(video: HTMLVideoElement): void {
  if (!video.paused) {
    video.pause();
  }
}
