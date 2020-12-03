import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

export default {
	input: "src/scripts/popup.js",
	output: {
		dir: 'dist',
		format: 'iife',
		sourcemap: 'inline',
	},
	plugins: [
		resolve(),
		terser(),
	],
}