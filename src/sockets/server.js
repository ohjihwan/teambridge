// ✅ server.js - WebRTC signaling + 채팅 서버 완성형
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: '*',
		methods: ['GET', 'POST']
	}
});

app.use(cors());

// ✅ 방 접속 관리
io.on('connection', socket => {
	console.log('📡 연결됨:', socket.id);

	socket.on('join', roomID => {
		socket.join(roomID);
		const others = [...io.sockets.adapter.rooms.get(roomID)].filter(id => id !== socket.id);
		if (others.length > 0) {
			const otherUser = others[0];
			socket.emit('other-user', otherUser);
			io.to(otherUser).emit('user-joined', socket.id);
		}
	});

	socket.on('offer', payload => {
		io.to(payload.target).emit('offer', payload);
	});

	socket.on('answer', payload => {
		io.to(payload.target).emit('answer', payload);
	});

	socket.on('ice-candidate', incoming => {
		io.to(incoming.target).emit('ice-candidate', incoming.candidate);
	});

	socket.on('chat-message', ({ room, sender, text }) => {
		io.to(room).emit('chat-message', { sender, text });
	});

	socket.on('disconnect', () => {
		console.log('❌ 연결 종료:', socket.id);
	});
});

// ✅ 서버 실행
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
	console.log(`🚀 서버 실행 중: http://localhost:${PORT}`);
});