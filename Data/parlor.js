import uuid from "react-native-uuid";

export const ParlorOptions = {
  Man: {
    Hair: [
      {
        id: 1,
        title: "Men's Hair Cut Normal",
      },
      {
        id: 2,
        title: "Beard Trim",
      },
      {
        id: 3,
        title: "In Between Detailing",
      },
    ],
    Color: [
      {
        id: 4,
        title: "Gray Blending",
      },
      {
        id: 5,
        title: "Permanent",
      },
      {
        id: 6,
        title: "Highlighting",
      },
      {
        id: 7,
        title: "Moustache",
      },
      {
        id: 8,
        title: "Permanent Texture",
      },
    ],
    Waxing: [
      {
        id: 9,
        title: "Full Eyebrow",
      },
      {
        id: 10,
        title: "Partial Brow",
      },
      {
        id: 11,
        title: "Chest",
      },
      {
        id: 12,
        title: "Back",
      },
      {
        id: 13,
        title: "Chest Back Combo",
      },
      {
        id: 14,
        title: "Nose",
      },
      {
        id: 15,
        title: "Ear",
      },
    ],
    Nails: [
      {
        id: 16,
        title: "Express Manicure",
      },
      {
        id: 17,
        title: "Executive Manicure",
      },
      {
        id: 18,
        title: "Pxpress Pedicure",
      },
      {
        id: 19,
        title: "Executive Pedicure",
      },
    ],
    Facial: [
      {
        id: 20,
        title: "Express Facial",
      },
      {
        id: 21,
        title: "Executive Facial",
      },
    ],
    Extra: [
      {
        id: 22,
        title: "Paraffin Hand Dip",
      },
      {
        id: 23,
        title: "Paraffin Hand Dip As Only Service",
      },
      {
        id: 24,
        title: "Exfoliation Treatment",
      },
      {
        id: 25,
        title: "Ingrown Hair Removal",
      },
      {
        id: 26,
        title: "Acne Treatment",
      },
      {
        id: 27,
        title: "Dry Skin Treatment",
      },
    ],
  },
  Woman: {
    Facial: [
      {
        id: 28,
        title: "Herbal",
      },
      {
        id: 29,
        title: "Gold",
      },
      {
        id: 30,
        title: "Fruit",
      },
      {
        id: 31,
        title: "Flower",
      },
      {
        id: 32,
        title: "Normal",
      },
      {
        id: 33,
        title: "Pimple",
      },
      {
        id: 34,
        title: "Vegetable",
      },
      {
        id: 35,
        title: "Mud Spa",
      },
      {
        id: 36,
        title: "Face Massage",
      },
    ],
    Manicure: [
      {
        id: 37,
        title: "Nail Polish Remover",
      },
      {
        id: 38,
        title: "Nail Clippers",
      },
      {
        id: 39,
        title: "Emery Board And Nail Buffer",
      },
      {
        id: 40,
        title: "Cuticle Pusher And Nippers",
      },
      {
        id: 41,
        title: "Callous Cuticle Remover",
      },
      {
        id: 42,
        title: "Hand Nail Moisturizer",
      },
      {
        id: 43,
        title: "Base Coat",
      },
      {
        id: 44,
        title: "Nail Polish",
      },
      {
        id: 45,
        title: "Clear Topcoat",
      },
    ],
    Padicure: [
      {
        id: 46,
        title: "Foot Files",
      },
      {
        id: 47,
        title: "Callous Removers",
      },
      {
        id: 48,
        title: "Cuticle Nippers",
      },
      {
        id: 49,
        title: "Foot Scrubs",
      },
      {
        id: 50,
        title: "Nail Files",
      },
      {
        id: 51,
        title: "Lotion",
      },
      {
        id: 52,
        title: "Cuticle Nail Pusher",
      },
      {
        id: 53,
        title: "Nail Buffer",
      },
      {
        id: 54,
        title: "Cotton Towels",
      },
    ],
    Hair: [
      {
        id: 55,
        title: "Straight",
      },
      {
        id: 56,
        title: "U Shape",
      },
      {
        id: 57,
        title: "V Shape",
      },
      {
        id: 58,
        title: "Razer",
      },
      {
        id: 59,
        title: "Baby",
      },
      {
        id: 60,
        title: "Blunt",
      },
    ],
    HairColor: [
      {
        id: 61,
        title: "Matrix Root Tuch Up",
      },
      {
        id: 62,
        title: "Streax Tuch Up",
      },
      {
        id: 63,
        title: "Loreal Root Tuch Up",
      },
      {
        id: 64,
        title: "Inoa Root Tuch Up",
      },
    ],
    HairStraightener: [
      {
        id: 65,
        title: "Hair Smoothning ",
      },
      {
        id: 66,
        title: "Hair Rebonding ",
      },
      {
        id: 67,
        title: "Keratin Treatment ",
      },
    ],
    HairSpa: [
      {
        id: 68,
        title: "Loreal",
      },
      {
        id: 69,
        title: "Wella ",
      },
      {
        id: 70,
        title: "Loreal Hair",
      },
    ],
    Head: [
      {
        id: 71,
        title: "Head Massage With Aroma Oil",
      },
      {
        id: 72,
        title: "Head Massage With Coconut Oil",
      },
      {
        id: 73,
        title: "Head Massage With Olive Oil",
      },
      {
        id: 74,
        title: "Body Scrubbing",
      },
      {
        id: 75,
        title: "Body Polishing",
      },
    ],
    Skin: [
      {
        id: 76,
        title: "Use The Correct Cleanser For Your Skin Type",
      },
      {
        id: 77,
        title: "Don’t Use Too Many Products",
      },
      {
        id: 78,
        title: " Moisturize Both Day And Night",
      },
      {
        id: 79,
        title: "Don’t Touch Your Face",
      },
      {
        id: 80,
        title: "Hydrate Inside And Out",
      },
      {
        id: 81,
        title: "Avoid Direct Heat Exposure",
      },
      {
        id: 82,
        title: "Exfoliate A Couple Times Per Week",
      },
      {
        id: 83,
        title: "Vitamins Should Go On Your Skin,Too",
      },
      {
        id: 84,
        title: "Maintain A Healthy Diet",
      },
    ],
    Threading: [
      {
        id: 85,
        title: "Eyebrows",
      },
      {
        id: 86,
        title: "Upper Lip",
      },
      {
        id: 87,
        title: "Forehead",
      },
      {
        id: 88,
        title: "Chin Thread",
      },
      {
        id: 89,
        title: "Lower Lip",
      },
      {
        id: 90,
        title: "Side Locks",
      },
      {
        id: 91,
        title: "Full Face Thread",
      },
    ],
    Bleach: [
      {
        id: 92,
        title: "Full Hands",
      },
      {
        id: 93,
        title: "Full Legs",
      },
      {
        id: 94,
        title: "Half Hands",
      },
      {
        id: 95,
        title: "Half Legs",
      },
      {
        id: 96,
        title: "Full Back/Front",
      },
      {
        id: 97,
        title: "Half Back/Front",
      },
      {
        id: 98,
        title: "Neck",
      },
      {
        id: 99,
        title: "Full Body ",
      },
    ],
    Cleanup: [
      {
        id: 100,
        title: "Lotus",
      },
      {
        id: 101,
        title: "O3+ Seawood",
      },
      {
        id: 102,
        title: "O3+ Whitening",
      },
    ],
    Waxing: [
      {
        id: 103,
        title: "Full Back",
      },
      {
        id: 104,
        title: "Full Body",
      },
      {
        id: 105,
        title: "Full Face",
      },
      {
        id: 106,
        title: "Full Hands",
      },
      {
        id: 107,
        title: "Full Legs",
      },
      {
        id: 108,
        title: "Half Back",
      },
      {
        id: 109,
        title: "Half Hand",
      },
      {
        id: 110,
        title: "Half Legs",
      },
      {
        id: 111,
        title: "Lower Lips",
      },
    ],
    MakeUp: [
      {
        id: 112,
        title: "Airbrush Bridal",
      },
      {
        id: 113,
        title: "HD Bridal",
      },
      {
        id: 114,
        title: "Traditional Bridal",
      },
      {
        id: 115,
        title: "Airbrush Reception",
      },
      {
        id: 116,
        title: "HD Reception",
      },
      {
        id: 117,
        title: "Traditional Reception",
      },
      {
        id: 118,
        title: "HD Engagement",
      },
      {
        id: 119,
        title: "Airbrush Engagement",
      },
      {
        id: 120,
        title: "Traditional Engagement",
      },
      {
        id: 121,
        title: "Airbrush Party",
      },
      {
        id: 122,
        title: "HD Party",
      },
      {
        id: 123,
        title: "Traditional Party",
      },
    ],
  },
};
