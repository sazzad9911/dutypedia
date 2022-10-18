import uuid from "uuid";

export const ItOptions = {
  Data: {
    Databases: {
      Category: [
        {
          id: 1,
          title: "Design & Optimization",
        },
        {
          id: 2,
          title: "Queries",
        },
        {
          id: 3,
          title: "Cloud Based Solutions",
        },
        {
          id: 4,
          title: "Database Administration",
        },
        {
          id: 5,
          title: "Consultation",
        },
      ],
      DatabaseType: [
        {
          id: 6,
          title: "Centralized Database",
        },
        {
          id: 7,
          title: "Distributed Database",
        },
        {
          id: 8,
          title: "Graph Database",
        },
        {
          id: 9,
          title: "Hierarchical Database",
        },
        {
          id: 10,
          title: "Key-Value Database",
        },
        {
          id: 11,
          title: "Network Database",
        },
        {
          id: 12,
          title: "Non-Relational Database",
        },
        {
          id: 13,
          title: "Object-Oriented Database",
        },
        {
          id: 14,
          title: "Relational Database",
        },
      ],
      Platform: [
        {
          id: 15,
          title: "Airtable",
        },
        {
          id: 16,
          title: "Bigquery",
        },
        {
          id: 17,
          title: "Couchbase",
        },
        {
          id: 18,
          title: "Db2",
        },
        {
          id: 19,
          title: "Elasticsearch",
        },
        {
          id: 20,
          title: "Filemaker",
        },
        {
          id: 21,
          title: "Firebase",
        },
        {
          id: 22,
          title: "Firebird",
        },
        {
          id: 23,
          title: "Hadoop",
        },
        {
          id: 24,
          title: "Informix",
        },
        {
          id: 25,
          title: "Mariadb",
        },
        {
          id: 26,
          title: "Mongodb",
        },
        {
          id: 27,
          title: "Ms Sql",
        },
        {
          id: 28,
          title: "Mysql",
        },
        {
          id: 29,
          title: "Neo4J",
        },
        {
          id: 30,
          title: "Oracle",
        },
        {
          id: 31,
          title: "Pl/Sql",
        },
        {
          id: 32,
          title: "Postgressql",
        },
        {
          id: 33,
          title: "Sql Server",
        },
        {
          id: 34,
          title: "Sybase",
        },
        {
          id: 35,
          title: "Teradata",
        },
      ],
      CloudPlatform: [
        {
          id: 36,
          title: "Amazon Web Service",
        },
        {
          id: 37,
          title: "Oracle Database",
        },
        {
          id: 38,
          title: "Microsoft Azure",
        },
        {
          id: 39,
          title: "Google Cloud Platform",
        },
        {
          id: 40,
          title: "Ibm Db2",
        },
        {
          id: 41,
          title: "Mongodb Atlas",
        },
        {
          id: 42,
          title: "Openstack",
        },
      ],
      Expertise: [
        {
          id: 43,
          title: "Big Data",
        },
        {
          id: 44,
          title: "Data Center",
        },
        {
          id: 45,
          title: "Data Structure",
        },
        {
          id: 46,
          title: "Data Wearhouse",
        },
        {
          id: 47,
          title: "Encryptionh",
        },
        {
          id: 48,
          title: "Erd",
        },
        {
          id: 49,
          title: "Normalization",
        },
        {
          id: 50,
          title: "Sql",
        },
        {
          id: 51,
          title: "Nosql",
        },
        {
          id: 52,
          title: "Performance",
        },
        {
          id: 53,
          title: "Virtualization",
        },

        {
          id: 54,
          title: "Dcl",
        },
        {
          id: 55,
          title: "Ddl",
        },
        {
          id: 56,
          title: "Dml",
        },
        {
          id: 57,
          title: "Dql",
        },
        {
          id: 58,
          title: "Query Optimization",
        },
        {
          id: 59,
          title: "Migration",
        },
        {
          id: 60,
          title: "Security",
        },
        {
          id: 61,
          title: "Troubleshooting",
        },
        {
          id: 62,
          title: "Administrator",
        },
        {
          id: 63,
          title: "Backup & Recovery",
        },
        {
          id: 64,
          title: "Capacity Planning",
        },
        {
          id: 65,
          title: "Configuration",
        },
        {
          id: 66,
          title: "Database Design",
        },
        {
          id: 67,
          title: "Disaster Recovery",
        },
        {
          id: 68,
          title: "Installation",
        },
        {
          id: 69,
          title: "Performance Monitoring",
        },
        {
          id: 70,
          title: "Permissions",
        },
      ],
    },
    DataProcessing: {
      ServiceType: [
        {
          id: 71,
          title: "Data Mining & Scraping",
        },
        {
          id: 72,
          title: "Formulas & Macros",
        },
        {
          id: 73,
          title: "Automations",
        },
        {
          id: 74,
          title: "Consultation",
        },
      ],
      Technology: [
        {
          id: 75,
          title: "C#",
        },
        {
          id: 76,
          title: "Java",
        },
        {
          id: 77,
          title: "Javascript",
        },
        {
          id: 78,
          title: "Python",
        },
        {
          id: 79,
          title: "Php",
        },
        {
          id: 80,
          title: "Ruby",
        },
        {
          id: 81,
          title: "Google Sheets",
        },
        {
          id: 82,
          title: "Excel",
        },
        {
          id: 83,
          title: "Scrapy",
        },
        {
          id: 84,
          title: "Selenium",
        },
        {
          id: 85,
          title: "Uipath",
        },
        {
          id: 86,
          title: "Vba",
        },
        {
          id: 87,
          title: "Google Apps Script",
        },
        {
          id: 88,
          title: "Amazon Redshift",
        },
        {
          id: 89,
          title: "Apache Cassandra",
        },
        {
          id: 90,
          title: "Apache Hadoop",
        },
        {
          id: 91,
          title: "Apache Kafka",
        },
        {
          id: 92,
          title: "Apache Spark",
        },
        {
          id: 93,
          title: "Julia",
        },
        {
          id: 94,
          title: "Matlab",
        },
        {
          id: 95,
          title: "R",
        },
        {
          id: 96,
          title: "Sas",
        },
        {
          id: 97,
          title: "Scala",
        },
        {
          id: 98,
          title: "Spss",
        },
        {
          id: 99,
          title: "Talend",
        },
      ],
      ScrapingTechnique: [
        {
          id: 100,
          title: "Automated",
        },
        {
          id: 101,
          title: "Manual",
        },
      ],
      InformationType: [
        {
          id: 102,
          title: "Competitor Research",
        },
        {
          id: 103,
          title: "Contact Information",
        },
        {
          id: 104,
          title: "Content Marketing",
        },
        {
          id: 105,
          title: "Currency & Stocks",
        },
        {
          id: 106,
          title: "Listings",
        },
        {
          id: 107,
          title: "News & Events",
        },
        {
          id: 108,
          title: "Price Comparison",
        },
        {
          id: 109,
          title: "Products & Reviews",
        },
        {
          id: 110,
          title: "Social Media",
        },
      ],
      Expertis: [
        {
          id: 111,
          title: "Formatting",
        },
        {
          id: 112,
          title: "Fixing",
        },
        {
          id: 113,
          title: "Forms",
        },
        {
          id: 114,
          title: "Pivot Tables",
        },
        {
          id: 115,
          title: "Formulas",
        },
        {
          id: 116,
          title: "Functions",
        },
        {
          id: 117,
          title: "Macros",
        },
        {
          id: 118,
          title: "Add-Ins",
        },
        {
          id: 119,
          title: "Classification",
        },
        {
          id: 120,
          title: "Clustering",
        },
        {
          id: 121,
          title: "Data Acquisition",
        },
        {
          id: 122,
          title: "Data Extraction",
        },
        {
          id: 123,
          title: "Data Flow",
        },
        {
          id: 124,
          title: "Data Manipulation",
        },
        {
          id: 125,
          title: "Data Upload",
        },
        {
          id: 126,
          title: "Data Validation",
        },
        {
          id: 127,
          title: "Etl",
        },
        {
          id: 128,
          title: "Normalization",
        },
        {
          id: 129,
          title: "Ranking",
        },
        {
          id: 130,
          title: "Transformation",
        },
        {
          id: 131,
          title: "Sql",
        },
        {
          id: 132,
          title: "Nosql",
        },
      ],
    },
    DataAnalytics: {
      ServiceType: [
        {
          id: 133,
          title: "Marketing & Sales",
        },
        {
          id: 134,
          title: "Product & Ux",
        },
        {
          id: 135,
          title: "Surveys & Research",
        },
        {
          id: 136,
          title: "Business & Financial",
        },
        {
          id: 137,
          title: "Planning & Supply Chain",
        },
        {
          id: 138,
          title: "Consultation",
        },
      ],
      Technology: [
        {
          id: 139,
          title: "Alteryx",
        },
        {
          id: 140,
          title: "Anylogic",
        },
        {
          id: 141,
          title: "Apache Spark",
        },
        {
          id: 142,
          title: "Eviews",
        },
        {
          id: 143,
          title: "Excel",
        },
        {
          id: 144,
          title: "Google Analytics",
        },
        {
          id: 145,
          title: "Google Data Studio",
        },
        {
          id: 146,
          title: "Google Sheets",
        },
        {
          id: 147,
          title: "Jupyter Notebook",
        },
        {
          id: 148,
          title: "Matlab",
        },
        {
          id: 149,
          title: "Minitab",
        },
        {
          id: 150,
          title: "Mixpanel",
        },
        {
          id: 151,
          title: "Python",
        },
        {
          id: 152,
          title: "Qlikview",
        },
        {
          id: 153,
          title: "R",
        },
        {
          id: 154,
          title: "Redash",
        },
        {
          id: 155,
          title: "Sas",
        },
        {
          id: 156,
          title: "Splunk",
        },
        {
          id: 157,
          title: "Spss",
        },
        {
          id: 158,
          title: "Stata",
        },
        {
          id: 159,
          title: "Tableau",
        },
      ],
      AnalysisType: [
        {
          id: 160,
          title: "Quantitative Analysis",
        },
        {
          id: 161,
          title: "Qualitative Analysis",
        },
        {
          id: 162,
          title: "Impact Analysis",
        },
        {
          id: 163,
          title: "Statistical Analysis",
        },
        {
          id: 164,
          title: "Descriptive Analysis",
        },
        {
          id: 165,
          title: "Diagnostic Analysis",
        },
        {
          id: 166,
          title: "Predictive Analysis",
        },
        {
          id: 167,
          title: "Prescriptive Analysis",
        },
      ],
      Expertise: [
        {
          id: 168,
          title: "Web Analytics",
        },
        {
          id: 169,
          title: "Alerts",
        },
        {
          id: 170,
          title: "Business Insights",
        },
        {
          id: 171,
          title: "Ab Test",
        },
        {
          id: 172,
          title: "Experiment Design",
        },
        {
          id: 173,
          title: "Trends",
        },
        {
          id: 174,
          title: "Algorithms",
        },
        {
          id: 175,
          title: "Prediction",
        },
        {
          id: 176,
          title: "Forecasting",
        },
        {
          id: 177,
          title: "Probability",
        },
        {
          id: 178,
          title: "Anomaly Detection",
        },
        {
          id: 179,
          title: "Math",
        },
        {
          id: 180,
          title: "Churn & Retention",
        },
        {
          id: 181,
          title: "Statistics",
        },
        {
          id: 182,
          title: "Cohort Analysis",
        },
        {
          id: 183,
          title: "Factor Analysis",
        },
        {
          id: 184,
          title: "Monte Carlo Simulation",
        },
        {
          id: 185,
          title: "Regression Testing",
        },
        {
          id: 186,
          title: "Sentiment Analysis",
        },
        {
          id: 187,
          title: "Time Series Analysis",
        },
      ],
    },
    DataVisualization: {
      ServiceType: [
        {
          id: 188,
          title: "Graphs & Charts",
        },
        {
          id: 189,
          title: "Dashboards",
        },
        {
          id: 190,
          title: "Geographic Information Systems",
        },
        {
          id: 191,
          title: "Reports",
        },
        {
          id: 192,
          title: "Consultation",
        },
      ],
      Tool: [
        {
          id: 193,
          title: "Arcgis",
        },
        {
          id: 194,
          title: "D3.Js",
        },
        {
          id: 195,
          title: "Excel",
        },
        {
          id: 196,
          title: "Google Data Studio",
        },
        {
          id: 197,
          title: "Infogram",
        },
        {
          id: 198,
          title: "Mixpanel",
        },
        {
          id: 199,
          title: "Power BI",
        },
        {
          id: 200,
          title: "Qgis",
        },
        {
          id: 201,
          title: "Qlikview",
        },
        {
          id: 202,
          title: "Qlik Sense",
        },
        {
          id: 203,
          title: "Sisense",
        },
        {
          id: 204,
          title: "Tableau",
        },
        {
          id: 205,
          title: "Visme",
        },
        {
          id: 206,
          title: "Whatagraph",
        },
        {
          id: 207,
          title: "Batchgeo",
        },
        {
          id: 208,
          title: "Esri",
        },
        {
          id: 209,
          title: "Geoda",
        },
        {
          id: 210,
          title: "Google Earth Pro",
        },
        {
          id: 211,
          title: "Google Maps Api",
        },
        {
          id: 212,
          title: "Mapinfo",
        },
        {
          id: 213,
          title: "Maptitude",
        },
        {
          id: 214,
          title: "Powerpoint",
        },
        {
          id: 215,
          title: "Sap Crystal Reports",
        },
        {
          id: 216,
          title: "Word",
        },
      ],
      ChartType: [
        {
          id: 217,
          title: "Comparison",
        },
        {
          id: 218,
          title: "Concept",
        },
        {
          id: 219,
          title: "Distribution",
        },
        {
          id: 220,
          title: "Hierarchy",
        },
        {
          id: 221,
          title: "How To",
        },
        {
          id: 222,
          title: "Location",
        },
        {
          id: 223,
          title: "Movement",
        },
        {
          id: 224,
          title: "Over Time",
        },
        {
          id: 225,
          title: "Patterns",
        },
        {
          id: 226,
          title: "Processes",
        },
        {
          id: 227,
          title: "Range",
        },
        {
          id: 228,
          title: "Relationship",
        },
        {
          id: 229,
          title: "User Interaction",
        },
        {
          id: 230,
          title: "Word Cloud",
        },
      ],
    },
    DataScience: {
      ServiceType: [
        {
          id: 231,
          title: "Computer Vision",
        },
        {
          id: 232,
          title: "Text Analysis & Nlp",
        },
        {
          id: 233,
          title: "Ranking & Recommendation",
        },
        {
          id: 234,
          title: "Time Series Analysis",
        },
        {
          id: 235,
          title: "Consultation",
        },
      ],
      Models_Methods: [
        {
          id: 236,
          title: "Machine Learning",
        },
        {
          id: 237,
          title: "Deep Learning",
        },
        {
          id: 238,
          title: "Neural Networks",
        },
        {
          id: 239,
          title: "Supervised Learning",
        },
        {
          id: 240,
          title: "Unsupervised Learning",
        },
        {
          id: 241,
          title: "Semi Supervised Learning",
        },
        {
          id: 242,
          title: "Reinforcement Learning",
        },
        {
          id: 243,
          title: "Decision Trees",
        },
        {
          id: 244,
          title: "Learning To Rank",
        },
        {
          id: 245,
          title: "Feature Learning",
        },
        {
          id: 246,
          title: "Anomaly Detection",
        },
        {
          id: 247,
          title: "Cluster Computing",
        },
        {
          id: 248,
          title: "Linear Regression",
        },
        {
          id: 249,
          title: "Bayesian Statistics",
        },
        {
          id: 250,
          title: "Classification Models",
        },
        {
          id: 251,
          title: "Tabular Modeling",
        },
        {
          id: 252,
          title: "Churn",
        },
        {
          id: 253,
          title: "Sentimental Analyis",
        },
      ],
      Technology: [
        {
          id: 254,
          title: "Python",
        },
        {
          id: 255,
          title: "Java",
        },
        {
          id: 256,
          title: "R",
        },
        {
          id: 257,
          title: "Lisp",
        },
        {
          id: 258,
          title: "Julia",
        },
        {
          id: 259,
          title: "Scala",
        },
        {
          id: 260,
          title: "Tensorflow",
        },
        {
          id: 261,
          title: "Pytorch",
        },
        {
          id: 262,
          title: "Opencv",
        },
        {
          id: 263,
          title: "Opennn",
        },
        {
          id: 264,
          title: "Ibm Watson",
        },
        {
          id: 265,
          title: "Keras",
        },
        {
          id: 266,
          title: "Google Ml Kit",
        },
        {
          id: 267,
          title: "Amazon Sagemaker",
        },
        {
          id: 268,
          title: "Scikit Learn",
        },
        {
          id: 269,
          title: "Colab",
        },
        {
          id: 270,
          title: "Jupyter Notebook",
        },
        {
          id: 271,
          title: "Apache Mahout",
        },
        {
          id: 272,
          title: "Azure Ml Studio",
        },
        {
          id: 273,
          title: "Theano",
        },
        {
          id: 274,
          title: "Mlflow",
        },
      ],
      Expertise: [
        {
          id: 275,
          title: "Image Processing",
        },
        {
          id: 276,
          title: "Image Recognition",
        },
        {
          id: 277,
          title: "Face Recognition",
        },
        {
          id: 278,
          title: "Ocr",
        },
        {
          id: 279,
          title: "Alpr",
        },
        {
          id: 280,
          title: "Image Segmentation",
        },
        {
          id: 281,
          title: "Object Detection",
        },
        {
          id: 282,
          title: "Image Tagging",
        },
      ],
    },
    DataEntry: {
      Type: [
        {
          id: 283,
          title: "Clean Data",
        },
        {
          id: 284,
          title: "Copy Paste",
        },
        {
          id: 285,
          title: "Convert Data",
        },
        {
          id: 286,
          title: "Fix Format",
        },
        {
          id: 287,
          title: "Insert Data",
        },
        {
          id: 288,
          title: "Tagging",
        },
        {
          id: 289,
          title: "Typing",
        },
        {
          id: 290,
          title: "Merge Data",
        },
      ],
      Tool: [
        {
          id: 291,
          title: "Excel",
        },
        {
          id: 292,
          title: "Google Sheets",
        },
        {
          id: 293,
          title: "Other Spreadsheets",
        },
        {
          id: 294,
          title: "Word",
        },
        {
          id: 295,
          title: "Google Docs",
        },
        {
          id: 296,
          title: "Pdf Editor",
        },
        {
          id: 297,
          title: "Powerpoint",
        },
        {
          id: 298,
          title: "Google Slides",
        },
      ],
    },
  },

  Graphic: {
    GraphicsForStreamers: {
      AssetType: [
        {
          id: 299,
          title: "Overlays & Screen Packs",
        },
        {
          id: 300,
          title: "Panels",
        },
        {
          id: 301,
          title: "Alerts",
        },
        {
          id: 302,
          title: "Emotes & Badges",
        },
        ,
        {
          id: 303,
          title: "Thumbnails",
        },
        {
          id: 304,
          title: "Banners",
        },
      ],
      StreamingPlatform: [
        {
          id: 305,
          title: "Twitch",
        },
        {
          id: 306,
          title: "YouTube",
        },
        {
          id: 307,
          title: "Facebook",
        },
        {
          id: 308,
          title: "Discord",
        },
        ,
        {
          id: 309,
          title: "DLive",
        },
        {
          id: 310,
          title: "Smashcast",
        },
        {
          id: 311,
          title: "Bigo.TV",
        },
      ],
    },

    BusinessCards: {
      MainType: [
        {
          id: 312,
          title: "Not Defined",
        },
        {
          id: 313,
          title: "Business Cards",
        },
        {
          id: 314,
          title: "Stationery",
        },
      ],
      ImageFileFormat: [
        {
          id: 315,
          title: "AI",
        },
        {
          id: 316,
          title: "JPG",
        },
        {
          id: 317,
          title: "PDF",
        },
        {
          id: 318,
          title: "PNG",
        },
        ,
        {
          id: 319,
          title: "PSD",
        },
      ],
    },
    Illustration: {
      ArtisticTechnique: [
        {
          id: 320,
          title: "Pencil",
        },
        {
          id: 321,
          title: "Charcoal",
        },
        {
          id: 322,
          title: "Pen & Ink",
        },
        {
          id: 323,
          title: "Watercolor",
        },
        {
          id: 324,
          title: "Acrylics",
        },
        {
          id: 325,
          title: "Collage",
        },
        {
          id: 326,
          title: "Woodcutting/Engraving",
        },
        {
          id: 327,
          title: "Freehand Digital ",
        },
        {
          id: 328,
          title: "Vector Art",
        },
        {
          id: 329,
          title: "3D Graphics",
        },
        {
          id: 330,
          title: "Mixed Media",
        },
      ],

      Style: [
        {
          id: 331,
          title: "for children",
        },
        {
          id: 332,
          title: "realistic",
        },
        {
          id: 333,
          title: "abastrct",
        },
        {
          id: 334,
          title: "flat",
        },
        {
          id: 335,
          title: "isometric",
        },
        {
          id: 336,
          title: "sketch",
        },
        {
          id: 337,
          title: "line art",
        },
        {
          id: 338,
          title: "grafiti",
        },
        {
          id: 339,
          title: "retro/vintage",
        },
        {
          id: 340,
          title: "pop art",
        },
        {
          id: 341,
          title: "linocut",
        },
        {
          id: 342,
          title: "low poly",
        },
        {
          id: 343,
          title: "poixel art",
        },
        {
          id: 344,
          title: "comic & cartoon",
        },
        {
          id: 345,
          title: "caricature",
        },
        {
          id: 346,
          title: "anime & manga",
        },
        {
          id: 347,
          title: "chibi",
        },
        {
          id: 348,
          title: "doodle",
        },
        {
          id: 349,
          title: "technical",
        },
        {
          id: 350,
          title: "caligraphy",
        },
      ],
      Theme: [
        {
          id: 351,
          title: "Commercial & Advertising",
        },
        {
          id: 352,
          title: "Editorial",
        },
        {
          id: 353,
          title: "Game",
        },
        {
          id: 354,
          title: "Educational",
        },
        {
          id: 355,
          title: "Concept Art",
        },
        {
          id: 356,
          title: "Fantasy",
        },
        {
          id: 357,
          title: "Sci-Fi",
        },
        {
          id: 358,
          title: "Surrealistic",
        },
        {
          id: 359,
          title: "Construction",
        },
        {
          id: 360,
          title: "Psychedelic",
        },
        {
          id: 361,
          title: "Fan Art",
        },
        {
          id: 362,
          title: "Dark Art",
        },
        {
          id: 363,
          title: "Horror",
        },
        {
          id: 364,
          title: "Satirical",
        },
        {
          id: 365,
          title: "Fine Art",
        },
        {
          id: 366,
          title: "Manuals/Instruction",
        },
      ],

      Subject: [
        {
          id: 367,
          title: "Anatomy",
        },
        {
          id: 368,
          title: "Animals",
        },
        {
          id: 369,
          title: "Beauty/Health",
        },
        {
          id: 370,
          title: "Business",
        },
        {
          id: 371,
          title: "Food & Drink",
        },
        {
          id: 372,
          title: "Innovation/Tech",
        },
        {
          id: 373,
          title: "Landscape",
        },
        {
          id: 374,
          title: "Lifestyle",
        },
        {
          id: 375,
          title: "Maps",
        },
        {
          id: 376,
          title: "Nature",
        },
        {
          id: 377,
          title: "Objects",
        },
        {
          id: 378,
          title: "People",
        },
        {
          id: 379,
          title: "Science & Medical",
        },
        {
          id: 380,
          title: "Shape",
        },
        {
          id: 381,
          title: "Sport & Fitness",
        },
        ,
        {
          id: 382,
          title: "Text & Lettering",
        },
        {
          id: 383,
          title: "Transportation",
        },
        {
          id: 384,
          title: "Travel",
        },
        {
          id: 385,
          title: "Urban",
        },
      ],
    },
    PatternDesign: {
      DesignTechnique: [
        {
          id: 386,
          title: "Hand Drawn",
        },
        {
          id: 387,
          title: "Digital",
        },
      ],

      DesignStyle: [
        {
          id: 388,
          title: "Abstract",
        },
        {
          id: 389,
          title: "Cartoon",
        },
        {
          id: 390,
          title: "Collage",
        },
        {
          id: 391,
          title: "Realistic",
        },
        {
          id: 392,
          title: "Watercolor",
        },
      ],

      Purpose: [
        {
          id: 393,
          title: "Accessories",
        },
        {
          id: 394,
          title: "Home Decor",
        },
        {
          id: 395,
          title: "Stationary",
        },
        {
          id: 396,
          title: "Textile & Fabric",
        },
        {
          id: 397,
          title: "Wallpaper",
        },
        {
          id: 398,
          title: "Website",
        },
      ],

      PatternTheme: [
        {
          id: 399,
          title: "Animals",
        },
        {
          id: 400,
          title: "Boho",
        },
        {
          id: 401,
          title: "Floral",
        },
        {
          id: 402,
          title: "Food",
        },
        {
          id: 403,
          title: "Kids",
        },
        {
          id: 404,
          title: "Nature",
        },
        {
          id: 405,
          title: "Objects",
        },
        {
          id: 406,
          title: "People",
        },
        {
          id: 407,
          title: "Seasonal",
        },
        {
          id: 408,
          title: "Sports",
        },
        {
          id: 409,
          title: "Texture",
        },
        {
          id: 410,
          title: "Geometric",
        },
        {
          id: 411,
          title: "Tribal",
        },
      ],
    },
    FlyerDesign: {
      FormatType: [
        {
          id: 412,
          title: "Flyers",
        },
        {
          id: 413,
          title: "Door Hangers",
        },
        {
          id: 414,
          title: "Media Kit",
        },
      ],

      ImageFileFormat: [
        {
          id: 415,
          title: "AI",
        },
        {
          id: 416,
          title: "JPG",
        },
        {
          id: 417,
          title: "PDF",
        },
        {
          id: 418,
          title: "PNG",
        },
        {
          id: 419,
          title: "PSD",
        },
      ],
    },
    BookDesign: {
      DesignStyle: [
        {
          id: 420,
          title: "Illustrative",
        },
        {
          id: 421,
          title: "Photographic",
        },
        {
          id: 422,
          title: "Typographic",
        },
      ],

      Genre: [
        {
          id: 423,
          title: "Arts",
        },
        {
          id: 424,
          title: "Academics / Textbooks",
        },
        {
          id: 425,
          title: "Biographies / Memoir",
        },
        {
          id: 426,
          title: "Children's Books",
        },
        {
          id: 427,
          title: "Cookbooks / Recipes",
        },
        {
          id: 428,
          title: "Comic",
        },
        {
          id: 429,
          title: "Crime",
        },
        {
          id: 430,
          title: "Fantasy",
        },
        {
          id: 431,
          title: "Horror / Thriller",
        },
        {
          id: 432,
          title: "How-To",
        },
        {
          id: 433,
          title: "Humor / Entertainment",
        },
        {
          id: 434,
          title: "History",
        },
        {
          id: 435,
          title: "Literature",
        },
        {
          id: 436,
          title: "Marketing",
        },
        {
          id: 437,
          title: "Medical",
        },
        {
          id: 438,
          title: "Photography",
        },
        {
          id: 439,
          title: "Religious / Spiritual",
        },
        {
          id: 440,
          title: "Romance",
        },
        {
          id: 441,
          title: "Science Fiction",
        },
        {
          id: 442,
          title: "Self-Help / Wellness",
        },
        {
          id: 443,
          title: "Technology",
        },
        {
          id: 444,
          title: "Travel",
        },
        {
          id: 445,
          title: "Young Adult",
        },
      ],
      FileFormat: [
        {
          id: 446,
          title: "JPG",
        },
        {
          id: 447,
          title: "PDF",
        },
        {
          id: 448,
          title: "PNG",
        },
        {
          id: 449,
          title: "PSD",
        },
        {
          id: 450,
          title: "MOBI",
        },
        {
          id: 451,
          title: "EPUB",
        },
        {
          id: 452,
          title: "AI",
        },
      ],
    },
    AlbumCoverDesign: {
      DesignStyle: [
        {
          id: 453,
          title: "illustrative",
        },
        {
          id: 454,
          title: "photographic",
        },
        {
          id: 455,
          title: "typographic",
        },
        {
          id: 456,
          title: "3d_art",
        },
      ],
      MesicalGenre: [
        {
          id: 457,
          title: "Blues",
        },
        {
          id: 458,
          title: "Children’s Music",
        },
        {
          id: 459,
          title: "Classical",
        },
        {
          id: 460,
          title: "Country",
        },
        {
          id: 461,
          title: "Electronic",
        },
        {
          id: 462,
          title: "Folk",
        },
        {
          id: 463,
          title: "Hip-Hop",
        },
        {
          id: 464,
          title: "Holiday",
        },
        {
          id: 465,
          title: "Instrumental",
        },
        {
          id: 466,
          title: "Jazz",
        },
        {
          id: 467,
          title: "Latin",
        },
        {
          id: 468,
          title: "Metal",
        },
        {
          id: 469,
          title: "New Age",
        },
        {
          id: 470,
          title: "Opera",
        },
        {
          id: 471,
          title: "Pop",
        },
        {
          id: 472,
          title: "Punk",
        },
        {
          id: 473,
          title: "R&B",
        },
        {
          id: 474,
          title: "Rap",
        },
        {
          id: 475,
          title: "Reggae",
        },
        {
          id: 476,
          title: "Rock",
        },
        {
          id: 477,
          title: "Soul",
        },
        {
          id: 478,
          title: "World ",
        },
      ],
      AlbumType: [
        {
          id: 479,
          title: "Album",
        },
        {
          id: 480,
          title: "EP",
        },
        {
          id: 481,
          title: "Single",
        },
        {
          id: 482,
          title: "Mixtape",
        },
      ],
    },
    PackagingDesign: {
      ProductType: [
        {
          id: 483,
          title: "Product Label",
        },
        {
          id: 484,
          title: "Box",
        },
        {
          id: 485,
          title: "Bottle",
        },
        {
          id: 486,
          title: "Tube",
        },
        {
          id: 487,
          title: "Bag/Pouch",
        },
        {
          id: 488,
          title: "Can",
        },
      ],
      FileFormat: [
        {
          id: 489,
          title: "JPG",
        },
        {
          id: 490,
          title: "PNG",
        },
        {
          id: 491,
          title: "PDF",
        },
        {
          id: 492,
          title: "PSD",
        },
        {
          id: 493,
          title: "INDD",
        },
        {
          id: 494,
          title: "AI",
        },
      ],
    },
    ArFiltersLenses: {
      Platform: [
        {
          id: 495,
          title: "Instagram/Facebook",
        },
        {
          id: 496,
          title: "Snapchat",
        },
      ],
      FilterType: [
        {
          id: 497,
          title: "Appearance",
        },
        {
          id: 498,
          title: "Background & Environment",
        },
        {
          id: 499,
          title: "Camera Effects",
        },
        {
          id: 500,
          title: "Games",
        },
        {
          id: 501,
          title: "Virtual Objects",
        },
      ],
    },
    WebMobileDesign: {
      MainType: [
        {
          id: 502,
          title: "Websites",
        },
        {
          id: 503,
          title: "Landing Pages",
        },
        {
          id: 504,
          title: "Mobile Apps",
        },
        {
          id: 505,
          title: "Email Templates",
        },
      ],
      ImageFileFormat: [
        {
          id: 506,
          title: "AI",
        },
        {
          id: 507,
          title: "JPG",
        },
        {
          id: 508,
          title: "PDF",
        },
        {
          id: 509,
          title: "PNG",
        },
        {
          id: 510,
          title: "PSD",
        },
        {
          id: 511,
          title: "SVG",
        },
        {
          id: 512,
          title: "SWF",
        },
        {
          id: 513,
          title: "ICO",
        },
        {
          id: 514,
          title: "BMPR",
        },
      ],
    },
    SocialMediaDesign: {
      Platform: [
        {
          id: 515,
          title: "Instagram",
        },
        {
          id: 516,
          title: "Facebook",
        },
        {
          id: 517,
          title: "Twitter",
        },
        {
          id: 518,
          title: "LinkedIn",
        },
        {
          id: 519,
          title: "Snapchat",
        },
        {
          id: 520,
          title: "Pinterest",
        },
        {
          id: 521,
          title: "Website (Generic)",
        },
        {
          id: 522,
          title: "TikTok",
        },
      ],
      ImageFileFormat: [
        {
          id: 523,
          title: "AI",
        },
        {
          id: 524,
          title: "JPG",
        },
        {
          id: 525,
          title: "PDF",
        },
        {
          id: 526,
          title: "PNG",
        },
        {
          id: 527,
          title: "PSD",
        },
      ],
    },
    MenuDesign: {
      Pourpose: [
        {
          id: 528,
          title: "Not Defined",
        },
        {
          id: 529,
          title: "Restaurant",
        },
        {
          id: 530,
          title: "Bar",
        },
        {
          id: 531,
          title: "Spa & Beauty",
        },
        {
          id: 532,
          title: "Price List",
        },
        {
          id: 533,
          title: "Weddings & Events",
        },
      ],
      Style: [
        {
          id: 534,
          title: "Not Defined",
        },
        {
          id: 535,
          title: "Typographic",
        },
        {
          id: 536,
          title: "Illustrated & Hand-Drawn",
        },
        {
          id: 537,
          title: "Chalkboard",
        },
      ],
    },
    InvitationDesign: {
      MainType: [
        {
          id: 538,
          title: "Wedding",
        },
        {
          id: 539,
          title: "Party",
        },
        {
          id: 540,
          title: "Baby & Kids",
        },
        {
          id: 541,
          title: "Holiday",
        },
        {
          id: 542,
          title: "Entertaining",
        },
      ],
      ImageFileFormat: [
        {
          id: 543,
          title: "AI",
        },
        {
          id: 544,
          title: "JPG",
        },
        {
          id: 545,
          title: "PDF",
        },
        {
          id: 546,
          title: "PNG",
        },
        {
          id: 547,
          title: "PSD",
        },
      ],
    },
    PortraitsCaricatures: {
      IllustrationType: [
        {
          id: 548,
          title: "Not Defined",
        },
        {
          id: 549,
          title: "Portrait",
        },
        {
          id: 550,
          title: "Pet Portrait",
        },
        {
          id: 551,
          title: "Caricature",
        },
      ],
      IllustrationStyle: [
        {
          id: 552,
          title: "Not Defined",
        },
        {
          id: 553,
          title: "Freestyle Drawing",
        },
        {
          id: 554,
          title: "Realistic",
        },
        {
          id: 555,
          title: "Famous Cartoons",
        },
        {
          id: 556,
          title: "Watercolor",
        },
        {
          id: 557,
          title: "Pop art",
        },
        {
          id: 558,
          title: "Anime",
        },
        {
          id: 559,
          title: "Vector Art",
        },
      ],
    },
    CartoonsComics: {
      MainType: [
        {
          id: 560,
          title: "Not Defined",
        },
        {
          id: 561,
          title: "Cartoon",
        },
        {
          id: 562,
          title: "Comics",
        },
      ],
      IllustrationStyle: [
        {
          id: 563,
          title: "Not Defined",
        },
        {
          id: 564,
          title: "Anime",
        },
        {
          id: 565,
          title: "Pop Art",
        },
        {
          id: 566,
          title: "Freestyle Drawing",
        },
      ],
      ImageFileFormat: [
        {
          id: 567,
          title: "AI",
        },
        {
          id: 568,
          title: "JPG",
        },

        {
          id: 569,
          title: "PNG",
        },
        {
          id: 570,
          title: "PSD",
        },
      ],
    },
    WebBanners: {
      MainType: [
        {
          id: 571,
          title: "Not Defined",
        },
        {
          id: 572,
          title: "Static Banner",
        },
        {
          id: 573,
          title: "Animated Banner",
        },
      ],

      ImageFileFormat: [
        {
          id: 574,
          title: "GIF",
        },
        {
          id: 575,
          title: "JPG",
        },
        {
          id: 576,
          title: "PDF",
        },
        {
          id: 577,
          title: "PNG",
        },
        {
          id: 578,
          title: "PSD",
        },
        {
          id: 579,
          title: "SWF",
        },
      ],
    },
    PhotoshopEditing: {
      EditingType: [
        {
          id: 580,
          title: "Not Defined",
        },
        {
          id: 581,
          title: "Background Removal",
        },
        {
          id: 582,
          title: "Resizing",
        },
        {
          id: 583,
          title: "Restoration",
        },
        {
          id: 584,
          title: "Filters & Effects",
        },
        {
          id: 585,
          title: "Retouching & Enhancement",
        },
      ],

      FileFormat: [
        {
          id: 586,
          title: "JPEG",
        },
        {
          id: 587,
          title: "PDF",
        },
        {
          id: 588,
          title: "PNG",
        },
        {
          id: 589,
          title: "PSD",
        },
        {
          id: 590,
          title: "RAW",
        },
        {
          id: 591,
          title: "TIFF",
        },
      ],
    },
    ArchitectureInteriorDesign: {
      servicetype: [
        {
          id: 592,
          title: "2D DRAWINGS & FLOOR PLANS",
        },
        {
          id: 593,
          title: "3D MODELING & RENDERING",
        },
        {
          id: 594,
          title: "PLANNING & DESIGN",
        },
        {
          id: 595,
          title: "VIRTUAL STAGING",
        },
        {
          id: 596,
          title: "DIAGRAMS & MAPPING",
        },
      ],

      ProjectScale: [
        {
          id: 597,
          title: "object",
        },
        {
          id: 598,
          title: "room",
        },
        {
          id: 599,
          title: "apartment",
        },
        {
          id: 600,
          title: "building",
        },
        {
          id: 601,
          title: "building complex",
        },
        {
          id: 602,
          title: "neighborhood",
        },
        {
          id: 603,
          title: "city",
        },
      ],

      BuildingType: [
        {
          id: 604,
          title: "Residential ",
        },
        {
          id: 605,
          title: "Commercial",
        },
        {
          id: 606,
          title: "Office & Workspace",
        },
        {
          id: 607,
          title: "Hospitality",
        },
        {
          id: 608,
          title: "Industrial",
        },
        {
          id: 609,
          title: "Institutional & Public ",
        },
      ],

      ImagefileFormat: [
        {
          id: 610,
          title: "OBJ",
        },
        {
          id: 611,
          title: "3DS",
        },
        {
          id: 612,
          title: "JPG",
        },
        {
          id: 613,
          title: "SLDPRT",
        },
        {
          id: 614,
          title: "DWG",
        },
        {
          id: 615,
          title: "STL",
        },
        {
          id: 616,
          title: "MA",
        },
        {
          id: 617,
          title: "MB",
        },
        {
          id: 618,
          title: "SKP",
        },
        {
          id: 619,
          title: "DAE ",
        },
        {
          id: 620,
          title: "BLEND",
        },
        {
          id: 621,
          title: "PDF",
        },
        {
          id: 622,
          title: "RVT",
        },
      ],
    },
    LandscapeDesign: {
      servicetype: [
        {
          id: 623,
          title: "GRAPHICS & DESIGN",
        },
        {
          id: 624,
          title: "DIGITAL MARKETING",
        },
        {
          id: 625,
          title: "WRITING & TRANSLATION",
        },
        {
          id: 626,
          title: "VIDEO & ANIMATION",
        },
        {
          id: 627,
          title: "MUSIC & AUDIO",
        },
        {
          id: 628,
          title: "PROGRAMMING & TECH",
        },
        {
          id: 629,
          title: "DATA",
        },
        {
          id: 630,
          title: "BUSINESS",
        },
        {
          id: 631,
          title: "LIFESTYLE",
        },
      ],

      Software: [
        {
          id: 632,
          title: "Autodesk AutoCAD",
        },
        {
          id: 633,
          title: "Autocad Civil 3D",
        },
        {
          id: 634,
          title: "Vectorworks",
        },
        {
          id: 635,
          title: "ArchiCAD",
        },
        {
          id: 636,
          title: "Autodesk Civil 3D",
        },
        {
          id: 637,
          title: "SketchUp",
        },
        {
          id: 638,
          title: "Autodesk Revit",
        },
        {
          id: 639,
          title: "MicroStation",
        },
        {
          id: 640,
          title: "Rhinoceros 3D",
        },
        {
          id: 641,
          title: "Grasshopper",
        },
        {
          id: 642,
          title: "V-Ray",
        },
        {
          id: 643,
          title: "Skatter",
        },
        {
          id: 644,
          title: "Lumion",
        },
        {
          id: 645,
          title: "Blender",
        },
        {
          id: 646,
          title: "Corona",
        },
        {
          id: 647,
          title: "Adobe Photoshop",
        },
        {
          id: 648,
          title: "Adobe Illustrator",
        },
      ],

      FileFormat: [
        {
          id: 649,
          title: "DWG",
        },
        {
          id: 650,
          title: "SKP",
        },
        {
          id: 651,
          title: "3DS",
        },
        {
          id: 652,
          title: "OBJ",
        },
        {
          id: 653,
          title: "MAX",
        },
        {
          id: 654,
          title: "RVT",
        },
        {
          id: 655,
          title: "FBX",
        },
        {
          id: 656,
          title: "BLEND",
        },
        {
          id: 657,
          title: "JPG",
        },
        {
          id: 658,
          title: "TIFF",
        },
        {
          id: 659,
          title: "EXR",
        },
        {
          id: 660,
          title: "PDF",
        },
        {
          id: 661,
          title: "PSD",
        },
      ],
    },
    CharacterModeling: {
      Purpose: [
        {
          id: 662,
          title: "Not Defined",
        },
        {
          id: 663,
          title: "Game",
        },
        {
          id: 664,
          title: "Film",
        },
        {
          id: 665,
          title: "3D Printing",
        },
      ],

      Style: [
        {
          id: 666,
          title: "3D Printing",
        },
        {
          id: 667,
          title: "Abstract",
        },
        {
          id: 668,
          title: "Anime",
        },
        {
          id: 669,
          title: "Cartoon",
        },
        {
          id: 670,
          title: "Low Poly",
        },
        {
          id: 671,
          title: "Minimalist",
        },
        {
          id: 672,
          title: "Pixel",
        },
        {
          id: 673,
          title: "Realistic",
        },
      ],

      FileFormat: [
        {
          id: 674,
          title: "FBX",
        },
        {
          id: 675,
          title: "OBJ",
        },
        {
          id: 676,
          title: "3DS",
        },
        {
          id: 677,
          title: "MA/MB",
        },
        {
          id: 678,
          title: "MAX",
        },
        {
          id: 679,
          title: "C4D",
        },
        {
          id: 680,
          title: "BLEND",
        },
        {
          id: 681,
          title: "STL",
        },
        {
          id: 682,
          title: "DAE",
        },
        {
          id: 683,
          title: "VRML/X3D",
        },
      ],
    },
    IndustrialproductDesign: {
      Servicetype: [
        {
          id: 684,
          title: "CONCEPT DEVELOPMENT ",
        },
        {
          id: 685,
          title: "2D DRAWING",
        },
        {
          id: 686,
          title: "3D MODELING & RENDERING",
        },
        {
          id: 687,
          title: "PROTOTYPING & 3D PRINTING",
        },
        {
          id: 688,
          title: "PRODUCT MANUFACTURING",
        },
      ],

      FieldOfexpetise: [
        {
          id: 689,
          title: "Appliances",
        },
        {
          id: 690,
          title: "Automotive",
        },
        {
          id: 691,
          title: "Consumer Electronics",
        },
        {
          id: 692,
          title: "Footware",
        },
        {
          id: 693,
          title: "Furniture",
        },
        {
          id: 694,
          title: "IoT",
        },
        {
          id: 695,
          title: "Jewelry",
        },
        {
          id: 696,
          title: "Lighting",
        },
        {
          id: 697,
          title: "Machinery",
        },
        {
          id: 698,
          title: "Sustainable Products",
        },
        {
          id: 699,
          title: "Toys",
        },
        {
          id: 700,
          title: "Wearables",
        },
      ],

      DesignSoftware: [
        {
          id: 701,
          title: "3DS MAX",
        },
        {
          id: 702,
          title: "Adobe CC",
        },
        {
          id: 703,
          title: "ArtiosCAD",
        },
        {
          id: 704,
          title: "AutoCAD",
        },
        {
          id: 705,
          title: "Blender",
        },
        {
          id: 706,
          title: "CAPE",
        },
        {
          id: 707,
          title: "Catia",
        },
        {
          id: 708,
          title: "Corel",
        },
        {
          id: 709,
          title: "Creo",
        },
        {
          id: 710,
          title: "Esko Suite",
        },
        {
          id: 711,
          title: "Fusion 360",
        },
        {
          id: 712,
          title: "Inventor",
        },
        {
          id: 713,
          title: "KeyShot",
        },
        {
          id: 714,
          title: "MeshLab",
        },
        {
          id: 715,
          title: "Maya",
        },
        {
          id: 716,
          title: "Rhinoceros",
        },
        {
          id: 717,
          title: "SketchUp",
        },
        {
          id: 718,
          title: "Solidworks",
        },
        {
          id: 719,
          title: "Studio",
        },
      ],

      FileFormat: [
        {
          id: 720,
          title: "JPG",
        },
        {
          id: 721,
          title: "3MF",
        },
        {
          id: 722,
          title: "PDF",
        },
        {
          id: 723,
          title: "Collada",
        },
        {
          id: 724,
          title: "DWG",
        },
        {
          id: 725,
          title: "FBX",
        },
        {
          id: 726,
          title: "STL",
        },
        {
          id: 727,
          title: "SLDPRT",
        },
        {
          id: 728,
          title: "SLDDRW ",
        },
        ,
        {
          id: 729,
          title: "SLDASM",
        },
        {
          id: 730,
          title: "STEP",
        },
        {
          id: 731,
          title: "VRML",
        },
        {
          id: 732,
          title: "X3D",
        },
        {
          id: 733,
          title: "OBJ",
        },
        {
          id: 734,
          title: "SKP",
        },
        {
          id: 735,
          title: "3DS",
        },
        {
          id: 736,
          title: "AMF",
        },
        {
          id: 737,
          title: "BLEND",
        },
        {
          id: 738,
          title: "3DM",
        },
      ],
    },
    TradeBoothTrade: {
      BoothType: [
        {
          id: 739,
          title: "Modular systems booth",
        },
        {
          id: 740,
          title: "Custom Made Booth",
        },
      ],
      BoothLayout: [
        {
          id: 741,
          title: "Inline (one side exposed)",
        },
        {
          id: 742,
          title: "Peninsula (three sides exposed)",
        },
        {
          id: 743,
          title: "Island (four sides exposed",
        },
      ],

      Industry: [
        {
          id: 744,
          title: "Agriculture",
        },
        {
          id: 745,
          title: "Animals & Pets",
        },
        {
          id: 746,
          title: "Architecture & Interior Design",
        },
        {
          id: 747,
          title: "Art & Design",
        },
        {
          id: 748,
          title: "Audio Services",
        },
        {
          id: 749,
          title: "Beauty & Cosmetics",
        },
        {
          id: 750,
          title: "Biotech",
        },
        {
          id: 751,
          title: "Business Services & Consulting",
        },
        {
          id: 752,
          title: "Construction",
        },
        {
          id: 753,
          title: "Crypto & Blockchain",
        },
        {
          id: 754,
          title: "Cyber Security",
        },
        {
          id: 755,
          title: "Data Analytics",
        },
        {
          id: 756,
          title: "E-Commerce",
        },
        {
          id: 757,
          title: "Education",
        },
        {
          id: 758,
          title: "Energy",
        },
        {
          id: 759,
          title: "Engineering",
        },
        {
          id: 760,
          title: "Environmental",
        },
        {
          id: 761,
          title: "Events Planning",
        },
        {
          id: 762,
          title: "Fashion & Apparel",
        },
        {
          id: 763,
          title: "Financial Services",
        },
        {
          id: 764,
          title: "Food & Beverage",
        },
        {
          id: 765,
          title: "Gaming",
        },
        {
          id: 766,
          title: "Government & Public Sector",
        },
        {
          id: 767,
          title: "Hardware & Electronics",
        },
        {
          id: 768,
          title: "Legal",
        },
        {
          id: 769,
          title: "Lifestyle",
        },
        {
          id: 770,
          title: "Manufacturing & Storage",
        },
        {
          id: 771,
          title: "Marketing & Advertising",
        },
        {
          id: 772,
          title: "Media & Entertainment",
        },
        {
          id: 773,
          title: "Medical & Pharmaceutical",
        },
        {
          id: 774,
          title: "Music",
        },
        {
          id: 775,
          title: "Non Profit",
        },
        {
          id: 776,
          title: "Photography",
        },
        {
          id: 777,
          title: "Real Estate",
        },
        {
          id: 778,
          title: "Religion & Spirituality",
        },
        {
          id: 779,
          title: "Retail & Wholesale",
        },
        {
          id: 780,
          title: "Software",
        },
        {
          id: 781,
          title: "Sports & Fitness",
        },
        {
          id: 782,
          title: "Telecommunications",
        },
        {
          id: 783,
          title: "Transportation & Automotive",
        },
        {
          id: 784,
          title: "Travel & Tourism",
        },
        {
          id: 785,
          title: "Video Services",
        },
        {
          id: 786,
          title: "Wellness",
        },
        {
          id: 787,
          title: "Writing & Publishing",
        },
      ],
    },
    FashionDesign: {
      ServiceType: [
        {
          id: 788,
          title: "TECHNICAL DRAWING & TECH PACK",
        },
        {
          id: 789,
          title: "PATTERN MAKING",
        },
        {
          id: 790,
          title: "FASHION ILLUSTRATION",
        },
        {
          id: 791,
          title: "3D GARMENT DESIGN",
        },
        {
          id: 792,
          title: "FULL DESIGN PROCESS",
        },
      ],
      ItemType: [
        {
          id: 793,
          title: "Clothing",
        },
        {
          id: 794,
          title: "Shoes",
        },
        {
          id: 795,
          title: "Bags",
        },
        {
          id: 796,
          title: "Accessories",
        },
      ],

      GenderAndGroup: [
        {
          id: 797,
          title: "Men",
        },
        {
          id: 798,
          title: "Women",
        },
        {
          id: 799,
          title: "Kids",
        },
        {
          id: 800,
          title: "Babies",
        },
        {
          id: 801,
          title: "Pets",
        },
        {
          id: 802,
          title: "Unisex",
        },
        {
          id: 803,
          title: "SOFTWARE",
        },
        {
          id: 804,
          title: "Gerber",
        },
        {
          id: 805,
          title: "Lectra",
        },
        {
          id: 806,
          title: "Optitex",
        },
        {
          id: 807,
          title: "Autocad",
        },
        {
          id: 808,
          title: "Gemini CAD",
        },
        {
          id: 809,
          title: "CLO 3D",
        },
        {
          id: 810,
          title: "Browzwear / VStitcher",
        },
        {
          id: 811,
          title: "Marvelous Designer",
        },
      ],

      IllustrationPurpose: [
        {
          id: 812,
          title: "Pre-production",
        },
        {
          id: 813,
          title: "Pre-production",
        },
        {
          id: 814,
          title: "Advertising",
        },
        {
          id: 815,
          title: "Editorial",
        },
        {
          id: 816,
          title: "Wholesale & Retail",
        },
        {
          id: 817,
          title: "Virtual Clothing",
        },
        {
          id: 818,
          title: "Gaming",
        },
      ],

      DesignExpertise: [
        {
          id: 819,
          title: "Bridal Wear",
        },
        {
          id: 820,
          title: "Evening Wear",
        },
        {
          id: 821,
          title: "Sportswear",
        },
        {
          id: 822,
          title: "Activewear",
        },
        {
          id: 823,
          title: "Swimwear",
        },
        {
          id: 824,
          title: "Underwear",
        },
        {
          id: 825,
          title: "Sweatsuits",
        },
        {
          id: 826,
          title: "Streetwear",
        },
        {
          id: 827,
          title: "Outerwear",
        },
        {
          id: 828,
          title: "Uniforms",
        },
        {
          id: 829,
          title: "Knitwear",
        },
        {
          id: 830,
          title: "Nightwear",
        },
        {
          id: 831,
          title: "Costumes",
        },
      ],

      TailoringMethod: [
        {
          id: 832,
          title: "Made-to-Measure",
        },
        {
          id: 833,
          title: "Mass Production",
        },
      ],

      FileFormat: [
        {
          id: 834,
          title: "AI",
        },
        {
          id: 835,
          title: "PDF",
        },
        {
          id: 836,
          title: "DXF",
        },
        {
          id: 837,
          title: "JPEG",
        },
        {
          id: 838,
          title: "PNG",
        },
        {
          id: 839,
          title: "MDL",
        },
        {
          id: 840,
          title: "PLT",
        },
        {
          id: 841,
          title: "TMP",
        },
        {
          id: 842,
          title: "PSD",
        },
        {
          id: 843,
          title: "HPGL",
        },
        {
          id: 844,
          title: "ASTM",
        },
        {
          id: 845,
          title: "AAMA",
        },
        {
          id: 846,
          title: "EPS",
        },
        {
          id: 847,
          title: "OBJ",
        },
        {
          id: 848,
          title: "DAE",
        },
        {
          id: 849,
          title: "FBX",
        },
      ],
    },
    JewelryDesign: {
      ServiceType: [
        {
          id: 850,
          title: "3D MODELING & RENDERING ",
        },
        {
          id: 851,
          title: "CONCEPT DESIGN & SKETCHING",
        },
      ],
      Software: [
        {
          id: 852,
          title: "Gemvision Matrix",
        },
        {
          id: 853,
          title: "Rhinoceros",
        },
        {
          id: 854,
          title: "Autodesk 3ds Max",
        },
        {
          id: 855,
          title: "Solidworks",
        },
        {
          id: 856,
          title: "3Design",
        },
        {
          id: 857,
          title: "ZBrush",
        },
        {
          id: 858,
          title: "Jewelry CAD Dream",
        },
        {
          id: 859,
          title: "V-Ray",
        },
        {
          id: 860,
          title: "Blender",
        },
        {
          id: 861,
          title: "KeyShot",
        },
        {
          id: 862,
          title: "Materialise Magics",
        },
        {
          id: 863,
          title: "Tinkercad",
        },
        {
          id: 864,
          title: "SketchUp",
        },
        {
          id: 865,
          title: "AutoCAD",
        },
        {
          id: 866,
          title: "Fusion 360",
        },
      ],

      JewelryType: [
        {
          id: 867,
          title: "Ring",
        },
        {
          id: 868,
          title: "Bracelet",
        },
        {
          id: 869,
          title: "Necklace",
        },
        {
          id: 870,
          title: "Pendant",
        },
        {
          id: 871,
          title: "Earrings",
        },
        {
          id: 872,
          title: "Nose Ring",
        },
        {
          id: 873,
          title: "Brooch/Hairpin",
        },
        {
          id: 874,
          title: "Cufflinks",
        },
      ],
    },
    ResentationDesign: {
      ServiceType: [
        {
          id: 875,
          title: "Full Presentation Design",
        },
        {
          id: 876,
          title: "Custom Template Design",
        },
        {
          id: 877,
          title: "Minor Design Touchups",
        },
      ],
      Purpose: [
        {
          id: 878,
          title: "Investor Pitch/Fundraising ",
        },
        {
          id: 879,
          title: "Marketing",
        },
        {
          id: 880,
          title: "Sales",
        },
        {
          id: 881,
          title: "Conferences",
        },
        {
          id: 882,
          title: "Business Proposal",
        },
        {
          id: 883,
          title: "Education/Training",
        },
        {
          id: 884,
          title: "Research",
        },
        {
          id: 885,
          title: "Analysis",
        },
      ],

      PresentationSoftware: [
        {
          id: 886,
          title: "Power Point",
        },
        {
          id: 887,
          title: "Google Slides",
        },
        {
          id: 888,
          title: "Prezi",
        },
        {
          id: 889,
          title: "Keynote",
        },
        {
          id: 890,
          title: "Canva",
        },
      ],

      Industry: [
        {
          id: 891,
          title: "Agriculture",
        },
        {
          id: 892,
          title: "Animals & Pets",
        },
        {
          id: 893,
          title: "Architecture & Interior Design",
        },
        {
          id: 894,
          title: "Art & Design",
        },
        {
          id: 895,
          title: "Audio Services",
        },
        {
          id: 896,
          title: "Beauty & Cosmetics",
        },
        {
          id: 897,
          title: "Biotech",
        },
        {
          id: 898,
          title: "Business Services & Consulting",
        },
        {
          id: 899,
          title: "Construction",
        },
        {
          id: 900,
          title: "Crypto & Blockchain",
        },
        {
          id: 901,
          title: "Cyber Security",
        },
        {
          id: 902,
          title: "Data Analytics",
        },
        {
          id: 903,
          title: "E-Commerce",
        },
        {
          id: 904,
          title: "Education",
        },
        {
          id: 905,
          title: "Energy",
        },
        {
          id: 906,
          title: "Engineering",
        },
        {
          id: 907,
          title: "Environmental",
        },
        {
          id: 908,
          title: "Events Planning",
        },
        {
          id: 909,
          title: "Fashion & Apparel",
        },
        {
          id: 910,
          title: "Financial Services",
        },
        {
          id: 911,
          title: "Biotech",
        },
        {
          id: 912,
          title: "Food & Beverage",
        },
        {
          id: 913,
          title: "Gaming",
        },
        {
          id: 914,
          title: "Government & Public Sector",
        },
        {
          id: 915,
          title: "Hardware & Electronics ",
        },
        {
          id: 916,
          title: "Legal",
        },
        {
          id: 917,
          title: "Lifestyle",
        },
        {
          id: 918,
          title: "Manufacturing & Storage",
        },
        {
          id: 919,
          title: "Marketing & Advertising",
        },
        {
          id: 920,
          title: "Media & Entertainment",
        },
        {
          id: 921,
          title: "Medical & Pharmaceutical ",
        },
        {
          id: 922,
          title: "Music",
        },
        {
          id: 923,
          title: "Non Profit",
        },
        {
          id: 924,
          title: "Photography",
        },
        {
          id: 925,
          title: "Real Estate",
        },
        {
          id: 926,
          title: "Religion & Spirituality",
        },
        {
          id: 927,
          title: "Retail & Wholesale",
        },
        {
          id: 928,
          title: "Software",
        },
        {
          id: 929,
          title: "Sports & Fitness",
        },
        {
          id: 930,
          title: "Telecommunications",
        },
        {
          id: 931,
          title: "Transportation & Automotive",
        },
        {
          id: 932,
          title: "Travel & Tourism",
        },
        {
          id: 933,
          title: "Video Services",
        },
        {
          id: 934,
          title: "Wellness",
        },
        {
          id: 935,
          title: "Writing & Publishing",
        },
      ],

      ImageFileformat: [
        {
          id: 936,
          title: "AI ",
        },
        {
          id: 937,
          title: "JPG",
        },
        {
          id: 938,
          title: "PDF",
        },
        {
          id: 939,
          title: "PNG",
        },
        {
          id: 940,
          title: "PSD",
        },
        {
          id: 941,
          title: "PPT",
        },
        {
          id: 942,
          title: "KEY",
        },
        {
          id: 943,
          title: "PPTX",
        },
        {
          id: 944,
          title: "MP4",
        },
        {
          id: 945,
          title: "Prezi ",
        },
      ],
    },
    CarWraps: {
      VehicleType: [
        {
          id: 946,
          title: "Not Defined ",
        },
        {
          id: 947,
          title: "Car or Van",
        },
        {
          id: 948,
          title: "Truck",
        },
        {
          id: 949,
          title: "Motorcycle",
        },
        {
          id: 950,
          title: "Bicycle",
        },
      ],

      Fileformat: [
        {
          id: 951,
          title: "AI ",
        },
        {
          id: 952,
          title: "JPG",
        },
        {
          id: 953,
          title: "PDF",
        },
        {
          id: 954,
          title: "PNG",
        },
        {
          id: 955,
          title: "PSD",
        },
      ],
    },
    TattooDesign: {
      TattooStyle: [
        {
          id: 956,
          title: "traditional old school",
        },
        {
          id: 957,
          title: "realism",
        },
        {
          id: 958,
          title: "watercolor",
        },
        {
          id: 959,
          title: "japanese",
        },
        {
          id: 960,
          title: "linework",
        },
        {
          id: 961,
          title: "dotwork",
        },
        {
          id: 962,
          title: "calligraphy",
        },
        {
          id: 963,
          title: "minimalist",
        },
        {
          id: 964,
          title: "neo traditional",
        },
        {
          id: 965,
          title: "new school",
        },
        {
          id: 966,
          title: "tribal",
        },
      ],

      ColorType: [
        {
          id: 967,
          title: "any colo",
        },
        {
          id: 968,
          title: "black",
        },
        {
          id: 969,
          title: "white",
        },
      ],
    },

    BrandStyleGuide: [
      {
        id: 970,
        title: "Not Defined",
      },
      {
        id: 971,
        title: "Vintage/Retro",
      },
      {
        id: 972,
        title: "Hand-Drawn",
      },
      {
        id: 973,
        title: "Mascot/Cartoon",
      },
      {
        id: 974,
        title: "Flat/Minimalist",
      },
      {
        id: 975,
        title: "Watercolor/Feminine",
      },
      {
        id: 976,
        title: "Signature",
      },
    ],
    FormatType: [
      {
        id: 977,
        title: "Not Defined",
      },
      {
        id: 978,
        title: "Catalog",
      },
      {
        id: 979,
        title: "Sell Sheet",
      },
      {
        id: 980,
        title: "Magazine",
      },
    ],
    GameCategory: [
      {
        id: 981,
        title: "Not Defined",
      },
      {
        id: 982,
        title: "2D",
      },
      {
        id: 983,
        title: "3D",
      },
      {
        id: 984,
        title: "Abstract",
      },
      {
        id: 985,
        title: "Anime",
      },
      {
        id: 986,
        title: "Cartoon",
      },
      {
        id: 987,
        title: "Low Poly",
      },
      {
        id: 988,
        title: "Minimalist",
      },
      {
        id: 989,
        title: "Pixel",
      },
      {
        id: 990,
        title: "Realistic",
      },
    ],
    Infographic: [
      {
        id: 991,
        title: "Al",
      },
      {
        id: 992,
        title: "JPG",
      },
      {
        id: 993,
        title: "PDF",
      },
      {
        id: 994,
        title: "PNG",
      },
      {
        id: 995,
        title: "PSD",
      },
      {
        id: 996,
        title: "PPT",
      },
      {
        id: 997,
        title: "KEY",
      },
    ],
    LogoDesign: [
      {
        id: 998,
        title: "3D",
      },
      {
        id: 999,
        title: "Versatile",
      },
      {
        id: 1000,
        title: "Vintage/Retro",
      },
      {
        id: 1001,
        title: "Hand-Drawn",
      },
      {
        id: 1002,
        title: "Mascot/Cartoon",
      },
      {
        id: 1003,
        title: "Flat/Minimalist",
      },
      {
        id: 1004,
        title: "Watercolor/Feminine",
      },
      {
        id: 1005,
        title: "Signature",
      },
      {
        id: 1006,
        title: "Lettering",
      },
      {
        id: 1007,
        title: "Geometric",
      },
    ],
    PodcastDesign: [
      {
        id: 1008,
        title: "Illustrative",
      },
      {
        id: 1009,
        title: "photographic",
      },
      {
        id: 1010,
        title: "typographic",
      },
    ],
    PostcardDesign: [
      {
        id: 1011,
        title: "Not Defined",
      },
      {
        id: 1012,
        title: "Promotional",
      },
      {
        id: 1013,
        title: "Invitation Card",
      },
      {
        id: 1014,
        title: "Holiday",
      },
      {
        id: 1015,
        title: "Gift Voucher",
      },
      {
        id: 1016,
        title: "Loyalty Card",
      },
      {
        id: 1017,
        title: "Real estate",
      },
      {
        id: 1018,
        title: "Personal",
      },
      {
        id: 1019,
        title: "Recipe Card",
      },
    ],
    SignageDesign: [
      {
        id: 1020,
        title: "Yards",
      },
      {
        id: 1021,
        title: "Billboards",
      },
      {
        id: 1022,
        title: "Banners",
      },
      {
        id: 1023,
        title: "Roll Ups",
      },
    ],
    StoryBoards: [
      {
        id: 1024,
        title: "Not Defined",
      },
      {
        id: 1025,
        title: "Video Games",
      },
      {
        id: 1026,
        title: "Live Action Videos",
      },
      {
        id: 1027,
        title: "Animation",
      },
      {
        id: 1028,
        title: "Books",
      },
      {
        id: 1029,
        title: "Presentations",
      },
    ],
    Tshirt: [
      {
        id: 1030,
        title: "T-shirts",
      },
      {
        id: 1031,
        title: "Totes & Bags",
      },
      {
        id: 1032,
        title: "Mugs",
      },
      {
        id: 1033,
        title: "Stickers",
      },
      {
        id: 1034,
        title: "Hats",
      },
      {
        id: 1035,
        title: "Socks",
      },
      {
        id: 1036,
        title: "Clothing & Apparel",
      },
      {
        id: 1037,
        title: "Pillows",
      },
      {
        id: 1038,
        title: "Phone Cases",
      },
      {
        id: 1039,
        title: "Pens",
      },
      {
        id: 1040,
        title: "Accessories",
      },
      {
        id: 1041,
        title: "Face Masks",
      },
    ],
    CatalogDesign: [
      {
        id: uuid.v4(),
        title: "Catalog",
      },
      {
        id: uuid.v4(),
        title: "Magazine",
      },
      {
        id: uuid.v4(),
        title: "Not Defined",
      },
      {
        id: uuid.v4(),
        title: "Sell Sheet",
      },
    ],
  },
  DigitalMarketing: {
    SocialMediaMarketing: {
      ServiceType: [
        {
          id: 1042,
          title: "Consultation & Audience Research",
        },
        {
          id: 1043,
          title: "Profile Setup & Integration",
        },
        {
          id: 1044,
          title: "Social Content",
        },
        {
          id: 1045,
          title: "Social Media Management",
        },
        {
          id: 1046,
          title: "Analytics & Tracking",
        },
      ],
      PlatformType: [
        {
          id: 1047,
          title: "Facebook",
        },
        {
          id: 1048,
          title: "Instagram",
        },
        {
          id: 1049,
          title: "Linkedin",
        },
        {
          id: 1050,
          title: "Pinterest",
        },
        {
          id: 1051,
          title: "Snapchat",
        },
        {
          id: 1052,
          title: "Twitter",
        },
        {
          id: 1053,
          title: "Youtube",
        },
        {
          id: 1054,
          title: "Product Hunt",
        },
        {
          id: 1055,
          title: "Tiktok",
        },
        {
          id: 1056,
          title: "Discord",
        },
        {
          id: 1057,
          title: "Reddit",
        },
        {
          id: 1058,
          title: "Clubhouse",
        },
      ],
      ContentType: [
        {
          id: 1059,
          title: "Text",
        },
        {
          id: 1060,
          title: "Image",
        },
        {
          id: 1061,
          title: "Video",
        },
        {
          id: 1062,
          title: "Gif",
        },
      ],
      ManagementTools: [
        {
          id: 1063,
          title: "Hootsuite",
        },
        {
          id: 1064,
          title: "Buffer",
        },
        {
          id: 1065,
          title: "Social Pilot",
        },
        {
          id: 1066,
          title: "Hubspot",
        },
        {
          id: 1067,
          title: "Zoho Social",
        },
        {
          id: 1068,
          title: "Meetedgar",
        },
        {
          id: 1069,
          title: "Sprout Social",
        },
        {
          id: 1070,
          title: "Agora Pulse",
        },
        {
          id: 1071,
          title: "Falcon.Io",
        },
        {
          id: 1072,
          title: "Coschedule",
        },
        {
          id: 1073,
          title: "Eclincher",
        },
        {
          id: 1074,
          title: "Oktopost",
        },
      ],
    },
    PodcastMarketing: {
      ServiceType: [
        {
          id: 1075,
          title: "Podcast Promotion",
        },
        {
          id: 1076,
          title: "Advertising Within Podcasts",
        },
      ],
      PodcastCategory: [
        {
          id: 1077,
          title: "Arts And Entertainment",
        },
        {
          id: 1078,
          title: "Business And Technology",
        },
        {
          id: 1079,
          title: "Comedy",
        },
        {
          id: 1080,
          title: "Educational",
        },
        {
          id: 1081,
          title: "Games",
        },
        {
          id: 1082,
          title: "Kids And Family",
        },
        {
          id: 1083,
          title: "Life Style And Health",
        },
        {
          id: 1084,
          title: "Music",
        },
        {
          id: 1085,
          title: "New And Politics",
        },
        {
          id: 1086,
          title: "Society And Culture",
        },
        {
          id: 1087,
          title: "Sports And Recreation",
        },
        {
          id: 1088,
          title: "Stories",
        },
      ],
      PodcastAggregator: [
        {
          id: 1089,
          title: "Bello Collective",
        },
        {
          id: 1090,
          title: "Castro",
        },
        {
          id: 1091,
          title: "Downcast",
        },
        {
          id: 1092,
          title: "Google Play",
        },
        {
          id: 1093,
          title: "Itunes",
        },
        {
          id: 1094,
          title: "Overcast",
        },
        {
          id: 1095,
          title: "Podcast Republic",
        },
        {
          id: 1096,
          title: "Podcastland",
        },
        {
          id: 1097,
          title: "Podcast Addict",
        },
        {
          id: 1098,
          title: "Podcast Subreddit",
        },
        {
          id: 1099,
          title: "Tuneln",
        },
        {
          id: 1100,
          title: "Spotify",
        },
        {
          id: 1101,
          title: "Stitcher",
        },
      ],
    },
    SOCIALMEDIAADVERTISING: {
      ServiceType: [
        {
          id: 1102,
          title: "Strategy & Planning",
        },
        {
          id: 1103,
          title: "Tire Fitting",
        },
        {
          id: 1104,
          title: "Ads Setup & Management ",
        },
        {
          id: 1105,
          title: "Analytics & Tracking ",
        },
      ],
      PlatformType: [
        {
          id: 1106,
          title: "Facebook",
        },
        {
          id: 1107,
          title: "Instagram",
        },
        {
          id: 1108,
          title: "Linkedin",
        },
        {
          id: 1109,
          title: "Pinterest",
        },
        {
          id: 1110,
          title: "Snapchat",
        },
        {
          id: 1111,
          title: "Twitter",
        },
        {
          id: 1112,
          title: "Youtube",
        },
        {
          id: 1113,
          title: "Product Hunt",
        },
        {
          id: 1114,
          title: "Tiktok",
        },
        {
          id: 1115,
          title: "Discord",
        },
        {
          id: 1116,
          title: "Reddit",
        },
        {
          id: 1117,
          title: "Clubhouse",
        },
        {
          id: 1118,
          title: "Industry",
        },
        {
          id: 1119,
          title: "Arts",
        },
        {
          id: 1120,
          title: "Business",
        },
        {
          id: 1121,
          title: "Crypto Blockchain",
        },
        {
          id: 1122,
          title: "Cyber Security",
        },
        {
          id: 1123,
          title: "E Commerce",
        },
        {
          id: 1124,
          title: "Education",
        },
        {
          id: 1125,
          title: "Environmental",
        },
        {
          id: 1126,
          title: "Gaming",
        },
        {
          id: 1127,
          title: "Financial Services Banking ",
        },
        {
          id: 1128,
          title: "Government Public Sector",
        },
        {
          id: 1129,
          title: "Health Wellness",
        },
        {
          id: 1130,
          title: "Insurance",
        },
        {
          id: 1131,
          title: "Kids And Family",
        },
        {
          id: 1132,
          title: "Legal",
        },
        {
          id: 1133,
          title: "Media Entertainment",
        },
        {
          id: 1134,
          title: "Non Profit",
        },
        {
          id: 1135,
          title: "News",
        },
        {
          id: 1136,
          title: "Music",
        },
        {
          id: 1137,
          title: "Medical Pharmaceutical",
        },
        {
          id: 1138,
          title: "Real Estate",
        },
        {
          id: 1139,
          title: "Retail Wholesale ",
        },
        {
          id: 1140,
          title: "Retail & Wholesale",
        },
        {
          id: 1141,
          title: "Society And Culture",
        },
        {
          id: 1142,
          title: "Sports And Recreation",
        },
        {
          id: 1143,
          title: "Technology Internet",
        },
        {
          id: 1144,
          title: "Transportation Automotive",
        },
      ],
    },
    Seo: {
      ServiceType: [
        {
          id: 1145,
          title: "Keyword Research",
        },
        {
          id: 1146,
          title: "On-Page Seo ",
        },
        {
          id: 1147,
          title: "Technical Seo ",
        },
        {
          id: 1148,
          title: "Off-Page Seo ",
        },
        {
          id: 1149,
          title: "Competitor Analysis ",
        },
        {
          id: 1150,
          title: "Voice Search Seo ",
        },
      ],
      IndustryExpertise: [
        {
          id: 1151,
          title: "Arts ",
        },
        {
          id: 1152,
          title: "Business ",
        },
        {
          id: 1153,
          title: "Crypto & Blockchain ",
        },
        {
          id: 1154,
          title: "Cyber Security ",
        },
        {
          id: 1155,
          title: "E-Commerce ",
        },
        {
          id: 1156,
          title: "Education ",
        },
        {
          id: 1157,
          title: "Financial Services/ Banking ",
        },
        {
          id: 1158,
          title: "Games ",
        },
        {
          id: 1159,
          title: "Government& Public Sector ",
        },
        {
          id: 1160,
          title: "Health & Wellness ",
        },
        {
          id: 1161,
          title: "Insurance",
        },
        {
          id: 1162,
          title: "Kids And Family ",
        },
        {
          id: 1163,
          title: "Legal",
        },
        {
          id: 1164,
          title: "Media & Entertainment ",
        },
        {
          id: 1165,
          title: "Medical & Pharmaceutical ",
        },
        {
          id: 1166,
          title: "Music ",
        },
        {
          id: 1167,
          title: "News ",
        },
        {
          id: 1168,
          title: "Non-Profit ",
        },
        {
          id: 1169,
          title: "Real Estate ",
        },
        {
          id: 1170,
          title: "Retail & Wholesale ",
        },
        {
          id: 1171,
          title: "Society And Culture ",
        },
        {
          id: 1172,
          title: "Sports And Recreation ",
        },
        {
          id: 1173,
          title: "Technology & Internet ",
        },
        {
          id: 1174,
          title: "Transportation & Automotive",
        },
      ],
    },
    EmailMarketing: {
      ServiceType: [
        {
          id: 1175,
          title: "EMAIL PLATFORM SUPPORT",
        },
        {
          id: 1176,
          title: "AUDIENCE DEVELOPMENT",
        },
        {
          id: 1177,
          title: "CAMPAIGN MANAGEMENT",
        },
        {
          id: 1178,
          title: "EMAIL AUTOMATIONS",
        },
        {
          id: 1179,
          title: "COLD EMAILS",
        },
      ],

      EmailPlatform: [
        {
          id: 1180,
          title: "MailChimp",
        },
        {
          id: 1181,
          title: "iContact",
        },
        {
          id: 1182,
          title: "GetResponse",
        },
        {
          id: 1183,
          title: "Constant Contact",
        },
        {
          id: 1184,
          title: "Campaigner",
        },
        {
          id: 1185,
          title: "AWeber",
        },
        {
          id: 1186,
          title: "Campaign Monitor",
        },
        {
          id: 1187,
          title: "Infusionsoft",
        },
        {
          id: 1188,
          title: "Marketo",
        },
        {
          id: 1189,
          title: "HubSpot",
        },
        {
          id: 1190,
          title: "SendinBlue",
        },
        {
          id: 1191,
          title: "ActiveCampaign",
        },
        {
          id: 1192,
          title: "Klaviyo",
        },
        {
          id: 1193,
          title: "Interspire",
        },
        {
          id: 1194,
          title: "SendGrid",
        },
        {
          id: 1195,
          title: "Mautic",
        },
        {
          id: 1196,
          title: "Cold email software",
        },
        {
          id: 1197,
          title: "keap",
        },
        {
          id: 1198,
          title: "Go HighLevel",
        },
      ],

      Method: [
        {
          id: 1199,
          title: "web scraping",
        },
        {
          id: 1200,
          title: "manual email collection",
        },
        {
          id: 1201,
          title: "viral contests",
        },
        {
          id: 1202,
          title: "forms and pop ups",
        },
        {
          id: 1203,
          title: "landing page",
        },
      ],

      Tools: [
        {
          id: 1204,
          title: "mailshake",
        },
        {
          id: 1205,
          title: "hubspot sales",
        },
        {
          id: 1206,
          title: "prospect.io",
        },
        {
          id: 1207,
          title: "autoklose ",
        },
        {
          id: 1208,
          title: "lemlist",
        },
        {
          id: 1209,
          title: "gmass",
        },
        {
          id: 1210,
          title: "woodpecker",
        },
        {
          id: 1211,
          title: "yesware",
        },
        {
          id: 1212,
          title: "gmelius",
        },
        {
          id: 1213,
          title: "bananatag",
        },
        {
          id: 1214,
          title: "cirrus insight",
        },
      ],
    },
    TextMessageMarketing: {
      Platform: [
        {
          id: 1215,
          title: "EZ Texting",
        },
        {
          id: 1216,
          title: "Textedly",
        },
        {
          id: 1217,
          title: "Podium",
        },
        {
          id: 1218,
          title: "Simple Texting",
        },
        {
          id: 1219,
          title: "Slick Text",
        },
        {
          id: 1220,
          title: "Active Trail",
        },
        {
          id: 1221,
          title: "Twilio",
        },
        {
          id: 1222,
          title: "Plivo",
        },
        {
          id: 1223,
          title: "User.com",
        },
      ],
      MessagingType: [
        {
          id: 1224,
          title: "One Time  Blast",
        },
        {
          id: 1225,
          title: "Event-Based Automation",
        },
      ],
    },
    Sem: {
      ServiceType: [
        {
          id: 1226,
          title: "SETUP & STRATEGY CONSULTATION",
        },
        {
          id: 1227,
          title: "SEARCH ENGINE MARKETING MANAGEMENT",
        },
        {
          id: 1228,
          title: "PRODUCT AD CAMPAIGNS",
        },
        {
          id: 1229,
          title: "AD REVIEW & OPTIMIZATION",
        },
      ],

      Industry: [
        {
          id: 1230,
          title: "Agriculture",
        },
        {
          id: 1231,
          title: "Animals & Pets",
        },
        {
          id: 1232,
          title: "Art & Design",
        },
        {
          id: 1233,
          title: "Beauty & Cosmetics",
        },
        {
          id: 1234,
          title: "Construction",
        },
        {
          id: 1235,
          title: "Education",
        },
        {
          id: 1236,
          title: "Energy",
        },
        {
          id: 1237,
          title: "Environmental",
        },
        {
          id: 1238,
          title: "Events Planning",
        },
        {
          id: 1239,
          title: "Fashion & Apparel",
        },
        {
          id: 1240,
          title: "Financial Services",
        },
        {
          id: 1241,
          title: "Food & Beverage",
        },
        {
          id: 1242,
          title: "Gaming",
        },
        {
          id: 1243,
          title: "Kids",
        },
        {
          id: 1244,
          title: "Legal",
        },
        {
          id: 1245,
          title: "Lifestyle",
        },
        {
          id: 1246,
          title: "Manufacturing & Storage",
        },
        {
          id: 1247,
          title: "Marketing and Advertising",
        },
        {
          id: 1248,
          title: "Medical and Pharmaceutical",
        },
        {
          id: 1249,
          title: "Non Profit",
        },
        {
          id: 1250,
          title: "Photography ",
        },
        {
          id: 1251,
          title: "Public Sector",
        },
        {
          id: 1252,
          title: "Real Estate",
        },
        {
          id: 1253,
          title: "Religion & Spirituality",
        },
        {
          id: 1254,
          title: "Retail & Wholesale",
        },
        {
          id: 1255,
          title: "Science",
        },
        {
          id: 1256,
          title: "Services ",
        },
        {
          id: 1257,
          title: "Sports & Fitness",
        },
        {
          id: 1258,
          title: "Technology",
        },
        {
          id: 1259,
          title: "Transportation & Automotive",
        },
        {
          id: 1260,
          title: "Travel & Tourism",
        },
        {
          id: 1261,
          title: "Writing & Publishing",
        },
      ],

      Method: [
        {
          id: 1262,
          title: "web scraping",
        },
        {
          id: 1263,
          title: "manual email collection",
        },
        {
          id: 1264,
          title: "viral contests",
        },
        {
          id: 1265,
          title: "forms and pop ups",
        },
        {
          id: 1266,
          title: "landing page",
        },
      ],

      Tools: [
        {
          id: 1267,
          title: "mailshake",
        },
        {
          id: 1268,
          title: "hubspot sales",
        },
        {
          id: 1269,
          title: "prospect.io",
        },
        {
          id: 1270,
          title: "autoklose ",
        },
        {
          id: 1271,
          title: "lemlist",
        },
        {
          id: 1272,
          title: "gmass",
        },
        {
          id: 1273,
          title: "woodpecker",
        },
        {
          id: 1274,
          title: "yesware",
        },
        {
          id: 1275,
          title: "gmelius",
        },
        {
          id: 1276,
          title: "bananatag",
        },
        {
          id: 1277,
          title: "cirrus insight",
        },
      ],
    },
    Crowdfunding: {
      ServiceType: [
        {
          id: 1278,
          title: "Campaign Creation",
        },
        {
          id: 1279,
          title: "Campaign Marketing",
        },
      ],
      PlatformType: [
        {
          id: 1280,
          title: "Kickstarter",
        },
        {
          id: 1281,
          title: "Indiegogo​",
        },
        {
          id: 1282,
          title: "Go Fund Me",
        },
        {
          id: 1283,
          title: "Fundly",
        },
        {
          id: 1284,
          title: "Patreon",
        },
        {
          id: 1285,
          title: "Crowd Rise",
        },
        {
          id: 1286,
          title: "Rocket Hub",
        },
      ],
    },
    DisplayAdvertising: {
      ServiceType: [
        {
          id: 1287,
          title: "CAMPAIGN SETUP & MANAGEMENT",
        },
        {
          id: 1288,
          title: "AD REVIEW & OPTIMIZATION ",
        },
        {
          id: 1289,
          title: "RETARGETING ",
        },
      ],

      AdNetwork: [
        {
          id: 1290,
          title: "Google Display Network (GDN)",
        },
        {
          id: 1291,
          title: "Bing Ads",
        },
        {
          id: 1292,
          title: "DV360 ",
        },
        {
          id: 1293,
          title: "Amazon DSP",
        },
        {
          id: 1294,
          title: "Mobile App Networks",
        },
      ],

      Placement: [
        {
          id: 1295,
          title: "all placements",
        },
        {
          id: 1296,
          title: "mobile",
        },
        {
          id: 1297,
          title: "desktop",
        },
        {
          id: 1298,
          title: "tv",
        },
      ],

      AdFormat: [
        {
          id: 1299,
          title: "Image (static)",
        },
        {
          id: 1300,
          title: "HTML 5",
        },
        {
          id: 1301,
          title: "Video",
        },
        {
          id: 1302,
          title: "Text",
        },
      ],

      Industry: [
        {
          id: 1303,
          title: "All Industries ",
        },
        {
          id: 1304,
          title: "Agriculture",
        },
        {
          id: 1305,
          title: "Animals & Pets",
        },
        {
          id: 1306,
          title: "Art & Design",
        },
        {
          id: 1307,
          title: "Beauty & Cosmetics",
        },
        {
          id: 1308,
          title: "Construction",
        },
        {
          id: 1309,
          title: "Education",
        },
        {
          id: 1310,
          title: "Energy",
        },
        {
          id: 1311,
          title: "Environmental",
        },
        {
          id: 1312,
          title: "Events Planning",
        },
        {
          id: 1313,
          title: "Fashion & Apparel ",
        },
        {
          id: 1314,
          title: "Financial Services",
        },
        {
          id: 1315,
          title: "Food & Beverage",
        },
        {
          id: 1316,
          title: "Gaming",
        },
        {
          id: 1317,
          title: "Kids",
        },
        {
          id: 1318,
          title: "Legal",
        },
        {
          id: 1319,
          title: "Lifestyle",
        },
        {
          id: 1320,
          title: "Manufacturing & Storage",
        },
        {
          id: 1321,
          title: "Marketing and Advertising",
        },
        {
          id: 1322,
          title: "Media and Entertainment",
        },
        {
          id: 1323,
          title: "Medical and Pharmaceutical",
        },
        {
          id: 1324,
          title: "Non Profit",
        },
        {
          id: 1325,
          title: "Photography",
        },
        {
          id: 1326,
          title: "Public Sector",
        },
        {
          id: 1327,
          title: "Real Estate",
        },
        {
          id: 1328,
          title: "Religion & Spirituality",
        },
        {
          id: 1329,
          title: "Retail & Wholesale",
        },
        {
          id: 1330,
          title: "Science",
        },
        {
          id: 1331,
          title: "Services",
        },
        {
          id: 1332,
          title: "Sports & Fitness",
        },
        {
          id: 1333,
          title: "Technology",
        },

        {
          id: 1334,
          title: "Transportation & Automotive",
        },
        {
          id: 1335,
          title: "Travel & Tourism",
        },
        {
          id: 1336,
          title: "Writing & Publishing",
        },
      ],
    },
    Surveys: {
      ServiceType: [
        {
          id: 1337,
          title: "SURVEY CREATION",
        },
      ],

      SurveyPlatform: [
        {
          id: 1338,
          title: "SurveyMonkey",
        },
        {
          id: 1339,
          title: "Google Forms",
        },
        {
          id: 1340,
          title: "Typeform",
        },
        {
          id: 1341,
          title: "JotForm",
        },
        {
          id: 1342,
          title: "Zoho Survey",
        },
        {
          id: 1343,
          title: "Survey Gizmo",
        },
        {
          id: 1344,
          title: "Qualtrics",
        },
        {
          id: 1345,
          title: "QuestionPro",
        },
      ],

      SurveyType: [
        {
          id: 1346,
          title: "Info Gathering",
        },
        {
          id: 1347,
          title: "Satisfaction & Feedback",
        },
        {
          id: 1348,
          title: "Application Form",
        },
        {
          id: 1349,
          title: "Opinion",
        },
        {
          id: 1350,
          title: "Quiz",
        },
        {
          id: 1351,
          title: "Personal & Fun",
        },
      ],
    },
    MarketingStrategy: {
      Consulting: [
        {
          id: 1352,
          title: "MARKETING PLANS ",
        },
        {
          id: 1353,
          title: "INDUSTRY",
        },
        {
          id: 1354,
          title: "Agriculture",
        },
        {
          id: 1355,
          title: "Animals & Pets ",
        },
        {
          id: 1356,
          title: "Art & Design",
        },
        {
          id: 1357,
          title: "Beauty & Cosmetics",
        },
        {
          id: 1358,
          title: "Construction",
        },
        {
          id: 1359,
          title: "Education",
        },
        {
          id: 1360,
          title: "Energy ",
        },
        {
          id: 1361,
          title: "Environmental",
        },
        {
          id: 1362,
          title: "Events Planning",
        },
        {
          id: 1363,
          title: "Fashion & Apparel",
        },
        {
          id: 1364,
          title: "Financial Services ",
        },
        {
          id: 1365,
          title: "Food & Beverage ",
        },
        {
          id: 1366,
          title: "Gaming",
        },
        {
          id: 1367,
          title: "Kids",
        },
        {
          id: 1368,
          title: "Legal ",
        },
        {
          id: 1369,
          title: "Lifestyle ",
        },
        {
          id: 1370,
          title: "Manufacturing & Storage",
        },
        {
          id: 1371,
          title: "Marketing and Advertising ",
        },
        {
          id: 1372,
          title: "Media and Entertainment",
        },
        {
          id: 1373,
          title: "Medical and Pharmaceutical",
        },
        {
          id: 1374,
          title: "Non Profit ",
        },
        {
          id: 1375,
          title: "Photography",
        },
        {
          id: 1376,
          title: "Public Sector ",
        },
        {
          id: 1377,
          title: "Real Estate",
        },
        {
          id: 1378,
          title: "Religion & Spirituality",
        },
        {
          id: 1379,
          title: "Retail & Wholesale",
        },
        {
          id: 1380,
          title: "Financial Services ",
        },
        {
          id: 1381,
          title: "Science",
        },
        {
          id: 1382,
          title: "Services",
        },
        {
          id: 1383,
          title: "Sports & Fitness",
        },
        {
          id: 1384,
          title: "Technology ",
        },
        {
          id: 1385,
          title: "Transportation & Automotive",
        },
        {
          id: 1386,
          title: "Travel & Tourism",
        },
        {
          id: 1387,
          title: "Writing & Publishing",
        },
      ],

      StrategyPurpose: [
        {
          id: 1388,
          title: "Company / Brand Strategy",
        },
        {
          id: 1389,
          title: "Product Launch",
        },
        {
          id: 1390,
          title: "Growth / Scale",
        },
        {
          id: 1391,
          title: "Campaign / Special Promotion",
        },
        {
          id: 1392,
          title: "Conversion funne",
        },
        {
          id: 1393,
          title: "Event",
        },
      ],

      Businessstage: [
        {
          id: 1394,
          title: "Startup",
        },
        {
          id: 1395,
          title: "Small Business ",
        },
        {
          id: 1396,
          title: "Medium Business ",
        },
        {
          id: 1397,
          title: "Large Business",
        },
      ],

      BusinessType: [
        {
          id: 1398,
          title: "B2B ",
        },
        {
          id: 1399,
          title: "B2C",
        },
        {
          id: 1400,
          title: "B2G ",
        },
        {
          id: 1401,
          title: "Personal brand ",
        },
        {
          id: 1402,
          title: "Non Profit",
        },
      ],
    },
    ECommerceMarketing: {
      ServiceType: [
        {
          id: 1403,
          title: "E-Commerce Seo",
        },
        {
          id: 1404,
          title: "Website Promotion",
        },
      ],
      PlatformType: [
        {
          id: 1405,
          title: "Amazon",
        },
        {
          id: 1406,
          title: "Ebay​",
        },
        {
          id: 1407,
          title: "Etsy",
        },
        {
          id: 1408,
          title: "Kindle",
        },
        {
          id: 1409,
          title: "Shopify",
        },
        {
          id: 1410,
          title: "Aliexpress",
        },
        {
          id: 1411,
          title: "Facebook Shops",
        },
        {
          id: 1412,
          title: "Walmart​",
        },
        {
          id: 1413,
          title: "Woocommerce",
        },
        {
          id: 1414,
          title: "Flipkart",
        },
        {
          id: 1415,
          title: "Magento",
        },
        {
          id: 1416,
          title: "Poshmark",
        },
      ],
      Industry: [
        {
          id: 1417,
          title: "Agriculture",
        },
        {
          id: 1418,
          title: "Animals & Pets​",
        },
        {
          id: 1419,
          title: "Art & Design",
        },
        {
          id: 1420,
          title: "Beauty & Cosmetics",
        },
        {
          id: 1421,
          title: "Construction",
        },
        {
          id: 1422,
          title: "Education",
        },
        {
          id: 1423,
          title: "Energy",
        },
        {
          id: 1424,
          title: "Environmental",
        },
        {
          id: 1425,
          title: "Events Planning",
        },
        {
          id: 1426,
          title: "Fashion & Apparel",
        },
        {
          id: 1427,
          title: "Financial Services",
        },
        {
          id: 1428,
          title: "Food & Beverage",
        },
        {
          id: 1429,
          title: "Gaming​",
        },
        {
          id: 1430,
          title: "Kids",
        },
        {
          id: 1431,
          title: "Legal",
        },
        {
          id: 1432,
          title: "Lifestyle",
        },
        {
          id: 1433,
          title: "Manufacturing & Storage",
        },
        {
          id: 1434,
          title: "Marketing And Advertising",
        },
        {
          id: 1435,
          title: "Media And Entertainment",
        },
        {
          id: 1436,
          title: "Medical And Pharmaceutical",
        },
        {
          id: 1437,
          title: "Non Profit",
        },
        {
          id: 1438,
          title: "Photography",
        },
        {
          id: 1439,
          title: "Public Sector",
        },
        {
          id: 1440,
          title: "Real Estate",
        },
        {
          id: 1441,
          title: "Religion & Spirituality",
        },
        {
          id: 1442,
          title: "Retail & Wholesale",
        },
        {
          id: 1443,
          title: "Science",
        },
        {
          id: 1444,
          title: "Services",
        },
        {
          id: 1445,
          title: "Sports & Fitness",
        },
        {
          id: 1446,
          title: "Technology",
        },
        {
          id: 1447,
          title: "Transportation & Automotive",
        },
        {
          id: 1448,
          title: "Travel & Tourism",
        },
        {
          id: 1449,
          title: "Writing & Publishing",
        },
      ],
      PromotionMethod: [
        {
          id: 1450,
          title: "Off-Page SEO",
        },
        {
          id: 1451,
          title: "Social Media Shoutout​",
        },
        {
          id: 1452,
          title: "Email List Promotion",
        },
        {
          id: 1453,
          title: "Paid Ads",
        },
        {
          id: 1454,
          title: "Classified Ads",
        },
        {
          id: 1455,
          title: "Growth Hacking",
        },
      ],
    },
    InfluencerMarketing: {
      StrategyResearch: [
        {
          id: 1456,
          title: "SHOUTOUTS & PROMOTION ",
        },
      ],

      TargetAudience: [
        {
          id: 1457,
          title: "Animals & Pets",
        },
        {
          id: 1458,
          title: "Art & Design",
        },
        {
          id: 1459,
          title: "Auto & Transport",
        },
        {
          id: 1460,
          title: "Food & Beverage ",
        },
        {
          id: 1461,
          title: "Beauty & Fashion",
        },
        {
          id: 1462,
          title: "Family, Education & Childcare",
        },
        {
          id: 1463,
          title: "Environment & Green Tech",
        },
        {
          id: 1464,
          title: "Events & Weddings",
        },
        {
          id: 1465,
          title: "Finance, Legal & Consulting",
        },
        {
          id: 1466,
          title: "Government & Municipal ",
        },
        {
          id: 1467,
          title: "Home & Garden ",
        },
        {
          id: 1468,
          title: "Internet & Tech",
        },
        {
          id: 1469,
          title: "Marketing & Communications",
        },
        {
          id: 1470,
          title: "Medical & Dental  ",
        },
        {
          id: 1471,
          title: "Music & Bands ",
        },
        {
          id: 1472,
          title: "Religion, Non-Profit & Charity",
        },
        {
          id: 1473,
          title: "Real Estate",
        },
        {
          id: 1474,
          title: "Retail & E-comm",
        },
        {
          id: 1475,
          title: "Sports & Fitness ",
        },
        {
          id: 1476,
          title: "Travel & Hospitality ",
        },
      ],

      PlatformType: [
        {
          id: 1477,
          title: "Facebook",
        },
        {
          id: 1478,
          title: "Instagram",
        },
        {
          id: 1479,
          title: "LinkedIn",
        },
        {
          id: 1480,
          title: "Pinterest",
        },
        {
          id: 1481,
          title: "Snapchat",
        },
        {
          id: 1482,
          title: "Twitter",
        },
        {
          id: 1483,
          title: "YouTube",
        },
        {
          id: 1484,
          title: "Product Hunt",
        },
        {
          id: 1485,
          title: "TikTok",
        },
        {
          id: 1486,
          title: "Discord",
        },
        {
          id: 1487,
          title: "Reddit",
        },
        {
          id: 1488,
          title: "twitch",
        },
      ],
    },
    CommunityManagement: {
      ServiceType: [
        {
          id: 1489,
          title: "PLANNING, STRATEGY & SETUP",
        },
        {
          id: 1490,
          title: "SOURCING & RECRUITMENT",
        },
        {
          id: 1491,
          title: "GROWTH, PARTNERSHIPS & MONETIZATION",
        },
        {
          id: 1492,
          title: "MANAGEMENT & ENGAGEMENT ",
        },
      ],

      Industry: [
        {
          id: 1493,
          title: "Agriculture",
        },
        {
          id: 1494,
          title: "Animals & Pets",
        },
        {
          id: 1495,
          title: "Art & Design",
        },
        {
          id: 1496,
          title: "Beauty & Cosmetics",
        },
        {
          id: 1497,
          title: "Construction",
        },
        {
          id: 1498,
          title: "Education",
        },
        {
          id: 1499,
          title: "Energy ",
        },
        {
          id: 1500,
          title: "Environmental ",
        },
        {
          id: 1501,
          title: "Events Planning",
        },
        {
          id: 1502,
          title: "Fashion & Apparel",
        },
        {
          id: 1503,
          title: "Financial Services ",
        },
        {
          id: 1504,
          title: "Food & Beverage",
        },
        {
          id: 1505,
          title: "Gaming ",
        },
        {
          id: 1506,
          title: "Kids",
        },
        {
          id: 1507,
          title: "Legal",
        },
        {
          id: 1508,
          title: "Lifestyle",
        },
        {
          id: 1509,
          title: "Manufacturing & Storage ",
        },
        {
          id: 1510,
          title: "Marketing and Advertising",
        },
        {
          id: 1511,
          title: "Media and Entertainment",
        },
        {
          id: 1512,
          title: "Medical and Pharmaceutical ",
        },
        {
          id: 1513,
          title: "Non Profit",
        },
        {
          id: 1514,
          title: "Photography",
        },
        {
          id: 1515,
          title: "Public Sector",
        },
        {
          id: 1516,
          title: "Real Estate",
        },
        {
          id: 1517,
          title: "Religion & Spirituality",
        },
        {
          id: 1518,
          title: "Retail & Wholesale",
        },
        {
          id: 1519,
          title: "Science",
        },
        {
          id: 1520,
          title: "Services ",
        },
        {
          id: 1521,
          title: "Sports & Fitness",
        },
        {
          id: 1522,
          title: "Technology",
        },
        {
          id: 1523,
          title: "Transportation & Automotive",
        },
        {
          id: 1524,
          title: "Travel & Tourism ",
        },
        {
          id: 1525,
          title: "Writing & Publishing",
        },
      ],

      CommunityPresence: [
        {
          id: 1526,
          title: "offline",
        },
        {
          id: 1527,
          title: "online",
        },
        {
          id: 1528,
          title: "DIGITAL PLATFORM",
        },
        {
          id: 1529,
          title: "facebook group",
        },
        {
          id: 1530,
          title: "linkedin group",
        },
        {
          id: 1531,
          title: "discord",
        },
        {
          id: 1532,
          title: "whatsapp group",
        },
        {
          id: 1533,
          title: "telegram group ",
        },
        {
          id: 1534,
          title: "subreddit",
        },
        {
          id: 1535,
          title: "forum",
        },
        {
          id: 1536,
          title: "dedicated platform",
        },
      ],
    },
    AffilateMarkting: {
      ServiceType: [
        {
          id: 1537,
          title: "PROGRAM STRATEGY & SETUP ",
        },
        {
          id: 1538,
          title: "AFFILIATES RECRUITMENT",
        },
        {
          id: 1539,
          title: "MARKETING FUNNELS",
        },
        {
          id: 1540,
          title: "LINK PROMOTION",
        },
        {
          id: 1541,
          title: "INDUSTRY",
        },
        {
          id: 1542,
          title: "Agriculture",
        },
        {
          id: 1543,
          title: "Animals & Pets",
        },
        {
          id: 1544,
          title: "Art & Design",
        },
        {
          id: 1545,
          title: "Beauty & Cosmetics",
        },
        {
          id: 1546,
          title: "Construction",
        },
        {
          id: 1547,
          title: "Education",
        },
        {
          id: 1548,
          title: "Energy ",
        },
        {
          id: 1549,
          title: "Environmental",
        },
        {
          id: 1550,
          title: "Fashion & Apparel",
        },
        {
          id: 1551,
          title: "Financial Services",
        },
        {
          id: 1552,
          title: "Food & Beverage",
        },
        {
          id: 1553,
          title: "Gaming",
        },
        {
          id: 1554,
          title: "Legal",
        },
        {
          id: 1555,
          title: "Lifestyle",
        },
        {
          id: 1556,
          title: "Manufacturing & Storage",
        },
        {
          id: 1557,
          title: "Marketing and Advertising",
        },
        {
          id: 1558,
          title: "Media and Entertainment",
        },
        {
          id: 1559,
          title: "Medical and Pharmaceutical",
        },
        {
          id: 1560,
          title: "Non Profit",
        },
        {
          id: 1561,
          title: "Photography ",
        },
        {
          id: 1562,
          title: "Public Sector",
        },
        {
          id: 1563,
          title: "Real Estate",
        },
        {
          id: 1564,
          title: "Religion & Spirituality",
        },
        {
          id: 1565,
          title: "Retail & Wholesale",
        },
        {
          id: 1566,
          title: "Science",
        },
        {
          id: 1567,
          title: "Services",
        },
        {
          id: 1568,
          title: "Sports & Fitness",
        },
        {
          id: 1569,
          title: "Technology",
        },
        {
          id: 1570,
          title: "Transportation & Automotive",
        },
        {
          id: 1571,
          title: "Travel & Tourism",
        },
        {
          id: 1572,
          title: "Writing & Publishing ",
        },
      ],

      AffiliateNetworks: [
        {
          id: 1573,
          title: "ClickBank",
        },
        {
          id: 1574,
          title: "JVZoo",
        },
        {
          id: 1575,
          title: "Warrior Plus",
        },
        {
          id: 1576,
          title: "ShareASale",
        },
        {
          id: 1577,
          title: "AWIN",
        },
        {
          id: 1578,
          title: "CJ Affiliate ",
        },
        {
          id: 1579,
          title: "Rakuten Marketing",
        },
        {
          id: 1580,
          title: "Avangate Affiliate Network",
        },
        {
          id: 1581,
          title: "FlexOffers",
        },
        {
          id: 1582,
          title: "Peerfly",
        },
        {
          id: 1583,
          title: "LinkConnector",
        },
      ],

      AffiliateNetworksPrograms: [
        {
          id: 1584,
          title: "ClickBank",
        },
        {
          id: 1585,
          title: "JVZoo",
        },
        {
          id: 1586,
          title: "Warrior Plus",
        },
        {
          id: 1587,
          title: "ShareASale",
        },
        {
          id: 1588,
          title: "AWIN",
        },
        {
          id: 1589,
          title: "CJ Affiliate",
        },
        {
          id: 1590,
          title: "Rakuten Marketing",
        },
        {
          id: 1591,
          title: "Avangate Affiliate Network",
        },
        {
          id: 1592,
          title: "FlexOffers",
        },
        {
          id: 1593,
          title: "Peerfly",
        },
        {
          id: 1594,
          title: "LinkConnector",
        },
        {
          id: 1595,
          title: "Amazon Associates",
        },
        {
          id: 1596,
          title: "eBay Partner Network",
        },
        {
          id: 1597,
          title: "Ali Express",
        },
      ],
    },
    MobileAppMarketing: {
      ServiceType: [
        {
          id: 1598,
          title: "APP STORE OPTIMIZATION ",
        },
        {
          id: 1599,
          title: "APP PROMOTION",
        },
      ],

      ApplicationStore: [
        {
          id: 1600,
          title: "Apple App Store",
        },
        {
          id: 1601,
          title: "Google Play",
        },
        {
          id: 1602,
          title: "Samsung Galaxy Apps",
        },
        {
          id: 1603,
          title: "Huawei App Store",
        },
        {
          id: 1604,
          title: "Sony Apps",
        },
      ],

      Industry: [
        {
          id: 1605,
          title: "Agriculture",
        },
        {
          id: 1606,
          title: "Animals & Pets",
        },
        {
          id: 1607,
          title: "Art & Design",
        },
        {
          id: 1608,
          title: "Beauty & Cosmetics",
        },
        {
          id: 1609,
          title: "Construction",
        },
        {
          id: 1610,
          title: "Environmental",
        },
        {
          id: 1611,
          title: "Events Planning",
        },
        {
          id: 1612,
          title: "Fashion & Apparel",
        },
        {
          id: 1613,
          title: "Financial Services & Business",
        },
        {
          id: 1614,
          title: "Food & Beverage",
        },
        {
          id: 1615,
          title: "Gaming",
        },
        {
          id: 1616,
          title: "Kids",
        },
        {
          id: 1617,
          title: "Legal",
        },
        {
          id: 1618,
          title: "Lifestyle",
        },
        {
          id: 1619,
          title: "Manufacturing & Storage",
        },
        {
          id: 1620,
          title: "Marketing & Advertising ",
        },
        {
          id: 1621,
          title: "Media & Entertainment",
        },
        {
          id: 1622,
          title: "Medical & Pharmaceutical",
        },
        {
          id: 1623,
          title: "Non Profit",
        },
        {
          id: 1624,
          title: "Photography & Videography",
        },
        {
          id: 1625,
          title: "Public Sector",
        },
        {
          id: 1626,
          title: "Real Estate",
        },
        {
          id: 1627,
          title: "Religion & Spirituality",
        },
        {
          id: 1628,
          title: "Retail & Wholesale",
        },
        {
          id: 1629,
          title: "Science",
        },
        {
          id: 1630,
          title: "Services",
        },
        {
          id: 1631,
          title: "Sports & Fitness",
        },
        {
          id: 1632,
          title: "Technology",
        },
        {
          id: 1633,
          title: "Retail & Wholesale",
        },
        {
          id: 1634,
          title: "Transportation & Automotive",
        },
        {
          id: 1635,
          title: "Travel & Tourism",
        },
        {
          id: 1636,
          title: "Writing & Publishing",
        },
      ],
    },
    MusicPromotion: {
      ServiceType: [
        {
          id: 1637,
          title: "ORGANIC PROMOTION",
        },
        {
          id: 1638,
          title: "PAID ADVERTISING",
        },
        {
          id: 1639,
          title: "MUSIC STREAMING SERVICES ",
        },
        {
          id: 1640,
          title: "PLAYLISTS AND PLACEMENTS",
        },
      ],

      MusicPlatform: [
        {
          id: 1641,
          title: "SoundCloud",
        },
        {
          id: 1642,
          title: "iTunes",
        },
        {
          id: 1643,
          title: "Spotify",
        },
        {
          id: 1644,
          title: "YouTube ",
        },
        {
          id: 1645,
          title: "Podcast",
        },
        {
          id: 1646,
          title: "iHeart Radio",
        },
        {
          id: 1647,
          title: "Pandora",
        },
        {
          id: 1648,
          title: "Tidal",
        },
        {
          id: 1649,
          title: "Bandcamp",
        },
        {
          id: 1650,
          title: "Deezer",
        },
        {
          id: 1651,
          title: "Apple Music",
        },
        {
          id: 1652,
          title: "Mixcloud",
        },
        {
          id: 1653,
          title: "TikTok",
        },
        {
          id: 1654,
          title: "Amazon Music",
        },
        {
          id: 1655,
          title: "Audiomack",
        },
        {
          id: 1656,
          title: "Google Play Music",
        },
      ],

      MusicalGenre: [
        {
          id: 1657,
          title: "Hip hop, Rap, R&B & Trap",
        },
        {
          id: 1658,
          title: "EDM",
        },
        {
          id: 1659,
          title: "Rock",
        },
        {
          id: 1660,
          title: "Jazz",
        },
        {
          id: 1661,
          title: "Gospel & Soul",
        },
        {
          id: 1662,
          title: "Punk & Metal",
        },
        {
          id: 1663,
          title: "Classical",
        },
        {
          id: 1664,
          title: "Blues",
        },
        {
          id: 1665,
          title: "Funk",
        },
        {
          id: 1666,
          title: "Country & Folk",
        },
        {
          id: 1667,
          title: "Reggae",
        },
        {
          id: 1668,
          title: "Latin",
        },
        {
          id: 1669,
          title: "World",
        },
      ],

      PlatformType: [
        {
          id: 1670,
          title: "tv",
        },
        {
          id: 1671,
          title: "radio",
        },
        {
          id: 1672,
          title: "digital streaming platforms",
        },
      ],

      Channel: [
        {
          id: 1673,
          title: "Social media platforms",
        },
        {
          id: 1674,
          title: "Blogs and websites",
        },
        {
          id: 1675,
          title: "Digital streaming platforms",
        },
        {
          id: 1676,
          title: "Emails",
        },
        {
          id: 1677,
          title: "Communities",
        },
      ],
    },
    DomainResearch: [
      {
        id: 1678,
        title: "Godaddy",
      },
      {
        id: 1679,
        title: "Google Domains",
      },
    ],
    LocalSeo: [
      {
        id: 1680,
        title: "Google My Business",
      },
      {
        id: 1681,
        title: "Local Citations And Directories",
      },
    ],
    VideoMarketing: [
      {
        id: 1682,
        title: "Consultation & Audience Research",
      },
      {
        id: 1683,
        title: "Video Seo",
      },
      {
        id: 1684,
        title: "Video Promotion & Distribution",
      },
      {
        id: 1685,
        title: "Video Ad Campaigns",
      },
    ],
    WebAnalytics: [
      {
        id: 1686,
        title: "Setup",
      },
      {
        id: 1687,
        title: "Tracking & Reporting",
      },
      {
        id: 1688,
        title: "Optimization",
      },
      {
        id: 1689,
        title: "Bug Fixes",
      },
    ],
  },
  ProgramingTeach: {
    WebsiteBuildersCms: {
      ServiceType: [
        {
          id: 1690,
          title: "Full Website Creation",
        },
        {
          id: 1691,
          title: "Theme/Plugin Installation",
        },
        {
          id: 1692,
          title: "Customization",
        },
        {
          id: 1693,
          title: "Bug Fixes",
        },
        {
          id: 1694,
          title: "Backup, Cloning & Migration",
        },
        {
          id: 1695,
          title: "Performance & Security",
        },
        {
          id: 1696,
          title: "Help/Consultation",
        },
        {
          id: 1697,
          title: "Landing Page​",
        },
      ],
      Platform: [
        {
          id: 1698,
          title: "Drupal",
        },
        {
          id: 1699,
          title: "Joomla​",
        },
        {
          id: 1700,
          title: "Squarespace",
        },
        {
          id: 1701,
          title: "Vbulletin",
        },
        {
          id: 1702,
          title: "Wix",
        },
        {
          id: 1703,
          title: "Weebly Blogger",
        },
        {
          id: 1704,
          title: "Sitebuilder",
        },
        {
          id: 1705,
          title: "Webflow​",
        },
        {
          id: 1706,
          title: "Django",
        },
        {
          id: 1707,
          title: "Godaddy",
        },
        {
          id: 1708,
          title: "Umbraco",
        },
        {
          id: 1709,
          title: "Moodle",
        },
        {
          id: 1710,
          title: "Jekyll​",
        },
        {
          id: 1711,
          title: "Adobe Dreamweaver",
        },
        {
          id: 1712,
          title: "Tilda",
        },
        {
          id: 1713,
          title: "Duda",
        },
        {
          id: 1714,
          title: "Mobirise",
        },
        {
          id: 1715,
          title: "Clickfunnels",
        },
      ],
      Specialization: [
        {
          id: 1716,
          title: "Blog",
        },
        {
          id: 1717,
          title: "Business​",
        },
        {
          id: 1718,
          title: "Education",
        },
        {
          id: 1719,
          title: "Portfolio",
        },
        {
          id: 1720,
          title: "Entertainment",
        },
        {
          id: 1721,
          title: "Non-Profit",
        },
        {
          id: 1722,
          title: "Wedding",
        },
        {
          id: 1723,
          title: "Podcasting",
        },
        {
          id: 1724,
          title: "Online Communities",
        },
        {
          id: 1725,
          title: "Forms",
        },
        {
          id: 1726,
          title: "Crowdfunding",
        },
        {
          id: 1727,
          title: "Wiki /Knowledge",
        },
        {
          id: 1728,
          title: "Saas​",
        },
        {
          id: 1729,
          title: "Job Board",
        },
        {
          id: 1730,
          title: "Portal",
        },
        {
          id: 1731,
          title: "Brochure",
        },
      ],
      SupportedPluginTypes: [
        {
          id: 1732,
          title: "Marketing",
        },
        {
          id: 1733,
          title: "Payment​",
        },
        {
          id: 1734,
          title: "Forum",
        },
        {
          id: 1735,
          title: "Social Media",
        },
        {
          id: 1736,
          title: "Customer Support",
        },
        {
          id: 1737,
          title: "Shipping",
        },
        {
          id: 1738,
          title: "Inventory",
        },
        {
          id: 1739,
          title: "Analytics",
        },
        {
          id: 1740,
          title: "Video",
        },
        {
          id: 1741,
          title: "Form",
        },
        {
          id: 1742,
          title: "Events",
        },
        {
          id: 1743,
          title: "Music",
        },
        {
          id: 1744,
          title: "Chat",
        },
        {
          id: 1745,
          title: "Membership",
        },
        {
          id: 1746,
          title: "Map",
        },
        {
          id: 1747,
          title: "Faq",
        },
        {
          id: 1748,
          title: "Gallery",
        },
      ],
    },
    Wordpress: {
      ServiceType: [
        {
          id: 1749,
          title: "Backup, Cloning & Migration",
        },
        {
          id: 1750,
          title: "Customization",
        },
        {
          id: 1751,
          title: "Bug Fixes",
        },
        {
          id: 1752,
          title: "Wp Installation & Setup",
        },
        {
          id: 1753,
          title: "Security",
        },
        {
          id: 1754,
          title: "Full Website Creation",
        },
        {
          id: 1755,
          title: "Help/Consultation",
        },
        {
          id: 1756,
          title: "Landing Page",
        },
        {
          id: 1757,
          title: "Performance & Seo",
        },
      ],
      Specialization: [
        {
          id: 1758,
          title: "Blog",
        },
        {
          id: 1759,
          title: "Business",
        },
        {
          id: 1760,
          title: "Education",
        },
        {
          id: 1761,
          title: "Portfolio",
        },
        {
          id: 1762,
          title: "Entertainment",
        },
        {
          id: 1763,
          title: "Non-Profit",
        },
        {
          id: 1764,
          title: "Wedding",
        },
        {
          id: 1765,
          title: "Podcasting",
        },
        {
          id: 1766,
          title: "Online Communities",
        },
        {
          id: 1767,
          title: "Forms",
        },
        {
          id: 1768,
          title: "Crowdfunding",
        },
        {
          id: 1769,
          title: "Wiki /Knowledge",
        },
        {
          id: 1770,
          title: "Saas",
        },
        {
          id: 1771,
          title: "Job Board",
        },
        {
          id: 1772,
          title: "Portal",
        },
        {
          id: 1773,
          title: "Brochure",
        },
      ],
      SupportedPluginTypes: [
        {
          id: 1774,
          title: "Marketing",
        },
        {
          id: 1775,
          title: "Payment",
        },
        {
          id: 1776,
          title: "Forum",
        },
        {
          id: 1777,
          title: "Social Media",
        },
        {
          id: 1778,
          title: "Customer Support",
        },
        {
          id: 1779,
          title: "Shipping",
        },
        {
          id: 1780,
          title: "Inventory",
        },
        {
          id: 1781,
          title: "Analytics",
        },
        {
          id: 1782,
          title: "Video",
        },
        {
          id: 1783,
          title: "Form",
        },
        {
          id: 1784,
          title: "Events",
        },
        {
          id: 1785,
          title: "Music",
        },
        {
          id: 1786,
          title: "Chat",
        },
        {
          id: 1787,
          title: "Membership",
        },
        {
          id: 1788,
          title: "Map",
        },
        {
          id: 1789,
          title: "Faq",
        },
        {
          id: 1790,
          title: "Gallery",
        },
      ],
      IntegratingPlugins: [
        {
          id: 1791,
          title: "Adsense",
        },
        {
          id: 1792,
          title: "Akismet",
        },
        {
          id: 1793,
          title: "All In One SEO Pack",
        },
        {
          id: 1794,
          title: "Amazon",
        },
        {
          id: 1795,
          title: "Aweber",
        },
        {
          id: 1796,
          title: "Clickbank",
        },
        {
          id: 1797,
          title: "Contact Form 7",
        },
        {
          id: 1798,
          title: "Facebook",
        },
        {
          id: 1799,
          title: "Getresponse",
        },
        {
          id: 1800,
          title: "Gravity Forms",
        },
        {
          id: 1801,
          title: "Instagram",
        },
        {
          id: 1802,
          title: "Linkedin",
        },
        {
          id: 1803,
          title: "Mailchimp",
        },
        {
          id: 1804,
          title: "Opencart",
        },
        {
          id: 1805,
          title: "Paypal",
        },
        {
          id: 1806,
          title: "Twitter",
        },
        {
          id: 1807,
          title: "Vimeo",
        },
        {
          id: 1808,
          title: "W3 Total Cache",
        },
        {
          id: 1809,
          title: "Woocommerce",
        },
        {
          id: 1810,
          title: "Wordpress SEO By Yoast",
        },
        {
          id: 1811,
          title: "Youtube",
        },
        {
          id: 1812,
          title: "Elementor",
        },
      ],
    },
    GameDevelopment: {
      ServiceType: [
        {
          id: 1813,
          title: "FULL GAME CREATION",
        },
        {
          id: 1814,
          title: "PROTOTYPING",
        },
        {
          id: 1815,
          title: "CUSTOMIZATION",
        },
        {
          id: 1816,
          title: "BUG FIXES",
        },
        {
          id: 1817,
          title: "BACKUP & MIGRATION",
        },
        {
          id: 1818,
          title: "CONSULTATION",
        },
      ],

      GameType: [
        {
          id: 1819,
          title: "Not Defined",
        },
        {
          id: 1820,
          title: "2D",
        },
        {
          id: 1821,
          title: "3D",
        },
        {
          id: 1822,
          title: "GAME ENGINE",
        },
        {
          id: 1823,
          title: "unity",
        },
        {
          id: 1824,
          title: "unreal engine",
        },
        {
          id: 1825,
          title: "gamemaker",
        },
        {
          id: 1826,
          title: "rpg maker",
        },
        {
          id: 1827,
          title: "amazon lumberyard",
        },
        {
          id: 1828,
          title: "appgamekit",
        },
        {
          id: 1829,
          title: "buildbox",
        },
        {
          id: 1830,
          title: "cocoonjs",
        },
        {
          id: 1831,
          title: "arkit",
        },
        {
          id: 1832,
          title: "blender",
        },
        {
          id: 1833,
          title: "cocos2d",
        },
        {
          id: 1834,
          title: "cryengine",
        },
        {
          id: 1835,
          title: "gamesalad",
        },
        {
          id: 1836,
          title: "gdevelop",
        },
        {
          id: 1837,
          title: "godot",
        },
        {
          id: 1838,
          title: "libgdx",
        },
        {
          id: 1839,
          title: "marmalade sdk",
        },
        {
          id: 1840,
          title: "monogame",
        },
        {
          id: 1841,
          title: "urho3d",
        },
      ],

      PlatformType: [
        {
          id: 1842,
          title: "PC",
        },
        {
          id: 1843,
          title: "Console",
        },
        {
          id: 1844,
          title: "Mobile ",
        },
        {
          id: 1845,
          title: "Smart TV",
        },
        {
          id: 1846,
          title: "Smart Watch",
        },
        {
          id: 1847,
          title: "VR",
        },
      ],

      Genree: [
        {
          id: 1848,
          title: "Action",
        },
        {
          id: 1849,
          title: "Adventure",
        },
        {
          id: 1850,
          title: "Arcade",
        },
        {
          id: 1851,
          title: "Educational",
        },
        {
          id: 1852,
          title: "Fighting",
        },
        {
          id: 1853,
          title: "Idle",
        },
        {
          id: 1854,
          title: "Music",
        },
        {
          id: 1855,
          title: "Platformers",
        },
        {
          id: 1856,
          title: "Puzzle",
        },
        {
          id: 1857,
          title: "Racing",
        },
        {
          id: 1858,
          title: "Role Playing",
        },
        {
          id: 1859,
          title: "Shooter",
        },
        {
          id: 1860,
          title: "Simulation",
        },
        {
          id: 1861,
          title: "Sports",
        },
        {
          id: 1862,
          title: "Strategy",
        },
      ],

      Plugins: [
        {
          id: 1863,
          title: "Ads/Monetization",
        },
        {
          id: 1864,
          title: "Analytics",
        },
        {
          id: 1865,
          title: "Animation",
        },
        {
          id: 1866,
          title: "Anti-Cheat",
        },
        {
          id: 1867,
          title: "AR",
        },
        {
          id: 1868,
          title: "Chat",
        },
        {
          id: 1869,
          title: "Machine Learning",
        },
        {
          id: 1870,
          title: "Marketing",
        },
        {
          id: 1871,
          title: "Billing/In-app purchasing",
        },
        {
          id: 1872,
          title: "Security",
        },
        {
          id: 1873,
          title: "Social",
        },
        {
          id: 1874,
          title: "Utilities",
        },
      ],

      CustomizationType: [
        {
          id: 1875,
          title: "Building Creation",
        },
        {
          id: 1876,
          title: "Environment Creation",
        },
        {
          id: 1877,
          title: "Items Creation",
        },
        {
          id: 1878,
          title: "Mod Creation",
        },
        {
          id: 1879,
          title: "Ad Integration",
        },
        {
          id: 1880,
          title: "Levels Addition",
        },
        {
          id: 1881,
          title: "Reskinning",
        },
        {
          id: 1882,
          title: "Modding",
        },
        {
          id: 1883,
          title: "Scripting",
        },
        {
          id: 1884,
          title: "Server Setup",
        },
      ],

      GameName: [
        {
          id: 1885,
          title: "minecraft",
        },
        {
          id: 1886,
          title: "roblox",
        },
        {
          id: 1887,
          title: "gta",
        },
        {
          id: 1888,
          title: "fortnite save the world",
        },
        {
          id: 1889,
          title: "animal jam",
        },
        {
          id: 1890,
          title: "terraria",
        },
        {
          id: 1891,
          title: "second life",
        },
      ],
    },
    DevelopmentForStreamers: {
      ServiceType: [
        {
          id: 1892,
          title: "Setup & Installation",
        },
        {
          id: 1893,
          title: "Addons & Customization",
        },
      ],
      Software: [
        {
          id: 1894,
          title: "Obs Studio",
        },
        {
          id: 1895,
          title: "Streamlabs Obs​",
        },
        {
          id: 1896,
          title: "Streamelements",
        },
        {
          id: 1897,
          title: "Xsplit",
        },
      ],
      Platform: [
        {
          id: 1898,
          title: "Facebook",
        },
        {
          id: 1899,
          title: "Twitch",
        },
        {
          id: 1900,
          title: "Youtube",
        },
        {
          id: 1901,
          title: "Mixer",
        },
        {
          id: 1902,
          title: "Gosu Gamers",
        },
        {
          id: 1903,
          title: "Dlive",
        },
        {
          id: 1904,
          title: "Discomelee",
        },
        {
          id: 1905,
          title: "Bigolive",
        },
        {
          id: 1906,
          title: "Hitbox",
        },
        {
          id: 1907,
          title: "Instagib TV",
        },
        {
          id: 1908,
          title: "Smashcast",
        },
      ],
      Purpose: [
        {
          id: 1909,
          title: "Gaming",
        },
        {
          id: 1910,
          title: "Music",
        },
        {
          id: 1911,
          title: "Lifestyle",
        },
        {
          id: 1912,
          title: "Business",
        },
        {
          id: 1913,
          title: "News",
        },
        {
          id: 1914,
          title: "Streamshare",
        },
        {
          id: 1915,
          title: "Webinar",
        },
        {
          id: 1916,
          title: "Sports",
        },
        {
          id: 1917,
          title: "Movies",
        },
        {
          id: 1918,
          title: "Entertainment",
        },
      ],
    },
    OnlineCodingLessons: {
      LessonPurpose: [
        {
          id: 1919,
          title: "Programming Language",
        },
        {
          id: 1920,
          title: "Website Development",
        },
        {
          id: 1921,
          title: "Databases",
        },
        {
          id: 1922,
          title: "Game Development",
        },
        {
          id: 1923,
          title: "Data Science",
        },
        {
          id: 1924,
          title: "Mobile Apps",
        },
        {
          id: 1925,
          title: "Testing & Automation",
        },
        {
          id: 1926,
          title: "Cloud Computing",
        },
      ],

      DevelopmentTechonlogy: [
        {
          id: 1927,
          title: "HTML",
        },
        {
          id: 1928,
          title: "CSS",
        },
        {
          id: 1929,
          title: "Bootstrap",
        },
        {
          id: 1930,
          title: "JavaScript",
        },
        {
          id: 1931,
          title: "TypeScript",
        },
        {
          id: 1932,
          title: "Angular",
        },
        {
          id: 1933,
          title: "React",
        },
        {
          id: 1934,
          title: "Ruby on Rails",
        },
        {
          id: 1935,
          title: "Node.js",
        },
        {
          id: 1936,
          title: ".NET",
        },
        {
          id: 1937,
          title: "C/C++",
        },
        {
          id: 1938,
          title: "C#",
        },
        {
          id: 1939,
          title: "Java",
        },
        {
          id: 1940,
          title: "Python",
        },
        {
          id: 1941,
          title: "Lua",
        },
        {
          id: 1942,
          title: "PHP",
        },
        {
          id: 1943,
          title: "Laravel",
        },
        {
          id: 1944,
          title: "Kotlin",
        },
        {
          id: 1945,
          title: "Django",
        },
        {
          id: 1946,
          title: "Ruby",
        },
        {
          id: 1947,
          title: "Go",
        },
        {
          id: 1948,
          title: "Scratch",
        },
        {
          id: 1949,
          title: "Rust",
        },
        {
          id: 1950,
          title: "Swift",
        },
        {
          id: 1951,
          title: "React Native",
        },
        {
          id: 1952,
          title: "Flutter",
        },
        {
          id: 1953,
          title: "Wordpress",
        },
        {
          id: 1954,
          title: "Shopify ",
        },
        {
          id: 1955,
          title: "SQL",
        },
        {
          id: 1956,
          title: "NoSQL",
        },
        {
          id: 1957,
          title: "R",
        },
        {
          id: 1958,
          title: "Matlab",
        },
        {
          id: 1959,
          title: "VB/VBA",
        },
        {
          id: 1960,
          title: "Unity",
        },
        {
          id: 1961,
          title: "Arduino",
        },
        {
          id: 1962,
          title: "Unreal Engine",
        },
      ],
    },
    SupportIt: {
      Device: [
        {
          id: 1963,
          title: "Not Defined",
        },
        {
          id: 1964,
          title: "Desktop/Laptop",
        },
        {
          id: 1965,
          title: "Server/Hosting",
        },
        {
          id: 1966,
          title: "Mobile",
        },
      ],
      OperatingSystem: [
        {
          id: 1967,
          title: "Not Defined",
        },
        {
          id: 1968,
          title: "Windows",
        },
        {
          id: 1969,
          title: "Ios",
        },
        {
          id: 1970,
          title: "Android",
        },
        {
          id: 1971,
          title: "Osx",
        },
        {
          id: 1972,
          title: "Linux/ Unix",
        },
      ],
      AlsoDelivering: [
        {
          id: 1973,
          title: "Remote Connection Support",
        },
        {
          id: 1974,
          title: "Documentation",
        },
        {
          id: 1975,
          title: "Package Deal",
        },
        {
          id: 1976,
          title: "Multiple Revisions",
        },
      ],
    },
    Chatbots: {
      MessagingPlatform: [
        {
          id: 1977,
          title: "Amazon Alexa",
        },
        {
          id: 1978,
          title: "Cisko Spark",
        },
        {
          id: 1979,
          title: "Discord",
        },
        {
          id: 1980,
          title: "Email",
        },
        {
          id: 1981,
          title: "Facebook Messenger",
        },
        {
          id: 1982,
          title: "Google Assistant",
        },
        {
          id: 1983,
          title: "Instagram",
        },
        {
          id: 1984,
          title: "Kakao Talk",
        },
        {
          id: 1985,
          title: "Kik",
        },
        {
          id: 1986,
          title: "Line",
        },
        {
          id: 1987,
          title: "Microsoft",
        },
        {
          id: 1988,
          title: "Samsung Bixby",
        },
        {
          id: 1989,
          title: "Slack",
        },
        {
          id: 1990,
          title: "Skype",
        },
        {
          id: 1991,
          title: "SMS",
        },
        {
          id: 1992,
          title: "CSteam",
        },
        {
          id: 1993,
          title: "TeamSpeak",
        },
        {
          id: 1994,
          title: "Telegram",
        },
        {
          id: 1995,
          title: "Telephone",
        },
        {
          id: 1996,
          title: "Twillio",
        },
        {
          id: 1997,
          title: "Twitch",
        },
        {
          id: 1998,
          title: "Twitter",
        },
        {
          id: 1999,
          title: "Viber",
        },
        {
          id: 2000,
          title: "VK",
        },
        {
          id: 2001,
          title: "Website",
        },
        {
          id: 2002,
          title: "WeChat",
        },
        {
          id: 2003,
          title: "Whatsapp",
        },
      ],

      BotType: [
        {
          id: 2004,
          title: "hopping/Ordering",
        },
        {
          id: 2005,
          title: "Customer Service",
        },
        {
          id: 2006,
          title: "Entertainment",
        },
        {
          id: 2007,
          title: "Health/Fitness",
        },
        {
          id: 2008,
          title: "Lead Info Capture",
        },
        {
          id: 2009,
          title: "Moderation",
        },
        {
          id: 2010,
          title: "News/RSS/Blog",
        },
        {
          id: 2011,
          title: "Resume/CV",
        },
        {
          id: 2012,
          title: "Schedule/Assistant",
        },
        {
          id: 2013,
          title: "Social Media Engagement",
        },
        {
          id: 2014,
          title: "Survey",
        },
        {
          id: 2015,
          title: "Transport",
        },
        {
          id: 2016,
          title: "Trivia/Gaming",
        },
      ],

      DevelopmentTechnology: [
        {
          id: 2017,
          title: "Beep Boop",
        },
        {
          id: 2018,
          title: "Botkit",
        },
        {
          id: 2019,
          title: "Botsify",
        },
        {
          id: 2020,
          title: "Bottr",
        },
        {
          id: 2021,
          title: "Chatfuel",
        },
        {
          id: 2022,
          title: "ChatterOn.io",
        },
        {
          id: 2023,
          title: "Chattypeople",
        },
        {
          id: 2024,
          title: "Dialogflow",
        },
        {
          id: 2025,
          title: "Flow XO",
        },
        {
          id: 2026,
          title: "Gupshup",
        },
        {
          id: 2027,
          title: "JAVA",
        },
        {
          id: 2028,
          title: "Manychat",
        },
        {
          id: 2029,
          title: "Motion.ai",
        },
        {
          id: 2030,
          title: "NodeJS",
        },
        {
          id: 2031,
          title: "Octane.ai",
        },
        {
          id: 2032,
          title: "Python",
        },
        {
          id: 2033,
          title: "QnA maker",
        },
        {
          id: 2034,
          title: "Recast.ai",
        },
      ],
    },
    DataAnalysisReports: {
      ServiceType: [
        {
          id: 2035,
          title: "Modeling",
        },
        {
          id: 2036,
          title: "Visualization",
        },
        {
          id: 2037,
          title: "Vba/Macros",
        },
        {
          id: 2038,
          title: "Data Mining/Scraping",
        },
        {
          id: 2039,
          title: "Help/Consultation",
        },
        {
          id: 2040,
          title: "Machine Learning",
        },
        {
          id: 2041,
          title: "Data Entry/Cleaning",
        },
      ],
      Tool: [
        {
          id: 2042,
          title: "Not Defined",
        },
        {
          id: 2043,
          title: "Google Spreadsheets",
        },
        {
          id: 2044,
          title: "Excel",
        },
        {
          id: 2045,
          title: "Tableau",
        },
        {
          id: 2046,
          title: "Power BI",
        },
        {
          id: 2047,
          title: "Matlab",
        },
        {
          id: 2048,
          title: "R",
        },
        {
          id: 2049,
          title: "Sas",
        },
        {
          id: 2050,
          title: "Spss",
        },
        {
          id: 2051,
          title: "Python",
        },
        {
          id: 2052,
          title: "Sql",
        },
        {
          id: 2053,
          title: "Anylogic",
        },
        {
          id: 2054,
          title: "Stata",
        },
        {
          id: 2055,
          title: "Minitab",
        },
        {
          id: 2056,
          title: "Arcgis",
        },
        {
          id: 2057,
          title: "Qlikview",
        },
        {
          id: 2058,
          title: "Google Data Studio",
        },
      ],
    },
    ConvertFiles: {
      ServiceType: [
        {
          id: 2059,
          title: "Convert To A Fillable Form",
        },
        {
          id: 2060,
          title: "Convert To An Ebook",
        },
        {
          id: 2061,
          title: "Convert To An Editable File",
        },
        {
          id: 2062,
          title: "Convert To Another File",
        },
      ],
      ConvertFrom: [
        {
          id: 2063,
          title: "Pdf",
        },
        {
          id: 2064,
          title: "Doc,Docx",
        },
        {
          id: 2065,
          title: "Xls,Xlsx",
        },
        {
          id: 2066,
          title: "Ppt,Pptx",
        },
      ],
      ConvertTo: [
        {
          id: 2067,
          title: "Doc,Docx",
        },
        {
          id: 2068,
          title: "Xls,Xlsx",
        },
        {
          id: 2069,
          title: "Ppt,Pptx",
        },
      ],
    },
    Databases: {
      ServiceType: [
        {
          id: 2070,
          title: "Optimization & Design",
        },
        {
          id: 2071,
          title: "Queries",
        },
        {
          id: 2072,
          title: "Help/Consultation",
        },
      ],
      DatabasesType: [
        {
          id: 2073,
          title: "Access",
        },
        {
          id: 2074,
          title: "Ms Sql",
        },
        {
          id: 2075,
          title: "Mysql",
        },
        {
          id: 2076,
          title: "Oracle",
        },
        {
          id: 2077,
          title: "Postgres",
        },
        {
          id: 2078,
          title: "Couchbase",
        },
        {
          id: 2079,
          title: "Mongo",
        },
        {
          id: 2080,
          title: "Teradata",
        },
        {
          id: 2081,
          title: "Sqlite",
        },
      ],
    },
    QaReview: {
      ServiceType: [
        {
          id: 2082,
          title: "SOFTWARE TESTING ",
        },
        {
          id: 2083,
          title: "CODE REVIEW",
        },
        {
          id: 2084,
          title: "DESIGN REVIEW",
        },
      ],

      TestingApplication: [
        {
          id: 2085,
          title: "Software",
        },
        {
          id: 2086,
          title: "Website",
        },
        {
          id: 2087,
          title: "Mobile App",
        },
        {
          id: 2088,
          title: "Games",
        },
        {
          id: 2089,
          title: "Web Application",
        },
        {
          id: 2090,
          title: "Desktop Application",
        },
        {
          id: 2091,
          title: "API",
        },
        {
          id: 2092,
          title: "Database",
        },
      ],

      DevelopmentTechnology: [
        {
          id: 2093,
          title: ".NET",
        },
        {
          id: 2094,
          title: "Angular",
        },
        {
          id: 2095,
          title: "C/C++",
        },
        {
          id: 2096,
          title: "C#",
        },
        {
          id: 2097,
          title: "Delphi",
        },
        {
          id: 2098,
          title: "Django",
        },
        {
          id: 2099,
          title: "Flash",
        },
        {
          id: 2100,
          title: "Flutter",
        },
        {
          id: 2101,
          title: "Go",
        },
        {
          id: 2102,
          title: "HTML & CSS",
        },
        {
          id: 2103,
          title: "JAVA",
        },
        {
          id: 2104,
          title: "JavaScript",
        },
        {
          id: 2105,
          title: "Kotlin",
        },
        {
          id: 2106,
          title: "Lua",
        },
        {
          id: 2107,
          title: "Node.js",
        },
        {
          id: 2108,
          title: "NoSQL",
        },
        {
          id: 2109,
          title: "Perl",
        },
        {
          id: 2110,
          title: "PHP",
        },
        {
          id: 2111,
          title: "Python",
        },
        {
          id: 2112,
          title: "React",
        },
        {
          id: 2113,
          title: "React Native",
        },
        {
          id: 2114,
          title: "Ruby",
        },
        {
          id: 2115,
          title: "Ruby on Rails",
        },
        {
          id: 2116,
          title: "Scala",
        },
        {
          id: 2117,
          title: "Shopify Store",
        },
        {
          id: 2118,
          title: "SQL",
        },
        {
          id: 2119,
          title: "Swift",
        },
        {
          id: 2120,
          title: "TypeScript",
        },
        {
          id: 2121,
          title: "Unity",
        },
        {
          id: 2122,
          title: "Unreal Engine",
        },
        {
          id: 2123,
          title: "VB/VBA",
        },
        {
          id: 2124,
          title: "Wordpress Website",
        },
      ],

      Device: [
        {
          id: 2125,
          title: "PC",
        },
        {
          id: 2126,
          title: "Mac",
        },
        {
          id: 2127,
          title: "Linux",
        },
        {
          id: 2128,
          title: "iPhone",
        },
        {
          id: 2129,
          title: "iPad",
        },
        {
          id: 2130,
          title: "Android Mobile Phone",
        },
        {
          id: 2131,
          title: "Android Tablet",
        },
        {
          id: 2132,
          title: "Windows Phone",
        },
        {
          id: 2133,
          title: "Game Console",
        },
      ],

      Expertise: [
        {
          id: 2134,
          title: "Algorithmic",
        },
        {
          id: 2135,
          title: "Clean Code",
        },
        {
          id: 2136,
          title: "Code Efficiency",
        },
        {
          id: 2137,
          title: "Data Structure",
        },
        {
          id: 2138,
          title: "Design Patterns",
        },
        {
          id: 2139,
          title: "Error Handling",
        },
        {
          id: 2140,
          title: "Unit Tests",
        },
        {
          id: 2141,
          title: "Version Control",
        },

        {
          id: 2142,
          title: "Caching",
        },
        {
          id: 2143,
          title: "Cloud Based Solution",
        },
        {
          id: 2144,
          title: "Data Storage",
        },
        {
          id: 2145,
          title: "Dockers",
        },
        {
          id: 2146,
          title: "Memory Usage",
        },
        {
          id: 2147,
          title: "Load & Performance",
        },
        {
          id: 2148,
          title: "Usability",
        },
        {
          id: 2149,
          title: "Security",
        },
        {
          id: 2150,
          title: "System Architecture",
        },
      ],
    },
    UserTesting: {
      TestingPlatform: [
        {
          id: 2151,
          title: "Website Testing",
        },
        {
          id: 2152,
          title: "Mobile Testing",
        },
        {
          id: 2153,
          title: "Software Testing",
        },
        {
          id: 2154,
          title: "Game Testing",
        },
      ],
      Device: [
        {
          id: 2155,
          title: "Pc",
        },
        {
          id: 2156,
          title: "Mac",
        },
        {
          id: 2157,
          title: "Linux",
        },
        {
          id: 2158,
          title: "Iphone",
        },
        {
          id: 2159,
          title: "Ipad",
        },
        {
          id: 2160,
          title: "Android Mobile Phone",
        },
        {
          id: 2161,
          title: "Android Tablet",
        },
        {
          id: 2162,
          title: "Windows Phone",
        },
        {
          id: 2163,
          title: "Windows Tablet",
        },
        {
          id: 2164,
          title: "Game Console",
        },
      ],
    },
    WebProgramming: {
      ServiceType: [
        {
          id: 2165,
          title: "CUSTOM WEBSITE",
        },
        {
          id: 2166,
          title: "WEB APPLICATION ",
        },
        {
          id: 2167,
          title: "BUG FIXES",
        },
        {
          id: 2168,
          title: "EMAIL TEMPLATE",
        },
        {
          id: 2169,
          title: "CONVERT PSD",
        },
        {
          id: 2170,
          title: "SCRIPTING ",
        },
      ],

      ProgrammingLanguage: [
        {
          id: 2171,
          title: "Not Defined",
        },
        {
          id: 2172,
          title: "ASP.NET",
        },
        {
          id: 2173,
          title: "HTML & CSS",
        },
        {
          id: 2174,
          title: "Games",
        },
        {
          id: 2175,
          title: "javaScript",
        },
        {
          id: 2176,
          title: "Perl",
        },
        {
          id: 2177,
          title: "PHP",
        },
        {
          id: 2178,
          title: "Python",
        },
        {
          id: 2179,
          title: "Ruby/RoR",
        },
        {
          id: 2180,
          title: "Scala",
        },
        {
          id: 2181,
          title: "Flash",
        },
        {
          id: 2182,
          title: "Java",
        },
        {
          id: 2183,
          title: "TypeScript",
        },
        {
          id: 2184,
          title: "C#",
        },
        {
          id: 2185,
          title: "Go",
        },
        {
          id: 2186,
          title: "Kotlin",
        },
      ],

      Expertise: [
        {
          id: 2187,
          title: "Cross Browser Compatibility",
        },
        {
          id: 2188,
          title: "PSD to HTML",
        },
        {
          id: 2189,
          title: "Localization",
        },
        {
          id: 2190,
          title: "Performance",
        },
        {
          id: 2191,
          title: "Security",
        },
        {
          id: 2192,
          title: "W3C Validation",
        },
        {
          id: 2193,
          title: "Design",
        },
      ],
    },
    DesktopApplications: {
      ServiceType: [
        {
          id: 2194,
          title: "Custom Application",
        },
        {
          id: 2195,
          title: "Application Improvements",
        },
        {
          id: 2196,
          title: "Bug Fixes",
        },
        {
          id: 2197,
          title: "Help/Consultation",
        },
      ],
      ProgrammingLanguage: [
        {
          id: 2198,
          title: "Not Defined",
        },
        {
          id: 2199,
          title: "Python",
        },
        {
          id: 2200,
          title: "C&C++",
        },
        {
          id: 2201,
          title: "C#/.Net",
        },
        {
          id: 2202,
          title: "Java",
        },
        {
          id: 2203,
          title: "Vb",
        },
        {
          id: 2204,
          title: "Lua",
        },
        {
          id: 2205,
          title: "Delphi",
        },
        {
          id: 2206,
          title: "Kotlin",
        },
      ],
      OperatingSystem: [
        {
          id: 2207,
          title: "Not Defined",
        },
        {
          id: 2208,
          title: "Windows",
        },
        {
          id: 2209,
          title: "Osx",
        },
        {
          id: 2210,
          title: "Linux/ Unix",
        },
      ],
      Expertise: [
        {
          id: 2211,
          title: "Planning & Design",
        },
        {
          id: 2212,
          title: "Setup & Installation",
        },
        {
          id: 2213,
          title: "Development",
        },
        {
          id: 2214,
          title: "Debugging",
        },
        {
          id: 2215,
          title: "Performance",
        },
        {
          id: 2216,
          title: "Security",
        },
        {
          id: 2217,
          title: "W3c Validation",
        },
        {
          id: 2218,
          title: "Localization",
        },
        {
          id: 2219,
          title: "Review & Optimization",
        },
      ],
      Application: [
        {
          id: 2220,
          title: "Binance",
        },
        {
          id: 2221,
          title: "Biymex",
        },
        {
          id: 2222,
          title: "Discord",
        },
        {
          id: 2223,
          title: "Excel",
        },
        {
          id: 2224,
          title: "Facebook",
        },
        {
          id: 2225,
          title: "Metatrader",
        },
        {
          id: 2226,
          title: "Mixer",
        },
        {
          id: 2227,
          title: "Mysql",
        },
        {
          id: 2228,
          title: "Ninjatrader",
        },
        {
          id: 2229,
          title: "Nodejs",
        },
        {
          id: 2230,
          title: "Powershell",
        },
        {
          id: 2231,
          title: "Skype",
        },
        {
          id: 2232,
          title: "Slack",
        },
        {
          id: 2233,
          title: "Twitch",
        },
        {
          id: 2234,
          title: "Youtube",
        },
      ],
    },
    ECommerceDevelopment: {
      ServiceType: [
        {
          id: 2235,
          title: "FULL WEBSITE CREATION",
        },
        {
          id: 2236,
          title: "THEME/PLUGIN INSTALLATION",
        },
        {
          id: 2237,
          title: "CUSTOMIZATION",
        },
        {
          id: 2238,
          title: "BUG FIXES",
        },
        {
          id: 2239,
          title: "BACKUP, CLONING & MIGRATION",
        },
        {
          id: 2240,
          title: "PERFORMANCE & SECURITY",
        },
        {
          id: 2241,
          title: "HELP/CONSULTATION",
        },
      ],

      Platform: [
        {
          id: 2242,
          title: "Magento",
        },
        {
          id: 2243,
          title: "Shopify",
        },
        {
          id: 2244,
          title: "Opencart",
        },
        {
          id: 2245,
          title: "Prestashop",
        },
        {
          id: 2246,
          title: "Bigcommerce",
        },
        {
          id: 2247,
          title: "WooCommerce",
        },
        {
          id: 2248,
          title: "VTEX",
        },
        {
          id: 2249,
          title: "Wix",
        },
        {
          id: 2250,
          title: "SiteBuilder",
        },
        {
          id: 2251,
          title: "Squarespace",
        },
        {
          id: 2252,
          title: "Webflow",
        },
        {
          id: 2253,
          title: "Shopware",
        },
        {
          id: 2254,
          title: "Ecwid",
        },
        {
          id: 2255,
          title: "OsCommerce",
        },
        {
          id: 2256,
          title: "Big Cartel",
        },
      ],

      SupportedPluginTypes: [
        {
          id: 2257,
          title: "Marketing",
        },
        {
          id: 2258,
          title: "Payment",
        },
        {
          id: 2259,
          title: "Forum ",
        },
        {
          id: 2260,
          title: "Social Media",
        },
        {
          id: 2261,
          title: "Customer Support",
        },
        {
          id: 2262,
          title: "Shipping ",
        },
        {
          id: 2263,
          title: "Inventory",
        },
        {
          id: 2264,
          title: "Analytics",
        },
        {
          id: 2265,
          title: "Dropshipping",
        },
        {
          id: 2266,
          title: "Membership",
        },
        {
          id: 2267,
          title: "Finance",
        },
        {
          id: 2268,
          title: "Video",
        },
        {
          id: 2269,
          title: "Events",
        },
        {
          id: 2270,
          title: "Music",
        },
        {
          id: 2271,
          title: "Chat",
        },
        {
          id: 2272,
          title: "Map",
        },
        {
          id: 2273,
          title: "FAQ",
        },
        {
          id: 2274,
          title: "Gallery ",
        },
      ],
    },
    MobileApps: {
      ServiceType: [
        {
          id: 2275,
          title: "CUSTOM APP",
        },
        {
          id: 2276,
          title: "CONVERT SITE TO APP",
        },
        {
          id: 2277,
          title: "APP IMPROVEMENTS",
        },
        {
          id: 2278,
          title: "BUG FIXES",
        },
        {
          id: 2279,
          title: "HELP/CONSULTATION",
        },
      ],

      Platform: [
        {
          id: 2280,
          title: "iOS App",
        },
        {
          id: 2281,
          title: "Android App",
        },
        {
          id: 2282,
          title: "iOS & Android (Dual)",
        },
        {
          id: 2283,
          title: "Windows Mobile App",
        },
        {
          id: 2284,
          title: "Mobile Web",
        },
        {
          id: 2285,
          title: "APP TYPE",
        },
        {
          id: 2286,
          title: "Native",
        },
        {
          id: 2287,
          title: "Hybrid",
        },
        {
          id: 2288,
          title: "PWA",
        },
      ],

      DevelopmentTechnology: [
        {
          id: 2289,
          title: "Flutter",
        },
        {
          id: 2290,
          title: "React Native",
        },
        {
          id: 2291,
          title: "Java",
        },
        {
          id: 2292,
          title: "Kotlin",
        },
        {
          id: 2293,
          title: "Swift",
        },
        {
          id: 2294,
          title: "Objective-C",
        },
        {
          id: 2295,
          title: "Ionic",
        },
        {
          id: 2296,
          title: "Xamarin",
        },
        {
          id: 2297,
          title: "PhoneGap",
        },
        {
          id: 2298,
          title: "Appcelerator Titanium",
        },
        {
          id: 2299,
          title: "NativeScript",
        },
      ],
      Purpose: [
        {
          id: 2300,
          title: "Chat",
        },
        {
          id: 2301,
          title: "Dating",
        },
        {
          id: 2302,
          title: "Delivery",
        },
        {
          id: 2303,
          title: "Streaming",
        },
        {
          id: 2304,
          title: "Music",
        },
        {
          id: 2305,
          title: "Restaurant",
        },
        {
          id: 2306,
          title: "Shopping",
        },
        {
          id: 2307,
          title: "Taxi",
        },
        {
          id: 2308,
          title: "Booking",
        },
        {
          id: 2309,
          title: "Finance",
        },

        {
          id: 2310,
          title: "Social Networking",
        },
        {
          id: 2311,
          title: "Entertainment",
        },
        {
          id: 2312,
          title: "Medical",
        },
        {
          id: 2313,
          title: "Health & Fitness",
        },
        {
          id: 2314,
          title: "Kids",
        },
        {
          id: 2315,
          title: "Maps & Navigation",
        },
        {
          id: 2316,
          title: "Education",
        },
        {
          id: 2317,
          title: "IOT",
        },
        {
          id: 2318,
          title: "AR",
        },
        {
          id: 2319,
          title: "News",
        },
        {
          id: 2320,
          title: "Trivia",
        },
        {
          id: 2321,
          title: "Lifestyle",
        },
        {
          id: 2322,
          title: "Travel",
        },
        {
          id: 2323,
          title: "Productivity Tools",
        },
      ],

      Expertise: [
        {
          id: 2324,
          title: "Cross Browser/Device Compatibility",
        },
        {
          id: 2325,
          title: "Localization",
        },
        {
          id: 2326,
          title: "Performance",
        },
        {
          id: 2327,
          title: "Security",
        },
        {
          id: 2328,
          title: "Design",
        },
        {
          id: 2329,
          title: "Ads & Monetization",
        },
        {
          id: 2330,
          title: "Data Storage ",
        },
        {
          id: 2331,
          title: "Firebase",
        },
        {
          id: 2332,
          title: "Analytics",
        },
        {
          id: 2333,
          title: "Release Management",
        },
        {
          id: 2334,
          title: "Widgets",
        },
        {
          id: 2335,
          title: "Instant App/ App Clip",
        },
      ],
    },
  },
  VideoAnimation: {
    WhiteboardanimatedExplainers: {
      ServiceType: [
        {
          id: 2336,
          title: "2D ANIMATED EXPLAINERS",
        },
        {
          id: 2337,
          title: "3D ANIMATED EXPLAINERS",
        },
        {
          id: 2338,
          title: "ISOMETRIC EXPLAINERS",
        },
        {
          id: 2339,
          title: "WHITEBOARD EXPLAINERS",
        },
      ],

      ExplanierType: [
        {
          id: 2340,
          title: "Illustration",
        },
        {
          id: 2341,
          title: "Infographics",
        },
        {
          id: 2342,
          title: "Text Animation",
        },
      ],

      SoftwareExpertise: [
        {
          id: 2343,
          title: "After Effects",
        },
        {
          id: 2344,
          title: "Adobe Animate",
        },
        {
          id: 2345,
          title: "Character Animator",
        },
        {
          id: 2346,
          title: "Toon Boom Harmony",
        },
        {
          id: 2347,
          title: "Videoscribe",
        },
        {
          id: 2348,
          title: "Videomaker FX",
        },
        {
          id: 2349,
          title: "Vyond",
        },
        {
          id: 2350,
          title: "Powtoon",
        },
        {
          id: 2351,
          title: "Animaker",
        },
        {
          id: 2352,
          title: "Moho",
        },
        {
          id: 2353,
          title: "Animatron",
        },
        {
          id: 2354,
          title: "Moovly",
        },
        {
          id: 2355,
          title: "Explainidio",
        },
        {
          id: 2356,
          title: "Renderforest",
        },
        {
          id: 2357,
          title: "Toonly",
        },
        {
          id: 2358,
          title: "Animiz",
        },
        {
          id: 2359,
          title: "Cinema4D",
        },
        {
          id: 2360,
          title: "Autodesk Maya",
        },
        {
          id: 2361,
          title: "Blender",
        },
        {
          id: 2362,
          title: "3DsMax",
        },
        {
          id: 2363,
          title: "Mixamo",
        },
        {
          id: 2364,
          title: "Poser",
        },
        {
          id: 2365,
          title: "MotionBuilder",
        },
        {
          id: 2366,
          title: "LightWave 3D",
        },
        {
          id: 2367,
          title: "Avatar Builder",
        },
      ],
      Purpose: [
        {
          id: 2368,
          title: "Education & Training",
        },
        {
          id: 2369,
          title: "Corporate Communication",
        },
        {
          id: 2370,
          title: "Marketing & Advertising",
        },
        {
          id: 2371,
          title: "ISOMETRIC DIMENSION",
        },
        {
          id: 2372,
          title: "2D",
        },
        {
          id: 2373,
          title: "3D",
        },
      ],

      ToolExpertise: [
        {
          id: 2374,
          title: "Manual Creation",
        },
        {
          id: 2375,
          title: "After Effects",
        },
        {
          id: 2376,
          title: "Videoscribe",
        },
        {
          id: 2377,
          title: "Doodly",
        },
        {
          id: 2378,
          title: "Powtoon",
        },
        {
          id: 2379,
          title: "Vyond",
        },
        {
          id: 2380,
          title: "Animaker",
        },
        {
          id: 2381,
          title: "Moovly",
        },
        {
          id: 2382,
          title: "Rawshorts",
        },
        {
          id: 2383,
          title: "Renderforest",
        },
        {
          id: 2384,
          title: "Explainidio",
        },
        {
          id: 2385,
          title: "Easy Sketch Pro",
        },
        {
          id: 2386,
          title: "Toonly",
        },
      ],
    },
    AnimatedGifs: {
      Purpose: [
        {
          id: 2387,
          title: "Social Media & Ads",
        },
        {
          id: 2388,
          title: "Emails & Newsletters",
        },
        {
          id: 2389,
          title: "Stickers & Emojis",
        },
        {
          id: 2390,
          title: "Greeting Cards & Invitations",
        },
        {
          id: 2391,
          title: "ANIMATION STYLE",
        },
        {
          id: 2392,
          title: "Illustrated",
        },
        {
          id: 2393,
          title: "Footage Based",
        },
        {
          id: 2394,
          title: "Typographic",
        },
      ],

      FileFormat: [
        {
          id: 2395,
          title: "GIF",
        },
        {
          id: 2396,
          title: "PNG",
        },
        {
          id: 2397,
          title: "MP4",
        },
        {
          id: 2398,
          title: "SVG",
        },
        {
          id: 2399,
          title: "CSS",
        },
        {
          id: 2400,
          title: "WebP",
        },
        {
          id: 2401,
          title: "MNG",
        },
        {
          id: 2402,
          title: "FLIF",
        },
        {
          id: 2403,
          title: "HTML5",
        },
      ],
    },
    IntrosOutros: {
      IntroOutroType: [
        {
          id: 2404,
          title: "Not Defined",
        },
        {
          id: 2405,
          title: "YouTube Channel Intro",
        },
        {
          id: 2406,
          title: "Call to Action Outro",
        },
        {
          id: 2407,
          title: "Title Sequence",
        },
      ],

      VideoFileFormat: [
        {
          id: 2408,
          title: "MP4",
        },
        {
          id: 2409,
          title: "MOV",
        },
        {
          id: 2410,
          title: "AVI",
        },
        {
          id: 2411,
          title: "FLV",
        },
        {
          id: 2412,
          title: "M4V",
        },
        {
          id: 2413,
          title: "MPG",
        },
        {
          id: 2414,
          title: "SWF",
        },
        {
          id: 2415,
          title: "WMV",
        },
      ],
    },
    ShortVideoAds: {
      Platform: [
        {
          id: 2416,
          title: "Instagram",
        },
        {
          id: 2417,
          title: "Facebook",
        },
        {
          id: 2418,
          title: "YouTube",
        },
        {
          id: 2419,
          title: "Snapchat",
        },
        {
          id: 2420,
          title: "TikTok",
        },
        {
          id: 2421,
          title: "Twitter",
        },
        {
          id: 2422,
          title: "LinkedIn",
        },
        {
          id: 2423,
          title: "Pinterest",
        },
        {
          id: 2424,
          title: "Generic",
        },
      ],

      VideoType: [
        {
          id: 2425,
          title: "Not Defined",
        },
        {
          id: 2426,
          title: "Animated",
        },
        {
          id: 2427,
          title: "Live Action",
        },
        {
          id: 2428,
          title: "VIDEO ORIENTATION",
        },
        {
          id: 2429,
          title: "Vertical (9:16)",
        },
        {
          id: 2430,
          title: "Horizontal (16:9)",
        },
        {
          id: 2431,
          title: "Square (1:1)",
        },
        {
          id: 2432,
          title: "Any",
        },
      ],
    },
    CharacterAnimation: {
      AnimationType: [
        {
          id: 2433,
          title: "2D",
        },
        {
          id: 2434,
          title: "3D",
        },
      ],

      Industry: [
        {
          id: 2435,
          title: "Not Defined",
        },
        {
          id: 2436,
          title: "Advertising & Marketing",
        },
        {
          id: 2437,
          title: "Gaming",
        },
        {
          id: 2438,
          title: "Film & Video",
        },
        {
          id: 2439,
          title: "Medical",
        },
        {
          id: 2440,
          title: "Fashion",
        },
      ],
    },
    dProductAnimation: {
      Industry: [
        {
          id: 2441,
          title: "Not Defined",
        },
        {
          id: 2442,
          title: "Gaming",
        },
        {
          id: 2443,
          title: "Medical",
        },
        {
          id: 2444,
          title: "Architecture",
        },
        {
          id: 2445,
          title: "Film & Video",
        },
        {
          id: 2446,
          title: "Fashion",
        },
        {
          id: 2447,
          title: "Science",
        },
        {
          id: 2448,
          title: "Automotive",
        },
        {
          id: 2449,
          title: "Food",
        },
      ],
      Environment: [
        {
          id: 2450,
          title: "Realistic",
        },
        {
          id: 2451,
          title: "Neutral",
        },
      ],

      fileformat: [
        {
          id: 2452,
          title: "MP4",
        },
        {
          id: 2453,
          title: "MOV",
        },
        {
          id: 2454,
          title: "FBX",
        },
        {
          id: 2455,
          title: "Collada",
        },
        {
          id: 2456,
          title: "OBJ",
        },
      ],
    },
    LyricMusicVideos: {
      ServiceType: [
        {
          id: 2457,
          title: "MUSIC VISUALIZATION",
        },
        {
          id: 2458,
          title: "DANCE VIDEOS",
        },
        {
          id: 2459,
          title: "NARRATIVE-BASED VIDEOS",
        },
        {
          id: 2460,
          title: "PERFORMANCE VIDEOS",
        },
        {
          id: 2461,
          title: "CONCEPTUAL VIDEOS",
        },
        {
          id: 2462,
          title: "ANIME MUSIC VIDEOS",
        },
      ],
      VideoType: [
        {
          id: 2463,
          title: "Animated",
        },
        {
          id: 2464,
          title: "Live Action",
        },
      ],
    },
    AnimationForKids: {
      AnimationStyle: [
        {
          id: 2465,
          title: "Not Defined",
        },
        {
          id: 2466,
          title: "2D",
        },
        {
          id: 2467,
          title: "3D",
        },
        {
          id: 2468,
          title: "Stop Motion",
        },
      ],
      VideoType: [
        {
          id: 2469,
          title: "Not Defined",
        },
        {
          id: 2470,
          title: "Nursery Rhymes & Songs",
        },
        {
          id: 2471,
          title: "Educational",
        },
        {
          id: 2472,
          title: "Stories",
        },
      ],
    },
    AnimationForStreamers: {
      Column1: [
        {
          id: 2473,
          title: "STREAMING PLATFORM",
        },
        {
          id: 2474,
          title: "Not Defined",
        },
        {
          id: 2475,
          title: "Twitch",
        },
        {
          id: 2476,
          title: "YouTube",
        },
        {
          id: 2477,
          title: "Discord",
        },
        {
          id: 2478,
          title: "Mixer",
        },
        {
          id: 2479,
          title: "Facebook",
        },
        {
          id: 2480,
          title: "Periscope",
        },
      ],
      AssetType: [
        {
          id: 2481,
          title: "Not Defined",
        },
        {
          id: 2482,
          title: "Alerts & Notifications",
        },
        {
          id: 2483,
          title: "Scene Transitions",
        },
        {
          id: 2484,
          title: "Panels & Overlays",
        },
        {
          id: 2485,
          title: "Emotes",
        },
      ],
    },
    LiveActionExplainers: {
      Setting: [
        {
          id: 2486,
          title: "Seller Provides Location",
        },
        {
          id: 2487,
          title: "Client Provides Location",
        },
      ],
      VideoFileformat: [
        {
          id: 2488,
          title: "AVI",
        },
        {
          id: 2489,
          title: "FLV",
        },
        {
          id: 2490,
          title: "MOV",
        },
        {
          id: 2491,
          title: "MP4",
        },
        {
          id: 2492,
          title: "MPG",
        },
        {
          id: 2493,
          title: "SWF",
        },
        {
          id: 2494,
          title: "WMV",
        },
      ],
    },
    UnboxingVideos: {
      vediotype: [
        {
          id: 2495,
          title: "technical  review",
        },
        {
          id: 2496,
          title: "cinematic overveiw",
        },
        {
          id: 2497,
          title: "stop motion",
        },
      ],
      productType: [
        {
          id: 2498,
          title: "Arts & Crafts",
        },
        {
          id: 2499,
          title: "Automotive",
        },
        {
          id: 2500,
          title: "Beauty & Personal Care ",
        },
        {
          id: 2501,
          title: "Electronics",
        },
        {
          id: 2502,
          title: "Fashion",
        },
        {
          id: 2503,
          title: "Gaming",
        },
        {
          id: 2504,
          title: "Health",
        },
        {
          id: 2505,
          title: "High-End Accessories",
        },
        {
          id: 2506,
          title: "Home & Garden",
        },
        {
          id: 2507,
          title: "Luggage & Bags",
        },
        {
          id: 2508,
          title: "Mystery Boxes",
        },
        {
          id: 2509,
          title: "Pet Supply",
        },
        {
          id: 2510,
          title: "Sports & Outdoor",
        },
        {
          id: 2511,
          title: "Toys",
        },
      ],
    },
    DroneVideography: {
      Mediatype: [
        {
          id: 2512,
          title: "video& photo",
        },
        {
          id: 2513,
          title: "VR",
        },
      ],
      Themes: [
        {
          id: 2514,
          title: "City",
        },
        {
          id: 2515,
          title: "Mountains",
        },
        {
          id: 2516,
          title: "Beach & Water",
        },
        {
          id: 2517,
          title: "Forest",
        },
        {
          id: 2518,
          title: "Roads",
        },
        {
          id: 2519,
          title: "Buildings",
        },
        {
          id: 2520,
          title: "Desert",
        },
        {
          id: 2521,
          title: "Fields",
        },
        {
          id: 2522,
          title: "Interior",
        },
        {
          id: 2523,
          title: "Events",
        },
      ],

      DroneType: [
        {
          id: 2524,
          title: "Cameradrone",
        },
        {
          id: 2525,
          title: "racing & FPV Drone",
        },
      ],
    },
    productPhotography: {
      fileFormat: [
        {
          id: 2526,
          title: "JPG",
        },
        {
          id: 2527,
          title: "TIFF",
        },
        {
          id: 2528,
          title: "PNG",
        },
        {
          id: 2529,
          title: "PSD",
        },
        {
          id: 2530,
          title: "RAW",
        },
      ],
      PhotoSetting: [
        {
          id: 2531,
          title: "white Background",
        },
        {
          id: 2532,
          title: "indoor lifestyle",
        },
        {
          id: 2533,
          title: "outdoor lifestyle",
        },
        {
          id: 2534,
          title: "360 degree",
        },
        {
          id: 2535,
          title: "black background",
        },
      ],

      ProductType: [
        {
          id: 2536,
          title: "Beauty & Health",
        },
        {
          id: 2537,
          title: "Apparel",
        },
        {
          id: 2538,
          title: "Electronics",
        },
        {
          id: 2539,
          title: "Home & Kitchen",
        },
        {
          id: 2540,
          title: "Jewelry",
        },
        {
          id: 2541,
          title: "Food",
        },
        {
          id: 2542,
          title: "Kids & Toys",
        },
        {
          id: 2543,
          title: "Kids & Toys",
        },
        {
          id: 2544,
          title: "Pet Supplies",
        },
        {
          id: 2545,
          title: "Sports & Outdoors",
        },
        {
          id: 2546,
          title: "Shoes",
        },
      ],
    },
    AppWebsitePreviews: [
      {
        id: 2547,
        title: "Website",
      },
      {
        id: 2548,
        title: "Mobile And Application",
      },
    ],
    ElearingVideoProduction: [
      {
        id: 2549,
        title: "Video Production",
      },
      {
        id: 2550,
        title: "Narrated Presentation",
      },
      {
        id: 2551,
        title: "Animated",
      },
    ],
    LottieWebsiteAnimation: [
      {
        id: 2552,
        title: "JSON (Lottie)",
      },
      {
        id: 2553,
        title: "SVG",
      },
      {
        id: 2554,
        title: "GIF",
      },
      {
        id: 2555,
        title: "CSS",
      },
      {
        id: 2556,
        title: "HTML",
      },
      {
        id: 2557,
        title: "Java Script",
      },
    ],
    ScreencastingVideos: [
      {
        id: 2558,
        title: "Desktop",
      },
      {
        id: 2559,
        title: "Mobile",
      },
      {
        id: 2560,
        title: "Tablet",
      },
    ],
    SlideShowVideos: [
      {
        id: 2561,
        title: "Corporate Presentations",
      },
      {
        id: 2562,
        title: "eLearning",
      },
      {
        id: 2563,
        title: "Family & Travel",
      },
      {
        id: 2564,
        title: "Sports & Games",
      },
      {
        id: 2565,
        title: "Weddings & Events",
      },
    ],
    SubtitleCaptions: [
      {
        id: 2566,
        title: "Albanian",
      },
      {
        id: 2567,
        title: "Arabic",
      },
      {
        id: 2568,
        title: "Bengali",
      },
      {
        id: 2569,
        title: "Bosnian",
      },
      {
        id: 2570,
        title: "Catalan",
      },
      {
        id: 2571,
        title: "Chinese (Simplified)",
      },
      {
        id: 2572,
        title: "Chinese (Traditional)",
      },
      {
        id: 2573,
        title: "Croatian",
      },
      {
        id: 2574,
        title: "Czech",
      },
      {
        id: 2575,
        title: "Danish",
      },
      {
        id: 2576,
        title: "Dari",
      },
      {
        id: 2577,
        title: "Dutch",
      },
      {
        id: 2578,
        title: "English",
      },
      {
        id: 2579,
        title: "Estonian",
      },
      {
        id: 2580,
        title: "Filipino",
      },
      {
        id: 2581,
        title: "Finnish",
      },
      {
        id: 2582,
        title: "French",
      },
      {
        id: 2583,
        title: "Georgian",
      },
      {
        id: 2584,
        title: "German",
      },
      {
        id: 2585,
        title: "Greek",
      },
      {
        id: 2586,
        title: "Haitian Creole",
      },
      {
        id: 2587,
        title: "Hawaiian",
      },
      {
        id: 2588,
        title: "Hebrew",
      },
      {
        id: 2589,
        title: "Hindi",
      },
      {
        id: 2590,
        title: "Hungarian",
      },
      {
        id: 2591,
        title: "Icelandic",
      },
      {
        id: 2592,
        title: "Indonesian",
      },
      {
        id: 2593,
        title: "Irish Gaelic",
      },
      {
        id: 2594,
        title: "Italian",
      },
      {
        id: 2595,
        title: "Jamaican Patois",
      },
      {
        id: 2596,
        title: "Japanese",
      },
      {
        id: 2597,
        title: "Kazakh",
      },
      {
        id: 2598,
        title: "Korean",
      },
      {
        id: 2599,
        title: "Latin",
      },
      {
        id: 2600,
        title: "Latvian",
      },
      {
        id: 2601,
        title: "Lithuanian",
      },
      {
        id: 2602,
        title: "Luxembourgish",
      },
      {
        id: 2603,
        title: "Macedonian",
      },
      {
        id: 2604,
        title: "Malay",
      },
      {
        id: 2605,
        title: "Maltese",
      },
      {
        id: 2606,
        title: "Marathi",
      },
      {
        id: 2607,
        title: "Nepali",
      },
      {
        id: 2608,
        title: "Nigerian",
      },
      {
        id: 2609,
        title: "Norwegian",
      },
      {
        id: 2610,
        title: "Oriya",
      },
      {
        id: 2611,
        title: "Persian/Farsi",
      },
      {
        id: 2612,
        title: "Polish",
      },
      {
        id: 2613,
        title: "Portuguese",
      },
      {
        id: 2614,
        title: "Punjabi",
      },
      {
        id: 2615,
        title: "Romanian",
      },
      {
        id: 2616,
        title: "Russian",
      },
      {
        id: 2617,
        title: "Serbian",
      },
      {
        id: 2618,
        title: "Slovak",
      },
      {
        id: 2619,
        title: "Slovenian",
      },
      {
        id: 2620,
        title: "Somali",
      },
      {
        id: 2621,
        title: "Spanish",
      },
      {
        id: 2622,
        title: "Swahili",
      },
      {
        id: 2623,
        title: "Swedish",
      },
      {
        id: 2624,
        title: "Tagalog",
      },
      {
        id: 2625,
        title: "Tamil",
      },
      {
        id: 2626,
        title: "Thai",
      },
      {
        id: 2627,
        title: "Turkish",
      },
      {
        id: 2628,
        title: "Ukrainian",
      },
      {
        id: 2629,
        title: "Urdu",
      },
      {
        id: 2630,
        title: "Vietnamese",
      },
      {
        id: 2631,
        title: "Welsh",
      },
      {
        id: 2632,
        title: "Yiddish",
      },
    ],
    VideoEditing: [
      {
        id: 2633,
        title: "Ads & Social Media Videos",
      },
      {
        id: 2634,
        title: "Family & Travel Videos",
      },
      {
        id: 2635,
        title: "Gaming Videos",
      },
      {
        id: 2636,
        title: "Explainer Videos",
      },
      {
        id: 2637,
        title: "Corporate Videos",
      },
      {
        id: 2638,
        title: "Music Videos",
      },
      {
        id: 2639,
        title: "Wedding & Event Videos",
      },
      {
        id: 2640,
        title: "Fiction Films",
      },
      {
        id: 2641,
        title: "Showreels",
      },
      {
        id: 2642,
        title: "eLearning",
      },
      {
        id: 2643,
        title: "VR & 360",
      },
      {
        id: 2644,
        title: "Movie Trailers",
      },
    ],
    VisualEffect: [
      {
        id: 2645,
        title: "Rotoscoping & Keying",
      },
      {
        id: 2646,
        title: "Color Grading",
      },
      {
        id: 2647,
        title: "Match Moving",
      },
      {
        id: 2648,
        title: "Compositing",
      },
      {
        id: 2649,
        title: "Cleanups",
      },
      {
        id: 2650,
        title: "Beauty Retouching",
      },
    ],
  },
};
