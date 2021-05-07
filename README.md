# Kohlekarte

Visit staging environment at https://kohlekarte-staging.netlify.com

## Development

Uses yarn 1.x

A mapbox token is required to display maps and needs to be available as an env
var `REACT_APP_MAPBOX_TOKEN`. You can provide this by creating a file `.env` in
the project root that defines this value. See `.env.sample` for an example.

```
export REACT_APP_MAPBOX_TOKEN="<token>"
```

Install dependencies

```
yarn
```

Run development server

```
yarn start
```

Build for production

```
yarn build
```
