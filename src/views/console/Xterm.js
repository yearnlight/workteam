import { Terminal } from "xterm";
import { fit } from "xterm-addon-fit";
import { attach } from "xterm-addon-attach";
debugger
Terminal.loadAddon(fit);
Terminal.loadAddon(attach);

export default Terminal;
