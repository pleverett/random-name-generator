-- Create names table
CREATE TABLE IF NOT EXISTS names (
    id INTEGER PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('first', 'last')),
    gender VARCHAR(50) NOT NULL CHECK (gender IN ('male', 'female')),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create titles table
CREATE TABLE IF NOT EXISTS titles (
    id INTEGER PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    gender VARCHAR(50) NOT NULL CHECK (gender IN ('male', 'female')),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX idx_names_type ON names(type);
CREATE INDEX idx_names_gender ON names(gender);
CREATE INDEX idx_titles_gender ON titles(gender);
