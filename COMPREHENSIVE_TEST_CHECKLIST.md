# Comprehensive Button & Link Test Checklist

## Test Date: Nov 18, 2025
## Tester: AI Agent
## Environment: Dev Server (https://3000-is58t8zxq4x3bmz0g898l-2f30dedd.manus-asia.computer)

---

## Homepage (`/`)

### Navigation Header
- [ ] ← SoulPrint link → https://soulprint.manus.space
- [ ] Council link → `/council`
- [ ] Sages link → `/sages`
- [ ] Journeys link → `/journeys`
- [ ] Retreats link → `/retreats`
- [ ] Paradoxes link → `/paradoxes`
- [ ] Experiments link → `/experiments`
- [ ] Sign In button → OAuth login page
- [ ] My Path link (if logged in) → `/my-path`

### Hero Section
- [ ] "Enter the Council" button → `/council`
- [ ] "Explore Sages" button → `/sages`

### Pick Your Focus Today (6 Theme Cards)
- [ ] Ego & Self - "Explore →" link
- [ ] Relationships - "Explore →" link
- [ ] Death & Impermanence - "Explore →" link
- [ ] Suffering & Growth - "Explore →" link
- [ ] Presence & Awareness - "Explore →" link
- [ ] Purpose & Meaning - "Explore →" link

### Three Ways to Explore Wisdom
- [ ] One Sage card → `/council?mode=one_sage`
- [ ] Compare Two card → `/council?mode=compare_two`
- [ ] Full Council card → `/council?mode=council`

### Advanced Practices
- [ ] Paradox Playground card → `/paradoxes`
- [ ] Life Experiments card → `/experiments`

### Meet the Sages Section
- [ ] "View All" button → `/sages`
- [ ] Each sage portrait (12 visible) → `/sages/{teacherId}`

### Footer
- [ ] Sages link → `/sages`
- [ ] Journeys link → `/journeys`
- [ ] Council link → `/council`
- [ ] About link → `/about`
- [ ] FAQ link → `/faq`
- [ ] Safety link → `/safety`
- [ ] Privacy link → `/privacy`

---

## Sages Page (`/sages`)

### Header
- [ ] "← Home" button → `/`
- [ ] Search input (functional)
- [ ] "All Themes" filter dropdown (functional)

### Sage Cards (36 total)
- [ ] Each sage card displays portrait (not initials)
- [ ] Each sage card clickable → `/sages/{teacherId}`
- [ ] "Explore Teachings" button on each card

---

## Individual Sage Page (`/sages/{teacherId}`)

### Header
- [ ] "← Back" button → `/sages`

### Content
- [ ] "Ask This Sage" button → `/council?mode=one_sage&teacher={id}`
- [ ] "Compare with Another" button → `/council?mode=compare_two&teacher={id}`

---

## Council Page (`/council`)

### Header
- [ ] "← Home" button → `/`

### Sidebar
- [ ] One Sage radio button (functional)
- [ ] Compare Two radio button (functional)
- [ ] Full Council radio button (functional)
- [ ] Response Tone dropdown (functional)
- [ ] Sage selection list (clickable)

### Chat Area
- [ ] Message textarea (functional)
- [ ] Send button (functional)
- [ ] **CRITICAL**: Messages appear after sending
- [ ] **CRITICAL**: AI responses display correctly

---

## Journeys Page (`/journeys`)

### Header
- [ ] "← Home" button → `/`

### Journey Cards
- [ ] Each journey card clickable → `/journeys/{journeyId}`
- [ ] "Start Journey" or "Continue" button on each card

---

## Individual Journey Page (`/journeys/{journeyId}`)

### Header
- [ ] "← Back to Journeys" button → `/journeys`

### Content
- [ ] "Start Journey" button (if not started)
- [ ] Day navigation (if started)
- [ ] "Complete Day" button (functional)

---

## Retreats Page (`/retreats`)

### Header
- [ ] "← Home" button → `/`

### Retreat Cards
- [ ] Each retreat card displays details
- [ ] "Start Retreat" button (functional)

---

## Paradox Playground (`/paradoxes`)

### Header
- [ ] "← Home" button → `/`

### Paradox Cards
- [ ] **CRITICAL**: "Explore Paradox" button opens dialog
- [ ] Dialog displays paradox details
- [ ] Reflection textarea (functional)
- [ ] "Submit Reflection & Get AI Insight" button (functional)
- [ ] **CRITICAL**: AI response displays after submission

---

## Life Experiments (`/experiments`)

### Header
- [ ] "← Home" button → `/`

### Experiment Cards
- [ ] **CRITICAL**: "Start Experiment" button works
- [ ] **CRITICAL**: Toast notification appears
- [ ] **CRITICAL**: Experiment moves to "Active" section
- [ ] Active experiments display correctly
- [ ] Completed experiments display correctly

---

## My Path Page (`/my-path`) - Requires Authentication

### Header
- [ ] User profile dropdown (functional)
- [ ] Logout button (functional)

### Dashboard Sections
- [ ] Active journeys display
- [ ] Active experiments display
- [ ] Recent conversations display
- [ ] Saved quotes display

---

## About Page (`/about`)

### Content
- [ ] All internal links functional
- [ ] "← Home" button → `/`

---

## FAQ Page (`/faq`)

### Content
- [ ] Accordion items expand/collapse
- [ ] "← Home" button → `/`

---

## Safety Page (`/safety`)

### Content
- [ ] All content displays correctly
- [ ] "← Home" button → `/`

---

## Privacy Page (`/privacy`)

### Content
- [ ] All content displays correctly
- [ ] "← Home" button → `/`

---

## Mobile Responsiveness Tests

### Navigation
- [ ] Mobile menu hamburger icon appears < 768px
- [ ] Mobile menu opens/closes correctly
- [ ] All mobile nav links functional

### Wisdom Tree
- [ ] **CRITICAL**: Pinch-to-zoom works on mobile
- [ ] **CRITICAL**: Pan/drag works when zoomed
- [ ] **CRITICAL**: Reset button appears when zoomed
- [ ] Touch gestures don't interfere with desktop

---

## Authentication Flow Tests

### Sign In
- [ ] "Sign In" button → OAuth portal
- [ ] Google login works
- [ ] Microsoft login works
- [ ] Apple login works
- [ ] **CRITICAL**: After login, user redirected back correctly
- [ ] **CRITICAL**: User session persists

### Sign Out
- [ ] Logout button clears session
- [ ] User redirected to homepage
- [ ] Protected pages redirect to login

---

## Performance & UX Tests

### Progressive Image Loading
- [ ] Sage portraits show blur-up effect
- [ ] Images load smoothly without layout shift
- [ ] Fallback handling for failed loads

### Toast Notifications
- [ ] Success toasts appear for successful actions
- [ ] Error toasts appear for failed actions
- [ ] Toasts auto-dismiss after timeout

### Loading States
- [ ] Spinners/skeletons show during data fetch
- [ ] Buttons show "Loading..." state when pending
- [ ] No flash of empty content

---

## Summary

**Total Tests**: ~100+ individual checks
**Critical Tests**: 10 (marked with **CRITICAL**)
**Status**: ⏳ In Progress

**Critical Issues Fixed**:
1. ✅ Council chat responses now visible
2. ✅ Sage portraits display (not initials)
3. ✅ Life Experiments buttons functional
4. ✅ Paradox Playground buttons functional

**Next Steps**:
- Complete systematic testing of all pages
- Document any new issues found
- Create final test report
