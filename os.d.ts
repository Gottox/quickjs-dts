/**
 * The os module provides Operating System specific functions:
 *
 * -  low level file access
 * -  signals
 * -  timers
 * -  asynchronous I/O
 * -  workers (threads)
 *
 * The OS functions usually return 0 if OK or an OS specific negative error code.
 */
declare module "os" {
	type FileDescriptor = number & { __brand: "FileDescriptor" };
	type Success = 0;
	type NegativeErrno = number;
	type Errno = number;
	type ExitStatus = number;
	type WaitStatus = number;
	type OpenOption = number;
	type Result<T> = T | NegativeErrno;
	type ResultTuple<T> = [T, Success | Errno];
	type Signal = number & { __brand: "Signal" };
	type Pid = number & { __brand: "Pid" };
	type Callback = () => void;
	type TimerHandle = unknown & { __brand: "TimeHandle" };
	type Platform = "linux" | "darwin" | "win32" | "js";
	type WorkerMessage = any;

	interface ExecOptions {
		/**
		 * Boolean (default = `true`). If `true`, wait until the process is
		 * terminated. In this case, exec return the exit code if positive or the
		 * negated signal number if the process was interrupted by a signal. If
		 * false, do not block and return the process id of the child.
		 */
		block?: boolean;
		/**
		 * Boolean (default = `true`). If `true`, the file is searched in the PATH
		 * environment variable.
		 */
		usePath?: boolean;
		/**
		 * String (default = `args[0]`). Set the file to be executed.
		 */
		file?: string,
		/**
		 * String. If present, set the working directory of the new process.
		 */
		cwd?: string,
		/**
		 * If present, set the handle in the child for stdin, stdout or stderr.
		 */
		stdin?: FileDescriptor,
		/**
		 * If present, set the handle in the child for stdin, stdout or stderr.
		 */
		stdout?: FileDescriptor,
		/**
		 * If present, set the handle in the child for stdin, stdout or stderr.
		 */
		stderr?: FileDescriptor,
		/**
		 * Object. If present, set the process environment from the object
		 * key-value pairs. Otherwise use the same environment as the current
		 * process.
		 */
		env?: { [key: string]: string },
		/**
		 * Integer. If present, the process uid with `setuid`.
		 */
		uid?: number,
		/**
		 * Integer. If present, the process gid with `setgid`.
		 */
		gid?: number,
	}
	type ExecNonBlockingOptions = ExecOptions & { block?: false };
	type ExecBlockingOptions = ExecOptions & { block: true };

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

