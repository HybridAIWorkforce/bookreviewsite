
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'
import { BookDetail } from '@/components/book-detail'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export default async function BookDetailPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  
  const book = await prisma.book.findUnique({
    where: { id: params.id },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      reviews: {
        include: {
          reviewer: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  })

  if (!book) {
    notFound()
  }

  // Check if current user has already reviewed this book
  const userReview = session?.user?.id
    ? book.reviews.find((review) => review.reviewerId === session.user.id)
    : null

  return <BookDetail book={book} currentUserId={session?.user?.id} userReview={userReview} />
}
