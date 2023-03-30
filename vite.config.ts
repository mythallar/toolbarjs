import { defineConfig } from 'vite';
import * as path from 'path';

export default defineConfig({
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/jquery.toolbar.js'),
            name: 'jquery.toolbar',
            fileName: (format) => `jquery.toolbar.${format}.js`
        },
        rollupOptions: {
            external: ['jquery'],
            output: {
                globals: {
                    jquery: '$',
                },
            },
        }
    }
});
