import uuid from "uuid";

export const LawyerOptions = {
  Bankruptcy: [
    {
      id: 1,
      title: "Debt Relief ",
    },
    {
      id: 2,
      title: "Asset Protection",
    },
    {
      id: 3,
      title: "Chapter 7 Bankruptcy",
    },
    {
      id: 4,
      title: "Chapter 13 Bankruptcy",
    },
    {
      id: 5,
      title: "Chapter 11 Bankruptcy",
    },
  ],
  Business: [
    {
      id: 6,
      title: "Contracts",
    },
    {
      id: 7,
      title: "Business Formation",
    },
    {
      id: 8,
      title: "Litigation",
    },
    {
      id: 9,
      title: "Debt Collection",
    },
  ],
  Civil: [
    {
      id: 10,
      title: "Civil Law Service Aor Aboriginal Communities",
    },
    {
      id: 11,
      title: "Coronial Inquest Unit",
    },
    {
      id: 12,
      title: "DRLS (Disaster Response Legal Service)",
    },
    {
      id: 13,
      title: "Employment Law Services",
    },
    {
      id: 14,
      title: "Homeless Outreach Legal Service",
    },
    {
      id: 15,
      title: "Human Rights Committee",
    },
    {
      id: 16,
      title: "Immigration Service",
    },
    {
      id: 17,
      title: "Mental Health Advocacy Service",
    },
    {
      id: 18,
      title: "Mortgage Hardship Service",
    },
    {
      id: 19,
      title: "Older Person's Legal And Education Program",
    },
    {
      id: 20,
      title: "Refugee Service",
    },
    {
      id: 21,
      title: "Sexual Assault Communications Privilege Service",
    },
    {
      id: 22,
      title: "Social Security Service",
    },
    {
      id: 23,
      title: "Veterans' Advocacy Service",
    },
    {
      id: 24,
      title: "Work And Development Order Service",
    },
  ],
  Constitutional: [
    {
      id: 25,
      title: "State And Legal Structure",
    },
    {
      id: 26,
      title: "Human Rights",
    },
    {
      id: 27,
      title: "Legislative Procedure",
    },
    {
      id: 28,
      title: "Study Of Constitutional Law",
    },
    {
      id: 29,
      title: "The Rule Of Law",
    },
    {
      id: 30,
      title: "The Separation Of Powers",
    },
    {
      id: 31,
      title: "See Also",
    },
    {
      id: 32,
      title: "References",
    },
    {
      id: 33,
      title: "External Links",
    },
  ],
  Criminal: [
    {
      id: 34,
      title: "Assignment Of The Case",
    },
    {
      id: 35,
      title: "Interview About The Case",
    },
    {
      id: 36,
      title: "Investigation Into The Case",
    },
    {
      id: 37,
      title: "Analysis Of Evidence",
    },
    {
      id: 38,
      title: "Continued Contact With The Client",
    },
    {
      id: 39,
      title: "Jury Selection",
    },
    {
      id: 40,
      title: "Plea Bargaining",
    },
    {
      id: 41,
      title: "Trial Participation",
    },
    {
      id: 42,
      title: "Sentencing",
    },
  ],
  Environmental: [
    {
      id: 43,
      title: "Water Quality, Air Quality, And Pollution",
    },
    {
      id: 44,
      title: "Proper Disposal Of Hazardous Waste",
    },
    {
      id: 45,
      title: "Animal Rights And Species Protection",
    },
    {
      id: 46,
      title: "Farming And Agriculture Issues",
    },
    {
      id: 47,
      title: "Preserving Wetlands And Protecting Biodiversity",
    },
    {
      id: 48,
      title: "Better Waste Management Systems",
    },
    {
      id: 49,
      title: "Sustainability And Green Strategies For The Future",
    },
    {
      id: 50,
      title:
        "Green Initiatives (For Everyone From Parks To Cities To Corporations)",
    },
    {
      id: 51,
      title: "Improved Energy Sources And Clean Technology",
    },
    {
      id: 52,
      title: "National Green Standards And New Environmental Legislation",
    },
    {
      id: 53,
      title: "Climate Change Laws And Innovation",
    },
    {
      id: 54,
      title: "Native Titles For Land And Environmental Rights",
    },
    {
      id: 55,
      title: "Public Land Use And Sea Use",
    },
    {
      id: 56,
      title:
        "Resources And Laws Governing Resource Use (Oil, Natural Gas, Gold, Etc)",
    },
  ],
  Estate: [
    {
      id: 57,
      title: "Life Insurance",
    },
    {
      id: 58,
      title: "Real Estate",
    },
    {
      id: 59,
      title: "AutomobilesVehicles",
    },
    {
      id: 60,
      title: "Tangible Personal Property : Jewelry, Furniture, Arts, Etc",
    },
    {
      id: 61,
      title: "Bank Accunt",
    },
    {
      id: 62,
      title: "Certificates Of Deposite",
    },
    {
      id: 63,
      title: "Annuities",
    },
    {
      id: 64,
      title: "Pension Plan",
    },
    {
      id: 65,
      title: "Investment",
    },
    {
      id: 66,
      title: "Business Interest",
    },
    {
      id: 67,
      title: "Future Inheritances",
    },
    {
      id: 68,
      title: "Interests In Estates Or Trust",
    },
    {
      id: 69,
      title: "Outstanding Liabilities",
    },
    {
      id: 70,
      title: "Fiduciaries",
    },
  ],
  Family: [
    {
      id: 71,
      title: "Divorce",
    },
    {
      id: 72,
      title: "Adoption",
    },
    {
      id: 73,
      title: "Guardianship",
    },
    {
      id: 74,
      title: "Emancipation",
    },
  ],
  Immigration: [
    {
      id: 75,
      title: "Express Entry",
    },
    {
      id: 76,
      title: "Quebec Skilled Worker",
    },
    {
      id: 77,
      title: "Provincial Nomination Program",
    },
    {
      id: 78,
      title: "Family Class Sponsorship",
    },
    {
      id: 79,
      title: "Study Program",
    },
    {
      id: 80,
      title: "Business Enterpreneur",
    },
    {
      id: 81,
      title: "Lobour Visa",
    },
    {
      id: 82,
      title: "Citizenship ",
    },
    {
      id: 83,
      title: "Visa Renew",
    },
    {
      id: 84,
      title: "Business Visa",
    },
  ],
  Intellectual: [
    {
      id: 85,
      title: "Patent",
    },
    {
      id: 86,
      title: "Trademark",
    },
    {
      id: 87,
      title: "Copyrights",
    },
    {
      id: 88,
      title: "Trade Ecrets",
    },
  ],
  Labor: [
    {
      id: 89,
      title: "Union procedures",
    },
    {
      id: 90,
      title: "Labor Law Litigation",
    },
    {
      id: 91,
      title: "Lobbying",
    },
    {
      id: 92,
      title: "Other Employment Laws",
    },
  ],
  Medical: [
    {
      id: 93,
      title: "Duty Of Care",
    },
    {
      id: 94,
      title: "Causation",
    },
    {
      id: 95,
      title: "Strayed From Standard Of Care",
    },
    {
      id: 96,
      title: "Injuries Were The Result Of Negligence",
    },
  ],
  Personal: [
    {
      id: 97,
      title: "Auto Accident Injuries",
    },
    {
      id: 98,
      title: "Nursing Home Abuse",
    },
    {
      id: 99,
      title: "Premises Liability",
    },
    {
      id: 100,
      title: "Workers Compensation",
    },
    {
      id: 101,
      title: "Wrongful Death",
    },
    {
      id: 102,
      title: "Medical Malpractice",
    },
    {
      id: 103,
      title: "Product Liability",
    },
    {
      id: 104,
      title: "Mesothelioma And Asbestosis",
    },
    {
      id: 105,
      title: "Fela Injury",
    },
  ],
  Real: [
    {
      id: 106,
      title: "State Or Lender Requirement",
    },
    {
      id: 107,
      title: "Contractual Issues With The Purchase",
    },
    {
      id: 108,
      title: "Peace Of Mind",
    },
  ],
  Tax: [
    {
      id: 109,
      title: "City Tax",
      value: "debt-relief",
    },
    {
      id: 110,
      title: "Individual Income Taxes",
      value: "asset-protection",
    },
    {
      id: 111,
      title: "Corporate Income Taxes",
      value: "chapter-7-bankruptcy",
    },
    {
      id: 112,
      title: "Payroll Taxes",
      value: "chapter-13-bankruptcy",
    },
    {
      id: 113,
      title: "Capital Gains Taxes",
      value: "debt-relief",
    },
    {
      id: 114,
      title: "Sales Taxes",
      value: "asset-protection",
    },
    {
      id: 115,
      title: "Gross Receipts Taxes",
      value: "chapter-7-bankruptcy",
    },
    {
      id: 116,
      title: "Value-Added Taxes",
      value: "chapter-13-bankruptcy",
    },
    {
      id: 117,
      title: "Excise Taxes",
      value: "chapter-13-bankruptcy",
    },
  ],
};
