-- Insert new Asian-influenced fantasy names
-- Created at: 2024-12-09 13:25:11

-- Female names
INSERT INTO names (id, name, type, gender, created_at) VALUES
(178, 'Xiaoyin', 'first', 'female', '2024-12-09 13:25:11'),
(179, 'Jademist', 'first', 'female', '2024-12-09 13:25:11'),
(180, 'Sakurae', 'first', 'female', '2024-12-09 13:25:11'),
(181, 'Lunwei', 'first', 'female', '2024-12-09 13:25:11'),
(182, 'Mingzhu', 'first', 'female', '2024-12-09 13:25:11');

-- Male names
INSERT INTO names (id, name, type, gender, created_at) VALUES
(183, 'Ryuken', 'first', 'male', '2024-12-09 13:25:11'),
(184, 'Kaizen', 'first', 'male', '2024-12-09 13:25:11'),
(185, 'Tianfeng', 'first', 'male', '2024-12-09 13:25:11'),
(186, 'Seiryuu', 'first', 'male', '2024-12-09 13:25:11'),
(187, 'Wuxian', 'first', 'male', '2024-12-09 13:25:11');

-- Add comments for name meanings
COMMENT ON COLUMN names.name IS 'Xiaoyin: Little shadow (Chinese)
Jademist: Combination of jade stone and mystical elements
Sakurae: Fantasy twist on Japanese cherry blossom
Lunwei: Dragon might (Chinese)
Mingzhu: Bright pearl (Chinese)
Ryuken: Dragon sword (Japanese)
Kaizen: Continuous improvement (Japanese)
Tianfeng: Heavenly wind (Chinese)
Seiryuu: Azure Dragon of the East (Japanese)
Wuxian: Limitless (Chinese)';
