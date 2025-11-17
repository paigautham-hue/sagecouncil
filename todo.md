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
