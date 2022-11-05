declare module "std" {
	interface EvalOptions {
		backtrace_barrier?: boolean;
	}

	interface ErrorObj {
		errno?: number;
	}

	interface UrlGetResponse<T> {
		response: T | null;
		status: number;
		responseHeaders: string;
	}


	export function exit(n: number): never;
	export function evalScript(str: string, options?: EvalOptions): any;
	export function loadScript(filename: string): any;
	export function loadFile(filename: string): string | null;
	export function open(filename: string, flags: string, errorObj?: ErrorObj): FileResult;
	export function popen(command: string, flags: string, errorObj?: ErrorObj): FileResult;
	export function fdopen(fd: FileDescriptor, flags: string, errorObj?: ErrorObj): FileResult;
	export function tmpfile(errorObj?: ErrorObj): File;
	export function puts(str: string): void;
	const $in: File;
	export { $in as in };
	export const out: File;
	export const err: File;
	export const SEEK_CUR: number;
	export const SEEK_END: number;
	export const SEEK_SET: number;
	export const Error: {
		EACCES: number,
		ENOENT: number,
		EBADF: number,
		ENOSPC: number,
		EBUSY: number,
		ENOSYS: number,
		EEXIST: number,
		EPERM: number,
		EINVAL: number,
		EPIPE: number,
		EIO: number,
	};
	export function strerror(errno: number): string;
	export function gc(): void;
	export function getenv(name: string): string | undefined;
	export function setenv(name: string, value: string): void;
	export function unsetenv(name: string): void;
	export function getenviron(): { [key: string]: string };
	export function urlGet(url: string, options: { full: false, binary: false }): string | null;
	export function urlGet(url: string, options: { full: false, binary: false }): ArrayBuffer | null;
	export function urlGet(url: string, options: { full: true, binary: false }): UrlGetResponse<string>;
	export function urlGet(url: string, options: { full: true, binary: true }): UrlGetResponse<ArrayBuffer>;
	export function parseExtJSON(str: string): any;
	export function printf(format: string, ...args: any[]): number;
	export function sprintf(format: string, ...args: any[]): string;
}
