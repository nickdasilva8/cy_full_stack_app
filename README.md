# Cy fullstack app

## Run in docker container locally

- create a `.env` in your project root
  - in `.env`, set the following:
    ```bash
      DATABASE_URL="postgresql://cy_local_db_user:cy_local_db_pass@postgresservice:5432/cy_local_db"
    ```
    note the `@[domain]:port` is different between docker container and locally.
- `docker build -t sleepingapp .`
- run `docker-compose -f docker-compose.container.yml up`
- when the app is done spinning up and running it's tests, it should be available on http://localhost:3000

## Run locally:

I used node 18 when building this locally.

- `npm install`
- create a `.env` in your project root
  - in `.env`, set the following:
    ```bash
      DATABASE_URL="postgresql://cy_local_db_user:cy_local_db_pass@localhost:5432/cy_local_db"
    ```
- `docker-compose up`
  - spins up a postgres DB in a container for your local app to connect to
- `pre-condition`
  - migrates the DB
  - Seeds the DB
  - runs tests
- `npm run dev`
- app will be available on http://localhost:3000

## npm scripts

### Build and dev scripts

- `dev` – start dev server
- `build` – bundle application for production
- `export` – exports static website to `out` folder
- `analyze` – analyzes application bundle with [@next/bundle-analyzer](https://www.npmjs.com/package/@next/bundle-analyzer)

### Testing scripts

- `typecheck` – checks TypeScript types
- `lint` – runs ESLint
- `prettier:check` – checks files with Prettier
- `jest` – runs jest tests
- `jest:watch` – starts jest watch
- `test` – runs `jest`, `prettier:check`, `lint` and `typecheck` scripts

### Other scripts

- `storybook` – starts storybook dev server
- `storybook:build` – build production storybook bundle to `storybook-static`
- `prettier:write` – formats all files with Prettier

### other info:

- boilerplate based on https://github.com/mantinedev/next-app-template

---

# Improvements?

### Form

**Date**

- prevent the same user logging multiple logs for the same day
- let the user select the date they want to log sleep hours again
- getting the genders from the ENUM would be better than the option array in the UI

### List of records

- would be problematic in real use due to no pagination
  - would fetch initial page size server side
  - fetch additional pages as required with something like SWR
- Could add a filter at the top to bring back results for specific user only
- Could add page size choice
- Could add ordering to table

### Database

- the constraint on username alone is bad; nick could be nicholas/nicole/nicola, etc.
  - there would need to be some abstract way to make them identifiable though; DOB could do it, or something else.
- Took liberty in standardising names so Nick/nick/nICK/nicK are all treated the same.
- would want columns for soft delete on relevant tables
