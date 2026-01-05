# Anjan Jagirdar - Professional Life & Goals Summary

**Last Updated:** January 5, 2026
**Compiled from:** Portfolio website, CV, knowledge base, and conversation history

---

## 👤 Personal Identity

**Name:** Anjan Jagirdar
**Professional Title:** Senior Software Engineer
**Years of Experience:** 9+ years (2015-2026)
**Current Company:** Tech9 (Contractor for Instructure/Canvas LMS)
**Location:** Based in location with access to aj-core (Raspberry Pi 5) and aj-pi5 infrastructure
**Domain:** anjan.dev (purchased from Namecheap)

**Online Presence:**
- **LinkedIn:** https://www.linkedin.com/in/matrixcoder/
- **GitHub:** https://github.com/AnjanJ
- **Medium Blog:** https://medium.com/@anjanj (201 followers)
- **Email:** anjan.jagirdar@gmail.com
- **Portfolio:** anjan.dev (deploying to Cloudflare Pages)

---

## 💼 Professional Experience Summary

### **Current Role (2023-Present)**

**Senior Software Engineer - Tech9**
*Contractor for Instructure (Canvas LMS)*

**Responsibilities:**
- Building and maintaining Rails/React LTI (Learning Tools Interoperability) integrations for Canvas LMS
- Developing customized solutions that extend Canvas functionality for educational institutions
- Upgraded multiple LTI integrations from Rails 5 through Rails 7
- Ensuring compatibility, performance improvements, and security enhancements across ecosystem

**Technologies:** Ruby on Rails, React, LTI Integrations, Canvas LMS

**Notable Achievement:** Attended Instructure company-wide meet (January 2025, USA) - headshot from this event used on portfolio

---

### **Previous Roles**

**1. Team Lead - Ajackus** (Contractor for VTS)
*Duration: 2+ years*

**Achievements:**
- ✅ **Promoted to Team Lead** from Software Engineer
- ✅ **Ajackus Value Champion Award** (June 2022) - Recognized for exceptional organizational values
- Translated Rails monolithic application from English to **French Canadian** (expanding user acquisition)
- Built efficient **Excel importer tool** that automated client onboarding (processing large real estate datasets)
- Drastically reduced manual labor for client onboarding processes

**Technologies:** Team Leadership, Internationalization (i18n), Data Import Tools, Rails Monolith

---

**2. Software Engineer - Zeidler Legal Services**
*Duration: 1.5+ years*

**Achievements:**
- Implemented robust **risk assessment module** for fund pricing (calculating risk levels based on daily fluctuating fund prices with data integrity features)
- Built **Due Diligence module** for Fund Managers
- Developed internal **Admin App using GraphQL** for streamlined operations

**Technologies:** Financial Calculations, GraphQL, Risk Assessment, Admin Tools

---

**3. Software Engineer - EdCast** (EdTech Platform)
*Duration: 2+ years*

**Achievements:**
- Automated **SCORM cloud integration** for course metrics
- Designed, implemented, and maintained **survey feature** in legacy multi-tenant Rails application
- Built **Ruby terminal app with rake tasks** that revolutionized email testing:
  - **Problem:** QA/Testers had to perform entire processes/flows to receive emails and test them
  - **Solution:** Terminal app listing all emails by number - testers reply with number + receiving email address
  - **Impact:** Drastically reduced testing time, saved enormous QA hours

**Technologies:** EdTech, SCORM Integration, Multi-tenant Architecture, Developer Tooling

---

**4. Earlier Roles**
- Ruby Effect
- Ascra Tech
- Thrillophilia (CI pipeline with GitHub Actions)

---

## 🎯 Core Professional Philosophy

### **"Own Your Tools, Not Rent Them"**

This philosophy drives all of Anjan's work and personal projects:

