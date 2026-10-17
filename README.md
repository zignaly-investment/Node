# Node.js — Property Summary

## Clone the repository

```bash
git clone https://github.com/zignaly-investment/Node.git
cd Node
```

## Backend

```bash
cd Node
npm install
npm start
```

## Setup

```bash
npm install
npm test
```

## Test Result

```bash
git add .
git commit -m "Your message"
git checkout -b <YourBranchName>
git push -u origin <YourBranchName>
```

Then create a PR.

---

# Problem (5–10 minutes)

Use objects shaped like `data` from `GET /api/v1/properties`.

Implement `summarize(properties)` in `src/summarize.js`:

- Ignore items with a blank `title` or `priceUsd` < 0
- `count` — number of kept items
- `totalPrice` — sum of `priceUsd`
- `topTitle` — title with the highest `expectedRoi`; on a tie, the first one
- Empty → count 0, totalPrice 0, topTitle `""`
