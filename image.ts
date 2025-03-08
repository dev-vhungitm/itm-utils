import { configs, enums } from '@/itm-constants';
<<<<<<< HEAD
import sharp from 'sharp';
=======
>>>>>>> b8ba817 (Update)

const toBase64 = async ({ image }: { image: File }) => {
	try {
		const result = new Promise<string | null>((resolve, reject) => {
			if (!image || !configs.imageValidTypesPattern.test(image.type)) {
				resolve(null);
				return;
			}

			const reader = new FileReader();
			reader.onload = () => resolve(typeof reader.result === 'string' ? reader.result : null);
			reader.onerror = () => reject(null);
			reader.readAsDataURL(image);
		});

		return await result;
	} catch {
		return null;
	}
};

const generateURL = ({ url = '', root = '' }: { url: string; root?: string }) => {
	try {
		const result = `${!url.startsWith('http') ? `${root}/` : ''}${url}?t=${new Date().getTime()}`;
		return result;
	} catch {
		return url;
	}
};

const convertType = async ({
	image,
	type = enums.imageTypes.webp.type,
	extension = enums.imageTypes.webp.extension
}: {
	image: File;
	type?: string;
	extension?: string;
}): Promise<File | null> => {
	try {
		if (!image) return null;

		const originalFileName = image.name.replace(/\.[^/.]+$/, '');
		const img = new Image();
		const reader = new FileReader();

		return await new Promise((resolve, reject) => {
			reader.onload = () => {
				img.src = reader.result as string;
			};

			img.onload = async () => {
				const canvas = document.createElement('canvas');
				canvas.width = img.width;
				canvas.height = img.height;
				const ctx = canvas.getContext('2d');
				ctx?.drawImage(img, 0, 0);

				canvas.toBlob(blob => {
					if (blob) {
						const resultFile = new File([blob], `${originalFileName}.${extension}`, { type });
						resolve(resultFile);
					} else reject(null);
				}, type);
			};

			img.onerror = () => reject(null);
			reader.onerror = () => reject(null);
			reader.readAsDataURL(image);
		});
	} catch {
		return null;
	}
};

<<<<<<< HEAD
const toWebP = async ({ image }: { image: File }): Promise<File | null> => {
	const isNode = typeof process !== 'undefined' && process.versions !== null && process.versions.node !== null;

	if (isNode) {
		return (await sharp(image as any)
			.webp()
			.toBuffer()) as any;
=======
const toWebP = async ({ image }: { image: any }) => {
	const isNode = typeof process !== 'undefined' && process.versions !== null && process.versions.node !== null;

	if (isNode) {
		const sharp = (await import('sharp')).default;
		return (await sharp(image).webp().toBuffer()) as any;
>>>>>>> b8ba817 (Update)
	} else {
		return await convertType({ image });
	}
};

const toWebPBase64 = async ({ image }: { image: File }) => {
	try {
		if (!image) return null;

		const webP = await toWebP({ image });
		const result = await toBase64({ image: webP as File });

		return result;
	} catch {
		return null;
	}
};

export const getDimensions = ({ image }: { image: File }): Promise<{ width: number; height: number }> => {
	return new Promise((resolve, reject) => {
		const img = new Image();
		const url = URL.createObjectURL(image);

		img.onload = () => {
			resolve({
				width: img.naturalWidth,
				height: img.naturalHeight
			});
			URL.revokeObjectURL(url);
		};

		img.onerror = () => reject(null);
		img.src = url;
	});
};

const isValidURL = ({ url = '' }: { url: string }): Promise<boolean> => {
	return new Promise(resolve => {
		const img = new Image();
		img.src = url;
		img.onload = () => resolve(true);
		img.onerror = () => resolve(false);
	});
};

export const imageUtils = {
	generateURL,
	convertType,
	toBase64,
	toWebP,
	toWebPBase64,
	getDimensions,
	isValidURL
};
