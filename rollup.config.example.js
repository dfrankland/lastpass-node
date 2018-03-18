import config from './rollup.config';

export default {
  ...config,
  input: './example/index.js',
  output: {
    ...config.output,
    file: './dist-example/index.js',
  },
  external: [
    ...config.external,
    'readline',
  ],
};