1. **Self-Hosting Advocate:**
   - Runs production infrastructure on Raspberry Pi 5 ($80 hardware, $1.50/month cost)
   - Built Rails Error Dashboard as free alternative to $99/month SaaS services
   - Uses Cloudflare Tunnel instead of expensive cloud providers
   - Emphasizes **data ownership** and **eliminating vendor lock-in**

2. **Anti-SaaS Fatigue:**
   - Believes developers shouldn't pay hundreds/month for basic tools
   - Focuses on building production-ready, self-hosted alternatives
   - MIT licensing philosophy - make tools free forever

3. **Cost-Conscious Engineering:**
   - Raspberry Pi staging server: ~$1.50/month
   - Cloudflare Pages: $0/month hosting
   - Domain transfer to Cloudflare: $12/year vs $15-20/year at Namecheap
   - Emphasis on maximizing value without recurring costs

---

## 🚀 Current Projects & Goals

### **1. Rails Error Dashboard** (Flagship Open Source Project)

**Status:** Beta (Active Development)
**URL:** https://rails-error-dashboard.anjan.dev
**GitHub:** https://github.com/AnjanJ/rails_error_dashboard
**RubyGems:** https://rubygems.org/gems/rails_error_dashboard

**What It Is:**
- Self-hosted error monitoring solution for Rails applications
- Free, open-source alternative to Sentry ($26-80/mo), Bugsnag ($99/mo), Rollbar ($99/mo)
- MIT licensed - free forever

**Technical Highlights:**
- ✅ **850+ RSpec tests** (comprehensive test coverage)
- ✅ **CQRS architecture** with service objects
- ✅ **Fuzzy error matching** using Jaccard + Levenshtein algorithms
- ✅ **Statistical baseline anomaly detection**
- ✅ **Error cascade detection** (A causes B causes C)
- ✅ **Real-time updates** via Turbo Streams
- ✅ **Rails 7.0-8.1 compatible**
- ✅ **Multi-channel notifications** (Slack, Discord, Email)
- ✅ **Platform comparison analytics** (iOS vs Android vs Web)
- ✅ **16 optional advanced features**

**Demo Credentials:**
- Username: `gandalf`
- Password: `youshallnotpass`
- Theme: LOTR-themed demo data (250+ realistic Rails errors)

**Architecture:**
- Built as Rails Engine (mountable)
- Uses CQRS pattern for separation of concerns
- Production-ready with real-time capabilities

**Marketing Plans:**
- 12-week marketing roadmap created
- Product Hunt launch planned
- Reddit, Hacker News, Dev.to content strategy
- Target: 500 GitHub stars, 1,000 RubyGems downloads in 3 months
- Positioning: "Stop paying $99/month for error monitoring"

**Personal Goal:**
- Solve SaaS fatigue for indie hackers and solo founders
- Save developers $1,200+/year on monitoring costs
- Build reputation in Rails community

---

### **2. Audio Intelli** (Commercial SaaS Product)

**Status:** Development (Launching Soon)
**Company:** Abhaya Code Labs
**URL:** https://www.audiointelli.com
**Tech Stack:** Rails 8 API + React Native + Expo

**What It Is:**
- AI-powered SaaS platform transforming voice recordings into searchable intelligence
- Mobile-first application (iOS & Android)
- Processes podcasts, meetings, interviews into actionable insights

**Technical Details:**

**Backend (Rails 8.0.1 API):**
- `/Users/aj/code/audio_intelli_api` (Mac development)
- Three-tier subscription system:
  - Free tier
  - Pro tier
  - Pro Plus tier
- IAP (In-App Purchase) receipt validation for Apple & Google
- Usage quota tracking
- AI integration using OpenAI API
- Profession-based onboarding (9 professions supported)

**Mobile (React Native + Expo SDK 54):**
- `/Users/aj/code/audio-intelli-mobile`
- Three-environment setup:
  - **Development:** Points to Mac (`http://192.168.50.9:3000/api/v1`)
  - **Staging:** Points to Pi 5 (`https://staging-api.abhayacodelabs.com/api/v1`)
  - **Production:** Points to cloud (`https://api.abhayacodelabs.com/api/v1`)
