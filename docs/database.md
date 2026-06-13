# VOYA Database Design

## 1. User Collection

Stores user account information.

```js
{
  _id,
  name,
  email,
  password,
  profilePicture,
  createdAt
}
```

---

## 2. Trip Collection

Stores trip details.

```js
{
  _id,
  userId,
  title,
  description,
  startDate,
  endDate,
  visibility, // public | private
  coverImage,
  createdAt
}
```

Example:

```js
{
  title: "Vietnam Adventure",
  description: "My 10-day Vietnam trip",
  startDate: "2026-06-10",
  endDate: "2026-06-20",
  visibility: "public"
}
```

---

## 3. Destination Collection

Stores places visited during a trip.

```js
{
  _id,
  tripId,
  name,
  country,
  latitude,
  longitude,
  visitDate,
  notes
}
```

Example:

```js
{
  name: "Hoi An",
  country: "Vietnam",
  latitude: 15.8801,
  longitude: 108.338,
  notes: "Beautiful lantern festival"
}
```

---

## 4. Journal Entry Collection

Stores travel memories and diary entries.

```js
{
  _id,
  tripId,
  title,
  content,
  date
}
```

Example:

```js
{
  title: "First Day in Hanoi",
  content: "Explored the old quarter and tried local food.",
  date: "2026-06-11"
}
```

---

## 5. Expense Collection

Stores trip expenses.

```js
{
  _id,
  tripId,
  category,
  amount,
  description,
  date
}
```

Categories:

- Food
- Hotel
- Shopping
- Transport
- Other

Example:

```js
{
  category: "Food",
  amount: 500,
  description: "Dinner",
  date: "2026-06-11"
}
```

---

# Relationships

User
│
└── Trips
      │
      ├── Destinations
      ├── Journal Entries
      └── Expenses
