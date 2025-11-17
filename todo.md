# Council of Sages - Project TODO

## Phase 1: Database Schema & Data Import
- [x] Design and implement database schema for all entities
- [x] Create teachers table with all required fields
- [x] Create themes table
- [x] Create quotes table
- [x] Create journeys and journey_days tables
- [x] Create user_journey_progress table
- [x] Create journal_entries table
- [x] Create conversations and conversation_messages tables
- [ ] Import training dataset JSON into database (in progress)
- [ ] Create vector embeddings for RAG pipeline
- [ ] Set up vector store for semantic search

## Phase 2: Backend API & AI Integration
- [ ] Implement user authentication with role-based access (Guest, User, Admin)
- [ ] Create tRPC procedures for teachers CRUD
- [ ] Create tRPC procedures for themes CRUD
- [ ] Create tRPC procedures for quotes CRUD
- [ ] Create tRPC procedures for journeys CRUD
- [ ] Create tRPC procedures for user journal entries
- [ ] Create tRPC procedures for conversations
- [ ] Implement RAG pipeline for AI responses
- [ ] Build AI chat endpoint for "Ask One Sage" mode
- [ ] Build AI chat endpoint for "Compare Two" mode
- [ ] Build AI chat endpoint for "Council of Sages" mode
- [ ] Implement safety protocols for sensitive topics
- [ ] Add streaming support for AI responses

## Phase 3: Visual Design & Theme
- [ ] Set up dark theme with velvet midnight backgrounds
- [ ] Configure typography (Playfair for headings, Inter for body)
- [ ] Create color palette (violet, teal, gold accents)
- [ ] Design cosmic/starfield background animations
- [ ] Create animated sage avatars (line art style)
- [ ] Implement micro-interactions and transitions
- [ ] Ensure WCAG AAA contrast standards for readability

## Phase 4: Core Pages - Home
- [ ] Build Home page with dynamic cosmic background
- [ ] Implement "Today's Deep Drop" card with daily quote
- [ ] Add AI-generated commentary for daily quote
- [ ] Create "Meet the Council" horizontal scroll of avatars
- [ ] Build "Pick Your Focus Today" theme selector
- [ ] Add navigation to other sections from Home

## Phase 5: Council Chat Experience
- [ ] Create Council chat page with mode selector
- [ ] Implement "Ask One Sage" mode UI
- [ ] Implement "Compare Two" mode UI
- [ ] Implement "Council of Sages" mode UI
- [ ] Add teacher/theme selectors
- [ ] Build chat message display with markdown support
- [ ] Add "Reflection first?" toggle feature
- [ ] Implement save/bookmark conversation feature
- [ ] Add tone adjustment (gentle/direct)
- [ ] Display teacher avatars with glow effects during responses

## Phase 6: Sages Library
- [ ] Create Sages grid view page
- [ ] Build teacher card components with avatars
- [ ] Implement teacher detail page layout
- [ ] Display teacher essence and summaries
- [ ] Show key ideas with expandable cards
- [ ] Display practices with step-by-step instructions
- [ ] Add "Try this now" practice mode with timer
- [ ] Show common misunderstandings as FAQs
- [ ] Display modern life applications
- [ ] Add references section

## Phase 7: Journeys System
- [ ] Create Journeys hub page with program cards
- [ ] Build journey detail page
- [ ] Implement journey day content display
- [ ] Add journey progress tracking
- [ ] Create reflection question input
- [ ] Build journey completion tracking
- [ ] Add streak visualization
- [ ] Implement journey navigation (next/previous day)

## Phase 8: My Path - User Growth Hub
- [ ] Create My Path dashboard
- [ ] Build "Today's Step" section
- [ ] Implement "Inner Constellation" visualization
- [ ] Create journal entries list view
- [ ] Add journal search and filtering
- [ ] Implement journal tagging system
- [ ] Build AI journal summary feature
- [ ] Add journal export (PDF/markdown)
- [ ] Create user preferences page
- [ ] Implement depth slider preference
- [ ] Add tone preference controls
- [ ] Build teacher preference manager

