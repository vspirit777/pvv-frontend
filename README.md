# Install packages
At project root folder, run `yarn install`
# Run on local
At project root folder, run:
`NODE_ENV=development npm run dev root@45.32.113.62`

If it doesn't work, run this below cmd instead:
`NODE_OPTIONS=--openssl-legacy-provider NODE_ENV=development npm run dev root@45.32.113.62`

# Code Structure notes:

HomePage: src/routes/Home/index.js

Header in HomePage: src/components/Header/Header.js
