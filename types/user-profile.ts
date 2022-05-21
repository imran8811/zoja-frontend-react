export type UserProfile = {
  type: string,
  fullName: string,
  email: string,
  password: string,
  religion: string,
  subReligion: string,
  degreeLevel: string,
  degreeType: string,
  institute: string,
  profession: string,
  income: number,
  age: number,
  status: string,
  complexion: string,
  weight: number
  height : {
    feet: number
    inch: number
  },
  country: string
  city: string,
  area: string,
  motherLanguage: string,
  caste: string,
}