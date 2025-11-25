# 🌍 Trip Planner

A modern, full-stack trip planning application that allows users to create, manage, and organize their travel destinations with custom image uploads and drag-and-drop functionality.

## ✨ Features

- **📝 Trip Management**: Create, edit, and delete trip destinations
- **📸 Custom Image Uploads**: Upload and store images as base64 data in MongoDB
- **🔄 Drag & Drop Reordering**: Reorganize trips with intuitive drag-and-drop interface
- **📱 Responsive Design**: Works seamlessly on desktop and mobile devices
- **☁️ Cloud Database**: Persistent storage with MongoDB Atlas
- **🚀 Production Ready**: Deployed on Vercel with environment variable management

## 🛠️ Technology Stack

### Frontend
- **[Next.js 16.0.1](https://nextjs.org)** - React framework with App Router
- **[React 19.2.0](https://react.dev)** - UI library with modern hooks
- **[TypeScript 5.x](https://typescriptlang.org)** - Type-safe JavaScript
- **[Tailwind CSS 4.x](https://tailwindcss.com)** - Utility-first CSS framework
- **[@dnd-kit](https://dndkit.com)** - Modern drag-and-drop library

### Backend
- **[MongoDB Atlas](https://www.mongodb.com/atlas)** - Cloud NoSQL database
- **[Mongoose 9.x](https://mongoosejs.com)** - MongoDB object modeling
- **Next.js API Routes** - Serverless API endpoints

### Deployment
- **[Vercel](https://vercel.com)** - Frontend hosting and serverless functions
- **Git Integration** - Automatic deployments from GitHub

## 🚀 Getting Started

### Prerequisites

- **Node.js 18+** installed on your machine
- **MongoDB Atlas account** (free tier available)
- **Git** for version control

### 1. Clone the Repository

```bash
git clone https://github.com/lbullen21/trip-planner.git
cd trip-planner
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```bash
# MongoDB Configuration
MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/trip-planner?appName=trip-planner

# Database name
MONGODB_DB=trip-planner

# Optional: Collection name
MONGODB_COLLECTION=trips
```

**To get your MongoDB URI:**
1. Create a free account at [MongoDB Atlas](https://cloud.mongodb.com)
2. Create a new cluster
3. Go to "Database Access" and create a database user
4. Go to "Network Access" and add your IP address (or `0.0.0.0/0` for development)
5. Click "Connect" → "Connect your application" to get the connection string

### 4. Seed the Database (Optional)

Populate your database with sample data:

```bash
npm run seed
```

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
trip-planner/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   │   ├── trips/         # Trip CRUD operations
│   │   │   └── upload/        # Image upload endpoint
│   │   ├── trip/[id]/         # Dynamic trip detail pages
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page
│   ├── components/            # React components
│   │   ├── TripManager.component.tsx    # Main trip management
│   │   ├── TripTile.component.tsx       # Trip display cards
│   │   ├── AddTrip.component.tsx        # Trip creation form
│   │   └── ImageUpload.component.tsx    # Image upload utility
│   ├── lib/                   # Utility libraries
│   │   ├── mongodb.ts         # MongoDB connection
│   │   ├── mongoose.ts        # Mongoose setup
│   │   └── data.ts           # Initial data
│   ├── models/                # Database models
│   │   └── Trip.ts           # Trip schema
│   └── utils/                 # Utility functions
│       └── types.ts          # TypeScript interfaces
├── scripts/
│   └── seed-db.ts            # Database seeding script
├── public/                   # Static assets
└── package.json             # Dependencies and scripts
```

## 🔧 Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Lint code
npm run lint

# Seed database with sample data
npm run seed
```

## 🎨 Key Features Explained

### Image Upload System
- Images are converted to **base64** and stored directly in MongoDB
- No file system dependencies - fully cloud-based storage
- Supports JPEG, PNG, WebP formats (max 5MB)
- Automatic image compression and validation

### Drag & Drop Interface
- Built with modern `@dnd-kit` library
- Smooth animations and touch support
- Persistent reordering (saved to database)
- Accessible keyboard navigation

### Responsive Design
- Mobile-first design approach
- Flexible grid layout with Tailwind CSS
- Touch-optimized interactions
- Consistent UX across all devices

## 🌐 Deployment

### Deploy to Vercel

1. **Push to GitHub** (if not already done)
2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
3. **Set Environment Variables** in Vercel dashboard:
   ```
   MONGODB_URI=your-mongodb-connection-string
   ```
4. **Deploy** - Automatic deployment on every push

### MongoDB Atlas Configuration for Production

1. **Network Access**: Add `0.0.0.0/0` to allow Vercel's dynamic IPs
2. **Database Access**: Ensure your database user has read/write permissions
3. **Connection String**: Must include database name (`/trip-planner`)

## 🔍 API Endpoints

- `GET /api/trips` - Fetch all trips
- `POST /api/trips` - Create a new trip
- `GET /api/trips/[id]` - Get specific trip
- `PUT /api/trips/[id]` - Update trip
- `DELETE /api/trips/[id]` - Delete trip
- `POST /api/upload` - Upload image (returns base64)

## 🐛 Troubleshooting

### Common Issues

**"Failed to load trips from database"**
- Check MongoDB URI in `.env.local`
- Verify network access settings in MongoDB Atlas
- Ensure database user has proper permissions

**Image upload not working**
- Check file size (max 5MB)
- Verify file format (JPEG, PNG, WebP only)
- Check browser console for errors

**Drag & drop not working**
- Ensure JavaScript is enabled
- Check for touch device compatibility
- Verify React version compatibility

### Development Tips

- Use browser dev tools to monitor network requests
- Check MongoDB Atlas logs for connection issues
- Enable debug logging in development mode
- Test with different image formats and sizes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org) team for the amazing framework
- [MongoDB](https://mongodb.com) for reliable cloud database services
- [Vercel](https://vercel.com) for seamless deployment platform
- [@dnd-kit](https://dndkit.com) for the excellent drag-and-drop library
