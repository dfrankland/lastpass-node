import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import { dependencies } from './package.json';

export default {
  input: './src/index.js',
  output: {
    file: './dist/index.js',
    format: 'cjs',
  },
  external: [
    ...Object.keys(dependencies),
    'path',
    'os',
    'fs',
    'util',
    'crypto',
    'querystring',
  ],
  plugins: [
    nodeResolve(),
    commonjs(),
    babel({
      babelrc: false,
      sourceMaps: true,
      presets: [
        [
          'env',
          {
            modules: false,
            targets: {
              node: '8',
            },
          },
        ],
        'stage-0',
      ],
      plugins: [
        'external-helpers',
      ],
    }),
  ],
};
