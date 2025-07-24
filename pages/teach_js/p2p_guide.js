// P2P通信ガイド JavaScript

document.addEventListener('DOMContentLoaded', function () {
    // サイドバー機能の初期化
    initializeSidebar();
    
    // スクロールボタンの初期化
    initializeScrollButton();
    
    // タッチ入力の検出
    detectTouchInput();

    // PeerJSを使って新しいPeerオブジェクトを作成
    const peer = new Peer();

    // 接続相手との通信情報を格納するMap
    const connections = new Map();

    // 自分のPeer ID（後で取得）
    let myPeerId = null;

    // 手動で接続ボタンが押されたときに呼ばれる関数
    window.connect = function() {
        const targetId = document.getElementById('target-id').value.trim();
        if (!targetId || targetId === myPeerId) {
            log('⚠️ 無効なIDまたは自分自身のIDです');
            return;
        }

        log(`🔄 ${targetId} に接続を試行中...`);
        const connectBtn = document.querySelector('.connect-btn');
        connectBtn.classList.add('connecting');
        connectBtn.textContent = '接続中...';

        const conn = peer.connect(targetId); // 相手に接続
        setupConnection(conn); // 接続処理を設定

        // タイムアウト処理
        setTimeout(() => {
            if (!connections.has(targetId)) {
                log(`❌ ${targetId} への接続がタイムアウトしました`);
                connectBtn.classList.remove('connecting');
                connectBtn.textContent = '接続';
            }
        }, 10000);
    };

    // 相手から接続要求があったときの処理
    peer.on('connection', (conn) => {
        log(`📞 ${conn.peer} から接続要求を受信`);
        setupConnection(conn);
    });

    // 自分のIDが発行されたら表示・URL確認
    peer.on('open', (id) => {
        myPeerId = id;
        document.getElementById('my-id').value = id;
        log(`🆔 自分のID: ${id}`);

        // URLパラメータで ?id=xxx があれば自動接続
        const params = new URLSearchParams(window.location.search);
        if (params.has('id')) {
            const targetId = params.get('id');
            document.getElementById('target-id').value = targetId;
            log('🔗 URLパラメータから自動接続します');
            setTimeout(() => connect(), 1000);
        }
    });

    // Peerエラーハンドリング
    peer.on('error', (err) => {
        log(`❌ Peerエラー: ${err.message}`);
        console.error('Peer error:', err);
    });

    // 各PeerConnectionに共通のイベント処理を追加
    function setupConnection(conn) {
        conn.on('open', () => {
            connections.set(conn.peer, conn); // 接続を記録
            log(`✅ 接続成功: ${conn.peer}`);
            
            // 接続ボタンの状態をリセット
            const connectBtn = document.querySelector('.connect-btn');
            connectBtn.classList.remove('connecting');
            connectBtn.textContent = '接続';
            
            // 接続成功通知
            showNotification('接続が成功しました！', 'success');
        });

        conn.on('data', (data) => {
            log(`📨 受信 (${conn.peer}): ${JSON.stringify(data)}`);
            
            // メッセージ受信時の通知
            if (data.type === 'text') {
                showNotification(`新しいメッセージ: ${data.text}`, 'info');
            }
        });

        conn.on('close', () => {
            log(`🔌 切断されました: ${conn.peer}`);
            connections.delete(conn.peer);
            showNotification(`${conn.peer} が切断されました`, 'warning');
        });

        conn.on('error', (err) => {
            log(`❌ エラー (${conn.peer}): ${err}`);
            console.error('Connection error:', err);
        });
    }

    // メッセージ送信処理（全接続相手へ送信）
    window.send = function() {
        const msgInput = document.getElementById('msg');
        const msg = msgInput.value.trim();
        if (!msg) {
            log('⚠️ メッセージが空です');
            return;
        }

        if (connections.size === 0) {
            log('⚠️ 接続されているPeerがありません');
            showNotification('まず誰かと接続してください', 'warning');
            return;
        }

        const data = {
            type: 'text',
            text: msg,
            senderId: myPeerId,
            timestamp: new Date().toLocaleTimeString()
        };

        let sentCount = 0;
        for (const conn of connections.values()) {
            if (conn.open) {
                conn.send(data);
                sentCount++;
            }
        }

        log(`📤 送信 (${sentCount}人): ${JSON.stringify(data)}`);
        msgInput.value = ''; // 入力欄をクリア
        msgInput.focus(); // フォーカスを戻す
    };

    // Enterキーでメッセージ送信
    window.handleEnterKey = function(event) {
        if (event.key === 'Enter') {
            send();
        }
    };

    // IDをクリップボードにコピー
    window.copyToClipboard = function() {
        const myIdInput = document.getElementById('my-id');
        if (!myIdInput.value) {
            log('⚠️ IDがまだ生成されていません');
            return;
        }

        navigator.clipboard.writeText(myIdInput.value).then(() => {
            log('📋 IDをクリップボードにコピーしました');
            showNotification('IDをコピーしました！', 'success');
        }).catch(err => {
            log('❌ クリップボードへのコピーに失敗しました');
            console.error('Copy failed:', err);
        });
    };

    // ログクリア
    window.clearLog = function() {
        document.getElementById('log').textContent = '';
        log('🧹 ログをクリアしました');
    };

    // ログ表示用の関数
    function log(message) {
        const logElement = document.getElementById('log');
        const timestamp = new Date().toLocaleTimeString();
        logElement.textContent += `[${timestamp}] ${message}\n`;
        
        // ログの最下部にスクロール
        logElement.scrollTop = logElement.scrollHeight;
    }

    // 通知表示機能
    function showNotification(message, type = 'info') {
        // 既存の通知を削除
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // 新しい通知を作成
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;

        // 通知のスタイル
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '15px 20px',
            borderRadius: '8px',
            color: 'white',
            fontWeight: '600',
            zIndex: '10000',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease',
            maxWidth: '300px',
            wordWrap: 'break-word'
        });

        // タイプ別の色設定
        const colors = {
            success: 'linear-gradient(135deg, #10b981, #059669)',
            error: 'linear-gradient(135deg, #ef4444, #dc2626)',
            warning: 'linear-gradient(135deg, #f59e0b, #d97706)',
            info: 'linear-gradient(135deg, #3b82f6, #2563eb)'
        };
        notification.style.background = colors[type] || colors.info;

        document.body.appendChild(notification);

        // アニメーション
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // 自動削除
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }

    // ページ読み込み完了時のメッセージ
    log('🚀 P2P通信デモが開始されました');
    log('💡 IDが生成されるまでお待ちください...');

    // 接続状態監視
    setInterval(() => {
        // 切断された接続を掃除
        for (const [peerId, conn] of connections.entries()) {
            if (!conn.open) {
                connections.delete(peerId);
            }
        }
    }, 5000);

    // ページ離脱時の処理
    window.addEventListener('beforeunload', () => {
        // 全ての接続を閉じる
        for (const conn of connections.values()) {
            if (conn.open) {
                conn.close();
            }
        }
        
        // Peerを破棄
        if (peer && !peer.destroyed) {
            peer.destroy();
        }
    });

    // デバッグ用グローバル変数（開発時に便利）
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        window.debugPeer = peer;
        window.debugConnections = connections;
        console.log('Debug mode: peer and connections available as window.debugPeer and window.debugConnections');
    }
});

// サイドバー機能の初期化
function initializeSidebar() {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const sidebar = document.querySelector('.sidebar');
    
    if (hamburgerMenu && sidebar) {
        hamburgerMenu.addEventListener('click', function() {
            hamburgerMenu.classList.toggle('open');
            sidebar.classList.toggle('open');
        });
        
        // オーバーレイクリック時にサイドバーを閉じる
        sidebar.addEventListener('click', function(e) {
            if (e.target === sidebar && sidebar.classList.contains('open')) {
                hamburgerMenu.classList.remove('open');
                sidebar.classList.remove('open');
            }
        });
        
        // ESCキーでサイドバーを閉じる
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && sidebar.classList.contains('open')) {
                hamburgerMenu.classList.remove('open');
                sidebar.classList.remove('open');
            }
        });
    }
}

// スクロールボタンの初期化
function initializeScrollButton() {
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    
    if (scrollToTopBtn) {
        // スクロール時の表示制御
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('show');
            } else {
                scrollToTopBtn.classList.remove('show');
            }
        });
        
        // クリック時のスクロール
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// タッチ入力の検出
function detectTouchInput() {
    document.addEventListener('touchstart', function() {
        document.body.classList.add('touch-input');
    }, { once: true });
}
