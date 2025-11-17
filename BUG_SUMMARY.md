# Bug Summary - Pre-Release Testing

## Critical Bugs (Must Fix Before Release)

### BUG #1: Council Debates showing "Unknown Sage" instead of teacher names
- **Location:** Home page - Council Debates section
- **Impact:** Users can't see which teacher said what
- **Fix:** Update CouncilDebate component to properly fetch and display teacher data

### BUG #2: "Meet the Sages" section is empty on home page
- **Location:** Home page - "Meet the Sages" section  
- **Impact:** Public users can't see any sages on homepage
- **Fix:** Add sage cards rendering in Home.tsx

### BUG #3: /council route shows 404 Page Not Found
- **Location:** Navigation link "Council" in header
- **Impact:** Main navigation link is broken
- **Fix:** Add /council route in App.tsx or redirect to appropriate page

### BUG #4: Sages page shows "0 of 0 sages"
- **Location:** /sages page
- **Impact:** Users can't browse any teachers
- **Fix:** Check Sages.tsx data fetching and rendering logic

## Medium Priority

### Journeys page shows "No journeys available"
- May be expected if no journeys seeded yet
- Need to verify if this is bug or missing data

## Testing Status

✅ Home page loads
✅ Navigation renders
✅ Deep Question of the Day displays
✅ Council Debates displays (but with wrong names)
✅ Theme cards display
✅ Micro-Retreats requires auth (correct behavior)
❌ Council link broken
❌ Sages page empty
❌ Meet the Sages section empty
❌ Teacher names not showing in debates

## Next Steps

1. Fix teacher name display in Council Debates
2. Add sage cards to home page
3. Fix or redirect /council route
4. Fix Sages page data fetching
5. Test login flow
6. Test all new features with authenticated user
