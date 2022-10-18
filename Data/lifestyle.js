import uuid from "uuid";

export const LifeStyleOptions = {
  Ac: [
    {
      id: 1,
      title: "Clogged Air Filter",
    },
    {
      id: 2,
      title: "Blower",
    },
    {
      id: 3,
      title: "Circuit Board",
    },
    {
      id: 4,
      title: "Clogged Ac Drain",
    },
    {
      id: 5,
      title: "Dirty Outside AC Unit",
    },
    {
      id: 6,
      title: "Refrigerant Recharge",
    },
    {
      id: 7,
      title: "Expansion Valve",
    },
    {
      id: 8,
      title: "Capacitor",
    },
    {
      id: 9,
      title: "Freon Leak",
    },
    {
      id: 10,
      title: "Coil Leak",
    },
    {
      id: 11,
      title: "Fan Motor",
    },
    {
      id: 12,
      title: "Compressor",
    },
    {
      id: 13,
      title: "Fuse",
    },
    {
      id: 14,
      title: "Condensate Pump",
    },
  ],
  Bicycle: [
    {
      id: 15,
      title: "Fram And Fork For Visible Damage",
    },
    {
      id: 16,
      title: "Adjust The Gears",
    },
    {
      id: 17,
      title: "Tyres Checked For Wear And Damge",
    },
    {
      id: 18,
      title: "Inflate Tyres To Correct Pressure",
    },
    {
      id: 19,
      title: "All Nuts And Bolt Tightened And Correct Torque Setting",
    },
    {
      id: 20,
      title: "Adjust Headset",
    },
    {
      id: 21,
      title: "Break/Break Pad",
    },
    {
      id: 22,
      title: "Lubricate Brakes",
    },
    {
      id: 23,
      title: "Lubricate Chain And Casstte",
    },
    {
      id: 24,
      title: "Check Chain For Wear",
    },
    {
      id: 25,
      title: "Check Chainset And Change Ring For Wear",
    },
    {
      id: 26,
      title: "Clean Chain And Re-lubricate",
    },
    {
      id: 27,
      title: "Clean Cassette And Re-lubricate",
    },
    {
      id: 28,
      title: "Check Wheel Are True And Adjust",
    },
    {
      id: 29,
      title: "Check Bottom Bracket For Movement",
    },
    {
      id: 30,
      title: "Full Strip Down To Frame And Forks/Clean And Then Rebuild",
    },
  ],
  Car: [
    {
      id: 31,
      title: "Oil And Oil Filter",
    },
    {
      id: 32,
      title: "Air Filter",
    },
    {
      id: 33,
      title: "Spark Plugs",
    },
    {
      id: 34,
      title: "Pollen Filter",
    },
    {
      id: 35,
      title: "Fuel Filter",
    },
    {
      id: 36,
      title: "Check And All Top Up All Under Bonnet Fluid Levels",
    },
    {
      id: 37,
      title: "Tyre Condition And Pressure",
    },
    {
      id: 38,
      title: "Condition Of Brake Components",
    },
    {
      id: 39,
      title: "Steering Components",
    },
    {
      id: 40,
      title: "Forte Treatments",
    },
    {
      id: 41,
      title: "Fuel Lines",
    },
    {
      id: 42,
      title: "Check Horn/Service",
    },
    {
      id: 43,
      title: "Windscreen Washers And Wipers",
    },
    {
      id: 44,
      title: "Check Battery/Service",
    },
    {
      id: 45,
      title: "Exhaust System",
    },
    {
      id: 46,
      title: "Transfer Box And Axile Oil",
    },

    {
      id: 47,
      title: "Gear Box Oil Level",
    },

    {
      id: 48,
      title: "Wheel Bearing",
    },

    {
      id: 49,
      title: "Cv Joints And Gaiters",
    },

    {
      id: 50,
      title: "Suspenson And Components",
    },

    {
      id: 51,
      title: "Seatbelts",
    },

    {
      id: 52,
      title: "Road Test Vehicle",
    },

    {
      id: 53,
      title: "Air Con Cleaner And Aircon Cleaner",
    },

    {
      id: 54,
      title: "Tracking/Wheel Alignment",
    },

    {
      id: 55,
      title: "Diagnostic Plug In",
    },

    {
      id: 56,
      title: "Wheel Balancing",
    },
    {
      id: 57,
      title: "Puncture Repair",
    },
  ],
  Camera: [
    {
      id: 58,
      title: "All Brand",
    },
    {
      id: 59,
      title: "DSLR",
    },
    {
      id: 60,
      title: "Digital",
    },
    {
      id: 61,
      title: "Film Camera",
    },
    {
      id: 62,
      title: "Shutter Jam/Other",
    },
    {
      id: 63,
      title: "View Finder Malfunction",
    },
    {
      id: 64,
      title: "Light Seal Replacement",
    },
    {
      id: 65,
      title: "Leans Cleaning",
    },
    {
      id: 66,
      title: "Leans Focus Ring",
    },
    {
      id: 67,
      title: "Leans Aperture",
    },
    {
      id: 68,
      title: "Battery Cap",
    },
    {
      id: 69,
      title: "Leather",
    },
    {
      id: 70,
      title: "Flash Problem",
    },
    {
      id: 71,
      title: "Formate",
    },
    {
      id: 72,
      title: "Display Change",
    },
  ],
  Refrigerator: [
    {
      id: 73,
      title: "Control Board",
    },
    {
      id: 74,
      title: "Evaporator",
    },
    {
      id: 75,
      title: "Fan",
    },
    {
      id: 76,
      title: "Ice Maker",
    },
    {
      id: 77,
      title: "Freezer",
    },
    {
      id: 78,
      title: "Sealed System",
    },
    {
      id: 79,
      title: "Compressor",
    },
    {
      id: 80,
      title: "Condenser Coil Cleaning",
    },
    {
      id: 81,
      title: "Water Dispenser",
    },
    {
      id: 82,
      title: "Fridge Door",
    },
  ],
  Mobile: [
    {
      id: 83,
      title: "Display Change",
    },
    {
      id: 84,
      title: "Crack Display",
    },
    {
      id: 85,
      title: "Hardware Issu",
    },
    {
      id: 86,
      title: "Speaker/Voice Issu",
    },
    {
      id: 87,
      title: "Water Damage",
    },
    {
      id: 88,
      title: "Software Issu",
    },
    {
      id: 89,
      title: "Touch Issu",
    },
    {
      id: 90,
      title: "Camera Issu",
    },
    {
      id: 91,
      title: "Charging Issu",
    },
    {
      id: 92,
      title: "Battery Issu",
    },
    {
      id: 93,
      title: "Country Lock",
    },
    {
      id: 94,
      title: "Sim Lock",
    },
    {
      id: 95,
      title: "Icloud Lock",
    },
    {
      id: 96,
      title: "Password Recovery",
    },
    {
      id: 97,
      title: "Flash",
    },
  ],
  Pc: [
    {
      id: 98,
      title: "Laptop/Macbook",
    },
    {
      id: 99,
      title: "Pc/Mac",
    },
    {
      id: 100,
      title: "Hard Disc/Ram",
    },
    {
      id: 101,
      title: "Virus/Security",
    },
    {
      id: 102,
      title: "Networking",
    },
    {
      id: 103,
      title: "Monitor",
    },
    {
      id: 104,
      title: "Keyboard",
    },
    {
      id: 105,
      title: "Graphics Card",
    },
    {
      id: 106,
      title: "Mother Board",
    },
    {
      id: 107,
      title: "Power Supply",
    },
    {
      id: 108,
      title: "Fan",
    },
    {
      id: 109,
      title: "Data Recovery/Backup",
    },
    {
      id: 110,
      title: "Software/Opareting",
    },
    {
      id: 111,
      title: "Networking",
    },
    {
      id: 112,
      title: "Printer",
    },
  ],
  Printer: [
    {
      id: 113,
      title: "All Brand",
    },
    {
      id: 114,
      title: "Full Check-Up",
    },
    {
      id: 115,
      title: "Diagnose",
    },
    {
      id: 116,
      title: "No Display Power",
    },
    {
      id: 117,
      title: "Unexpect Shutdown",
    },
    {
      id: 118,
      title: "Time And Date Problem",
    },
    {
      id: 119,
      title: "Slow Boot",
    },
    {
      id: 120,
      title: "Color Change",
    },
    {
      id: 121,
      title: "Mother Board",
    },
    {
      id: 122,
      title: "Scanner",
    },
    {
      id: 123,
      title: "Formate",
    },
    {
      id: 124,
      title: "Full Set Up",
    },
  ],
  LifeCoaching: [
    {
      id: 125,
      title: "Career",
    },
    {
      id: 126,
      title: "Dating & Relationships",
    },
    {
      id: 127,
      title: "Personal Growth",
    },
    {
      id: 128,
      title: "Parenting & Family",
    },
    {
      id: 129,
      title: "Spiritual",
    },
    {
      id: 130,
      title: "Leadership",
    },
  ],
  FitnessLessons: {
    TrainningType: [
      {
        id: 131,
        title: "Pilates",
      },
      {
        id: 132,
        title: "Strength Training",
      },
      {
        id: 133,
        title: "Cardiovascular",
      },
      {
        id: 134,
        title: "Yoga",
      },
      {
        id: 135,
        title: "Toning",
      },
      {
        id: 136,
        title: "HIIT",
      },
      {
        id: 137,
        title: "Low Impact",
      },
    ],
    Difficulty: [
      {
        id: 138,
        title: "Beginner",
      },
      {
        id: 139,
        title: "Intermediate",
      },
    ],
  },
  PersonalStylists: {
    Purpose: [
      {
        id: 140,
        title: "Office / Business",
      },
      {
        id: 141,
        title: "Casual / Weekend",
      },
      {
        id: 142,
        title: "Dating / Social Life",
      },
      {
        id: 143,
        title: "Weddings / Formal Events",
      },
      {
        id: 144,
        title: "Party",
      },
      {
        id: 145,
        title: "Photoshoots",
      },
      {
        id: 146,
        title: "Fashion",
      },
      {
        id: 147,
        title: "STYLE",
      },
      {
        id: 148,
        title: "Classic",
      },
      {
        id: 149,
        title: "Edge",
      },
      {
        id: 150,
        title: "Playful",
      },
      {
        id: 151,
        title: "Modern/Trendy",
      },
      {
        id: 152,
        title: "Sexy",
      },
      {
        id: 153,
        title: "Streetwear",
      },
      {
        id: 154,
        title: "Bohemian/Indie",
      },
      {
        id: 155,
        title: "Vintage/Retro",
      },
      {
        id: 156,
        title: "Minimalistic",
      },
      {
        id: 157,
        title: "Alternative",
      },
      {
        id: 158,
        title: "Casual",
      },
      {
        id: 159,
        title: "Tailored",
      },
      {
        id: 160,
        title: "Chic",
      },
      {
        id: 161,
        title: "Punk",
      },
      {
        id: 162,
        title: "Rock",
      },
      {
        id: 163,
        title: "Sport Elegant",
      },
      {
        id: 164,
        title: "Hip Hop",
      },
      {
        id: 165,
        title: "Goth",
      },
      {
        id: 166,
        title: "Black-Tie",
      },
      {
        id: 167,
        title: "Hipster",
      },
    ],
  },
  CookingLessons: {
    breakfast: [
      {
        id: 168,
        title: "Two Fresh Eggs any style",
      },
      {
        id: 169,
        title: "Sausage",
      },
      {
        id: 170,
        title: "French Fries",
      },
      {
        id: 171,
        title: "Toast- 2 Slices",
      },
      {
        id: 172,
        title: "Parata- 2 Pcs",
      },
      {
        id: 173,
        title: "LChapatti- 2 pcs",
      },
      {
        id: 174,
        title: "Bhaji",
      },
      {
        id: 175,
        title: "Alur Dom",
      },
      {
        id: 176,
        title: "Sujir Halwa",
      },
      {
        id: 177,
        title: "Bread Basket- 6 Rolls of Bread",
      },
    ],
    Beverages: [
      {
        id: 178,
        title: "Variety of Juice",
      },
      {
        id: 179,
        title: "Coffee",
      },
      {
        id: 180,
        title: "Tea",
      },
      {
        id: 181,
        title: "Hot Chocolate",
      },
      {
        id: 182,
        title: "Milk",
      },
    ],
    Snacks: [
      {
        id: 183,
        title: "Kids Special Noodles",
      },
      {
        id: 184,
        title: "Beef Samosa 2 Pcs",
      },
      {
        id: 185,
        title: "Spring roll 2 Pcs",
      },
      {
        id: 186,
        title: "Butterfly Prawn 4 Pcs with dip",
      },
      {
        id: 187,
        title: "Vegetable Singara 2 Pcs",
      },
      {
        id: 188,
        title: "Kabab Roll with choice of beef or chickens",
      },
      {
        id: 189,
        title: "Chicken Nugget 6 Pcs",
      },
      {
        id: 190,
        title: "Chen Kiev 6 Pcs",
      },
      {
        id: 191,
        title: "Fish Finger 6 Pcs",
      },
      {
        id: 192,
        title: "French Fries",
      },
      {
        id: 193,
        title: "Chicken Cutlet 2 Pcs",
      },
      {
        id: 194,
        title: "Beef Cutlet 2 Pcs",
      },
      {
        id: 195,
        title: "Prawn on Toast 2 Pcs",
      },
      {
        id: 196,
        title: "Mini Chicken Shashlic 2 Pcs",
      },
      {
        id: 197,
        title: "Jhal muri / Chanachur 3 Persons",
      },
      {
        id: 198,
        title: "French Toast 2 Pcs",
      },
      {
        id: 199,
        title: "Keema Chop 2 Pcs",
      },
      {
        id: 200,
        title: "Shammi Kabab 2 Pcs",
      },
      {
        id: 201,
        title: "Pantarash 2 Pcs",
      },
      {
        id: 202,
        title: "Fish Finger- served with French Fries and Mayonnaise",
      },
      {
        id: 203,
        title: "Bhaja Pora- vegetable pakora /beguni /peyaju 16 Pcs",
      },
      {
        id: 204,
        title: "Cheese Singara Platter 10 Pcs",
      },
    ],
    DinnerLunch: [
      {
        id: 205,
        title: "Charcoal Choice",
      },
      {
        id: 206,
        title: "BBQ Chicken 1 Pc",
      },
      {
        id: 207,
        title: "Beef Sheek Kabab 1 Pc",
      },
      {
        id: 208,
        title: "Bangladeshi Delicacies(Serves 3 /4 Persons)",
      },
      {
        id: 209,
        title: "Chicken Bhuna",
      },
      {
        id: 210,
        title: "Chicken Korma",
      },
      {
        id: 211,
        title: "Chicken Do Piaza",
      },
      {
        id: 212,
        title: "Chicken Rezala",
      },
      {
        id: 213,
        title: "Butter Chicken",
      },
      {
        id: 214,
        title: "Shorshe Chicken",
      },
      {
        id: 215,
        title: "Chicken Jhal Frazee",
      },
      {
        id: 216,
        title: "Beef Curry",
      },
      {
        id: 217,
        title: "Beef Bhuna",
      },
      {
        id: 218,
        title: "Beef Rezala",
      },
      {
        id: 219,
        title: "Beef Korma",
      },
      {
        id: 220,
        title: "Beef Do Piaza",
      },
      {
        id: 221,
        title: "Handi Kabab",
      },
      {
        id: 222,
        title: "Acchari Beef",
      },
      {
        id: 223,
        title: "Shammi Kabab 4 Pcs",
      },
      {
        id: 224,
        title: "Beef Jalli Kabab 4 pcs",
      },
      {
        id: 225,
        title: "Mutton Rezala",
      },
      {
        id: 226,
        title: "Fish Curry 4pcs",
      },
      {
        id: 227,
        title: "Fish Do Piaza",
      },
      {
        id: 228,
        title: "Fish Jhol Torkari",
      },
      {
        id: 229,
        title: "Fish Bhuna",
      },
      {
        id: 230,
        title: "Prawn Do piazza",
      },
      {
        id: 231,
        title: "Chingri Macher Malaikari",
      },
      {
        id: 232,
        title: "Prawn Bhuna",
      },
      {
        id: 233,
        title:
          "Bhorta (Choose any – Begun Bhorta, Alu Bhorta, Barbati Bhorta, Patal Bhorta, Tomato Bhorta)",
      },
      {
        id: 234,
        title: "Daal Bhorta, Egg Bhorta, Chingri Bhorta,",
      },
      {
        id: 235,
        title: "Shutki Bhorta, Mach Bhorta, Sheem Bhorta,",
      },

      {
        id: 236,
        title: "Mixed Vegetable",
      },
      {
        id: 237,
        title: "Seasonal Vegetable Curry",
      },
      {
        id: 238,
        title: "Chinese Style Vegetable",
      },
      {
        id: 239,
        title: "Daal",
      },
      {
        id: 240,
        title: "Daal Chorchori",
      },
      {
        id: 241,
        title: "Seasonal Salad",
      },
      {
        id: 242,
        title: "Rice One Person",
      },
    ],
    Dessert: [
      {
        id: 243,
        title: "Firni",
      },
      {
        id: 244,
        title: "Gurer Payesh",
      },
      {
        id: 245,
        title: "Brownie",
      },
      {
        id: 246,
        title: "Caramel Pudding (serves 6)",
      },
      {
        id: 247,
        title: "Caramel Pudding (serves 12)",
      },
    ],
    Soups: [
      {
        id: 248,
        title: "Chicken Corn Soup",
      },
      {
        id: 249,
        title: "Thai Soup",
      },
      {
        id: 250,
        title: "Chicken/ Beef Noodle Soup",
      },
    ],
    Sandwich: [
      {
        id: 251,
        title: "Homemade Chicken Sandwich 2 pcs",
      },
      {
        id: 252,
        title: "Club Sandwich with Chicken & Vegetable",
      },
    ],
    Pizzas: [
      {
        id: 253,
        title: "Chef’s special Beef Pizza",
      },
      {
        id: 254,
        title: "Chef’s Special Chicken Pizza",
      },
    ],
    Pasta: [
      {
        id: 255,
        title: "Special Chicken Pasta",
      },
      {
        id: 256,
        title: "Special Beef pasta",
      },
    ],
    Events: [
      {
        id: 257,
        title: "Cake",
      },
      {
        id: 258,
        title: "Biriyani",
      },
      {
        id: 259,
        title: "Noodles",
      },
      {
        id: 260,
        title: "Nayasam",
      },
      {
        id: 261,
        title: "Pudding",
      },
    ],
  },
  CraftLessons: {
    CraftType: [
      {
        id: 262,
        title: "Scrapbooking",
      },
      {
        id: 263,
        title: "Stamping",
      },
      {
        id: 264,
        title: "Embroidery",
      },
      {
        id: 265,
        title: "Knitting & Crochet",
      },
      {
        id: 266,
        title: "Origami",
      },
      {
        id: 267,
        title: "Upcycling",
      },
      {
        id: 268,
        title: "Floral Design",
      },
      {
        id: 269,
        title: "Wood​",
      },
      {
        id: 270,
        title: "Ceramics & Pottery",
      },
      {
        id: 271,
        title: "Needlework",
      },
      {
        id: 272,
        title: "Jewelry",
      },
      {
        id: 273,
        title: "DIY",
      },
      {
        id: 274,
        title: "Painting & Drawing​",
      },
    ],
    Difficulty: [
      {
        id: 275,
        title: "Beginner",
      },
      {
        id: 276,
        title: "Intermediate​",
      },
      {
        id: 277,
        title: "Expert",
      },
    ],
  },
  Gym: {
    CompoundChestExercises: [
      {
        id: 278,
        title: "Barbell Bench Press",
      },
      {
        id: 279,
        title: "Incline Barbell Bench Press",
      },
      {
        id: 280,
        title: "Dumbbell Bench Press",
      },
      {
        id: 281,
        title: "Incline Dumbbell Bench Press",
      },
      {
        id: 282,
        title: "Weighted Dips for Chest",
      },
      {
        id: 283,
        title: "Decline Bench Press",
      },
    ],

    CompoundBackExercises: [
      {
        id: 284,
        title: "Barbell Deadlift",
      },
      {
        id: 285,
        title: "Bent-Over Barbell Row",
      },
      {
        id: 286,
        title: "Weighted Pull-ups",
      },
      {
        id: 287,
        title: "Wide-Grip Pull-up",
      },
      {
        id: 288,
        title: "Standing T-Bar Row",
      },
      {
        id: 289,
        title: "Close-Grip Pulldow",
      },
      {
        id: 290,
        title: "Seated Cable Row",
      },
    ],

    CompoundAbExercises: [
      {
        id: 291,
        title: "Cable Crunch",
      },
      {
        id: 292,
        title: "Hanging Dumbbell Knee Raise",
      },
      {
        id: 293,
        title: "Landmine",
      },
      {
        id: 294,
        title: "Captain’s Chair Leg Raise",
      },
      {
        id: 295,
        title: "Ab-Wheel Rollout",
      },
      {
        id: 296,
        title: "Plank",
      },
      {
        id: 297,
        title: "Weighted Decline Sit-up",
      },
      {
        id: 298,
        title: "Bicycle",
      },
      {
        id: 299,
        title: "Flag",
      },
    ],

    CompoundShoulderExercises: [
      {
        id: 300,
        title: "Standing Barbell Overhead Press",
      },
      {
        id: 301,
        title: "Seated Dumbbell Overhead Press",
      },
      {
        id: 302,
        title: "Arnold Shoulder Press",
      },
      {
        id: 303,
        title: "Bent-Over Reverse Fly",
      },
      {
        id: 304,
        title: "Lateral Raise",
      },
      {
        id: 305,
        title: "Front Dumbbell Raise",
      },
      {
        id: 306,
        title: "Handstand Push-ups ",
      },
    ],

    CompoundLegExercises: [
      {
        id: 307,
        title: "Barbell Squat",
      },
      {
        id: 308,
        title: "Standing Calf Raise",
      },
      {
        id: 309,
        title: "Calf Press",
      },
      {
        id: 310,
        title: "Romanian Deadlift",
      },
      {
        id: 311,
        title: "Leg Press",
      },
      {
        id: 312,
        title: "Hack Squat",
      },
      {
        id: 313,
        title: "Dumbbell Lunge",
      },
    ],

    CompoundBicepExercises: [
      {
        id: 314,
        title: "Seated Hammer Curl",
      },
      {
        id: 315,
        title: "Standing Barbell Curl",
      },
      {
        id: 316,
        title: "Inverted Rows",
      },
      {
        id: 317,
        title: "Zottman Curl",
      },
      {
        id: 318,
        title: "Weighted Chin-ups",
      },
      {
        id: 319,
        title: "Incline-Bench Curl",
      },
      {
        id: 320,
        title: "Preacher EZ-Bar Curl ",
      },
      {
        id: 321,
        title: "Standing Cable Curl",
      },
    ],

    CompoundTricepExercises: [
      {
        id: 322,
        title: "Close-Grip Bench Press",
      },
      {
        id: 323,
        title: "Skullcrusher",
      },
      {
        id: 324,
        title: "Weighted Dips",
      },
      {
        id: 325,
        title: "Cable Push-Down",
      },
      {
        id: 326,
        title: "Dumbbell Kickback",
      },
      {
        id: 327,
        title: "Seated Overhead Dumbbell Extension",
      },
    ],
  },
};
