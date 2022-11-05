declare module "os" {
	type Success = 0;
	type Error = number; // smaller than 0
	type Result = Success | Error | number;
	type ResultOf<T> = [T, Success] | [unknown, Error];
	type FileDescriptorResult = FileDescriptor | Error;
	type Signal = number;
	type Pid = number;
	type ExecOptions = {
		usePath?: boolean;
		file?: string,
		cwd?: string,
		stdin?: FileDescriptor,
		stdout?: FileDescriptor,
		stderr?: FileDescriptor,
		env?: { [key: string]: string },
		uid?: number,
		gid?: number,
	};
	type ExecNonBlockingOptions = ExecOptions & { block?: false }
	type ExecBlockingOptions = ExecOptions & { block: true }
	type TimerHandle = unknown;
	type Platform = "linux" | "darwin" | "win32" | "js";
	type WorkerMessage = any;
	interface Stat {
		dev: number;
		ino: number;
		mode: number;
		nlink: number;
		uid: number;
		gid: number;
		rdev: number;
		size: number;
		blocks: number;
		atime: number;
		mtime: number;
		ctime: number;
	}

	export function open(filename: string, flags?: number): FileDescriptorResult;
	export const O_APPEND: number;
	export const O_CREAT: number;
	export const O_EXCL: number;
	export const O_RDONLY: number;
	export const O_RDWR: number;
	export const O_TRUNC: number;
	export const O_WRONLY: number;
	export function close(fd: FileDescriptor): Result;
	export function seek(fd: FileDescriptor, offset: number, whence: number): Result;
	export function seek(fd: FileDescriptor, offset: BigInt, whence: number): BigInt;
	export function read(fd: FileDescriptor, offset: number, whence: number): Result;
	export function read(fd: FileDescriptor, offset: BigInt, whence: number): BigInt;
	export function write(fd: FileDescriptor, offset: number, whence: number): Result;
	export function isatty(fd: FileDescriptor): boolean;
	export function ttyGetWinSize(fd: FileDescriptor):
		[width: number, height: number] | null;
	export function ttySetRaw(fd: FileDescriptor): void;
	export function remove(filename: string): Result;
	export function rename(filename: string): Result;
	export function realpath(filename: string): ResultOf<string>;
	export function getcwd(): ResultOf<string>;
	export function chdir(): Result;
	export function mkdir(path: string, mode?: number): Result;
	export function stat(path: string): ResultOf<Stat>
	export function lstat(path: string): ResultOf<Stat>
	export const S_IFBLK: number;
	export const S_IFCHR: number;
	export const S_IFDIR: number;
	export const S_IFIFO: number;
	export const S_IFLNK: number;
	export const S_IFMT: number;
	export const S_IFREG: number;
	export const S_IFSOCK: number;
	export const S_ISGID: number;
	export const S_ISUID: number;
	export function utimes(path: string, atime: number, mtime: number): Result;
	export function symlink(target: string, linkpath: string): Result;
	export function readlink(target: string, linkpath: string): ResultOf<string>;
	export function readdir(path: string): ResultOf<string[]>
	export function setReadHandler(fd: FileDescriptor, func: () => void | null): void;
	export function setWriteHandler(fd: FileDescriptor, func: () => void | null): void;
	export function signal(signal: Signal, func: () => void | null | undefined): void
	export const SIGABRT: number;
	export const SIGALRM: number;
	export const SIGCHLD: number;
	export const SIGCONT: number;
	export const SIGFPE: number;
	export const SIGILL: number;
	export const SIGINT: number;
	export const SIGPIPE: number;
	export const SIGQUIT: number;
	export const SIGSEGV: number;
	export const SIGSTOP: number;
	export const SIGTERM: number;
	export const SIGTSTP: number;
	export const SIGTTIN: number;
	export const SIGTTOU: number;
	export const SIGUSR1: number;
	export const SIGUSR2: number;
	export function kill(pid: number, signal: Signal): Result;
	export function exec(args: string[], options?: ExecBlockingOptions): Result;
	export function exec(args: string[], options: ExecNonBlockingOptions): Pid;
	export function waitpid(pid: Pid, options: number): [ret: number, status: number];
	export const WNOHANG: number;
	export function dup(fd: FileDescriptor): FileDescriptorResult;
	export function dup2(oldFd: FileDescriptor, newFd: FileDescriptor):
		FileDescriptorResult;
	export function pipe(): [readFd: FileDescriptor, writeFd: FileDescriptor] | null;
	export function sleep(delay_ms: number): Result;
	export function setTimeout(func: () => void, delay: number): TimerHandle;
	export function clearTimeout(handle: TimerHandle): void;
	export var platform: Platform;
	export class Worker {
		static parent: Worker | undefined;
		constructor(module_filename: string);
		postMessage(msg: WorkerMessage): void;
		onmessage: (msg: WorkerMessage) => void;
	}
}
