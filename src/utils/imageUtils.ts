/**
 * Image processing utilities running 100% locally in the browser using HTML5 Canvas.
 */

export function formatBytes(bytes: number, decimals = 1): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export interface CompressedImageResult {
  blob: Blob;
  objectUrl: string;
  width: number;
  height: number;
  originalSize: number;
  compressedSize: number;
  percentageSaved: number;
}

export async function compressImage(
  file: File,
  quality: number, // 0.1 to 1.0
  maxWidth?: number,
  maxHeight?: number,
  outputFormat: 'image/jpeg' | 'image/webp' | 'image/png' = 'image/jpeg'
): Promise<CompressedImageResult> {
  return new Promise((resolve, reject) => {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      reject(new Error('Tanlangan fayl rasm formati emas / Selected file is not an image'));
      return;
    }

    const reader = new FileReader();

    reader.onload = event => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Scale down if limits are set
        if (maxWidth && width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        if (maxHeight && height > maxHeight) {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Canvas context ni yaratib bo‘lmadi / Failed to create canvas context'));
          return;
        }

        // For PNG or transparent WebP background
        if (outputFormat === 'image/jpeg') {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, width, height);
        }

        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          blob => {
            if (!blob) {
              reject(new Error('Rasmni siqishda xatolik yuz berdi / Image compression failed'));
              return;
            }

            const objectUrl = URL.createObjectURL(blob);
            const percentageSaved = Math.max(
              0,
              Math.round(((file.size - blob.size) / file.size) * 100)
            );

            resolve({
              blob,
              objectUrl,
              width,
              height,
              originalSize: file.size,
              compressedSize: blob.size,
              percentageSaved,
            });
          },
          outputFormat,
          quality
        );
      };

      img.onerror = () => {
        reject(new Error('Rasmni yuklab bo‘lmadi / Failed to load image'));
      };

      img.src = event.target?.result as string;
    };

    reader.onerror = () => {
      reject(new Error('Faylni o‘qishda xatolik / Failed to read file'));
    };

    reader.readAsDataURL(file);
  });
}
