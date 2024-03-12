CREATE TABLE IF NOT EXISTS user(
    user_id INTEGER PRIMARY KEY ,
    username VARCHAR(255) NOT NULL,
    password VARCHAR,
    Age INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS bmi(
    bmi_id INTEGER PRIMARY KEY,
    user_id INTEGER NOT NULL,
    weight INTEGER NOT NULL,
    height INTEGER NOT NULL,
    bmivalue INTEGER NOT NULL,
    FOREIGN KEY(user_id) REFERENCES user(user_id)
);
CREATE TABLE IF NOT EXISTS category (
    category_id INTEGER PRIMARY KEY,
    bmi_id INTEGER NOT NULL,
    category VARCHAR NOT NULL,
    FOREIGN KEY(bmi_id) REFERENCES bmi(bmi_id)
);

CREATE TABLE suggestions (
  sug_id INTEGER PRIMARY KEY,
  suggestions TEXT,
  category_id INTEGER,
  FitnessActivities TEXT,
  NutritionDiet TEXT,
  Duration TEXT,
  Remedies TEXT,
  Donts TEXT,
  image TEXT
);



CREATE TABLE IF NOT EXISTS Healthqueries(
    hlth_id INTEGER PRIMARY KEY,
    user_id INTEGER NOT NULL,
    problem TEXT NOT NULL,
    advices TEXT NOT NULL,
    image1 TEXT NOT NULL,
    FOREIGN KEY(user_id) REFERENCES user(user_id)
)
