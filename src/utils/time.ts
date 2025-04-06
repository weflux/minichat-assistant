import dayjs from "dayjs"

export function formatTimestamp(seconds: number): string {
	if (!seconds) {
		return ""
	}
	return dayjs(seconds * 1000).format('YYYY-MM-DD HH:mm:ss');
}

export default { formatTimestamp }
