export interface Todo {
  heading?: String,
  description?: String,
  deadline?: String,
  id?: String
}

export interface News {
  author?: String,
  title?: String,
  description?: String,
  url?: String,
  urlToImage?: String,
  publishedAt?: String,
}

export interface Expenditure {
  category?: String,
  amount?: Number,
  description?: String,
  date?: String,
  modeOfPayment?: String,
  id?: String
}

export interface Debt {
  amount?: Number,
  date?: String,
  name?: String,
  description?: String,
  type?: String,
  id?: String,
}
