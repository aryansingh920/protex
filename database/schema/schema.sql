CREATE TYPE event_status AS ENUM ('available', 'claimed', 'acknowledged');



CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(100) UNIQUE NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    prefix VARCHAR(50),
    region VARCHAR(50) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);


CREATE TABLE events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    content TEXT NOT NULL,
    region VARCHAR(50) NOT NULL, -- e.g., 'Asia', 'Europe', 'US'
    status event_status DEFAULT 'available',
    claimed_by UUID REFERENCES users(id),     
    claimed_at TIMESTAMP WITH TIME ZONE,
    acknowledged_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for fast regional filtering
CREATE INDEX idx_events_region_status ON events(region, status);


