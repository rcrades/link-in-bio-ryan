// Utility function to find the best profile image
export async function getProfileImageSrc(): Promise<string> {
  const possibleExtensions = ['jpg', 'jpeg', 'png', 'webp', 'avif'];
  const basePath = '/profile';
  
  // Try to find all existing profile images
  const existingImages: { src: string; lastModified: number }[] = [];
  
  for (const ext of possibleExtensions) {
    const imageSrc = `${basePath}.${ext}`;
    try {
      const response = await fetch(imageSrc, { method: 'HEAD' });
      if (response.ok) {
        const lastModified = new Date(response.headers.get('Last-Modified') || '').getTime() || 0;
        existingImages.push({ src: imageSrc, lastModified });
      }
    } catch {
      // Image doesn't exist, continue
    }
  }
  
  if (existingImages.length === 0) {
    // Fallback to .jpg if no images found
    return `${basePath}.jpg`;
  }
  
  // Sort by last modified date (newest first) and return the newest
  existingImages.sort((a, b) => b.lastModified - a.lastModified);
  return existingImages[0].src;
}