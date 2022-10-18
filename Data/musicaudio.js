import uuid from "react-native-uuid";

export const MusicAudioOptions = {
  ProducersComposers: {
    ServiceType: [
      {
        id: 1,
        title: "Composing",
      },
      {
        id: 2,
        title: "Producing",
      },
    ],
    Genre: [
      {
        id: 3,
        title: "Edm",
      },
      {
        id: 4,
        title: "Hip Hop",
      },
      {
        id: 5,
        title: "Jazz",
      },
      {
        id: 6,
        title: "Pop",
      },
      {
        id: 7,
        title: "Rap",
      },
      {
        id: 8,
        title: "Reggae",
      },
      {
        id: 9,
        title: "Rock",
      },
      {
        id: 10,
        title: "Folk",
      },
      {
        id: 11,
        title: "Country",
      },
      {
        id: 12,
        title: "Soul",
      },
      {
        id: 13,
        title: "R&B",
      },
      {
        id: 14,
        title: "Cinematic",
      },
      {
        id: 15,
        title: "Trap",
      },
      {
        id: 16,
        title: "Classical",
      },
      {
        id: 17,
        title: "Orchestral",
      },
      {
        id: 18,
        title: "Metal",
      },
      {
        id: 19,
        title: "Blues",
      },
      {
        id: 20,
        title: "Funk",
      },
      {
        id: 21,
        title: "Latin",
      },
      {
        id: 22,
        title: "World",
      },
    ],
    Purpose: [
      {
        id: 23,
        title: "Songs",
      },
      {
        id: 24,
        title: "Films & Videos",
      },
      {
        id: 25,
        title: "Video Games",
      },
      {
        id: 26,
        title: "Podcasts",
      },
      {
        id: 27,
        title: "Audiobooks",
      },
    ],
  },
  SessionMusicians: {
    Instrument: [
      {
        id: 28,
        title: "Banjo",
      },
      {
        id: 29,
        title: "Bass",
      },
      {
        id: 30,
        title: "Cello",
      },
      {
        id: 31,
        title: "Drums",
      },
      {
        id: 32,
        title: "Flute",
      },
      {
        id: 33,
        title: "Guitar",
      },
      {
        id: 34,
        title: "Keyboards",
      },
      {
        id: 35,
        title: "Piano",
      },
      {
        id: 36,
        title: "Saxophone",
      },
      {
        id: 37,
        title: "Trumpet",
      },
      {
        id: 38,
        title: "Ukulele",
      },
      {
        id: 39,
        title: "Violin",
      },
      {
        id: 40,
        title: "Harmonica",
      },
      {
        id: 41,
        title: "Trombone",
      },
      {
        id: 42,
        title: "Clarinet",
      },
      {
        id: 43,
        title: "Percussion",
      },
      {
        id: 44,
        title: "Mandolin",
      },
      {
        id: 45,
        title: "Accordion",
      },
      {
        id: 46,
        title: "Viola",
      },
      {
        id: 47,
        title: "Harp",
      },
      {
        id: 48,
        title: "Sitar",
      },
    ],
    Genre: [
      {
        id: 49,
        title: "Pop",
      },
      {
        id: 50,
        title: "Rap",
      },
      {
        id: 51,
        title: "Hip Hop",
      },
      {
        id: 52,
        title: "Edm",
      },
      {
        id: 53,
        title: "Rock",
      },
      {
        id: 54,
        title: "Folk",
      },
      {
        id: 55,
        title: "Jazz",
      },
      {
        id: 56,
        title: "Gospel",
      },
      {
        id: 57,
        title: "Reggae",
      },
      {
        id: 58,
        title: "Soul",
      },
      {
        id: 59,
        title: "Punk",
      },
      {
        id: 60,
        title: "Country",
      },
      {
        id: 61,
        title: "R&B",
      },
      {
        id: 62,
        title: "Opera",
      },
      {
        id: 63,
        title: "Blues",
      },
      {
        id: 64,
        title: "Metal",
      },
      {
        id: 65,
        title: "Funk",
      },
      {
        id: 66,
        title: "Latin",
      },
      {
        id: 67,
        title: "Trap",
      },
      {
        id: 68,
        title: "Classical",
      },
    ],
  },
  SingersConcert: {
    SingerType: [
      {
        id: 69,
        title: "Classical",
      },
      {
        id: 70,
        title: "Country",
      },
      {
        id: 71,
        title: "Electronic dance music",
      },
      {
        id: 72,
        title: "Hip Hop",
      },
      {
        id: 73,
        title: "Indie rock",
      },
      {
        id: 74,
        title: "Jazz",
      },
      {
        id: 75,
        title: "K-pop",
      },
      {
        id: 76,
        title: "Metal",
      },
      {
        id: 77,
        title: "Oldies",
      },
      {
        id: 78,
        title: "Pop",
      },
      {
        id: 79,
        title: "Rap",
      },
      {
        id: 80,
        title: "Rhythm & Blues",
      },
      {
        id: 81,
        title: "Rock",
      },
      {
        id: 82,
        title: "Techno",
      },
    ],
    Servicetype: [
      {
        id: 83,
        title: "Consert",
      },

      {
        id: 84,
        title: "Surprise Program",
      },
      {
        id: 85,
        title: "Weeding Program",
      },
      {
        id: 86,
        title: "Vip Program",
      },
      {
        id: 87,
        title: "Country Program",
      },
    ],
  },
  VoiceOver: {
    Gender: [
      {
        id: 88,
        title: "Female,Male",
      },
    ],
    Purpose: [
      {
        id: 89,
        title: "Video Narration",
      },
      {
        id: 90,
        title: "Audiobook",
      },
      {
        id: 91,
        title: "Podcast",
      },
      {
        id: 92,
        title: "Phone System And Ivr",
      },
      {
        id: 93,
        title: "Dubbing/Impersonation",
      },
      {
        id: 94,
        title: "Radio",
      },
      {
        id: 95,
        title: "TV",
      },
      {
        id: 96,
        title: "Video Game",
      },
      {
        id: 97,
        title: "E Learning",
      },
    ],
    Tone: [
      {
        id: 98,
        title: "Angry",
      },
      {
        id: 99,
        title: "Authoritative",
      },
      {
        id: 100,
        title: "Awkward",
      },
      {
        id: 101,
        title: "Calming",
      },
      {
        id: 102,
        title: "Casual",
      },
      {
        id: 103,
        title: "Corporate",
      },
      {
        id: 104,
        title: "Cute",
      },
      {
        id: 105,
        title: "Dramatic",
      },
      {
        id: 106,
        title: "Emotional",
      },
      {
        id: 107,
        title: "Energetic",
      },
      {
        id: 108,
        title: "Funny",
      },
      {
        id: 109,
        title: "Gritty",
      },
      {
        id: 110,
        title: "Sarcastic",
      },
      {
        id: 111,
        title: "Scary",
      },
      {
        id: 112,
        title: "Sexy",
      },
    ],
  },
  BeatMaking: {
    ServiceType: [
      {
        id: 113,
        title: "Beats",
      },
      {
        id: 114,
        title: "Loops & Kits",
      },
    ],
    Genre: [
      {
        id: 115,
        title: "Hip Hop",
      },
      {
        id: 116,
        title: "Pop",
      },
      {
        id: 117,
        title: "R&B",
      },
      {
        id: 118,
        title: "Edm",
      },
      {
        id: 119,
        title: "Trap",
      },
      {
        id: 120,
        title: "House",
      },
      {
        id: 121,
        title: "Lofi",
      },
      {
        id: 122,
        title: "Rap",
      },
      {
        id: 123,
        title: "Dancehall",
      },
      {
        id: 124,
        title: "Future Bass",
      },
      {
        id: 125,
        title: "Drill",
      },
      {
        id: 126,
        title: "Reggaeton",
      },
    ],
    BeatType: [
      {
        id: 127,
        title: "Original Beat",
      },
      {
        id: 128,
        title: "Type Beat",
      },
      {
        id: 129,
        title: "Beat with Chorus",
      },
    ],
    BeatMood: [],
    LoopsKits: [
      {
        id: 130,
        title: "Angry",
      },
      {
        id: 131,
        title: "Bouncy",
      },
      {
        id: 132,
        title: "Dark",
      },
      {
        id: 133,
        title: "Energetic",
      },
      {
        id: 134,
        title: "Epic",
      },
      {
        id: 135,
        title: "Happy",
      },
      {
        id: 136,
        title: "Inspiring",
      },
      {
        id: 137,
        title: "Chill",
      },
      {
        id: 138,
        title: "Hard",
      },
      {
        id: 139,
        title: "Intense",
      },
      {
        id: 140,
        title: "Relaxed",
      },
      {
        id: 141,
        title: "Sad",
      },
      {
        id: 142,
        title: "Silly",
      },
      {
        id: 143,
        title: "Soulful",
      },
      {
        id: 144,
        title: "Any Mood",
      },
      {
        id: 145,
        title: "Percussive",
      },
      {
        id: 146,
        title: "Melodic",
      },
    ],
  },
  OnlineMusicLessons: {
    Instrument: [
      {
        id: 147,
        title: "Accordion",
      },
      {
        id: 148,
        title: "Banjo",
      },
      {
        id: 149,
        title: "Bass",
      },
      {
        id: 150,
        title: "Cello",
      },
      {
        id: 151,
        title: "Clarinet",
      },
      {
        id: 152,
        title: "Drums",
      },
      {
        id: 153,
        title: "Flute",
      },
      {
        id: 154,
        title: "Guitar",
      },
      {
        id: 155,
        title: "Harmonica",
      },
      {
        id: 156,
        title: "Keyboards",
      },
      {
        id: 157,
        title: "Mandolin",
      },
      {
        id: 158,
        title: "Percussion",
      },
      {
        id: 159,
        title: "Piano",
      },
      {
        id: 160,
        title: "Saxaphone",
      },
      {
        id: 161,
        title: "Trombone",
      },
      {
        id: 162,
        title: "Trumpet",
      },
      {
        id: 163,
        title: "Ukulele",
      },
      {
        id: 164,
        title: "Violin",
      },
    ],
    ProductionSoftware: [
      {
        id: 165,
        title: "Logic Pro X",
      },
      {
        id: 166,
        title: "Ableton",
      },
      {
        id: 167,
        title: "Pro Tools",
      },
      {
        id: 168,
        title: "FL Studio",
      },
      {
        id: 169,
        title: "Reaper",
      },
      {
        id: 170,
        title: "Reason",
      },
      {
        id: 171,
        title: "Cubase",
      },
      {
        id: 172,
        title: "Vocals",
      },
      {
        id: 173,
        title: "Theory",
      },
    ],
  },
  SoundDesign: {
    ServiceType: [
      {
        id: 174,
        title: "Sound Effects",
      },
      {
        id: 175,
        title: "Foley",
      },
    ],
    Purpose: [
      {
        id: 176,
        title: "Films",
      },
      {
        id: 177,
        title: "Video Games",
      },
      {
        id: 178,
        title: "Videos & Explainers",
      },
      {
        id: 179,
        title: "Apps",
      },
      {
        id: 180,
        title: "Songs",
      },
      {
        id: 181,
        title: "Podcasts & Audiobooks",
      },
      {
        id: 182,
        title: "Branding & Intros",
      },
    ],
    MixingType: [
      {
        id: 183,
        title: "Stereo",
      },
      {
        id: 184,
        title: "5.1/7.1 Surround Sound",
      },
      {
        id: 185,
        title: "Mono",
      },
    ],
    EffectType: [
      {
        id: 186,
        title: "Human",
      },
      {
        id: 187,
        title: "Technological",
      },
      {
        id: 188,
        title: "Nature",
      },
      {
        id: 189,
        title: "Ambience",
      },
      {
        id: 190,
        title: "Synthesized",
      },
    ],
  },
  MusicTranscription: {
    Instruments: [
      {
        id: 191,
        title: "Guitar",
      },
      {
        id: 192,
        title: "Piano",
      },
      {
        id: 193,
        title: "Bass",
      },
      {
        id: 194,
        title: "Keyboards",
      },
      {
        id: 195,
        title: "Drums",
      },
      {
        id: 196,
        title: "Vocals",
      },
      {
        id: 197,
        title: "Saxophone",
      },
      {
        id: 198,
        title: "Cello",
      },
      {
        id: 199,
        title: "Flute",
      },
      {
        id: 200,
        title: "Harmonica",
      },
      {
        id: 201,
        title: "Trumpet",
      },
      {
        id: 202,
        title: "Ukulele",
      },
      {
        id: 203,
        title: "Violin",
      },
      {
        id: 204,
        title: "Trombone",
      },
      {
        id: 205,
        title: "Clarinet",
      },
      {
        id: 206,
        title: "Percussion",
      },
      {
        id: 207,
        title: "Mandolin",
      },
      {
        id: 208,
        title: "Acordion",
      },
      {
        id: 209,
        title: "Any Instrument",
      },
    ],
    FileFormat: [
      {
        id: 210,
        title: "Pdf",
      },
      {
        id: 211,
        title: "Sib",
      },
      {
        id: 212,
        title: "Midi",
      },
      {
        id: 213,
        title: "Wav",
      },
      {
        id: 214,
        title: "Music Xml",
      },
      {
        id: 215,
        title: "Tabs",
      },
      {
        id: 216,
        title: "Mscz",
      },
    ],
  },
  SingersVocalists: {
    SingersType: [
      {
        id: 217,
        title: "Classical",
      },
      {
        id: 218,
        title: "Country",
      },
      {
        id: 219,
        title: "Electronic Dance Music",
      },
      {
        id: 220,
        title: "Hip Hop",
      },
      {
        id: 221,
        title: "Indie rock",
      },
      {
        id: 222,
        title: "Jazz",
      },
      {
        id: 223,
        title: "K Pop",
      },
      {
        id: 224,
        title: "Metal",
      },
      {
        id: 225,
        title: "Oldies",
      },
      {
        id: 226,
        title: "Pop",
      },
      {
        id: 227,
        title: "Rap",
      },
      {
        id: 228,
        title: "Rhythm & Blues",
      },
      {
        id: 229,
        title: "Rock",
      },
      {
        id: 230,
        title: "Techno",
      },
    ],
    ServicesType: [
      {
        id: 231,
        title: "Consert",
      },
      {
        id: 232,
        title: "Surprise Program",
      },
      {
        id: 233,
        title: "Wedding Program",
      },
      {
        id: 234,
        title: "Vip Program",
      },
      {
        id: 235,
        title: "Country Program",
      },
    ],
  },
  JinglesIntros: {
    ServiceType: [
      {
        id: 236,
        title: "Jingles",
      },
      {
        id: 237,
        title: "Intros & Outros",
      },
    ],
    Purpose: [
      {
        id: 238,
        title: "Podcast",
      },

      {
        id: 239,
        title: "Video Commercial",
      },
      {
        id: 240,
        title: "Radio Show",
      },
      {
        id: 241,
        title: "TV Show",
      },
      {
        id: 242,
        title: "YouTube",
      },
    ],
    Style: [
      {
        id: 243,
        title: "Sang",
      },
      {
        id: 244,
        title: "Spoken",
      },
      {
        id: 245,
        title: "Instrumental",
      },
    ],
  },
  DjDropsTags: {
    Genre: [
      {
        id: 246,
        title: "Urban",
      },
      {
        id: 247,
        title: "Trap",
      },
      {
        id: 248,
        title: "Dancehall",
      },
      {
        id: 249,
        title: "Old School",
      },
      {
        id: 250,
        title: "Hip Hop",
      },
      {
        id: 251,
        title: "EDM",
      },
      {
        id: 252,
        title: "Pop",
      },
      {
        id: 253,
        title: "Jazz",
      },
    ],
    Tone: [
      {
        id: 254,
        title: "Energetic",
      },
      {
        id: 255,
        title: "Future Bass",
      },
      {
        id: 256,
        title: "Rock",
      },
      {
        id: 257,
        title: "Soul",
      },
      {
        id: 258,
        title: "Funk",
      },
      {
        id: 259,
        title: "Latin",
      },
    ],
  },
  RemixingMashups: {
    ServiceType: [
      {
        id: 260,
        title: "REMIXING",
      },
      {
        id: 261,
        title: "MASHUPS",
      },
    ],
    Gener: [
      {
        id: 262,
        title: "Hip Hop",
      },
      {
        id: 263,
        title: "Pop",
      },
      {
        id: 264,
        title: "R&B",
      },
      {
        id: 265,
        title: "EDM",
      },
      {
        id: 266,
        title: "Trap",
      },
      {
        id: 267,
        title: "House",
      },
      {
        id: 268,
        title: "Lofi",
      },
      {
        id: 269,
        title: "Rap",
      },
      {
        id: 270,
        title: "Future Bass",
      },
      {
        id: 271,
        title: "Rock",
      },
      {
        id: 272,
        title: "Soul",
      },
      {
        id: 273,
        title: "Funk",
      },
      {
        id: 274,
        title: "Latin",
      },
    ],
  },
  SynthPresets: {
    Gener: [
      {
        id: 275,
        title: "Hip Hop",
      },
      {
        id: 276,
        title: "Pop",
      },
      {
        id: 277,
        title: "R&B",
      },
      {
        id: 278,
        title: "EDM",
      },
      {
        id: 279,
        title: "Trap",
      },
      {
        id: 280,
        title: "House",
      },
      {
        id: 281,
        title: "Lofi",
      },
      {
        id: 282,
        title: "Rap",
      },
      {
        id: 283,
        title: "Dancehall",
      },
      {
        id: 284,
        title: "Future Bass",
      },
    ],
    SynthesizerType: [
      {
        id: 285,
        title: "hard synth hardware",
      },
      {
        id: 286,
        title: "soft synth_ vst",
      },
    ],

    VstSynthesizerType: [
      {
        id: 287,
        title: "massive",
      },
      {
        id: 288,
        title: "serum",
      },
      {
        id: 289,
        title: "sylenth",
      },
      {
        id: 290,
        title: "omnisphere",
      },
      {
        id: 291,
        title: "reaktor",
      },
      {
        id: 292,
        title: "nexus2",
      },
      {
        id: 293,
        title: "spire",
      },
    ],
  },
  MusicInstrumentTeaching: [
    {
      id: 294,
      title: "Musical note",
    },
    {
      id: 295,
      title: "Trombone",
    },
    {
      id: 296,
      title: "Saxophone",
    },
    {
      id: 297,
      title: "Trumpet",
    },
    {
      id: 298,
      title: "Tuba",
    },
    {
      id: 299,
      title: "French horn",
    },
    {
      id: 300,
      title: "Record",
    },
    {
      id: 301,
      title: "Clarinet",
    },
    {
      id: 302,
      title: "Microphone",
    },
    {
      id: 303,
      title: "Harp",
    },
    {
      id: 304,
      title: "Recorder",
    },
    {
      id: 305,
      title: "Keyboard",
    },
    {
      id: 306,
      title: "Xylophone",
    },
    {
      id: 307,
      title: "Maracas",
    },
    {
      id: 308,
      title: "Bell",
    },
    {
      id: 309,
      title: "Harmonica",
    },
    {
      id: 310,
      title: "Accordion",
    },
    {
      id: 311,
      title: "Bass drum",
    },
    {
      id: 312,
      title: "Banjo",
    },
    {
      id: 313,
      title: "Double bass",
    },
    {
      id: 314,
      title: "Cello",
    },
    {
      id: 315,
      title: "Violin",
    },
    {
      id: 316,
      title: "Piano",
    },
    {
      id: 317,
      title: "Guitar",
    },
    {
      id: 318,
      title: "Bass guitar",
    },
    {
      id: 319,
      title: "Conga",
    },
    {
      id: 320,
      title: "Snare drum",
    },
    {
      id: 321,
      title: "Drums/ Drum set",
    },
  ],
  TeachingSong: [
    {
      id: 322,
      title: "Classical",
    },
    {
      id: 323,
      title: "Country",
    },
    {
      id: 324,
      title: "Electronic Dance Music ",
    },
    {
      id: 325,
      title: "Hip-Hop",
    },
    {
      id: 326,
      title: "Indie Rock",
    },
    {
      id: 327,
      title: "Jazz",
    },
    {
      id: 328,
      title: "K-pop",
    },
    {
      id: 329,
      title: "Metal",
    },
    {
      id: 330,
      title: "Oldies",
    },
    {
      id: 331,
      title: "Pop",
    },
    {
      id: 332,
      title: "Rap",
    },
    {
      id: 333,
      title: "Rhythm & Blues",
    },
    {
      id: 334,
      title: "Rock",
    },
    {
      id: 335,
      title: "Techno",
    },
  ],
  MixingMastering: [
    {
      id: 336,
      title: "Editing",
    },
    {
      id: 337,
      title: "Mastering",
    },
    {
      id: 338,
      title: "Mixing",
    },
  ],
  Songwriters: [
    {
      id: 339,
      title: "Pop",
    },
    {
      id: 340,
      title: "Rap",
    },
    {
      id: 341,
      title: "Hip Hop",
    },
    {
      id: 342,
      title: "EDM",
    },
    {
      id: 343,
      title: "Rock",
    },
    {
      id: 344,
      title: "Folk",
    },
    {
      id: 345,
      title: "Jazz",
    },
    {
      id: 346,
      title: "Gospel",
    },
    {
      id: 347,
      title: "Raggae",
    },
    {
      id: 348,
      title: "Soul",
    },
    {
      id: 349,
      title: "Punk",
    },
    {
      id: 350,
      title: "Country",
    },
    {
      id: 351,
      title: "R&B",
    },
    {
      id: 352,
      title: "Opera",
    },
    {
      id: 353,
      title: "Metal",
    },
    {
      id: 354,
      title: "Funk",
    },
    {
      id: 355,
      title: "Latin",
    },
    {
      id: 356,
      title: "Indie",
    },
  ],
  DjMixing: [
    {
      id: 357,
      title: "Hip Hop",
    },
    {
      id: 358,
      title: "Pop",
    },
    {
      id: 359,
      title: "R&B",
    },
    {
      id: 360,
      title: "EDM",
    },
    {
      id: 361,
      title: "Trap",
    },
    {
      id: 362,
      title: "House",
    },
    {
      id: 363,
      title: "Lofi",
    },
    {
      id: 364,
      title: "Rap",
    },
    {
      id: 365,
      title: "Dancehall",
    },
    {
      id: 366,
      title: "Future Bass",
    },
    {
      id: 367,
      title: "Rock",
    },
    {
      id: 368,
      title: "Soul",
    },
    {
      id: 369,
      title: "Funk",
    },
    {
      id: 370,
      title: "Latin",
    },
    {
      id: 371,
      title: "Techno",
    },
  ],
  DialougeEditing: [
    {
      id: 372,
      title: "Videos & Films",
    },
    {
      id: 373,
      title: "Video Games",
    },
    {
      id: 374,
      title: "Phone Systems & IVR",
    },
    {
      id: 375,
      title: "Radio Ads",
    },
  ],
};
