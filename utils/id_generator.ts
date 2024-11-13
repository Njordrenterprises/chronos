const adjectives = [
    // Appearance
    "glowing", "neon", "chrome", "crystal", "dark", "bright", "shimmering", "metallic", "holographic", "iridescent",
    // Tech
    "digital", "quantum", "cyber", "neural", "binary", "virtual", "synthetic", "atomic", "plasma", "laser",
    // Mood
    "silent", "chaotic", "serene", "wild", "fierce", "calm", "savage", "peaceful", "frenzied", "tranquil",
    // Size
    "massive", "tiny", "giant", "micro", "colossal", "nano", "mega", "infinite", "cosmic", "quantum",
    // Quality
    "elite", "prime", "ultra", "hyper", "super", "mega", "supreme", "ultimate", "extreme", "maximum"
];

const verbs = [
    // Movement
    "running", "flying", "jumping", "dancing", "drifting", "floating", "racing", "diving", "soaring", "gliding",
    // Action
    "fighting", "hunting", "seeking", "chasing", "stalking", "guarding", "watching", "protecting", "defending", "striking",
    // Tech
    "hacking", "coding", "mining", "processing", "computing", "scanning", "analyzing", "programming", "encrypting", "debugging",
    // Power
    "charging", "pulsing", "surging", "beaming", "radiating", "glowing", "burning", "freezing", "shocking", "blasting",
    // State
    "sleeping", "dreaming", "thinking", "evolving", "morphing", "transforming", "shifting", "phasing", "mutating", "adapting"
];

const nouns = [
    // Tech
    "android", "cyborg", "robot", "machine", "computer", "network", "system", "matrix", "program", "circuit",
    // Creatures
    "dragon", "phoenix", "tiger", "wolf", "eagle", "serpent", "lion", "falcon", "panther", "griffin",
    // Elements
    "storm", "flame", "frost", "thunder", "lightning", "shadow", "light", "void", "crystal", "plasma",
    // Cosmic
    "star", "nebula", "galaxy", "comet", "asteroid", "planet", "moon", "sun", "pulsar", "quasar",
    // Cyber
    "virus", "firewall", "protocol", "cipher", "code", "data", "proxy", "server", "node", "core"
];

export function generateId(): string {
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomVerb = verbs[Math.floor(Math.random() * verbs.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    
    return `${randomAdjective}-${randomVerb}-${randomNoun}`;
} 