-- Add REGION column and update existing records
-- Created at: 2024-12-09 13:32:04

-- Add new REGION column
ALTER TABLE names ADD COLUMN region VARCHAR(50);

-- Update existing names to EU region
UPDATE names SET region = 'EU' WHERE id <= 177;

-- Insert new Asian names with REGION specified
INSERT INTO names (id, name, type, gender, created_at, region) VALUES
-- Female names
(178, 'Xiaoyin', 'first', 'female', '2024-12-09 13:32:04', 'ASIA'),
(179, 'Jademist', 'first', 'female', '2024-12-09 13:32:04', 'ASIA'),
(180, 'Sakurae', 'first', 'female', '2024-12-09 13:32:04', 'ASIA'),
(181, 'Lunwei', 'first', 'female', '2024-12-09 13:32:04', 'ASIA'),
(182, 'Mingzhu', 'first', 'female', '2024-12-09 13:32:04', 'ASIA'),
-- Male names
(183, 'Ryuken', 'first', 'male', '2024-12-09 13:32:04', 'ASIA'),
(184, 'Kaizen', 'first', 'male', '2024-12-09 13:32:04', 'ASIA'),
(185, 'Tianfeng', 'first', 'male', '2024-12-09 13:32:04', 'ASIA'),
(186, 'Seiryuu', 'first', 'male', '2024-12-09 13:32:04', 'ASIA'),
(187, 'Wuxian', 'first', 'male', '2024-12-09 13:32:04', 'ASIA');

-- Add comments for the REGION column and name meanings
COMMENT ON COLUMN names.region IS 'Geographic/cultural region of origin for the name (EU or ASIA)';

COMMENT ON COLUMN names.name IS 'Name meanings for Asian names:
Xiaoyin: Little shadow (Chinese)
Jademist: Combination of jade stone and mystical elements
Sakurae: Fantasy twist on Japanese cherry blossom
Lunwei: Dragon might (Chinese)
Mingzhu: Bright pearl (Chinese)
Ryuken: Dragon sword (Japanese)
Kaizen: Continuous improvement (Japanese)
Tianfeng: Heavenly wind (Chinese)
Seiryuu: Azure Dragon of the East (Japanese)
Wuxian: Limitless (Chinese)';
