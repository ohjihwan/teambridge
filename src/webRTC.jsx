import { useEffect, useRef, useState } from 'react'
import fallbackImage from '@img/fall-back-Image.jpg' // 대체 이미지 경로

function VideoChat() {
	const localVideoRef = useRef(null);
	const remoteVideoRef = useRef(null);
	const [hasCamera, setHasCamera] = useState(true); // 카메라 유무 상태

	useEffect(() => {
		async function setupMedia() {
			try {
				const stream = await navigator.mediaDevices.getUserMedia({
					video: true,
					audio: true,
				});
				localVideoRef.current.srcObject = stream;

				const peer = new RTCPeerConnection();
				stream.getTracks().forEach(track => peer.addTrack(track, stream));
				peer.ontrack = e => {
					remoteVideoRef.current.srcObject = e.streams[0];
				};
			} catch (err) {
				console.warn("카메라를 사용할 수 없습니다:", err.message);
				setHasCamera(false);
			}
		}
		setupMedia();
	}, []);

	return (
		<div>
			{hasCamera ? (
				<video ref={localVideoRef} autoPlay playsInline muted style={{ width: '300px' }} />
			) : (
				<img src={fallbackImage} alt="대체 이미지" style={{ width: '300px', borderRadius: '8px' }} />
			)}
			<video ref={remoteVideoRef} autoPlay playsInline style={{ width: '300px' }} />
		</div>
	);
}

export default VideoChat;
