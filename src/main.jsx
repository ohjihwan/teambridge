import { StrictMode } from 'react' // 개발 중에 잘못된 코드를 감지해주는 React의 디버깅 도우미, 없어도 앱은 잘 돌아가지만, 개발 단계에서는 있는 게 좋음
import ReactDOM from 'react-dom/client'; // React 18부터 생긴 새로운 방식 (표준)
import '@scss/common-ui.scss';
import VideoChat from './components/webRTC.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<VideoChat />
	</React.StrictMode>
);
