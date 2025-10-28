import BurgerImg from "../assets/images/burger.png";
import SaladImg from "../assets/images/salad.png";
import PastaImg from "../assets/images/pasta.png";
import PizzaImg from "../assets/images/pizza.png";
import BreakfastImg from "../assets/images/breakfast.png";
import SoupImg from "../assets/images/soup.png";

export const CATEGORIES = [
  {
    name: "Burger & FastFood",
    slug: "burger",
    img: BurgerImg,
    alt: "Burger & Fast Food",
    additiontext: "Hot & Tasty",
    link: "/menu?type=burger",
  },
  {
    name: "Salads",
    slug: "salad",
    img: SaladImg,
    alt: "Fresh Salads",
    additiontext: "Healthy & Fresh",
    link: "/menu?type=salad",
  },
  {
    name: "Pasta & Casuals",
    slug: "pasta",
    img: PastaImg,
    alt: "Pasta & Casuals",
    additiontext: "Italian Favorites",
    link: "/menu?type=other",
  },
  {
    name: "Pizza",
    slug: "pizza",
    img: PizzaImg,
    alt: "Pizza",
    additiontext: "Cheesy & Hot",
    link: "/menu?type=pizza",
  },
  {
    name: "Breakfast",
    slug: "breakfast",
    img: BreakfastImg,
    alt: "Breakfast",
    additiontext: "Start Your Day",
    link: "/menu?type=breakfast",
  },
  {
    name: "Soup",
    slug: "soup",
    img: SoupImg,
    alt: "Soup",
    additiontext: "Warm & Cozy",
    link: "/menu?type=soup",
  },
];