	/**
	 * Open a file. Return a handle or `< 0` if error.
	 */
	export function open(filename: string, flags?: OpenOption, mode?: number): Result<FileDescriptor>;
	/**
	 * POSIX open flags.
	 */
	export const O_APPEND: OpenOption;
	/**
	 * POSIX open flags.
	 */
	export const O_CREAT: OpenOption;
	/**
	 * POSIX open flags.
	 */
	export const O_EXCL: OpenOption;
	/**
	 * POSIX open flags.
	 */
	export const O_RDONLY: OpenOption;
	/**
	 * POSIX open flags.
	 */
	export const O_RDWR: OpenOption;
	/**
	 * POSIX open flags.
	 */
	export const O_TRUNC: OpenOption;
	/**
	 * POSIX open flags.
	 */
	export const O_WRONLY: OpenOption;
	/**
	 * (Windows specific). Open the file in text mode. The default is binary
	 * mode.
	 */
	export const O_TEXT: OpenOption;
	/**
	 * Close the file handle `fd`.
	 */
	export function close(fd: FileDescriptor): Result<Success>;
	/**
	 * Seek in the file. Use `std.SEEK_*` for whence. `offset` is either a
	 * number or a bigint. If `offset` is a bigint, a bigint is returned too.
	 */
	export function seek(fd: FileDescriptor, offset: number,
		whence: number): Result<number>;
	/**
	 * Seek in the file. Use `std.SEEK_*` for whence. `offset` is either a
	 * number or a bigint. If `offset` is a bigint, a bigint is returned too.
	 */
	export function seek(fd: FileDescriptor, offset: bigint,
		whence: number): Result<bigint>;
	/**
	 * Read `length` bytes from the file handle `fd` to the `ArrayBuffer`
	 * buffer at byte position `offset`. Return the number of read bytes or
	 * `< 0` if error.
	 */
	export function read(fd: FileDescriptor, offset: number,
		whence: number): Result<number>;
	/**
	 * Read `length` bytes from the file handle `fd` to the `ArrayBuffer`
	 * buffer at byte position `offset`. Return the number of read bytes or
	 * `< 0` if error.
	 */
	export function read(fd: FileDescriptor, offset: bigint,
		whence: number): Result<bigint>;
	/**
	 * Write `length` bytes to the file handle `fd` from the ArrayBuffer
	 * `buffer` at byte position `offset`. Return the number of written bytes
	 * or `< 0` if error.
	 */
	export function write(fd: FileDescriptor, offset: number,
		whence: number): Result<number>;
	/**
	 * Return `true` is fd is a TTY (terminal) handle.
	 */
	export function isatty(fd: FileDescriptor): boolean;
	/**
	 * Return the TTY size as `[width, height]` or `null` if not available.
	 */
	export function ttyGetWinSize(fd: FileDescriptor):
		[width: number, height: number] | null;
	/**
	 * Set the TTY in raw mode.
	 */
	export function ttySetRaw(fd: FileDescriptor): void;
	/**
	 * Remove a file. Return 0 if OK or `-errno`.
	 */
	export function remove(filename: string): Result<Success>;
	/**
	 * Rename a file. Return 0 if OK or `-errno`.
	 */
	export function rename(filename: string): Result<Success>;
	/**
	 * Return `[str, err]` where `str` is the canonicalized absolute pathname
	 * of `path` and `err` the error code.
	 */
	export function realpath(filename: string): ResultTuple<string>;
	/**
	 * Return `[str, err]` where `str` is the current working directory and
	 * `err` the error code.
	 */
	export function getcwd(): ResultTuple<string>;
	/**
	 * Change the current directory. Return 0 if OK or `-errno`.
	 */
	export function chdir(): Result<Success>;
	/**
	 * Create a directory at `path`. Return 0 if OK or `-errno`.
	 */
	export function mkdir(path: string, mode?: number): Result<Success>;
	/**
	 * Return `[obj, err]` where `obj` is an object containing the file status
	 * of `path`. `err` is the error code. The following fields are defined in
	 * `obj`: `dev`, `ino`, `mode`, `nlink`, `uid`, `gid`, `rdev`, `size`,
	 * `blocks`, `atime`, `mtime`, `ctim`e. The times are specified in
	 * milliseconds since 1970. `lstat()` is the same as `stat()` excepts that
	 * it returns information about the link itself.
	 */
	export function stat(path: string): ResultTuple<Stat>
	/**
	 * Return `[obj, err]` where `obj` is an object containing the file status
	 * of `path`. `err` is the error code. The following fields are defined in
	 * `obj`: `dev`, `ino`, `mode`, `nlink`, `uid`, `gid`, `rdev`, `size`,
	 * `blocks`, `atime`, `mtime`, `ctim`e. The times are specified in
	 * milliseconds since 1970. `lstat()` is the same as `stat()` excepts that
	 * it returns information about the link itself.
	 */
	export function lstat(path: string): ResultTuple<Stat>
	/**
	 * Constants to interpret the mode property returned by `stat()`. They
	 * have the same value as in the C system header `sys/stat.h`.
	 */
	export const S_IFBLK: number;
	/**
	 * Constants to interpret the mode property returned by `stat()`. They
	 * have the same value as in the C system header `sys/stat.h`.
	 */
	export const S_IFCHR: number;
	/**
	 * Constants to interpret the mode property returned by `stat()`. They
	 * have the same value as in the C system header `sys/stat.h`.
	 */
	export const S_IFDIR: number;
	/**
	 * Constants to interpret the mode property returned by `stat()`. They
	 * have the same value as in the C system header `sys/stat.h`.
	 */
	export const S_IFIFO: number;
	/**
	 * Constants to interpret the mode property returned by `stat()`. They
	 * have the same value as in the C system header `sys/stat.h`.
	 */
	export const S_IFLNK: number;
	/**
	 * Constants to interpret the mode property returned by `stat()`. They
	 * have the same value as in the C system header `sys/stat.h`.
	 */
	export const S_IFMT: number;
	/**
	 * Constants to interpret the mode property returned by `stat()`. They
	 * have the same value as in the C system header `sys/stat.h`.
	 */
	export const S_IFREG: number;
	/**
	 * Constants to interpret the mode property returned by `stat()`. They
	 * have the same value as in the C system header `sys/stat.h`.
	 */
	export const S_IFSOCK: number;
	/**
	 * Constants to interpret the mode property returned by `stat()`. They
	 * have the same value as in the C system header `sys/stat.h`.
	 */
	export const S_ISGID: number;
	/**
	 * Constants to interpret the mode property returned by `stat()`. They
	 * have the same value as in the C system header `sys/stat.h`.
	 */
	export const S_ISUID: number;
	/**
	 * Change the access and modification times of the file `path`. The times
	 * are specified in milliseconds since 1970. Return 0 if OK or `-errno`.
	 */
	export function utimes(path: string, atime: number, mtime: number):
		Result<Success>;
	/**
	 * Create a link at `linkpath` containing the string `target`. Return 0 if
	 * OK or `-errno`.
	 */
	export function symlink(target: string, linkpath: string): Result<Success>;
	/**
	 * Return `[str, err]` where `str` is the link target and `err` the error
	 * code.
	 */
	export function readlink(path: string): ResultTuple<string>;
	/**
	 * Return `[array, err]` where `array` is an array of strings containing
	 * the filenames of the directory `path`. `err` is the error code.
	 */
	export function readdir(path: string): ResultTuple<string[]>
	/**
	 * Add a read handler to the file handle `fd`. `func` is called each time
	 * there is data pending for `fd`. A single read handler per file handle is
	 * supported. Use `func = null` to remove the handler.
	 */
	export function setReadHandler(fd: FileDescriptor, func: Callback | null):
		void;
	/**
	 * Add a write handler to the file handle `fd`. `func` is called each time
	 * data can be written to `fd`. A single write handler per file handle is
	 * supported. Use `func = null` to remove the handler.
	 */
	export function setWriteHandler(fd: FileDescriptor, func: Callback | null):
		void;
	/**
	 * Call the function `func` when the signal `signal` happens. Only a single
	 * handler per signal number is supported. Use `null` to set the default
	 * handler or `undefined` to ignore the signal. Signal handlers can only be
	 * defined in the main thread.
	 */
	export function signal(signal: Signal, func: Callback | null | undefined): void
	/**
	 * POSIX signal numbers.
	 */
	export const SIGABRT: Signal;
	/**
	 * POSIX signal numbers.
	 */
	export const SIGALRM: Signal;
	/**
	 * POSIX signal numbers.
	 */
	export const SIGCHLD: Signal;
	/**
	 * POSIX signal numbers.
	 */
	export const SIGCONT: Signal;
	/**
	 * POSIX signal numbers.
	 */
	export const SIGFPE: Signal;
	/**
	 * POSIX signal numbers.
	 */
	export const SIGILL: Signal;
	/**
	 * POSIX signal numbers.
	 */
	export const SIGINT: Signal;
	/**
	 * POSIX signal numbers.
	 */
	export const SIGPIPE: Signal;
	/**
	 * POSIX signal numbers.
	 */
	export const SIGQUIT: Signal;
	/**
	 * POSIX signal numbers.
	 */
	export const SIGSEGV: Signal;
	/**
	 * POSIX signal numbers.
	 */
	export const SIGSTOP: Signal;
	/**
	 * POSIX signal numbers.
	 */
	export const SIGTERM: Signal;
	/**
	 * POSIX signal numbers.
	 */
	export const SIGTSTP: Signal;
	/**
	 * POSIX signal numbers.
	 */
	export const SIGTTIN: Signal;
	/**
	 * POSIX signal numbers.
	 */
	export const SIGTTOU: Signal;
	/**
	 * POSIX signal numbers.
	 */
	export const SIGUSR1: Signal;
	/**
	 * POSIX signal numbers.
	 */
	export const SIGUSR2: Signal;
	/**
	 * Send the signal `sig` to the process `pid`.
	 */
	export function kill(pid: Pid, signal: Signal): Result<number>;
	/**
	 * Execute a process with the arguments args.
	 */
	export function exec(args: string[], options?: ExecBlockingOptions): Result<ExitStatus>;
	/**
	 * Execute a process with the arguments args.
	 */
	export function exec(args: string[], options: ExecNonBlockingOptions): Result<Pid>;
	/**
	 * `waitpid` Unix system call. Return the array `[ret, status]`. ret
	 * contains `-errno` in case of error.
	 */
	export function waitpid(pid: Pid, options: number):
		[ret: Result<Pid | Success>, status: WaitStatus];
	/**
	 * Constant for the `options` argument of `waitpid`.
	 */
	export const WNOHANG: number;
	/**
	 * `dup` Unix system call.
	 */
	export function dup(fd: FileDescriptor): Result<FileDescriptor>;
	/**
	 * `dup2` Unix system call.
	 */
	export function dup2(oldFd: FileDescriptor, newFd: FileDescriptor):
		Result<FileDescriptor>;
	/**
	 * `pipe` Unix system call. Return two handles as `[read_fd, write_fd]` or
	 * `null` in case of error.
	 */
	export function pipe(): [readFd: FileDescriptor, writeFd: FileDescriptor] | null;
	/**
	 * Sleep during `delay_ms` milliseconds.
	 */
	export function sleep(delay_ms: number): Result<number>;
	/**
	 * Call the function func after `delay` ms. Return a handle to the timer.
	 */
	export function setTimeout(func: Callback, delay: number): TimerHandle;
	/**
	 * Cancel a timer.
	 */
	export function clearTimeout(handle: TimerHandle): void;
	/**
	 * Return a string representing the platform: `"linux"`, `"darwin"`,
	 * `"win32"` or `"js"`.
	 */
	export const platform: Platform;
	export class Worker {
		/**
		 * In the created worker, `Worker.parent` represents the parent worker
		 * and is used to send or receive messages.
		 */
		static parent?: Worker;
		/**
		 * Constructor to create a new thread (worker) with an API close to
		 * the `WebWorkers`. `module_filename` is a string specifying the
		 * module filename which is executed in the newly created thread. As
		 * for dynamically imported module, it is relative to the current
		 * script or module path. Threads normally don’t share any data and
		 * communicate between each other with messages. Nested workers are
		 * not supported. An example is available in `tests/test_worker.js`.
		 */
		constructor(module_filename: string);
		/**
		 * Send a message to the corresponding worker. msg is cloned in the
		 * destination worker using an algorithm similar to the HTML structured
		 * clone algorithm. SharedArrayBuffer are shared between workers.
		 *
		 * Current limitations: `Map` and `Set` are not supported yet.
		 */
		postMessage(msg: WorkerMessage): void;
		/**
		 * Getter and setter. Set a function which is called each time a
		 * message is received. The function is called with a single argument.
		 * It is an object with a `data` property containing the received
		 * message. The thread is not terminated if there is at least one non
		 * `null` onmessage handler.
		 */
		onmessage: (msg: WorkerMessage) => void;
	}
}