- Features:
  - Audio recording with transcription
  - AI-powered summaries and insights
  - Chat with recordings
  - Biometric authentication
  - Offline capability
  - Download recordings

**Infrastructure:**
- **Development:** Mac localhost (free)
- **Staging:** Raspberry Pi 5 with Cloudflare Tunnel (~$1.50/month)
- **Production:** Cloud hosting (Heroku/Fly.io/Railway/Hetzner planned, $5-25/month)

**Current Status:**
- Mobile app ready for testing on Pixel 9
- Pi 5 staging server documentation complete (11-step setup guide)
- Production deployment planned

**Revenue Model:**
- Freemium with IAP subscriptions
- App Store ($99/year Apple Developer)
- Google Play Store ($25 one-time)
- Estimated Year 1 cost: $140-434
- Estimated Year 2+ cost: $85-370

**Personal Significance:**
- **First React Native project** (learning mobile development from scratch)
- Transition from pure backend to full-stack mobile
- Building real SaaS product, not just open source

**Personal Goal:**
- Launch production SaaS
- Validate mobile development skills
- Generate passive income
- Learn AI integration at scale

---

### **3. Portfolio Website (anjan.dev)**

**Status:** Completed (Deploying to Cloudflare Pages)
**Purpose:** Professional online presence for career opportunities

