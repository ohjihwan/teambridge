import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
	{ ignores: ['dist'] }, // 1. 검사 제외 폴더 설정
	{
		files: ['**/*.{js,jsx,scss}'], // 2. 검사 대상 파일 확장자
		languageOptions: { // 3. 문법, JSX 허용 등 코드 언어 환경 설정정
			ecmaVersion: 2020,
			globals: globals.browser,
			parserOptions: {
				ecmaVersion: 'latest',
				ecmaFeatures: { jsx: true },
				sourceType: 'module',
			},
		},
		plugins: { // 기능 확장 (React hook 검사 등)
			'react-hooks': reactHooks,
			'react-refresh': reactRefresh,
		},
		rules: { // 코드 스타일 및 오류 규칙 설정
			// 자바스크립트 기본 코드 품질 검사
			...js.configs.recommended.rules,
			// Hook 문법 오류 예방
			...reactHooks.configs.recommended.rules,
			// 안 쓰는 변수는 에러, 단 상수(MY_, _X)는 예외
			'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
			// HMR 오류 방지용 export 검사
			'react-refresh/only-export-components': ['warn', { allowConstantExport: true },],
		},
	},
]
