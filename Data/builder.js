import uuid from "react-native-uuid";
import { BuilderIcon } from "../assets/icon";

export const BuilderOptions = {
  housebuilder: [
    {
      id: 1,
      title: "House Extensions",
    },
    {
      id: 2,
      title: "Basement Renovations",
    },
    {
      id: 3,
      title: "New Garages",
    },
    {
      id: 4,
      title: "Garage Conversions",
    },
    {
      id: 5,
      title: "Contract Work",
    },
    {
      id: 6,
      title: "Roofing Works",
    },
    {
      id: 7,
      title: "Bathrooms",
    },
    {
      id: 8,
      title: "Kitchens",
    },
    {
      id: 9,
      title: "Property Maintenance",
    },
    {
      id: 10,
      title: "Painting & Decorating",
    },
    {
      id: 11,
      title: "Fire Damage",
    },
    {
      id: 12,
      title: "Windows & Doors",
    },
    {
      id: 13,
      title: "Exterior & Interior Doors",
    },
    {
      id: 14,
      title: "All Electrical Services",
    },
  ],
  officebuilder: [
    {
      id: 15,
      title: "Types Of Spaces",
    },
    {
      id: 16,
      title: "Employee/Visitor Support Spaces",
    },
    {
      id: 17,
      title: "Offices",
    },
    {
      id: 18,
      title: "A Operation and Maintenance spaces",
    },
    {
      id: 19,
      title: "Dministrative Support Spaces",
    },
    {
      id: 20,
      title: " Important Design Considerations",
    },
    {
      id: 21,
      title: "Cost Effective",
    },
    {
      id: 22,
      title: "Functional/Operational",
    },
    {
      id: 23,
      title: "Flexibility",
    },
    {
      id: 24,
      title: "Ur Productive",
    },
    {
      id: 25,
      title: "Ban Planning",
    },
    {
      id: 26,
      title: "Technical Connectivity",
    },
    {
      id: 27,
      title: "Secure/Safe",
    },
    {
      id: 28,
      title: "Sustainable",
    },
    {
      id: 29,
      title: "Emerging Issues",
    },
    {
      id: 30,
      title: "Additional Resources",
    },
  ],
  carpenter: [
    {
      id: 31,
      title: "Woodcarving",
    },
    {
      id: 32,
      title: "Woodwork",
    },
    {
      id: 33,
      title: "Veneered",
    },
    {
      id: 34,
      title: "Shelve",
    },
    {
      id: 35,
      title: "Bed",
    },
    {
      id: 36,
      title: "Bookshelf",
    },
    {
      id: 37,
      title: "Almary",
    },
    {
      id: 38,
      title: "dressing table",
    },
    {
      id: 39,
      title: "chest of drawers",
    },
    {
      id: 40,
      title: "sofa set",
    },
    {
      id: 41,
      title: "dining table",
    },
    {
      id: 42,
      title: "chair",
    },
  ],
  roadconstruction: [
    {
      id: 43,
      title: "Road Casualty",
    },
    {
      id: 44,
      title: "Road Closure",
    },
    {
      id: 45,
      title: "Road Congestion",
    },
    {
      id: 46,
      title: "Road Cycling",
    },
    {
      id: 47,
      title: "Road Death",
    },
    {
      id: 48,
      title: "Road Gang",
    },
  ],
  bridgebuilder: [
    {
      id: 49,
      title: "Bridge Builder",
    },
    {
      id: 50,
      title: "Bridge Span",
    },
    {
      id: 51,
      title: "Bridge Table",
    },
    {
      id: 52,
      title: "Bridge The Chasm",
    },

    {
      id: 53,
      title: "Bridge Building",
    },
    {
      id: 54,
      title: "Bridgeboard",
    },
    {
      id: 55,
      title: "Bridgehead",
    },
  ],
  Mobile: [
    {
      id: 56,
      title: "Display Change",
    },
    {
      id: 57,
      title: "Crack Display",
    },
    {
      id: 58,
      title: "Hardware Issu",
    },
    {
      id: 59,
      title: "Speaker/Voice Issu",
    },
    {
      id: 60,
      title: "Water Damage",
    },
    {
      id: 61,
      title: "Software Issu",
    },
    {
      id: 62,
      title: "Touch Issu",
    },
    {
      id: 63,
      title: "Camera Issu",
    },
    {
      id: 64,
      title: "Charging Issu",
    },
    {
      id: 65,
      title: "Battery Issu",
    },
    {
      id: 66,
      title: "Country Lock",
    },
    {
      id: 67,
      title: "Sim Lock",
    },
    {
      id: 68,
      title: "Icloud Lock",
    },
    {
      id: 69,
      title: "Password Recovery",
    },
    {
      id: 70,
      title: "Flash",
    },
  ],
  Pc: [
    {
      id: 71,
      title: "Laptop/Macbook",
    },
    {
      id: 72,
      title: "Pc/Mac",
    },
    {
      id: 73,
      title: "Hard Disc/Ram",
    },
    {
      id: 74,
      title: "Virus/Security",
    },
    {
      id: 75,
      title: "Networking",
    },
    {
      id: 76,
      title: "Monitor",
    },
    {
      id: 77,
      title: "Keyboard",
    },
    {
      id: 78,
      title: "Graphics Card",
    },
    {
      id: 79,
      title: "Mother Board",
    },
    {
      id: 80,
      title: "Power Supply",
    },
    {
      id: 81,
      title: "Fan",
    },
    {
      id: 82,
      title: "Data Recovery/Backup",
    },
    {
      id: 83,
      title: "Software/Opareting",
    },
    {
      id: 84,
      title: "Networking",
    },
    {
      id: 85,
      title: "Printer",
    },
  ],
  Printer: [
    {
      id: 86,
      title: "All Brand",
    },
    {
      id: 87,
      title: "Full Check-Up",
    },
    {
      id: 88,
      title: "Diagnose",
    },
    {
      id: 89,
      title: "No Display Power",
    },
    {
      id: 90,
      title: "Unexpect Shutdown",
    },
    {
      id: 91,
      title: "Time And Date Problem",
    },
    {
      id: 92,
      title: "Slow Boot",
    },
    {
      id: 93,
      title: "Color Change",
    },
    {
      id: 94,
      title: "Mother Board",
    },
    {
      id: 95,
      title: "Scanner",
    },
    {
      id: 96,
      title: "Formate",
    },
    {
      id: 97,
      title: "Full Set Up",
    },
  ],
  jewellaryitems: {
    JewelryItems: [
      {
        id: 98,
        title: "Mangtika",
      },
      {
        id: 99,
        title: "Necklace",
      },
      {
        id: 100,
        title: "Ear Rings",
      },
      {
        id: 101,
        title: "Nose Rings",
      },
      {
        id: 102,
        title: "Bangles",
      },
      {
        id: 103,
        title: "Arm Band",
      },
      {
        id: 104,
        title: "Rings",
      },
      {
        id: 105,
        title: "Waist Band",
      },
      {
        id: 106,
        title: "Anklet & Toe Rings",
      },
    ],
    GoldsmithServices: [
      {
        id: 107,
        title: "Ring Sizing Includes Rhodium Plating",
      },

      {
        id: 108,
        title: "Chain Soldering",
      },
      {
        id: 109,
        title: "Claw Re Tipping",
      },
      {
        id: 110,
        title: "Cleaning,Polishing Jewellery",
      },
      {
        id: 111,
        title: "Back Of Ring Fill In",
      },
      {
        id: 112,
        title: "Pearl Re Stringing",
      },
      {
        id: 113,
        title: "Engraving",
      },
      {
        id: 114,
        title: "Replace Earring Backing",
      },
    ],
    GoldType: [
      {
        id: 115,
        title: "14k",
      },
      {
        id: 116,
        title: "18k",
      },
      {
        id: 117,
        title: "22k",
      },
      {
        id: 118,
        title: "24k",
      },
    ],
    TypesOfDiamonds: [
      {
        id: 119,
        title: "White Diamonds",
      },
      {
        id: 120,
        title: "Champagne Diamonds",
      },
      {
        id: 121,
        title: "Pink Champagne Diamonds",
      },
      {
        id: 122,
        title: "Yellow Diamonds",
      },
      {
        id: 123,
        title: "Blue Diamonds",
      },
      {
        id: 124,
        title: "Green Diamonds",
      },
      {
        id: 125,
        title: "Purple Diamonds",
      },
      {
        id: 126,
        title: "Synthetic Diamonds",
      },
    ],
  },
  tailorservice: {
    LadiesDress: [
      {
        id: 127,
        title: "3 Piece",
      },
      {
        id: 128,
        title: "4 Piece",
      },
      {
        id: 129,
        title: "Lehenga",
      },
      {
        id: 130,
        title: "Scart",
      },
      {
        id: 131,
        title: "Borka",
      },
      {
        id: 132,
        title: "Blouse",
      },
      {
        id: 133,
        title: "Ladies Shirt",
      },
    ],
    JeansDress: [
      {
        id: 134,
        title: "Shirt",
      },

      {
        id: 135,
        title: "Pant",
      },
      {
        id: 136,
        title: "Panjabi",
      },
      {
        id: 137,
        title: "Suit",
      },
      {
        id: 138,
        title: "Blazer",
      },
      {
        id: 139,
        title: "Lungi",
      },
      {
        id: 140,
        title: "T-Shirt",
      },
    ],
    BabyDress: [
      {
        id: 141,
        title: "Frock",
      },
      {
        id: 142,
        title: "Scart",
      },
      {
        id: 143,
        title: "Romper",
      },
      {
        id: 144,
        title: "Shirt",
      },
      {
        id: 145,
        title: "Pant",
      },
      {
        id: 146,
        title: "T-Shirt",
      },
    ],
  },
};
