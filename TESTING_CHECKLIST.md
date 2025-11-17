# Comprehensive Testing Checklist

## Authentication & Access Control
- [ ] Login via email works
- [ ] Logout works
- [ ] Public pages accessible without login
- [ ] Protected pages redirect to login
- [ ] User session persists across page refreshes

## Navigation Links (Logged Out)
- [ ] Home (/) works
- [ ] Council (/council) accessible
- [ ] Sages (/sages) accessible
- [ ] Journeys (/journeys) accessible
- [ ] Retreats (/micro-retreats) - check if protected
- [ ] My Path (/my-path) - should redirect to login

## Navigation Links (Logged In)
- [ ] All logged-out links still work
- [ ] My Path (/my-path) accessible
- [ ] All My Path tabs work (Journal, Constellation, Shadow Mirror, Stories, Conversations, Progress)

## Feature 1: Deep Question of the Day
- [ ] Question displays on home page
- [ ] Three depth levels (Safe, Real, Raw) selectable
- [ ] User can submit answer
- [ ] Council response generates
- [ ] Response saves to journal

## Feature 2: Inner Constellation
- [ ] Graph renders in My Path > Constellation tab
- [ ] Nodes appear after theme interactions
- [ ] Hover tooltips work
- [ ] Graph is interactive (drag, zoom)

## Feature 3: Council Debates
- [ ] Debate displays on home page
- [ ] All 4 teacher responses visible
- [ ] Synthesis section expands/collapses
- [ ] Teacher avatars display correctly

## Feature 4: Micro-Retreats
- [ ] /micro-retreats page accessible
- [ ] 3 retreats display in library
- [ ] Can start a retreat
- [ ] Timer works (play/pause)
- [ ] Steps advance automatically
- [ ] Can submit final reflection and rating
- [ ] Session saves to database

## Feature 5: Shadow Mirror
- [ ] Accessible in My Path > Shadow Mirror tab
- [ ] "Generate This Week" button works
- [ ] Summary generates with patterns, blind spots, growth opportunities
- [ ] Summaries display in list
- [ ] Expandable sections work

## Feature 6: Story Alchemy
- [ ] Accessible in My Path > Stories tab
- [ ] Empty state shows when no stories
- [ ] Backend API ready (no UI to create stories yet)

## Feature 7 & 8: Paradox Playground & Life Experiments
- [ ] Backend APIs functional
- [ ] No UI yet (expected)

## Sages Visibility
- [ ] All sages visible on home page (logged out)
- [ ] Sages page (/sages) shows all teachers
- [ ] Sage portraits load correctly
- [ ] Sage details accessible

## General UI/UX
- [ ] No console errors
- [ ] No TypeScript errors
- [ ] All images load
- [ ] Mobile menu works
- [ ] Responsive design works on mobile
- [ ] All buttons have hover states
- [ ] Loading states display correctly
- [ ] Error messages are user-friendly

## Database Operations
- [ ] Journal entries save correctly
- [ ] Conversations save correctly
- [ ] Theme tracking works
- [ ] All new tables accessible
