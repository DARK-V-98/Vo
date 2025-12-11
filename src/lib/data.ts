import type { ImagePlaceholder } from './placeholder-images';
import { PlaceHolderImages } from './placeholder-images';

const getImage = (id: string): ImagePlaceholder => {
  const image = PlaceHolderImages.find((img) => img.id === id);
  if (!image) {
    // Fallback to a default image if not found
    return {
      id: 'default',
      description: 'Default image',
      imageUrl: 'https://picsum.photos/seed/default/400/400',
      imageHint: 'placeholder',
    };
  }
  return image;
};

export type User = {
  id: string;
  name: string;
  age: number;
  bio: string;
  interests: string[];
  image: ImagePlaceholder;
};

export type Group = {
  id: string;
  name: string;
  description: string;
  members: number;
  image: ImagePlaceholder;
  topic: string;
};

export type Event = {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  image: ImagePlaceholder;
};

export type Message = {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
};

export type Conversation = {
  id: string;
  userId: string;
  messages: Message[];
};

export const users: User[] = [
  { id: '1', name: 'Alex', age: 28, bio: "Software engineer with a love for the great outdoors. I'm just as happy coding as I am hiking a new trail.", interests: ['Hiking', 'Coding', 'Photography', 'Indie Music'], image: getImage('profile-1') },
  { id: '2', name: 'Brenda', age: 25, bio: 'Graphic designer and dog lover. My perfect weekend involves a long walk with my pup and finding a new coffee shop.', interests: ['Design', 'Dogs', 'Coffee', 'Art Museums'], image: getImage('profile-2') },
  { id: '3', name: 'Charlie', age: 31, bio: 'Chef who believes food is the language of love. Looking for someone to share my culinary creations with.', interests: ['Cooking', 'Wine Tasting', 'Jazz Music', 'Traveling'], image: getImage('profile-3') },
  { id: '4', name: 'Diana', age: 29, bio: 'Yoga instructor and mindfulness advocate. I value deep connections and authentic conversations.', interests: ['Yoga', 'Meditation', 'Veganism', 'Reading'], image: getImage('profile-4') },
  { id: '5', name: 'Ethan', age: 27, bio: 'Musician and part-time philosopher. I write songs about life and love. Let\'s create a harmony together.', interests: ['Guitar', 'Songwriting', 'Philosophy', 'Concerts'], image: getImage('profile-5') },
  { id: '6', name: 'Fiona', age: 26, bio: 'Bookworm and aspiring novelist. I spend my days lost in stories and my nights writing them.', interests: ['Reading', 'Creative Writing', 'Tea', 'Cats'], image: getImage('profile-6') },
  { id: '7', name: 'George', age: 33, bio: 'Architect fascinated by sustainable design. I enjoy cycling around the city and exploring new buildings.', interests: ['Architecture', 'Cycling', 'Sustainability', 'Modern Art'], image: getImage('profile-7') },
  { id: '8', name: 'Hannah', age: 24, bio: 'Frequent traveler and language learner. I have a passion for discovering new cultures and collecting stories.', interests: ['Traveling', 'Languages', 'Backpacking', 'Street Food'], image: getImage('profile-8') },
  { id: '9', name: 'Ian', age: 30, bio: 'Fitness enthusiast and personal trainer. I believe in pushing limits, both in the gym and in life.', interests: ['Weightlifting', 'Running', 'Nutrition', 'Action Movies'], image: getImage('profile-9') },
  { id: '10', name: 'Jenna', age: 29, bio: 'Scientist with a curious mind. I love stargazing and pondering the big questions of the universe.', interests: ['Astronomy', 'Science Fiction', 'Board Games', 'Podcasts'], image: getImage('profile-10') },
  { id: '11', name: 'Kyle', age: 27, bio: 'Gamer, streamer, and esports fan. Looking for a player 2 to join my team.', interests: ['Gaming', 'Streaming', 'Tech', 'Anime'], image: getImage('profile-11') },
  { id: '12', name: 'Laura', age: 32, bio: 'Animal rescue volunteer and nature photographer. My heart belongs to furry friends and beautiful landscapes.', interests: ['Animal Rescue', 'Photography', 'Nature', 'Gardening'], image: getImage('profile-12') },
];

export const currentUser: User = {
  id: 'current-user',
  name: 'Riley',
  age: 29,
  bio: 'A curious soul exploring the world one day at a time. I love deep conversations, spontaneous adventures, and cozy nights in. My interests are a mixed bag of creative pursuits and outdoor activities.',
  interests: ['Creative Writing', 'Kayaking', 'Documentaries', 'Pottery'],
  image: getImage('current-user'),
};

