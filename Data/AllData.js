import builder_1 from "../assets/Images/builder_1.jpg";
import uuid from "react-native-uuid";
import { BuilderOptions } from "./../Data/builder";
import {
  BuilderIcon,
  BusinessServiceIcon,
  CookerIcon,
  ElectricIcon,
  EntertainmentIcon,
  HouseKeeperIcon,
  ItIcon,
  MusicIcon,
  PainterIcon,
  OnlineTutionIcon,
  SaloonIcon,
  RentIcon,
} from "../assets/icon";
import business from "../assets/Images/business.webp";
import { BusinessOptions } from "./../Data/business";
import { CookerOptions } from "./../Data/cooker";
import { ElectricianOptions } from "./../Data/electrician";
import electrician from "../assets/Images/electrician.webp";
import entertainment from "../assets/Images/entertainment.webp";
import { EntertainmentOptions } from "./../Data/entertainment";
import MainHouseKeeper from "./../Data/MainHouseKeeper";
import it from "../assets/Images/it.webp";
import { ItOptions } from "./../Data/it";
import musicaudio from "../assets/Images/musicaudio.webp";
import { MusicAudioOptions } from "./../Data/musicaudio";
import MainPainter from "./../Data/MainPainter";
import { OnlineTutionOptions } from "./../Data/onlinetution";
import onlinetution from "../assets/Images/onlinetution.webp";
import parlour from "../assets/Images/parlour.webp";
import { ParlorOptions } from "./../Data/parlor";
import MainLabor from "./../Data/MainLabor";
import head from "../assets/Images/head.webp";
import { lawyer, lifeStyle } from "./../assets/icon";
import { LawyerOptions } from "./lawyer";
import lifestyle from "../assets/Images/lifestyle.webp";
import { LifeStyleOptions } from "../Data/lifestyle";
import bs from '../assets/backgrounds/bs.jpg'
import ck from '../assets/backgrounds/ck.jpg'
import en from '../assets/backgrounds/en.jpg'
import ent from '../assets/backgrounds/ent.png'
import hc from '../assets/backgrounds/hc.jpg'
import its from '../assets/backgrounds/it.jpg'
import law from '../assets/backgrounds/law.jpg'
import lb from '../assets/backgrounds/lb.jpg'
import music from '../assets/backgrounds/music.jpg'
import ppt from '../assets/backgrounds/ppt.jpg'
import salon from '../assets/backgrounds/salon.jpg'
import tutor from '../assets/backgrounds/tutor.jpg'
import life from '../assets/backgrounds/life.jpg'
import bu from '../assets/backgrounds/bu.png'

