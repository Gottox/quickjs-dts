import * as os from "os";
import * as std from "std";

os.open("test", os.O_APPEND | os.O_CREAT);
const rv1: os.Result<os.Pid> = os.exec(["ls", "-l"], {block: false});
const rv2: os.Result<os.ExitStatus> = os.exec(["ls", "-l"], {block: true});
print(rv1, rv2, {});
std.exit(0);
