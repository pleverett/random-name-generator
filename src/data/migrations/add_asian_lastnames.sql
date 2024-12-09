-- Add Asian-influenced last names
-- Created at: 2024-12-09 13:36:13

-- Insert new Asian last names
INSERT INTO names (id, name, type, gender, created_at, region) VALUES
-- Female last names
(188, 'Jadestone', 'last', 'female', '2024-12-09 13:36:13', 'ASIA'),
(189, 'Mooncloud', 'last', 'female', '2024-12-09 13:36:13', 'ASIA'),
(190, 'Cherryfrost', 'last', 'female', '2024-12-09 13:36:13', 'ASIA'),
(191, 'Lotusweaver', 'last', 'female', '2024-12-09 13:36:13', 'ASIA'),
(192, 'Pearlwhisper', 'last', 'female', '2024-12-09 13:36:13', 'ASIA'),

-- Male last names
(193, 'Steeldragon', 'last', 'male', '2024-12-09 13:36:13', 'ASIA'),
(194, 'Stormwind', 'last', 'male', '2024-12-09 13:36:13', 'ASIA'),
(195, 'Cloudforge', 'last', 'male', '2024-12-09 13:36:13', 'ASIA'),
(196, 'Dragonheart', 'last', 'male', '2024-12-09 13:36:13', 'ASIA'),
(197, 'Ironspirit', 'last', 'male', '2024-12-09 13:36:13', 'ASIA');

-- Add comments for the new last names
COMMENT ON COLUMN names.name IS 'Asian-influenced last names meanings:
Female last names:
Jadestone: Represents strength and beauty in Asian culture
Mooncloud: Inspired by traditional Asian poetry and mythology
Cherryfrost: Combines sakura (cherry blossom) imagery with mystical elements
Lotusweaver: References the sacred lotus flower in Asian culture
Pearlwhisper: Inspired by Asian pearl symbolism and mysticism

Male last names:
Steeldragon: Combines metallurgy with dragon mythology
Stormwind: Inspired by Asian wind spirits and weather mythology
Cloudforge: References celestial themes in Asian mythology
Dragonheart: Based on dragon symbolism in Asian culture
Ironspirit: Combines strength with spiritual elements';
