# Cy fullstack app

### Run locally:

I used node 18 when building this locally.

- `npm install`
- in `.env`, set the following:
  ```bash
    DATABASE_URL="postgresql://cy_local_db_user:cy_local_db_pass@localhost:5432/cy_local_db"
  ```
- `docker-compose up`
  - spins up a postgres DB in a container
- `npx prisma migrate dev`
  - This will setup the tables in the DB you're running with docker-compose.
- `npx prisma db seed`
  - This will seed the gender data into the DB
- `npm run dev`

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
