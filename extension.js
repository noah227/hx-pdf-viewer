var hx = require("hbuilderx");

// 引入主要的类
let CustomDocument = hx.CustomEditor.CustomDocument;
let CustomEditorProvider = hx.CustomEditor.CustomEditorProvider;
let CustomDocumentEditEvent = hx.CustomEditor.CustomDocumentEditEvent;

// 继承CustomDocument
class CatCustomDocument extends CustomDocument {
	constructor(uri) {
		super(uri)
	}

	dispose() {
		super.dispose();
	}
}

// 继承CustomEditorProvider，实现必要的方法
class CatCustomEditorProvider extends CustomEditorProvider {
	constructor(context) {
		super()
	}

	openCustomDocument(uri) {
		// 创建CustomDocument
		return Promise.resolve(new CatCustomDocument(uri));
	}

	resolveCustomEditor(document, webViewPanel) {
		// 关联CustomDocument与WebViewPanel
		webViewPanel.webView.html = `
			<style>
				html, body {
					margin: 0;
				}
				iframe {
					border: 0;
				}
			</style>
			<iframe src=${document.uri} style="width: 100%; height: 100%;"></iframe>
		`
	}

	saveCustomDocument(document) {
		// 保存document
		return true;
	}

	saveCustomDocumentAs(document, destination) {
		// document另存为至destination
		return true;
	}
}


//该方法将在插件激活的时候调用
function activate(context) {
	let disposable = hx.window.registerCustomEditorProvider("catEdit.catPdf", new CatCustomEditorProvider());
	//订阅销毁钩子，插件禁用的时候，自动注销该command。
	context.subscriptions.push(disposable);
}

//该方法将在插件禁用的时候调用（目前是在插件卸载的时候触发）
function deactivate() {

}

module.exports = {
	activate,
	deactivate
}