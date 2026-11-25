# Wednesday 25 November 2026 — The World in One Day

[![make.fun · news-image-20261125](https://make.fun/badge/news-image-20261125.svg)](https://make.fun/bounty/news-image-20261125?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261125)
[![rank](https://make.fun/badge/news-image-20261125/zargaan/news-image-25nov/rank.svg)](https://make.fun/bounty/news-image-20261125/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261125)
[![reward](https://make.fun/badge/news-image-20261125/zargaan/news-image-25nov/reward.svg)](https://make.fun/bounty/news-image-20261125?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261125)

An entry for the make.fun bounty **"Sum up 25 November's world news in one image"**
(`news-image-20261125`), by [@zargaan](https://make.fun/u/zargaan).

`main.ts` reproduces the finished image deterministically: it reads
`entry.png` from the same folder as the script and writes the identical
bytes to the output directory as `entry.png`.

## The image

A single 1024×1024 newspaper-style front page, **"THE WORLD IN ONE DAY —
Wednesday 25 November 2026"**, covering 37 dated stories across 9 regions
and 16 fields, all from Wednesday 25 November 2026 up to 13:30 UTC.

### Lead stories (scenes 1–11)

1. **AI doubts crash Asia's chip stocks, Kospi −6.2%** — SK Hynix −11.1%,
   Samsung −9.9%, SoftBank −15% (Seoul–Tokyo markets).
2. **China launches Pakistan's first astronaut to Tiangong** — Shenzhou-24
   lifts off carrying Muhammad Zeeshan Ali, 40, the first foreign crew
   member; docking at 03:56 UTC.
3. **UK energy bills to jump 26% on Iran-war gas shock** — Ofgem lifts the
   Jan–Mar 2027 cap to £2,166 a year from £1,723, hitting 20m households.
4. **Saudi coalition bombs Hodeidah port** — airstrikes hit port targets,
   4 drones downed near Ras Tanura; 6+ strikes (Yemen).
5. **Australia & Solomons sign $740M defence pact** — a 10-year treaty
   barring foreign bases, ending China's 2022 security deal.
6. **US Oct PCE inflation hits 2023 high** — core PCE 3.8% year on year,
   fuelling Fed hike bets as Nasdaq futures slide.
7. **Bangladesh garment wage jumps 36%** — the wage board backs 17,500
   taka ($136) a month after factory unrest (Dhaka).
8. **Nationwide general strike halts Greece** — unions shut ferries and
   disrupt flights and Athens transit; 60+ cities.
9. **Cartagena hostage siege ends** — about 20 freed after an 18-hour
   market standoff; one gunman dead (Colombia).
10. **RSF drones kill 14+ in Sudan's Blue Nile** — barrage hits Damazin
    and Roseires homes, wounding 20+ civilians; 40+ drones.
11. **WHO pledges $2M for Cuba fuel crisis** — Tedros urges lifting US
    fuel curbs amid 20-hour hospital blackouts.

### The rest of the page

- A **world map** ("WHERE IT HAPPENED") pinning scenes 1–11, with a
  region legend (Europe 6, Middle East 5, Africa 6, East Asia 4,
  South & SE Asia 3, Oceania 3, N. America 4, Latin America 3,
  World & Space 3).
- **26 more dated briefs** (items 12–37): London, Ukraine, Samara,
  Brussels, Hormuz, the Red Sea, Gaza, Jerusalem, Libya, Rabat, Nigeria,
  Ethiopia, Congo, Pyongyang, Beijing, Seoul, West Java, Jakarta,
  Canberra, Balleny Is., Washington, Mississippi, Iowa, Quito/Brasilia,
  Brent/Bitcoin, and the ESA's Space/Climate view.
- A **DATE CHECK** box: left out as earlier stories are the COP31 Antalya
  collapse, the Villavicencio bomb & Benghazi ship strike (22–23), and the
  CIA–ODNI breach, Shanghai chief Chen Jining, Huawei verdict, Riyadh tower
  & Real Madrid 5–1 (all Tue 24); background only is the CAS restoration of
  Senegal's AFCON title (Tue 24), with Morocco's legal challenge being
  Wed 25; not yet covered are US Thanksgiving and the special European
  Council (Thu 26).
- A confidence key: OFFICIAL = on record, CONFIRMED = 2+ outlets/sensors,
  REPORTED = wire/local, CLAIM = one side's account.

## How to run it

Requires Node.js 22 (standard library only — no dependencies, no network).

```sh
MAKEFUN_OUTPUT_DIR=out node main.ts
```

This writes the image to `out/entry.png`. Without `MAKEFUN_OUTPUT_DIR`
the program writes to `/output/entry.png`.

## Files

- `main.ts` — the program (reads `entry.png`, validates it, writes it out)
- `entry.png` — the finished image
- `LICENSE` — MIT license
