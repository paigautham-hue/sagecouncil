# Mobile Responsiveness Testing Checklist
## Council of Sages - Mobile UX Audit

**Testing Date:** January 17, 2025  
**Viewport Sizes:** 375px (iPhone SE), 390px (iPhone 12/13), 414px (iPhone Pro Max), 768px (iPad)

---

## 1. Navigation & Header

### Desktop Navigation
- [ ] Logo displays correctly
- [ ] All navigation links visible and clickable
- [ ] User authentication state shows correctly
- [ ] Login/Logout buttons functional

### Mobile Navigation (< 768px)
- [ ] Hamburger menu icon displays
- [ ] Menu opens/closes smoothly
- [ ] All navigation items accessible in mobile menu
- [ ] Touch targets minimum 44x44px
- [ ] Menu overlay doesn't block content
- [ ] Links work correctly from mobile menu
- [ ] Menu closes after navigation

---

## 2. Homepage Sections

### Hero Section
- [ ] Title text readable (no overflow)
- [ ] Subtitle text scales appropriately
- [ ] CTA buttons properly sized for touch
- [ ] Temple Portal animation performs well on mobile
- [ ] Background starfield doesn't cause performance issues

### Today's Deep Drop
- [ ] Quote card displays full width on mobile
- [ ] Teacher portrait scales correctly
- [ ] Text remains readable
- [ ] Action buttons stack vertically if needed
- [ ] No horizontal scrolling

### Deep Question of the Day
- [ ] Question text wraps properly
- [ ] Depth level buttons (Safe/Real/Raw) accessible
- [ ] Answer textarea expands correctly
- [ ] Submit button properly sized
- [ ] Response displays without overflow

### Council Debate
- [ ] Debate question readable
- [ ] Teacher response cards stack vertically
- [ ] Color-coded responses maintain contrast
- [ ] Synthesis section expands/collapses smoothly
- [ ] No text truncation

### Pick Your Focus (Theme Cards)
- [ ] Cards display in single column on mobile
- [ ] Icons scale appropriately
- [ ] Card text remains readable
- [ ] Touch targets adequate
- [ ] Modal opens correctly on mobile
- [ ] Modal content scrollable
- [ ] Modal close button accessible

### Three Ways to Explore
- [ ] Three mode cards stack vertically
- [ ] Icons display at appropriate size
- [ ] Card descriptions readable
- [ ] Links navigate correctly

### Advanced Practices (Paradox/Experiments)
- [ ] Two cards stack vertically on mobile
- [ ] Icons scale correctly
- [ ] Descriptions remain readable
- [ ] Touch targets adequate

### Meet the Sages Gallery
- [ ] Sage portraits display in responsive grid
- [ ] Names visible below portraits
- [ ] Touch targets adequate for selection
- [ ] "View All" button properly sized

---

## 3. Council Chat Page (/council)

### Chat Interface
- [ ] Message history scrolls smoothly
- [ ] Input textarea expands appropriately
- [ ] Send button accessible
- [ ] Mode selector (One Sage/Compare/Council) works on mobile
- [ ] Teacher picker displays correctly
- [ ] Tone control buttons accessible
- [ ] Messages display with proper spacing
- [ ] Long messages wrap correctly
- [ ] No horizontal scrolling

### Teacher Selection
- [ ] Teacher cards display in mobile-friendly grid
- [ ] Portraits scale correctly
- [ ] Selection state visible
- [ ] Modal/dropdown works on mobile

---

## 4. Sages Library (/sages)

### Sage Grid
- [ ] Grid displays 2 columns on mobile (or single column on smallest screens)
- [ ] Portraits scale correctly
- [ ] Names readable
- [ ] Touch targets adequate
- [ ] Search bar functional on mobile
- [ ] Filter options accessible

### Sage Detail Page
- [ ] Portrait displays correctly
- [ ] Biography text readable
- [ ] Key ideas section scrollable
- [ ] Quotes display properly
- [ ] Back button accessible
- [ ] No horizontal scrolling

---

## 5. Journeys (/journeys)

### Journey List
- [ ] Journey cards stack vertically
- [ ] Card content readable
- [ ] Progress indicators visible
- [ ] Start/Continue buttons properly sized

### Journey Detail/Player
- [ ] Day navigation works on mobile
- [ ] Content scrolls smoothly
- [ ] Reading text appropriately sized
- [ ] Practice instructions readable
- [ ] Reflection prompts accessible
- [ ] Progress tracking visible

---

## 6. Micro-Retreats (/micro-retreats)

### Retreat Library
- [ ] Retreat cards display in single column
- [ ] Descriptions readable
- [ ] Duration/step count visible
- [ ] Start buttons properly sized

### Retreat Player
- [ ] Step content displays full width
- [ ] Timer controls accessible
- [ ] Play/Pause buttons adequate size
- [ ] Progress bar visible
- [ ] Step navigation works
- [ ] Reflection textarea expands correctly
- [ ] Rating stars properly sized for touch
- [ ] No content overflow

