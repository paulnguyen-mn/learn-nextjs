export function encodeUrl(str: string): string {
	const base64 = window.btoa(str)
	return encodeURIComponent(base64)
}

export function decodeUrl(str: string): string {
	const base64 = decodeURIComponent(str)
	return window.atob(base64)
}
