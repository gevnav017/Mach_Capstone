const prisma = require("./client");

const products = [
  { brand: "Bose", name: "Speaker", type: "Soundbar", price: 128.56, category: "Speaker", image: "../../public/images/bose-soundbar1.jpg" },
  { brand: "Bose", name: "Speaker", type: "Bluetooth", price: 288.56, category: "Speaker", image: "../../public/images/bose-bluetooth1.jpg" },
  { brand: "Bose", name: "Portable Smart Speaker", type: "Bluetooth", price: 399.00, category: "Speaker", image: "../../public/images/bose-portable.jpg" },
  { brand: "Bose", name: "SoundLink Micro", type: "Bluetooth", price: 119.00, category: "Speaker", image: "../../public/images/bose-micro.jpg" },
  { brand: "Bose", name: "SoundLink Flex", type: "Bluetooth", price: 149.00, category: "Speaker", image: "../../public/images/bose-soundflex.jpg" },
  { brand: "Bose", name: "QuietComfort", type: "Noise-Cancellation", price: 349.00, category: "Headphone", image: "../../public/images/bose-quiet.jpg" },
  { brand: "Bose", name: "Noise Cancelling", type: "Bluetooth", price: 279.00, category: "Headphone", image: "../../public/images/bose-noisecancel.jpg" },
  { brand: "Bose", name: "QuietConfort Ultra", type: "Noise-Cancellation", price: 299.00, category: "Earbud", image: "../../public/images/bose-comfort.jpg" },
  { brand: "Bose", name: "QuietComfort Ultra With Wireless Case", type: "Bluetooth", price: 348.00, category: "Earbud", image: "../../public/images/bose-ultra.jpg" },

  { brand: "JBL", name: "Go 3", type: "Bluetooth", price: 49.95, category: "Speaker", image: "../../public/images/jbl-go.jpg" },
  { brand: "JBL", name: "PartyBox Ultimate", type: "Bluetooth", price: 1699.95, category: "Speaker", image: "../../public/images/jbl-ultimate.jpg" },
  { brand: "JBL", name: "PartyBox Encore", type: "Wireless", price: 399.95, category: "Speaker", image: "../../public/images/jbl-partybox.jpg" },
  { brand: "JBL", name: "Live 660NC", type: "Noise-Cancellation", price: 99.95, category: "Headphone", image: "../../public/images/jbl-live.jpg" },
  { brand: "JBL", name: "Free WFH Wireless", type: "Wireless", price: 99.95, category: "Headphone", image: "../../public/images/jbl-free.jpg" },
  { brand: "JBL", name: "Tour Pro 2", type: "Noise-Cancellation", price: 249.95, category: "Earbud", image: "../../public/images/jbl-tour.jpg" },
  { brand: "JBL", name: "Tune Buds", type: "Bluetooth", price: 99.95, category: "Earbud", image: "../../public/images/jbl-tune.jpg" },
  { brand: "JBL", name: "Endurance Peak 3", type: "Noise-Cancellation", price: 89.95, category: "Earbud", image: "../../public/images/jbl-peak.jpg" },


  { brand: "SONY", name: "NS7 Wireless Wearable TV", type: "Wireless", price: 299.99, category: "Speaker", image: "../../public/images/sony-ns7.jpg" },
  { brand: "SONY", name: "LSPX-S3 Glass Sound Speaker", type: "Bluetooth", price: 349.99, category: "Speaker", image: "../../public/images/sony-glass.jpg" },
  { brand: "SONY", name: "WH-1000XM5 Wireless", type: "Wireless", price: 399.99, category: "Headphone", image: "../../public/images/sony-wh.jpg" },
  { brand: "SONY", name: "WH-CH720N Wireless", type: "Noise-Cancellation", price: 149.99, category: "Headphone", image: "../../public/images/sony-ch.jpg" },
  { brand: "SONY", name: "IER-Z1R Signature Series", type: "High-Resolution", price: 1699.99, category: "Headphone", image: "../../public/images/sony-ier.jpg" },
  { brand: "SONY", name: "WF-1000XM5 Wireless", type: "Wireless", price: 299.99, category: "Earbud", image: "../../public/images/sony-wf.jpg" },
  { brand: "SONY", name: "LinkBuds", type: "Wireless", price: 139.99, category: "Earbud", image: "../../public/images/sony-link.jpg" },

  { brand: "Harman Kardon", name: "Onyx Studio 8", type: "Bluetooth", price: 499.95, category: "Speaker", image: "../../public/images/harman-onyx.jpg" },
  { brand: "Harman Kardon", name: "Aura Studio 4", type: "Bluetooth", price: 299.95, category: "Speaker", image: "../../public/images/harman-aura.jpg" },
  { brand: "Harman Kardon", name: "FLY ANC", type: "Wireless", price: 174.97, category: "Headphone", image: "../../public/images/harman-fly.jpg" },
  { brand: "Harman Kardon", name: "FLY TWS", type: "Wireless", price: 149.95, category: "Headphone", image: "../../public/images/harman-tws.jpg" },

  { brand: "Beats by Dre", name: "Beats Studio Pro", type: "Noise-Cancellation", price: 349.99, category: "Headphone", image: "../../public/images/beats-pro.jpg" },
  { brand: "Beats by Dre", name: "Beats Solo3 Wireless", type: "Wireless", price: 199.95, category: "Headphone", image: "../../public/images/beats-solo.jpg" },
  { brand: "Beats by Dre", name: "Beats Studio Buds+", type: "Noise-Cancellation", price: 169.99, category: "Earbud", image: "../../public/images/beats-studio.jpg" },
  { brand: "Beats by Dre", name: "Powerbeats Pro", type: "Wireless", price: 249.95, category: "Earbud", image: "../../public/images/beats-power.jpg" },
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

