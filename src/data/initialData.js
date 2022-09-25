import {
  MaxPic, RamPic, amyPic, juliuPic,
} from '../images/images';

export const messages = JSON.parse(localStorage.getItem('messages')) || [
  {
    id: 1,
    content: "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
    createdAt: new Date().getTime(),
    score: 12,
    user: {
      image: amyPic,
      username: 'amyrobson',
    },
    replies: [],
  },
  {
    id: 2,
    content: "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
    createdAt: new Date().getTime(),
    score: 12,
    user: {
      image: MaxPic,
      username: 'maxblagun',
    },
    replies: [
      {
        id: 3,
        content: "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
        createdAt: new Date().getTime(),
        score: 4,
        replyingTo: 'maxblagun',
        user: {
          image: RamPic,
          username: 'ramsesmiron',
        },
      },
      {
        id: 4,
        content: "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
        createdAt: new Date().getTime(),
        score: 3,
        replyingTo: 'ramsesmiron',
        user: {
          image: juliuPic,
          username: 'juliusomo',
        },
      },
    ],
  },
  {
    id: 5,
    content: 'Life hurts.',
    createdAt: new Date().getTime(),
    score: 3,
    user: {
      image: 'https://avatars.githubusercontent.com/u/76530841?v=4',
      username: 'wanlucas',
    },
    replies: [],
  },
];

export const user = JSON.parse(localStorage.getItem('user')) || {
  image: juliuPic,
  username: 'juliusomo',
  votes: [],
};

export const id = JSON.parse(localStorage.getItem('currentId')) || 6;

export const comment = {
  content: '',
  createdAt: new Date().getTime(),
  score: 0,
  user,
};
