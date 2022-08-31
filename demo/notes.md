Models:
    Users
        id (primary key)
        username
        password
    Posts
        id (primary key)
        subject/title
        content
        date created (auto from sequelize?)
        user_id (creator)
    Comments
        id (primary key)
        content
        date created
        user_id
        post_id
    

    Day 3, activity 24 good demo of auth and general page setup