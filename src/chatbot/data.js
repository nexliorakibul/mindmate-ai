export const mockResponses = [
    "I hear you. Tell me more about that.",
    "It sounds like you're going through a lot right now.",
    "Have you tried taking a deep breath?",
    "That makes sense. How does that make you feel?",
    "I'm here for you.",
    "What do you think would help you feel better in this moment?",
    "It's okay to feel this way.",
    "You are stronger than you think.",
    "Would you like to try a quick meditation?",
    "Sometimes writing it down helps. Have you tried journaling today?",
];

export const getRandomResponse = () => {
    return mockResponses[Math.floor(Math.random() * mockResponses.length)];
};
