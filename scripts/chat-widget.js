// Course Advisor Chat Widget — floating chatbot for course questions

(function () {
    const history = [];

    const style = document.createElement('style');
    style.textContent = `
        #tharai-chat-toggle {
            position: fixed;
            bottom: 24px;
            right: 24px;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: #4f46e5;
            color: #fff;
            border: none;
            font-size: 26px;
            cursor: pointer;
            box-shadow: 0 6px 18px rgba(0,0,0,0.25);
            z-index: 9999;
        }
        #tharai-chat-panel {
            position: fixed;
            bottom: 96px;
            right: 24px;
            width: 340px;
            max-width: calc(100vw - 32px);
            height: 460px;
            max-height: calc(100vh - 140px);
            background: #fff;
            border-radius: 14px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            display: none;
            flex-direction: column;
            overflow: hidden;
            z-index: 9999;
            font-family: inherit;
        }
        #tharai-chat-panel.open { display: flex; }
        #tharai-chat-header {
            background: #4f46e5;
            color: #fff;
            padding: 14px 16px;
            font-weight: 600;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        #tharai-chat-close {
            background: none;
            border: none;
            color: #fff;
            font-size: 18px;
            cursor: pointer;
        }
        #tharai-chat-messages {
            flex: 1;
            overflow-y: auto;
            padding: 12px;
            display: flex;
            flex-direction: column;
            gap: 8px;
            background: #f7f7fb;
        }
        .tharai-msg {
            max-width: 85%;
            padding: 8px 12px;
            border-radius: 10px;
            font-size: 14px;
            line-height: 1.4;
            white-space: pre-wrap;
        }
        .tharai-msg.user {
            align-self: flex-end;
            background: #4f46e5;
            color: #fff;
        }
        .tharai-msg.bot {
            align-self: flex-start;
            background: #eaeaf2;
            color: #222;
        }
        .tharai-msg.error {
            align-self: flex-start;
            background: #fde2e2;
            color: #7a1f1f;
        }
        #tharai-chat-form {
            display: flex;
            border-top: 1px solid #eee;
            padding: 8px;
            gap: 6px;
        }
        #tharai-chat-input {
            flex: 1;
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 8px 10px;
            font-size: 14px;
            resize: none;
        }
        #tharai-chat-send {
            background: #4f46e5;
            color: #fff;
            border: none;
            border-radius: 8px;
            padding: 0 14px;
            cursor: pointer;
            font-size: 14px;
        }
        #tharai-chat-send:disabled { opacity: 0.6; cursor: default; }
    `;
    document.head.appendChild(style);

    const toggle = document.createElement('button');
    toggle.id = 'tharai-chat-toggle';
    toggle.setAttribute('aria-label', 'Ask about our courses');
    toggle.textContent = '💬';

    const panel = document.createElement('div');
    panel.id = 'tharai-chat-panel';
    panel.innerHTML = `
        <div id="tharai-chat-header">
            <span>Course Advisor</span>
            <button id="tharai-chat-close" aria-label="Close chat">✕</button>
        </div>
        <div id="tharai-chat-messages"></div>
        <form id="tharai-chat-form">
            <textarea id="tharai-chat-input" rows="1" placeholder="Ask about a course..."></textarea>
            <button id="tharai-chat-send" type="submit">Send</button>
        </form>
    `;

    document.body.appendChild(toggle);
    document.body.appendChild(panel);

    const messagesEl = panel.querySelector('#tharai-chat-messages');
    const form = panel.querySelector('#tharai-chat-form');
    const input = panel.querySelector('#tharai-chat-input');
    const sendBtn = panel.querySelector('#tharai-chat-send');

    function addMessage(text, cls) {
        const el = document.createElement('div');
        el.className = 'tharai-msg ' + cls;
        el.textContent = text;
        messagesEl.appendChild(el);
        messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    let greeted = false;
    toggle.addEventListener('click', () => {
        panel.classList.toggle('open');
        if (panel.classList.contains('open')) {
            if (!greeted) {
                addMessage("Hi! I'm the THARAI course advisor. Ask me about durations, fees, curriculum, or which course fits your goals.", 'bot');
                greeted = true;
            }
            input.focus();
        }
    });
    panel.querySelector('#tharai-chat-close').addEventListener('click', () => {
        panel.classList.remove('open');
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const message = input.value.trim();
        if (!message) return;

        addMessage(message, 'user');
        history.push({ role: 'user', content: message });
        input.value = '';
        sendBtn.disabled = true;

        try {
            const res = await fetch(API_BASE + '/chat/message', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message, history: history.slice(0, -1) }),
            });
            const data = await res.json();

            if (!res.ok) {
                addMessage(data.error || 'Something went wrong. Please try again.', 'error');
            } else {
                addMessage(data.reply, 'bot');
                history.push({ role: 'assistant', content: data.reply });
            }
        } catch (err) {
            addMessage('Could not reach the chat service. Please check your connection.', 'error');
        } finally {
            sendBtn.disabled = false;
        }
    });

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            form.requestSubmit();
        }
    });
})();
