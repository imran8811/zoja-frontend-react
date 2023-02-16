export const AGE_LIMIT = [18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,58,60]
export const AGE_SELECTION = [18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60]
export const POPULAR_CASTS = ["jutt", "arain", "rajpoot", "malik"]
export const ORIGIN = ["punjabi", "urdu", "sindhi", "pashto", "balochi", "saraiki", "hindko"]
export const RELIGIONS = ["muslim", "christian", "sikh", "hindu", "Ahmadi", "Ismaili"]
export const CITIES = ["lahore", "karachi", "rawalpindi", "islamabad", "multan", "faisalabad"]
export const COUNTRIES = {
  pakistan : "Pakistan",
  uk : "UK", 
  usa : "USA", 
  uae : "UAE", 
  saudiArabia : "Saudi Arabia", 
  germany : "Germany"
}
export const STATUS = {
  single : 'Single',
  divorced : 'Divorced',
  separated : 'Separated',
  widower : 'Widower',
  married : 'Married',
  divorcedWithChildren : 'Divorced with Children',
  separatedWithChildren : 'Separated with Children',
  widowerWithChildren : 'Widower with Children',
  marriedWithChildren : 'Married with children' 
}

const defaultFilters = {
  type: 'bride',
  religion: 'all',
  degreeLevel: 'all',
  degreeType: 'all',
  institute: 'all',
  professionType: 'all',
  jobTitle: 'all',
  income: 'all',
  age: {
    from : 18,
    to : 60
  },
  status: 'all',
  complexion: 'all',
  weight: {
    from: 50,
    to : 150
  },
  height: {
    from : 2,
    to : 10
  },
  country: 'all',
  city: 'all',
  motherLanguage: 'all',
  caste: 'all',
}