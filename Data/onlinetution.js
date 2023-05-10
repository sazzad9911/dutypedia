import uuid from "react-native-uuid";

export const OnlineTutionOptions = {
  LANGUAGETUTORING: [
    {
      id: 1,
      title: "arabic",
    },
    {
      id: 2,
      title: "bangla",
    },
    {
      id: 3,
      title: "english",
    },
    {
      id: 4,
      title: "Chinese",
    },
    {
      id: 5,
      title: "Hindi",
    },
    {
      id: 6,
      title: "German",
    },
    {
      id: 7,
      title: "Korean",
    },
  ],
  MATHTUTORING: [
    {
      id: 8,
      title: "Algebra I",
    },
    {
      id: 9,
      title: "Algebra II",
    },
    {
      id: 10,
      title: "Basic Math",
    },
    {
      id: 11,
      title: "Calculus AB",
    },
    {
      id: 12,
      title: "Calculus BC",
    },
    {
      id: 13,
      title: "AP Calculus AB",
    },
    {
      id: 14,
      title: "AP Calculus BC",
    },
    {
      id: 15,
      title: "Differential Equations",
    },
    {
      id: 16,
      title: "Discrete Math",
    },
    {
      id: 17,
      title: "Finite Math",
    },
    {
      id: 18,
      title: "Geometry",
    },
    {
      id: 19,
      title: "Intermediate Statistics",
    },
    {
      id: 20,
      title: "Linear Algebra",
    },
    {
      id: 21,
      title: "Matrix Algebra",
    },
    {
      id: 22,
      title: "Multivariable Calculus",
    },
    {
      id: 23,
      title: "Pre-Algebra",
    },
    {
      id: 24,
      title: "Pre-Calculus",
    },
    {
      id: 25,
      title: "Quantitative Methods",
    },
    {
      id: 26,
      title: "Quantitative Reasoning",
    },
    {
      id: 27,
      title: "Statistics",
    },
    {
      id: 28,
      title: "AP Statistics",
    },
    {
      id: 29,
      title: "Trigonometry",
    },
    {
      id: 30,
      title: "Vector Algebra",
    },
  ],
  OnlineMusicLessons: {
    Instrument: [
      {
        id: 31,
        title: "Accordion",
      },
      {
        id: 32,
        title: "Banjo",
      },
      {
        id: 33,
        title: "Bass",
      },
      {
        id: 34,
        title: "Cello",
      },
      {
        id: 35,
        title: "Clarinet",
      },
      {
        id: 36,
        title: "Drums",
      },
      {
        id: 37,
        title: "Flute",
      },
      {
        id: 38,
        title: "Guitar",
      },
      {
        id: 39,
        title: "Harmonica",
      },
      {
        id: 40,
        title: "Keyboards",
      },
      {
        id: 41,
        title: "Mandolin",
      },
      {
        id: 42,
        title: "Percussion",
      },
      {
        id: 43,
        title: "Piano",
      },
      {
        id: 44,
        title: "Saxaphone",
      },
      {
        id: 45,
        title: "Trombone",
      },
      {
        id: 46,
        title: "Trumpet",
      },
      {
        id: 47,
        title: "Ukulele",
      },
      {
        id: 48,
        title: "Violin",
      },
    ],
    Production_Software: [
      {
        id: 49,
        title: "Logic Pro X",
      },
      {
        id: 50,
        title: "Ableton",
      },
      {
        id: 51,
        title: "Pro Tools",
      },
      {
        id: 52,
        title: "FL Studio",
      },
      {
        id: 53,
        title: "Reaper",
      },
      {
        id: 54,
        title: "Reason",
      },
      {
        id: 55,
        title: "Cubase",
      },
      {
        id: 56,
        title: "Vocals",
      },
      {
        id: 57,
        title: "Theory",
      },
    ],
  },
  OnlineCodingLessons: {
    LessonPurpose: [
      {
        id: 58,
        title: "Programming Language",
      },
      {
        id: 59,
        title: "Website Development",
      },
      {
        id: 60,
        title: "Databases",
      },
      {
        id: 61,
        title: "Game Development",
      },
      {
        id: 62,
        title: "Data Science",
      },
      {
        id: 63,
        title: "Mobile Apps",
      },
      {
        id: 64,
        title: "Testing & Automation",
      },
      {
        id: 65,
        title: "Cloud Computing",
      },
    ],

    DevelopmentTechonlogy: [
      {
        id: 66,
        title: "HTML",
      },
      {
        id: 67,
        title: "CSS",
      },
      {
        id: 68,
        title: "Bootstrap",
      },
      {
        id: 69,
        title: "JavaScript",
      },
      {
        id: 70,
        title: "TypeScript",
      },
      {
        id: 71,
        title: "Angular",
      },
      {
        id: 72,
        title: "React",
      },
      {
        id: 73,
        title: "Ruby on Rails",
      },
      {
        id: 74,
        title: "Node.js",
      },
      {
        id: 75,
        title: ".NET",
      },
      {
        id: 76,
        title: "C/C++",
      },
      {
        id: 77,
        title: "C#",
      },
      {
        id: 78,
        title: "Java",
      },
      {
        id: 79,
        title: "Python",
      },
      {
        id: 80,
        title: "Lua",
      },
      {
        id: 81,
        title: "PHP",
      },
      {
        id: 82,
        title: "Laravel",
      },
      {
        id: 83,
        title: "Kotlin",
      },
      {
        id: 84,
        title: "Django",
      },
      {
        id: 85,
        title: "Ruby",
      },
      {
        id: 86,
        title: "Go",
      },
      {
        id: 87,
        title: "Scratch",
      },
      {
        id: 88,
        title: "Rust",
      },
      {
        id: 89,
        title: "Swift",
      },
      {
        id: 90,
        title: "React Native",
      },
      {
        id: 91,
        title: "Flutter",
      },
      {
        id: 92,
        title: "Wordpress",
      },
      {
        id: 93,
        title: "Shopify ",
      },
      {
        id: 94,
        title: "SQL",
      },
      {
        id: 95,
        title: "NoSQL",
      },
      {
        id: 96,
        title: "R",
      },
      {
        id: 97,
        title: "Matlab",
      },
      {
        id: 98,
        title: "VB/VBA",
      },
      {
        id: 99,
        title: "Unity",
      },
      {
        id: 100,
        title: "Arduino",
      },
      {
        id: 101,
        title: "Unreal Engine",
      },
    ],
  },
  SCIENCETUTORING: [
    {
      id: 102,
      title: "Anatomy and Physiology",
    },
    {
      id: 103,
      title: "Physics",
    },
    {
      id: 104,
      title: "AP Physics 1",
    },
    {
      id: 105,
      title: "AP Physics 2",
    },
    {
      id: 106,
      title: "AP Physics C",
    },
    {
      id: 107,
      title: "Chemistry",
    },
    {
      id: 108,
      title: "AP Chemistry",
    },
    {
      id: 109,
      title: "Biology",
    },
    {
      id: 110,
      title: "AP Biology",
    },
    {
      id: 111,
      title: "Earth-Sciences",
    },
    {
      id: 112,
      title: "Microbiology",
    },
  ],
  SOCIALSCIENCESTUTORING: [
    {
      id: 113,
      title: "English Literature",
    },
    {
      id: 114,
      title: "Writing",
    },
    {
      id: 115,
      title: "Reading",
    },
    {
      id: 116,
      title: "History",
    },
  ],
  BUSINESSTUTORING: [
    {
      id: 117,
      title: "Accounting",
    },
    {
      id: 118,
      title: "Business Law",
    },
    {
      id: 119,
      title: "Economics",
    },
    {
      id: 120,
      title: "Finance",
    },
    {
      id: 121,
      title: "Macroeconomics",
    },
    {
      id: 122,
      title: "Principles of Management",
    },
    {
      id: 123,
      title: "Tax Accounting",
    },
  ],
  Mobile: [
    {
      id: 124,
      title: "Display Change",
    },
    {
      id: 125,
      title: "Crack Display",
    },
    {
      id: 126,
      title: "Hardware Issu",
    },
    {
      id: 127,
      title: "Speaker/Voice Issu",
    },
    {
      id: 128,
      title: "Water Damage",
    },
    {
      id: 129,
      title: "Software Issu",
    },
    {
      id: 130,
      title: "Touch Issu",
    },
    {
      id: 131,
      title: "Camera Issu",
    },
    {
      id: 132,
      title: "Charging Issu",
    },
    {
      id: 133,
      title: "Battery Issu",
    },
    {
      id: 134,
      title: "Country Lock",
    },
    {
      id: 135,
      title: "Sim Lock",
    },
    {
      id: 136,
      title: "Icloud Lock",
    },
    {
      id: 137,
      title: "Password Recovery",
    },
    {
      id: 138,
      title: "Flash",
    },
  ],
  Pc: [
    {
      id: 139,
      title: "Laptop/Macbook",
    },
    {
      id: 140,
      title: "Pc/Mac",
    },
    {
      id: 141,
      title: "Hard Disc/Ram",
    },
    {
      id: 142,
      title: "Virus/Security",
    },
    {
      id: 143,
      title: "Networking",
    },
    {
      id: 144,
      title: "Monitor",
    },
    {
      id: 145,
      title: "Keyboard",
    },
    {
      id: 146,
      title: "Graphics Card",
    },
    {
      id: 147,
      title: "Mother Board",
    },
    {
      id: 148,
      title: "Power Supply",
    },
    {
      id: 149,
      title: "Fan",
    },
    {
      id: 150,
      title: "Data Recovery/Backup",
    },
    {
      id: 151,
      title: "Software/Opareting",
    },
    {
      id: 152,
      title: "Networking",
    },
    {
      id: 153,
      title: "Printer",
    },
  ],
  Printer: [
    {
      id: 154,
      title: "All Brand",
    },
    {
      id: 155,
      title: "Full Check-Up",
    },
    {
      id: 156,
      title: "Diagnose",
    },
    {
      id: 157,
      title: "No Display Power",
    },
    {
      id: 158,
      title: "Unexpect Shutdown",
    },
    {
      id: 159,
      title: "Time And Date Problem",
    },
    {
      id: 160,
      title: "Slow Boot",
    },
    {
      id: 161,
      title: "Color Change",
    },
    {
      id: 162,
      title: "Mother Board",
    },
    {
      id: 163,
      title: "Scanner",
    },
    {
      id: 164,
      title: "Formate",
    },
    {
      id: 165,
      title: "Full Set Up",
    },
  ],
  CookingLessons: [
    {
      id: 166,
      title: "Bangali cooking lessons",
    },
    {
      id: 167,
      title: "French cooking lessons",
    },
    {
      id: 168,
      title: "Thai cooking lessons",
    },
    {
      id: 169,
      title: "Japanese cooking lessons",
    },
    {
      id: 170,
      title: "Indian cooking lessons",
    },
    {
      id: 171,
      title: "Mexican cooking lessons",
    },
    {
      id: 172,
      title: "Chinese cooking lessons",
    },
    {
      id: 173,
      title: "Mediterranean cooking lessons",
    },
    {
      id: 174,
      title: "Vegetarian and vegan cooking lessons",
    },
  ],
};
