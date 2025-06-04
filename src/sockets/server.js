// socketClient.js
import { io } from 'socket.io-client';

// Socket.io 서버 주소
// 로컬에서 실행 중인 signaling 서버 주소
const socket = io('http://localhost:3001', {
	transports: ['websocket'], // fallback 없이 websocket만 사용 (권장 아님이면 제거해도 됨)
});

export default socket;
