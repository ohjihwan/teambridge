import { StrictMode } from 'react' // 개발 중에 잘못된 코드를 감지해주는 React의 디버깅 도우미, 없어도 앱은 잘 돌아가지만, 개발 단계에서는 있는 게 좋음
import { createRoot } from 'react-dom/client' // React 18부터 생긴 새로운 방식 (표준)
import '@scss/common-ui.scss';
import App from './App.jsx'

createRoot(document.getElementById('root')).render( /* index.html 안에 <div id="root"></div> 에 연결하겠다 */
	<StrictMode> {/* 실수 검사 도우미 */}
		<App /> {/* 컴포넌트를 실제로 브라우저에 표시하라는 명령 */}
	</StrictMode>,
)
