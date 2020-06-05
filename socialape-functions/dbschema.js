let db = {
  users: [
    {
      userId: "H1fkYBONgfZMrgV373tMLZzdi803",
      email: "uyser@email.fi",
      handel: "user",
      created: "2020-05-14T11:02:31.535Z",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/socialapp-7ba20.appspot.com/o/546103.jpg?alt=media",
      bio: "hello world",
      website: "https://user.fi",
      location: "london, uk",
    },
  ],
  screams: [
    {
      userHandle: "user",
      body: "this is the scream body",
      created: "13.5.2020",
      likeCount: 5,
      commentCount: 2,
    },
  ],
  comments: [
    {
      userHandle: "user",
      screamId: "akfaöldsjf",
      body: "nice cat",
      created: "20.3",
    },
  ],
  notifications: [
    {
      recipient: "user",
      sender: "jhon",
      red: "true|false",
      screamId: "aljdslkfkdsjf",
      type: "like|comment",
      created: "2020-05-14T11:02:31.535Z",
    },
  ],
};
const userDetails = {
  //Redux data
  userInfo: {
    userId: "H1fkYBONgfZMrgV373tMLZzdi803",
    email: "uyser@email.fi",
    handel: "user",
    created: "2020-05-14T11:02:31.535Z",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/socialapp-7ba20.appspot.com/o/546103.jpg?alt=media",
    bio: "hello world",
    website: "https://user.fi",
    location: "london, uk",
  },
  likes: [
    {
      userHandle: "user",
      screamId: "1dsajhajhdja",
    },
    {
      userHandle: "user",
      screamId: "2dsajhajhdja",
    },
  ],
};