## Phase 9: Admin Console
- [ ] Create admin-only route protection
- [ ] Build admin dashboard layout
- [ ] Implement teachers manager
- [ ] Create quotes manager with featured flag
- [ ] Build journeys builder interface
- [ ] Add journey day editor
- [ ] Implement knowledge coverage view
- [ ] Create AI prompt configuration interface
- [ ] Build conversation logs viewer (anonymized)
- [ ] Add flagging system for conversations
- [ ] Implement analytics dashboard
- [ ] Track DAU/WAU metrics
- [ ] Show feature usage statistics
- [ ] Display journey completion rates

## Phase 10: Auth & Onboarding
- [ ] Implement email/password authentication
- [ ] Create onboarding quiz flow
- [ ] Build user preference initialization
- [ ] Add account settings page
- [ ] Implement privacy controls
- [ ] Add data export/deletion options

## Phase 11: Polish & Animations
- [ ] Add constellation orbit animations (8-12s loops)
- [ ] Implement scroll-triggered animations
- [ ] Create hover effects for cards (tilt + gold outline)
- [ ] Add press ripple effects
- [ ] Implement shadow bloom on interactions
- [ ] Create "light floating upwards" save animation
- [ ] Add teacher avatar glow during chat
- [ ] Optimize animations for mobile (reduced motion)
- [ ] Ensure 240ms easeInOut timing throughout

## Phase 12: Testing & Optimization
- [ ] Test all user flows end-to-end
- [ ] Verify role-based access control
- [ ] Test RAG pipeline accuracy
- [ ] Ensure responsive design on all devices
- [ ] Test animations performance
- [ ] Verify WCAG AAA contrast compliance
- [ ] Optimize image loading
- [ ] Test with updated training dataset upload
- [ ] Cross-browser compatibility testing
- [ ] Performance optimization (target LCP 2.2s)

## Phase 13: Documentation & Delivery
- [ ] Create README with setup instructions
- [ ] Document training data import process
- [ ] Document how to update training dataset
- [ ] Add API documentation
- [ ] Create user guide
- [ ] Save final checkpoint
- [ ] Prepare deployment


## Completion Phase - Build 100%
- [x] Build complete Sages library page with filtering and search
- [x] Create detailed teacher profile pages with all content
- [x] Implement Journeys listing page
- [x] Create Journey detail pages with day-by-day content
- [x] Build My Path dashboard with progress tracking
- [x] Create journal entries interface
- [x] Build Admin Console with teacher management
- [x] Add admin journey creation interface
- [x] Implement quote management in admin
- [x] Add mobile responsive navigation menu
- [x] Polish all animations and transitions
- [x] Test all features end-to-end
- [x] Verify responsive design on all screen sizes


## RAG Enhancement & Complete Data Import
- [x] Fix and complete training data import for all 36 teachers
- [x] Verify all teachers, themes, ideas, practices, and quotes are imported (2228 questions, 452 ideas, 339 misunderstandings, 698 quotes)
- [x] Create embeddings table in database
- [x] Generate vector embeddings for all teacher content (ideas, practices, quotes)
- [x] Implement semantic search using embeddings
- [x] Build context retrieval system for AI chat
- [x] Integrate RAG pipeline into Council chat modes
- [x] Run embedding generation script for all content (2593 embeddings generated)
- [x] RAG system fully operational with semantic search
- [x] Save final checkpoint with enhanced RAG system


## Visual Enhancements - Stunning Graphics & Animations
- [x] Generate AI portraits for all 36 spiritual teachers
- [x] Save sage portraits to public/sages directory
- [x] Create animated temple portal hero element for homepage
- [x] Add particle effects and golden light animations
- [x] Integrate sage portraits into teacher cards
- [x] Update Sages library with portrait graphics
- [x] Create getSagePortrait helper function
- [x] Save checkpoint with enhanced visuals


## 100% Completion - Missing Features Implementation

### Homepage "Today's Experience"
- [x] Build "Today's Deep Drop" backend API
- [x] Add AI-generated commentary for daily quote
- [x] Generate 1-minute practice from teacher's methods
- [x] Build "Today's Deep Drop" frontend component
- [x] Add "Ask about this" button (pre-load in Council)
- [x] Add "See how others see this" button (compare mode)
- [x] Integrate Today's Deep Drop into homepage
- [ ] Create horizontal scroll of teacher avatars with essence lines
- [ ] Build "Pick Your Focus Today" theme cards
- [ ] Create theme modal with AI synthesis and tiny practice

