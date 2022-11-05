declare type FileDescriptor = number;
declare type FileResult = File | null;

declare const scriptArgs: string[];
declare function print(...args: string[]): void;
declare const console: { log: typeof print };
declare interface File {
	close(): number
	puts(str: string): void;
	printf(format: string, ...args: any[]): number;
	flush(): void;
	seek(offset: number, whence: number): number;
	tell(): number;
	tello(): BigInt;
	eof(): boolean;
	fileno(): FileDescriptor;
	error(): boolean;
	clearerr(): void;
	read(buffer: ArrayBuffer, position: number, length: number): number;
	write(buffer: ArrayBuffer, postion: number, length: number): number;
	getline(): string;
	readAsString(max_size?: number): string;
	getByte(): number
	putByte(c: number): number;
}
