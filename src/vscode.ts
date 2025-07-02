// VS Code Webview helper – returns a stub when not running in VS Code

declare const acquireVsCodeApi: () => {
  postMessage: (message: any) => void;
  getState: () => any;
  setState: (state: any) => void;
};

// Use a global cache so multiple bundled copies share the same VS Code API
declare global {
  interface Window {
    __vscodeApi?: ReturnType<typeof acquireVsCodeApi>;
  }
}

let vscodeApi: ReturnType<typeof acquireVsCodeApi> | undefined;

export function getVSCodeAPI() {
  // Re-use global instance if it already exists
  if (window && window.__vscodeApi) {
    vscodeApi = window.__vscodeApi;
    return vscodeApi;
  }

  if (!vscodeApi) {
    try {
      vscodeApi = acquireVsCodeApi();
      vscodeApi.postMessage({ type: 'ready' });
      if (window) {
        window.__vscodeApi = vscodeApi;
      }
    } catch {
      // not in VS Code – return a stub
      vscodeApi = {
        postMessage: () => {},
        getState: () => undefined,
        setState: () => {}
      } as any;
    }
  }
  return vscodeApi;
}

export function postMessage(message: any) {
  const api = getVSCodeAPI();
  api?.postMessage?.(message);
} 