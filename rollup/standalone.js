// Rollup plugins
import commonjs from "rollup-plugin-commonjs";
import babel from 'rollup-plugin-babel';
import svelte from 'rollup-plugin-svelte';
import {
  eslint
} from 'rollup-plugin-eslint';
import postcss from 'rollup-plugin-postcss';
import filesize from 'rollup-plugin-filesize';
import istanbul from 'rollup-plugin-istanbul';
import resolve from "rollup-plugin-node-resolve";


export default {
  input: 'src/standalone/overlay.js',
  output: {
    name: 'notOverlay',
    format: 'iife',
    file: 'dist/notOverlay.js',
    sourcemap: false,
  },
  plugins: [
    svelte({
      emitCss: true
    }),
    resolve({
      browser: true,
      dedupe: importee => importee === 'svelte' || importee.startsWith('svelte/')
    }),
    commonjs(),
    postcss({
      extract: true,
      minimize: true,
      use: [
        ['sass', {
          includePaths: [
            './src/standalone/theme',
            './node_modules'
          ]
        }]
      ]
    }),
    (process.env.ENV === 'test' &&
      babel({
        presets: [
          [
            "@babel/preset-env",
            {
              corejs: 3,
              modules: false,
              useBuiltIns: "usage",
              targets: {
                ie: "11"
              }
            }
          ]
        ],
        babelrc: false,
        runtimeHelpers: true,
        plugins: [
          "@babel/transform-arrow-functions",
          [
            "@babel/transform-runtime", {
              "regenerator": true,
            }
          ]
        ],
        exclude: ['tmpl/**', 'build/**', 'node_modules/**', 'css/**', 'js/**', 'test/**', 'bower_components/**', 'assets/*', 'dist/**']
      })),
    (process.env.ENV === 'test' && istanbul({
      exclude: ['node_modules/**', 'node_modules/@babel/runtime/helpers/**', 'node_modules/@babel/runtime/regenerator/**', 'node_modules/regenerator-runtime/**']
    })),
    filesize()
  ]
};
