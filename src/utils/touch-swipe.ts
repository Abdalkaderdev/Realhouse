interface SwipeCallbacks {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
}

export function addSwipeSupport(element: HTMLElement, callbacks: SwipeCallbacks): () => void {
  let startX = 0;
  let startY = 0;
  let isDragging = false;

  const SWIPE_THRESHOLD = 50;
  const SWIPE_MAX_Y = 100;

  const onTouchStart = (e: TouchEvent) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    isDragging = true;
  };

  const onTouchEnd = (e: TouchEvent) => {
    if (!isDragging) return;
    isDragging = false;

    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    const diffX = endX - startX;
    const diffY = Math.abs(endY - startY);

    if (Math.abs(diffX) > SWIPE_THRESHOLD && diffY < SWIPE_MAX_Y) {
      if (diffX < 0) {
        callbacks.onSwipeLeft?.();
      } else {
        callbacks.onSwipeRight?.();
      }
    }
  };

  element.addEventListener('touchstart', onTouchStart, { passive: true });
  element.addEventListener('touchend', onTouchEnd, { passive: true });

  return () => {
    element.removeEventListener('touchstart', onTouchStart);
    element.removeEventListener('touchend', onTouchEnd);
  };
}
