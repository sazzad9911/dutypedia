import uuid from "react-native-uuid";

export const CookerOptions = {
  eventitems: {
    birthday: [
      {
        id: 1,
        title: "Cake",
      },
      {
        id: 2,
        title: "Biryani",
      },
      {
        id: 3,
        title: "Noodles",
      },
      {
        id: 4,
        title: "Payasam",
      },
      {
        id: 5,
        title: "pudding",
      },
    ],
    Picnic_Anniversary: [
      {
        id: 6,
        title: "Polao",
      },
      {
        id: 7,
        title: "Khicuri",
      },
      {
        id: 8,
        title: "biriyani",
      },
      {
        id: 9,
        title: "Gchicken roast",
      },
      {
        id: 10,
        title: "beef curry",
      },
      {
        id: 11,
        title: "chicken fry",
      },
      {
        id: 12,
        title: "Egg fry",
      },
    ],
  },

  hotelrestaurentitems: {
    Restaurant: [
      {
        id: 13,
        title: "Normal Restaurant",
      },
      {
        id: 14,
        title: "Sami Vip Restaurent",
      },
      {
        id: 15,
        title: "Vip Restaurent",
      },
    ],
    Hotel: [
      {
        id: 16,
        title: "Normal Hotel",
      },
      {
        id: 17,
        title: "3 Star Hotel",
      },
      {
        id: 18,
        title: "4 Star Hotel ",
      },
      {
        id: 19,
        title: "5 Star Hotel",
      },
      {
        id: 20,
        title: "7 Star Hotel",
      },
    ],
    breakfast: [
      {
        id: 21,
        title: "Two Fresh Eggs any style",
      },
      {
        id: 22,
        title: "Sausage",
      },
      {
        id: 23,
        title: "French Fries",
      },
      {
        id: 24,
        title: "Toast- 2 Slices",
      },
      {
        id: 25,
        title: "Parata- 2 Pcs",
      },
      {
        id: 26,
        title: "Chapatti- 2 pcs",
      },
      {
        id: 27,
        title: "Bhaji",
      },
      {
        id: 28,
        title: "Alur Dom",
      },
      {
        id: 29,
        title: "Sujir Halwa",
      },
      {
        id: 30,
        title: "Bread Basket- 6 Rolls of Bread",
      },
    ],
    Beverages: [
      {
        id: 31,
        title: "Variety of Juice",
      },
      {
        id: 32,
        title: "Coffee",
      },
      {
        id: 33,
        title: "Tea",
      },
      {
        id: 34,
        title: "Hot Chocolate",
      },
      {
        id: 35,
        title: "Milk",
      },
    ],
    Snacks: [
      {
        id: 36,
        title: "Kids Special Noodles",
      },
      {
        id: 37,
        title: "Beef Samosa 2 Pcs",
      },
      {
        id: 38,
        title: "Spring roll 2 Pcs",
      },
      {
        id: 39,
        title: "Butterfly Prawn 4 Pcs with dip",
      },
      {
        id: 40,
        title: "Immigration",
      },
      {
        id: 41,
        title: "Vegetable Singara 2 Pcs",
      },
      {
        id: 42,
        title: "Kabab Roll with choice of beef or chicken",
      },
      {
        id: 43,
        title: "Chicken Nugget 6 Pcs",
      },
      {
        id: 44,
        title: "Chen Kiev 6 Pcs",
      },
      {
        id: 45,
        title: "Fish Finger 6 Pcs",
      },
      {
        id: 46,
        title: "French Fries",
      },
      {
        id: 47,
        title: "Chicken Cutlet 2 Pcs",
      },
      {
        id: 48,
        title: "Beef Cutlet 2 Pcs",
      },
      {
        id: 49,
        title: "Prawn on Toast 2 Pcs",
      },
      {
        id: 50,
        title: "Mini Chicken Shashlic 2 Pcs",
      },
      {
        id: 51,
        title: "Jhal muri / Chanachur 3 Persons",
      },
      {
        id: 52,
        title: "French Toast 2 Pcs",
      },
      {
        id: 53,
        title: "Keema Chop 2 Pcs",
      },
      {
        id: 54,
        title: "Shammi Kabab 2 Pcs",
      },
      {
        id: 55,
        title: "Pantarash 2 Pcs",
      },
      {
        id: 56,
        title: "Fish Finger- served with French Fries and Mayonnaise",
      },
      {
        id: 57,
        title: "Bhaja Pora- vegetable pakora /beguni /peyaju 16 Pcs",
      },
      {
        id: 58,
        title: "Cheese Singara Platter 10 Pcs",
      },
    ],
  },
  Dinner_Lunch: {
    CharcoalChoice: [
      {
        id: 59,
        title: "CBBQ Chicken 1 Pc",
      },
      {
        id: 60,
        title: "Beef Sheek Kabab 1 Pc",
      },
      {
        id: 61,
        title: "Bangladeshi Delicacies(Serves 3 /4 Persons)",
      },
      {
        id: 62,
        title: "Chicken Bhuna",
      },
      {
        id: 63,
        title: "Chicken Korma",
      },
      {
        id: 64,
        title: "Chicken Do Piaza",
      },
      {
        id: 65,
        title: "Chicken Rezala",
      },
      {
        id: 66,
        title: "Butter Chicken",
      },
      {
        id: 67,
        title: "Shorshe Chicken",
      },

      {
        id: 68,
        title: "Chicken Jhal Frazee",
      },
      {
        id: 69,
        title: "Beef Curry",
      },
      {
        id: 70,
        title: "Beef Bhuna",
      },
      {
        id: 71,
        title: "Beef Rezala",
      },
      {
        id: 72,
        title: "Beef Korma",
      },
      {
        id: 73,
        title: "Beef Do Piaza",
      },
      {
        id: 74,
        title: "Handi Kabab",
      },
      {
        id: 75,
        title: "Acchari Beef",
      },
      {
        id: 76,
        title: "Shammi Kabab 4 Pcs",
      },
      {
        id: 77,
        title: "Beef Jalli Kabab 4 pcs",
      },
      {
        id: 78,
        title: "Mutton Rezala",
      },
      {
        id: 79,
        title: "Fish Curry 4pcs",
      },
      {
        id: 80,
        title: "Fish Do Piaza",
      },
      {
        id: 81,
        title: "Fish Jhol Torkari",
      },
      {
        id: 82,
        title: "Fish Bhuna",
      },
      {
        id: 83,
        title: "Prawn Do piazza",
      },
      {
        id: 84,
        title: "Chingri Macher Malaikari",
      },
      {
        id: 85,
        title: "Prawn Bhuna",
      },
      {
        id: 86,
        title:
          "Bhorta (Choose any – Begun Bhorta, Alu Bhorta, Barbati Bhorta, Patal Bhorta, Tomato Bhorta)",
      },
      {
        id: 87,
        title: "Daal Bhorta, Egg Bhorta, Chingri Bhorta,",
      },
      {
        id: 88,
        title: "Shutki Bhorta, Mach Bhorta, Sheem Bhorta,",
      },
      {
        id: 89,
        title: "Mixed Vegetable",
      },
      {
        id: 90,
        title: "Seasonal Vegetable Curry",
      },
      {
        id: 91,
        title: "Chinese Style Vegetable",
      },
      {
        id: 92,
        title: "Daal",
      },
      {
        id: 93,
        title: "Daal Chorchori",
      },
      {
        id: 94,
        title: "Seasonal Salad",
      },
      {
        id: 95,
        title: "Rice One Person",
      },
      {
        id: 96,
        title: "Dessert",
      },
      {
        id: 97,
        title: "Gurer Payesh",
      },
      {
        id: 98,
        title: "Brownie",
      },
      {
        id: 99,
        title: "Caramel Pudding (serves 6)",
      },
      {
        id: 100,
        title: "Caramel Pudding (serves 12)",
      },
      {
        id: 101,
        title: "Beverage",
      },
      {
        id: 102,
        title: "Tea",
      },
      {
        id: 103,
        title: "Coffee",
      },
      {
        id: 104,
        title: "Soft Drinks – Litre Bottle",
      },
      {
        id: 105,
        title: "Soft Drinks – 250 ml can",
      },
      {
        id: 106,
        title: "Bottled Mineral Water",
      },
    ],
    Soups: [
      {
        id: 107,
        title: "Chicken Corn Soup",
      },
      {
        id: 108,
        title: "Thai Soup",
      },
      {
        id: 109,
        title: "Chicken/ Beef Noodle Soup",
      },
    ],
    Sandwich: [
      {
        id: 110,
        title: "Homemade Chicken Sandwich 2 pcs",
      },
      {
        id: 111,
        title: "Club Sandwich with Chicken & Vegetable",
      },
    ],
    Pizzas: [
      {
        id: 112,
        title: "DChef’s special Beef Pizza",
      },
      {
        id: 113,
        title: "Chef’s Special Chicken Pizza",
      },
      {
        id: 114,
        title: "Chef’s Special Shrimp Pizza",
      },
    ],
    Pasta: [
      {
        id: 115,
        title: "Special Chicken Pasta",
      },
      {
        id: 116,
        title: "Special Beef pasta",
      },
    ],
    setmenu: [
      {
        id: 117,
        title: "MAINS food",
      },
      {
        id: 118,
        title: "rice bowl,vegetable curry,chicken fry & curry,1 soft drink",
      },
    ],
    Desserts: [
      {
        id: 119,
        title: "jorda",
      },
      {
        id: 120,
        title: "Rosogolla",
      },
      {
        id: 121,
        title: "ice cream",
      },
    ],
  },
  WeddingItems: {
    Wedding: [
      {
        id: 122,
        title: "Ring Ceremony",
      },
      {
        id: 123,
        title: "Mehndi Ceremony",
      },
      {
        id: 124,
        title: "Sangeet Ceremony ",
      },
      {
        id: 125,
        title: "Wedding Reception",
      },
    ],
    RiceItems: [
      {
        id: 126,
        title: "Basanti Pulao",
      },
      {
        id: 127,
        title: "White Rice",
      },
      {
        id: 128,
        title: "Fried Rice",
      },
      {
        id: 129,
        title: "Vegetable Rice",
      },
      {
        id: 130,
        title: "Biryani",
      },
      {
        id: 131,
        title: "Khichuri",
      },
      {
        id: 132,
        title: "Kacchi",
      },
    ],
    CurryItems: [
      {
        id: 133,
        title: "Alur Dom",
      },
      {
        id: 134,
        title: "Chilli Phulkopi",
      },
      {
        id: 135,
        title: "Chhanar Daalna Or Cottage Cheese Kofta Curry",
      },
      {
        id: 136,
        title: "Chholar Dal With Coconut And Beguni",
      },
      {
        id: 137,
        title: "Echorer Dalna",
      },
      {
        id: 138,
        title: "Beef Curry",
      },
      {
        id: 139,
        title: "Mutton Curry",
      },
      {
        id: 140,
        title: "Vegetable Curry",
      },
      {
        id: 141,
        title: "Chicken Curry",
      },
    ],
    CutletItems: [
      {
        id: 142,
        title: "Fish Cutlet",
      },
      {
        id: 143,
        title: "Koraishutir Kochuri",
      },
      {
        id: 144,
        title: "Kabiraji Cutlet",
      },
      {
        id: 145,
        title: "Potato Cutlet",
      },
      {
        id: 146,
        title: "Vegetable Cutlet",
      },
      {
        id: 147,
        title: "Chicken Cutlet",
      },
      {
        id: 148,
        title: "Mutton Cutlet",
      },
      {
        id: 149,
        title: "Beef Cutlet",
      },
    ],
    KebabItems: [
      {
        id: 150,
        title: "Reshmi Kebab",
      },
      {
        id: 151,
        title: "Chicken Kebab",
      },
      {
        id: 152,
        title: "Mutton Kebab",
      },
      {
        id: 153,
        title: "Beef Kebab",
      },
      {
        id: 154,
        title: "Mushroom Kebab",
      },
      {
        id: 155,
        title: "Hara Masala Kebab",
      },
      {
        id: 156,
        title: "Shami Kebab",
      },
      {
        id: 157,
        title: "Rajma Kebab",
      },
    ],
    FishItems: [
      {
        id: 158,
        title: "Ilish Paturi",
      },
      {
        id: 159,
        title: "Doi Rui",
      },
      {
        id: 160,
        title: "Maacher Chop",
      },
      {
        id: 161,
        title: "Chingri Malaikari",
      },
      {
        id: 162,
        title: "Any Fish Fry",
      },
    ],
    ChickenItems: [
      {
        id: 163,
        title: "Chicken Fry",
      },
      {
        id: 164,
        title: "Chicken Rezala",
      },
      {
        id: 165,
        title: "Chicken Chaap",
      },
      {
        id: 166,
        title: "Berbecue Chicken",
      },
    ],
    BeefItems: [
      {
        id: 167,
        title: "Beef Brisket",
      },
      {
        id: 168,
        title: "Beef Casserole",
      },
      {
        id: 169,
        title: "Beef Steaks",
      },
      {
        id: 170,
        title: "Beef Stew",
      },
      {
        id: 171,
        title: "Beef Stroganoff",
      },
      {
        id: 172,
        title: "Corned Beef",
      },
      {
        id: 173,
        title: "Meatballs",
      },
      {
        id: 174,
        title: "Meatloaf",
      },
    ],
    DessertItems: [
      {
        id: 175,
        title: "Jorda",
      },
      {
        id: 176,
        title: "Borhani",
      },
      {
        id: 177,
        title: "Rosogolla",
      },
      {
        id: 178,
        title: "Mishti Doi",
      },
      {
        id: 179,
        title: "Kheer Kodom",
      },
      {
        id: 180,
        title: "Langcha",
      },
      {
        id: 181,
        title: "Chennar Jilipi",
      },
      {
        id: 182,
        title: "Ice Cream",
      },
      {
        id: 183,
        title: "Soft Drinks",
      },
    ],
  },
};
