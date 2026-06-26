function waitForImage(img: HTMLImageElement): Promise<void> {
  if (img.complete) {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    img.addEventListener("load", () => resolve(), { once: true });
    img.addEventListener("error", () => resolve(), { once: true });
  });
}

/** Only above-the-fold images — avoids blocking on lazy / off-screen assets. */
export async function waitForCriticalImages(
  root: ParentNode,
  options: { timeoutMs?: number; maxImages?: number } = {},
): Promise<void> {
  const { timeoutMs = 500, maxImages = 6 } = options;
  const viewportBottom = window.innerHeight * 1.05;

  const images = Array.from(root.querySelectorAll<HTMLImageElement>("img"))
    .filter((img) => {
      const rect = img.getBoundingClientRect();
      return rect.width > 0 && rect.top < viewportBottom && rect.bottom > 0;
    })
    .slice(0, maxImages);

  if (images.length === 0) {
    return;
  }

  await Promise.race([
    Promise.all(images.map(waitForImage)),
    delay(timeoutMs),
  ]);
}

export function waitForNextPaint(): Promise<void> {
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => resolve());
    });
  });
}

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