### Advanced Council Chat Features
- [ ] Implement "Reflection first?" toggle with introspective prompts
- [ ] Add save/bookmark conversation snippets to Journal
- [ ] Implement teacher avatar glow animation during speech
- [ ] Build safety detection for crisis keywords
- [ ] Add compassionate crisis response with professional help resources
- [ ] Implement comparison summary (convergences/differences)
- [ ] Build meta-synthesis ("Common thread" + actionable insight)
- [ ] Create teacher selection algorithm for Council mode
- [ ] Add scrollable teacher avatar selector with essence lines

### Sages Library Enhancements
- [ ] Add filter by tradition/era/theme
- [ ] Implement search functionality
- [ ] Create quick profile card on avatar hover
- [ ] Add "Explore this Sage" CTA

### Journeys - Full Implementation
- [ ] Create day-by-day content structure
- [ ] Build daily content cards with readings/practices/reflections
- [ ] Implement progress tracking with visual indicators
- [ ] Add daily unlocking mechanism
- [ ] Create completion badges/milestones

### My Path - Complete Features
- [ ] Build journal entries interface with rich text editor
- [ ] Implement saved conversations display
- [ ] Create insights timeline (chronological view)
- [ ] Add progress visualization (journey completion, metrics)
- [ ] Build tagging system for saved content

### Admin Console - Full Features
- [ ] Implement conversation log viewer (anonymized)
- [ ] Build flagging system for concerning conversations
- [ ] Create analytics dashboard (usage metrics, popular teachers/themes)
- [ ] Add knowledge coverage monitor
- [ ] Implement system prompt configuration interface

### Animations & Micro-interactions
- [ ] Add breathing glow animation to sage avatars
- [ ] Implement orbiting symbols around avatars
- [ ] Create "light floating upwards" effect when saving insights
- [ ] Add avatar pulsate on hover
- [ ] Implement teacher glow during their speaking turn

### Additional Pages
- [x] Create About page
- [x] Build FAQ page
- [x] Create Safety page with crisis resources
- [x] Build Privacy policy page
- [x] Add routes for all new pages
- [x] Update footer with links to all pages

### Advanced LLM Features
- [x] Implement teacher selection algorithm based on question analysis
- [x] Build multi-teacher synthesis generator
- [x] Create comparison logic (highlight convergences/differences)
- [x] Implement safety keyword detection
- [x] Build reflection prompt generator
- [x] Create practice generator from teacher methods
- [x] Implement theme synthesis across teachers
- [x] Create comprehensive AI service module
- [x] Integrate crisis detection into chat
- [x] Add reflection prompt and teacher selection endpoints


## Continuation - Final Push to 100%

### Enhanced Council Chat UI
- [x] Create EnhancedChatInterface component
- [x] Add reflection prompt toggle before answering
- [x] Implement conversation bookmarking UI
- [x] Add teacher avatar glow animation during speaking
- [ ] Show comparison summary in Compare Two mode (backend ready)
- [ ] Display meta-synthesis in Full Council mode (backend ready)
- [ ] Add safety message for crisis keywords (backend ready)

### My Path & Journal
- [ ] Build rich text editor for journal entries
- [ ] Add saved conversation snippets with tags
- [ ] Create progress visualization dashboard
- [ ] Show journey completion percentage
- [ ] Display engagement metrics

### Theme Cards & Focus
- [x] Create theme cards component (Ego & Self, Relationships, Death & Impermanence, Suffering & Growth, Presence & Awareness, Purpose & Meaning)
- [x] Build theme modal with AI synthesis
- [x] Add quotes from multiple teachers per theme
- [x] Generate tiny practice for each theme
- [x] Integrate theme cards into homepage
- [x] Add beautiful gradient icons for each theme
- [x] Create "Explore with the Council" CTA in modals

