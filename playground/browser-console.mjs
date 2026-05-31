import repl from 'node:repl';
import vm from 'node:vm';
import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { JSDOM } from 'jsdom';

const BANNER = `
Browser Console (jsdom + Node REPL)
------------------------------------
全局可用: window, document, console, setTimeout, Promise, alert ...
REPL 命令: .help 查看帮助, .load <文件> 执行脚本, .exit 退出
提示: Event Loop 与真浏览器略有差异（Node 多了 process.nextTick）
`;

function createBrowserContext() {
  const dom = new JSDOM('<!DOCTYPE html><html><head></head><body></body></html>', {
    url: 'http://localhost:3000/',
    pretendToBeVisual: true,
  });

  const { window } = dom;

  const alert = (message) => console.log('[alert]', message);
  const confirm = (message) => {
    console.log('[confirm]', message, '→ true');
    return true;
  };
  const prompt = (message, defaultValue = '') => {
    console.log('[prompt]', message, '→', defaultValue);
    return defaultValue;
  };

  const context = {
    window,
    document: window.document,
    navigator: window.navigator,
    location: window.location,
    history: window.history,
    localStorage: window.localStorage,
    sessionStorage: window.sessionStorage,
    HTMLElement: window.HTMLElement,
    Element: window.Element,
    Node: window.Node,
    Event: window.Event,
    CustomEvent: window.CustomEvent,
    requestAnimationFrame: window.requestAnimationFrame.bind(window),
    cancelAnimationFrame: window.cancelAnimationFrame.bind(window),
    console,
    setTimeout: window.setTimeout.bind(window),
    clearTimeout: window.clearTimeout.bind(window),
    setInterval: window.setInterval.bind(window),
    clearInterval: window.clearInterval.bind(window),
    Promise: window.Promise,
    alert,
    confirm,
    prompt,
  };

  vm.createContext(context);
  return { context, dom };
}

function startRepl() {
  const { context } = createBrowserContext();
  console.log(BANNER);

  const r = repl.start({
    prompt: '> ',
    useGlobal: false,
    ignoreUndefined: true,
  });

  for (const [key, value] of Object.entries(context)) {
    Object.defineProperty(r.context, key, {
      value,
      configurable: true,
      enumerable: true,
      writable: true,
    });
  }

  r.on('exit', () => {
    console.log('再见 👋');
    process.exit(0);
  });

  r.defineCommand('load', {
    help: '加载并执行 .js 文件，例如 .load playground/examples/01-prototype-chain.js',
    action(filePath) {
      this.clearBufferedCommand();
      runFile(filePath)
        .then(() => {
          this.displayPrompt();
        })
        .catch((error) => {
          console.error(error);
          this.displayPrompt();
        });
    },
  });
}

async function runFile(filePath) {
  const { context } = createBrowserContext();
  const source = readFileSync(filePath, 'utf8');
  const wrapped = `(async () => {\n${source}\n})()`;
  await vm.runInContext(wrapped, context, {
    filename: filePath,
    importModuleDynamically: vm.constants?.USE_MAIN_CONTEXT_DEFAULT_LOADER
      ?? vm.constants?.USE_MAIN_CONTEXT_DEFAULT_DYNAMIC_IMPORT,
  });
}

const runIndex = process.argv.indexOf('--run');
if (runIndex !== -1) {
  const filePath = process.argv[runIndex + 1];
  if (!filePath) {
    console.error('用法: npm run run -- <文件路径>');
    process.exit(1);
  }
  runFile(filePath).catch((error) => {
    console.error(error);
    process.exit(1);
  });
} else {
  startRepl();
}
