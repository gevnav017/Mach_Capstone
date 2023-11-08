const prisma = require("./client");

const products = [
  { brand: "Bose", name: "Speaker", type: "Soundbar", price: 128.56, category: "Speaker", image: "../../client/images/bose-soundbar1.jpg" },
  { brand: "Bose", name: "Speaker", type: "Bluetooth", price: 288.56, category: "Speaker", image: "../../client/images/bose-bluetooth1.jpg" },
  { brand: "Bose", name: "Quiet Confort Pro", type: "Bluetooth", price: 352.56, category: "Earbud", image: "../../client/images/bose-bluetooth1.jpg" },
  { brand: "Bose", name: "Quiet Comfort II", type: "Bluetooth", price: 245.56, category: "Earbud", image: "../../client/images/bose-bluetooth1.jpg" },
];

const productsData = async () => {
  await prisma.products.deleteMany();
  await prisma.products.createMany({
    data: products,
  });
};

productsData();

const usersData = async () => {
  await prisma.users.deleteMany();
  await prisma.users.create({
    data: {
      userName: "testUserName",
      password: "testPassword",
      firstName: "testFirstName",
      lastName: "testLastName"
    }
  });
};

usersData();

