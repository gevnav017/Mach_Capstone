const prisma = require("./client");

const products = [
  { brand: "Bose", type: "Soundbar", price: 128.56, category: "Speaker", image: "../../client/images/bose-soundbar1.jpg" },
  { brand: "Bose", type: "Bluetooth", price: 288.56, category: "Speaker", image: "../../client/images/bose-bluetooth1.jpg" },
];

const productsData = async () => {
  await prisma.products.deleteMany();
  await prisma.products.createMany({
    data: products,
  });
};

productsData();

