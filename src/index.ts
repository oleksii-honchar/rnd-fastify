// eslint-disable-next-line node/no-missing-import
import { blablo } from "blablo";
import colors from "colors";

colors.enable();

const logHeader = "[index]".cyan;
blablo.cleanLog(logHeader, "Hello World!!!");
