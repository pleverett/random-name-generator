# Random Name Generator

A React application that generates random fantasy names with titles.

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up Supabase:
   - Create a new project at [Supabase](https://supabase.com)
   - Copy `.env.example` to `.env`
   - Update the `.env` file with your Supabase project URL and anon key
   - Run the migration scripts in the `migrations` folder in order:
     1. `001_create_tables.sql` - Creates the database schema
     2. `002_insert_female_first_names.sql` - Inserts female first names
     3. `003_insert_female_last_names.sql` - Inserts female last names
     4. `004_insert_male_first_names.sql` - Inserts male first names
     5. `005_insert_male_last_names.sql` - Inserts male last names
     6. `006_insert_female_titles.sql` - Inserts female titles
     7. `007_insert_male_titles.sql` - Inserts male titles

4. Start the development server:
   ```bash
   pnpm dev
   ```

## Features

- Generate random fantasy names with titles
- Filter by gender (male/female)
- Balanced dataset of names and titles
- Beautiful UI with animations

## Technology Stack

- React 18
- TypeScript
- Vite
- TailwindCSS
- Framer Motion
- Supabase
- React Icons

## License

MIT
