# Store reality check — first-party traffic data (owner, 2026-09-07)

The owner's **My Search Analytics** screen. This is a different and more
important instrument than TPT Keywords: Keywords tells us what the market
searches, this tells us what *our store actually receives*.

## The numbers

Last 30 days. Top five phrases = 42% of all search visits:

| Phrase | Visits | Conversions | Earnings |
|---|---|---|---|
| digital footprint | 5 | 0.00% | $0.00 |
| getting to know your student parent form | 3 | 0.00% | $0.00 |
| entrepreneurship activities | 2 | 0.00% | $0.00 |
| free dhh | 2 | 0.00% | $0.00 |
| 26 27 calendar planner | 1 | 0.00% | $0.00 |
| ai · ai home school · data provacy [sic] · deaf/hard of hearing · entrepreneurship | 1 each | 0.00% | $0.00 |

Thirteen visits across the top five at 42% implies roughly **31 search
visits in 30 days**, and **zero sales**.

## Read the conversion rate correctly: it says almost nothing yet

Zero sales on ~31 visits is **not** evidence the products fail to
convert. At a typical marketplace conversion rate of 2–4%, thirty visits
predicts about one sale. Getting zero is an ordinary outcome of a very
small sample. Do not redesign products because of this number.

## Read the traffic volume correctly: that is the real problem

**~31 search visits per month means the listings are barely surfacing.**
That is the binding constraint, and it is not a keyword-selection
problem.

Marketplaces rank on sales velocity, review count, and store history. A
store with no sales and no reviews starts with none of those signals, so
it ranks poorly on contested phrases no matter how well the phrase was
chosen. This is the standard cold-start problem and it is where we are.

## What this does to the win score — an important correction

**The win score locates a door. It does not open it.** We have been
selecting phrases with real precision, but phrase choice only decides
which search we *could* rank for. Until the store has sales and reviews,
we do not rank for anything contested.

The practical consequence is a reweighting of the formula's two inputs:

> **For a store at zero, the Resources bucket matters more than the
> search volume.** A phrase with 655 searches on a **<1K** shelf is
> worth more to us right now than one with 9,000 searches on a 20K
> shelf, because the thin shelf is the only place a brand-new listing
> can physically appear on page one.

This does not replace the win score — it explains *why* the score works,
and it says which half to weight while we are unranked.

**The recent picks are correctly aimed on this axis**, which is
reassuring: free behavior tracker (**<1K**), homeschool attendance sheet
(**<1K**), parent teacher conference sign up (**<1K**), iep at a glance
(**1K–3K**). The earlier catalog is not: entrepreneurship, homeschool
planner and the sub binder all sit on 8K–40K shelves where an unranked
store is invisible.

## What the traffic we do get confirms

The phrases pulling visits are ones we deliberately targeted, and the
**frees are the engine exactly as designed**: `digital footprint` (our
free), `getting to know your student parent form` (the parent
questionnaire free), `free dhh` (the DHH free). Three of the top four
are free listings.

The mechanism is working. It is just running at very small scale.

## The concrete gap: we never ask for a review

**Audited 2026-09-07: `tpt/listings.json` contains zero instances of
"feedback" and zero of "credit".** Not one listing asks a buyer to leave
a review. The only occurrences of "feedback" anywhere in the repo are
inside product content, about teacher-to-student feedback.

TPT gives buyers credit toward future purchases for leaving feedback on
what they download. Asking for it is standard practice, and reviews are
one of the few ranking signals a new store can actually earn — most of
all on frees, which get downloaded far more than paid items sell.

**Recommendation: add a short, honest review request to every product
and every listing description.** Not a nag; one line at the end of the
product and one in the description. This is the cheapest available
action that touches the actual constraint, and it applies retroactively
to all 41 live listings.

## Standing corrections to the doctrine

1. **Weight the Resources bucket over search volume while unranked.**
   Prefer <1K and 1K–3K shelves. Treat anything above 8K as unreachable
   for now regardless of score.
2. **Judge new listings on downloads and reviews, not on sales**, for at
   least the next quarter. Sales are a lagging indicator of rank; rank
   is a lagging indicator of reviews.
3. **Never conclude anything about conversion from fewer than a few
   hundred visits.** Write the sample size next to any conversion claim.
4. **Off-TPT traffic bypasses the cold start entirely.** Pinterest is
   the one channel where a new store competes on the same footing as an
   old one. We generate pins every drop; whether they are being posted
   is the question to ask.
