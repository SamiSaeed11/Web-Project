# Entity-Relationship Diagram

## Entities and Relationships

```
┌─────────────────┐
│     USER        │
├─────────────────┤
│ _id (PK)        │
│ name            │
│ email (unique)  │
│ password        │
│ role            │
│ phone           │
│ profilePicture  │
│ resumeUrl       │
│ coverLetterUrl  │
│ skills []       │
│ experience      │
│ education       │
│ createdAt       │
│ updatedAt       │
└─────────────────┘
        │
        │ 1:N (postedBy)
        ▼
┌─────────────────┐
│      JOB        │
├─────────────────┤
│ _id (PK)        │
│ title           │
│ department      │
│ description     │
│ requirements    │
│ responsibilities│
│ branch (FK)     │───────┐
│ availableSeats  │       │
│ filledSeats     │       │
│ experienceReq   │       │
│ salaryRange     │       │
│ jobType         │       │
│ status          │       │
│ postedBy (FK)   │       │
│ createdAt       │       │
│ updatedAt       │       │
└─────────────────┘       │
        │                 │ N:1 (branch)
        │ 1:N             │
        ▼                 ▼
┌─────────────────┐ ┌─────────────────┐
│  APPLICATION    │ │    BRANCH       │
├─────────────────┤ ├─────────────────┤
│ _id (PK)        │ │ _id (PK)        │
│ job (FK)        │ │ name (unique)   │
│ candidate (FK)  │ │ address         │
│ resumeUrl       │ │ contactEmail    │
│ coverLetterUrl  │ │ contactPhone    │
│ status          │ │ isActive        │
│ appliedDate     │ │ createdAt       │
│ notes           │ │ updatedAt       │
│ createdAt       │ └─────────────────┘
│ updatedAt       │
└─────────────────┘
        │
        │ 1:1
        ▼
┌─────────────────┐
│   INTERVIEW     │
├─────────────────┤
│ _id (PK)        │
│ application(FK) │
│ candidate (FK)  │
│ job (FK)        │
│ scheduledDate   │
│ scheduledTime   │
│ mode            │
│ location        │
│ meetingLink     │
│ message         │
│ status          │
│ scheduledBy(FK) │
│ createdAt       │
│ updatedAt       │
└─────────────────┘
```

## Relationships

### USER → JOB
- **Type:** One-to-Many
- **Description:** One HR/Admin user can post multiple jobs
- **Foreign Key:** `Job.postedBy` references `User._id`

### USER → APPLICATION
- **Type:** One-to-Many
- **Description:** One candidate can submit multiple applications
- **Foreign Key:** `Application.candidate` references `User._id`

### JOB → APPLICATION
- **Type:** One-to-Many
- **Description:** One job can have multiple applications
- **Foreign Key:** `Application.job` references `Job._id`
- **Constraint:** Unique index on (job, candidate) - prevents duplicate applications

### BRANCH → JOB
- **Type:** One-to-Many
- **Description:** One branch can have multiple job openings
- **Foreign Key:** `Job.branch` references `Branch._id`

### APPLICATION → INTERVIEW
- **Type:** One-to-One
- **Description:** Each application can have one interview scheduled
- **Foreign Key:** `Interview.application` references `Application._id`

### USER → INTERVIEW
- **Type:** One-to-Many (as scheduler)
- **Description:** One HR user can schedule multiple interviews
- **Foreign Key:** `Interview.scheduledBy` references `User._id`

### USER → INTERVIEW
- **Type:** One-to-Many (as candidate)
- **Description:** One candidate can have multiple interviews
- **Foreign Key:** `Interview.candidate` references `User._id`

## Attributes Details

### USER
- **_id:** Auto-generated MongoDB ObjectId (Primary Key)
- **email:** Unique, indexed for fast login queries
- **role:** Enum: ['candidate', 'hr', 'admin']
- **password:** Hashed using bcrypt (never stored as plain text)
- **resumeUrl, coverLetterUrl, profilePicture:** Cloudinary URLs

### JOB
- **status:** Enum: ['open', 'closed', 'on-hold']
- **jobType:** Enum: ['Full-time', 'Part-time', 'Contract', 'Internship']
- **branch:** Reference to Branch collection
- **postedBy:** Reference to User collection (HR/Admin)

### BRANCH
- **name:** Enum: ['Islamabad', 'Lahore', 'Karachi', 'Remote']
- **isActive:** Boolean flag for soft delete

### APPLICATION
- **status:** Enum: ['Submitted', 'Under Review', 'Shortlisted', 'Interview Scheduled', 'Rejected', 'Selected']
- **job, candidate:** Composite unique index to prevent duplicate applications
- **resumeUrl:** Cloudinary URL (required)
- **coverLetterUrl:** Cloudinary URL (optional)

### INTERVIEW
- **mode:** Enum: ['In-person', 'Online', 'Phone']
- **status:** Enum: ['Scheduled', 'Completed', 'Cancelled', 'Rescheduled']
- **application, candidate, job:** All references for easy querying

## Indexes

1. **User.email** - Unique index (for login)
2. **Application (job, candidate)** - Composite unique index (prevent duplicate applications)
3. **Job.branch** - Index for fast branch-based queries
4. **Application.candidate** - Index for candidate dashboard queries
5. **Application.job** - Index for job-based application queries

## Cardinality

- User ↔ Job: 1:N (One user posts many jobs)
- User ↔ Application: 1:N (One candidate submits many applications)
- Job ↔ Application: 1:N (One job receives many applications)
- Branch ↔ Job: 1:N (One branch has many jobs)
- Application ↔ Interview: 1:1 (One application has one interview)
- User ↔ Interview: 1:N (One HR schedules many interviews)

## Visual ER Diagram Tool

You can create a visual diagram using:
- **draw.io** (diagrams.net) - Free online tool
- **dbdiagram.io** - Database diagram tool
- **Lucidchart** - Professional diagramming tool
- **ERDPlus** - Free ER diagram tool

Use this text as reference to create your visual diagram!
