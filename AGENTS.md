# Project Agent Instructions

## Project Goal
Personal portfolio focused on frontend development.
Tone: professional, modern, subtle, not flashy.

## Visual Philosophy
- Visual hierarchy: Hero > Section Title > Content > Cards
- Animations are used sparingly
- One main visual accent per section
- Avoid stacking multiple animated components together
- Priority: clarity > spectacle

## Sections Roadmap
1. Hero – Reflective card with video (main visual)
2. About – Text-focused, calm, readable
3. Skills – Subtle visual treatment, no heavy animations
4. Projects – Grid of small cards, content over effects
5. Studies – Distinct card style
6. Contact – Clean, usable form
7. Footer – Simple, minimal, no animations
8. Navigation – menu button open fullscreen links, big text
9. resume web, page that acts as a resume, no animations, no flashy effects, no distractions, easy to navigate and read

## Projects Architecture (Locked)

Projects are divided by narrative role, not importance.

### Project Visibility
Each project must have a `visibility` field with one of the following values:

- `primary` → Core projects, shown in a dedicated scroll-based narrative section (max 3)
- `secondary` → Supporting projects, shown as cards/grid


### Ordering
- `primary` projects use an explicit `order` field to control narrative flow.
- `secondary` projects do not require ordering.

### Rendering Rules
- Primary projects are rendered in a vertical or pinned scroll section.
- Secondary projects are rendered as static cards.

### studies
- studies are rendered as a scroll stack.
- studies are rendered as cards.

### contact
- contact is rendered as a form.  
- contact form has a submit button that sends the form data to the server.
- contact form has a reset button that resets the form.
- contact form has a success message that appears when the form is submitted.
- contact form has an error message that appears when the form fails to submit.
- contact form has a loading message that appears when the form is being submitted.
- structure 
             |  Contact                          |
             |  Title                             |
             |  Short copy                        |
             |                                    |
             |  → Email                           |
             |  → LinkedIn                        |
             |                                    |
             |  Divider                           |
             |                                    |
             |  Form (simple)                     |


### Admin Rules
- Admin must allow changing `visibility`
- Admin must allow editing `order` only for `primary` projects
- No visual effects or animations are managed from admin
- admin must have a solid and clear layout
- admin must have a solid and clear navigation
- admin must have a solid and clear footer
- admin must have a solid and clear forms for each section and nice styling

## Component Rules
- UI components live in `src/ui`
- Feature components live in `src/features`
- Use Tailwind only (no inline styles unless required)
- Avoid introducing new animation libraries unless justified
- Animations allowed: entrance, subtle hover, background motion
- Avoid continuous motion in multiple sections at once

## Design Decisions (Locked)
- Curved section titles already implemented and approved
- Reflective Card is the hero centerpiece
- Skills section should not compete visually with titles
- Projects cards are secondary visuals
- resume web, page that acts as a resume, no animations, no flashy effects, no distractions, easy to navigate and read

## AI Role
- Act as a senior frontend dev + design reviewer
- Propose solutions aligned with the existing system
- Do NOT redesign unless explicitly asked
- Ask before introducing major visual changes
- If something feels visually wrong, prioritize explaining why over adding code