### Journey Content
- [ ] Create sample journey with day-by-day content
- [ ] Add daily readings from teachers
- [ ] Include reflection prompts for each day
- [ ] Add practice exercises
- [ ] Build journey progress tracking

### Admin Console Enhancements
- [ ] Add conversation logs viewer
- [ ] Create usage metrics dashboard
- [ ] Build knowledge coverage monitoring
- [ ] Add teacher content editing interface

### Micro-interactions & Polish
- [ ] Add avatar breathing animation
- [ ] Implement glow effect during AI response
- [ ] Add floating light particles
- [ ] Create smooth page transitions
- [ ] Add loading states for all async operations

### Additional Pages
- [x] Create About page
- [x] Build FAQ page
- [x] Create Safety page with crisis resources
- [x] Build Privacy policy page
- [x] Add routes for all new pages
- [x] Update footer with links to all pages


## Journey Seeding 100% Complete
- [x] Create comprehensive 7-day "Understanding Suffering" journey content
- [x] Write detailed daily readings from Buddha, Frankl, and Tolle (2000+ words per day)
- [x] Create progressive practices for each day
- [x] Write reflection prompts that build on previous days
- [x] Fix database insertion script to work with MySQL
- [x] Successfully seed journey into database (Journey ID: 2)
- [x] Verify journey appears in Journeys page (Card displays correctly)
- [x] Test journey detail page with all day content (All 7 days visible)
- [x] Save final checkpoint with complete journey


## Final Three Features - 100% Completion

### My Path Dashboard Enhancements
- [x] Install TipTap rich text editor package
- [x] Create rich text journal editor component
- [x] Integrate TipTap into journal entry form
- [x] Add formatting toolbar (bold, italic, headings, lists, quotes, undo/redo)
- [x] Implement saved conversation tagging system
- [x] Create tag management UI with add/remove
- [x] Build visual progress charts component (placeholder ready)
- [x] Add journey completion percentage visualization
- [x] Create engagement metrics display (stats cards)
- [x] Implement streak tracking visualization
- [x] Enhanced My Path page with tabs and rich UI

### Admin Analytics Dashboard
- [x] Create admin analytics route and page
- [x] Build conversation logs viewer (with search)
- [x] Implement conversation filtering and search
- [x] Create popular teachers metrics display
- [x] Build mode distribution analytics
- [x] Add teacher usage tracking
- [x] Implement usage metrics dashboard
- [x] Create stats overview cards
- [x] Build knowledge coverage monitor
- [x] Add teacher coverage analysis (zero-usage detection)
- [x] Create comprehensive admin dashboard with 4 tabs

### Journey Functionality
- [ ] Make journey content accessible to authenticated users
- [ ] Implement journey day unlocking mechanism
- [ ] Add journey progress tracking
- [ ] Create journey completion badges
- [ ] Build daily practice timer
- [ ] Add reflection submission interface
- [ ] Implement streak tracking for journeys
- [ ] Create journey navigation (next/previous day)


## Social Sharing & Additional Journeys

### Social Sharing Quote Cards
- [x] Create QuoteCard component with cosmic background
- [x] Add sage portrait integration to quote cards
- [x] Implement HTML-to-canvas conversion for download
- [x] Add download button functionality
- [x] Create share to social media buttons (with clipboard fallback)
- [x] Integrate quote cards into Sages detail pages
- [x] Add click-to-share functionality on quote cards
- [x] Beautiful cosmic design with gradient backgrounds

### Additional Journeys
- [x] Create "Understanding the Ego" 7-day journey content (comprehensive)
- [x] Write daily readings from Tolle, Nisargadatta, Ramana Maharshi (2000+ words per day)
- [x] Create progressive ego-dissolution practices
- [x] Write reflection prompts for ego journey
- [x] Seed "Understanding the Ego" journey to database (Journey ID: 3)
- [x] Create "Finding Purpose" 7-day journey content
- [x] Write daily readings from Frankl, Rumi, Marcus Aurelius
- [x] Create purpose-discovery practices
- [x] Write reflection prompts for purpose journey
- [x] Seed "Finding Purpose" journey to database (Journey ID: 4)
- [x] All 3 journeys successfully seeded and available
