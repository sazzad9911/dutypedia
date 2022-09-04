import builder_1 from "../assets/Images/builder_1.jpg";
import uuid from "react-native-uuid";
import { BuilderOptions } from "./../Data/builder";
import { BuilderIcon, 
  BusinessServiceIcon,
  CookerIcon,
  ElectricIcon,
  EntertainmentIcon,
  HouseKeeperIcon,
  ItIcon
 } from "../assets/icon";
import business from "../assets/Images/business.webp";
import { BusinessOptions } from "./../Data/business";
import { CookerOptions } from './../Data/cooker';
import { ElectricianOptions } from './../Data/electrician';
import electrician from "../assets/Images/electrician.webp"
import entertainment from '../assets/Images/entertainment.webp'
import { EntertainmentOptions } from './../Data/entertainment';
import MainHouseKeeper from './../Data/MainHouseKeeper';
import it from '../assets/Images/it.webp'
import { ItOptions } from './../Data/it';


const initialState = [
  {
    title: "Builder Services",
    icon: BuilderIcon,
    color: "#FF9C68",
    image: builder_1,
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
            title: "Jewellary Items",
            data: BuilderOptions.jewellaryitems,
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
            title: "Tailor Service",
            data: BuilderOptions.tailorservice,
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
            title: "Service Type",
            data: BusinessOptions.CustomerCare.ServiceType,
          },
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
        list: [],
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
        list: [],
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
    list: [
      {
        title:'House Keeper',
        data:MainHouseKeeper
      }
    ],
  },
  {
    title: "It & Technology",
    icon: ItIcon,
    color: "#2381FF",
    image: it,
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
                data:ItOptions.Data.Databases.Category
              },
              {
                title: "Database Type",
                data:ItOptions.Data.Databases.DatabaseType
              },
              {
                title: "Platform",
                data:ItOptions.Data.Databases.Platform
              },
              {
                title: "Cloud Platform",
                data:ItOptions.Data.Databases.CloudPlatform
              },
              {
                title: "Expertise",
                data:ItOptions.Data.Databases.Expertise
              },
            ],
          },
          {
            title: "Data Processing",
            list: [
              {
                title: "Service Type",
                data:ItOptions.Data.DataProcessing.ServiceType
              },
              {
                title: "Technology",
                data:ItOptions.Data.DataProcessing.Technology
              },
              {
                title: "ScrapingTechnique",
                data:ItOptions.Data.DataProcessing.ScrapingTechnique
              },
              {
                title: "Information Type",
                data:ItOptions.Data.DataProcessing.InformationType
              },
              {
                title: "Expertise",
                data:ItOptions.Data.DataProcessing.Expertis
              },
            ],
          },
          {
            title: "Data Analytics",
            list: [
              {
                title: "Service Type",
                data:ItOptions.Data.DataAnalytics.ServiceType
              },
              {
                title: "Technology",
                data:ItOptions.Data.DataAnalytics.Technology
              },
              {
                title: "Analysis Type",
                data:ItOptions.Data.DataProcessing.AnalysisType
              },
              {
                title: "Expertise",
                data:ItOptions.Data.DataAnalytics.Expertise
              },
            ],
          },
          {
            title: "Data Visualization",
            list: [
              {
                title: "Service Type",
                data:ItOptions.Data.DataVisualization.ServiceType
              },
              {
                title: "Tool",
                data:ItOptions.Data.DataVisualization.Tool
              },
              {
                title: "Chart Type",
                data:ItOptions.Data.DataVisualization.ChartType
              },
            ],
          },
          {
            title: "Data Science",
            list: [
              {
                title: "Service Type",
                data:ItOptions.Data.DataScience.ServiceType
              },
              {
                title: "Models & Methods",
                data:ItOptions.Data.DataScience.Models_Methods
              },
              {
                title: "Technology",
                data:ItOptions.Data.DataScience.Technology
              },
              {
                title: "Expertise",
                data:ItOptions.Data.DataScience.Expertise
              },
            ],
          },
          {
            title: "Data Entry",
            list: [
              {
                title: "Type",
                data:ItOptions.Data.DataEntry.Type
              },
              {
                title: "Tool",
                data:ItOptions.Data.DataEntry.Tool
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
                data:ItOptions.Graphic.GraphicsForStreamers.AssetType
              },
              {
                title: "Streaming Platform",
                data:ItOptions.Graphic.GraphicsForStreamers.StreamingPlatform
              },
            ],
          },
          {
            title: "Business Cards",
            list: [
              {
                title: "Main Type",
                data:ItOptions.Graphic.BusinessCards.MainType
              },
              {
                title: "Image File Format",
                data:ItOptions.Graphic.BusinessCards.ImageFileFormat
              },
            ],
          },
          {
            title: "Illustration",
            list: [
              {
                title: "Artistic Technique",
                data:ItOptions.Graphic.Illustration.ArtisticTechnique
              },
              {
                title: "Style",
                data:ItOptions.Graphic.Illustration.Style
              },
              {
                title: "Theme",
                data:ItOptions.Graphic.Illustration.Theme
              },
              {
                title: "Subject",
                data:ItOptions.Graphic.Illustration.Subject
              },
            ],
          },
          {
            title: "Pattern Design",
            list: [
              {
                title: "Design Technique",
                data:ItOptions.Graphic.PatternDesign.DesignTechnique
              },
              {
                title: "Design Style",
                data:ItOptions.Graphic.PatternDesign.DesignStyle
              },
              {
                title: "Purpose",
                data:ItOptions.Graphic.PatternDesign.Purpose
              },
              {
                title: "Pattern Theme",
                data:ItOptions.Graphic.PatternDesign.PatternTheme
              },
            ],
          },
          {
            title: "Flyer Design",
            list: [
              {
                title: "Format Type",
                data:ItOptions.Graphic.FlyerDesign.FormatType
              },
              {
                title: "Image File Format",
                data:ItOptions.Graphic.FlyerDesign.ImageFileFormat
              },
            ],
          },
          {
            title: "Book Design",
            list: [
              {
                title: "Design Style",
                data:ItOptions.Graphic.BookDesign.DesignStyle
              },
              {
                title: "Genre",
                data:ItOptions.Graphic.BookDesign.Genre
              },
              {
                title: "File Format",
                data:ItOptions.Graphic.BookDesign.FileFormat
              },
            ],
          },
          {
            title: "Album Cover Design",
            list: [
              {
                title: "Design Style",
                data:ItOptions.Graphic.AlbumCoverDesign.DesignStyle
              },
              {
                title: "Musical Genre",
                data:ItOptions.Graphic.AlbumCoverDesign.MesicalGenre
              },
              {
                title: "Album Type",
                data:ItOptions.Graphic.AlbumCoverDesign.AlbumType
              },
            ],
          },
          {
            title: "Packaging Design",
            list: [
              {
                title: "Product Type",
                data:ItOptions.Graphic.PackagingDesign.ProductType
              },
              {
                title: "File Format",
                data:ItOptions.Graphic.PackagingDesign.FileFormat
              },
            ],
          },
          {
            title: "Ar Filters Lenses",
            list: [
              {
                title: "Platform",
                data:ItOptions.Graphic.ArFiltersLenses.Platform
              },
              {
                title: "Filter Type",
                data:ItOptions.Graphic.ArFiltersLenses.FilterType
              },
            ],
          },
          {
            title: "Web & Mobile Design",
            list: [
              {
                title: "Main Type",
                data:ItOptions.Graphic.WebMobileDesign.MainType
              },
              {
                title: "Image File Format",
                data:ItOptions.Graphic.WebMobileDesign.ImageFileFormat
              },
            ],
          },
          {
            title: "Social Media Design",
            list: [
              {
                title: "Platform",
                data:ItOptions.Graphic.SocialMediaDesign.Platform
              },
              {
                title: "Image File Format",
                data:ItOptions.Graphic.SocialMediaDesign.ImageFileFormat
              },
            ],
          },
          {
            title: "Menu Design",
            list: [
              {
                title: "Pourpose",
                data:ItOptions.Graphic.MenuDesign.Pourpose
              },
              {
                title: "Style",
                data:ItOptions.Graphic.MenuDesign.Style
              },
            ],
          },
          {
            title: "Invitation Design",
            list: [
              {
                title: "Main Type",
                data:ItOptions.Graphic.InvitationDesign.MainType
              },
              {
                title: "Image File Format",
                data:ItOptions.Graphic.InvitationDesign.ImageFileFormat
              },
            ],
          },
          {
            title: "Portraits Caricatures",
            list: [
              {
                title: "Illustration Type",
                data:ItOptions.Graphic.PortraitsCaricatures.IllustrationType
              },
              {
                title: "Illustration Style",
                data:ItOptions.Graphic.PortraitsCaricatures.IllustrationStyle
              },
            ],
          },
          {
            title: "Cartoons Comics",
            list: [
              {
                title: "Main Type",
                data:ItOptions.Graphic.CartoonsComics.MainType
              },
              {
                title: "Illustration Style",
                data:ItOptions.Graphic.CartoonsComics.IllustrationStyle
              },
              {
                title: "Image File Format",
                data:ItOptions.Graphic.CartoonsComics.ImageFileFormat
              },
            ],
          },
          {
            title: "Web Banners",
            list: [
              {
                title: "Main Type",
                data:ItOptions.Graphic.WebBanners.MainType
              },
              {
                title: "Image File Format",
                data:ItOptions.Graphic.WebBanners.ImageFileFormat
              },
            ],
          },
          {
            title: "Photoshop Editing",
            list: [
              {
                title: "Editing Type",
                data:ItOptions.Graphic.PhotoshopEditing.EditingType
              },
              {
                title: "File Format",
                data:ItOptions.Graphic.PhotoshopEditing.FileFormat
              },
            ],
          },
          {
            title: "Architecture InteriorDesign",
            list: [
              {
                title: "Service Type",
                data:ItOptions.Graphic.ArchitectureInteriorDesign.servicetype
              },
              {
                title: "Project Scale",
                data:ItOptions.Graphic.ArchitectureInteriorDesign.ProjectScale
              },
              {
                title: "Building Type",
                data:ItOptions.Graphic.ArchitectureInteriorDesign.BuildingType
              },
              {
                title: "Image File Format",
                data:ItOptions.Graphic.ArchitectureInteriorDesign.ImagefileFormat
              },
            ],
          },
          {
            title: "Landscape Design",
            list: [
              {
                title: "Service Type",
                data:ItOptions.Graphic.LandscapeDesign.servicetype
              },
              {
                title: "Software",
                data:ItOptions.Graphic.LandscapeDesign.Software
              },
              {
                title: "File Format",
                data:ItOptions.Graphic.LandscapeDesign.FileFormat
              },
            ],
          },
          {
            title: "Character Modeling",
            list: [
              {
                title: "Purpose",
                data:ItOptions.Graphic.CharacterModeling.Purpose
              },
              {
                title: "Style",
                data:ItOptions.Graphic.CharacterModeling.Style
              },
              {
                title: "File Format",
                data:ItOptions.Graphic.CharacterModeling.FileFormat
              },
            ],
          },
          {
            title: "Industrial product Design",
            list: [
              {
                title: "Service type",
                data:ItOptions.Graphic.IndustrialproductDesign.Servicetype
              },
              {
                title: "Field Of expetise",
                data:ItOptions.Graphic.IndustrialproductDesign.FieldOfexpetise
              },
              {
                title: "Design Software",
                data:ItOptions.Graphic.IndustrialproductDesign.DesignSoftware
              },
              {
                title: "FileFormat",
                data:ItOptions.Graphic.IndustrialproductDesign.FileFormat
              },
            ],
          },
          {
            title: "Trade Booth Trade",
            list: [
              {
                title: "Booth Type",
                data:ItOptions.Graphic.TradeBoothTrade.BoothType
              },
              {
                title: "Booth Layout",
                data:ItOptions.Graphic.TradeBoothTrade.BoothLayout
              },
              {
                title: "Industry",
                data:ItOptions.Graphic.TradeBoothTrade.Industry
              },
            ],
          },
          {
            title: "Fashion Design",
            list: [
              {
                title: "Service Type",
                data:ItOptions.Graphic.FashionDesign.ServiceType
              },
              {
                title: "Item Type",
                data:ItOptions.Graphic.FashionDesign.ItemType
              },
              {
                title: "Gender And Group",
                data:ItOptions.Graphic.FashionDesign.GenderAndGroup
              },
              {
                title: "Illustration Purpose",
                data:ItOptions.Graphic.FashionDesign.IllustrationPurpose
              },
              {
                title: "Design Expertise",
                data:ItOptions.Graphic.FashionDesign.DesignExpertise
              },
              {
                title: "Tailoring Method",
                data:ItOptions.Graphic.FashionDesign.TailoringMethod
              },
              {
                title: "File Format",
                data:ItOptions.Graphic.FashionDesign.FileFormat
              },
            ],
          },
          {
            title: "Jewelry Design",
            list: [
              {
                title: "Service Type",
                data:ItOptions.Graphic.JewelryDesign.ServiceType
              },
              {
                title: "Software",
                data:ItOptions.Graphic.JewelryDesign.Software
              },
              {
                title: "Jewelry Type",
                data:ItOptions.Graphic.JewelryDesign.JewelryType
              },
            ],
          },
          {
            title: "Resentation Design",
            list: [
              {
                title: "Service Type",
                data:ItOptions.Graphic.ResentationDesign.ServiceType
              },
              {
                title: "Purpose",
                data:ItOptions.Graphic.ResentationDesign.Purpose
              },
              {
                title: "Presentation Software",
                data:ItOptions.Graphic.ResentationDesign.PresentationSoftware
              },
              {
                title: "Industry",
                data:ItOptions.Graphic.ResentationDesign.Industry
              },
              {
                title: "Image File format",
                data:ItOptions.Graphic.ResentationDesign.ImageFileformat
              },
            ],
          },
          {
            title: "Car Wraps",
            list: [
              {
                title: "Vehicle Type",
                data:ItOptions.Graphic.ResentationDesign.VehicleType
              },
              {
                title: "File format",
                data:ItOptions.Graphic.ResentationDesign.Fileformat
              },
            ],
          },
          {
            title: "Tattoo Design",
            list: [
              {
                title: "Tattoo Style",
                data:ItOptions.Graphic.TattooDesign.TattooStyle
              },
              {
                title: "Color Type",
                data:ItOptions.Graphic.TattooDesign.ColorType
              },
            ],
          },
          {
            title: "Brand Style Guide",
            list: [
              {
                title: "Brand Style Guide",
                data:ItOptions.Graphic.BrandStyleGuide
              },
            ],
          },
          {
            title: "Format Type",
            list: [
              {
                title: "Format Type",
                data:ItOptions.Graphic.FormatType
              },
            ],
          },
          {
            title: "Game Category",
            list: [
              {
                title: "Game Category",
                data:ItOptions.Graphic.GameCategory
              },
            ],
          },
          {
            title: "Infographic",
            list: [
              {
                title: "Infographic",
                data:ItOptions.Graphic.Infographic
              },
            ],
          },
          {
            title: "Logo Design",
            list: [
              {
                title: "Logo Design",
                data:ItOptions.Graphic.LogoDesign
              },
            ],
          },
          {
            title: "Podcast Design",
            list: [
              {
                title: "Podcast Design",
                data:ItOptions.Graphic.PodcastDesign
              },
            ],
          },
          {
            title: "Postcard Design",
            list: [
              {
                title: "Postcard Design",
                data:ItOptions.Graphic.PostcardDesign
              },
            ],
          },
          {
            title: "Signage Design",
            list: [
              {
                title: "Signage Design",
                data:ItOptions.Graphic.SignageDesign
              },
            ],
          },
          {
            title: "Story Boards",
            list: [
              {
                title: "Story Boards",
                data:ItOptions.Graphic.StoryBoards
              },
            ],
          },
          {
            title: "T shirt",
            list: [
              {
                title: "T shirt",
                data:ItOptions.Graphic.Tshirt
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
                data:ItOptions.DigitalMarketing.SocialMediaMarketing.ServiceType
              },
              {
                title: "Database Type",
                data:ItOptions.DigitalMarketing.SocialMediaMarketing.DatabaseType
              },
              {
                title: "Platform Type",
                data:ItOptions.DigitalMarketing.SocialMediaMarketing.PlatformType
              },
              {
                title: "Content Type",
                data:ItOptions.DigitalMarketing.SocialMediaMarketing.ContentType
              },
              {
                title: "Management Tools",
                data:ItOptions.DigitalMarketing.SocialMediaMarketing.ManagementTools
              },
            ],
          },
          {
            title: "Podcast Marketing",
            list: [
              {
                title: "Service Type",
                data:ItOptions.DigitalMarketing.PodcastMarketing.ServiceType
              },
              {
                title: "Podcast Category",
                data:ItOptions.DigitalMarketing.PodcastMarketing.PodcastCategory
              },
              {
                title: "Podcast Aggregator",
                data:ItOptions.DigitalMarketing.PodcastMarketing.PodcastAggregator
              },
            ],
          },
          {
            title: "Social Media Advertising",
            list: [
              {
                title: "Service Type",
                data:ItOptions.DigitalMarketing.SOCIALMEDIAADVERTISING.ServiceType
              },
              {
                title: "Platform Type",
                data:ItOptions.DigitalMarketing.SOCIALMEDIAADVERTISING.PlatformType
              },
            ],
          },
          {
            title: "Seo",
            list: [
              {
                title: "Service Type",
                data:ItOptions.DigitalMarketing.Seo.ServiceType
              },
              {
                title: "Platform Type",
                data:ItOptions.DigitalMarketing.Seo.IndustryExpertise
              },
            ],
          },
          {
            title: "Email Marketing",
            list: [
              {
                title: "Service Type",
                data:ItOptions.DigitalMarketing.EmailMarketing.ServiceType
              },
              {
                title: "Email Platform",
                data:ItOptions.DigitalMarketing.EmailMarketing.EmailPlatform
              },
              {
                title: "Method",
                data:ItOptions.DigitalMarketing.EmailMarketing.Method
              },
              {
                title: "Tools",
                data:ItOptions.DigitalMarketing.EmailMarketing.Tools
              },
            ],
          },
          {
            title: "Text Message Marketing",
            list: [
              {
                title: "Platform",
                data:ItOptions.DigitalMarketing.TextMessageMarketing.Platform
              },
              {
                title: "Messaging Type",
                data:ItOptions.DigitalMarketing.TextMessageMarketing.MessagingType
              },
            ],
          },
          {
            title: "Sem",
            list: [
              {
                title: "Service Type",
                data:ItOptions.DigitalMarketing.Sem.ServiceType
              },
              {
                title: "Industry",
                data:ItOptions.DigitalMarketing.Sem.Industry
              },
              {
                title: "Method",
                data:ItOptions.DigitalMarketing.Sem.Method
              },
              {
                title: "Tools",
                data:ItOptions.DigitalMarketing.Sem.Tools
              },
            ],
          },
          {
            title: "Crowdfunding",
            list: [
              {
                title: "Service Type",
                data:ItOptions.DigitalMarketing.Crowdfunding.ServiceType
              },
              {
                title: "Platform Type",
                data:ItOptions.DigitalMarketing.Crowdfunding.PlatformType
              },
            ],
          },
          {
            title: "Display Advertising",
            list: [
              {
                title: "Service Type",
                data:ItOptions.DigitalMarketing.DisplayAdvertising.ServiceType
              },
              {
                title: "Add Network",
                data:ItOptions.DigitalMarketing.DisplayAdvertising.AdNetwork
              },
              {
                title: "Placement",
                data:ItOptions.DigitalMarketing.DisplayAdvertising.Placement
              },
              {
                title: "Add Format",
                data:ItOptions.DigitalMarketing.DisplayAdvertising.AdFormat
              },
              {
                title: "Industry",
                data:ItOptions.DigitalMarketing.DisplayAdvertising.Industry
              },
            ],
          },
          {
            title: "Surveys",
            list: [
              {
                title: "Service Type",
                data:ItOptions.DigitalMarketing.Surveys.ServiceType
              },
              {
                title: "Survey Platform",
                data:ItOptions.DigitalMarketing.Surveys.SurveyPlatform
              },
              {
                title: "Survey Type",
                data:ItOptions.DigitalMarketing.Surveys.SurveyType
              },
              {
                title: "Add Format",
                data:ItOptions.DigitalMarketing.Surveys.AdFormat
              },
              {
                title: "Industry",
                data:ItOptions.DigitalMarketing.Surveys.Industry
              },
            ],
          },
          {
            title: "Marketing Strategy",
            list: [
              {
                title: "Consulting",
                data:ItOptions.DigitalMarketing.MarketingStrategy.Consulting
              },
              {
                title: "Strategy Purpose",
                data:ItOptions.DigitalMarketing.MarketingStrategy.StrategyPurpose
              },
              {
                title: "Business stage",
                data:ItOptions.DigitalMarketing.MarketingStrategy.Businessstage
              },
              {
                title: "Business Type",
                data:ItOptions.DigitalMarketing.MarketingStrategy.BusinessType
              },
            ],
          },
          {
            title: "ECommerce Marketing",
            list: [
              {
                title: "Service Type",
                data:ItOptions.DigitalMarketing.ECommerceMarketing.ServiceType
              },
              {
                title: "Platform Type",
                data:ItOptions.DigitalMarketing.ECommerceMarketing.PlatformType
              },
              {
                title: "Industry",
                data:ItOptions.DigitalMarketing.ECommerceMarketing.Industry
              },
              {
                title: "Promotion Method",
                data:ItOptions.DigitalMarketing.ECommerceMarketing.PromotionMethod
              },
            ],
          },
          {
            title: "Influencer Marketing",
            list: [
              {
                title: "Strategy Research",
                data:ItOptions.DigitalMarketing.InfluencerMarketing.StrategyResearch
              },
              {
                title: "Target Audience",
                data:ItOptions.DigitalMarketing.InfluencerMarketing.TargetAudience
              },
              {
                title: "Platform Type",
                data:ItOptions.DigitalMarketing.InfluencerMarketing.PlatformType
              },
            ],
          },
          {
            title: "Community Management",
            list: [
              {
                title: "Service Type",
                data:ItOptions.DigitalMarketing.CommunityManagement.ServiceType
              },
              {
                title: "Industry",
                data:ItOptions.DigitalMarketing.CommunityManagement.Industry
              },
              {
                title: "Community Presence",
                data:ItOptions.DigitalMarketing.CommunityManagement.CommunityPresence
              },
            ],
          },
          {
            title: "Affilate Markting",
            list: [
              {
                title: "Service Type",
                data:ItOptions.DigitalMarketing.AffilateMarkting.ServiceType
              },
              {
                title: "Affiliate Networks",
                data:ItOptions.DigitalMarketing.AffilateMarkting.AffiliateNetworks
              },
              {
                title: "Affiliate Networks/ Programs",
                data:ItOptions.DigitalMarketing.AffilateMarkting.AffiliateNetworksPrograms
              },
            ],
          },
          {
            title: "MobileApp Marketing",
            list: [
              {
                title: "Service Type",
                data:ItOptions.DigitalMarketing.MobileAppMarketing.ServiceType
              },
              {
                title: "Application Store",
                data:ItOptions.DigitalMarketing.MobileAppMarketing.ApplicationStore
              },
              {
                title: "Industry",
                data:ItOptions.DigitalMarketing.MobileAppMarketing.Industry
              },
            ],
          },
          {
            title: "MusicPromotion",
            list: [
              {
                title: "Service Type",
                data:ItOptions.DigitalMarketing.MusicPromotion.ServiceType
              },
              {
                title: "Music Platform",
                data:ItOptions.DigitalMarketing.MusicPromotion.MusicPlatform
              },
              {
                title: "Musical Genre",
                data:ItOptions.DigitalMarketing.MusicPromotion.MusicalGenre
              },
              {
                title: "Platform Type",
                data:ItOptions.DigitalMarketing.MusicPromotion.PlatformType
              },
              {
                title: "Channel",
                data:ItOptions.DigitalMarketing.MusicPromotion.Channel
              },
            ],
          },
          {
            title: "DomainResearch",
            list: [
              {
                title: "Domain Research",
                data:ItOptions.DigitalMarketing.DomainResearch
              },
            ],
          },
          {
            title: "LocalSeo",
            list: [
              {
                title: "Local Seo",
                data:ItOptions.DigitalMarketing.LocalSeo
              },
            ],
          },
          {
            title: "VideoMarketing",
            list: [
              {
                title: "Video Marketing",
                data:ItOptions.DigitalMarketing.VideoMarketing
              },
            ],
          },
          {
            title: "WebAnalytics",
            list: [
              {
                title: "Web Analytics",
                data:ItOptions.DigitalMarketing.WebAnalytics
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
                data:ItOptions.ProgramingTeach.WebsiteBuildersCms.ServiceType
              },
              {
                title: "Platform",
                data:ItOptions.ProgramingTeach.WebsiteBuildersCms.Platform
              },
              {
                title: "Specialization",
                data:ItOptions.ProgramingTeach.WebsiteBuildersCms.Specialization
              },
              {
                title: "Supported Plugin Types",
                data:ItOptions.ProgramingTeach.WebsiteBuildersCms.SupportedPluginTypes
              },
            ],
          },
          {
            title: "Word press",
            list: [
              {
                title: "Service Type",
                data:ItOptions.ProgramingTeach.Wordpress.ServiceType
              },
              {
                title: "Specialization",
                data:ItOptions.ProgramingTeach.Wordpress.Specialization
              },
              {
                title: "Supported Plugin Types",
                data:ItOptions.ProgramingTeach.Wordpress.SupportedPluginTypes
              },
              {
                title: "Integrating Plugins",
                data:ItOptions.ProgramingTeach.Wordpress.IntegratingPlugins
              },
            ],
          },
          {
            title: "Game Development",
            list: [
              {
                title: "Service Type",
                data:ItOptions.ProgramingTeach.GameDevelopment.ServiceType
              },
              {
                title: "Game Type",
                data:ItOptions.ProgramingTeach.GameDevelopment.GameType
              },
              {
                title: "Platform Type",
                data:ItOptions.ProgramingTeach.GameDevelopment.PlatformType
              },
              {
                title: "Genree",
                data:ItOptions.ProgramingTeach.GameDevelopment.Genree
              },
              {
                title: "Plugins",
                data:ItOptions.ProgramingTeach.GameDevelopment.Plugins
              },
              {
                title: "Customization Type",
                data:ItOptions.ProgramingTeach.GameDevelopment.CustomizationType
              },
              {
                title: "Game Name",
                data:ItOptions.ProgramingTeach.GameDevelopment.GameName
              },
            ],
          },
          {
            title: "Development For Streamers",
            list: [
              {
                title: "Service Type",
                data:ItOptions.ProgramingTeach.DevelopmentForStreamers.ServiceType
              },
              {
                title: "Software",
                data:ItOptions.ProgramingTeach.DevelopmentForStreamers.Software
              },
              {
                title: "Platform",
                data:ItOptions.ProgramingTeach.DevelopmentForStreamers.Platform
              },
              {
                title: "Purpose",
                data:ItOptions.ProgramingTeach.DevelopmentForStreamers.Purpose
              },
            ],
          },
          {
            title: "Online Coding Lessons",
            list: [
              {
                title: "Lesson Purpose",
                data:ItOptions.ProgramingTeach.OnlineCodingLessons.LessonPurpose
              },
              {
                title: "Development Techonlogy",
                data:ItOptions.ProgramingTeach.OnlineCodingLessons.DevelopmentTechonlogy
              },
            ],
          },
          {
            title: "Support It",
            list: [
              {
                title: "Device",
                data:ItOptions.ProgramingTeach.SupportIt.Device
              },
              {
                title: "Operating System",
                data:ItOptions.ProgramingTeach.SupportIt.OperatingSystem
              },
              {
                title: "Also Delivering",
                data:ItOptions.ProgramingTeach.SupportIt.AlsoDelivering
              },
            ],
          },
          {
            title: "Chatbots",
            list: [
              {
                title: "Messaging Platform",
                data:ItOptions.ProgramingTeach.SupportIt.MessagingPlatform
              },
              {
                title: "Bot Type",
                data:ItOptions.ProgramingTeach.SupportIt.BotType
              },
              {
                title: "Development Technology",
                data:ItOptions.ProgramingTeach.SupportIt.DevelopmentTechnology
              },
            ],
          },
          {
            title: "Data Analysis Reports",
            list: [
              {
                title: "Service Type",
                data:ItOptions.ProgramingTeach.DataAnalysisReports.ServiceType
              },
              {
                title: "Tool",
                data:ItOptions.ProgramingTeach.DataAnalysisReports.Tool
              },
            ],
          },
          {
            title: "Convert Files",
            list: [
              {
                title: "Service Type",
                data:ItOptions.ProgramingTeach.ConvertFiles.ServiceType
              },
              {
                title: "Convert From",
                data:ItOptions.ProgramingTeach.ConvertFiles.ConvertFrom
              },
              {
                title: "Convert To",
                data:ItOptions.ProgramingTeach.ConvertFiles.ConvertTo
              },
            ],
          },
          {
            title: "Data bases",
            list: [
              {
                title: "Service Type",
                data:ItOptions.ProgramingTeach.Databases.ServiceType
              },
              {
                title: "Databases Type",
                data:ItOptions.ProgramingTeach.Databases.DatabasesType
              },
            ],
          },
          {
            title: "Qa Review",
            list: [
              {
                title: "Service Type",
                data:ItOptions.ProgramingTeach.QaReview.ServiceType
              },
              {
                title: "Testing Application",
                data:ItOptions.ProgramingTeach.QaReview.TestingApplication
              },
              {
                title: "Device",
                data:ItOptions.ProgramingTeach.QaReview.Device
              },
              {
                title: "Expertise",
                data:ItOptions.ProgramingTeach.QaReview.Expertise
              },
            ],
          },
          
        ],
      },
    ],
  },
];
const allData = (state = initialState, action) => {
  if (action.type === "SET_DATA") {
    return (state = action.playload);
  }
  return state;
};
export default allData;
