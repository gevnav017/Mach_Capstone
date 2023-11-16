const prisma = require("./client");
require("dotenv").config()

const products = [
  { brand: "Bose", name: "Soundbar 600", type: "Soundbar", price: 128.56, category: "Speaker", image: "/images/bose/bose-soundbar600.jpg" },
  { brand: "Bose", name: "S1 Pro", type: "Bluetooth", price: 288.56, category: "Speaker", image: "/images/bose/bose-s1pro.jpg" },
  { brand: "Bose", name: "Portable Smart Speaker", type: "Bluetooth", price: 399.00, category: "Speaker", image: "/images/bose/bose-portable.jpg" },
  { brand: "Bose", name: "SoundLink Micro", type: "Bluetooth", price: 119.00, category: "Speaker", image: "/images/bose/bose-micro.jpg" },
  { brand: "Bose", name: "SoundLink Flex", type: "Bluetooth", price: 149.00, category: "Speaker", image: "/images/bose/bose-soundflex.jpg" },
  { brand: "Bose", name: "QuietComfort", type: "Noise-Cancellation", price: 349.00, category: "Headphone", image: "/images/bose/bose-quiet.jpg" },
  { brand: "Bose", name: "Noise Cancelling", type: "Bluetooth", price: 279.00, category: "Headphone", image: "/images/bose/bose-noisecancel.jpg" },
  { brand: "Bose", name: "QuietComfort Ultra", type: "Noise-Cancellation", price: 299.00, category: "Earbud", image: "/images/bose/bose-comfort.jpg" },
  { brand: "Bose", name: "QuietComfort Ultra With Wireless Case", type: "Bluetooth", price: 348.00, category: "Earbud", image: "/images/bose/bose-ultra.jpg" },

  { brand: "JBL", name: "Go 3", type: "Bluetooth", price: 49.95, category: "Speaker", image: "/images/jbl/jbl-go.jpg" },
  { brand: "JBL", name: "PartyBox Ultimate", type: "Bluetooth", price: 1699.95, category: "Speaker", image: "/images/jbl/jbl-ultimate.jpg" },
  { brand: "JBL", name: "PartyBox Encore", type: "Wireless", price: 399.95, category: "Speaker", image: "/images/jbl/jbl-partybox.jpg" },
  { brand: "JBL", name: "Live 660NC", type: "Noise-Cancellation", price: 99.95, category: "Headphone", image: "/images/jbl/jbl-live.jpg" },
  { brand: "JBL", name: "Free WFH Wireless", type: "Wireless", price: 99.95, category: "Headphone", image: "/images/jbl/jbl-free.jpg" },
  { brand: "JBL", name: "Tour Pro 2", type: "Noise-Cancellation", price: 249.95, category: "Earbud", image: "/images/jbl/jbl-tour.jpg" },
  { brand: "JBL", name: "Tune Buds", type: "Bluetooth", price: 99.95, category: "Earbud", image: "/images/jbl/jbl-tune.jpg" },
  { brand: "JBL", name: "Endurance Peak 3", type: "Noise-Cancellation", price: 89.95, category: "Earbud", image: "/images/jbl/jbl-peak.jpg" },

  { brand: "SONY", name: "NS7 Wireless Wearable TV", type: "Wireless", price: 299.99, category: "Speaker", image: "/images/sony/sony-ns7.jpg" },
  { brand: "SONY", name: "LSPX-S3 Glass Sound Speaker", type: "Bluetooth", price: 349.99, category: "Speaker", image: "/images/sony/sony-glass.jpg" },
  { brand: "SONY", name: "WH-1000XM5 Wireless", type: "Wireless", price: 399.99, category: "Headphone", image: "/images/sony/sony-wh.jpg" },
  { brand: "SONY", name: "WH-CH720N Wireless", type: "Noise-Cancellation", price: 149.99, category: "Headphone", image: "/images/sony/sony-ch.jpg" },
  { brand: "SONY", name: "IER-Z1R Signature Series", type: "High-Resolution", price: 1699.99, category: "Headphone", image: "/images/sony/sony-ier.jpg" },
  { brand: "SONY", name: "WF-1000XM5 Wireless", type: "Wireless", price: 299.99, category: "Earbud", image: "/images/sony/sony-wf.jpg" },
  { brand: "SONY", name: "LinkBuds", type: "Wireless", price: 139.99, category: "Earbud", image: "/images/sony/sony-link.jpg" },

  { brand: "Harman Kardon", name: "Onyx Studio 8", type: "Bluetooth", price: 499.95, category: "Speaker", image: "/images/harman/harman-onyx.jpg" },
  { brand: "Harman Kardon", name: "Aura Studio 4", type: "Bluetooth", price: 299.95, category: "Speaker", image: "/images/harman/harman-aura.jpg" },
  { brand: "Harman Kardon", name: "FLY ANC", type: "Wireless", price: 174.97, category: "Headphone", image: "/images/harman/harman-fly.jpg" },
  { brand: "Harman Kardon", name: "FLY TWS", type: "Wireless", price: 149.95, category: "Headphone", image: "/images/harman/harman-tws.jpg" },

  { brand: "Beats by Dre", name: "Beats Studio Pro", type: "Noise-Cancellation", price: 349.99, category: "Headphone", image: "/images/beats/beats-pro.jpg" },
  { brand: "Beats by Dre", name: "Beats Solo3 Wireless", type: "Wireless", price: 199.95, category: "Headphone", image: "/images/beats/beats-solo.jpg" },
  { brand: "Beats by Dre", name: "Beats Studio Buds+", type: "Noise-Cancellation", price: 169.99, category: "Earbud", image: "/images/beats/beats-studio.jpg" },
  { brand: "Beats by Dre", name: "Powerbeats Pro", type: "Wireless", price: 249.95, category: "Earbud", image: "/images/beats/beats-power.jpg" },
];

const productsData = async () => {
  await prisma.products.deleteMany();
  await prisma.products.createMany({
    data: products,
  });
};

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

const ordersData = async () => {
  await prisma.orders.deleteMany();
};

const runData = async () => {
  await ordersData();
  await usersData();
  await productsData();
}

runData()