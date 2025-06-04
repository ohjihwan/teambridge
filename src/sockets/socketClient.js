// socketClient.js
import { io } from 'socket.io-client';

const socket = io('https://teambridge.onrender.com');
export default socket;