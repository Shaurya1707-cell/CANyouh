export type Flavor = {
  name: string;
  desc: string;
  price: string;
  image: string;
  color: string;
};

export const FLAVORS: Flavor[] = [
  {
    name: "Oreo Chocolate",
    desc: "Dark cocoa layers with crushed Oreo, smothered in Belgian chocolate ganache.",
    price: "₹129",
    image: new URL("../assets/flavor-oreo.jpg", import.meta.url).toString(),
    color: "from-[hsl(15,50%,16%)]",
  },
  {
    name: "Lotus Biscoff",
    desc: "Caramelised biscuit crumble layered with silky Biscoff cream.",
    price: "₹139",
    image: new URL("../assets/flavor-biscoff.jpg", import.meta.url).toString(),
    color: "from-[hsl(25,60%,30%)]",
  },
  {
    name: "Strawberry Cheesecake",
    desc: "Tangy strawberry compote meets velvety cream cheese on a biscuit base.",
    price: "₹139",
    image: new URL("../assets/flavor-strawberry.jpg", import.meta.url).toString(),
    color: "from-[hsl(350,60%,40%)]",
  },
  {
    name: "Mango Cream",
    desc: "Alphonso mango mousse with fresh mango chunks and a buttery sponge.",
    price: "₹119",
    image: new URL("../assets/flavor-mango.jpg", import.meta.url).toString(),
    color: "from-[hsl(40,90%,45%)]",
  },
];