**Technical Stack:**
- Static HTML/CSS/JavaScript
- Aura theme (dark purple #a277ff, cyan #61ffca, orange #ffca85)
- Responsive design with theme toggle
- Professional headshot from Instructure company meet
- Custom favicons from profile photo

**Sections:**
- Hero with professional photo
- About (storytelling format)
- Experience (4 companies: Tech9, Ajackus, Zeidler, EdCast)
- Projects (Rails Error Dashboard, Audio Intelli, Pi5 Infrastructure)
- Skills (Backend, Frontend/Mobile, DevOps, Architecture)
- Certifications (5 certs including Product Management from Duke)
- Contact

**Deployment Plan:**
- GitHub repository
- Cloudflare Pages (free forever, unlimited bandwidth)
- Domain transfer from Namecheap to Cloudflare (cost savings: $12/year vs $15-20/year)
- Keeps existing subdomain: rails-error-dashboard.anjan.dev

**Personal Goal:**
- Attract recruiters and employers
- Showcase 9+ years Rails expertise
- Demonstrate indie hacker projects
- Professional online brand

---

## 🛠️ Technical Skills

### **Expert Level (Purple - Years of Production Experience)**
- **Ruby on Rails** (9+ years, versions 4.x through 8.1)
- **Ruby** (Core language mastery)
- **CQRS Pattern** (Architecture design)
- **Service Objects** (Rails best practices)
- **TDD / RSpec** (850+ tests written for Rails Error Dashboard)

### **Advanced Level (Green - Strong Production Experience)**
- **PostgreSQL** (Primary database)
- **RESTful APIs** (Design and implementation)
- **GraphQL** (Admin apps, modern APIs)
- **Sidekiq / Solid Queue** (Background jobs)
- **Turbo / Hotwire** (Real-time Rails features)
- **Linux / Unix** (Server administration)
- **Nginx** (Reverse proxy, production deployment)
- **Git / GitHub** (Version control, CI/CD)
- **API Design** (RESTful principles)
- **Performance Optimization** (Database, N+1 queries, caching)
- **Security Best Practices** (OWASP, Rails security)

### **Intermediate Level (Orange - Learning/Recent Experience)**
- **React** (LTI integrations at Tech9)
- **React Native** (Audio Intelli - first mobile project)
- **Expo** (Mobile development)
- **JavaScript / ES6+** (Modern frontend)
- **HTML5 / CSS3** (Web fundamentals)
- **Bootstrap / Tailwind** (CSS frameworks)
- **Redis** (Caching, sessions)
- **MySQL** (Secondary database)
- **Docker** (Containerization)
- **Cloudflare** (DNS, Pages, Tunnel)
- **Railway / Render / Fly.io** (Modern hosting)
- **CI/CD Pipelines** (GitHub Actions, automation)
- **Microservices** (Architecture patterns)

### **Technologies NOT Used (Removed from Skills)**
- ❌ AngularJS (never worked with)
- ❌ Payment gateways (no direct experience)
- ❌ React Native at advanced level (just started learning)

---

## 🎓 Education & Certifications

### **Product Management Certification**
- **Institution:** UpGrad in association with Duke Corporate Education
- **Date:** January 2023
- **Significance:** Most recent certification, expanding beyond pure technical role

### **Free Code Camp**
- **Program:** Full Stack Web Development
- **Date:** 2015-2016
- **Foundation:** Early career web development training

### **Coursera**
- **Course:** Web Application Architectures
- **Date:** May 2014
- **Focus:** Architectural patterns and design

### **SQL Workshop**
- **Provider:** Skill Nation Certification
- **Date:** September 2021
- **Focus:** Database fundamentals

### **Ajackus Value Champion Award**
- **Date:** June 2022
- **Recognition:** Exceptional organizational values
- **Context:** Promoted to Team Lead at Ajackus

---

## 📝 Writing & Knowledge Sharing

### **Medium Blog**
- **URL:** https://medium.com/@anjanj
- **Followers:** 201
- **Topics:** Developer productivity, Zed editor workflows, building tools, self-hosting

**Notable Posts:**
- "Why I Built Rails Error Dashboard (And Open-Sourced It for Free)"
- "I Solved My Biggest Zed Editor Frustration With One Command" (zs tool)
- "The Ultimate Zettelkasten System: How I Built a Second Brain in Obsidian" (68 likes)

**Writing Style:**
- Technical but approachable
- Indie hacker journey stories
- Practical, actionable advice
- Focus on cost savings and efficiency

### **Knowledge Base**
- **Location:** `/Users/aj/code/knowledge/`
- Comprehensive documentation for all projects:
  - Audio Intelli setup and architecture
  - Rails Error Dashboard marketing strategy
  - Pi5 staging deployment (11-step guide)
  - Rails patterns analysis
  - DevOps best practices

---

## 💡 Core Values & Principles

### **1. Build What Matters**
- Focus on solving real problems, not adding features nobody asked for
- Validate ideas before over-engineering
- Ship early, iterate based on feedback

### **2. Own Your Stack**
- Self-host when possible
- Eliminate vendor lock-in
- Stay independent from SaaS pricing changes
- Data ownership is critical

### **3. Share Knowledge**
- Write blog posts and documentation
- Teach others what you learn
- Open-source contributions
- Make the next developer's job easier

### **4. Cost-Conscious Engineering**
- Maximize value without recurring costs
- DIY infrastructure (Raspberry Pi production setups)
- Free alternatives to expensive SaaS
- Help indie hackers save money

### **5. Continuous Learning**
- Learning React Native through Audio Intelli (first mobile project)
- Exploring new Rails features (Hotwire, Turbo, Solid Queue)
- Self-teaching DevOps, AI integration, mobile development
- "The best way to learn is by building something real"

---

## 🎯 Life & Career Goals

### **Short-Term Goals (2026)**

**1. Launch Audio Intelli to Production**
- Complete Pi 5 staging setup
- Beta test with family/friends
- Deploy production infrastructure
- Submit to App Store and Play Store
- First commercial SaaS product live

**2. Grow Rails Error Dashboard**
- 500 GitHub stars
- 1,000 RubyGems downloads
- Product Hunt launch
- 5 case studies/testimonials
- Community adoption by indie hackers

**3. Professional Visibility**
- Deploy anjan.dev portfolio
- Regular Medium blog posts
- Active GitHub presence
- Attract better job opportunities

---

### **Medium-Term Goals (2026-2027)**

**1. Financial Independence via Side Projects**
- Audio Intelli generating passive income
- Rails Error Dashboard building reputation
- Potential consulting opportunities from open source work
- Reduce reliance on single employer

**2. Become Rails Community Figure**
- Known for Rails Error Dashboard
- Speaking at conferences (Rails World, RailsConf)
- Guest posts on popular Rails blogs
- Contributor to Rails ecosystem

**3. Master Mobile Development**
- Ship Audio Intelli successfully
- Become proficient in React Native
- Expand to Flutter or native iOS/Android
- Full-stack web + mobile capabilities

---

### **Long-Term Goals (2027+)**

**1. Indie Hacker Success**
- Multiple profitable SaaS products
- Location independence (digital nomad possibility)
- Financial freedom to choose projects
- Help other developers save costs

**2. Open Source Impact**
- Rails Error Dashboard widely adopted
- Contribute to Rails core or major gems
- Build tools that help thousands of developers
- Legacy: "Anjan's gems saved me $X,XXX"

**3. Technical Leadership**
- Senior/Staff/Principal Engineer role
- Team Lead or CTO at growing startup
- Mentor junior developers
- Shape engineering culture

**4. Knowledge Sharing at Scale**
- Popular technical blog/newsletter
- YouTube channel (tutorial content)
- Course creation (Rails best practices)
- Book: "Self-Hosted Tools for Indie Hackers" (potential)

---

## 🏗️ Current Infrastructure

### **Development Environment**
- **Primary Machine:** Mac (Rails development, Expo Metro server)
- **Testing Device:** Pixel 9 (Android testing)
- **Tools:** Zed editor, rbenv, PostgreSQL, Redis

### **Staging Environment**
- **Hardware:** Raspberry Pi 5 (hostname: aj-core)
- **Cost:** $80 one-time + ~$0.50/month power = $1.50/month total
- **Purpose:** Beta testing, staging APIs before production
- **Setup:** PostgreSQL, Ruby 3.4.1, Rails 8.0.1, Nginx reverse proxy, Cloudflare Tunnel
- **URL:** staging-api.abhayacodelabs.com
- **Uptime:** ~99%

### **Production Infrastructure (Planned)**
- **Hosting:** Cloud (Heroku/Fly.io/Railway/Hetzner evaluation in progress)
- **Cost:** $5-25/month
- **Domain:** abhayacodelabs.com (already owned)
- **SSL:** Cloudflare or cloud provider managed

---

## 🌟 Unique Differentiators

### **What Makes Anjan Stand Out:**

1. **Indie Hacker with Enterprise Experience**
   - 9+ years at companies (EdCast, Ajackus, Zeidler, Tech9)
   - Also building own SaaS products (Audio Intelli)
   - Understands both worlds: corporate engineering + indie building

2. **Cost-Conscious Engineer**
   - Raspberry Pi production deployments ($1.50/month)
   - Builds free alternatives to expensive SaaS
   - Helps others save money through open source

3. **Full-Stack + Mobile**
   - Backend expert (Rails 9+ years)
   - Frontend competent (React, Turbo, Hotwire)
   - Mobile learning (React Native, Expo)
   - DevOps capable (Nginx, Cloudflare, systemd)

4. **Production-Grade Quality**
   - 850+ RSpec tests for open source project
   - CQRS architecture patterns
   - Real-time features (Turbo Streams)
   - Professional-level code, free for everyone

5. **Knowledge Sharer**
   - Medium blog (201 followers)
   - Comprehensive documentation (all projects)
   - Terminal tools that save QA hours
   - Helps next developer succeed

6. **Proven Track Record**
   - Team Lead promotion at Ajackus
   - Value Champion Award
   - Rails 4→6→7 upgrades across multiple companies
   - Internationalization (French Canadian)
   - Financial risk assessment tools
   - EdTech platform features
   - LTI integrations for Canvas LMS

---

## 🚧 Current Challenges & Learning Areas

### **Active Learning:**
1. **Mobile Development** (React Native - Audio Intelli project)
2. **AI Integration** (OpenAI API, prompt engineering)
3. **IAP Systems** (Apple & Google in-app purchases)
4. **Marketing** (Product Hunt, SEO, community building)
5. **UI/UX Design** (Improving visual design skills)

### **Pain Points Being Solved:**
1. **SaaS Fatigue** → Rails Error Dashboard (free alternative)
2. **Audio Intelligence** → Audio Intelli (searchable voice recordings)
3. **Deployment Costs** → Raspberry Pi staging infrastructure
4. **Professional Visibility** → Portfolio website (anjan.dev)

---

## 📊 Work Philosophy

### **Approach to Software Engineering:**

**Technical Excellence:**
- Write comprehensive tests (TDD/BDD)
- Use design patterns appropriately (CQRS, Service Objects)
- Optimize for maintainability, not just speed
- Document decisions and architecture

**Pragmatic Shipping:**
- Ship early, iterate based on feedback
- Don't over-engineer solutions
- Beta releases are okay (set expectations)
- Real users > perfect code

**Community First:**
- Open source when possible
- Help others save money/time
- Share knowledge freely
- Build tools for the community, not just yourself

**Cost Optimization:**
- Self-host when feasible
- Choose open source over proprietary
- Evaluate ROI of every SaaS subscription
- Help others reduce costs too

---

## 🎭 Personal Brand Identity

### **"The Cost-Conscious Rails Expert Who Builds for Indie Hackers"**

**Brand Pillars:**
1. **Rails Expertise** (9+ years, proven track record)
2. **Open Source Advocate** (Rails Error Dashboard, MIT licensed)
3. **Indie Hacker** (Building Audio Intelli SaaS)
4. **Self-Hosting Evangelist** (Raspberry Pi production setups)
5. **Knowledge Sharer** (Medium blog, comprehensive docs)

**Target Audience:**
- Solo founders bootstrapping SaaS products
- Indie hackers on tight budgets
- Small dev teams (2-5 people)
- Cost-conscious engineers
- Rails community members

**Unique Voice:**
- Authentic, not corporate
- Technical but approachable
- Focus on practical solutions
- "Own your tools, not rent them"
- Help others succeed

---

## 📅 2026 Roadmap

### **Q1 2026 (January-March)**
- ✅ Complete portfolio website (anjan.dev)
- ✅ Deploy to Cloudflare Pages
- ⏳ Transfer domain to Cloudflare
- ⏳ Rails Error Dashboard Product Hunt launch
- ⏳ Audio Intelli Pi 5 staging deployment
- ⏳ Audio Intelli beta testing with 5-20 users

### **Q2 2026 (April-June)**
- Audio Intelli production deployment
- App Store submission (iOS)
- Google Play Store submission (Android)
- Rails Error Dashboard: 500 GitHub stars goal
- Rails Error Dashboard: 5 case studies
- Medium blog: 10 new posts

### **Q3 2026 (July-September)**
- Audio Intelli: First 100 users
- Audio Intelli: Revenue validation ($X MRR)
- Rails Error Dashboard: 1,000 downloads
- Speaking opportunity (local meetup or conference)
- Consulting opportunities from open source

### **Q4 2026 (October-December)**
- Audio Intelli growth (user acquisition)
- Rails Error Dashboard v1.0.0 stable release
- Evaluate: Full-time indie hacker vs. employment
- Plan 2027 projects
- Financial review: Side income vs. goals

---

## 💰 Financial Philosophy

### **Current Approach:**
- **Employment:** Senior Software Engineer salary (stable income)
- **Side Projects:** Investment in future (time, not money)
- **Infrastructure Costs:** Minimize recurring expenses
  - Raspberry Pi: $1.50/month
  - Domains: $12-20/year
  - Hosting: $0 (Cloudflare Pages, GitHub)
  - Total: ~$40-60/year for infrastructure

### **Future Vision:**
- Side projects generating passive income
- Multiple revenue streams (Audio Intelli subscriptions, potential consulting)
- Reduce reliance on single employer
- Financial freedom to choose interesting projects
- Help others save money through free tools

---

## 🎯 Success Metrics

### **Professional:**
- [ ] 500+ GitHub stars on Rails Error Dashboard
- [ ] 1,000+ RubyGems downloads
- [ ] Audio Intelli launched to production
- [ ] Audio Intelli: 100+ users
- [ ] Portfolio website live (anjan.dev)
- [ ] 10+ Medium blog posts in 2026
- [ ] Speaking at 1+ conference/meetup
- [ ] Team Lead or Senior+ role

### **Personal:**
- [ ] Learn React Native (via Audio Intelli)
- [ ] Master CI/CD pipelines
- [ ] Become proficient in mobile development
- [ ] Build reputation in Rails community
- [ ] Help 100+ developers save money (via Rails Error Dashboard)
- [ ] Generate $X/month passive income (Audio Intelli)

---

## 🔗 Quick Links

### **Professional:**
- Portfolio: https://anjan.dev (deploying)
- LinkedIn: https://www.linkedin.com/in/matrixcoder/
- GitHub: https://github.com/AnjanJ
- Medium: https://medium.com/@anjanj
- Email: anjan.jagirdar@gmail.com

### **Projects:**
- Rails Error Dashboard: https://rails-error-dashboard.anjan.dev
- Rails Error Dashboard GitHub: https://github.com/AnjanJ/rails_error_dashboard
- Rails Error Dashboard RubyGems: https://rubygems.org/gems/rails_error_dashboard
- Audio Intelli: https://www.audiointelli.com
- RubyGems Profile: https://rubygems.org/profiles/anjan__j

### **Documentation:**
- Knowledge Base: `/Users/aj/code/knowledge/`
- Portfolio Deployment: `/Users/aj/code/anjan-dev-portfolio/CLOUDFLARE_DEPLOYMENT.md`
- Audio Intelli Summary: `/Users/aj/code/knowledge/SUMMARY.md`
- Rails Error Dashboard Marketing: `/Users/aj/code/knowledge/rails_error_dashboard/MARKETING_STRATEGY.md`

---

## ✨ Summary

Anjan Jagirdar is a **Senior Software Engineer with 9+ years of Rails expertise**, currently building LTI integrations for Canvas LMS at Tech9. He's an **indie hacker and open-source advocate** who builds production-grade tools to help developers eliminate SaaS costs.

**Current focus:**
- Launching **Audio Intelli** (AI-powered voice intelligence SaaS)
- Growing **Rails Error Dashboard** (free alternative to $99/month error monitoring)
- Building professional presence via **anjan.dev** portfolio

**Core philosophy:**
- **"Own your tools, not rent them"**
- Self-hosting advocate (Raspberry Pi production infrastructure)
- Help indie hackers save money
- Share knowledge freely

**Proven track record:**
- Team Lead promotion at Ajackus
- Value Champion Award winner
- 850+ RSpec tests for open-source project
- Rails 4→6→7 upgrades across multiple companies
- International expansion (French Canadian i18n)
- Developer tools that save QA hours

**Next 12 months:**
- Launch Audio Intelli to production (App Store + Play Store)
- Grow Rails Error Dashboard to 500+ GitHub stars
- Establish reputation in Rails community
- Generate passive income from side projects
- Continue sharing knowledge via Medium blog

**Looking for:**
- Senior/Staff/Principal Rails Engineer roles
- Remote-friendly, values-driven companies
- Opportunities to mentor and lead
- Projects solving real problems for real people

---

**Last Updated:** January 5, 2026
**Source:** Compiled from portfolio website, CV, knowledge base, and Claude conversation history
**Created by:** Claude Sonnet 4.5
**For:** Anjan Jagirdar - Professional summary and goal tracking
