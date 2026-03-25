CREATE TYPE event_status AS ENUM ('available', 'claimed', 'acknowledged');

CREATE TABLE events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    content TEXT NOT NULL,
    region VARCHAR(50) NOT NULL, -- e.g., 'Asia', 'Europe', 'US'
    status event_status DEFAULT 'available',
    claimed_by VARCHAR(255),      -- userId of the moderator
    claimed_at TIMESTAMP WITH TIME ZONE, -- used for the 15-min logic
    acknowledged_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for fast regional filtering
CREATE INDEX idx_events_region_status ON events(region, status);
