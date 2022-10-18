import uuid from "react-native-uuid";

export const ElectricianOptions = {
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
  Bike: {
    Tyres_Wheel: [
      {
        id: 125,
        title: "Puncture Repair",
      },
      {
        id: 126,
        title: "Tyre Fitting",
      },
      {
        id: 127,
        title: "Wheel Bearing Fitting/Re-Grease/Axle Change",
      },
    ],
    Gear: [
      {
        id: 128,
        title: "Gear Adjustment",
      },
      {
        id: 129,
        title: "Gear Cable Fitting And Adjust",
      },
      {
        id: 130,
        title: "Gear Service Front & Back Gear,Existing Cable",
      },
      {
        id: 131,
        title: "Chain Fitting And Gear Adjustment",
      },
      {
        id: 132,
        title: "Front Gear Mechanism Fitting",
      },
      {
        id: 133,
        title: "Rear Gear Mechanism Fitting",
      },
      {
        id: 134,
        title: "Chain Wheel Or Casset Fitting",
      },
      {
        id: 135,
        title: "Bottom Bracket Fitting And Adjustment",
      },
      {
        id: 136,
        title: "Brake Service",
      },
      {
        id: 137,
        title: "Hydraulic Disk Brak Fluid Change",
      },

      {
        id: 138,
        title: "Break Disc Fit",
      },
    ],
    Genaral: [
      {
        id: 139,
        title: "Pedal Fit",
      },

      {
        id: 140,
        title: "Saddle Fit",
      },
      {
        id: 141,
        title: "Handle Bar Grips Fit",
      },
      {
        id: 142,
        title: "Handlebar Fit",
      },
      {
        id: 143,
        title: "Stem Fit",
      },
      {
        id: 144,
        title: "Mudguard Fit",
      },
      {
        id: 145,
        title: "Pannier Rack Fit",
      },
      {
        id: 146,
        title: "Headset Service",
      },
      {
        id: 147,
        title: "Fork Fitting",
      },
    ],
    SafetyCheck: [
      {
        id: 148,
        title: "Tyre Check,Tyre Pressure Check & Visual Assessment",
      },

      {
        id: 149,
        title: "Pre Ride-Service",
      },

      {
        id: 150,
        title: "Gear, Break, Headset, Tyre, Pressure,Safety And Bolt Check",
      },
    ],
  },
};
