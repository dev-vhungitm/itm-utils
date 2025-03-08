const upload = async ({ cloudinary, buffer, folder = '' }: { cloudinary: any; buffer: Buffer; folder: string }) => {
	const result: any = await new Promise((resolve, reject) => {
		const stream = cloudinary.uploader.upload_stream({ folder }, (error: any, result: any) => {
			if (error) reject(error);
			else resolve(result);
		});
		stream.end(buffer);
	});

	return result;
};

const remove = async ({ cloudinary, path }: { cloudinary: any; path: string | null | undefined }) => {
	if (path) {
		const publicId = extractPublicId({ url: path });
		if (publicId) await cloudinary.uploader.destroy(publicId);
	}
};

const extractPublicId = ({ url = '' }: { url: string }) => {
	const regex = /\/upload\/v\d+\/(.*?)(?:\.\w+)?$/;
	const match = url.match(regex);
	return match ? match[1] : null;
};

export const cloudinaryUtils = {
	upload,
	extractPublicId,
	remove
};
