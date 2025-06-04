import { useEffect, useRef, useState } from 'react';
import socket from '../sockets/socketClient';

const VideoChat = () => {
	const localVideoRef = useRef(null);
	const remoteVideoRef = useRef(null);
	const peerRef = useRef(null);
	const [roomId, setRoomId] = useState('');
	const [joined, setJoined] = useState(false);
	const otherUser = useRef(null);

	useEffect(() => {
		socket.on('other-user', userId => {
			otherUser.current = userId;
			createOffer();
		});
		socket.on('user-joined', userId => {
			otherUser.current = userId;
		});
		socket.on('offer', handleReceiveOffer);
		socket.on('answer', handleReceiveAnswer);
		socket.on('ice-candidate', handleNewICECandidateMsg);
	}, []);

	const joinRoom = async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
			localVideoRef.current.srcObject = stream;

			peerRef.current = createPeer();
			stream.getTracks().forEach(track => peerRef.current.addTrack(track, stream));

			socket.emit('join', roomId);
			setJoined(true);
		} catch (err) {
			console.warn('🚫 카메라 없음, fallback 이미지 사용');
			setJoined(true);
			if (localVideoRef.current) {
				localVideoRef.current.poster = './assets/imgs/fall-back-image.png'; // ✅ 경로 확인 필요
			}
			socket.emit('join', roomId);
		}
	};

	const createPeer = () => {
		const peer = new RTCPeerConnection({
			iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
		});

		peer.onicecandidate = event => {
			if (event.candidate) {
				socket.emit('ice-candidate', {
					target: otherUser.current,
					candidate: event.candidate
				});
			}
		};

		peer.ontrack = event => {
			if (remoteVideoRef.current) {
				remoteVideoRef.current.srcObject = event.streams[0];
			}
		};

		return peer;
	};

	const createOffer = async () => {
		const offer = await peerRef.current.createOffer();
		await peerRef.current.setLocalDescription(offer);
		socket.emit('offer', {
			target: otherUser.current,
			caller: socket.id,
			sdp: offer
		});
	};

	const handleReceiveOffer = async ({ sdp, caller }) => {
		otherUser.current = caller;
		try {
			const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
			localVideoRef.current.srcObject = stream;
			peerRef.current = createPeer();
			stream.getTracks().forEach(track => peerRef.current.addTrack(track, stream));
		} catch (err) {
			console.warn('📷 상대방 연결 중 → 카메라 없음, fallback 적용');
			if (localVideoRef.current) {
				localVideoRef.current.poster = './assets/imgs/fall-back-image.png';
			}
			peerRef.current = createPeer();
		}
		await peerRef.current.setRemoteDescription(new RTCSessionDescription(sdp));
		const answer = await peerRef.current.createAnswer();
		await peerRef.current.setLocalDescription(answer);
		socket.emit('answer', { target: caller, sdp: answer });
	};

	const handleReceiveAnswer = ({ sdp }) => {
		peerRef.current.setRemoteDescription(new RTCSessionDescription(sdp));
	};

	const handleNewICECandidateMsg = (candidate) => {
		peerRef.current.addIceCandidate(new RTCIceCandidate(candidate));
	};

	return (
		<div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
			<h2>📞 1:1 화상채팅</h2>
			{!joined && (
				<div style={{ marginBottom: '10px' }}>
					<input
						type="text"
						placeholder="방 번호 입력"
						value={roomId}
						onChange={(e) => setRoomId(e.target.value)}
						style={{ padding: '6px', fontSize: '16px', marginRight: '10px' }}
					/>
					<button onClick={joinRoom} style={{ padding: '6px 12px', fontSize: '16px' }}>입장</button>
				</div>
			)}
			<div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
				<div>
					<h4>📷 나</h4>
					<video
						ref={localVideoRef}
						autoPlay
						playsInline
						muted
						width="300"
						height="200"
						poster="./assets/imgs/fall-back-image.png"
					/>
				</div>
				<div>
					<h4>👤 상대</h4>
					<video ref={remoteVideoRef} autoPlay playsInline width="300" height="200" />
				</div>
			</div>
		</div>
	);
};

export default VideoChat;