---

## 7. My Path (/my-path)

### Tab Navigation
- [ ] 6 tabs (Journal, Constellation, Shadow Mirror, Stories, Conversations, Progress) accessible
- [ ] Tabs scroll horizontally if needed
- [ ] Active tab clearly indicated
- [ ] Tab content displays correctly

### Journal Tab
- [ ] TipTap editor functional on mobile
- [ ] Formatting toolbar accessible
- [ ] Text input responsive
- [ ] Tag management works
- [ ] Entry list scrollable

### Constellation Tab
- [ ] Force-directed graph displays correctly
- [ ] Touch interactions work (pan, zoom)
- [ ] Node labels readable
- [ ] Legend visible
- [ ] Performance acceptable

### Shadow Mirror Tab
- [ ] Summary cards stack vertically
- [ ] Expandable sections work
- [ ] Theme tags display properly
- [ ] Generate button accessible

### Stories Tab
- [ ] Journal entry selection works
- [ ] Teacher selection accessible
- [ ] Generated parable readable
- [ ] No text overflow

### Conversations Tab
- [ ] Conversation list scrollable
- [ ] Message history readable
- [ ] Timestamps visible

### Progress Tab
- [ ] Stats display in mobile-friendly layout
- [ ] Charts/visualizations scale correctly
- [ ] Metrics readable

---

## 8. Paradox Playground (/paradox-playground)

### Paradox List
- [ ] Paradox cards stack vertically
- [ ] Titles readable
- [ ] Descriptions don't overflow
- [ ] Touch targets adequate

### Paradox Detail
- [ ] Paradox statement readable
- [ ] Teacher perspectives display correctly
- [ ] Reflection textarea accessible
- [ ] Submit button properly sized
- [ ] AI insights display without overflow

---

## 9. Life Experiments (/life-experiments)

### Experiment Dashboard
- [ ] Active/Completed tabs work
- [ ] Experiment cards stack vertically
- [ ] Descriptions readable
- [ ] Start/Track buttons properly sized

### Experiment Detail
- [ ] Instructions readable
- [ ] Daily tracking interface accessible
- [ ] Input fields properly sized
- [ ] Submit buttons adequate
- [ ] Progress visualization scales correctly

---

## 10. Admin Dashboard (/admin)

### Admin Interface
- [ ] Tab navigation works on mobile
- [ ] Content tables scroll horizontally if needed
- [ ] Action buttons accessible
- [ ] Forms display correctly
- [ ] Statistics readable

---

## 11. General Mobile UX

### Touch Interactions
- [ ] All buttons minimum 44x44px
- [ ] Adequate spacing between clickable elements
- [ ] No accidental clicks from proximity
- [ ] Hover states replaced with active states

### Typography
- [ ] All text readable without zooming
- [ ] Minimum 16px for body text
- [ ] Headings scale appropriately
- [ ] Line height adequate for readability

### Images & Icons
- [ ] All images load correctly
- [ ] Sophisticated icons scale properly
- [ ] No pixelation or blurriness
- [ ] Alt text present for accessibility

### Performance
- [ ] Page load time acceptable (<3s)
- [ ] Animations don't cause jank
- [ ] Scrolling smooth
- [ ] No layout shifts during load

### Layout
- [ ] No horizontal scrolling on any page
- [ ] Content fits viewport width
- [ ] Proper spacing maintained
- [ ] Cards/sections stack appropriately

### Forms & Inputs
- [ ] Input fields properly sized
- [ ] Textareas expand correctly
- [ ] Dropdowns/selects accessible
- [ ] Submit buttons properly sized
- [ ] Error messages visible

---

## 12. Critical Issues Found

### High Priority
- [ ] Issue 1: [Description]
- [ ] Issue 2: [Description]

### Medium Priority
- [ ] Issue 1: [Description]
- [ ] Issue 2: [Description]

### Low Priority (Polish)
- [ ] Issue 1: [Description]
- [ ] Issue 2: [Description]

---

## Testing Notes

### Device-Specific Issues
- **iPhone SE (375px):** [Notes]
- **iPhone 12/13 (390px):** [Notes]
- **iPhone Pro Max (414px):** [Notes]
- **iPad (768px):** [Notes]

### Browser-Specific Issues
- **Safari Mobile:** [Notes]
- **Chrome Mobile:** [Notes]
- **Firefox Mobile:** [Notes]

---

## Recommendations

### Immediate Fixes Required
1. [Fix description]
2. [Fix description]

### Nice-to-Have Improvements
1. [Improvement description]
2. [Improvement description]

---

## Sign-Off

- [ ] All critical issues resolved
- [ ] All high-priority issues resolved
- [ ] Medium-priority issues documented for future sprint
- [ ] Mobile experience tested on real devices
- [ ] Ready for production deployment

**Tested By:** AI Agent  
**Approved By:** [User]  
**Date:** [Date]
