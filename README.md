# Do Androids Dream of Electric Papers? — working site

Working site of the workshop *Do Androids Dream of Electric Papers? Benchmarking AI Scientists*,
25 November 2026, Renold Innovation Hub, Manchester. Hosted by Constructor Knowledge Labs with ARIA.

- Site: https://omniscale-ai.github.io/electric-papers/
- Official event page: https://constructorlabs.org/event/do-androids-dream-of-electric-papers/

## Editing
Content lives in `data/`; the page template is `layouts/index.html`.

| File | What it holds |
|---|---|
| `data/programme.yaml` | The grid of the day (times are Europe/London, GMT on 25 Nov) |
| `data/talks.yaml` | Keynote and lightning talks |
| `data/tracks.json` | Track A/B question sets and the v0 spec blocks |
| `hugo.toml` | Dates, venue, links |

Slides and Miro links are **not** published here: participants get them by e-mail.

## Local preview
```bash
hugo server            # http://localhost:1313/electric-papers/
# preview "Now / Next" at a given time of the workshop day:
# http://localhost:1313/electric-papers/?now=11:20
```

## Deploy
Push to `main`: GitHub Actions builds the site and publishes it to Pages
(Settings → Pages → Source: GitHub Actions).
