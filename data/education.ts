export interface EducationItem {
  id: string
  degree: string
  institution: string
  field: string
  startYear: number
  endYear: number
  gpa?: string
  highlights?: string[]
}

export const education: EducationItem[] = [
  {
    id: 'be-cse',
    degree: 'B.E. in Computer Science & Engineering',
    institution: 'Chandigarh University',
    field: 'Computer Science & Engineering',
    startYear: 2020,
    endYear: 2024,
    gpa: '7.66',
    highlights: [
      'Graduated: 2024',
      'CGPA: 7.66',
    ]
  },
]
