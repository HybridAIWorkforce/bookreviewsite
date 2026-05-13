
import { ReviewerType, BookGenre } from '@prisma/client'

// Book Difficulty Multipliers
export const DIFFICULTY_MULTIPLIERS: Record<string, number> = {
  // High Difficulty (2.0x)
  POETRY: 2.0,
  LITERARY_FICTION: 2.0,
  SHORT_STORIES: 2.0,
  NOVELLAS: 2.0,
  TRANSLATED_WORKS: 2.0,
  
  // Medium-High Difficulty (1.5x)
  SPECIALIZED_NON_FICTION: 1.5,
  CHILDREN_PICTURE_BOOKS: 1.5,
  MIDDLE_GRADE: 1.5,
  
  // Medium Difficulty (1.2x)
  MAINSTREAM_NON_FICTION: 1.2,
  HISTORICAL_FICTION: 1.2,
  COZY_MYSTERIES: 1.2,
  WESTERNS: 1.2,
  
  // Low Difficulty (1.0x)
  ROMANCE: 1.0,
  FANTASY: 1.0,
  SCIENCE_FICTION: 1.0,
  THRILLERS: 1.0,
  YOUNG_ADULT: 1.0,
}

// Debut Author Bonus
export const DEBUT_AUTHOR_BONUS = 0.3

// Reviewer Type Base Values
export const REVIEWER_TYPE_VALUES: Record<ReviewerType, number> = {
  VERIFIER: 150,   // Type 1: Verified Purchase on Amazon
  ADVOCATE: 100,   // Type 2: Non-Verified Amazon Review
  INSIDER: 50,     // Type 3: Detailed Site Review 300+ words
  SUPPORTER: 25,   // Type 4: Standard Site Review 150+ words
}

// Frequency Bonuses
export function getFrequencyBonus(reviewCount: number): number {
  if (reviewCount >= 51) return 60  // Master Reviewer
  if (reviewCount >= 31) return 40  // Expert Reviewer
  if (reviewCount >= 16) return 25  // Prolific Reviewer
  if (reviewCount >= 6) return 15   // Active Reviewer
  return 0  // New Reviewer
}

// Calculate total points for a review
export function calculateReviewPoints(
  reviewerType: ReviewerType,
  reviewCount: number,
  genre: string,
  isDebut: boolean
): number {
  // Base Value (Reviewer Type)
  const baseValue = REVIEWER_TYPE_VALUES[reviewerType]
  
  // Frequency Bonus
  const frequencyBonus = getFrequencyBonus(reviewCount)
  
  // Book Difficulty Multiplier
  let difficultyMultiplier = DIFFICULTY_MULTIPLIERS[genre] || 1.0
  
  // Add Debut Author Bonus to multiplier
  if (isDebut) {
    difficultyMultiplier += DEBUT_AUTHOR_BONUS
  }
  
  // Total Points = Multiplier × (Base Value + Frequency Bonus)
  const totalPoints = Math.round(difficultyMultiplier * (baseValue + frequencyBonus))
  
  return totalPoints
}

// Get difficulty multiplier for a genre
export function getDifficultyMultiplier(genre: string, isDebut: boolean): number {
  let multiplier = DIFFICULTY_MULTIPLIERS[genre] || 1.0
  if (isDebut) {
    multiplier += DEBUT_AUTHOR_BONUS
  }
  return multiplier
}

// Activity Points
export const ACTIVITY_POINTS = {
  DAILY_LOGIN: 5,
  BOOK_ADDED: 30,
  PROFILE_COMPLETED: 20,
  AMAZON_LINKED: 25,
  SOCIAL_MEDIA_BOOST: 100,
  SHARE_REVIEW: 5,
  LEVEL_UP: 50,
  STREAK_7_DAY: 15,
  STREAK_30_DAY: 75,
  REVIEW_WEEK_STREAK: 50,
}

// User Level Calculation
export function calculateUserLevel(points: number): number {
  if (points >= 1500) return 5  // Luminary
  if (points >= 700) return 4   // Authority
  if (points >= 300) return 3   // Critic
  if (points >= 100) return 2   // Contributor
  return 1  // Apprentice
}

export const LEVEL_NAMES: Record<number, string> = {
  1: 'Apprentice',
  2: 'Contributor',
  3: 'Critic',
  4: 'Authority',
  5: 'Luminary',
}

export const LEVEL_BADGES: Record<number, string> = {
  1: '',
  2: 'Reliable Reader',
  3: 'Amazon Critic',
  4: 'Verified Authority',
  5: 'Review Luminary',
}

// Points required for each level
export const LEVEL_THRESHOLDS: Record<number, number> = {
  1: 0,
  2: 100,
  3: 300,
  4: 700,
  5: 1500,
}

// Genre display names
export const GENRE_DISPLAY_NAMES: Record<string, string> = {
  POETRY: 'Poetry',
  LITERARY_FICTION: 'Literary Fiction',
  SHORT_STORIES: 'Short Stories',
  NOVELLAS: 'Novellas',
  TRANSLATED_WORKS: 'Translated Works',
  SPECIALIZED_NON_FICTION: 'Specialized Non-Fiction',
  CHILDREN_PICTURE_BOOKS: 'Children\'s Picture Books',
  MIDDLE_GRADE: 'Middle Grade',
  MAINSTREAM_NON_FICTION: 'Mainstream Non-Fiction',
  HISTORICAL_FICTION: 'Historical Fiction',
  COZY_MYSTERIES: 'Cozy Mysteries',
  WESTERNS: 'Westerns',
  ROMANCE: 'Romance',
  FANTASY: 'Fantasy',
  SCIENCE_FICTION: 'Science Fiction',
  THRILLERS: 'Thrillers',
  YOUNG_ADULT: 'Young Adult',
}

// Reviewer Type display names
export const REVIEWER_TYPE_NAMES: Record<ReviewerType, string> = {
  VERIFIER: 'The Verifier',
  ADVOCATE: 'The Advocate',
  INSIDER: 'The Insider',
  SUPPORTER: 'The Supporter',
}

export const REVIEWER_TYPE_DESCRIPTIONS: Record<ReviewerType, string> = {
  VERIFIER: 'Posts Verified Purchase Review on Amazon (with link)',
  ADVOCATE: 'Posts Non-Verified Review on Amazon (with link)',
  INSIDER: 'Posts Detailed Review on Our Site (300+ words)',
  SUPPORTER: 'Posts Standard Review on Our Site (150+ words)',
}
