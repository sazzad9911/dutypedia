import uuid from "react-native-uuid";
import { BusinessServiceIcon } from "../assets/icon";

export const BusinessOptions = {
  PROJECTMANAGEMENT: [
    {
      id: 1,
      title: "Graphics & Design Projects",
    },
    {
      id: 2,
      title: "Digital Marketing Projects",
    },
    {
      id: 3,
      title: "Writing & Translation Projects",
    },
    {
      id: 4,
      title: "Video & Animation Projects",
    },
    {
      id: 5,
      title: "Music & Audio Projects",
    },
    {
      id: 6,
      title: "Programming & Tech Projects",
    },
  ],
  BRANDINGSERVICES: [
    {
      id: 7,
      title: "Startup",
    },
    {
      id: 8,
      title: "Micro Business",
    },
    {
      id: 9,
      title: "Small Business",
    },
    {
      id: 10,
      title: "Medium Business",
    },
    {
      id: 11,
      title: "Large Business",
    },
    {
      id: 12,
      title: "Non Profit",
    },
    {
      id: 13,
      title: "Personal",
    },
  ],
  CAREERCOUNSELING: [
    {
      id: 14,
      title: "Search & Apply",
    },
    {
      id: 15,
      title: "Interview Preparation",
    },
  ],
  LEADGENERATION: [
    {
      id: 16,
      title: "Agriculture",
    },
    {
      id: 17,
      title: "Animals & Pets",
    },
    {
      id: 18,
      title: "Art & Design",
    },
    {
      id: 19,
      title: "Beauty & Cosmetics",
    },
    {
      id: 20,
      title: "Construction",
    },
    {
      id: 21,
      title: "Education",
    },
    {
      id: 22,
      title: "Energy & Utilities",
    },
    {
      id: 23,
      title: "Environmental",
    },
    {
      id: 24,
      title: "Events Planning",
    },
    {
      id: 25,
      title: "Fashion & Apparel",
    },
    {
      id: 26,
      title: "Financial Services & Business",
    },
    {
      id: 27,
      title: "Food & Beverage",
    },
    {
      id: 28,
      title: "Gaming",
    },
    {
      id: 29,
      title: "Kids",
    },
    {
      id: 30,
      title: "Legal",
    },
    {
      id: 31,
      title: "Lifestyle",
    },
    {
      id: 32,
      title: "Manufacturing & Storage",
    },
    {
      id: 33,
      title: "Marketing & Advertising",
    },
    {
      id: 34,
      title: "Media & Entertainment",
    },
    {
      id: 35,
      title: "Medical & Pharmaceutical",
    },
    {
      id: 36,
      title: "Non Profit",
    },
    {
      id: 37,
      title: "Photography & Videography",
    },
    {
      id: 38,
      title: "Public Sector",
    },
    {
      id: 39,
      title: "Religion & Spirituality",
    },
    {
      id: 40,
      title: "Real Estate",
    },
    {
      id: 41,
      title: "Retail & Wholesale",
    },
    {
      id: 42,
      title: "Science",
    },
    {
      id: 43,
      title: "Services",
    },
    {
      id: 44,
      title: "Sports & Fitness",
    },
    {
      id: 45,
      title: "Technology",
    },
    {
      id: 46,
      title: "Transportation & Automotive",
    },
    {
      id: 47,
      title: "Travel & Tourism",
    },
    {
      id: 48,
      title: "Writing & Publishing",
    },
  ],
  BusinessConsulting: {
    Industry: [
      {
        id: 49,
        title: "Arts & Culture",
      },
      {
        id: 50,
        title: "Auto & Transportation",
      },
      {
        id: 51,
        title: "Beauty",
      },
      {
        id: 52,
        title: "Business, Finance & Law",
      },
      {
        id: 53,
        title: "Construction",
      },
      {
        id: 54,
        title: "Entertainment & Gaming",
      },
      {
        id: 55,
        title: "Environment",
      },
      {
        id: 56,
        title: "Family & Education",
      },
      {
        id: 57,
        title: "Fashion",
      },
      {
        id: 58,
        title: "Fitness",
      },
      {
        id: 59,
        title: "Food & Beverage",
      },
      {
        id: 60,
        title: "Health & Medical",
      },
      {
        id: 61,
        title: "Internet & Technology",
      },
      {
        id: 62,
        title: "Lifestyle",
      },
      {
        id: 63,
        title: "Manufacturing & Storage",
      },
      {
        id: 64,
        title: "News & Politics",
      },
      {
        id: 65,
        title: "Pets",
      },
      {
        id: 66,
        title: "Real Estate",
      },
      {
        id: 67,
        title: "Retail & Ecommerce",
      },
      {
        id: 68,
        title: "Science",
      },
      {
        id: 69,
        title: "Sports & Recreation",
      },
      {
        id: 70,
        title: "Travel & Hospitality",
      },
      {
        id: 71,
        title: "General",
      },
    ],
    Purpose: [
      {
        id: 72,
        title: "Business Development",
      },
      {
        id: 73,
        title: "Company Launch",
      },
      {
        id: 74,
        title: "Digital Transformation",
      },
      {
        id: 75,
        title: "Go-to-market",
      },
      {
        id: 76,
        title: "Organizational Development",
      },
      {
        id: 77,
        title: "Profit/loss",
      },
      {
        id: 78,
        title: "Scalability",
      },
    ],
  },
  FinancialConsulting: {
    Industry: [
      {
        id: 79,
        title: "Arts & Culture",
      },
      {
        id: 80,
        title: "Auto & Transportation",
      },
      {
        id: 81,
        title: "Beauty",
      },
      {
        id: 82,
        title: "Business, Finance & Law",
      },
      {
        id: 83,
        title: "Construction",
      },
      {
        id: 84,
        title: "Entertainment & Gaming",
      },
      {
        id: 85,
        title: "Environment",
      },
      {
        id: 86,
        title: "Family & Education",
      },
      {
        id: 87,
        title: "Fashion",
      },
      {
        id: 88,
        title: "Fitness",
      },
      {
        id: 89,
        title: "Food & Beverage",
      },
      {
        id: 90,
        title: "Health & Medical",
      },
      {
        id: 91,
        title: "Internet & Technology",
      },
      {
        id: 92,
        title: "Lifestyle",
      },
      {
        id: 93,
        title: "Manufacturing & Storage",
      },
      {
        id: 94,
        title: "News & Politics",
      },
      {
        id: 95,
        title: "Pets",
      },
      {
        id: 96,
        title: "Real Estate",
      },
      {
        id: 97,
        title: "Retail & Ecommerce",
      },
      {
        id: 98,
        title: "Science",
      },
      {
        id: 99,
        title: "Sports & Recreation",
      },
      {
        id: 100,
        title: "Travel & Hospitality",
      },
      {
        id: 101,
        title: "General",
      },
    ],
    Purpose: [
      {
        id: 102,
        title: "Business Development",
      },
      {
        id: 103,
        title: "Company Launch",
      },
      {
        id: 104,
        title: "Digital Transformation",
      },
      {
        id: 105,
        title: "Go-to-market",
      },
      {
        id: 106,
        title: "Organizational Development",
      },
      {
        id: 107,
        title: "Profit/loss",
      },
      {
        id: 108,
        title: "Scalability",
      },
    ],
  },
  BusinessPlans: {
    BusinessType: [
      {
        id: 109,
        title: "Startup",
      },
      {
        id: 110,
        title: "Micro Business",
      },
      {
        id: 111,
        title: "Small Business",
      },
      {
        id: 112,
        title: "Medium Business",
      },
      {
        id: 113,
        title: "Large Business",
      },
      {
        id: 114,
        title: "Non Profit",
      },
      {
        id: 115,
        title: "Personal",
      },
    ],
    PlanFormat: [
      {
        id: 116,
        title: "Excel Spreadsheet",
      },
      {
        id: 117,
        title: "Google Sheets",
      },
      {
        id: 118,
        title: "Powerpoint Presentation",
      },
      {
        id: 119,
        title: "Google Slides",
      },
      {
        id: 120,
        title: "Word Doc",
      },
      {
        id: 121,
        title: "Google Docs",
      },
      {
        id: 122,
        title: "Pdf",
      },
    ],
    PlanPurpose: [
      {
        id: 123,
        title: "Investors Roadshow",
      },
      {
        id: 124,
        title: "Loan Approval",
      },
      {
        id: 125,
        title: "Partnerships / Joint Ventures",
      },
      {
        id: 126,
        title: "Personal Use",
      },
      {
        id: 127,
        title: "Immigration",
      },
    ],
  },
  CustomerCare: {
    ServiceType: [
      {
        id: 128,
        title: "Customer Success",
      },
      {
        id: 129,
        title: "Planning & Setup",
      },
      {
        id: 130,
        title: "Consulting",
      },
      {
        id: 131,
        title: "Customer Support",
      },
    ],
    Timezone: [
      {
        id: 132,
        title: "Utc Daytime",
      },
      {
        id: 133,
        title: "Utc Nighttime",
      },
      {
        id: 134,
        title: "24hour",
      },
      {
        id: 135,
        title: "Go-to-market",
      },
    ],
    SupportSoftware: [
      {
        id: 136,
        title: "Zoho Desk",
      },
      {
        id: 137,
        title: "Freshdesk",
      },
      {
        id: 138,
        title: "Zendesk",
      },
      {
        id: 139,
        title: "Salesforce",
      },
      {
        id: 140,
        title: "Liveagent",
      },
      {
        id: 141,
        title: "Intercom",
      },
      {
        id: 142,
        title: "Activecampaign",
      },
    ],
    KnowledgebaseSoftware: [
      {
        id: 143,
        title: "Document 360",
      },
      {
        id: 144,
        title: "Confluence",
      },
      {
        id: 145,
        title: "Freshdesk",
      },
      {
        id: 146,
        title: "Freshservice",
      },
      {
        id: 147,
        title: "Bitrix24",
      },
      {
        id: 148,
        title: "Caspio",
      },
      {
        id: 149,
        title: "Liveagent",
      },
      {
        id: 150,
        title: "Tribe",
      },
      {
        id: 151,
        title: "Zoho",
      },
    ],
    SocialMediaPlatform: [
      {
        id: 152,
        title: "Facebook",
      },
      {
        id: 153,
        title: "Twitter",
      },
      {
        id: 154,
        title: "Instagram",
      },
      {
        id: 155,
        title: "Linkedin",
      },
    ],
    ServiceType_2: [
      {
        id: 156,
        title: "Technical Support",
      },
      {
        id: 157,
        title: "Non-Technical Support",
      },
    ],
    Industry: [
      {
        id: 158,
        title: "Agriculture",
      },
      {
        id: 159,
        title: "Animals & Pets",
      },
      {
        id: 160,
        title: "Art & Design",
      },
      {
        id: 161,
        title: "Beauty & Cosmetics",
      },
      {
        id: 162,
        title: "Construction",
      },
      {
        id: 163,
        title: "Education",
      },
      {
        id: 164,
        title: "Energy & Utilities",
      },
      {
        id: 165,
        title: "Environmental",
      },
      {
        id: 166,
        title: "Events Planning",
      },
      {
        id: 167,
        title: "Fashion & Apparel",
      },
      {
        id: 168,
        title: "Financial Services & Business",
      },
      {
        id: 169,
        title: "Food & Beverage",
      },
      {
        id: 170,
        title: "Gaming",
      },
      {
        id: 171,
        title: "Kids",
      },
      {
        id: 172,
        title: "Legal",
      },
      {
        id: 173,
        title: "Lifestyle",
      },
      {
        id: 174,
        title: "Manufacturing & Storage",
      },
      {
        id: 175,
        title: "Marketing & Advertising",
      },
      {
        id: 176,
        title: "Media & Entertainment",
      },
      {
        id: 177,
        title: "Medical & Pharmaceutical",
      },
      {
        id: 178,
        title: "Non Profit",
      },
      {
        id: 179,
        title: "Photography & Videography",
      },
      {
        id: 180,
        title: "Public Sector",
      },
      {
        id: 181,
        title: "Religion & Spirituality",
      },
      {
        id: 182,
        title: "Real Estate",
      },
      {
        id: 183,
        title: "Retail & Wholesale",
      },
      {
        id: 184,
        title: "Science",
      },
      {
        id: 185,
        title: "Services",
      },
      {
        id: 186,
        title: "Sports & Fitness",
      },
      {
        id: 187,
        title: "Technology",
      },
      {
        id: 188,
        title: "Transportation & Automotive",
      },
      {
        id: 189,
        title: "Travel & Tourism",
      },
      {
        id: 190,
        title: "Writing & Publishing",
      },
    ],
  },
  DataEntry: {
    ServiceType: [
      {
        id: 191,
        title: "Cleaning",
      },
      {
        id: 192,
        title: "Insert Data",
      },
      {
        id: 193,
        title: "Fix Format",
      },
      {
        id: 194,
        title: "Copy data",
      },
    ],
    Tool: [
      {
        id: 195,
        title: "Excel Spreadsheet",
      },
      {
        id: 196,
        title: "Google Sheets",
      },
      {
        id: 197,
        title: "other Spreadsheet",
      },
    ],
  },
  VIRTUALASSISTANT: {
    ServiceType: [
      {
        id: 198,
        title: "Research",
      },
      {
        id: 199,
        title: "File Conversion",
      },
      {
        id: 200,
        title: "Administration",
      },
      {
        id: 201,
        title: "Skip Tracing",
      },
      {
        id: 202,
        title: "Call Center & Calling",
      },
    ],
    Purpose: [
      {
        id: 203,
        title: "personal",
      },
      {
        id: 204,
        title: "business",
      },
    ],
    Industry: [
      {
        id: 205,
        title: "agriculture",
      },
      {
        id: 206,
        title: "animals&pets",
      },
      {
        id: 207,
        title: "Architecture & Interior Design",
      },
      {
        id: 208,
        title: "Audio Services",
      },
      {
        id: 209,
        title: "Beauty & Cosmetics",
      },
      {
        id: 210,
        title: "Biotech",
      },
      {
        id: 211,
        title: "Business Services & Consulting",
      },
      {
        id: 212,
        title: "Construction",
      },
      {
        id: 213,
        title: "Crypto & Blockchain",
      },
      {
        id: 214,
        title: "Cyber Security",
      },
      {
        id: 215,
        title: "Data Analytics",
      },
      {
        id: 216,
        title: "E-Commerce",
      },
      {
        id: 217,
        title: "Education",
      },
      {
        id: 218,
        title: "Energy",
      },
      {
        id: 219,
        title: "Engineering",
      },
      {
        id: 220,
        title: "Environmental",
      },
      {
        id: 221,
        title: "Events Planning",
      },
      {
        id: 222,
        title: "Fashion & Apparel",
      },
      {
        id: 223,
        title: "Financial Services",
      },
      {
        id: 224,
        title: "Food & Beverage",
      },
      {
        id: 225,
        title: "Gaming",
      },
      {
        id: 226,
        title: "Government & Public Sector",
      },
      {
        id: 227,
        title: "Hardware & Electronics",
      },
      {
        id: 228,
        title: "Legal",
      },
      {
        id: 229,
        title: "Lifestyle",
      },
      {
        id: 230,
        title: "Marketing & Advertising",
      },
      {
        id: 231,
        title: "Medical & Pharmaceutical",
      },
      {
        id: 232,
        title: "Non Profit",
      },
      {
        id: 233,
        title: "Photography",
      },
      {
        id: 234,
        title: "Real Estate",
      },
      {
        id: 235,
        title: "Religion & Spirituality",
      },
      {
        id: 236,
        title: "Retail & Wholesale",
      },
      {
        id: 237,
        title: "Software",
      },
      {
        id: 238,
        title: "Sports & Fitness",
      },
      {
        id: 239,
        title: "Telecommunications",
      },
      {
        id: 240,
        title: "Transportation & Automotive",
      },
      {
        id: 241,
        title: "Travel & Tourism",
      },
      {
        id: 242,
        title: "Video Services",
      },
      {
        id: 243,
        title: "Wellness",
      },
      {
        id: 244,
        title: "Writing & Publishing",
      },
    ],
  },
  HrConsulting: {
    ServiceType: [
      {
        id: 245,
        title: "Organizational Development",
      },
      {
        id: 246,
        title: "Talent Acquisition & Recruitment",
      },
      {
        id: 247,
        title: "Performance Management",
      },
      {
        id: 248,
        title: "Employee Learning & Development",
      },
      {
        id: 249,
        title: "Compensation & Benefits",
      },
      {
        id: 250,
        title: "Hr Information Systems",
      },
    ],
    Industry: [
      {
        id: 251,
        title: "Agriculture",
      },
      {
        id: 252,
        title: "Animals & Pets",
      },
      {
        id: 253,
        title: "Art & Design",
      },
      {
        id: 254,
        title: "Beauty & Cosmetics",
      },
      {
        id: 255,
        title: "Construction",
      },
      {
        id: 256,
        title: "Education",
      },
      {
        id: 257,
        title: "Energy & Utilities",
      },
      {
        id: 258,
        title: "Environmental",
      },
      {
        id: 259,
        title: "Events Planning",
      },
      {
        id: 260,
        title: "Fashion & Apparel",
      },
      {
        id: 261,
        title: "Financial Services & Business",
      },
      {
        id: 262,
        title: "Food & Beverage",
      },
      {
        id: 263,
        title: "Gaming",
      },
      {
        id: 264,
        title: "Kids",
      },
      {
        id: 265,
        title: "Legal",
      },
      {
        id: 266,
        title: "Lifestyle",
      },
      {
        id: 267,
        title: "Manufacturing & Storage",
      },
      {
        id: 268,
        title: "Marketing & Advertising",
      },
      {
        id: 269,
        title: "Media & Entertainment",
      },
      {
        id: 270,
        title: "Medical & Pharmaceutical",
      },
      {
        id: 271,
        title: "Non Profit",
      },
      {
        id: 272,
        title: "Photography & Videography",
      },
      {
        id: 273,
        title: "Public Sector",
      },
      {
        id: 274,
        title: "Real Estate",
      },
      {
        id: 275,
        title: "Religion & Spirituality",
      },
      {
        id: 276,
        title: "Retail & Wholesale",
      },
      {
        id: 277,
        title: "Science",
      },
      {
        id: 278,
        title: "Services",
      },
      {
        id: 279,
        title: "Sports & Fitness",
      },
      {
        id: 280,
        title: "Technology",
      },
      {
        id: 281,
        title: "Transportation & Automotive",
      },
      {
        id: 282,
        title: "Travel & Tourism",
      },
      {
        id: 283,
        title: "Writing & Publishing",
      },
    ],
  },
  ECommerceManagement: {
    ServiceType: [
      {
        id: 284,
        title: "PRODUCT RESEARCH",
      },
      {
        id: 285,
        title: "STORE MANAGEMENT",
      },
      {
        id: 286,
        title: "PRODUCT UPLOAD",
      },
    ],
    Industry: [
      {
        id: 287,
        title: "Arts",
      },
      {
        id: 288,
        title: "Business",
      },
      {
        id: 289,
        title: "Crypto & Blockchain",
      },
      {
        id: 290,
        title: "Cyber Security",
      },
      {
        id: 291,
        title: "E-Commerce",
      },
      {
        id: 292,
        title: "Education",
      },
      {
        id: 293,
        title: "Environmental",
      },
      {
        id: 294,
        title: "Financial Services/ Banking",
      },
      {
        id: 295,
        title: "Games",
      },
      {
        id: 296,
        title: "Government& Public Sector",
      },
      {
        id: 297,
        title: "Health & Wellness",
      },
      {
        id: 298,
        title: "Insurance",
      },
      {
        id: 299,
        title: "Kids and Family ",
      },
      {
        id: 300,
        title: "Legal",
      },
      {
        id: 301,
        title: "Media & Entertainment",
      },
      {
        id: 302,
        title: "Music",
      },
      {
        id: 303,
        title: "News",
      },
      {
        id: 304,
        title: "Non-Profit",
      },
      {
        id: 305,
        title: "Real Estate",
      },
      {
        id: 306,
        title: "Retail & Wholesale",
      },
      {
        id: 307,
        title: "Society and Culturer",
      },
      {
        id: 308,
        title: "Sports and Recreation",
      },
      {
        id: 309,
        title: "Technology & Internet",
      },
      {
        id: 310,
        title: "Transportation & Automotivet",
      },
    ],
    Platform: [
      {
        id: 311,
        title: "Alibaba",
      },
      {
        id: 312,
        title: "Ali Express ",
      },
      {
        id: 313,
        title: "Amazon",
      },
      {
        id: 314,
        title: "Big Cartel",
      },
      {
        id: 315,
        title: "Bigcommerce",
      },
      {
        id: 316,
        title: "Daraz",
      },
      {
        id: 317,
        title: " eBay",
      },
      {
        id: 318,
        title: "Ecwid",
      },
      {
        id: 319,
        title: "Etsy",
      },
      {
        id: 320,
        title: "Facebook Shop",
      },
      {
        id: 321,
        title: "JD",
      },
      {
        id: 322,
        title: "Magento",
      },
      {
        id: 323,
        title: "Opencart",
      },
      {
        id: 324,
        title: "OsCommerce",
      },
      {
        id: 325,
        title: "Prestashop",
      },
      {
        id: 326,
        title: "Shopify",
      },
      {
        id: 327,
        title: "Shopware",
      },
      {
        id: 328,
        title: "SiteBuilder",
      },
      {
        id: 329,
        title: "Squarespace",
      },
      {
        id: 330,
        title: "Taobao",
      },
      {
        id: 331,
        title: "Volusion",
      },
      {
        id: 332,
        title: "VTEX",
      },
      {
        id: 333,
        title: "Webflow",
      },
      {
        id: 334,
        title: "Zendesk",
      },
      {
        id: 335,
        title: "Wix",
      },
      {
        id: 336,
        title: "WooCommerce",
      },
      {
        id: 337,
        title: "Walmart",
      },
      {
        id: 338,
        title: "Wordpress",
      },
    ],
  },
  LegalConsulting: {
    ServiceType: [
      {
        id: 339,
        title: "Legal Research",
      },
      {
        id: 340,
        title: "Legal Documents & Contracts",
      },
      {
        id: 341,
        title: "Arbitration & Mediation",
      },
      {
        id: 342,
        title: "General Legal Advice",
      },
      {
        id: 343,
        title: "Applications & Registrations",
      },
      {
        id: 344,
        title: "Legal Disputes",
      },
    ],
    FieldOfLaw: [
      {
        id: 345,
        title: "Admiralty (Maritime) ",
      },
      {
        id: 346,
        title: "Finance",
      },
      {
        id: 347,
        title: "Business (Corporate)",
      },
      {
        id: 348,
        title: "Civil Rights ",
      },
      {
        id: 349,
        title: "Entertainment ",
      },
      {
        id: 350,
        title: "Environmental",
      },
      {
        id: 351,
        title: "Family",
      },
      {
        id: 352,
        title: "Health & Medical",
      },
      {
        id: 353,
        title: "Immigration",
      },
      {
        id: 354,
        title: "Intellectual Property",
      },
      {
        id: 355,
        title: "International",
      },
      {
        id: 356,
        title: "Labor (Employment)",
      },
      {
        id: 357,
        title: "Military",
      },
      {
        id: 358,
        title: "Personal Injury",
      },
      {
        id: 359,
        title: "Property",
      },
      {
        id: 360,
        title: "Commercial",
      },
      {
        id: 361,
        title: "Privacy",
      },
    ],
    DocumentType: [
      {
        id: 362,
        title: "Demand Letters",
      },
      {
        id: 363,
        title: "Declarations / Affidavits",
      },
      {
        id: 364,
        title: "Lawyer Confirmation",
      },
      {
        id: 365,
        title: "Legal Opinion",
      },
      {
        id: 366,
        title: "Letter Of Appeal",
      },
      {
        id: 367,
        title: "Legal Dispute / Claims Letter",
      },
      {
        id: 368,
        title: "Dmca Claims",
      },
      {
        id: 369,
        title: "Terms Of Service",
      },
      {
        id: 370,
        title: "Privacy Policy",
      },
      {
        id: 371,
        title: "Esop Plan",
      },
      {
        id: 372,
        title: "Sexual",
      },
      {
        id: 373,
        title: "Harassment Policy",
      },
    ],
    AgreementType: [
      {
        id: 374,
        title: "Nda",
      },
      {
        id: 375,
        title: "Evaluation",
      },
      {
        id: 376,
        title: "Leases",
      },
      {
        id: 377,
        title: "Partnership Agreement",
      },
      {
        id: 378,
        title: "Service Agreement",
      },
      {
        id: 379,
        title: "License Agreement",
      },
      {
        id: 380,
        title: "Procurement Agreement",
      },
      {
        id: 381,
        title: "Founders Agreement",
      },
      {
        id: 382,
        title: "Share Purchase Agreement",
      },
      {
        id: 383,
        title: "Employment Agreement",
      },
      {
        id: 384,
        title: "Stock Option Agreement",
      },
    ],
  },

  FinancialConsulting: {
    ServiceType: [
      {
        id: 385,
        title: "ONLINE TRADING LESSONS",
      },
      {
        id: 386,
        title: "FINANCIAL FORECASTING & MODELING",
      },
      {
        id: 387,
        title: "PERSONAL FINANCE & WEALTH MANAGEMENT",
      },
      {
        id: 388,
        title: "TAX CONSULTING",
      },
      {
        id: 389,
        title: "ACCOUNTING & BOOKKEEPING",
      },
      {
        id: 390,
        title: "ANALYSIS, VALUATION & OPTIMIZATION",
      },
    ],
    Industry: [
      {
        id: 391,
        title: "Agriculture",
      },
      {
        id: 392,
        title: "Animals & Pets",
      },
      {
        id: 393,
        title: "Architecture & Interior Design",
      },
      {
        id: 394,
        title: "Art & Design",
      },
      {
        id: 395,
        title: "Audio Services",
      },
      {
        id: 396,
        title: "Beauty & Cosmetics",
      },
      {
        id: 397,
        title: "Biotech",
      },
      {
        id: 398,
        title: "Business Services & Consulting",
      },
      {
        id: 399,
        title: "Construction",
      },
      {
        id: 400,
        title: "Crypto & Blockchain",
      },
      {
        id: 401,
        title: "Cyber Security ",
      },
      {
        id: 402,
        title: "Data Analytics",
      },
      {
        id: 403,
        title: "E-Commerce",
      },
      {
        id: 404,
        title: "Education",
      },
      {
        id: 405,
        title: "Energy",
      },
      {
        id: 406,
        title: "Engineering",
      },
      {
        id: 407,
        title: "Environmental ",
      },
      {
        id: 408,
        title: "Events Planning ",
      },
      {
        id: 409,
        title: "Fashion & Apparel",
      },
      {
        id: 410,
        title: "Financial Services",
      },
      {
        id: 411,
        title: "Gaming",
      },
      {
        id: 412,
        title: "Government & Public Sector",
      },
      {
        id: 413,
        title: "Hardware & Electronics",
      },
      {
        id: 414,
        title: "Legal",
      },
      {
        id: 415,
        title: "Lifestyle",
      },
      {
        id: 416,
        title: "Manufacturing & Storage",
      },
      {
        id: 417,
        title: "Marketing & Advertising",
      },
      {
        id: 418,
        title: "Media & Entertainment",
      },
      {
        id: 419,
        title: "Medical & Pharmaceutical",
      },
      {
        id: 420,
        title: "Music",
      },
      {
        id: 421,
        title: "Non Profit",
      },
      {
        id: 422,
        title: "Photography",
      },
      {
        id: 423,
        title: "Real Estate",
      },
      {
        id: 424,
        title: "Religion & Spirituality",
      },
      {
        id: 425,
        title: "Retail & Wholesale",
      },
      {
        id: 426,
        title: "Software",
      },
      {
        id: 427,
        title: "Sports & Fitness",
      },
      {
        id: 428,
        title: "Telecommunications",
      },

      {
        id: 429,
        title: "Transportation & Automotive",
      },
      {
        id: 430,
        title: "Travel & Tourism",
      },
      {
        id: 431,
        title: "Video Services",
      },
      {
        id: 432,
        title: "Wellness",
      },
      {
        id: 433,
        title: "Writing & Publishing",
      },
    ],
  },
  SupplyChainManagement: {
    ServiceType: [
      {
        id: 434,
        title: "Procurement & Vendor Management",
      },
      {
        id: 435,
        title: "Logistics",
      },
    ],
    ProductType: [
      {
        id: 436,
        title: "Raw Material",
      },
      {
        id: 437,
        title: "Product",
      },
      {
        id: 438,
        title: "Service",
      },
    ],
  },
  GameConceptDesign: {
    Genre: [
      {
        id: 439,
        title: "Action",
      },
      {
        id: 440,
        title: "Adventure",
      },
      {
        id: 441,
        title: "Arcade",
      },
      {
        id: 442,
        title: "Fighting",
      },
      {
        id: 443,
        title: "Idle",
      },
      {
        id: 444,
        title: "Music",
      },
      {
        id: 445,
        title: "Platformers",
      },
      {
        id: 446,
        title: "Puzzle",
      },
      {
        id: 447,
        title: "Racing",
      },
      {
        id: 448,
        title: "Role Playing",
      },
      {
        id: 449,
        title: "Shooter",
      },
      {
        id: 450,
        title: "Simulation",
      },
      {
        id: 451,
        title: "Sports",
      },
      {
        id: 452,
        title: "Strategy",
      },
    ],
    GameType: [
      {
        id: 453,
        title: "Video Game",
      },
      {
        id: 454,
        title: "Tabletop Game",
      },
      {
        id: 455,
        title: "Escape Room",
      },
    ],
    PlatformType: [
      {
        id: 456,
        title: "Pc",
      },
      {
        id: 457,
        title: "Console",
      },
      {
        id: 458,
        title: "Mobile",
      },
      {
        id: 459,
        title: "Smart TV",
      },
      {
        id: 460,
        title: "Smart Watch",
      },
      {
        id: 461,
        title: "VR",
      },
    ],
    MonetizationModel: [
      {
        id: 462,
        title: "F2P",
      },
      {
        id: 463,
        title: "Premium",
      },
      {
        id: 464,
        title: "Subscription",
      },
    ],
    Purpose: [
      {
        id: 465,
        title: "Serious",
      },
      {
        id: 466,
        title: "Recreational",
      },
    ],
  },
  PRESENTATIONS: {
    ServiceType: [
      {
        id: 467,
        title: "Powerpoint",
      },
      {
        id: 468,
        title: "Google Slides",
      },
      {
        id: 469,
        title: "Prezi",
      },
      {
        id: 470,
        title: "Keynote",
      },
      {
        id: 471,
        title: "Canva",
      },
    ],

    PresentationType: [
      {
        id: 472,
        title: "Investor",
      },
      {
        id: 473,
        title: "Training",
      },
      {
        id: 474,
        title: "Marketing",
      },
      {
        id: 475,
        title: "Pitch",
      },
      {
        id: 476,
        title: "Sales",
      },
      {
        id: 477,
        title: "Conference",
      },
      {
        id: 478,
        title: "Business Proposal",
      },
      {
        id: 479,
        title: "Education",
      },
      {
        id: 480,
        title: "Research / Analysis ",
      },
    ],
    Industry: [
      {
        id: 481,
        title: "Agriculture",
      },
      {
        id: 482,
        title: "Animals & Pets",
      },
      {
        id: 483,
        title: "Architecture & Interior Design",
      },
      {
        id: 484,
        title: "Art & Design",
      },
      {
        id: 485,
        title: "Audio Services",
      },
      {
        id: 486,
        title: "Beauty & Cosmetics",
      },
      {
        id: 487,
        title: "Biotech",
      },
      {
        id: 488,
        title: "Business Services & Consulting",
      },
      {
        id: 489,
        title: "Construction",
      },
      {
        id: 490,
        title: "Crypto & Blockchain",
      },
      {
        id: 491,
        title: "Cyber Security ",
      },
      {
        id: 492,
        title: "Data Analytics",
      },
      {
        id: 493,
        title: "E-Commerce",
      },
      {
        id: 494,
        title: "Education",
      },
      {
        id: 495,
        title: "Energy",
      },
      {
        id: 496,
        title: "Engineering",
      },
      {
        id: 497,
        title: "Environmental ",
      },
      {
        id: 498,
        title: "Events Planning ",
      },
      {
        id: 499,
        title: "Fashion & Apparel",
      },
      {
        id: 500,
        title: "Financial Services",
      },
      {
        id: 501,
        title: "Gaming",
      },
      {
        id: 502,
        title: "Government & Public Sector",
      },
      {
        id: 503,
        title: "Hardware & Electronics",
      },
      {
        id: 504,
        title: "Legal",
      },
      {
        id: 505,
        title: "Lifestyle",
      },
      {
        id: 506,
        title: "Manufacturing & Storage",
      },
      {
        id: 507,
        title: "Marketing & Advertising",
      },
      {
        id: 508,
        title: "Media & Entertainment",
      },
      {
        id: 509,
        title: "Medical & Pharmaceutical",
      },
      {
        id: 510,
        title: "Music",
      },
      {
        id: 511,
        title: "Non Profit",
      },
      {
        id: 512,
        title: "Photography",
      },
      {
        id: 513,
        title: "Real Estate",
      },
      {
        id: 514,
        title: "Religion & Spirituality",
      },
      {
        id: 515,
        title: "Retail & Wholesale",
      },
      {
        id: 516,
        title: "Software",
      },
      {
        id: 517,
        title: "Sports & Fitness",
      },
      {
        id: 518,
        title: "Telecommunications",
      },

      {
        id: 519,
        title: "Transportation & Automotive",
      },
      {
        id: 520,
        title: "Travel & Tourism",
      },
      {
        id: 521,
        title: "Video Services",
      },
      {
        id: 522,
        title: "Wellness",
      },
      {
        id: 523,
        title: "Writing & Publishing",
      },
    ],
  },
};
