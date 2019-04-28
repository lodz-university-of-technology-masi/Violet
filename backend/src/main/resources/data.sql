INSERT INTO "role" (name) VALUES ('redactor');
INSERT INTO "role" (name) VALUES ('moderator');

INSERT INTO position (name) VALUES ('junior java developer');
INSERT INTO position (name, is_active) VALUES ('mid java developer', false);
INSERT INTO position (name) VALUES ('senior java developer');
INSERT INTO position (name) VALUES ('junior .NET developer');
INSERT INTO position (name) VALUES ('mid .NET developer');
INSERT INTO position (name) VALUES ('senior .NET developer');

INSERT INTO language (name) VALUES ('polish');
INSERT INTO language (name) VALUES ('english');

INSERT INTO candidate (first_name, last_name, email, language_id, position_id)
VALUES ('Grzegorz', 'Niebieski', 'grzegorz@niebieski.pl', 1, 2);
INSERT INTO candidate (first_name, last_name, email, language_id, position_id)
VALUES ('Janina', 'Fioletowozielona', 'janina@fioletowozielona.pl', 1, 6);
INSERT INTO candidate (first_name, last_name, email, language_id, position_id)
VALUES ('Aragorn', 'Elessar', 'aragorn@elessar.com', 2, 1);
INSERT INTO candidate (first_name, last_name, email, language_id, position_id)
VALUES ('Dudley', 'Dursley', 'dudley@dursley.com', 2, 4);
INSERT INTO candidate (first_name, last_name, email, language_id, position_id)
VALUES ('Geralt', 'Zrivi', 'geralt@zrivi.pl', 1, 3);

INSERT INTO "user" (first_name, last_name, email, password) VALUES ('Jan', 'Nowak', 'jan.nowak@to.co', '$2a$10$Qw6GC3irhzzY6Js8Eoymi.kGmsshNFH/EhbRi6oM8OflFe/US1ec6');

INSERT INTO user_role (user_id, role_id) VALUES (1, 1);
INSERT INTO user_role (user_id, role_id) VALUES (1, 2);

INSERT INTO test (owner_id, position_id) VALUES (1, 1);

INSERT INTO test_version (test_id, language_id, test) VALUES (1, 1,
                                                              '{"name":"Test 1","openQuestions":[{"question":"Ile masz lat?"},{"question":"Jak bardzo lubisz MASI?"}],"choiceQuestions":[{"question":"Ile masz lat?","answers":["8 lat","9 lat","10 lat"]},{"question":"Jak bardzo lubisz MASI?","answers":["8 lat","9 lat","10 lat"]}],"scaleQuestions":[{"question":"Jak bardzo lubisz MASI?","answers":[1,2,3]},{"question":"Jak bardzo lubisz Springa?","answers":[1,2,3,4,5,6]}],"numericQuestions":[{"question":"Ile masz lat?"},{"question":"8+3?"}]}'
                                                             );
INSERT INTO test_version (test_id, language_id, test) VALUES (1, 2,
 '{"name":"Test 2 - Angielski","openQuestions":[{"question":"Ile masz lat?"},{"question":"Jak bardzo lubisz MASI?"}],"choiceQuestions":[{"question":"Ile masz lat?","answers":["8 lat","9 lat","10 lat"]},{"question":"Jak bardzo lubisz MASI?","answers":["8 lat","9 lat","10 lat"]}],"scaleQuestions":[{"question":"Jak bardzo lubisz MASI?","answers":[1,2,3]},{"question":"Jak bardzo lubisz Springa?","answers":[1,2,3,4,5,6]}],"numericQuestions":[{"question":"Ile masz lat?"},{"question":"8+3?"}]}'
);

INSERT INTO resolved_test (owner_id, candidate_id, position_id, language_id, test, answer, mark, points_sum, points_max)
VALUES (1, 5, 3, 1,
        '{"name":"Test 1","openQuestions":[{"question":"Ile masz lat?"},{"question":"Jak bardzo lubisz MASI?"}],"choiceQuestions":[{"question":"Ile masz lat?","answers":["8 lat","9 lat","10 lat"]},{"question":"Jak bardzo lubisz MASI?","answers":["1","2","3"]}],"scaleQuestions":[{"question":"Jak bardzo lubisz MASI?","answers":[1,2,3]},{"question":"Jak bardzo lubisz Springa?","answers":[1,2,3,4,5,6]}],"numericQuestions":[{"question":"Ile masz lat?"},{"question":"8+3?"}]}',
        '{"testAnswers": ["21 lat", "Bardzo lubię MASI", "9 lat", "3", "3", "5", "21", "11"]}',
        '{"marks":[1,0,1,1,0,0,1,0]}', 4, 8)