export const groups: Group[] = [
  { id: '1', name: 'Mountain Trekkers', description: 'For those who find peace in the peaks.', members: 124, image: getImage('group-1'), topic: 'Hiking and trekking' },
  { id: '2', name: 'Page Turners Society', description: 'A cozy corner for book lovers to discuss their latest reads.', members: 88, image: getImage('group-2'), topic: 'Book club and literature' },
  { id: '3', name: 'The Vineyard Vanguard', description: 'Exploring the world one sip at a time.', members: 62, image: getImage('group-3'), topic: 'Wine tasting and appreciation' },
  { id: '4', name: 'Shutterbugs Anonymous', description: 'Capturing moments and sharing our passion for photography.', members: 210, image: getImage('group-4'), topic: 'Photography' },
  { id: '5', name: 'Zen Seekers', description: 'Finding balance and tranquility through yoga and meditation.', members: 150, image: getImage('group-5'), topic: 'Yoga and mindfulness' },
  { id: '6', name: 'Salsa & Soul', description: 'Feel the rhythm, join the dance!', members: 95, image: getImage('group-6'), topic: 'Salsa dancing' },
  { id: '7', name: 'Pixel Pals', description: 'Connecting gamers of all kinds.', members: 305, image: getImage('group-7'), topic: 'Video games and online gaming' },
  { id: '8', name: 'Wanderlust Warriors', description: 'Sharing travel stories, tips, and inspiration.', members: 412, image: getImage('group-8'), topic: 'Travel and adventure' },
];

export const events: Event[] = [
  { id: '1', title: 'Summer Wine & Jazz Night', date: 'August 15, 2024', location: 'City Vineyard', description: 'An elegant evening of smooth jazz, fine wines, and great company under the stars.', image: getImage('event-1') },
  { id: '2', title: 'Indie Bands Showcase', date: 'August 22, 2024', location: 'The Echo Hall', description: 'Discover your new favorite band at our monthly indie music showcase.', image: getImage('event-2') },
  { id: '3', title: 'Modern Art Gallery Tour', date: 'September 5, 2024', location: 'Downtown Art Museum', description: 'A guided tour of the latest modern art exhibition, followed by a discussion over coffee.', image: getImage('event-3') },
  { id: '4', title: 'Pasta Making Workshop', date: 'September 12, 2024', location: 'The Culinary Corner', description: 'Learn to make authentic Italian pasta from scratch with a professional chef.', image: getImage('event-4') },
  { id: '5', title: 'Starlight Cinema: Outdoor Movie', date: 'September 20, 2024', location: 'Greenwood Park', description: 'Cozy up for a classic movie screening in the park. Bring your blankets and snacks!', image: getImage('event-5') },
];

export const conversations: Conversation[] = [
    {
        id: 'convo-1',
        userId: '1',
        messages: [
            { id: 'msg-1-1', senderId: '1', text: 'Hey! I saw you’re into hiking too. Any favorite trails?', timestamp: '10:30 AM' },
            { id: 'msg-1-2', senderId: 'current-user', text: 'Hi Alex! Absolutely. I just did the Eagle Peak trail last weekend, the view was incredible. You?', timestamp: '10:32 AM' },
        ]
    },
    {
        id: 'convo-2',
        userId: '2',
        messages: [
            { id: 'msg-2-1', senderId: 'current-user', text: 'Your dog is so cute! What breed is he?', timestamp: 'Yesterday' },
            { id: 'msg-2-2', senderId: '2', text: 'Thanks! He’s a Golden Doodle named Leo. The best boy.', timestamp: 'Yesterday' },
        ]
    },
    {
        id: 'convo-4',
        userId: '4',
        messages: [
            { id: 'msg-4-1', senderId: '4', text: 'Namaste. Your profile has such a calm energy. I was wondering if you practice vinyasa?', timestamp: '2 days ago' },
        ]
    }
];

export const groupMessages: Record<string, Message[]> = {
    '2': [
        { id: 'gmsg-1', senderId: '6', text: 'Just finished "The Midnight Library". What a ride! Has anyone else read it?', timestamp: '9:15 AM' },
        { id: 'gmsg-2', senderId: '4', text: 'Oh, I loved that one! The concept was so thought-provoking.', timestamp: '9:17 AM' },
        { id: 'gmsg-3', senderId: 'current-user', text: 'It\'s on my to-read list! I think I\'ll start it tonight.', timestamp: '10:05 AM' },
    ]
}
