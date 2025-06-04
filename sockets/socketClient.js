// socketClient.js
import { io } from 'socket.io-client';

// 로컬 서버 주소로 연결
const isLocal = location.hostname === 'localhost';
const socket = io(isLocal ? 'http://localhost:8080' : 'https://teambridge.onrender.com');

export default socket;