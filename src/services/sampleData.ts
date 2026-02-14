import {Essay, Meditation} from '../types';

export const sampleEssays: Essay[] = [
  {
    id: 'essay-1',
    title: 'Introduction to IFS',
    description:
      'Learn the foundations of Internal Family Systems therapy — how we all have parts, and how Self-energy can heal.',
    author: 'IFS Meditation App',
    duration: 900,
    audioUrl: 'EDU-intro-to-ifs.mp3',
    category: 'Foundations',
    topics: ['Self', 'Parts', 'Overview'],
  },
  {
    id: 'essay-2',
    title: 'Understanding Protectors',
    description:
      'Explore how managers and firefighters work to protect us from pain, and why they deserve our gratitude.',
    author: 'IFS Meditation App',
    duration: 720,
    audioUrl: 'EDU-understanding-protectors.mp3',
    category: 'Foundations',
    topics: ['Managers', 'Firefighters', 'Protectors'],
  },
  {
    id: 'essay-3',
    title: 'Meeting Your Exiles',
    description:
      'A gentle introduction to the young, wounded parts that our protectors guard — and the path toward unburdening.',
    author: 'IFS Meditation App',
    duration: 840,
    audioUrl: 'EDU-meeting-exiles.mp3',
    category: 'Going Deeper',
    topics: ['Exiles', 'Unburdening', 'Healing'],
  },
  {
    id: 'essay-4',
    title: 'The Eight Cs of Self',
    description:
      'Discover the qualities of Self-energy: Calm, Curiosity, Clarity, Compassion, Confidence, Courage, Creativity, and Connectedness.',
    author: 'IFS Meditation App',
    duration: 660,
    audioUrl: 'EDU-eight-cs.mp3',
    category: 'Foundations',
    topics: ['Self', 'Self-energy', 'Qualities'],
  },
  {
    id: 'essay-5',
    title: 'Self-Leadership in Daily Life',
    description:
      'Learn how to bring Self-energy into everyday decisions, relationships, and moments of stress.',
    author: 'IFS Meditation App',
    duration: 780,
    audioUrl: 'EDU-self-leadership.mp3',
    category: 'Practice',
    topics: ['Self-leadership', 'Daily life', 'Integration'],
  },
  {
    id: 'essay-6',
    title: 'Working with the Inner Critic',
    description:
      'Understand the inner critic as a protective part and learn to build a new relationship with it.',
    author: 'IFS Meditation App',
    duration: 810,
    audioUrl: 'EDU-inner-critic.mp3',
    category: 'Going Deeper',
    topics: ['Inner Critic', 'Protectors', 'Compassion'],
  },
];

export const sampleMeditations: Meditation[] = [
  {
    id: 'med-1',
    title: 'Finding Self-Energy',
    description:
      'A gentle guided meditation to help you access your core Self — the calm, curious center within.',
    duration: 600,
    audioUrl: 'MED-finding-self.mp3',
    category: 'Beginner',
    type: 'guided',
    targetPart: 'Self',
    intention: 'Connect with your core Self-energy',
  },
  {
    id: 'med-2',
    title: 'Befriending a Protector',
    description:
      'Learn to approach a protective part with curiosity and compassion rather than resistance.',
    duration: 900,
    audioUrl: 'MED-befriending-protector.mp3',
    category: 'Core Practice',
    type: 'guided',
    targetPart: 'Protector',
    intention: 'Build trust with a protective part',
  },
  {
    id: 'med-3',
    title: 'Inner Critic Compassion',
    description:
      'Transform your relationship with the inner critic by understanding its protective intention.',
    duration: 720,
    audioUrl: 'MED-inner-critic.mp3',
    category: 'Core Practice',
    type: 'guided',
    targetPart: 'Inner Critic',
    intention: 'Soften the inner critic with understanding',
  },
  {
    id: 'med-4',
    title: 'Parts Check-In',
    description:
      'A daily practice to notice what parts are active, acknowledge them, and bring Self-energy to each.',
    duration: 480,
    audioUrl: 'MED-parts-checkin.mp3',
    category: 'Daily Practice',
    type: 'guided',
    intention: 'Notice and acknowledge active parts',
  },
  {
    id: 'med-5',
    title: 'Healing the Exile',
    description:
      'An advanced guided meditation for gently approaching and witnessing an exiled part with compassion.',
    duration: 1200,
    audioUrl: 'MED-healing-exile.mp3',
    category: 'Advanced',
    type: 'guided',
    targetPart: 'Exile',
    intention: 'Witness and comfort a wounded part',
  },
  {
    id: 'med-6',
    title: 'Self-Led Body Scan',
    description:
      'Scan your body from Self, noticing where parts hold tension and bringing compassion to those places.',
    duration: 900,
    audioUrl: 'MED-self-led-body-scan.mp3',
    category: 'Daily Practice',
    type: 'guided',
    targetPart: 'Body',
    intention: 'Bring Self-energy to physical tension',
  },
  {
    id: 'med-7',
    title: 'Unburdening Visualization',
    description:
      'A visualization practice where you help a part release burdens it has been carrying.',
    duration: 1080,
    audioUrl: 'MED-unburdening.mp3',
    category: 'Advanced',
    type: 'guided',
    targetPart: 'Exile',
    intention: 'Release old burdens and beliefs',
  },
  {
    id: 'med-8',
    title: 'Open Awareness Sit',
    description:
      'An unguided meditation with gentle bells — simply sit in Self-energy and observe.',
    duration: 600,
    audioUrl: 'MED-open-awareness.mp3',
    category: 'Daily Practice',
    type: 'unguided',
    intention: 'Rest in open awareness',
  },
];
