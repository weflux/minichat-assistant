import dayjs from "dayjs"

export function formatTimestamp(seconds: number): string {
	return dayjs(seconds * 1000).format('YYYY-MM-DD HH:mm:ss');
}

export default { formatTimestamp }
