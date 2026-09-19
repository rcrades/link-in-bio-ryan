# Referral program controls

Claude and v0 promotional links are controlled in `src/config/referrals.ts`. Both programs are currently disabled, so their promotional calls to action and Favorite Apps entries are omitted from the rendered page.

To restore a program, first confirm that its incentive is active and its referral URL still works. Then set that program's `enabled` value to `true` and run the production build. These flags only control referral promotions; profile links, templates, and direct routes continue to work independently.
