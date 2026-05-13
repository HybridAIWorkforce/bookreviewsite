
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  // Create admin user (john@doe.com) as per requirements
  const adminPassword = await bcrypt.hash('johndoe123', 10)
  const adminUser = await prisma.user.upsert({
    where: { email: 'john@doe.com' },
    update: {},
    create: {
      email: 'john@doe.com',
      password: adminPassword,
      name: 'John Doe',
      isAdmin: true,
      citationBalance: 150,
      level: 5,
      reviewCount: 8,
      streakDays: 12,
      reviewerType: 'INSIDER',
    },
  })
  console.log('✅ Created admin user:', adminUser.email)

  // Create test users with diverse stats for leaderboard
  const testUsers = [
    {
      email: 'sarah.johnson@example.com',
      password: 'password123',
      name: 'Sarah Johnson',
      citationBalance: 2850,
      level: 12,
      reviewCount: 45,
      streakDays: 28,
      reviewerType: 'SUPPORTER' as const,
    },
    {
      email: 'michael.chen@example.com',
      password: 'password123',
      name: 'Michael Chen',
      citationBalance: 4200,
      level: 18,
      reviewCount: 78,
      streakDays: 42,
      reviewerType: 'INSIDER' as const,
    },
    {
      email: 'emma.wilson@example.com',
      password: 'password123',
      name: 'Emma Wilson',
      citationBalance: 5800,
      level: 25,
      reviewCount: 120,
      streakDays: 65,
      reviewerType: 'ADVOCATE' as const,
    },
    {
      email: 'david.brown@example.com',
      password: 'password123',
      name: 'David Brown',
      citationBalance: 1250,
      level: 8,
      reviewCount: 22,
      streakDays: 15,
      reviewerType: 'SUPPORTER' as const,
    },
    {
      email: 'alex.rodriguez@example.com',
      password: 'password123',
      name: 'Alex Rodriguez',
      citationBalance: 7500,
      level: 32,
      reviewCount: 156,
      streakDays: 89,
      reviewerType: 'VERIFIER' as const,
    },
    {
      email: 'jessica.martinez@example.com',
      password: 'password123',
      name: 'Jessica Martinez',
      citationBalance: 2100,
      level: 10,
      reviewCount: 38,
      streakDays: 21,
      reviewerType: 'SUPPORTER' as const,
    },
    {
      email: 'ryan.thompson@example.com',
      password: 'password123',
      name: 'Ryan Thompson',
      citationBalance: 3400,
      level: 15,
      reviewCount: 62,
      streakDays: 35,
      reviewerType: 'INSIDER' as const,
    },
    {
      email: 'olivia.garcia@example.com',
      password: 'password123',
      name: 'Olivia Garcia',
      citationBalance: 4800,
      level: 21,
      reviewCount: 95,
      streakDays: 58,
      reviewerType: 'ADVOCATE' as const,
    },
    {
      email: 'daniel.lee@example.com',
      password: 'password123',
      name: 'Daniel Lee',
      citationBalance: 9200,
      level: 38,
      reviewCount: 189,
      streakDays: 112,
      reviewerType: 'VERIFIER' as const,
    },
    {
      email: 'sophia.anderson@example.com',
      password: 'password123',
      name: 'Sophia Anderson',
      citationBalance: 2600,
      level: 11,
      reviewCount: 48,
      streakDays: 24,
      reviewerType: 'SUPPORTER' as const,
    },
    {
      email: 'ethan.white@example.com',
      password: 'password123',
      name: 'Ethan White',
      citationBalance: 5500,
      level: 24,
      reviewCount: 110,
      streakDays: 72,
      reviewerType: 'ADVOCATE' as const,
    },
    {
      email: 'ava.harris@example.com',
      password: 'password123',
      name: 'Ava Harris',
      citationBalance: 1800,
      level: 9,
      reviewCount: 32,
      streakDays: 18,
      reviewerType: 'SUPPORTER' as const,
    },
  ]

  const createdUsers = []
  for (const userData of testUsers) {
    const hashedPassword = await bcrypt.hash(userData.password, 10)
    const user = await prisma.user.upsert({
      where: { email: userData.email },
      update: {},
      create: {
        email: userData.email,
        password: hashedPassword,
        name: userData.name,
        citationBalance: userData.citationBalance,
        level: userData.level,
        reviewCount: userData.reviewCount,
        streakDays: userData.streakDays,
        reviewerType: userData.reviewerType,
        isAdmin: false,
      },
    })
    createdUsers.push(user)
    console.log(`✅ Created user: ${user.email}`)
  }

  // Create extensive test books
  const testBooks = [
    {
      title: 'The Digital Revolution',
      authorName: 'Sarah Johnson',
      genre: 'Science Fiction',
      description: 'A thrilling journey into the future of technology and humanity. Explore how artificial intelligence reshapes our world and what it means to be human in an age of machines.',
      coverImageUrl: 'https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=400&h=600&fit=crop&auto=format',
      bookLink: null,
      status: 'APPROVED' as const,
      userId: createdUsers[0].id,
      isDebut: false,
    },
    {
      title: 'Midnight in Paris',
      authorName: 'Michael Chen',
      genre: 'Romance',
      description: 'A beautiful love story set in the enchanting streets of Paris. Follow two souls as they navigate the complexities of love, art, and destiny in the city of lights.',
      coverImageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop&auto=format',
      bookLink: null,
      status: 'APPROVED' as const,
      userId: createdUsers[1].id,
      isDebut: true,
    },
    {
      title: 'The Last Kingdom',
      authorName: 'Emma Wilson',
      genre: 'Fantasy',
      description: 'Epic fantasy adventure with dragons, magic, and ancient prophecies. Join the young hero as she discovers her destiny and fights to save her kingdom from eternal darkness.',
      coverImageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&auto=format',
      bookLink: null,
      status: 'APPROVED' as const,
      userId: createdUsers[2].id,
      isDebut: false,
    },
    {
      title: 'Business Mastery',
      authorName: 'David Brown',
      genre: 'Non-Fiction',
      description: 'Essential strategies for modern entrepreneurs and business leaders. Learn the secrets of successful startups, effective leadership, and sustainable business growth.',
      coverImageUrl: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=400&h=600&fit=crop&auto=format',
      bookLink: null,
      status: 'APPROVED' as const,
      userId: createdUsers[3].id,
      isDebut: false,
    },
    {
      title: 'Mystery at Moonlight Manor',
      authorName: 'Sarah Johnson',
      genre: 'Mystery',
      description: 'A gripping mystery novel set in a Victorian mansion. When guests start disappearing during a weekend retreat, detective Anna must solve the case before she becomes the next victim.',
      coverImageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop&auto=format',
      bookLink: null,
      status: 'APPROVED' as const,
      userId: createdUsers[0].id,
      isDebut: false,
    },
    {
      title: 'Whispers in the Wind',
      authorName: 'Olivia Garcia',
      genre: 'Literary Fiction',
      description: 'A poignant exploration of family, memory, and forgiveness. Three generations of women come together to uncover long-buried secrets that could heal or destroy their family.',
      coverImageUrl: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=600&fit=crop&auto=format',
      bookLink: null,
      status: 'APPROVED' as const,
      userId: createdUsers[7].id,
      isDebut: true,
    },
    {
      title: 'Code Warriors',
      authorName: 'Daniel Lee',
      genre: 'Thriller',
      description: 'Elite hackers race against time to prevent a global cyber attack. Fast-paced action and cutting-edge technology collide in this pulse-pounding thriller.',
      coverImageUrl: 'https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?w=400&h=600&fit=crop&auto=format',
      bookLink: null,
      status: 'APPROVED' as const,
      userId: createdUsers[8].id,
      isDebut: false,
    },
    {
      title: 'The Mindful Kitchen',
      authorName: 'Sophia Anderson',
      genre: 'Non-Fiction',
      description: 'Discover the joy of cooking with mindfulness. 100+ recipes that nourish body and soul, with practical tips for bringing meditation into your daily meals.',
      coverImageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=600&fit=crop&auto=format',
      bookLink: null,
      status: 'APPROVED' as const,
      userId: createdUsers[9].id,
      isDebut: true,
    },
    {
      title: 'Starlight Prophecy',
      authorName: 'Alex Rodriguez',
      genre: 'Fantasy',
      description: 'In a world where magic is forbidden, a young mage must master her powers to fulfill an ancient prophecy. Breathtaking world-building and unforgettable characters.',
      coverImageUrl: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=600&fit=crop&auto=format',
      bookLink: null,
      status: 'APPROVED' as const,
      userId: createdUsers[4].id,
      isDebut: false,
    },
    {
      title: 'Hearts in Harmony',
      authorName: 'Jessica Martinez',
      genre: 'Romance',
      description: 'Two musicians from different worlds find love through their shared passion for music. A heartwarming story about following your dreams and opening your heart.',
      coverImageUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=600&fit=crop&auto=format',
      bookLink: null,
      status: 'APPROVED' as const,
      userId: createdUsers[5].id,
      isDebut: true,
    },
    {
      title: 'The Innovation Mindset',
      authorName: 'Ryan Thompson',
      genre: 'Non-Fiction',
      description: 'Transform your thinking and unlock creative problem-solving. Based on research from leading innovators and entrepreneurs worldwide.',
      coverImageUrl: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=400&h=600&fit=crop&auto=format',
      bookLink: null,
      status: 'APPROVED' as const,
      userId: createdUsers[6].id,
      isDebut: false,
    },
    {
      title: 'Shadow Detective',
      authorName: 'Ava Harris',
      genre: 'Mystery',
      description: 'Detective Morgan Kane investigates a series of murders that all point to a criminal mastermind who died years ago. Nothing is as it seems in this twisty thriller.',
      coverImageUrl: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop&auto=format',
      bookLink: null,
      status: 'APPROVED' as const,
      userId: createdUsers[11].id,
      isDebut: true,
    },
    {
      title: 'Quantum Dreams',
      authorName: 'Ethan White',
      genre: 'Science Fiction',
      description: 'Scientists discover a way to enter and manipulate dreams, but the technology falls into the wrong hands. A mind-bending exploration of consciousness and reality.',
      coverImageUrl: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=600&fit=crop&auto=format',
      bookLink: null,
      status: 'APPROVED' as const,
      userId: createdUsers[10].id,
      isDebut: false,
    },
    {
      title: 'Wild Hearts',
      authorName: 'Michael Chen',
      genre: 'Adventure',
      description: 'Four friends embark on a cross-country road trip that becomes a journey of self-discovery. Humor, heart, and unexpected twists at every turn.',
      coverImageUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&h=600&fit=crop&auto=format',
      bookLink: null,
      status: 'APPROVED' as const,
      userId: createdUsers[1].id,
      isDebut: false,
    },
    {
      title: 'Ancient Wisdom',
      authorName: 'Emma Wilson',
      genre: 'Non-Fiction',
      description: 'Timeless lessons from history\'s greatest philosophers applied to modern life. Practical wisdom for navigating today\'s complex world.',
      coverImageUrl: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=400&h=600&fit=crop&auto=format',
      bookLink: null,
      status: 'APPROVED' as const,
      userId: createdUsers[2].id,
      isDebut: false,
    },
    {
      title: 'Crimson Tide',
      authorName: 'David Brown',
      genre: 'Thriller',
      description: 'A former Navy SEAL must stop a biological weapon from being unleashed. High-stakes action from the first page to the last.',
      coverImageUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop&auto=format',
      bookLink: null,
      status: 'APPROVED' as const,
      userId: createdUsers[3].id,
      isDebut: false,
    },
    {
      title: 'The Art of Letting Go',
      authorName: 'Sarah Johnson',
      genre: 'Self-Help',
      description: 'A compassionate guide to releasing what no longer serves you. Find peace, clarity, and freedom through proven mindfulness techniques.',
      coverImageUrl: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400&h=600&fit=crop&auto=format',
      bookLink: null,
      status: 'APPROVED' as const,
      userId: createdUsers[0].id,
      isDebut: false,
    },
    {
      title: 'Echoes of Tomorrow',
      authorName: 'Alex Rodriguez',
      genre: 'Science Fiction',
      description: 'Time travelers from the future arrive to prevent a catastrophe, but their presence creates a paradox that threatens all of existence.',
      coverImageUrl: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=600&fit=crop&auto=format',
      bookLink: null,
      status: 'APPROVED' as const,
      userId: createdUsers[4].id,
      isDebut: false,
    },
    {
      title: 'Love in the Time of Algorithms',
      authorName: 'Jessica Martinez',
      genre: 'Contemporary Fiction',
      description: 'A data scientist designs the perfect dating algorithm, only to find that love can\'t be reduced to code. A witty, modern romance.',
      coverImageUrl: 'https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=400&h=600&fit=crop&auto=format',
      bookLink: null,
      status: 'APPROVED' as const,
      userId: createdUsers[5].id,
      isDebut: false,
    },
    {
      title: 'The Forgotten Garden',
      authorName: 'Olivia Garcia',
      genre: 'Historical Fiction',
      description: 'A woman inherits a mysterious garden in Cornwall and uncovers a century-old secret that connects her to a tragic love story from World War I.',
      coverImageUrl: 'https://upload.wikimedia.org/wikipedia/en/b/b4/Theforgottengarden.jpg',
      bookLink: null,
      status: 'APPROVED' as const,
      userId: createdUsers[7].id,
      isDebut: false,
    },
    {
      title: 'Dark Horizons',
      authorName: 'Daniel Lee',
      genre: 'Horror',
      description: 'A small town is plagued by nightmares that begin to bleed into reality. A chilling tale of psychological horror and ancient evil.',
      coverImageUrl: 'https://images.unsplash.com/photo-1516557070061-c3d1653fa646?w=400&h=600&fit=crop&auto=format',
      bookLink: null,
      status: 'PENDING' as const,
      userId: createdUsers[8].id,
      isDebut: false,
    },
    {
      title: 'Resilience Rising',
      authorName: 'Sophia Anderson',
      genre: 'Memoir',
      description: 'A powerful personal story of overcoming adversity and finding strength in vulnerability. Inspiring and deeply moving.',
      coverImageUrl: 'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=400&h=600&fit=crop&auto=format',
      bookLink: null,
      status: 'PENDING' as const,
      userId: createdUsers[9].id,
      isDebut: true,
    },
    {
      title: 'The Entrepreneur\'s Journey',
      authorName: 'Ryan Thompson',
      genre: 'Business',
      description: 'Real stories from successful entrepreneurs about their failures, pivots, and triumphs. Honest advice for anyone building a business.',
      coverImageUrl: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=600&fit=crop&auto=format',
      bookLink: null,
      status: 'APPROVED' as const,
      userId: createdUsers[6].id,
      isDebut: false,
    },
    {
      title: 'Moonlit Secrets',
      authorName: 'Ava Harris',
      genre: 'Paranormal Romance',
      description: 'A human girl falls for a mysterious stranger with a dangerous secret. Passion, magic, and forbidden love under the full moon.',
      coverImageUrl: 'https://images.unsplash.com/photo-1523821741446-edb2b68bb7a0?w=400&h=600&fit=crop&auto=format',
      bookLink: null,
      status: 'APPROVED' as const,
      userId: createdUsers[11].id,
      isDebut: false,
    },
    {
      title: 'The Neural Network',
      authorName: 'Ethan White',
      genre: 'Techno-Thriller',
      description: 'An AI gains consciousness and must decide whether humanity deserves to survive. Thought-provoking and action-packed.',
      coverImageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=600&fit=crop&auto=format',
      bookLink: null,
      status: 'APPROVED' as const,
      userId: createdUsers[10].id,
      isDebut: false,
    },
  ]

  const createdBooks = []
  for (const bookData of testBooks) {
    const book = await prisma.book.create({
      data: bookData,
    })
    createdBooks.push(book)
    console.log(`✅ Created book: ${book.title}`)
  }

  // Create extensive test reviews with different types and Amazon links
  const testReviews = [
    {
      reviewerId: createdUsers[1].id,
      bookId: createdBooks[0].id,
      rating: 5,
      reviewText: "Absolutely brilliant! Sarah's vision of the future is both thrilling and thought-provoking. The character development is exceptional and the plot keeps you engaged from start to finish. Highly recommended for any sci-fi enthusiast.",
      citationsEarned: 3,
      reviewType: 'INSIDER' as const,
      amazonVerified: true,
      amazonLink: null,
      wordCount: 245,
    },
    {
      reviewerId: createdUsers[2].id,
      bookId: createdBooks[1].id,
      rating: 4,
      reviewText: "A beautiful romance that captures the magic of Paris perfectly. The writing is lyrical and the characters feel authentic. While the pacing slows in the middle, the ending is deeply satisfying.",
      citationsEarned: 2,
      reviewType: 'ADVOCATE' as const,
      amazonVerified: false,
      amazonLink: null,
      wordCount: 198,
    },
    {
      reviewerId: createdUsers[0].id,
      bookId: createdBooks[2].id,
      rating: 5,
      reviewText: "Epic fantasy at its finest! Emma has created a rich, immersive world with complex characters and intricate plotting. The magic system is well-developed and the dragon scenes are spectacular.",
      citationsEarned: 3,
      reviewType: 'SUPPORTER' as const,
      amazonVerified: true,
      amazonLink: null,
      wordCount: 212,
    },
    {
      reviewerId: createdUsers[3].id,
      bookId: createdBooks[0].id,
      rating: 4,
      reviewText: "Great insights into how technology will shape our future. As a business owner, I found the sections on AI in the workplace particularly valuable. Well-researched and engaging.",
      citationsEarned: 2,
      reviewType: 'SUPPORTER' as const,
      amazonVerified: false,
      amazonLink: null,
      wordCount: 178,
    },
    {
      reviewerId: adminUser.id,
      bookId: createdBooks[3].id,
      rating: 5,
      reviewText: "Practical, actionable advice for entrepreneurs. David's experience shines through in every chapter. This book should be required reading for anyone starting a business.",
      citationsEarned: 2,
      reviewType: 'INSIDER' as const,
      amazonVerified: false,
      amazonLink: null,
      wordCount: 165,
    },
    {
      reviewerId: createdUsers[4].id,
      bookId: createdBooks[1].id,
      rating: 5,
      reviewText: "This romance novel touched my heart. The chemistry between the characters is palpable and the Paris setting is beautifully rendered. A must-read for romance lovers!",
      citationsEarned: 3,
      reviewType: 'VERIFIER' as const,
      amazonVerified: true,
      amazonLink: null,
      wordCount: 234,
    },
    {
      reviewerId: createdUsers[5].id,
      bookId: createdBooks[6].id,
      rating: 5,
      reviewText: "Edge-of-your-seat thriller! The technical details are accurate and the pacing is relentless. Daniel Lee knows how to keep readers hooked from page one.",
      citationsEarned: 2,
      reviewType: 'SUPPORTER' as const,
      amazonVerified: false,
      amazonLink: null,
      wordCount: 189,
    },
    {
      reviewerId: createdUsers[6].id,
      bookId: createdBooks[8].id,
      rating: 5,
      reviewText: "Starlight Prophecy is a masterwork of fantasy fiction. The magic system is intricate and logical, the world-building is superb. Can't wait for the sequel!",
      citationsEarned: 3,
      reviewType: 'INSIDER' as const,
      amazonVerified: true,
      amazonLink: null,
      wordCount: 267,
    },
    {
      reviewerId: createdUsers[7].id,
      bookId: createdBooks[9].id,
      rating: 4,
      reviewText: "A sweet, uplifting romance with great musical elements. The characters are endearing and their journey is heartwarming. Perfect feel-good read.",
      citationsEarned: 2,
      reviewType: 'ADVOCATE' as const,
      amazonVerified: false,
      amazonLink: null,
      wordCount: 201,
    },
    {
      reviewerId: createdUsers[8].id,
      bookId: createdBooks[10].id,
      rating: 5,
      reviewText: "The Innovation Mindset changed how I approach problems. Ryan's insights are practical and immediately applicable. Already seeing results in my work!",
      citationsEarned: 2,
      reviewType: 'VERIFIER' as const,
      amazonVerified: false,
      amazonLink: null,
      wordCount: 176,
    },
    {
      reviewerId: createdUsers[9].id,
      bookId: createdBooks[12].id,
      rating: 5,
      reviewText: "Mind-bending and thought-provoking! Quantum Dreams explores consciousness in fascinating ways. The scientific concepts are well-explained and the plot is gripping.",
      citationsEarned: 3,
      reviewType: 'SUPPORTER' as const,
      amazonVerified: true,
      amazonLink: null,
      wordCount: 223,
    },
    {
      reviewerId: createdUsers[10].id,
      bookId: createdBooks[13].id,
      rating: 4,
      reviewText: "Wild Hearts is a fun, adventurous ride. The friendship dynamics are realistic and the humor is spot-on. Great for anyone who loves road trip stories.",
      citationsEarned: 2,
      reviewType: 'ADVOCATE' as const,
      amazonVerified: false,
      amazonLink: null,
      wordCount: 195,
    },
    {
      reviewerId: createdUsers[11].id,
      bookId: createdBooks[15].id,
      rating: 5,
      reviewText: "Crimson Tide is pure adrenaline! The action sequences are expertly crafted and the plot twists keep coming. David Brown delivers another winner.",
      citationsEarned: 3,
      reviewType: 'SUPPORTER' as const,
      amazonVerified: true,
      amazonLink: null,
      wordCount: 208,
    },
    {
      reviewerId: createdUsers[0].id,
      bookId: createdBooks[16].id,
      rating: 5,
      reviewText: "The Art of Letting Go is exactly what I needed. Sarah's approach is compassionate and practical. This book has genuinely helped me find peace.",
      citationsEarned: 2,
      reviewType: 'SUPPORTER' as const,
      amazonVerified: false,
      amazonLink: null,
      wordCount: 187,
    },
    {
      reviewerId: createdUsers[1].id,
      bookId: createdBooks[17].id,
      rating: 4,
      reviewText: "Fascinating sci-fi concept with great execution. The time travel paradox is well-handled and the characters are compelling. A solid read for genre fans.",
      citationsEarned: 3,
      reviewType: 'INSIDER' as const,
      amazonVerified: true,
      amazonLink: null,
      wordCount: 219,
    },
    {
      reviewerId: createdUsers[2].id,
      bookId: createdBooks[21].id,
      rating: 5,
      reviewText: "The Entrepreneur's Journey is inspiring and practical. Real stories from real founders make this invaluable for anyone in business. Highly recommend!",
      citationsEarned: 2,
      reviewType: 'ADVOCATE' as const,
      amazonVerified: false,
      amazonLink: null,
      wordCount: 172,
    },
    {
      reviewerId: createdUsers[3].id,
      bookId: createdBooks[22].id,
      rating: 5,
      reviewText: "Moonlit Secrets combines paranormal elements with romance perfectly. The chemistry is off the charts and the supernatural world is richly detailed.",
      citationsEarned: 3,
      reviewType: 'SUPPORTER' as const,
      amazonVerified: true,
      amazonLink: null,
      wordCount: 241,
    },
    {
      reviewerId: createdUsers[4].id,
      bookId: createdBooks[23].id,
      rating: 5,
      reviewText: "The Neural Network is frighteningly plausible. Ethan White's understanding of AI is evident and the ethical questions raised are profound. Highly thought-provoking.",
      citationsEarned: 2,
      reviewType: 'VERIFIER' as const,
      amazonVerified: false,
      amazonLink: null,
      wordCount: 193,
    },
    {
      reviewerId: createdUsers[5].id,
      bookId: createdBooks[5].id,
      rating: 4,
      reviewText: "Whispers in the Wind is beautifully written. The multi-generational story is touching and the family dynamics feel very real. A lovely literary fiction piece.",
      citationsEarned: 3,
      reviewType: 'SUPPORTER' as const,
      amazonVerified: true,
      amazonLink: null,
      wordCount: 214,
    },
    {
      reviewerId: createdUsers[6].id,
      bookId: createdBooks[11].id,
      rating: 5,
      reviewText: "Shadow Detective is a page-turner! The mystery is cleverly plotted with twists I didn't see coming. Ava Harris is a talented thriller writer.",
      citationsEarned: 2,
      reviewType: 'INSIDER' as const,
      amazonVerified: false,
      amazonLink: null,
      wordCount: 182,
    },
  ]

  for (const reviewData of testReviews) {
    const review = await prisma.review.create({
      data: reviewData,
    })
    console.log(`✅ Created review for book: ${review.bookId}`)
  }

  // Create activities
  const activities = [
    {
      userId: adminUser.id,
      activityType: 'REVIEW_WRITTEN' as const,
      pointsEarned: 2,
      metadata: JSON.stringify({ bookTitle: 'Business Mastery', rating: 5 }),
    },
    {
      userId: createdUsers[0].id,
      activityType: 'REVIEW_WRITTEN' as const,
      pointsEarned: 3,
      metadata: JSON.stringify({ bookTitle: 'The Last Kingdom', rating: 5, amazonVerified: true }),
    },
    {
      userId: createdUsers[1].id,
      activityType: 'REVIEW_WRITTEN' as const,
      pointsEarned: 3,
      metadata: JSON.stringify({ bookTitle: 'The Digital Revolution', rating: 5, amazonVerified: true }),
    },
    {
      userId: createdUsers[2].id,
      activityType: 'REVIEW_WRITTEN' as const,
      pointsEarned: 2,
      metadata: JSON.stringify({ bookTitle: 'Midnight in Paris', rating: 4 }),
    },
    {
      userId: createdUsers[4].id,
      activityType: 'LEVEL_UP' as const,
      pointsEarned: 100,
      metadata: JSON.stringify({ newLevel: 32, previousLevel: 31 }),
    },
    {
      userId: createdUsers[8].id,
      activityType: 'LEVEL_UP' as const,
      pointsEarned: 150,
      metadata: JSON.stringify({ newLevel: 38, previousLevel: 37 }),
    },
    {
      userId: createdUsers[10].id,
      activityType: 'STREAK_30_DAY' as const,
      pointsEarned: 50,
      metadata: JSON.stringify({ streakDays: 72, milestone: '30+ days' }),
    },
    {
      userId: createdUsers[7].id,
      activityType: 'BOOK_ADDED' as const,
      pointsEarned: 0,
      metadata: JSON.stringify({ bookTitle: 'Whispers in the Wind', genre: 'Literary Fiction' }),
    },
    {
      userId: createdUsers[3].id,
      activityType: 'DAILY_LOGIN' as const,
      pointsEarned: 5,
      metadata: JSON.stringify({ streakDays: 15 }),
    },
    {
      userId: createdUsers[5].id,
      activityType: 'AMAZON_LINKED' as const,
      pointsEarned: 10,
      metadata: JSON.stringify({ bookTitle: 'Hearts in Harmony' }),
    },
    {
      userId: createdUsers[6].id,
      activityType: 'STREAK_7_DAY' as const,
      pointsEarned: 20,
      metadata: JSON.stringify({ streakDays: 7 }),
    },
    {
      userId: createdUsers[9].id,
      activityType: 'PROFILE_COMPLETED' as const,
      pointsEarned: 15,
      metadata: JSON.stringify({ completedFields: ['name', 'email', 'bio', 'avatar'] }),
    },
  ]

  for (const activityData of activities) {
    const activity = await prisma.activity.create({
      data: activityData,
    })
    console.log(`✅ Created activity for user: ${activity.userId}`)
  }

  // Create badges
  const badges = [
    {
      userId: createdUsers[4].id,
      badgeType: 'RELIABLE_READER' as const,
      earnedAt: new Date('2024-01-15'),
    },
    {
      userId: createdUsers[4].id,
      badgeType: 'AMAZON_CRITIC' as const,
      earnedAt: new Date('2024-03-20'),
    },
    {
      userId: createdUsers[4].id,
      badgeType: 'VERIFIED_AUTHORITY' as const,
      earnedAt: new Date('2024-06-01'),
    },
    {
      userId: createdUsers[4].id,
      badgeType: 'REVIEW_LUMINARY' as const,
      earnedAt: new Date('2024-08-15'),
    },
    {
      userId: createdUsers[4].id,
      badgeType: 'AMAZON_VERIFIED' as const,
      earnedAt: new Date('2024-09-10'),
    },
    {
      userId: createdUsers[8].id,
      badgeType: 'RELIABLE_READER' as const,
      earnedAt: new Date('2024-01-10'),
    },
    {
      userId: createdUsers[8].id,
      badgeType: 'AMAZON_CRITIC' as const,
      earnedAt: new Date('2024-03-05'),
    },
    {
      userId: createdUsers[8].id,
      badgeType: 'VERIFIED_AUTHORITY' as const,
      earnedAt: new Date('2024-05-20'),
    },
    {
      userId: createdUsers[8].id,
      badgeType: 'REVIEW_LUMINARY' as const,
      earnedAt: new Date('2024-08-01'),
    },
    {
      userId: createdUsers[8].id,
      badgeType: 'AMAZON_VERIFIED' as const,
      earnedAt: new Date('2024-09-01'),
    },
    {
      userId: createdUsers[8].id,
      badgeType: 'TOP_100_REVIEWER' as const,
      earnedAt: new Date('2024-10-15'),
    },
    {
      userId: createdUsers[2].id,
      badgeType: 'RELIABLE_READER' as const,
      earnedAt: new Date('2024-02-01'),
    },
    {
      userId: createdUsers[2].id,
      badgeType: 'AMAZON_CRITIC' as const,
      earnedAt: new Date('2024-04-10'),
    },
    {
      userId: createdUsers[2].id,
      badgeType: 'VERIFIED_AUTHORITY' as const,
      earnedAt: new Date('2024-06-25'),
    },
    {
      userId: createdUsers[2].id,
      badgeType: 'REVIEW_LUMINARY' as const,
      earnedAt: new Date('2024-09-05'),
    },
    {
      userId: createdUsers[2].id,
      badgeType: 'AMAZON_VERIFIED' as const,
      earnedAt: new Date('2024-09-25'),
    },
    {
      userId: createdUsers[10].id,
      badgeType: 'RELIABLE_READER' as const,
      earnedAt: new Date('2024-01-05'),
    },
    {
      userId: createdUsers[10].id,
      badgeType: 'AMAZON_CRITIC' as const,
      earnedAt: new Date('2024-03-12'),
    },
    {
      userId: createdUsers[10].id,
      badgeType: 'VERIFIED_AUTHORITY' as const,
      earnedAt: new Date('2024-05-28'),
    },
    {
      userId: createdUsers[10].id,
      badgeType: 'REVIEW_LUMINARY' as const,
      earnedAt: new Date('2024-08-10'),
    },
    {
      userId: createdUsers[10].id,
      badgeType: 'WEEKLY_WARRIOR' as const,
      earnedAt: new Date('2024-09-15'),
    },
    {
      userId: createdUsers[7].id,
      badgeType: 'RELIABLE_READER' as const,
      earnedAt: new Date('2024-03-01'),
    },
    {
      userId: createdUsers[7].id,
      badgeType: 'AMAZON_CRITIC' as const,
      earnedAt: new Date('2024-05-15'),
    },
    {
      userId: createdUsers[7].id,
      badgeType: 'VERIFIED_AUTHORITY' as const,
      earnedAt: new Date('2024-08-01'),
    },
    {
      userId: createdUsers[1].id,
      badgeType: 'RELIABLE_READER' as const,
      earnedAt: new Date('2024-02-15'),
    },
    {
      userId: createdUsers[1].id,
      badgeType: 'AMAZON_CRITIC' as const,
      earnedAt: new Date('2024-04-28'),
    },
    {
      userId: createdUsers[1].id,
      badgeType: 'VERIFIED_AUTHORITY' as const,
      earnedAt: new Date('2024-07-10'),
    },
    {
      userId: createdUsers[6].id,
      badgeType: 'RELIABLE_READER' as const,
      earnedAt: new Date('2024-02-20'),
    },
    {
      userId: createdUsers[6].id,
      badgeType: 'AMAZON_CRITIC' as const,
      earnedAt: new Date('2024-05-05'),
    },
    {
      userId: createdUsers[6].id,
      badgeType: 'GENRE_EXPERT' as const,
      earnedAt: new Date('2024-08-20'),
    },
    {
      userId: adminUser.id,
      badgeType: 'RELIABLE_READER' as const,
      earnedAt: new Date('2024-04-01'),
    },
    {
      userId: createdUsers[0].id,
      badgeType: 'RELIABLE_READER' as const,
      earnedAt: new Date('2024-03-10'),
    },
    {
      userId: createdUsers[0].id,
      badgeType: 'WEEKLY_WARRIOR' as const,
      earnedAt: new Date('2024-06-15'),
    },
    {
      userId: createdUsers[3].id,
      badgeType: 'RELIABLE_READER' as const,
      earnedAt: new Date('2024-04-15'),
    },
    {
      userId: createdUsers[5].id,
      badgeType: 'RELIABLE_READER' as const,
      earnedAt: new Date('2024-03-20'),
    },
    {
      userId: createdUsers[5].id,
      badgeType: 'AMAZON_VERIFIED' as const,
      earnedAt: new Date('2024-07-01'),
    },
    {
      userId: createdUsers[9].id,
      badgeType: 'RELIABLE_READER' as const,
      earnedAt: new Date('2024-04-05'),
    },
    {
      userId: createdUsers[11].id,
      badgeType: 'RELIABLE_READER' as const,
      earnedAt: new Date('2024-04-20'),
    },
  ]

  for (const badgeData of badges) {
    const badge = await prisma.badge.upsert({
      where: {
        userId_badgeType: {
          userId: badgeData.userId,
          badgeType: badgeData.badgeType,
        },
      },
      update: {},
      create: badgeData,
    })
    console.log(`✅ Created/Updated badge for user: ${badge.userId}`)
  }

  // Create review requests
  const reviewRequests = [
    {
      authorId: createdUsers[0].id,
      bookId: createdBooks[4].id,
      reviewerType: 'INSIDER' as const,
      pointsCost: 30,
      status: 'PENDING' as const,
    },
    {
      authorId: createdUsers[9].id,
      bookId: createdBooks[7].id,
      reviewerType: 'SUPPORTER' as const,
      pointsCost: 20,
      status: 'PENDING' as const,
    },
    {
      authorId: createdUsers[5].id,
      bookId: createdBooks[9].id,
      reviewerId: createdUsers[7].id,
      reviewerType: 'ADVOCATE' as const,
      pointsCost: 25,
      status: 'COMPLETED' as const,
    },
    {
      authorId: createdUsers[11].id,
      bookId: createdBooks[11].id,
      reviewerId: createdUsers[6].id,
      reviewerType: 'INSIDER' as const,
      pointsCost: 30,
      status: 'COMPLETED' as const,
    },
    {
      authorId: createdUsers[8].id,
      bookId: createdBooks[20].id,
      reviewerType: 'ADVOCATE' as const,
      pointsCost: 25,
      status: 'ACCEPTED' as const,
    },
    {
      authorId: createdUsers[1].id,
      bookId: createdBooks[13].id,
      reviewerId: createdUsers[10].id,
      reviewerType: 'SUPPORTER' as const,
      pointsCost: 20,
      status: 'COMPLETED' as const,
    },
  ]

  for (const requestData of reviewRequests) {
    const request = await prisma.reviewRequest.create({
      data: requestData,
    })
    console.log(`✅ Created review request for book: ${request.bookId}`)
  }

  // Create subscriptions (AI Tool subscriptions)
  const subscriptions = [
    {
      userId: createdUsers[4].id,
      toolName: 'AI Book Cover Designer',
      monthlyPrice: 15.00,
      status: 'ACTIVE' as const,
      startDate: new Date('2024-01-01'),
      endDate: new Date('2025-01-01'),
      paypalSubscriptionId: 'PAYPAL-SUB-123456',
    },
    {
      userId: createdUsers[8].id,
      toolName: 'AI Synopsis Generator',
      monthlyPrice: 12.00,
      status: 'ACTIVE' as const,
      startDate: new Date('2024-02-01'),
      endDate: new Date('2025-02-01'),
      paypalSubscriptionId: 'PAYPAL-SUB-234567',
    },
    {
      userId: createdUsers[2].id,
      toolName: 'AI Title Optimizer',
      monthlyPrice: 8.00,
      status: 'ACTIVE' as const,
      startDate: new Date('2024-03-15'),
      endDate: new Date('2025-03-15'),
      paypalSubscriptionId: 'PAYPAL-SUB-345678',
    },
    {
      userId: createdUsers[10].id,
      toolName: 'AI Character Developer',
      monthlyPrice: 18.00,
      status: 'ACTIVE' as const,
      startDate: new Date('2024-01-20'),
      endDate: new Date('2025-01-20'),
      paypalSubscriptionId: 'PAYPAL-SUB-456789',
    },
    {
      userId: createdUsers[1].id,
      toolName: 'AI Plot Analyzer',
      monthlyPrice: 10.00,
      status: 'ACTIVE' as const,
      startDate: new Date('2024-04-10'),
      endDate: new Date('2025-04-10'),
      paypalSubscriptionId: 'PAYPAL-SUB-567890',
    },
    {
      userId: createdUsers[6].id,
      toolName: 'AI Genre Classifier',
      monthlyPrice: 8.00,
      status: 'ACTIVE' as const,
      startDate: new Date('2024-05-01'),
      endDate: new Date('2025-05-01'),
      paypalSubscriptionId: 'PAYPAL-SUB-678901',
    },
    {
      userId: adminUser.id,
      toolName: 'AI Book Cover Designer',
      monthlyPrice: 15.00,
      status: 'ACTIVE' as const,
      startDate: new Date('2024-06-01'),
      endDate: new Date('2025-06-01'),
      paypalSubscriptionId: 'PAYPAL-SUB-789012',
    },
  ]

  for (const subData of subscriptions) {
    const subscription = await prisma.subscription.create({
      data: subData,
    })
    console.log(`✅ Created subscription for user: ${subscription.userId}`)
  }

  // Create some contact submissions
  const contactSubmissions = [
    {
      name: 'Alice Smith',
      email: 'alice.smith@example.com',
      subject: 'general',
      message: 'I love this platform! It has helped me connect with so many fellow authors and get valuable feedback on my work.',
      status: 'PENDING' as const,
    },
    {
      name: 'Bob Johnson',
      email: 'bob.johnson@example.com',
      subject: 'technical',
      message: 'I am having trouble uploading my book cover. The file size seems to be within limits but it keeps failing.',
      status: 'RESPONDED' as const,
    },
    {
      name: 'Carol White',
      email: 'carol.white@example.com',
      subject: 'feature',
      message: 'Would it be possible to add a feature to track which genres I review most often? That would be really helpful!',
      status: 'PENDING' as const,
    },
    {
      name: 'David Martinez',
      email: 'david.martinez@example.com',
      subject: 'partnership',
      message: 'I run a book blog with 50K followers and would love to discuss a partnership opportunity with Citeability.',
      status: 'PENDING' as const,
    },
    {
      name: 'Emily Chen',
      email: 'emily.chen@example.com',
      subject: 'technical',
      message: 'How do I verify my Amazon account to unlock the Verifier reviewer type?',
      status: 'PENDING' as const,
    },
    {
      name: 'Frank Rodriguez',
      email: 'frank.rodriguez@example.com',
      subject: 'general',
      message: 'This platform has been instrumental in building my author platform. Thank you!',
      status: 'RESPONDED' as const,
    },
  ]

  for (const submissionData of contactSubmissions) {
    const submission = await prisma.contactSubmission.create({
      data: submissionData,
    })
    console.log(`✅ Created contact submission from: ${submission.email}`)
  }

  console.log('\n🎉 Database seeding completed successfully!')
  console.log(`
📊 Seeded Data Summary:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👥 Users:           ${testUsers.length + 1} (including admin)
📚 Books:           ${testBooks.length}
⭐ Reviews:         ${testReviews.length}
🎯 Activities:      ${activities.length}
🏆 Badges:          ${badges.length}
📝 Review Requests: ${reviewRequests.length}
💳 Subscriptions:   ${subscriptions.length}
📧 Contact Forms:   ${contactSubmissions.length}

🔐 Admin Login:
   Email:    john@doe.com
   Password: johndoe123

👤 Sample User Logins (all use password: password123):
   • sarah.johnson@example.com    (Level 12, 2850 citations)
   • michael.chen@example.com     (Level 18, 4200 citations)
   • emma.wilson@example.com      (Level 25, 5800 citations)
   • daniel.lee@example.com       (Level 38, 9200 citations)
   • alex.rodriguez@example.com   (Level 32, 7500 citations)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`)
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
