

export function getFileExt(filename: string): string | undefined {
	const parts = filename.split('.');
	return parts.length > 1 ? parts.pop()! : undefined;
}

export default { getFileExt };
