build:
	mkdir -p public
	npx esbuild src/main.ts --bundle --format=esm --outfile=public/app.js
	cp node_modules/@kittycad/kcl-wasm-lib/kcl_wasm_lib_bg.wasm public/kcl_wasm_lib_bg.wasm

test:
	npx vitest run --environment jsdom

serve: build
	npx esbuild src/main.ts --bundle --format=esm --outfile=public/app.js --serve=127.0.0.1:3000 --servedir=public --cors-origin=* --watch
