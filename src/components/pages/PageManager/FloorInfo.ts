export type SingleFloorInfo = {
    prev: string,
    next: string,
    name: string,
    rooms: string[],
}

const FloorInfo: { [key: string]: SingleFloorInfo; } = {
    "floor-10-West": {
        "prev": "start",
        "next": "floor-10-East",
        "name": "10th Floor West",
        "rooms": ["kitchen", "study"],
    },  
    "floor-10-East": {
        "prev": "floor-10-West",
        "next": "floor-9-East",
        "name": "10th Floor East",
        "rooms": ["study", "kitchen"],
    },
    "floor-9-East": {
        "prev": "floor-10-East",
        "next": "floor-9-West",
        "name": "9th Floor East",
        "rooms": ["study", "kitchen"],
    },
    "floor-9-West": {
        "prev": "floor-9-East",
        "next": "floor-8-West",
        "name": "9th Floor West",
        "rooms": ["kitchen", "study"],
    },
    "floor-8-West": {
        "prev": "floor-9-West",
        "next": "floor-8-East",
        "name": "8th Floor West",
        "rooms": ["kitchen", "study"],
    },
    "floor-8-East": {
        "prev": "floor-8-West",
        "next": "floor-7-East",
        "name": "8th Floor East",
        "rooms": ["study", "kitchen"],
    },
    "floor-7-East": {
        "prev": "floor-8-East",
        "next": "floor-7-West",
        "name": "7th Floor East",
        "rooms": ["study", "kitchen"],
    },
    "floor-7-West": {
        "prev": "floor-7-East",
        "next": "floor-6-West",
        "name": "7th Floor West",
        "rooms": ["kitchen", "study"],
    },
    "floor-6-West": {
        "prev": "floor-7-West",
        "next": "floor-6-East",
        "name": "6th Floor West",
        "rooms": ["kitchen", "study"],
    },
    "floor-6-East": {
        "prev": "floor-6-West",
        "next": "floor-5-East",
        "name": "6th Floor East",
        "rooms": ["study", "kitchen"],
    },
    "floor-5-East": {
        "prev": "floor-6-East",
        "next": "floor-5-West",
        "name": "5th Floor East",
        "rooms": ["study", "kitchen"],
    },
    "floor-5-West": {
        "prev": "floor-5-East",
        "next": "floor-4-West",
        "name": "5th Floor West",
        "rooms": ["kitchen", "study"],
    },
    "floor-4-West": {
        "prev": "floor-5-West",
        "next": "floor-4-East",
        "name": "4th Floor West",
        "rooms": ["kitchen", "study"],
    },
    "floor-4-East": {
        "prev": "floor-4-West",
        "next": "floor-3-East",
        "name": "4th Floor East",
        "rooms": ["study", "kitchen"],
    },
    "floor-3-East": {
        "prev": "floor-4-East",
        "next": "review",
        "name": "3rd Floor",
        "rooms": ["great room", "games room", "laundry"],
    }
}

export default FloorInfo;
