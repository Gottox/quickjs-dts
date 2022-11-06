/**
 * Provides the command line arguments. The first argument is the script 
 * name. 
 */
declare const scriptArgs: string[];
/**
 * Print the arguments separated by spaces and a trailing newline. 
 */
declare function print(...args: any[]): void;
/**
 * Same as print().
 */
declare const console: {
	/**
	 * Same as print().
	 */
	log: typeof print
};

interface ImportMeta {
	url: string;
}