export const AllData = [
  {
    title: "Builder Services",
    icon: BuilderIcon,
    color: "#FF9C68",
    image: builder_1,
    picture:bu,
    key:"BUIDLER",
    data: [
      {
        title: "Bridge Builder",
        list: [
          {
            title: "Bridge Builder",
            data: BuilderOptions.bridgebuilder,
          },
        ],
      },
      {
        title: "Carpenter",
        list: [
          {
            title: "Carpenter",
            data: BuilderOptions.carpenter,
          },
        ],
      },
      {
        title: "House Builder",
        list: [
          {
            title: "House Builder",
            data: BuilderOptions.housebuilder,
          },
        ],
      },
      {
        title: "Jewellary Items",
        list: [
          {
            title: "Jewelry Items",
            data: BuilderOptions.jewellaryitems.JewelryItems,
          },
          {
            title: "Goldsmith Services",
            data: BuilderOptions.jewellaryitems.GoldsmithServices,
          },
          {
            title: "Gold Type",
            data: BuilderOptions.jewellaryitems.GoldType,
          },
          {
            title: "Types Of Diamonds",
            data: BuilderOptions.jewellaryitems.TypesOfDiamonds,
          },
        ],
      },
      {
        title: "Office Builder",
        list: [
          {
            title: "Office Builder",
            data: BuilderOptions.officebuilder,
          },
        ],
      },
      {
        title: "Road Construction",
        list: [
          {
            title: "Road Construction",
            data: BuilderOptions.roadconstruction,
          },
        ],
      },
      {
        title: "Tailor Service",
        list: [
          {
            title: "Ladies Dress",
            data: BuilderOptions.tailorservice.LadiesDress,
          },
          {
            title: "Jeans Dress",
            data: BuilderOptions.tailorservice.JeansDress,
          },
          {
            title: "Baby Dress",
            data: BuilderOptions.tailorservice.BabyDress,
          },
        ],
      },
    ],
  },
  {
    title: "Business Services",
    icon: BusinessServiceIcon,
    color: "blue",
    image: business,
    picture:bs,
    key:"BUSINESS",
    data: [
      {
        title: "Branding Services",
        list: [
          {
            title: "Branding Services",
            data: BusinessOptions.BRANDINGSERVICES,
          },
        ],
      },
      {
        title: "Business Consulting",
        list: [
          {
            title: "Industry",
            data: BusinessOptions.BusinessConsulting.Industry,
          },
          {
            title: "Purpose",
            data: BusinessOptions.BusinessConsulting.Purpose,
          },
        ],
      },
      {
        title: "Business Plans",
        list: [
          {
            title: "Business Type",
            data: BusinessOptions.BusinessPlans.BusinessType,
          },
          {
            title: "Plan Format",
            data: BusinessOptions.BusinessPlans.PlanFormat,
          },
          {
            title: "Plan Purpose",
            data: BusinessOptions.BusinessPlans.PlanPurpose,
          },
        ],
      },
      {
        title: "Career Counseling",
        list: [
          {
            title: "Career Counseling",
            data: BusinessOptions.CAREERCOUNSELING,
          },
        ],
      },
      {
        title: "Customer Care",
        list: [
          {
            title: "Timezone",
            data: BusinessOptions.CustomerCare.Timezone,
          },
          {
            title: "Support Software",
            data: BusinessOptions.CustomerCare.SupportSoftware,
          },
          {
            title: "Knowledgebase Software",
            data: BusinessOptions.CustomerCare.KnowledgebaseSoftware,
          },
          {
            title: "Social Media Platform",
            data: BusinessOptions.CustomerCare.SocialMediaPlatform,
          },
          {
            title: "Service Type",
            data: BusinessOptions.CustomerCare.ServiceType_2,
          },
          {
            title: "Industry",
            data: BusinessOptions.CustomerCare.Industry,
          },
        ],
      },
      {
        title: "Data Entry",
        list: [
          {
            title: "Service Type",
            data: BusinessOptions.DataEntry.ServiceType,
          },
          {
            title: "Tool",
            data: BusinessOptions.DataEntry.Tool,
          },
        ],
      },
      {
        title: "E-Commerce Management",
        list: [
          {
            title: "Service Type",
            data: BusinessOptions.ECommerceManagement.ServiceType,
          },
          {
            title: "Industry",
            data: BusinessOptions.ECommerceManagement.Industry,
          },
          {
            title: "Platform",
            data: BusinessOptions.ECommerceManagement.Platform,
          },
        ],
      },
      {
        title: "Financial Consulting",
        list: [
          {
            title: "Service Type",
            data: BusinessOptions.FinancialConsulting.ServiceType,
          },
          {
            title: "Industry",
            data: BusinessOptions.FinancialConsulting.Industry,
          },
        ],
      },
      {
        title: "Game Concept Design",
        list: [
          {
            title: "Genre",
            data: BusinessOptions.GameConceptDesign.Genre,
          },
          {
            title: "Game Type",
            data: BusinessOptions.GameConceptDesign.GameType,
          },
          {
            title: "Platform Type",
            data: BusinessOptions.GameConceptDesign.PlatformType,
          },
          {
            title: "Monetization Model",
            data: BusinessOptions.GameConceptDesign.MonetizationModel,
          },
          {
            title: "Purpose",
            data: BusinessOptions.GameConceptDesign.Purpose,
          },
        ],
      },
      {
        title: "Hr Consulting",
        list: [
          {
            title: "Service Type",
            data: BusinessOptions.HrConsulting.ServiceType,
          },
          {
            title: "Industry",
            data: BusinessOptions.HrConsulting.Industry,
          },
        ],
      },
      {
        title: "Lead Generation",
        list: [
          {
            title: "Lead Generation",
            data: BusinessOptions.LEADGENERATION,
          },
        ],
      },
      {
        title: "Legal Consulting",
        list: [
          {
            title: "Service Type",
            data: BusinessOptions.LegalConsulting.ServiceType,
          },
          {
            title: "Field Of Law",
            data: BusinessOptions.LegalConsulting.FieldOfLaw,
          },
          {
            title: "Document Type",
            data: BusinessOptions.LegalConsulting.DocumentType,
          },
          {
            title: "Agreement Type",
            data: BusinessOptions.LegalConsulting.AgreementType,
          },
        ],
      },
      {
        title: "Market Research",
        list: [
          {
            title: "Market Research",
            data: [],
          },
        ],
      },
      {
        title: "Presentations",
        list: [
          {
            title: "Service Type",
            data: BusinessOptions.PRESENTATIONS.ServiceType,
          },
          {
            title: "Presentation Type",
            data: BusinessOptions.PRESENTATIONS.PresentationType,
          },
          {
            title: "Industry",
            data: BusinessOptions.PRESENTATIONS.Industry,
          },
        ],
      },
      {
        title: "Printer",
        list: [
          {
            title: "Printer",
            data: [],
          },
        ],
      },
      {
        title: "Project Management",
        list: [
          {
            title: "Project Management",
            data: BusinessOptions.PROJECTMANAGEMENT,
          },
        ],
      },
      {
        title: "Supply Chain Management",
        list: [
          {
            title: "Service Type",
            data: BusinessOptions.SupplyChainManagement.ServiceType,
          },
          {
            title: "Product Type",
            data: BusinessOptions.SupplyChainManagement.ProductType,
          },
        ],
      },
      {
        title: "Virtual Assistant",
        list: [
          {
            title: "Service Type",
            data: BusinessOptions.VIRTUALASSISTANT.ServiceType,
          },
          {
            title: "Purpose",
            data: BusinessOptions.VIRTUALASSISTANT.Purpose,
          },
          {
            title: "Industry",
            data: BusinessOptions.VIRTUALASSISTANT.Industry,
          },
        ],
      },
    ],
  },
  {
    title: "Cooker Service",
    icon: CookerIcon,
    color: "#ED488B",
    image: builder_1,
    picture:ck,
    key:"COOKER",
    data: [
      {
        title: "Dinner & lunch",
        list: [
          {
            title: "Charcoal Choice",
            data: CookerOptions.Dinner_Lunch.CharcoalChoice,
          },
          {
            title: "Soups",
            data: CookerOptions.Dinner_Lunch.Soups,
          },
          {
            title: "Sandwich",
            data: CookerOptions.Dinner_Lunch.Sandwich,
          },
          {
            title: "Pizzas",
            data: CookerOptions.Dinner_Lunch.Pizzas,
          },
          {
            title: "Pasta",
            data: CookerOptions.Dinner_Lunch.Pasta,
          },
          {
            title: "Set Menu",
            data: CookerOptions.Dinner_Lunch.setmenu,
          },
          {
            title: "Desserts",
            data: CookerOptions.Dinner_Lunch.Desserts,
          },
        ],
      },
      {
        title: "Events Items",
        list: [
          {
            title: "Birthday",
            data: CookerOptions.eventitems.birthday,
          },
          {
            title: "Picnic Anniversary",
            data: CookerOptions.eventitems.Picnic_Anniversary,
          },
        ],
      },
      {
        title: "Hotel / Restaurant Items",
        list: [
          {
            title: "Restaurant",
            data: CookerOptions.hotelrestaurentitems.Restaurant,
          },
          {
            title: "Hotel",
            data: CookerOptions.hotelrestaurentitems.Hotel,
          },
          {
            title: "Breakfast",
            data: CookerOptions.hotelrestaurentitems.breakfast,
          },
          {
            title: "Beverages",
            data: CookerOptions.hotelrestaurentitems.Beverages,
          },
          {
            title: "Snacks",
            data: CookerOptions.hotelrestaurentitems.Snacks,
          },
        ],
      },
      {
        title: "Wedding Items",
        list: [
          {
            title: "Wedding",
            data: CookerOptions.WeddingItems.Wedding,
          },
          {
            title: "Rice Items",
            data: CookerOptions.WeddingItems.RiceItems,
          },
          {
            title: "Curry Items",
            data: CookerOptions.WeddingItems.CurryItems,
          },
          {
            title: "Cutlet Items",
            data: CookerOptions.WeddingItems.CutletItems,
          },
          {
            title: "Kebab Items",
            data: CookerOptions.WeddingItems.KebabItems,
          },
          {
            title: "Fish Items",
            data: CookerOptions.WeddingItems.FishItems,
          },
          {
            title: "Chicken Items",
            data: CookerOptions.WeddingItems.ChickenItems,
          },
          {
            title: "Beef Items",
            data: CookerOptions.WeddingItems.BeefItems,
          },
          {
            title: "Dessert Items",
            data: CookerOptions.WeddingItems.DessertItems,
          },
        ],
      },
    ],
  },
  {
    title: "Electrician & Mechanician",
    icon: ElectricIcon,
    color: "#FFB800",
    image: electrician,
    picture:en,
    key:"ELECTRICIAN",
    data: [
      {
        title: "Ac",
        list: [
          {
            title: "Ac",
            data: ElectricianOptions.Ac,
          },
        ],
      },
      {
        title: "Bicycle",
        list: [
          {
            title: "Bicycle",
            data: ElectricianOptions.Bicycle,
          },
        ],
      },
      {
        title: "Car",
        list: [
          {
            title: "Car",
            data: ElectricianOptions.Car,
          },
        ],
      },
      {
        title: "Camera",
        list: [
          {
            title: "Camera",
            data: ElectricianOptions.Camera,
          },
        ],
      },
      {
        title: "Refrigerator",
        list: [
          {
            title: "Refrigerator",
            data: ElectricianOptions.Refrigerator,
          },
        ],
      },
      {
        title: "Mobile",
        list: [
          {
            title: "Mobile",
            data: ElectricianOptions.Mobile,
          },
        ],
      },
      {
        title: "Pc",
        list: [
          {
            title: "Pc",
            data: ElectricianOptions.Pc,
          },
        ],
      },
      {
        title: "Printer",
        list: [
          {
            title: "Printer",
            data: ElectricianOptions.Printer,
          },
        ],
      },
      {
        title: "Bike",
        list: [
          {
            title: "Tyres Wheel",
            data: ElectricianOptions.Bike.Tyres_Wheel,
          },
          {
            title: "Gear",
            data: ElectricianOptions.Bike.Gear,
          },
          {
            title: "Genaral",
            data: ElectricianOptions.Bike.Genaral,
          },
          {
            title: "Safety Check",
            data: ElectricianOptions.Bike.SafetyCheck,
          },
        ],
      },
    ],
  },
  {
    title: "Entertainment",
    icon: EntertainmentIcon,
    color: "#8E4DD5",
    image: entertainment,
    picture:ent,
    key:"ENTERTAINMENT",
    data: [
      {
        title: "Videographer Services",
        list: [
          {
            title: "Services",
            data: EntertainmentOptions.VideographerServices.Services,
          },
          {
            title: "Video Shoot",
            data: EntertainmentOptions.VideographerServices.VideoShoot,
          },
        ],
      },
      {
        title: "Photographer Services",
        list: [
          {
            title: "Sessions",
            data: EntertainmentOptions.photographer_services.Sessions,
          },
          {
            title: "Photography Style",
            data: EntertainmentOptions.photographer_services.photography_style,
          },
        ],
      },
      {
        title: "Picnic",
        list: [
          {
            title: "All City Picnic Spot",
            data: EntertainmentOptions.picnic.all_city_picnic_spot,
          },
          {
            title: "Vehicles",
            data: EntertainmentOptions.picnic.Vehicles,
          },
        ],
      },
      {
        title: "Birthday",
        list: [
          {
            title: "Birthday",
            data: EntertainmentOptions.Birthday,
          },
        ],
      },
      {
        title: "Wedding",
        list: [
          {
            title: "Wedding",
            data: EntertainmentOptions.wedding,
          },
        ],
      },
    ],
  },
  {
    title: "House Keeper",
    icon: HouseKeeperIcon,
    color: "#FF4155",
    image: entertainment,
    picture:hc,
    key:"HOUSEKEEPER",
    list: [
      {
        title: "House Keeper",
        data: MainHouseKeeper,
      },
    ],
  },
  {
    title: "It & Technology",
    icon: ItIcon,
    color: "#2381FF",
    image: it,
    picture:its,
    key:"IT",
    data: [
      {
        title: "Data",
        image: it,
        data: [
          {
            title: "Database",
            list: [
              {
                title: "Category",
                data: ItOptions.Data.Databases.Category,
              },
              {
                title: "Database Type",
                data: ItOptions.Data.Databases.DatabaseType,
              },
              {
                title: "Platform",
                data: ItOptions.Data.Databases.Platform,
              },
              {
                title: "Cloud Platform",
                data: ItOptions.Data.Databases.CloudPlatform,
              },
              {
                title: "Expertise",
                data: ItOptions.Data.Databases.Expertise,
              },
            ],
          },
          {
            title: "Data Processing",
            list: [
              {
                title: "Service Type",
                data: ItOptions.Data.DataProcessing.ServiceType,
              },
              {
                title: "Technology",
                data: ItOptions.Data.DataProcessing.Technology,
              },
              {
                title: "ScrapingTechnique",
                data: ItOptions.Data.DataProcessing.ScrapingTechnique,
              },
              {
                title: "Information Type",
                data: ItOptions.Data.DataProcessing.InformationType,
              },
              {
                title: "Expertise",
                data: ItOptions.Data.DataProcessing.Expertis,
              },
            ],
          },
          {
            title: "Data Analytics",
            list: [
              {
                title: "Service Type",
                data: ItOptions.Data.DataAnalytics.ServiceType,
              },
              {
                title: "Technology",
                data: ItOptions.Data.DataAnalytics.Technology,
              },
              {
                title: "Analysis Type",
                data: ItOptions.Data.DataAnalytics.AnalysisType,
              },
              {
                title: "Expertise",
                data: ItOptions.Data.DataAnalytics.Expertise,
              },
            ],
          },
          {
            title: "Data Visualization",
            list: [
              {
                title: "Service Type",
                data: ItOptions.Data.DataVisualization.ServiceType,
              },
              {
                title: "Tool",
                data: ItOptions.Data.DataVisualization.Tool,
              },
              {
                title: "Chart Type",
                data: ItOptions.Data.DataVisualization.ChartType,
              },
            ],
          },
          {
            title: "Data Science",
            list: [
              {
                title: "Service Type",
                data: ItOptions.Data.DataScience.ServiceType,
              },
              {
                title: "Models & Methods",
                data: ItOptions.Data.DataScience.Models_Methods,
              },
              {
                title: "Technology",
                data: ItOptions.Data.DataScience.Technology,
              },
              {
                title: "Expertise",
                data: ItOptions.Data.DataScience.Expertise,
              },
            ],
          },
          {
            title: "Data Entry",
            list: [
              {
                title: "Type",
                data: ItOptions.Data.DataEntry.Type,
              },
              {
                title: "Tool",
                data: ItOptions.Data.DataEntry.Tool,
              },
            ],
          },
        ],
      },
      {
        title: "Graphic",
        image: it,
        data: [
          {
            title: "Graphics For Streamers",
            list: [
              {
                title: "Asset Type",
                data: ItOptions.Graphic.GraphicsForStreamers.AssetType,
              },
              {
                title: "Streaming Platform",
                data: ItOptions.Graphic.GraphicsForStreamers.StreamingPlatform,
              },
            ],
          },
          {
            title: "Business Cards",
            list: [
              {
                title: "Main Type",
                data: ItOptions.Graphic.BusinessCards.MainType,
              },
              {
                title: "Image File Format",
                data: ItOptions.Graphic.BusinessCards.ImageFileFormat,
              },
            ],
          },
          {
            title: "Illustration",
            list: [
              {
                title: "Artistic Technique",
                data: ItOptions.Graphic.Illustration.ArtisticTechnique,
              },
              {
                title: "Style",
                data: ItOptions.Graphic.Illustration.Style,
              },
              {
                title: "Theme",
                data: ItOptions.Graphic.Illustration.Theme,
              },
              {
                title: "Subject",
                data: ItOptions.Graphic.Illustration.Subject,
              },
            ],
          },
          {
            title: "Pattern Design",
            list: [
              {
                title: "Design Technique",
                data: ItOptions.Graphic.PatternDesign.DesignTechnique,
              },
              {
                title: "Design Style",
                data: ItOptions.Graphic.PatternDesign.DesignStyle,
              },
              {
                title: "Purpose",
                data: ItOptions.Graphic.PatternDesign.Purpose,
              },
              {
                title: "Pattern Theme",
                data: ItOptions.Graphic.PatternDesign.PatternTheme,
              },
            ],
          },
          {
            title: "Flyer Design",
            list: [
              {
                title: "Format Type",
                data: ItOptions.Graphic.FlyerDesign.FormatType,
              },
              {
                title: "Image File Format",
                data: ItOptions.Graphic.FlyerDesign.ImageFileFormat,
              },
            ],
          },
          {
            title: "Book Design",
            list: [
              {
                title: "Design Style",
                data: ItOptions.Graphic.BookDesign.DesignStyle,
              },
              {
                title: "Genre",
                data: ItOptions.Graphic.BookDesign.Genre,
              },
              {
                title: "File Format",
                data: ItOptions.Graphic.BookDesign.FileFormat,
              },
            ],
          },
          {
            title: "Album Cover Design",
            list: [
              {
                title: "Design Style",
                data: ItOptions.Graphic.AlbumCoverDesign.DesignStyle,
              },
              {
                title: "Musical Genre",
                data: ItOptions.Graphic.AlbumCoverDesign.MesicalGenre,
              },
              {
                title: "Album Type",
                data: ItOptions.Graphic.AlbumCoverDesign.AlbumType,
              },
            ],
          },
          {
            title: "Packaging Design",
            list: [
              {
                title: "Product Type",
                data: ItOptions.Graphic.PackagingDesign.ProductType,
              },
              {
                title: "File Format",
                data: ItOptions.Graphic.PackagingDesign.FileFormat,
              },
            ],
          },
          {
            title: "Ar Filters & Lenses",
            list: [
              {
                title: "Platform",
                data: ItOptions.Graphic.ArFiltersLenses.Platform,
              },
              {
                title: "Filter Type",
                data: ItOptions.Graphic.ArFiltersLenses.FilterType,
              },
            ],
          },
          {
            title: "Web & Mobile Design",
            list: [
              {
                title: "Main Type",
                data: ItOptions.Graphic.WebMobileDesign.MainType,
              },
              {
                title: "Image File Format",
                data: ItOptions.Graphic.WebMobileDesign.ImageFileFormat,
              },
            ],
          },
          {
            title: "Social Media Design",
            list: [
              {
                title: "Platform",
                data: ItOptions.Graphic.SocialMediaDesign.Platform,
              },
              {
                title: "Image File Format",
                data: ItOptions.Graphic.SocialMediaDesign.ImageFileFormat,
              },
            ],
          },
          {
            title: "Menu Design",
            list: [
              {
                title: "Pourpose",
                data: ItOptions.Graphic.MenuDesign.Pourpose,
              },
              {
                title: "Style",
                data: ItOptions.Graphic.MenuDesign.Style,
              },
            ],
          },
          {
            title: "Invitation Design",
            list: [
              {
                title: "Main Type",
                data: ItOptions.Graphic.InvitationDesign.MainType,
              },
              {
                title: "Image File Format",
                data: ItOptions.Graphic.InvitationDesign.ImageFileFormat,
              },
            ],
          },
          {
            title: "Portraits Caricatures",
            list: [
              {
                title: "Illustration Type",
                data: ItOptions.Graphic.PortraitsCaricatures.IllustrationType,
              },
              {
                title: "Illustration Style",
                data: ItOptions.Graphic.PortraitsCaricatures.IllustrationStyle,
              },
            ],
          },
          {
            title: "Cartoons Comics",
            list: [
              {
                title: "Main Type",
                data: ItOptions.Graphic.CartoonsComics.MainType,
              },
              {
                title: "Illustration Style",
                data: ItOptions.Graphic.CartoonsComics.IllustrationStyle,
              },
              {
                title: "Image File Format",
                data: ItOptions.Graphic.CartoonsComics.ImageFileFormat,
              },
            ],
          },
          {
            title: "Web Banners",
            list: [
              {
                title: "Main Type",
                data: ItOptions.Graphic.WebBanners.MainType,
              },
              {
                title: "Image File Format",
                data: ItOptions.Graphic.WebBanners.ImageFileFormat,
              },
            ],
          },
          {
            title: "Photoshop Editing",
            list: [
              {
                title: "Editing Type",
                data: ItOptions.Graphic.PhotoshopEditing.EditingType,
              },
              {
                title: "File Format",
                data: ItOptions.Graphic.PhotoshopEditing.FileFormat,
              },
            ],
          },
          {
            title: "Architecture & Interior Design",
            list: [
              {
                title: "Service Type",
                data: ItOptions.Graphic.ArchitectureInteriorDesign.servicetype,
              },
              {
                title: "Project Scale",
                data: ItOptions.Graphic.ArchitectureInteriorDesign.ProjectScale,
              },
              {
                title: "Building Type",
                data: ItOptions.Graphic.ArchitectureInteriorDesign.BuildingType,
              },
              {
                title: "Image File Format",
                data: ItOptions.Graphic.ArchitectureInteriorDesign
                  .ImagefileFormat,
              },
            ],
          },
          {
            title: "Landscape Design",
            list: [
              {
                title: "Service Type",
                data: ItOptions.Graphic.LandscapeDesign.servicetype,
              },
              {
                title: "Software",
                data: ItOptions.Graphic.LandscapeDesign.Software,
              },
              {
                title: "File Format",
                data: ItOptions.Graphic.LandscapeDesign.FileFormat,
              },
            ],
          },
          {
            title: "Character Modeling",
            list: [
              {
                title: "Purpose",
                data: ItOptions.Graphic.CharacterModeling.Purpose,
              },
              {
                title: "Style",
                data: ItOptions.Graphic.CharacterModeling.Style,
              },
              {
                title: "File Format",
                data: ItOptions.Graphic.CharacterModeling.FileFormat,
              },
            ],
          },
          {
            title: "Industrial product Design",
            list: [
              {
                title: "Service type",
                data: ItOptions.Graphic.IndustrialproductDesign.Servicetype,
              },
              {
                title: "Field Of expetise",
                data: ItOptions.Graphic.IndustrialproductDesign.FieldOfexpetise,
              },
              {
                title: "Design Software",
                data: ItOptions.Graphic.IndustrialproductDesign.DesignSoftware,
              },
              {
                title: "FileFormat",
                data: ItOptions.Graphic.IndustrialproductDesign.FileFormat,
              },
            ],
          },
          {
            title: "Trade Booth Trade",
            list: [
              {
                title: "Booth Type",
                data: ItOptions.Graphic.TradeBoothTrade.BoothType,
              },
              {
                title: "Booth Layout",
                data: ItOptions.Graphic.TradeBoothTrade.BoothLayout,
              },
              {
                title: "Industry",
                data: ItOptions.Graphic.TradeBoothTrade.Industry,
              },
            ],
          },
          {
            title: "Fashion Design",
            list: [
              {
                title: "Service Type",
                data: ItOptions.Graphic.FashionDesign.ServiceType,
              },
              {
                title: "Item Type",
                data: ItOptions.Graphic.FashionDesign.ItemType,
              },
              {
                title: "Gender And Group",
                data: ItOptions.Graphic.FashionDesign.GenderAndGroup,
              },
              {
                title: "Illustration Purpose",
                data: ItOptions.Graphic.FashionDesign.IllustrationPurpose,
              },
              {
                title: "Design Expertise",
                data: ItOptions.Graphic.FashionDesign.DesignExpertise,
              },
              {
                title: "Tailoring Method",
                data: ItOptions.Graphic.FashionDesign.TailoringMethod,
              },
              {
                title: "File Format",
                data: ItOptions.Graphic.FashionDesign.FileFormat,
              },
            ],
          },
          {
            title: "Jewelry Design",
            list: [
              {
                title: "Service Type",
                data: ItOptions.Graphic.JewelryDesign.ServiceType,
              },
              {
                title: "Software",
                data: ItOptions.Graphic.JewelryDesign.Software,
              },
              {
                title: "Jewelry Type",
                data: ItOptions.Graphic.JewelryDesign.JewelryType,
              },
            ],
          },
          {
            title: "Presentation Design",
            list: [
              {
                title: "Service Type",
                data: ItOptions.Graphic.ResentationDesign.ServiceType,
              },
              {
                title: "Purpose",
                data: ItOptions.Graphic.ResentationDesign.Purpose,
              },
              {
                title: "Presentation Software",
                data: ItOptions.Graphic.ResentationDesign.PresentationSoftware,
              },
              {
                title: "Industry",
                data: ItOptions.Graphic.ResentationDesign.Industry,
              },
              {
                title: "Image File format",
                data: ItOptions.Graphic.ResentationDesign.ImageFileformat,
              },
            ],
          },
          {
            title: "Car Wraps",
            list: [
              {
                title: "Vehicle Type",
                data: ItOptions.Graphic.CarWraps.VehicleType,
              },
              {
                title: "File format",
                data: ItOptions.Graphic.CarWraps.Fileformat,
              },
            ],
          },
          {
            title: "Tattoo Design",
            list: [
              {
                title: "Tattoo Style",
                data: ItOptions.Graphic.TattooDesign.TattooStyle,
              },
              {
                title: "Color Type",
                data: ItOptions.Graphic.TattooDesign.ColorType,
              },
            ],
          },
          {
            title: "Brand Style Guide",
            list: [
              {
                title: "Brand Style Guide",
                data: ItOptions.Graphic.BrandStyleGuide,
              },
            ],
          },
          {
            title: "Game Category",
            list: [
              {
                title: "Game Category",
                data: ItOptions.Graphic.GameCategory,
              },
            ],
          },
          {
            title: "Infographic",
            list: [
              {
                title: "Infographic",
                data: ItOptions.Graphic.Infographic,
              },
            ],
          },
          {
            title: "Logo Design",
            list: [
              {
                title: "Logo Design",
                data: ItOptions.Graphic.LogoDesign,
              },
            ],
          },
          {
            title: "Podcast Design",
            list: [
              {
                title: "Podcast Design",
                data: ItOptions.Graphic.PodcastDesign,
              },
            ],
          },
          {
            title: "Postcard Design",
            list: [
              {
                title: "Postcard Design",
                data: ItOptions.Graphic.PostcardDesign,
              },
            ],
          },
          {
            title: "Signage Design",
            list: [
              {
                title: "Signage Design",
                data: ItOptions.Graphic.SignageDesign,
              },
            ],
          },
          {
            title: "Story Boards",
            list: [
              {
                title: "Story Boards",
                data: ItOptions.Graphic.StoryBoards,
              },
            ],
          },
          {
            title: "T shirt",
            list: [
              {
                title: "T shirt",
                data: ItOptions.Graphic.Tshirt,
              },
            ],
          },
          {
            title: "Catalog Design",
            list: [
              {
                title: "Catalog Design",
                data: ItOptions.Graphic.CatalogDesign,
              },
            ],
          },
        ],
      },
      {
        title: "Digital Marketing",
        image: it,
        data: [
          {
            title: "Social Media Marketing",
            list: [
              {
                title: "Service Type",
                data: ItOptions.DigitalMarketing.SocialMediaMarketing
                  .ServiceType,
              },
              {
                title: "Platform Type",
                data: ItOptions.DigitalMarketing.SocialMediaMarketing
                  .PlatformType,
              },
              {
                title: "Content Type",
                data: ItOptions.DigitalMarketing.SocialMediaMarketing
                  .ContentType,
              },
              {
                title: "Management Tools",
                data: ItOptions.DigitalMarketing.SocialMediaMarketing
                  .ManagementTools,
              },
            ],
          },
          {
            title: "Podcast Marketing",
            list: [
              {
                title: "Service Type",
                data: ItOptions.DigitalMarketing.PodcastMarketing.ServiceType,
              },
              {
                title: "Podcast Category",
                data: ItOptions.DigitalMarketing.PodcastMarketing
                  .PodcastCategory,
              },
              {
                title: "Podcast Aggregator",
                data: ItOptions.DigitalMarketing.PodcastMarketing
                  .PodcastAggregator,
              },
            ],
          },
          {
            title: "Social Media Advertising",
            list: [
              {
                title: "Service Type",
                data: ItOptions.DigitalMarketing.SOCIALMEDIAADVERTISING
                  .ServiceType,
              },
              { 
                title: "Platform Type",
                data: ItOptions.DigitalMarketing.SOCIALMEDIAADVERTISING
                  .PlatformType,
              },
            ],
          },
          {
            title: "Seo",
            list: [
              {
                title: "Service Type",
                data: ItOptions.DigitalMarketing.Seo.ServiceType,
              },
              {
                title: "Industry Expertise",
                data: ItOptions.DigitalMarketing.Seo.IndustryExpertise,
              },
            ],
          },
          {
            title: "Email Marketing",
            list: [
              {
                title: "Service Type",
                data: ItOptions.DigitalMarketing.EmailMarketing.ServiceType,
              },
              {
                title: "Email Platform",
                data: ItOptions.DigitalMarketing.EmailMarketing.EmailPlatform,
              },
              {
                title: "Method",
                data: ItOptions.DigitalMarketing.EmailMarketing.Method,
              },
              {
                title: "Tools",
                data: ItOptions.DigitalMarketing.EmailMarketing.Tools,
              },
            ],
          },
          {
            title: "Text Message Marketing",
            list: [
              {
                title: "Platform",
                data: ItOptions.DigitalMarketing.TextMessageMarketing.Platform,
              },
              {
                title: "Messaging Type",
                data: ItOptions.DigitalMarketing.TextMessageMarketing
                  .MessagingType,
              },
            ],
          },
          {
            title: "Sem",
            list: [
              {
                title: "Service Type",
                data: ItOptions.DigitalMarketing.Sem.ServiceType,
              },
              {
                title: "Industry",
                data: ItOptions.DigitalMarketing.Sem.Industry,
              },
              {
                title: "Method",
                data: ItOptions.DigitalMarketing.Sem.Method,
              },
              {
                title: "Tools",
                data: ItOptions.DigitalMarketing.Sem.Tools,
              },
            ],
          },
          {
            title: "Crowdfunding",
            list: [
              {
                title: "Service Type",
                data: ItOptions.DigitalMarketing.Crowdfunding.ServiceType,
              },
              {
                title: "Platform Type",
                data: ItOptions.DigitalMarketing.Crowdfunding.PlatformType,
              },
            ],
          },
          {
            title: "Display Advertising",
            list: [
              {
                title: "Service Type",
                data: ItOptions.DigitalMarketing.DisplayAdvertising.ServiceType,
              },
              {
                title: "Add Network",
                data: ItOptions.DigitalMarketing.DisplayAdvertising.AdNetwork,
              },
              {
                title: "Placement",
                data: ItOptions.DigitalMarketing.DisplayAdvertising.Placement,
              },
              {
                title: "Add Format",
                data: ItOptions.DigitalMarketing.DisplayAdvertising.AdFormat,
              },
              {
                title: "Industry",
                data: ItOptions.DigitalMarketing.DisplayAdvertising.Industry,
              },
            ],
          },
          {
            title: "Surveys",
            list: [
              {
                title: "Service Type",
                data: ItOptions.DigitalMarketing.Surveys.ServiceType,
              },
              {
                title: "Survey Platform",
                data: ItOptions.DigitalMarketing.Surveys.SurveyPlatform,
              },
              {
                title: "Survey Type",
                data: ItOptions.DigitalMarketing.Surveys.SurveyType,
              },
            ],
          },
          {
            title: "Marketing Strategy",
            list: [
              {
                title: "Consulting",
                data: ItOptions.DigitalMarketing.MarketingStrategy.Consulting,
              },
              {
                title: "Strategy Purpose",
                data: ItOptions.DigitalMarketing.MarketingStrategy
                  .StrategyPurpose,
              },
              {
                title: "Business stage",
                data: ItOptions.DigitalMarketing.MarketingStrategy
                  .Businessstage,
              },
              {
                title: "Business Type",
                data: ItOptions.DigitalMarketing.MarketingStrategy.BusinessType,
              },
            ],
          },
          {
            title: "E-Commerce Marketing",
            list: [
              {
                title: "Service Type",
                data: ItOptions.DigitalMarketing.ECommerceMarketing.ServiceType,
              },
              {
                title: "Platform Type",
                data: ItOptions.DigitalMarketing.ECommerceMarketing
                  .PlatformType,
              },
              {
                title: "Industry",
                data: ItOptions.DigitalMarketing.ECommerceMarketing.Industry,
              },
              {
                title: "Promotion Method",
                data: ItOptions.DigitalMarketing.ECommerceMarketing
                  .PromotionMethod,
              },
            ],
          },
          {
            title: "Influencer Marketing",
            list: [
              {
                title: "Strategy Research",
                data: ItOptions.DigitalMarketing.InfluencerMarketing
                  .StrategyResearch,
              },
              {
                title: "Target Audience",
                data: ItOptions.DigitalMarketing.InfluencerMarketing
                  .TargetAudience,
              },
              {
                title: "Platform Type",
                data: ItOptions.DigitalMarketing.InfluencerMarketing
                  .PlatformType,
              },
            ],
          },
          {
            title: "Community Management",
            list: [
              {
                title: "Service Type",
                data: ItOptions.DigitalMarketing.CommunityManagement
                  .ServiceType,
              },
              {
                title: "Industry",
                data: ItOptions.DigitalMarketing.CommunityManagement.Industry,
              },
              {
                title: "Community Presence",
                data: ItOptions.DigitalMarketing.CommunityManagement
                  .CommunityPresence,
              },
            ],
          },
          {
            title: "Affilate Markting",
            list: [
              {
                title: "Service Type",
                data: ItOptions.DigitalMarketing.AffilateMarkting.ServiceType,
              },
              {
                title: "Affiliate Networks",
                data: ItOptions.DigitalMarketing.AffilateMarkting
                  .AffiliateNetworks,
              },
              {
                title: "Affiliate Networks/ Programs",
                data: ItOptions.DigitalMarketing.AffilateMarkting
                  .AffiliateNetworksPrograms,
              },
            ],
          },
          {
            title: "MobileApp Marketing",
            list: [
              {
                title: "Service Type",
                data: ItOptions.DigitalMarketing.MobileAppMarketing.ServiceType,
              },
              {
                title: "Application Store",
                data: ItOptions.DigitalMarketing.MobileAppMarketing
                  .ApplicationStore,
              },
              {
                title: "Industry",
                data: ItOptions.DigitalMarketing.MobileAppMarketing.Industry,
              },
            ],
          },
          {
            title: "Music Promotion",
            list: [
              {
                title: "Service Type",
                data: ItOptions.DigitalMarketing.MusicPromotion.ServiceType,
              },
              {
                title: "Music Platform",
                data: ItOptions.DigitalMarketing.MusicPromotion.MusicPlatform,
              },
              {
                title: "Musical Genre",
                data: ItOptions.DigitalMarketing.MusicPromotion.MusicalGenre,
              },
              {
                title: "Platform Type",
                data: ItOptions.DigitalMarketing.MusicPromotion.PlatformType,
              },
              {
                title: "Channel",
                data: ItOptions.DigitalMarketing.MusicPromotion.Channel,
              },
            ],
          },
          {
            title: "Domain Research",
            list: [
              {
                title: "Domain Research",
                data: ItOptions.DigitalMarketing.DomainResearch,
              },
            ],
          },
          {
            title: "Local Seo",
            list: [
              {
                title: "Local Seo",
                data: ItOptions.DigitalMarketing.LocalSeo,
              },
            ],
          },
          {
            title: "VideoMarketing",
            list: [
              {
                title: "Video Marketing",
                data: ItOptions.DigitalMarketing.VideoMarketing,
              },
            ],
          },
          {
            title: "WebAnalytics",
            list: [
              {
                title: "Web Analytics",
                data: ItOptions.DigitalMarketing.WebAnalytics,
              },
            ],
          },
        ],
      },
      {
        title: "Programing & Teach",
        image: it,
        data: [
          {
            title: "Website Builders Cms",
            list: [
              {
                title: "Service Type",
                data: ItOptions.ProgramingTeach.WebsiteBuildersCms.ServiceType,
              },
              {
                title: "Platform",
                data: ItOptions.ProgramingTeach.WebsiteBuildersCms.Platform,
              },
              {
                title: "Specialization",
                data: ItOptions.ProgramingTeach.WebsiteBuildersCms
                  .Specialization,
              },
              {
                title: "Supported Plugin Types",
                data: ItOptions.ProgramingTeach.WebsiteBuildersCms
                  .SupportedPluginTypes,
              },
            ],
          },
          {
            title: "Word press",
            list: [
              {
                title: "Service Type",
                data: ItOptions.ProgramingTeach.Wordpress.ServiceType,
              },
              {
                title: "Specialization",
                data: ItOptions.ProgramingTeach.Wordpress.Specialization,
              },
              {
                title: "Supported Plugin Types",
                data: ItOptions.ProgramingTeach.Wordpress.SupportedPluginTypes,
              },
              {
                title: "Integrating Plugins",
                data: ItOptions.ProgramingTeach.Wordpress.IntegratingPlugins,
              },
            ],
          },
          {
            title: "Game Development",
            list: [
              {
                title: "Service Type",
                data: ItOptions.ProgramingTeach.GameDevelopment.ServiceType,
              },
              {
                title: "Game Type",
                data: ItOptions.ProgramingTeach.GameDevelopment.GameType,
              },
              {
                title: "Platform Type",
                data: ItOptions.ProgramingTeach.GameDevelopment.PlatformType,
              },
              {
                title: "Genree",
                data: ItOptions.ProgramingTeach.GameDevelopment.Genree,
              },
              {
                title: "Plugins",
                data: ItOptions.ProgramingTeach.GameDevelopment.Plugins,
              },
              {
                title: "Customization Type",
                data: ItOptions.ProgramingTeach.GameDevelopment
                  .CustomizationType,
              },
              {
                title: "Game Name",
                data: ItOptions.ProgramingTeach.GameDevelopment.GameName,
              },
            ],
          },
          {
            title: "Development For Streamers",
            list: [
              {
                title: "Service Type",
                data: ItOptions.ProgramingTeach.DevelopmentForStreamers
                  .ServiceType,
              },
              {
                title: "Software",
                data: ItOptions.ProgramingTeach.DevelopmentForStreamers
                  .Software,
              },
              {
                title: "Platform",
                data: ItOptions.ProgramingTeach.DevelopmentForStreamers
                  .Platform,
              },
              {
                title: "Purpose",
                data: ItOptions.ProgramingTeach.DevelopmentForStreamers.Purpose,
              },
            ],
          },
          {
            title: "Online Coding Lessons",
            list: [
              {
                title: "Lesson Purpose",
                data: ItOptions.ProgramingTeach.OnlineCodingLessons
                  .LessonPurpose,
              },
              {
                title: "Development Techonlogy",
                data: ItOptions.ProgramingTeach.OnlineCodingLessons
                  .DevelopmentTechonlogy,
              },
            ],
          },
          {
            title: "Support It",
            list: [
              {
                title: "Device",
                data: ItOptions.ProgramingTeach.SupportIt.Device,
              },
              {
                title: "Operating System",
                data: ItOptions.ProgramingTeach.SupportIt.OperatingSystem,
              },
              {
                title: "Also Delivering",
                data: ItOptions.ProgramingTeach.SupportIt.AlsoDelivering,
              },
            ],
          },
          {
            title: "Chatbots",
            list: [
              {
                title: "Messaging Platform",
                data: ItOptions.ProgramingTeach.Chatbots.MessagingPlatform,
              },
              {
                title: "Bot Type",
                data: ItOptions.ProgramingTeach.Chatbots.BotType,
              },
              {
                title: "Development Technology",
                data: ItOptions.ProgramingTeach.Chatbots.DevelopmentTechnology,
              },
            ],
          },
          {
            title: "Data Analysis Reports",
            list: [
              {
                title: "Service Type",
                data: ItOptions.ProgramingTeach.DataAnalysisReports.ServiceType,
              },
              {
                title: "Tool",
                data: ItOptions.ProgramingTeach.DataAnalysisReports.Tool,
              },
            ],
          },
          {
            title: "Convert Files",
            list: [
              {
                title: "Service Type",
                data: ItOptions.ProgramingTeach.ConvertFiles.ServiceType,
              },
              {
                title: "Convert From",
                data: ItOptions.ProgramingTeach.ConvertFiles.ConvertFrom,
              },
              {
                title: "Convert To",
                data: ItOptions.ProgramingTeach.ConvertFiles.ConvertTo,
              },
            ],
          },
          {
            title: "Data bases",
            list: [
              {
                title: "Service Type",
                data: ItOptions.ProgramingTeach.Databases.ServiceType,
              },
              {
                title: "Databases Type",
                data: ItOptions.ProgramingTeach.Databases.DatabasesType,
              },
            ],
          },
          {
            title: "Qa Review",
            list: [
              {
                title: "Service Type",
                data: ItOptions.ProgramingTeach.QaReview.ServiceType,
              },
              {
                title: "Development Technology",
                data: ItOptions.ProgramingTeach.QaReview.DevelopmentTechnology,
              },
              {
                title: "Testing Application",
                data: ItOptions.ProgramingTeach.QaReview.TestingApplication,
              },
              {
                title: "Device",
                data: ItOptions.ProgramingTeach.QaReview.Device,
              },
              {
                title: "Expertise",
                data: ItOptions.ProgramingTeach.QaReview.Expertise,
              },
            ],
          },
          {
            title: "User Testing",
            list: [
              {
                title: "Testing Platform",
                data: ItOptions.ProgramingTeach.UserTesting.TestingPlatform,
              },
              {
                title: "Testing Application",
                data: ItOptions.ProgramingTeach.UserTesting.Device,
              },
            ],
          },
          {
            title: "Web Programming",
            list: [
              {
                title: "Service Type",
                data: ItOptions.ProgramingTeach.WebProgramming.ServiceType,
              },
              {
                title: "Programming Language",
                data: ItOptions.ProgramingTeach.WebProgramming
                  .ProgrammingLanguage,
              },
              {
                title: "Expertise",
                data: ItOptions.ProgramingTeach.WebProgramming.Expertise,
              },
            ],
          },
          {
            title: "Desktop Applications",
            list: [
              {
                title: "Service Type",
                data: ItOptions.ProgramingTeach.DesktopApplications.ServiceType,
              },
              {
                title: "Programming Language",
                data: ItOptions.ProgramingTeach.DesktopApplications
                  .ProgrammingLanguage,
              },
              {
                title: "Operating System",
                data: ItOptions.ProgramingTeach.DesktopApplications
                  .OperatingSystem,
              },
              {
                title: "Expertise",
                data: ItOptions.ProgramingTeach.DesktopApplications.Expertise,
              },
              {
                title: "Application",
                data: ItOptions.ProgramingTeach.DesktopApplications.Application,
              },
            ],
          },
          {
            title: "E-Commerce Development",
            list: [
              {
                title: "Service Type",
                data: ItOptions.ProgramingTeach.ECommerceDevelopment
                  .ServiceType,
              },
              {
                title: "Platform",
                data: ItOptions.ProgramingTeach.ECommerceDevelopment.Platform,
              },
              {
                title: "Supported Plugin Types",
                data: ItOptions.ProgramingTeach.ECommerceDevelopment
                  .SupportedPluginTypes,
              },
            ],
          },
          {
            title: "Mobile Apps",
            list: [
              {
                title: "Service Type",
                data: ItOptions.ProgramingTeach.MobileApps.ServiceType,
              },
              {
                title: "Platform",
                data: ItOptions.ProgramingTeach.MobileApps.Platform,
              },
              {
                title: "Development Technology",
                data: ItOptions.ProgramingTeach.MobileApps
                  .DevelopmentTechnology,
              },
              {
                title: "Purpose",
                data: ItOptions.ProgramingTeach.MobileApps.Purpose,
              },
              {
                title: "Expertise",
                data: ItOptions.ProgramingTeach.MobileApps.Expertise,
              },
            ],
          },
        ],
      },
      {
        title: "Video & Animation",
        image: it,
        data: [
          {
            title: "Whiteboard animated Explainers",
            list: [
              {
                title: "Service Type",
                data: ItOptions.VideoAnimation.WhiteboardanimatedExplainers
                  .ServiceType,
              },
              {
                title: "Explanier Type",
                data: ItOptions.VideoAnimation.WhiteboardanimatedExplainers
                  .ExplanierType,
              },
              {
                title: "Purpose",
                data: ItOptions.VideoAnimation.WhiteboardanimatedExplainers
                  .Purpose,
              },
              {
                title: "Tool Expertise",
                data: ItOptions.VideoAnimation.WhiteboardanimatedExplainers
                  .ToolExpertise,
              },
              {
                title: "Software Expertise",
                data: ItOptions.VideoAnimation.WhiteboardanimatedExplainers
                  .SoftwareExpertise,
              },
            ],
          },
          {
            title: "Animated Gifs",
            list: [
              {
                title: "Purpose",
                data: ItOptions.VideoAnimation.AnimatedGifs.Purpose,
              },
              {
                title: "File Format",
                data: ItOptions.VideoAnimation.AnimatedGifs.FileFormat,
              },
            ],
          },
          {
            title: "Intros Outros",
            list: [
              {
                title: "Intro/Outro Type",
                data: ItOptions.VideoAnimation.IntrosOutros.IntroOutroType,
              },
              {
                title: "Video File Format",
                data: ItOptions.VideoAnimation.IntrosOutros.VideoFileFormat,
              },
            ],
          },
          {
            title: "Short Video Ads",
            list: [
              {
                title: "Platform",
                data: ItOptions.VideoAnimation.ShortVideoAds.Platform,
              },
              {
                title: "Video Type",
                data: ItOptions.VideoAnimation.ShortVideoAds.VideoType,
              },
            ],
          },
          {
            title: "Character Animation",
            list: [
              {
                title: "Animation Type",
                data: ItOptions.VideoAnimation.CharacterAnimation.AnimationType,
              },
              {
                title: "Industry",
                data: ItOptions.VideoAnimation.CharacterAnimation.Industry,
              },
            ],
          },
          {
            title: "3D Product Animation",
            list: [
              {
                title: "Industry",
                data: ItOptions.VideoAnimation.dProductAnimation.Industry,
              },
              {
                title: "Environment",
                data: ItOptions.VideoAnimation.dProductAnimation.Environment,
              },
              {
                title: "file format",
                data: ItOptions.VideoAnimation.dProductAnimation.fileformat,
              },
            ],
          },
          {
            title: "Lyric & Music Videos",
            list: [
              {
                title: "Service Type",
                data: ItOptions.VideoAnimation.LyricMusicVideos.ServiceType,
              },
              {
                title: "Video Type",
                data: ItOptions.VideoAnimation.LyricMusicVideos.VideoType,
              },
            ],
          },
          {
            title: "Animation For Kids",
            list: [
              {
                title: "Animation Style",
                data: ItOptions.VideoAnimation.AnimationForKids.AnimationStyle,
              },
              {
                title: "Video Type",
                data: ItOptions.VideoAnimation.AnimationForKids.VideoType,
              },
            ],
          },
          {
            title: "Animation For Streamers",
            list: [
              {
                title: "Column1",
                data: ItOptions.VideoAnimation.AnimationForStreamers.Column1,
              },
              {
                title: "Asset Type",
                data: ItOptions.VideoAnimation.AnimationForStreamers.AssetType,
              },
            ],
          },
          {
            title: "Live Action Explainers",
            list: [
              {
                title: "Setting",
                data: ItOptions.VideoAnimation.LiveActionExplainers.Setting,
              },
              {
                title: "Video File format",
                data: ItOptions.VideoAnimation.LiveActionExplainers
                  .VideoFileformat,
              },
            ],
          },
          {
            title: "Unboxing Videos",
            list: [
              {
                title: "vedio type",
                data: ItOptions.VideoAnimation.UnboxingVideos.vediotype,
              },
              {
                title: "product Type",
                data: ItOptions.VideoAnimation.UnboxingVideos.productType,
              },
            ],
          },
          {
            title: "Drone Video graphy",
            list: [
              {
                title: "Media type",
                data: ItOptions.VideoAnimation.DroneVideography.Mediatype,
              },
              {
                title: "Themes",
                data: ItOptions.VideoAnimation.DroneVideography.Themes,
              },
              {
                title: "Drone Type",
                data: ItOptions.VideoAnimation.DroneVideography.DroneType,
              },
            ],
          },
          {
            title: "product Photography",
            list: [
              {
                title: "file Format",
                data: ItOptions.VideoAnimation.productPhotography.fileFormat,
              },
              {
                title: "Photo Setting",
                data: ItOptions.VideoAnimation.productPhotography.PhotoSetting,
              },
              {
                title: "ProductType",
                data: ItOptions.VideoAnimation.productPhotography.ProductType,
              },
            ],
          },
          {
            title: "App Website Previews",
            list: [
              {
                title: "App Website Previews",
                data: ItOptions.VideoAnimation.AppWebsitePreviews,
              },
            ],
          },
          {
            title: "Elearing Video Production",
            list: [
              {
                title: "Elearing Video Production",
                data: ItOptions.VideoAnimation.ElearingVideoProduction,
              },
            ],
          },
          {
            title: "Lottie Website Animation",
            list: [
              {
                title: "Lottie Website Animation",
                data: ItOptions.VideoAnimation.LottieWebsiteAnimation,
              },
            ],
          },
          {
            title: "Screen casting Videos",
            list: [
              {
                title: "Screen casting Videos",
                data: ItOptions.VideoAnimation.ScreencastingVideos,
              },
            ],
          },
          {
            title: "Slide Show Videos",
            list: [
              {
                title: "Slide Show Videos",
                data: ItOptions.VideoAnimation.SlideShowVideos,
              },
            ],
          },
          {
            title: "Sub title Captions",
            list: [
              {
                title: "Sub title Captions",
                data: ItOptions.VideoAnimation.SubtitleCaptions,
              },
            ],
          },
          {
            title: "Video Editing",
            list: [
              {
                title: "Video Editing",
                data: ItOptions.VideoAnimation.VideoEditing,
              },
            ],
          },
          {
            title: "Visual Effect",
            list: [
              {
                title: "Visual Effect",
                data: ItOptions.VideoAnimation.VisualEffect,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    title: "Lawyer Service",
    icon: lawyer,
    color: "#FF4155",
    image: head,
    picture:law,
    key:"LAWYER",
    data: [
      {
        title: "Bankruptcy Lawyers",
        list: [
          {
            title: "Bankruptcy Lawyers",
            data: LawyerOptions.Bankruptcy,
          },
        ],
      },
      {
        title: "Business Lawyers",
        list: [
          {
            title: "Business Lawyers",
            data: LawyerOptions.Business,
          },
        ],
      },
      {
        title: "Civil Lawyers Service",
        list: [
          {
            title: "Civil Lawyers",
            data: LawyerOptions.Civil,
          },
        ],
      },
      {
        title: "Constitutional Lawyers",
        list: [
          {
            title: "Constitutional Lawyers",
            data: LawyerOptions.Constitutional,
          },
        ],
      },
      {
        title: "Criminal Defense Lawyers",
        list: [
          {
            title: "Criminal Defense Lawyers",
            data: LawyerOptions.Criminal,
          },
        ],
      },
      {
        title: "Environmental Lawyers",
        list: [
          {
            title: "Environmental Lawyers",
            data: LawyerOptions.Environmental,
          },
        ],
      },
      {
        title: "Estate Planning Lawyers",
        list: [
          {
            title: "Estate Lawyers",
            data: LawyerOptions.Estate,
          },
        ],
      },
      {
        title: "Family Lawyers",
        list: [
          {
            title: "Family Lawyers",
            data: LawyerOptions.Family,
          },
        ],
      },
      {
        title: "Immigration Lawyers",
        list: [
          {
            title: "Immigration Lawyers",
            data: LawyerOptions.Immigration,
          },
        ],
      },
      {
        title: "Intellectual Property Lawyers",
        list: [
          {
            title: "Intellectual Lawyers",
            data: LawyerOptions.Intellectual,
          },
        ],
      },
      {
        title: "Labor Lawyers",
        list: [
          {
            title: "Labor Lawyers",
            data: LawyerOptions.Labor,
          },
        ],
      },
      {
        title: "Medical Malpractice Lawyers",
        list: [
          {
            title: "Medical Malpractice Lawyers",
            data: LawyerOptions.Medical,
          },
        ],
      },
      {
        title: "Personal Injury Lawyers",
        list: [
          {
            title: "Personal Injury Lawyers",
            data: LawyerOptions.Personal,
          },
        ],
      },
      {
        title: "Real State Lawyers",
        list: [
          {
            title: "Real State Lawyers",
            data: LawyerOptions.Real,
          },
        ],
      },
      {
        title: "Tax Lawyers",
        list: [
          {
            title: "Tax Lawyers",
            data: LawyerOptions.Tax,
          },
        ],
      },
    ],
  },
  {
    title: "Music & Audio Service",
    icon: MusicIcon,
    color: "#FEB944",
    image: musicaudio,
    picture:music,
    key:"MUSIC",
    data: [
      {
        title: "Producers & Composers",
        list: [
          {
            title: "Service Type",
            data: MusicAudioOptions.ProducersComposers.ServiceType,
          },
          {
            title: "Genre",
            data: MusicAudioOptions.ProducersComposers.Genre,
          },
          {
            title: "Purpose",
            data: MusicAudioOptions.ProducersComposers.Purpose,
          },
        ],
      },
      {
        title: "Session Musicians",
        list: [
          {
            title: "Instrument",
            data: MusicAudioOptions.SessionMusicians.Instrument,
          },
          {
            title: "Genre",
            data: MusicAudioOptions.SessionMusicians.Genre,
          },
        ],
      },
      {
        title: "Singers Concert",
        list: [
          {
            title: "Singer Type",
            data: MusicAudioOptions.SingersConcert.SingerType,
          },
          {
            title: "Service type",
            data: MusicAudioOptions.SingersConcert.Servicetype,
          },
        ],
      },
      {
        title: "Voice Over",
        list: [
          {
            title: "Gender",
            data: MusicAudioOptions.VoiceOver.Gender,
          },
          {
            title: "Purpose",
            data: MusicAudioOptions.VoiceOver.Purpose,
          },
          {
            title: "Tone",
            data: MusicAudioOptions.VoiceOver.Tone,
          },
        ],
      },
      {
        title: "Beat Making",
        list: [
          {
            title: "Service Type",
            data: MusicAudioOptions.BeatMaking.ServiceType,
          },
          {
            title: "Genre",
            data: MusicAudioOptions.BeatMaking.Genre,
          },
          {
            title: "Beat Type",
            data: MusicAudioOptions.BeatMaking.BeatType,
          },
          {
            title: "Beat Mood",
            data: MusicAudioOptions.BeatMaking.BeatMood,
          },
          {
            title: "Loops & Kits",
            data: MusicAudioOptions.BeatMaking.LoopsKits,
          },
        ],
      },
      {
        title: "Online Music Lessons",
        list: [
          {
            title: "Instrument",
            data: MusicAudioOptions.OnlineMusicLessons.Instrument,
          },
          {
            title: "Production/Software",
            data: MusicAudioOptions.OnlineMusicLessons.ProductionSoftware,
          },
        ],
      },
      {
        title: "Sound Design",
        list: [
          {
            title: "Service Type",
            data: MusicAudioOptions.SoundDesign.ServiceType,
          },
          {
            title: "Purpose",
            data: MusicAudioOptions.SoundDesign.Purpose,
          },
          {
            title: "Mixing Type",
            data: MusicAudioOptions.SoundDesign.MixingType,
          },
          {
            title: "Effect Type",
            data: MusicAudioOptions.SoundDesign.EffectType,
          },
        ],
      },
      {
        title: "Music Transcription",
        list: [
          {
            title: "Instruments",
            data: MusicAudioOptions.MusicTranscription.Instruments,
          },
          {
            title: "File Format",
            data: MusicAudioOptions.MusicTranscription.FileFormat,
          },
        ],
      },
      {
        title: "Singers & Vocalists",
        list: [
          {
            title: "Singers Type",
            data: MusicAudioOptions.SingersVocalists.SingersType,
          },
          {
            title: "Services Type",
            data: MusicAudioOptions.SingersVocalists.ServicesType,
          },
        ],
      },
      {
        title: "Jingles & Intros",
        list: [
          {
            title: "Service Type",
            data: MusicAudioOptions.JinglesIntros.ServiceType,
          },
          {
            title: "Purpose",
            data: MusicAudioOptions.JinglesIntros.Purpose,
          },
          {
            title: "Style",
            data: MusicAudioOptions.JinglesIntros.Style,
          },
        ],
      },
      {
        title: "Dj Drops & Tags",
        list: [
          {
            title: "Genre",
            data: MusicAudioOptions.DjDropsTags.Genre,
          },
          {
            title: "Tone",
            data: MusicAudioOptions.DjDropsTags.Tone,
          },
        ],
      },
      {
        title: "Remixing & Mashups",
        list: [
          {
            title: "Service Type",
            data: MusicAudioOptions.RemixingMashups.ServiceType,
          },
          {
            title: "Gener",
            data: MusicAudioOptions.RemixingMashups.Gener,
          },
        ],
      },
      {
        title: "Synth Presets",
        list: [
          {
            title: "Gener",
            data: MusicAudioOptions.SynthPresets.Gener,
          },
          {
            title: "Synthesizer Type",
            data: MusicAudioOptions.SynthPresets.SynthesizerType,
          },
          {
            title: "Vst Synthesizer Type",
            data: MusicAudioOptions.SynthPresets.VstSynthesizerType,
          },
        ],
      },
      {
        title: "Music Instrument Teaching",
        list: [
          {
            title: "Music Instrument Teaching",
            data: MusicAudioOptions.MusicInstrumentTeaching,
          },
        ],
      },
      {
        title: "Teaching Song",
        list: [
          {
            title: "TeachingSong",
            data: MusicAudioOptions.TeachingSong,
          },
        ],
      },
      {
        title: "Mixing & Mastering",
        list: [
          {
            title: "Mixing Mastering",
            data: MusicAudioOptions.MixingMastering,
          },
        ],
      },
      {
        title: "Song writers",
        list: [
          {
            title: "Song writers",
            data: MusicAudioOptions.Songwriters,
          },
        ],
      },
      {
        title: "Dj Mixing",
        list: [
          {
            title: "Dj Mixing",
            data: MusicAudioOptions.DjMixing,
          },
        ],
      },
      {
        title: "Dialogue Editing",
        list: [
          {
            title: "Dialouge Editing",
            data: MusicAudioOptions.DialougeEditing,
          },
        ],
      },
      {
        title: "Audio Ads Production",
        list: [
          {
            title: "Audio Ads Production",
            data: [],
          },
        ],
      },
      {
        title: "Audiobook Production",
        list: [
          {
            title: "Audiobook Production",
            data: [],
          },
        ],
      },
      {
        title: "Podcust Editing",
        list: [
          {
            title: "Podcust Editing",
            data: [],
          },
        ],
      },
      {
        title: "Vocal Tuning",
        list: [
          {
            title: "Vocal Tuning",
            data: [],
          },
        ],
      },
    ],
  },
  {
    title: "Painter",
    icon: PainterIcon,
    color: "#D934BF",
    image: entertainment,
    picture:ppt,
    key:"PAINTER",
    list: [
      {
        title: "Painter",
        data: MainPainter,
      },
    ],
  },
  {
    title: "Online Tution",
    icon: OnlineTutionIcon,
    color: "#FBB540",
    image: onlinetution,
    picture:tutor,
    key:"ONLINETUTION",
    data: [
      {
        title: "Language Tutoring",
        list: [
          {
            title: "Language Tutoring",
            data: OnlineTutionOptions.LANGUAGETUTORING,
          },
        ],
      },
      {
        title: "Math Tutoring",
        list: [
          {
            title: "Math Tutoring",
            data: OnlineTutionOptions.MATHTUTORING,
          },
        ],
      },
      {
        title: "Online Music Lessons",
        list: [
          {
            title: "Instrument",
            data: OnlineTutionOptions.OnlineMusicLessons.Instrument,
          },
          {
            title: "Production/Software",
            data: OnlineTutionOptions.OnlineMusicLessons.Production_Software,
          },
        ],
      },
      {
        title: "Online Coding Lessons",
        list: [
          {
            title: "Lesson Purpose",
            data: OnlineTutionOptions.OnlineCodingLessons.LessonPurpose,
          },
          {
            title: "Development Techonlogy",
            data: OnlineTutionOptions.OnlineCodingLessons.DevelopmentTechonlogy,
          },
        ],
      },
      {
        title: "Science Tutoring",
        list: [
          {
            title: "Science Tutoring",
            data: OnlineTutionOptions.SCIENCETUTORING,
          },
        ],
      },
      {
        title: "Social Science Tutoring",
        list: [
          {
            title: "Social Science Tutoring",
            data: OnlineTutionOptions.SOCIALSCIENCESTUTORING,
          },
        ],
      },
      {
        title: "Business Tutoring",
        list: [
          {
            title: "Business Tutoring",
            data: OnlineTutionOptions.BUSINESSTUTORING,
          },
        ],
      },
      {
        title: "Cooking Lessons",
        list: [
          {
            title: "Cooking Lessons",
            data:OnlineTutionOptions.CookingLessons
          }
        ],
      },
      // {
      //   title: "Mobile",
      //   list: [
      //     {
      //       title: "Mobile",
      //       data: OnlineTutionOptions.Mobile,
      //     },
      //   ],
      // },
      // {
      //   title: "Pc",
      //   list: [
      //     {
      //       title: "Pc",
      //       data: OnlineTutionOptions.Pc,
      //     },
      //   ],
      // },
      // {
      //   title: "Printer",
      //   list: [
      //     {
      //       title: "Printer",
      //       data: OnlineTutionOptions.Printer,
      //     },
      //   ],
      // },
    ],
  },
  {
    title: "Parlour & Saloon",
    icon: SaloonIcon,
    color: "#FF5364",
    image: parlour,
    picture:salon,
    key:"PARLOUR",
    data: [
      {
        title: "Man",
        image: parlour,
        data: [
          {
            title: "Hair Shaping & Styling",
            list: [
              {
                title: "Hair Shaping & Styling",
                data: ParlorOptions.Man.Hair,
              },
            ],
          },
          {
            title: "Color/Texturizing",
            list: [
              {
                title: "Color/Texturizing",
                data: ParlorOptions.Man.Color,
              },
            ],
          },
          {
            title: "Waxing Service",
            list: [
              {
                title: "Waxing Service",
                data: ParlorOptions.Man.Waxing,
              },
            ],
          },
          {
            title: "Nails",
            list: [
              {
                title: "Nails",
                data: ParlorOptions.Man.Nails,
              },
            ],
          },
          {
            title: "Facial",
            list: [
              {
                title: "Facial",
                data: ParlorOptions.Man.Facial,
              },
            ],
          },
          {
            title: "Extra",
            list: [
              {
                title: "Extra",
                data: ParlorOptions.Man.Extra,
              },
            ],
          },
        ],
      },
      {
        title: "Woman",
        image: parlour,
        data: [
          {
            title: "Facial Treatment",
            list: [
              {
                title: "Facial Treatment",
                data: ParlorOptions.Woman.Facial,
              },
            ],
          },
          {
            title: "Manicure",
            list: [
              {
                title: "Manicure",
                data: ParlorOptions.Woman.Manicure,
              },
            ],
          },
          {
            title: "Padicure",
            list: [
              {
                title: "Padicure",
                data: ParlorOptions.Woman.Padicure,
              },
            ],
          },
          {
            title: "Hair Cut",
            list: [
              {
                title: "Hair Cut",
                data: ParlorOptions.Woman.Hair,
              },
            ],
          },
          {
            title: "Hair Color",
            list: [
              {
                title: "Hair Color",
                data: ParlorOptions.Woman.HairColor,
              },
            ],
          },
          {
            title: "Hair Straightener",
            list: [
              {
                title: "Hair Straightener",
                data: ParlorOptions.Woman.HairStraightener,
              },
            ],
          },
          {
            title: "Hair Spa",
            list: [
              {
                title: "Hair Spa",
                data: ParlorOptions.Woman.HairSpa,
              },
            ],
          },
          {
            title: "Head Massage & Body Polishing",
            list: [
              {
                title: "Head Massage & Body Polishing",
                data: ParlorOptions.Woman.Head,
              },
            ],
          },
          {
            title: "Skin Treatment",
            list: [
              {
                title: "Skin Treatment",
                data: ParlorOptions.Woman.Skin,
              },
            ],
          },
          {
            title: "Threading",
            list: [
              {
                title: "Threading",
                data: ParlorOptions.Woman.Threading,
              },
            ],
          },
          {
            title: "Bleach & Datan",
            list: [
              {
                title: "Bleach & Datan",
                data: ParlorOptions.Woman.Bleach,
              },
            ],
          },
          {
            title: "Cleanup",
            list: [
              {
                title: "Cleanup",
                data: ParlorOptions.Woman.Cleanup,
              },
            ],
          },
          {
            title: "Waxing",
            list: [
              {
                title: "Waxing",
                data: ParlorOptions.Woman.Waxing,
              },
            ],
          },
          {
            title: "Make Up",
            list: [
              {
                title: "Make Up",
                data: ParlorOptions.Woman.MakeUp,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    title: "Labor",
    icon: RentIcon,
    color: "#61AFF6",
    image: entertainment,
    picture:lb,
    key:"LABOR",
    list: [
      {
        title: "Labor",
        data: MainLabor,
      },
    ],
  },
  {
    title: "Life Style",
    icon: lifeStyle,
    color: "#FF9C68",
    image: lifestyle,
    picture:life,
    key:"LIFESTYLE",
    data: [
      {
        title: "Cooking Lessons",
        list: [
          {
            title: "Breakfast",
            data: LifeStyleOptions.CookingLessons.breakfast,
          },
          {
            title: "Beverages",
            data: LifeStyleOptions.CookingLessons.Beverages,
          },
          {
            title: "Snacks",
            data: LifeStyleOptions.CookingLessons.Snacks,
          },
          {
            title: "Dinner & Lunch",
            data: LifeStyleOptions.CookingLessons.DinnerLunch,
          },
          {
            title: "Dessert",
            data: LifeStyleOptions.CookingLessons.Dessert,
          },
          {
            title: "Soups",
            data: LifeStyleOptions.CookingLessons.Soups,
          },
          {
            title: "Sandwich",
            data: LifeStyleOptions.CookingLessons.Sandwich,
          },
          {
            title: "Pizzas",
            data: LifeStyleOptions.CookingLessons.Pizzas,
          },
          {
            title: "Pasta",
            data: LifeStyleOptions.CookingLessons.Pasta,
          },
          {
            title: "Events",
            data: LifeStyleOptions.CookingLessons.Events,
          },
        ],
      },
      {
        title: "Craft Lessons",
        list: [
          {
            title: "Craft Type",
            data: LifeStyleOptions.CraftLessons.CraftType,
          },
          {
            title: "Difficulty",
            data: LifeStyleOptions.CraftLessons.Difficulty,
          },
        ],
      },
      {
        title: "Gym",
        list: [
          {
            title: "Compound Chest Exercises",
            data: LifeStyleOptions.Gym.CompoundChestExercises,
          },
          {
            title: "Compound Back Exercises",
            data: LifeStyleOptions.Gym.CompoundBackExercises,
          },
          {
            title: "Compound Ab Exercises",
            data: LifeStyleOptions.Gym.CompoundAbExercises,
          },
          {
            title: "Compound Shoulder Exercises",
            data: LifeStyleOptions.Gym.CompoundShoulderExercises,
          },
          {
            title: "Compound Leg Exercises",
            data: LifeStyleOptions.Gym.CompoundLegExercises,
          },
          {
            title: "Compound Bicep Exercises",
            data: LifeStyleOptions.Gym.CompoundBicepExercises,
          },
          {
            title: "Compound Tricep Exercises",
            data: LifeStyleOptions.Gym.CompoundTricepExercises,
          },
        ],
      },
      {
        title: "Life Coaching",
        list: [
          {
            title: "Life Coaching",
            data: LifeStyleOptions.LifeCoaching,
          },
        ],
      },
      {
        title: "Personal Stylists",
        list: [
          {
            title: "Purpose",
            data: LifeStyleOptions.PersonalStylists.Purpose,
          },
        ],
      },
      {
        title: "Fitness Lessons",
        list: [
          {
            title: "Trainning Type",
            data: LifeStyleOptions.FitnessLessons.TrainningType,
          },
          {
            title: "Difficulty",
            data: LifeStyleOptions.FitnessLessons.Difficulty,
          },
        ],
      },
    ],
  },
];
