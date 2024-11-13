const adjectives = [
  "flying", "dancing", "sleeping", "jumping", "glowing", "racing", "dreaming",
  "smiling", "crying", "laughing", "tired", "energetic", "mysterious", "cyber",
  "neon", "digital", "quantum", "cosmic", "stellar", "lunar"
];

const nouns = [
  "tiger", "dragon", "phoenix", "wolf", "eagle", "serpent", "dolphin",
  "robot", "ninja", "samurai", "warrior", "knight", "wizard", "sage",
  "monk", "ghost", "spirit", "demon", "angel", "star"
];

const colors = [
  "crimson", "azure", "golden", "silver", "emerald", "sapphire", "ruby",
  "jade", "obsidian", "neon", "chrome", "crystal", "shadow", "frost",
  "plasma", "cyber", "cosmic", "astral", "void", "quantum"
];

export function generateId(): string {
  const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  
  return `${randomColor}-${randomAdjective}-${randomNoun}`;
} 